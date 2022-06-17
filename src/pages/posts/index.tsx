import { GetStaticProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../services/prismic";
import styles from "./styles.module.scss";
import Prismic from "@prismicio/client";
import Link from "next/link";
import { useSession } from "next-auth/react";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface ServerSideProps {
  posts: Post[];
}

export default function Posts({ posts }: ServerSideProps) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Posts | ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={
                session?.activeSubscription
                  ? `posts/${post.slug}`
                  : `posts/preview/${post.slug}`
              }
            >
              <a>
                <time>
                  {post.updatedAt}
                  <br />
                  <br />
                </time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at("document.type", "post")],
    { fetch: ["post.title", "post.content"], pageSize: 100 }
  );

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: post.data.title[0].text,
      excerpt:
        post.data.content.find((content) => content.type === "paragraph")
          ?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return { props: { posts } };
};

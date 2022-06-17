import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import styles from "./index.module.scss";
import { GetStaticProps } from "next";
import { stripe } from "../services/stripe";
import Image from "next/image";
import GirlCodingSvg from "../../public/images/avatar.svg";

interface ServerSideProps {
  product: {
    priceId: string;
    priceAmount: number;
  };
}

export default function Home({ product }: ServerSideProps) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world
          </h1>
          <p>
            Get acess to all the publications
            <br />{" "}
            <span>
              for{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(product.priceAmount)}{" "}
              month
            </span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>
        <Image
          src={GirlCodingSvg}
          alt="Girl coding"
          width="550px"
          height="550px"
        />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1K8QBPFFYUc2q4D24qfrhbhT");

  const product = {
    priceId: price.id,
    priceAmount: price.unit_amount / 100,
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};

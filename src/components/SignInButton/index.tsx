import { FaGithub } from "react-icons/fa";
import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export function SignInButton() {
  const { data: session } = useSession();

  return session ? (
    <button className={styles.signOutButton} type="button">
      <FaGithub color="#04d361" />
      {session.user.name}
      <div className={styles.img}>
        <Image
          src={session.user.image}
          alt="avatar do usuário"
          className={styles.userAvatar}
          width="23px"
          height="23px"
        />
      </div>
      <FiX
        color="#737380"
        className={styles.closeIcon}
        title="Sair"
        onClick={() => signOut()}
      />
    </button>
  ) : (
    <button
      onClick={() => signIn()}
      className={styles.SignInButton}
      type="button"
    >
      <FaGithub color="#eba417" />
      Sign in with GitHub
    </button>
  );
}

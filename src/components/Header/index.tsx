import styles from "../Header/styles.module.scss";
import { SignInButton } from "../SignInButton";
import { ActiveLink } from "../activeLink";
import logo from "../../../public/images/logo.svg";
import Image from "next/image";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logo} alt="ig.news" width="150px" height="150px" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}

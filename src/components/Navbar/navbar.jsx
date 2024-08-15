import React from "react";
import styles from "./navbar.module.css";
import Links from "./Links/Links";
import Image from "next/image";
import { auth } from "@/src/lib/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <nav className={styles.container}>
      <Image
        src="/logo.png"
        alt=""
        width={150}
        height={150}
        className={styles.logo}
      />
      <div>
        <Links session={session} />
      </div>
    </nav>
  );
};

export default Navbar;

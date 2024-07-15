import React from "react";
import styles from "./navbar.module.css";
import Links from "./Links/Links";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <Image
        src="/cigarasset13.png"
        alt=""
        width={150}
        height={150}
        className={styles.logo}
      />
      <div>
        <Links />
      </div>
    </nav>
  );
};

export default Navbar;

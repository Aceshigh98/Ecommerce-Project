import React from "react";
import styles from "./navbar.module.css";
import Links from "./Links/Links";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <div>
        <Links />
      </div>
    </nav>
  );
};

export default Navbar;

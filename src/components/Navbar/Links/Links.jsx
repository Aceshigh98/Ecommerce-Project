"use client";

import React from "react";
import { useState } from "react";
import styles from "./Links.module.css";
import Navlink from "./NavLink/NavLink";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Shop",
    path: "/shop",
  },
  {
    name: "Contact",
    path: "/contact",
  },
  {
    name: "Checkout",
    path: "/checkout",
  },
  {
    name: "Login",
    path: "/login",
  },
];

const Links = () => {
  // TEMPORARY
  const session = true;
  const isAdmin = true;

  const [open, setOpen] = useState(false);

  const closeMobileLinks = () => setOpen(false);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <Navlink item={link} key={link.name} />
        ))}
        {session && isAdmin ? (
          <>
            {session && <Navlink item={{ name: "Admin", path: "/admin" }} />}
            <form>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <Navlink item={{ name: "Login", path: "/login" }} />
        )}
      </div>
      <FiMenu
        className={styles.menuButton}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <Navlink item={link} key={link.name} onClick={closeMobileLinks} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;

"use client";

import React from "react";
import { useState } from "react";
import styles from "./Links.module.css";
import Navlink from "./NavLink/NavLink";
import Image from "next/image";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "Checkout",
    href: "/checkout",
  },
  {
    name: "Login",
    href: "/login",
  },
];

const Links = () => {
  // TEMPORARY
  const session = true;
  const isAdmin = true;

  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <Navlink item={link} key={link.name} />
        ))}
        {session && isAdmin ? (
          <>
            {session && <Navlink item={{ name: "Admin", href: "/admin" }} />}
            <form>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <Navlink item={{ name: "Login", href: "/login" }} />
        )}
      </div>
      <Image
        className={styles.menuButton}
        src="/cigarasset13.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
    </div>
  );
};

export default Links;

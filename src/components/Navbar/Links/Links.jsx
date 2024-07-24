"use client";

import React from "react";
import { useState } from "react";
import styles from "./Links.module.css";
import Navlink from "./NavLink/NavLink";
import { FiMenu } from "react-icons/fi";
import { handleLogout } from "@/src/lib/action";

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
];

const Links = ({ session }) => {
  // TEMPORARY

  const [open, setOpen] = useState(false);

  const closeMobileLinks = () => setOpen(false);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <Navlink item={link} key={link.name} />
        ))}
        {session?.user ? (
          <>
            {session.user?.isAdmin && (
              <Navlink item={{ name: "Admin", path: "/admin" }} />
            )}
            <form action={handleLogout}>
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

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
];

const Links = ({ session }) => {
  // TEMPORARY

  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <Navlink item={link} key={link.name} />
        ))}
        <div>
          <Navlink item={{ name: "Checkout", path: "/checkout" }} />
          <div>0</div>
        </div>
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
            <Navlink
              item={link}
              key={link.name}
              onClick={() => setOpen((prev) => !prev)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;

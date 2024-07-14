"use client";
import React from "react";
import Link from "next/link";
import styles from "./navLink.module.css";
import { usePathname } from "next/navigation";

const NavLink = ({ item }) => {
  const pathName = usePathname();

  return (
    <Link
      href={item.href}
      className={`${styles.container} ${
        pathName === item.href && styles.active
      }`}
    >
      {item.name}
    </Link>
  );
};

export default NavLink;

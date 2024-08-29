import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Company = [
  { name: "Home", link: "/" },
  { name: "Shop", link: "/shop" },
  { name: "Contact Us", link: "/contact" },
  { name: "View Special", link: "/special" },
];

const Social = [
  { name: "Facebook", link: "https://www.facebook.com" },
  { name: "Twitter", link: "https://www.twitter.com" },
  { name: "Instagram", link: "https://www.instagram.com" },
];

const footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.logo}>
        <Image src="/logo.png" alt="logo" fill />
      </div>
      <div className={styles.company}>
        <h3>Company</h3>
        <ul className={styles.companyList}>
          {Company.map((item, index) => (
            <Link key={index} href={item.link}>
              {" "}
              {item.name}{" "}
            </Link>
          ))}
        </ul>
      </div>
      <div className={styles.social}>
        <h3>Social</h3>
        <ul className={styles.socialList}>
          {Social.map((item, index) => (
            <Link key={index} href={item.link}>
              {" "}
              {item.name}{" "}
            </Link>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default footer;

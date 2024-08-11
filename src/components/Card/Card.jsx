"use client";

import React from "react";
import styles from "./card.module.css";
import Link from "next/link";
import Image from "next/image";

const Card = ({ item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={item.img} width={300} height={300} alt={item.title} />
      </div>
      <div className={styles.textContainer}>
        <h3>{item.title}</h3>
      </div>
      <div className={styles.priceContainer}>
        <Link href={`/shop/${item._id}`}>
          <button className={styles.cardButton}>View</button>
        </Link>
        <h3>Single: ${item.priceForSingle}</h3>
        <h3>
          Box: <span>${item.priceForBox}</span>
        </h3>
      </div>
    </div>
  );
};

export default Card;

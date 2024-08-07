import React from "react";
import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={item.img} fill alt=""></Image>
      </div>
      <div className={styles.textContainer}>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
      <Link href={`/shop/${item._id}`}>
        <button className={styles.cardButton}>View</button>
      </Link>
    </div>
  );
};

export default Card;

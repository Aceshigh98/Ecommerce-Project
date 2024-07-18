import React from "react";
import Image from "next/image";
import styles from "./card.module.css";

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
      <button className={styles.cardButton}>View</button>
    </div>
  );
};

export default Card;

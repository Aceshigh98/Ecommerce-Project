import React from "react";
import styles from "./selects.module.css";
import Card from "../Card/Card";
import { getPosts } from "@/src/lib/data";

const SignatureSelects = async () => {
  const cards = await getPosts();

  return (
    <div className={styles.container}>
      {cards.map((card) => (
        <Card key={card.id} item={card} />
      ))}
    </div>
  );
};

export default SignatureSelects;

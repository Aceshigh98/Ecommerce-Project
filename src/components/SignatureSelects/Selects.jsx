import React from "react";
import styles from "./selects.module.css";
import Card from "../Card/Card";
import { getSignatureProducts } from "@/src/lib/data";

const SignatureSelects = async () => {
  const cards = await getSignatureProducts();

  if (!cards) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Signature Selects</h1>
      <div className={styles.cardWrapper}>
        {cards.map((card) => (
          <Card key={card.id} item={card} />
        ))}
      </div>
    </div>
  );
};

export default SignatureSelects;

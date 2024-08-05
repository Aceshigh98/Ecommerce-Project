import React from "react";
import styles from "@/styles/product.module.css";

const getData = async () => {
  const res = await fetch(`http://localhost:3000/api/product/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

export const generateMetadata = async ({ params }) => {
  const { id } = params;

  const product = await getProduct(id);

  return {
    title: product.title,
    description: product.body,
  };
};

const Product = async ({ params }) => {
  const { id } = params;

  const product = await getData(id);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.title}</h1>
      <div className={styles.detail}>
        <div className={styles.detailText}>
          <span className={styles.detailTitle}>Price</span>
          <span className={styles.detailValue}>{product.price}</span>
        </div>
      </div>
      <div className={styles.content}>{product.body}</div>
    </div>
  );
};

export default Product;

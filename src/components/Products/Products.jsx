import React from "react";
import styles from "./products.module.css";
import Card from "@/src/components/Card/Card";

const Products = ({ products }) => {
  return (
    <main className={styles.productsContainer}>
      <div className={styles.productWrapper}>
        {products.map((product) => {
          return <Card key={product.id} item={product} />;
        })}
      </div>
    </main>
  );
};

export default Products;

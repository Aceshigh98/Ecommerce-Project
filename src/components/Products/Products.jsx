import React from "react";
import styles from "./products.module.css";
import Card from "@/src/components/Card/Card";
import Image from "next/image";

const Products = ({ products }) => {
  return (
    <main className={styles.productsContainer}>
      <div classname={styles.image}>
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={200}
          className={styles.image}
        />
      </div>
      <div className={styles.productWrapper}>
        {products.map((product) => {
          return <Card key={product.id} item={product} />;
        })}
      </div>
    </main>
  );
};

export default Products;

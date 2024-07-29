import React from "react";
import styles from "./shop.module.css";
import Filter from "@/src/components/Filter/Filter";
import Products from "@/src/components/Products/Products";
import { productsStore } from "@/src/lib/data";

const Shop = () => {
  return (
    <div className={styles.container}>
      <Filter />
      <Products products={productsStore} />
    </div>
  );
};

export default Shop;

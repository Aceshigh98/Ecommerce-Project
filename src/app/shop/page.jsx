import React from "react";
import Shop from "@/src/components/ShopComponent/Shop";
import { getAllProducts } from "@/src/lib/data";
import styles from "./shop.module.css";

const page = async () => {
  const products = await getAllProducts();

  return (
    <div className={styles.container}>
      <Shop products={products} />
    </div>
  );
};

export default page;

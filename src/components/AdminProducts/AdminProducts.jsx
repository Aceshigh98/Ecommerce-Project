import React from "react";
import styles from "./adminProducts.module.css";
import Image from "next/image";
import { getAllProducts } from "@/src/lib/data";
import { deleteProduct } from "@/src/lib/action";

const AdminPosts = async () => {
  const products = await getAllProducts();

  return (
    <div className={styles.container}>
      <h1>Products</h1>
      {products.map((product, index) => (
        <div className={styles.product} key={index}>
          <div className={styles.detail}>
            <Image
              src={product.img || "/noAvatar.png"}
              alt=""
              width={50}
              height={50}
            />
            <span className={styles.productTitle}>{product.title}</span>
          </div>
          <form action={deleteProduct}>
            <input type="hidden" name="id" value={product._id} />
            <button className={styles.productButton}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminPosts;

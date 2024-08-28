import React, { Suspense } from "react";
import styles from "./product.module.css";
import Image from "next/image";
import { getProduct } from "@/src/lib/data";
import AddItem from "@/src/components/AddItem/AddItem";

const getData = async (id) => {
  const res = await fetch(`http://localhost:3000/api/store/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

export const generateMetadata = async ({ params }) => {
  const { product: _id } = params;

  const product = await getData(_id);

  return {
    title: product.title,
    description: product.body,
  };
};

const SinglePage = async ({ params }) => {
  const { product: _id } = params;

  const product = await getProduct(_id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.container}>
      {product.img && (
        <div className={styles.imgContainer}>
          <Suspense fallback={<div>Loading...</div>}>
            <Image
              src={product.img}
              alt={product.title}
              layout="fill"
              objectFit="cover"
            />
          </Suspense>
        </div>
      )}
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{product.title}</h1>
        <div className={styles.detail}>
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Availability</span>
            <span
              className={
                product.singleInStock > 0
                  ? styles.detailValue
                  : styles.detailValue2
              }
            >
              Singles:
              {product.singleInStock > 0 ? " In Stock" : " Out of Stock"}
            </span>
            <span
              className={
                product.boxInStock > 0
                  ? styles.detailValue
                  : styles.detailValue2
              }
            >
              Boxes:
              {product.boxInStock > 0 ? " In Stock" : " Out of Stock"}
            </span>
          </div>
        </div>
        <div className={styles.content}>{product.body}</div>
        <AddItem item={product} />
      </div>
    </div>
  );
};

export default SinglePage;

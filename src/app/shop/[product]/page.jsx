import React, { Suspense } from "react";
import styles from "./product.module.css";
import { Image } from "next/image";
import { getProduct } from "@/src/lib/data";

const getData = async (id) => {
  console.log("Page[Product]======" + id);
  const res = await fetch(`http://localhost:3000/api/store/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

// export const generateMetadata = async ({ params }) => {
//   const { id } = params;

//   const product = await getProduct(id);

//   console.log

//   return {
//     title: product.id,
//     description: product.body,
//   };
// };

const Product = async ({ params }) => {
  const { id } = params;

  console.log("Product[Page0000]======" + id);

  const product = await getData(id);

  console.log(product);

  return <div>Product: {product.id}</div>;
};

export default Product;

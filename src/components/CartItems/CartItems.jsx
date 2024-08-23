import React from "react";
import styles from "./cartItems.module.css";
import { getCheckoutItems } from "@/src/lib/data";
import { auth } from "@/src/lib/auth";

const CartItems = async () => {
  const session = await auth();

  if (!session) {
    return <div>Not authorized</div>;
  }

  console.log(session.user.email);

  const products = await getCheckoutItems(session.user.email);

  console.log(products);

  return (
    <div className={styles.container}>
      <h1>{products}</h1>
    </div>
  );
};

export default CartItems;

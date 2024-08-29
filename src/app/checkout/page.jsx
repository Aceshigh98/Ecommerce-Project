import React from "react";
import CartItems from "@/src/components/CartItems/CartItems";
import { auth } from "@/src/lib/auth";
import styles from "./checkout.module.css";

export const Checkout = async () => {
  const session = await auth();

  return (
    <div className={styles.container}>
      <CartItems session={session} />
    </div>
  );
};

export default Checkout;

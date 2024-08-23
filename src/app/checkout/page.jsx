import React from "react";
import styles from "./checkout.module.css";
import CartItems from "@/src/components/CartItems/CartItems";

export const Checkout = async () => {
  return (
    <div>
      <CartItems />
      <div>
        <h2>Total: $100</h2>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Checkout;

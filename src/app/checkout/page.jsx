import React from "react";
import styles from "./checkout.module.css";
import CartItems from "@/src/components/CartItems/CartItems";
import { getCartItems } from "@/src/lib/data";
import { auth } from "@/src/lib/auth";

export const Checkout = async () => {
  const session = await auth();

  const cartItems = await getCartItems(session.user.email);

  return (
    <div>
      <h1>Checkout</h1>
      <CartItems Items={cartItems} />
      <div>
        <h2>Total: $100</h2>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Checkout;

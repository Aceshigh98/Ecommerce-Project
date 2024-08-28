"use client";

import React, { useState } from "react";
import styles from "./addItem.module.css";
import { addToCart } from "@/src/lib/action";
import { getSession } from "next-auth/react";

const AddItem = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("single");

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  const changeSize = (e) => {
    setSize(e.target.value);
  };

  //Cart action
  const cartAction = async (e) => {
    e.preventDefault();

    const session = await getSession();
    // If there is no session, return
    if (!session) {
      console.log("No session found");
      return;
    }

    try {
      await addToCart({
        item,
        quantity,
        size,
        id: session.user.email,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <form onSubmit={cartAction} className={styles.container}>
      <div className={styles.quantityControls}>
        <button
          type="button"
          onClick={decreaseQuantity}
          className={styles.arrowButton}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          type="button"
          onClick={increaseQuantity}
          className={styles.arrowButton}
        >
          +
        </button>
      </div>
      <select value={size} onChange={changeSize} className={styles.select}>
        <option value="single">Single</option>
        <option value="box">Box</option>
      </select>
      <button type="submit" className={styles.addToCartButton}>
        Add to Cart
      </button>
    </form>
  );
};

export default AddItem;

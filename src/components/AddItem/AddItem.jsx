"use client";

import React, { useState } from "react";
import styles from "./addItem.module.css";
import { useFormState } from "react-dom";
import { addToCart as addToCartAction } from "@/src/lib/action";
import { useSession } from "next-auth/react";

const AddItem = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("single");
  const [state, formAction] = useFormState(addToCartAction, undefined);
  const { data: session } = useSession();

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

  const addToCart = async (e) => {
    e.preventDefault();
    try {
      await formAction({
        item,
        quantity,
        size,
        id: session.email,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  return (
    <form onSubmit={addToCart} className={styles.container}>
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

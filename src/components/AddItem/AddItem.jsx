"use client";

import React, { useState, useEffect } from "react";
import styles from "./addItem.module.css";

const AddItem = ({ item, userItem }) => {
  const [user, setUser] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("single");

  useEffect(() => {
    setUser(userItem);
  }, []);

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

  const addToCart = () => {
    return (
      <form className={styles.container}>
        <div className={styles.quantityControls}>
          <button onClick={decreaseQuantity} className={styles.arrowButton}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={increaseQuantity} className={styles.arrowButton}>
            +
          </button>
        </div>
        <select value={size} onChange={changeSize} className={styles.select}>
          <option value="single">Single</option>
          <option value="box">Box</option>
        </select>
        <button onClick={addToCart} className={styles.addToCartButton}>
          Add to Cart
        </button>
      </form>
    );
  };
};

export default AddItem;

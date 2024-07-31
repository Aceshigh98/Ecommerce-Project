"use client";

import React, { useState } from "react";
import styles from "./slider.module.css";

const PriceSlider = ({ minPrice, maxPrice, onPriceChange }) => {
  const [minValue, setMinValue] = useState(minPrice);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinValue(value);
    onPriceChange([value, maxPrice]);
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.values}>
        <span>Min: ${minValue}</span>
        <span>Max: ${maxPrice}</span>
      </div>
      <div className={styles.sliders}>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={minValue}
          onChange={handleMinChange}
          className={styles.slider}
        />
      </div>
    </div>
  );
};

export default PriceSlider;

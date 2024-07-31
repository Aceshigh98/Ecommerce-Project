import React, { useState, useEffect } from "react";
import styles from "./sliderFilter.module.css";

const PriceSlider = ({ maxPrice, onPriceChange, selectedValue }) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(maxPrice);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue);
    setMinValue(value);
    onPriceChange([value, maxValue]);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue);
    setMaxValue(value);
    onPriceChange([minValue, value]);
  };

  useEffect(() => {
    setMinValue(0);
    setMaxValue(selectedValue);
  }, [selectedValue]);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.values}>
        <span>Min: ${minValue}</span>
        <span>Max: ${maxValue}</span>
      </div>
      <div className={styles.sliders}>
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={minValue}
          onChange={handleMinChange}
          className={styles.slider}
        />
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={maxValue}
          onChange={handleMaxChange}
          className={styles.slider}
        />
      </div>
    </div>
  );
};

export default PriceSlider;

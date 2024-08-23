import React, { useState, useEffect } from "react";
import styles from "./sliderFilter.module.css";

const PriceSlider = ({
  maxPrice,
  onPriceChangeLow,
  onPriceChangeHigh,
  selectedValue = [0, maxPrice],
}) => {
  const [minValue, setMinValue] = useState(selectedValue[0] || 0);
  const [maxValue, setMaxValue] = useState(selectedValue[1] || maxPrice);

  useEffect(() => {
    if (selectedValue[0] !== undefined) {
      setMinValue(selectedValue[0]);
    }
    if (selectedValue[1] !== undefined) {
      setMaxValue(selectedValue[1]);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (maxPrice !== undefined) {
      setMaxValue((prevMaxValue) => Math.max(prevMaxValue, maxPrice));
    }
  }, [maxPrice]);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue);
    setMinValue(value);
    onPriceChangeLow(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue);
    setMaxValue(value);
    onPriceChangeHigh(value);
  };

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
          max={maxPrice !== undefined ? maxPrice : 1000} // Ensure maxPrice is defined
          value={minValue !== undefined ? minValue : 0} // Ensure minValue is defined
          onChange={handleMinChange}
          className={styles.slider}
        />
        <input
          type="range"
          min={0}
          max={maxPrice !== undefined ? maxPrice : 1000} // Ensure maxPrice is defined
          value={maxValue !== undefined ? maxValue : maxPrice} // Ensure maxValue is defined
          onChange={handleMaxChange}
          className={styles.slider}
        />
      </div>
    </div>
  );
};

export default PriceSlider;

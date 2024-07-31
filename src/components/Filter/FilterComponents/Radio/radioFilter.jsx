import React, { useState, useEffect } from "react";
import styles from "./radioFilter.module.css";

const RadioFilter = ({ items, selectedValue, onChange }) => {
  const [selected, setSelected] = useState("");

  const handleChange = (value) => {
    setSelected(value);
    onChange(value);
  };

  useEffect(() => {
    setSelected(selectedValue);
  }, [selectedValue]);

  return (
    <div className={styles.container}>
      <label className={styles.label}>Search by {items.category}</label>

      <button className={styles.button} onClick={() => handleChange("")}>
        Show all {items.category + `s`}{" "}
      </button>

      {items.type.map((item, index) => (
        <div key={index}>
          <button
            className={selected === item ? styles.active : styles.button}
            onClick={() => handleChange(item)}
          >
            {item}
          </button>
        </div>
      ))}
    </div>
  );
};

export default RadioFilter;

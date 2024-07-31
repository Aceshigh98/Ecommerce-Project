"use client";

import React from "react";
import styles from "./filter.module.css";
import Slider from "./FilterComponents/Slider/Slider";
import { handleCategoryChange, handlePriceChange } from "@/src/utils/search";

const Filter = ({ filter, setFilter }) => {
  return (
    <div className={styles.filterContainer}>
      <select
        value={filter.category}
        onChange={(e) => handleCategoryChange(e, setFilter)}
      >
        <option value="">All Categories</option>
        <option value="Conneticut">Conneticut</option>
        <option value="Robusto">Robusto</option>
        <option value="Toro">Toro</option>
        <option value="Churchill">Churchill</option>
      </select>
      <Slider
        minPrice={0}
        maxPrice={filter.maxPrice}
        onPriceChange={(e) => handlePriceChange(e, setFilter)}
      />
    </div>
  );
};

export default Filter;

"use client";

import React from "react";
import styles from "./filter.module.css";
import Slider from "./FilterComponents/Slider/sliderFilter";
import RadioFilter from "./FilterComponents/Radio/radioFilter";
import { cigarBrands, cigarSize, cigarWrapper } from "@/src/lib/data";

import {
  handleSizeChange,
  handlePriceChangeLow,
  handlePriceChangeHigh,
  handleBrandChange,
  handleWrapperChange,
} from "@/src/utils/search";

const Filter = ({ filter, setFilter }) => {
  const clearFilterHandler = () => {
    setFilter((prev) => ({
      ...prev,
      brand: "",
      size: "",
      wrapper: "",
      priceTarget: [0, prev.maxPrice],
    }));
  };

  return (
    <div className={styles.filterContainer}>
      <Slider
        maxPrice={filter.maxPrice}
        onPriceChangeLow={(e) => handlePriceChangeLow(e, setFilter)}
        onPriceChangeHigh={(e) => handlePriceChangeHigh(e, setFilter)}
        selectedValue={filter.priceTarget}
      />
      <RadioFilter
        items={cigarBrands}
        onChange={(e) => handleBrandChange(e, setFilter)}
        selectedValue={filter.brand}
      />
      <RadioFilter
        items={cigarSize}
        onChange={(e) => handleSizeChange(e, setFilter)}
        selectedValue={filter.size}
      />
      <RadioFilter
        items={cigarWrapper}
        onChange={(e) => handleWrapperChange(e, setFilter)}
        selectedValue={filter.wrapper}
      />

      <button className={styles.clear} onClick={clearFilterHandler}>
        Clear Filters
      </button>
    </div>
  );
};

export default Filter;

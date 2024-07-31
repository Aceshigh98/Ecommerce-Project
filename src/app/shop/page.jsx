"use client";

import React, { useState, useEffect } from "react";
import styles from "./shop.module.css";

//Components
import Filter from "@/src/components/Filter/Filter";
import Products from "@/src/components/Products/Products";

//Functions
import { productsStore } from "@/src/lib/data";
import { filterObject, filterMain, maxPrice } from "@/src/utils/search";

const Shop = () => {
  //Fetch Products from database eventusally.
  //const products = await getProducts();

  const [filter, setFilter] = useState(() => {
    const maxPriceValue = maxPrice(productsStore);
    return {
      ...filterObject,
      maxPrice: maxPriceValue,
    };
  });
  const [filteredProducts, setFilteredProducts] = useState(productsStore);

  // Effect to filter products whenever filter state changes
  useEffect(() => {
    const filtered = productsStore.filter((product) => {
      return filterMain(product, filter);
    });
    setFilteredProducts(filtered);
  }, [filter]);

  return (
    <div className={styles.container}>
      <Filter filter={filter} setFilter={setFilter} />
      <Products products={filteredProducts} />
    </div>
  );
};

export default Shop;

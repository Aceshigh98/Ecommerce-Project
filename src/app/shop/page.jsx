"use client";

import React, { useState, useEffect } from "react";
import styles from "./shop.module.css";

//Components
import Filter from "@/src/components/Filter/Filter";
import MobileFilter from "@/src/components/MobileFilter/MobileFilter";
import Products from "@/src/components/Products/Products";

//Functions
import { productsStore } from "@/src/lib/data";
import { filterObject, filterMain, maxPrice } from "@/src/utils/search";

const Shop = () => {
  //Fetch Products from database eventusally.
  //const products = await getProducts();
  const [width, setWidth] = useState(null);
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

  // Effect to check window size and set width state
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return (
    <div className={styles.container}>
      {width ? (
        <MobileFilter filter={filter} setFilter={setFilter} />
      ) : (
        <Filter filter={filter} setFilter={setFilter} />
      )}
      <Products products={filteredProducts} />
    </div>
  );
};

export default Shop;

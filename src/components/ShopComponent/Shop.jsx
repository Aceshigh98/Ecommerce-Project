"use client";

import React, { useState, useEffect } from "react";
import styles from "./shop.module.css";

// Components
import Filter from "@/src/components/Filter/Filter";
import MobileFilter from "@/src/components/MobileFilter/MobileFilter";
import Products from "@/src/components/Products/Products";

// Functions
import { filterObject, filterMain, maxPrice } from "@/src/utils/search";

const Shop = ({ products, session }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [width, setWidth] = useState(null);
  const [filter, setFilter] = useState(filterObject);

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = products;
        const maxPriceValue = maxPrice(fetchedProducts);
        setFilter({ ...filterObject, maxPrice: maxPriceValue });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [products]);

  // Effect to filter products whenever filter state changes
  useEffect(() => {
    const filtered = products.filter((product) => filterMain(product, filter));
    setFilteredProducts(filtered);
  }, [filter, products]);

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
  }, []);

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

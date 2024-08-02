"use client";

import React, { useState } from "react";
import styles from "./mobile.module.css";
import Filter from "@/src/components/Filter/Filter";

const MobileFilter = ({ filter, setFilter }) => {
  const [action, setAction] = useState(false);
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => setAction(!action)}>
        <span>{action === false ? `Filter Items` : `Close Filter`}</span>
      </button>
      {action ? <Filter filter={filter} setFilter={setFilter} /> : null}
    </div>
  );
};

export default MobileFilter;

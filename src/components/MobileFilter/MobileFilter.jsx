"use client";

import React, { useState } from "react";
import styles from "./mobile.module.css";
import Filter from "@/src/components/Filter/Filter";
import { MdMenu } from "react-icons/md";

const MobileFilter = (filter, setFilter) => {
  const [action, setAction] = useState(false);
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => setAction(!action)}>
        <MdMenu className={styles.icon} />
      </button>
      {action ? <Filter filter={filter} setFilter={setFilter} /> : null}
    </div>
  );
};

export default MobileFilter;

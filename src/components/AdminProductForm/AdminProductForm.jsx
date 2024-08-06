"use client";

import React, { useState } from "react";
import styles from "./adminProductForm.module.css";
import { useFormState } from "react-dom";
import { addProduct } from "@/src/lib/action";

const AdminProductForm = ({ cigarSize, cigarBrands, cigarWrapper }) => {
  const [state, formAction] = useFormState(addProduct, undefined);
  const [base64Image, setBase64] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file instanceof Blob) {
      const reader = new FileReader();

      reader.onload = () => {
        setBase64(reader.result);
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file input.");
    }
  };

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New Product</h1>
      <input type="text" name="title" placeholder="Title" required />
      <textarea
        type="text"
        rows={9}
        name="body"
        placeholder="Description"
        required
      />
      <select name="size" required>
        <option value="">Size</option>
        {cigarSize.type.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <select name="wrapper" required>
        <option value="">Wrapper</option>
        {cigarWrapper.type.map((wrapper) => (
          <option key={wrapper} value={wrapper}>
            {wrapper}
          </option>
        ))}
      </select>
      <select name="brand" required>
        <option value="">Brand</option>
        {cigarBrands.type.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="priceForSingle"
        placeholder="Price for single cigar"
        required
      />
      <input
        type="number"
        name="priceForBox"
        placeholder="Price for box"
        required
      />
      <input
        type="number"
        name="singleInStock"
        placeholder="Single cigars in stock"
        required
      />
      <input
        type="number"
        name="boxInStock"
        placeholder="Boxes in stock"
        required
      />
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        required
      />
      <input type="hidden" name="img" value={base64Image || ""} />
      <select name="signature" required>
        <option value="">Is this a Signature Select?</option>
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      <button type="submit">Add</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
};

export default AdminProductForm;

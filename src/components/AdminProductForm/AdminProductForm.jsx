"use client";

import React, { useState } from "react";
import styles from "./adminProductForm.module.css";
import { useFormState } from "react-dom";
import { addProduct } from "@/src/lib/action";

const AdminProductForm = () => {
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
      <input type="text" name="size" placeholder="Size" required />
      <input type="text" name="wrapper" placeholder="Wrapper" required />
      <input type="text" name="brand" placeholder="Brand" required />
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

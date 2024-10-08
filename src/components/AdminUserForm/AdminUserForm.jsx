"use client";

import React from "react";
import styles from "./adminUserForm.module.css";
import { useFormState } from "react-dom";
import { addUser } from "@/src/lib/action";

const AdminUserForm = () => {
  const [state, formAction] = useFormState(addUser, undefined);

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New User</h1>
      <input
        type="text"
        name="username"
        placeholder="username"
        autoComplete="username"
      />
      <input type="text" name="name" placeholder="name" autoComplete="name" />
      <input
        type="text"
        name="email"
        placeholder="email"
        autoComplete="email"
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        autoComplete="new-password"
      />
      <select name="isAdmin">
        <option value="false">Is Admin?</option>
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      <button>Add</button>
      {state?.error}
    </form>
  );
};

export default AdminUserForm;

import React, { Suspense } from "react";
import styles from "./admin.module.css";
import AdminProducts from "@/src/components/AdminProducts/AdminProducts";
import AdminProductForm from "@/src/components/AdminProductForm/AdminProductForm";
import AdminUsers from "@/src/components/AdminUsers/AdminUsers";
import AdminUserForm from "@/src/components/AdminUserForm/AdminUserForm";

const Admin = () => {
  return (
    <div className={styles.container}>
      <AdminUserForm />
      <AdminUsers />
      <AdminProductForm />
      <AdminProducts />
    </div>
  );
};

export default Admin;

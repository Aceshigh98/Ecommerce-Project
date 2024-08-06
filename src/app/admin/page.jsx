import React, { Suspense } from "react";
import styles from "./admin.module.css";
import AdminProducts from "@/src/components/AdminProducts/AdminProducts";
import AdminProductForm from "@/src/components/AdminProductForm/AdminProductForm";
import AdminUsers from "@/src/components/AdminUsers/AdminUsers";
import AdminUserForm from "@/src/components/AdminUserForm/AdminUserForm";
import { cigarBrands, cigarSize, cigarWrapper } from "@/src/lib/data";

const Admin = () => {
  return (
    <div className={styles.container}>
      <AdminUserForm />
      <AdminUsers />
      <AdminProductForm
        cigarBrands={cigarBrands}
        cigarSize={cigarSize}
        cigarWrapper={cigarWrapper}
      />
      <AdminProducts />
    </div>
  );
};

export default Admin;

"use client";

import React from "react";
import styles from "./loginForm.module.css";
import Link from "next/link";
import { useFormState } from "react-dom";
import { login } from "@/src/lib/action";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <form action={formAction} className={styles.form}>
      <input
        type="text"
        placeholder="username"
        name="username"
        required={true}
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        required={true}
      />
      <button>Login</button>
      {state?.error}
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </form>
  );
};

export default LoginForm;

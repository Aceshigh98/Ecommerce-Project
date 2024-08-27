"use client";

import styles from "./registerForm.module.css";
import Link from "next/link";
import { useFormState } from "react-dom";
import { register } from "@/src/lib/action";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);
  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);

  return (
    <form action={formAction} className={styles.form}>
      <input
        type="text"
        placeholder="username"
        name="username"
        required={true}
        autoComplete="on"
      />
      <input
        type="email"
        placeholder="email"
        name="email"
        required={true}
        autoComplete="on"
      />
      <input
        type="password"
        placeholder="password"
        name="password"
        required={true}
        autoComplete="on"
      />
      <input
        type="password"
        placeholder="password"
        name="passwordRepeat"
        required={true}
        autoComplete="on"
      />
      <button>Register</button>
      {state?.error}
      <Link href="/login">
        {"Have an Acount?"} <b>Login</b>
      </Link>
    </form>
  );
};

export default RegisterForm;

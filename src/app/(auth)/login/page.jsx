import React from "react";
import styles from "./login.module.css";
import LoginForm from "@/src/components/LoginForm/LoginForm";
import { FcGoogle } from "react-icons/fc";

const Login = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form>
          <button className={styles.google}>
            <FcGoogle className={styles.googleIcon} />
            Login with Google
          </button>
        </form>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

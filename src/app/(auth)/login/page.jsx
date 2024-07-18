import React from "react";
import styles from "./login.module.css";
import LoginForm from "../../../components/LoginForm/Login";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form>
          <button className={styles.google}>Login with Google</button>
        </form>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;

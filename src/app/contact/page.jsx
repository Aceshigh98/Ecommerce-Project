import React from "react";
import ContactForm from "@/src/components/ContactForm/contactForm";
import styles from "./contact.module.css";

const Contact = () => {
  return (
    <div className={styles.container}>
      <ContactForm />
    </div>
  );
};

export default Contact;

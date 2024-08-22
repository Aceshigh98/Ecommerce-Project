"use client";

import React, { useRef } from "react";
import styles from "./contactForm.module.css";
import Image from "next/image";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const form = useRef();
  const [success, setSuccess] = React.useState(null);

  const sendEmail = async (e) => {
    e.preventDefault();

    const serviceId = "service_uhnoh8g";
    const templateId = "template_msi8g4l";
    const publicKey = "Cxiuqam0ddovJ4uSe";

    await emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
      () => {
        console.log("SUCCESS!");
        setSuccess(true);
      },
      (error) => {
        console.log("FAILED...", error.text);
        setSuccess(false);
      }
    );
  };

  return (
    <div className={styles.wrapper}>
      <Image src="/logo.png" alt="contact" width={250} height={250} />
      <p>Send us a message</p>
      <form ref={form} onSubmit={sendEmail} className={styles.form}>
        <div className={styles.innerWrapper}>
          <input
            name="name"
            type="text"
            placeholder="name"
            required={true}
          ></input>
          <input
            name="email"
            tyoe="email"
            placeholder="email"
            required={true}
          ></input>
        </div>
        <input
          name="subject"
          type="text"
          required={true}
          placeholder="subject"
        ></input>
        <textarea name="message" type="text" required={true}></textarea>
        {success ? <p>Sent Successfully!</p> : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;

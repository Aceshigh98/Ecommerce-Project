"use client";

import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./card.module.css";
import Link from "next/link";
import AddItem from "../AddItem/AddItem";

const Card = ({ item }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>; // Show a loading state while the session is being fetched
  }

  console.log(session);

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={item.img} alt="" />
      </div>
      <div className={styles.textContainer}>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
      <Link href={`/shop/${item._id}`}>
        <button className={styles.cardButton}>View</button>
      </Link>
      {session ? (
        <AddItem item={item} userItem={session.user} />
      ) : (
        <button onClick={() => signIn()}>Sign in to Add to Cart</button>
      )}
    </div>
  );
};

export default Card;

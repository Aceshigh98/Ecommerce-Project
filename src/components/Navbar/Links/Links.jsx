"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Links.module.css";
import Navlink from "./NavLink/NavLink";
import { FiMenu } from "react-icons/fi";
import { handleLogout } from "@/src/lib/action";
import { FaShoppingCart } from "react-icons/fa";
import { getSession } from "next-auth/react";

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Shop",
    path: "/shop",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Links = ({ session }) => {
  const [open, setOpen] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const router = useRouter();

  useEffect(() => {
    //fetchCart function
    const fetchCart = async () => {
      const sessionCheck = await getSession();

      if (!sessionCheck) {
        console.log("No session found");
        setCartLength(0);
        return;
      }

      const res = await fetch(
        `${process.env.BASE_URL}/api/cart/${session.user.email}`,
        {
          method: "GET",
          revalidate: 3600,
        }
      );

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();

      if (!data) {
        setCartLength(0);
        return;
      }

      setCartLength(data.cart.length);
    };

    fetchCart();
  }, [session]);

  //handleCart function
  const handleCart = () => {
    if (cartLength > 0) router.push("/checkout");
  };

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <Navlink item={link} key={link.name} />
        ))}

        <Navlink item={{ name: "Checkout", path: "/checkout" }}> </Navlink>
        <div
          onClick={handleCart}
          className={cartLength > 0 ? styles.cart : styles.cartActive}
        >
          <FaShoppingCart />
          <div>{cartLength}</div>
        </div>

        {session?.user ? (
          <>
            {session.user?.isAdmin && (
              <Navlink item={{ name: "Admin", path: "/admin" }} />
            )}
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <Navlink item={{ name: "Login", path: "/login" }} />
        )}
      </div>
      <FiMenu
        className={styles.menuButton}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <Navlink
              item={link}
              key={link.name}
              onClick={() => setOpen((prev) => !prev)}
            />
          ))}
          <Navlink
            onClick={() => setOpen((prev) => !prev)}
            item={{ name: "Checkout", path: "/checkout" }}
          >
            {" "}
          </Navlink>
          <div
            onClick={handleCart}
            className={cartLength > 0 ? styles.cart : styles.cartActive}
          >
            <FaShoppingCart />
            <div>{cartLength}</div>
          </div>

          {session?.user ? (
            <>
              {session.user?.isAdmin && (
                <Navlink item={{ name: "Admin", path: "/admin" }} />
              )}
              <form action={handleLogout}>
                <button className={styles.logout}>Logout</button>
              </form>
            </>
          ) : (
            <Navlink
              onClick={() => setOpen((prev) => !prev)}
              item={{ name: "Login", path: "/login" }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Links;

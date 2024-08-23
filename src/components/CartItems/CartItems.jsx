import React from "react";
import styles from "./cartItems.module.css";
import { getCheckoutItems, getCartItems } from "@/src/lib/data";
import Image from "next/image";
import { deleteFromCart } from "@/src/lib/action";

const CartItems = async ({ session }) => {
  if (!session) {
    return <div>Not authorized</div>;
  }

  const products = await getCheckoutItems(session.user.email);
  const cart = await getCartItems(session.user.email);

  const getTotal = () => {
    let total = 0;

    console.log(cart.cart.length);

    for (let i = 0; i < cart.cart.length; i++) {
      const size = cart.cart[i].size;
      const quantity = cart.cart[i].quantity;
      console.log(cart.cart[i].quantity);

      console.log(size, quantity);

      if (size === "single") {
        total += products[i].priceForSingle * quantity;
      } else {
        total += products[i].priceForBox * quantity;
      }
    }
    return total;
  };

  const total = getTotal();
  console.log(total);

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>
      {products.map((product) => (
        <div key={product._id} className={styles.product}>
          <h2>{product.title}</h2>
          <p>Size: {product.size}</p>
          <p>Wrapper: {product.wrapper}</p>
          <p>Brand: {product.brand}</p>
          <p>Price for Single: ${product.priceForSingle}</p>
          <p>Price for Box: ${product.priceForBox}</p>
          <p>Quantity: {product.quantity}</p>
          <Image
            src={product.img || "/noAvatar.png"}
            alt=""
            width={50}
            height={50}
          />
          <form action={deleteFromCart}>
            <input type="hidden" name="id" value={product._id} />
            <button className={styles.productButton}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default CartItems;

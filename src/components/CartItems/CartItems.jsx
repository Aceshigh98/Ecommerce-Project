import React from "react";
import styles from "./cartItems.module.css";
import { getCheckoutItems, getCartItems } from "@/src/lib/data";
import Image from "next/image";
import { deleteFromCart } from "@/src/lib/action";

const CartItems = async ({ session }) => {
  // Check if user is logged in
  if (!session) {
    return <div>Not authorized</div>;
  }

  // Get checkout items
  const products = await getCheckoutItems(session.user.email);
  // Get cart items
  const cart = await getCartItems(session.user.email);

  // Calculate total
  const getTotal = () => {
    if (!cart || !products || cart.cart.length !== products.length) {
      console.log("Cart or products data is invalid");
      return 0;
    }

    let total = 0;

    for (let i = 0; i < cart.cart.length; i++) {
      const size = cart.cart[i].size;
      const quantity = cart.cart[i].quantity;

      if (size === "single") {
        total += products[i].priceForSingle * quantity;
      } else {
        total += products[i].priceForBox * quantity;
      }
    }
    return total;
  };

  // Check if products and cart are available and calculate total
  const total = getTotal();

  console.log("Total:", total);

  if (!products || !cart) {
    return <div>No items in your cart!</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>
      {products.map((product, index) => (
        <div key={index} className={styles.product}>
          <h2>{product.title}</h2>
          <p>Size: {cart.cart[index].size}</p>
          <p>Wrapper: {product.wrapper}</p>
          <p>Brand: {product.brand}</p>
          <p>Price for Single: ${product.priceForSingle}</p>
          <p>Price for Box: ${product.priceForBox}</p>
          <p>Quantity: {cart.cart[index].quantity}</p>
          <Image
            src={product.img || "/noAvatar.png"}
            alt={product.title}
            width={75}
            height={75}
          />
          {console.log(product)}
          <form action={deleteFromCart}>
            {console.log("Product ID:", product)}
            <input
              type="hidden"
              name="id"
              value={cart.cart[index].uniqueItemId.toString()}
            />
            <input type="hidden" name="email" value={session.user.email} />
            <button className={styles.button}>Delete</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default CartItems;

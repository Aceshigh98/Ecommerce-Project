import React from "react";
import styles from "./cartItems.module.css";
import { getCheckoutItems, getCartItems } from "@/src/lib/data";
import Image from "next/image";
import { deleteFromCart } from "@/src/lib/action";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CartItems = async ({ session }) => {
  // Check if user is logged in
  if (!session) {
    return (
      <div className={styles.authorized}>Not authorized! Please Login.</div>
    );
  }

  // Get checkout items
  const products = (await getCheckoutItems(session.user.email)) || []; // Ensure products is an array

  // Get cart items
  const cart = (await getCartItems(session.user.email)) || { cart: [] }; // Ensure cart is an object with a cart property

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

  if (!Array.isArray(products) || products.length === 0) {
    return <div className={styles.authorized}>No items in your cart!</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.checkoutHeader}>
        <div>
          <h1>Checkout</h1>
          <h2 className={styles.price}>Total: ${total}</h2>
        </div>
        <form action="/api/checkout" method="POST">
          <input
            type="hidden"
            name="priceId"
            value="price_1PsrLnRw5NxiagCtodffB8Vz"
          />
          <input type="hidden" name="orderValue" value={total} />
          <section>
            <button className={styles.button} type="submit" role="link">
              Checkout
            </button>
          </section>
        </form>
      </div>
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product, index) => (
          <div key={index} className={styles.product}>
            <div className={styles.textContainer}>
              <h1>{product.title}</h1>
              <p>Size: {cart.cart[index].size}</p>
              <p>Wrapper: {product.wrapper}</p>
              <p>Brand: {product.brand}</p>
              <p>Price for Single: ${product.priceForSingle}</p>
              <p>Price for Box: ${product.priceForBox}</p>
              <p>Quantity: {cart.cart[index].quantity}</p>
            </div>
            <Image
              src={product.img || "/noAvatar.png"}
              alt={product.title}
              width={300}
              height={300}
            />
            <form action={deleteFromCart}>
              <input
                type="hidden"
                name="id"
                value={cart.cart[index]._id.toString()}
              />
              <input type="hidden" name="email" value={session.user.email} />
              <button className={styles.button}>Delete</button>
            </form>
          </div>
        ))
      ) : (
        <div className={styles.authorized}>No items in your cart!</div>
      )}
    </div>
  );
};

export default CartItems;

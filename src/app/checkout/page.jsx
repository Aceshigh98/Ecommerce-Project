import React from "react";
import CartItems from "@/src/components/CartItems/CartItems";
import { auth } from "@/src/lib/auth";

export const Checkout = async () => {
  const session = await auth();

  return (
    <div>
      <CartItems session={session} />
    </div>
  );
};

export default Checkout;

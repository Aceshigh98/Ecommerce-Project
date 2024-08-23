import { connectDb } from "@/src/lib/database";
import { NextResponse } from "next/server";
import { Cart } from "@/src/lib/models";

export const GET = async (request, { params }) => {
  try {
    const { cart: email } = params;
    connectDb();

    const cart = await Cart.findOne({ userId: email });
    return NextResponse.json(cart);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch cart!");
  }
};

export const DELETE = async (request, { params }) => {
  const { email } = params;

  console.log(email);

  try {
    connectDb();

    await Cart.deleteOne(email);
    return NextResponse.json("Cart deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete cart!");
  }
};

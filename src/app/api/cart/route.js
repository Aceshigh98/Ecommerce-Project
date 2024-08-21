import { connectDb } from "@lib/database";
import { NextResponse } from "next/server";
import { Cart } from "@lib/models";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    connectDb();

    const cart = await Cart.findOne(id).lean();
    return NextResponse.json(cart);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch cart!");
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    connectDb();

    await Cart.deleteOne(id);
    return NextResponse.json("Cart deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete cart!");
  }
};

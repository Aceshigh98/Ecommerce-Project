import { connectDb } from "@/src/lib/database";
import { NextResponse } from "next/server";
import { Cart } from "@/src/lib/models";

export const GET = async (request) => {
  try {
    connectDb();

    const cart = await Cart.find();
    return NextResponse.json(cart);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch cart!");
  }
};

import { connectDb } from "@lib/database";
import { NextResponse } from "next/server";
import { Products } from "@lib/models";

export const GET = async (request) => {
  try {
    connectDb();

    const products = await Product.find();
    return NextResponse.json(products);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products!");
  }
};

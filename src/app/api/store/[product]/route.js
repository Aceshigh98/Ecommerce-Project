import connectDb from "@lib/database";
import { NextResponse } from "next/server";
import { Products } from "@lib/models";

export const GET = async (request, { params }) => {
  const { slug } = params;

  try {
    connectDb();

    const product = await Products.findOne({ slug });
    return NextResponse.json(product);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};

export const DELETE = async (request, { params }) => {
  const { slug } = params;

  try {
    connectDb();

    await Products.deleteOne({ slug });
    return NextResponse.json("Product deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }
};

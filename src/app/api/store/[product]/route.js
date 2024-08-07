import { connectDb } from "@/src/lib/database";
import { NextResponse } from "next/server";
import { Product } from "@/src/lib/models";

export const GET = async (request, { params }) => {
  const { id } = params;

  console.log(id);

  try {
    await connectDb();

    const product = await Product.findOne(id).lean();
    return NextResponse.json(product);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connectDb();

    await Product.deleteOne(id);
    return NextResponse.json("Product deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }
};

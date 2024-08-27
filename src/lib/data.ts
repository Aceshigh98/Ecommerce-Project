import { connectDb } from "@/src/lib/database";
import { User, Product, Cart } from "@/src/lib/models";
import { convertId } from "@/src/utils/utils";
import mongoose, { FlattenMaps, LeanDocument } from "mongoose";

// static data
export const cigarBrands = {
  category: "Brand",
  type: ["Buffalo Trace", "Cohiba", "Oliva", "La Gloria Cubana"],
};
export const cigarSize = {
  category: "Size",
  type: ["Robusto", "Churchill", "Toro"],
};
export const cigarWrapper = {
  category: "Wrapper",
  type: ["Conneticut", "Equadorian Sumatra", "Maduro", "USA Conneticut"],
};

// Product schema actions.

export const getSignatureProducts = async () => {
  try {
    await connectDb();
    const signatureProducts = await Product.find({ signature: true }).lean();
    return convertId(signatureProducts);
  } catch (error) {
    throw new Error("Failed to fetch signature products!");
  }
};

export const getAllProducts = async () => {
  try {
    await connectDb();
    const products = await Product.find().lean();
    return convertId(products);
  } catch (error) {
    throw new Error("Failed to fetch all products!");
  }
};

export const getProduct = async (id: string) => {
  try {
    await connectDb();
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    throw new Error("Failed to fetch product!");
  }
};

//User schema actions.

export const getAllUsers = async () => {

  try {
    await connectDb();
    const users = await User.find().lean();
    return convertId(users);
  } catch (error) {
    throw new Error("Failed to fetch all users!");
  }
};

export const getUser = async (id: number) => {
  
  try {
    await connectDb();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error("Failed to fetch user!");
  }
};

//Cart schema actions.

export const getCartItems = async (userId: string) => {
  try {
    await connectDb();
    const cart = await Cart.findOne({userId});
    return cart;
  } catch (error) {
    throw new Error("Failed to fetch cart items!");
  }
};

export const getCheckoutItems = async (userId: string) => {

  // Define
  interface Product {
    _id: string;
    title: string;
    size: string;
    wrapper: string;
    brand: string;
    priceForSingle: number;
    priceForBox: number;
    quantity: number;
    img: string;
    createdAt?: string;
    updatedAt?: string;
  }

  try {
    await connectDb();
    const cart = await Cart.findOne({userId});

    // If cart is empty, return message
    if (!cart) {
      return "No items in cart!";
    }

    // Fetch product details for each item in cart
    const products = await Promise.all(
      cart.cart.map(async (item: {productId: string, quantity: number,},) => { 
        console.log(item);
        const productDetails = await Product.findById(new mongoose.Types.ObjectId(item.productId)).lean();

        console.log(productDetails);
        // If product not found, return message
        if (!productDetails) {
          return `Product with ID ${item.productId} not found!`;
        }

        return {
          ...productDetails,
          _id: productDetails._id.toString(),
          quantity: productDetails.quantity,

        }
      })
    );
        
    return products;
  } catch (error) {
    throw new Error("Failed to fetch checkout items!");
  }
}




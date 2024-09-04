import { connectDb } from "@/src/lib/database";
import { User, Product, Cart } from "@/src/lib/models";
import { convertId } from "@/src/utils/utils";
import mongoose, { FlattenMaps, Document } from "mongoose";

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

// Define the TypeScript interface for the product
interface ProductType {
  _id: string;
  title: string;
  body: string;
  size: string;
  wrapper: string;
  brand: string;
  priceForSingle: number;
  priceForBox: number;
  singleInStock: number;
  boxInStock: number;
  img: string;
  signature: string;
  createdAt?: string;  // Optional fields
  updatedAt?: string;
  __v?: number;
}

// Update the function to use lean with proper typing
export const getProduct = async (id: string): Promise<ProductType | null> => {
  try {
    await connectDb();

    // Use .lean<ProductType>() to ensure the returned object matches the interface
    const product = await Product.findById(id).lean<ProductType & { createdAt?: Date; updatedAt?: Date; _id: mongoose.Types.ObjectId }>();

    if (product) {
      // Convert complex types to simple values
      return {
        ...product,
        _id: product._id.toString(),  // Convert ObjectId to string
        createdAt: product.createdAt ? new Date(product.createdAt).toISOString() : undefined,  // Convert Date to ISO string
        updatedAt: product.updatedAt ? new Date(product.updatedAt).toISOString() : undefined,  // Convert Date to ISO string
      };
    }

    return null;  // Return null if no product is found
  } catch (error) {
    console.error(error);
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



// Define Product interface for type safety
interface ProductDetails {
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

// Fetch checkout items for a given user
export const getCheckoutItems = async (userId: string) => {
  try {
    await connectDb();
    const cart = await Cart.findOne({ userId });

    // If cart is empty, return message
    if (!cart || cart.cart.length === 0) {
      return "No items in cart!";
    }

    // Fetch product details for each item in cart
    const products = await Promise.all(
      cart.cart.map(async (item: { productId: string; quantity: number }) => {
        // Use lean<ProductDetails> to specify return type
        const productDetails = await Product.findById(new mongoose.Types.ObjectId(item.productId)).lean();

        // Ensure productDetails has the expected structure
        if (!productDetails || !("_id" in productDetails)) {
          return `Product with ID ${item.productId} not found!`;
        }

        // Type assertion to ProductDetails
        const product = productDetails as ProductDetails;

        return {
          ...product,
          _id: product._id.toString(), // Convert _id to string
          quantity: item.quantity, // Use the quantity from the cart item
        };
      })
    );

    return products;
  } catch (error) {
    console.error("Error fetching checkout items:", error);
    throw new Error("Failed to fetch checkout items!");
  }
};





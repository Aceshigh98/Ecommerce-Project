import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    size: { type: String, required: true },
    wrapper: { type: String, required: true },
    brand: { type: String, required: true },
    priceForSingle: { type: Number, required: true },
    priceForBox: { type: Number, required: true },
    singleInStock: { type: Number, required: true },
    boxInStock: { type: Number, required: true },
    img: { type: String, required: false },
    signature: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    name: { type: String },
    email: { type: String, required: true, unique: true, max: 50 },
    password: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const userCartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    cart: [cartItemSchema],  // Array of cart items, each with a unique ID
  },
  {
    timestamps: true,
  }
);

const ordersSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    orderItems: [cartItemSchema],  // Array of cart items, each with a unique ID
    isPaid: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.models?.Product || mongoose.model("Product", productSchema);
export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Cart = mongoose.models?.Cart || mongoose.model("Cart", userCartSchema);
export const Order = mongoose.models?.Order || mongoose.model("Order", ordersSchema);

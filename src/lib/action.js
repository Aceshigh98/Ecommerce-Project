"use server";
import { connectDb } from "./database";
import { User, Product, Cart } from "./models";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

//Login function
export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  console.log(username, password);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};

//Register function
export const register = async (previousState, formData) => {
  console.log(formData);

  const { username, password, email, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    //connect to db
    await connectDb();
    const user = await User.findOne({ username });

    //check if user already exists
    if (user) {
      return { error: "User already exists" };
    }

    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    //create new user
    const newUser = new User({
      username,
      password: hash,
      email,
    });

    //save user
    await newUser.save();
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong! " };
  }
};

//Google login function
export const handleGoogleLogin = async () => {
  "use server";
  await signIn("google");
};

//Logout function
export const handleLogout = async () => {
  "use server";
  await signOut({ callbackUrl: "/" });
};

//Add new user from admin page.

export const addUser = async (prevState, formData) => {
  const { username, name, email, password, isAdmin } =
    Object.fromEntries(formData);

  if (!username || !name || !email || !password) {
    return { error: "Please fill in all required fields" };
  }

  const checkUserName = await User.findOne({ username });
  const checkEmail = await User.findOne({ email });

  if (checkUserName) {
    return { error: "Username already exists" };
  }

  if (checkEmail) {
    return { error: "Email already exists" };
  }

  try {
    await connectDb();

    const newUser = new User({
      username,
      name,
      email,
      password,
      isAdmin,
    });

    await newUser.save();
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

//Delete user function from admin page

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectDb();
    await User.findByIdAndDelete(id);
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

// Add product from admin page.

export const addProduct = async (prevState, formData) => {
  const {
    title,
    body,
    size,
    wrapper,
    brand,
    priceForSingle,
    priceForBox,
    singleInStock,
    boxInStock,
    img,
    signature,
  } = Object.fromEntries(formData);

  if (!title || !body || !size || !wrapper || !brand || !priceForSingle) {
    return { error: "Please fill in all required fields" };
  }

  try {
    await connectDb();

    const newProduct = new Product({
      title,
      body,
      size,
      wrapper,
      brand,
      priceForSingle,
      priceForBox,
      singleInStock,
      boxInStock,
      img,
      signature,
    });

    await newProduct.save();
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

//Delete product function from admin page
export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await connectDb();
    await Product.findByIdAndDelete(id);
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

//add cart items to user
export const addToCart = async (data) => {
  if (!data.id || !data.item || !data.quantity || !data.size) {
    return { error: "Missing required fields" };
  }

  const { id, item, quantity, size } = data;

  try {
    await connectDb();

    // Find the user's cart
    let cart = await Cart.findOne({ userId: id });

    // If no cart exists for the user, create a new one
    if (!cart) {
      cart = new Cart({
        userId: id,
        cart: [
          {
            productId: item._id,
            quantity,
            size,
          },
        ],
      });
      await cart.save();
      revalidatePath("/cart");
      return;
    }

    // Add new item to the cart
    cart.cart.push({
      productId: item._id,
      quantity,
      size,
    });

    await cart.save();
    revalidatePath("/cart");
  } catch (err) {
    console.log(err);
    return { error: "Adding to cart went wrong!" };
  }
};

//remove cart items from user
export const deleteFromCart = async (formData) => {
  console.log(formData);
  const { id, email } = Object.fromEntries(formData);

  if (!id) {
    console.log("Missing required id!");
    return { error: "Missing required id!" };
  }

  if (!email) {
    console.log("Missing required email!");
    return { error: "Missing required email!" };
  }

  try {
    //connect to db
    await connectDb();
    const cart = await Cart.findOne({ userId: email });

    //check if cart exists
    if (!cart) {
      console.log("Cart not found!");
      return { error: "Cart not found!" };
    }

    //update cart
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: email },
      { $pull: { cart: { _id: new mongoose.Types.ObjectId(id) } } },
      { new: true }
    );

    //check if cart was updated
    if (!updatedCart) {
      console.log("Cart not updated!");
      return { error: "Cart not updated!" };
    }

    console.log("Cart updated!");

    //revalidatePath("/cart");
    revalidatePath("/checkout");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

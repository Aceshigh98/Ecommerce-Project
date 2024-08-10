"use server";
import { connectDb } from "./database";
import { User, Product, Cart } from "./models";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

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
    connectDb();
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
  await signOut();
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
    connectDb();

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
    connectDb();
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
    connectDb();

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
    connectDb();
    await Product.findByIdAndDelete(id);
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

//add cart items to user

export const addToCart = async (previousState, formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectDb();
    const cart = await Cart.findById(id);
    if (!cart) {
      const newCart = new Cart({
        user: id,
        cart: [{ product: id, quantity }],
      });
      await newCart.save();
      revalidatePath("/cart");
      return;
    }
    cart.cart.push({ product: id, quantity });
    await cart.save();
    revalidatePath("/cart");
  } catch (err) {
    console.log(err);
    return { error: "Adding to cart went wrong!" };
  }
};

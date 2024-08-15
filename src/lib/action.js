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
    const cart = await Cart.findOne({ userId: id });
    if (!cart) {
      const newCart = new Cart({
        userId: id,
        cart: [{ product: item._id, quantity, size }],
      });
      console.log(newCart);
      await newCart.save();
      revalidatePath("/cart");
      return;
    }
    cart.cart.push({ product: item._id, quantity, size });
    await cart.save();
    revalidatePath("/cart");
  } catch (err) {
    console.log(err);
    return { error: "Adding to cart went wrong!" };
  }
};

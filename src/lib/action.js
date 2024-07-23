"use server";

import { connectDb } from "./database";
import { User } from "./models";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

//Login function
export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  console.log(username, password);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.log(err);

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

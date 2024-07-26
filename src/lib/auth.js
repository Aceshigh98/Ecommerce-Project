import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./models"; // Renamed to avoid conflict with NextAuth's User type
import { connectDb } from "./database";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
  try {
    connectDb();

    const user = await User.findOne({ username: credentials.username });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrext = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrext) throw new Error("Wrong credentials!");

    console.log("User logged in successfully!");
    return user;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to login!");
  }
};

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],

  // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(profile);
      console.log(account);
      if (account.provider === "google") {
        connectDb();
        try {
          const existingUser = await User.findOne({
            email: profile.email,
          });
          if (!existingUser) {
            const newUser = new User({
              email: profile.email,
              name: profile.name,
            });
            await newUser.save();
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      }
      return true;
    },
    //spread callbacks from authConfig function
    ...authConfig.callbacks,
  },
});

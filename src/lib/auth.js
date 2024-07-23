import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "./models"; // Renamed to avoid conflict with NextAuth's User type
import { connectDb } from "./database";

const login = async (credentials) => {
  try {
    connectDb();

    console.log(credentials);

    const user = await User.findOne({ username: credentials.username });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordCorrext = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrext) throw new Error("Wrong credentials!");

    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to login!");
  }
};

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  // PAGES ARE USED TO DEFINE THE AUTHENTICATION ROUTES
  pages: {
    signIn: "/login",
  },

  secret: process.env.AUTH_SECRET,

  // PROVIDERS ARE USED TO DEFINE THE AUTHENTICATION STRATEGY
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
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        connectDb();
        try {
          const existingUser = await User.findOne({ email: profile.email });
          if (!existingUser) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              name: profile.name,
              image: profile.image,
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

    // JWT AND SESSION CALLBACKS ARE USED TO ADD CUSTOM DATA TO THE JWT AND SESSION OBJECTS
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    // SESSION CALLBACK IS USED TO ADD CUSTOM DATA TO THE SESSION OBJECT
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },

    // AUTHORIZED CALLBACK IS USED TO RESTRICT ACCESS TO CERTAIN PAGES
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnAdminPanel = request.nextUrl?.pathname.startsWith("/admin");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
});

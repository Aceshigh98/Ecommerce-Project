export const authConfig = {
  // PAGES OBJECT IS USED TO CONFIGURE THE REDIRECTS
  pages: {
    signIn: "/login",
  },
  // PROVIDERS ARRAY IS USED TO ADD AUTHENTICATION PROVIDERS
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
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
    async authorized({ auth, request }) {
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
};

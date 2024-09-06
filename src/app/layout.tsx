import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/footer";

const roboto = Roboto({
  weight: "700",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aces Cigars",
  description: "Generated by create next app",
  icons: {
    icon: "./favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    // HTML structure
    <html lang="en">
      <body className={roboto.className}>
        <div className="container">
          <SessionProvider>
            <Analytics/>
            <Navbar />
            {children}
            <Footer />
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}

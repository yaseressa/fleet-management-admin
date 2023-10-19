"use client";
import "./globals.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });
const contextClass = {
  success: "bg-primary text-green-600",
  error: "bg-red-600 text-primary",
  info: "bg-blue-600 text-primary",
  warning: "bg-yellow-400 text-primary",
  default: "bg-secondary-600 text-primary",
  dark: "bg-white-600 font-tertiary-300",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Script src="http://localhost:8097"></Script>
      </head>
      <body className={`${inter.className}`}>
        <ToastContainer
          toastClassName={({ type }) =>
            contextClass[type || "default"] +
            " relative flex flex-row flex-nowrap p-2 min-h-14 rounded-lg justify-around items-center cursor-pointer"
          }
          bodyClassName={() =>
            "text-sm font-white p-3 font-med block flex-row flex"
          }
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={true}
          transition={Slide}
        />
        <div className="absolute inset-0 w-1/2 h-1/4 bg-gradient-to-br from-secondary via-transparent to-transparent"></div>
        <div className="bg-tertiary">
          <SessionProvider>{children}</SessionProvider>
        </div>
      </body>
    </html>
  );
}

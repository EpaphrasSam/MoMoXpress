import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import { FaCheck, FaTimes } from "react-icons/fa";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MoMoXpress",
  description:
    "MoMoXpress: Instantly calculate mobile money (MoMo) transfer charges by telco, with support for cross-network fee estimation and optional newsletter updates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 5000,
              style: {
                background: "hsl(231 41% 13%)",
                color: "hsl(226 30% 85%)",
                border: "1px solid hsl(231 41% 20%)",
                fontSize: "0.875rem",
                padding: "16px",
                maxWidth: "400px",
              },
              success: {
                icon: <FaCheck size={24} color="green" />,
                style: {
                  background: "hsl(231 41% 13%)",
                },
                iconTheme: {
                  primary: "#4ADE7B",
                  secondary: "hsl(231 41% 13%)",
                },
              },
              error: {
                icon: <FaTimes size={24} color="red" />,
                style: {
                  background: "hsl(231 41% 13%)",
                },
                iconTheme: {
                  primary: "#E54D2E",
                  secondary: "hsl(231 41% 13%)",
                },
              },
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}

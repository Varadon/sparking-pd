import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";

const braziliaSeven = localFont({
  src: "./fonts/BrasiliaRegular.otf",
  variable: "--font-brasilia-regular",
  weight: "100 900",
});

const interFont = Inter({
  variable: "--font-inter",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Get Sparking!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${braziliaSeven.variable} ${interFont.variable} antialiased font-[family-name:var(--font-brasilia-regular)]`}
      >
        {children}
      </body>
    </html>
  );
}

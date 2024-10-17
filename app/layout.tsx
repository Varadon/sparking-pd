import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const braziliaSeven = localFont({
  src: "./fonts/BrasiliaRegular.otf",
  variable: "--font-brasilia-regular",
  weight: "100 900",
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
        className={`${braziliaSeven.variable} antialiased font-[family-name:var(--font-brasilia-regular)]`}
      >
        {children}
      </body>
    </html>
  );
}

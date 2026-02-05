import "./globals.css";
import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Playfair_Display,
  Dancing_Script,
} from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cursive",
});

export const metadata: Metadata = {
  title: "Restaurant Ordering",
  description: "QR based restaurant ordering system",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${playfair.variable} ${dancing.variable}`}
      >
        {children}
      </body>
    </html>
  );
}

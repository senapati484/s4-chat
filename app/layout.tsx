import type React from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "S4 Chat - Modern AI Chat Interface",
  description: "Clean and modern chat application with multiple AI assistants",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      >
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}

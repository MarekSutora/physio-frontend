import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/header/header";
import "./globals.css";
import Footer from "@/components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diplomovka",
  description: "Created by Marek",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="m-0 h-full p-0">
      <body className={`${inter.className} m-0 h-full p-0 text-gray-950`}>
        <Header />
        <main className="min-h-[var(--min-height-main-section)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

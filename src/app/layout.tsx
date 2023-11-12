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
    <html lang="en">
      <body className={`${inter.className} h-full bg-slate-50 text-gray-950`}>
        {/* <div className="absolute right-[11rem] top-[-10rem] -z-10 h-[31.25rem] w-[31.25rem] rounded-full bg-emerald-200 blur-[25rem]  sm:w-[68.75rem]"></div> */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

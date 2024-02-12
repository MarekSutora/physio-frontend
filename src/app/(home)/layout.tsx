import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/mainPage/common/header/Header";
import Footer from "@/components/mainPage/common/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diplomovka",
  description: "Created by Marek",
};

//f0f9f6
//#f7fffc
//#f5fffc

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="m-0 h-full p-0">
      <body
        className={`${inter.className} m-0 h-full bg-[#f8fffc] p-0 text-gray-950`}
      >
        <Providers>
          <Header />
          <main className="h-auto">{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

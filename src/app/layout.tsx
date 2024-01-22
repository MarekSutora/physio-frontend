import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header/Header1";
import "./globals.css";
import Footer from "@/components/footer/Footer1";
import Providers from "@/components/Providers1";

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
      <body
        className={`${inter.className} m-0 h-full bg-white p-0 text-gray-950`}
      >
        <Providers>
          <Header />
          <main className="min-h-[var(--min-height-main-section)]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

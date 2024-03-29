import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import HeaderDesktop from "@/components/mainPage/common/header/HeaderDesktop";
import HeaderMobile from "@/components/mainPage/common/header/HeaderMobile";
import Footer from "@/components/mainPage/common/footer/Footer";
import HeaderWrapper from "@/components/mainPage/common/header/HeaderWrapper";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fyzioterapia",
  description: "Najlepšia fyzioterapia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" className="m-0 h-full overflow-x-hidden p-0">
      <body
        className={`${inter.className} m-0 h-full w-full bg-slate-50 p-0 text-gray-950`}
      >
        <Providers>
          <div className="flex w-full flex-col">
            <HeaderWrapper />
            <main className="h-auto min-h-[603px] w-full bg-slate-50">
              {children}
            </main>
            <Footer />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}

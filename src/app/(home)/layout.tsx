import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/mainPage/common/footer/Footer";
import HeaderWrapper from "@/components/mainPage/common/header/HeaderWrapper";

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
          <div className="flex h-full w-full flex-col justify-between">
            <HeaderWrapper />
            <main className="h-fit w-full bg-slate-50">{children}</main>
            <Footer />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}

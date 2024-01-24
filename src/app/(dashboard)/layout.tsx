import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/components/Providers";

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
          <div className="flex h-full w-full flex-row justify-start">
            <div className="w-1/6 bg-primary"></div>
            <div>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

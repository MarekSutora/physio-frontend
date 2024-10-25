import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/mainPage/common/footer/Footer";
import HeaderWrapper from "@/components/mainPage/common/header/HeaderWrapper";
import { Suspense } from "react";
import ClipLoader from "react-spinners/ClipLoader";

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
          <div className="h-fit w-full">
            <HeaderWrapper />
            <div className="flex h-fit flex-col justify-between">
              <main className="h-fit w-full bg-slate-50" style={{ height: "calc(100vh - 18rem - 3.5rem)" }}>
                {/* <Suspense
                  fallback={
                    <ClipLoader
                      color={"#298294"}
                      loading={true}
                      cssOverride={{
                        width: "500px",
                        height: "500px",
                        display: "block",
                        margin: "0 auto",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                      size={100}
                      aria-label="Loading Spinner"
                      className="flex h-full w-full items-center justify-center"
                    />
                  }
                > */}
                {children}
                {/* </Suspense> */}
              </main>
              <Footer />
            </div>

            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}

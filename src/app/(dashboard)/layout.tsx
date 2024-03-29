import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/components/Providers";
import DashboardNavigationPanel from "@/components/dashboard/navigation/DashboardNavigationPanel";
import { cn } from "@/lib/utils/utils";
import DashboardHeader from "@/components/dashboard/navigation/DashboardHeader";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fyzioterapia - Dashboard",
  description: "Najlepšia fyzioterapia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" className="m-0 h-full w-full p-0">
      <body
        className={cn(
          inter.className,
          "m-0 h-full w-full bg-white p-0 text-gray-950",
        )}
      >
        <Providers>
          <div className="flex h-full w-full flex-grow flex-col overflow-y-auto xl:flex-row">
            <DashboardNavigationPanel />
            <main className="flex h-full max-h-full w-full flex-col items-start gap-2 bg-slate-50 p-2">
              <DashboardHeader />
              <Suspense
                fallback={
                  <ClipLoader
                    color={"#298294"}
                    loading={true}
                    cssOverride={{
                      width: "500px",
                      height: "500px",
                      display: "block",
                      margin: "0 auto",
                    }}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    className="flex h-full w-full items-center justify-center"
                  />
                }
              >
                {children}
              </Suspense>
            </main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

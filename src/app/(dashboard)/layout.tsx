import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/components/Providers";
import DashboardNavigationPanel from "@/components/dashboard/navigation/DashboardNavigationPanel";
import { cn } from "@/lib/utils";
import DashboardHeader from "@/components/dashboard/navigation/DashboardHeader";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";

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
    <html lang="en" className="m-0 h-full w-full p-0">
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
              <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
            </main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

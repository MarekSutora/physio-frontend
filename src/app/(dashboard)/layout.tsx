import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/components/Providers";
import DashboardNavigationPanel from "@/components/dashboard/navigation/DashboardNavigationPanel";
import { cn } from "@/lib/utils";
import LogoImage from "@/components/mainPage/common/logo/LogoImage";
import DashboardDesktopHeader from "@/components/dashboard/navigation/desktop/DashboardDesktopHeader";
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
    <html lang="en" className="m-0 h-full p-0">
      <body
        className={cn(inter.className, "m-0 h-full bg-white p-0 text-gray-950")}
      >
        <Providers>
          <div className="flex h-full w-full flex-col md:flex-row">
            <DashboardNavigationPanel />
            <div className="flex h-auto w-full flex-col items-start gap-3 bg-slate-50 p-3">
              <DashboardDesktopHeader />
              <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/components/Providers";
import DashboardNavigationPanel from "@/components/dashboard/navigation/DashboardNavigationPanel";
import { cn } from "@/lib/utils";

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
            <div className="flex h-full w-full flex-col items-start gap-3 bg-slate-50 p-3">
              <section className="h-auto w-full border-slate-200 bg-white p-2 md:rounded-lg md:border-2"></section>
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

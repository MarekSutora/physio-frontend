import "@/app/globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Movelife - Obnovenie hesla",
  description: "Obnovenie hesla.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="m-0 h-full p-0">
      <body
        className={`${inter.className} m-0 flex h-full w-full items-center justify-center bg-slate-50 p-0 text-gray-950`}
      >
        {children}
      </body>
    </html>
  );
}

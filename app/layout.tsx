import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  title: "Pharmacy",
  description: "Medicine App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="bodyScroll"  className={`${poppins.className} w-full h-screen`}>
        {children}
      </body>
    </html>
  );
}

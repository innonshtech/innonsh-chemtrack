import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";

const googleSans = localFont({
  src: [
    {
      path: './fonts/GoogleSans.ttf',
      style: 'normal',
    },
    {
      path: './fonts/GoogleSans-Italic.ttf',
      style: 'italic',
    }
  ],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Innonsh Chemtrack",
  description: "Chemical Inventory Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { RecaptchaProvider } from "@/components/providers/RecaptchaProvider";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Raise Your AIQ | Synaptiq",
  description: "Discover your organization's AI maturity with our free assessment.",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} antialiased`}>
        <RecaptchaProvider>
          {children}
        </RecaptchaProvider>
      </body>
    </html>
  );
}

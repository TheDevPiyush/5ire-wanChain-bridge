import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "../providers/theme-provider";
import { WalletProvider } from "@/hooks/useWallet";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "5ire Coin Transer",
  description: "This app allows users to transer the 5ire Coin from 5ireChain to another blockchain networks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <WalletProvider>
            <Toaster />
            {children}
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}

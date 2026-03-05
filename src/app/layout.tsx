import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { StageModeProvider } from "@/context/stage-mode-context";
import SmoothScroll from "@/components/smooth-scroll";
import FullscreenMenu from "@/components/fullscreen-menu";
import StageModeButton from "@/components/stage-mode-button";
import CustomCursor from "@/components/custom-cursor";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "KARINA — Visual Archive",
  description: "A cinematic digital archive dedicated to aespa's Karina",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${inter.variable} antialiased`}>
        <StageModeProvider>
          <SmoothScroll>
            <CustomCursor />
            <FullscreenMenu />
            <main>{children}</main>
            <StageModeButton />
          </SmoothScroll>
        </StageModeProvider>
      </body>
    </html>
  );
}

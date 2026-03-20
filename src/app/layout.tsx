import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { StageModeProvider } from "@/context/stage-mode-context";
import SmoothScroll from "@/components/smooth-scroll";
import FullscreenMenu from "@/components/fullscreen-menu";
import StageModeButton from "@/components/stage-mode-button";
import CustomCursor from "@/components/custom-cursor";

const suisseWorks = localFont({
  src: [
    {
      path: "./fonts/suisse-font-family/SuisseWorksTrial-Book.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/suisse-font-family/SuisseWorksTrial-BookItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/suisse-font-family/SuisseWorksTrial-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/suisse-font-family/SuisseWorksTrial-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/suisse-font-family/SuisseWorksTrial-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/suisse-font-family/SuisseWorksTrial-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/suisse-font-family/SuisseWorksTrial-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/suisse-font-family/SuisseWorksTrial-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-suisse-works",
  display: "swap",
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
      <body className={`${suisseWorks.variable} antialiased`}>
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

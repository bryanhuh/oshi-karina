"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStageMode } from "@/context/stage-mode-context";
import { EASE } from "@/lib/motion";

const navItems = [
  { label: "HOME", href: "/" },
  { label: "WORKS", href: "/eras" },
  { label: "GALLERY", href: "/gallery" },
  { label: "TIMELINE", href: "/timeline" },
];

const letterVariants = {
  initial: { y: "100%", opacity: 0 },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.05 * i,
      duration: 0.6,
      ease: EASE,
    },
  }),
  exit: (i: number) => ({
    y: "-100%",
    opacity: 0,
    transition: {
      delay: 0.03 * i,
      duration: 0.4,
      ease: EASE,
    },
  }),
};

const overlayVariants = {
  initial: { clipPath: "inset(0 0 100% 0)" },
  animate: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.7, ease: EASE },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.5, ease: EASE, delay: 0.3 },
  },
};

export default function FullscreenMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { stageMode, toggleStageMode } = useStageMode();

  return (
    <>
      {/* Floating Nav Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference">
        <Link href="/" className="font-display text-sm tracking-[0.3em] text-silver font-medium">
          KARINA
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="font-display text-xs tracking-[0.4em] text-silver/70 hover:text-silver transition-colors duration-300"
          aria-label="Open menu"
        >
          MENU
        </button>
      </nav>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-night flex flex-col"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-8 py-6">
              <span className="font-display text-sm tracking-[0.3em] text-silver/40">
                KARINA
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="font-display text-xs tracking-[0.4em] text-silver/50 hover:text-silver transition-colors duration-300"
              >
                CLOSE
              </button>
            </div>

            {/* Nav Items */}
            <div className="flex-1 flex flex-col justify-center px-12 md:px-20">
              {navItems.map((item, i) => (
                <div key={item.href} className="overflow-hidden border-b border-silver/10 py-2">
                  <motion.div
                    custom={i}
                    variants={letterVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-none tracking-tight transition-colors duration-300 ${
                        pathname === item.href
                          ? "text-neon-blue"
                          : "text-silver hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Stage Mode & Footer */}
            <div className="px-12 md:px-20 py-10 flex items-end justify-between">
              <button
                onClick={() => {
                  toggleStageMode();
                  setIsOpen(false);
                }}
                className={`group flex items-center gap-4 font-display text-xs tracking-[0.4em] transition-colors duration-300 ${
                  stageMode ? "text-neon-blue" : "text-silver/50 hover:text-silver"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    stageMode ? "bg-neon-blue" : "bg-silver/30"
                  }`}
                />
                {stageMode ? "EXIT STAGE" : "ENTER STAGE"}
              </button>
              <span className="font-display text-xs tracking-widest text-silver/20">
                ARCHIVE © 2024
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

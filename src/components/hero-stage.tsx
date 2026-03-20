"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useStageMode } from "@/context/stage-mode-context";
import { EASE } from "@/lib/motion";

const verticalLetters = ["K", "A", "R", "I", "N", "A"];

const containerVariants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const letterVariants = {
  initial: { y: 120, opacity: 0, skewY: 8 },
  animate: {
    y: 0,
    opacity: 1,
    skewY: 0,
    transition: { duration: 1, ease: EASE },
  },
};

const imageRevealVariants = {
  initial: { clipPath: "inset(100% 0% 0% 0%)" },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.2, ease: EASE, delay: 0.5 },
  },
};

const fadeUpVariants = {
  initial: { y: 40, opacity: 0 },
  animate: (d: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE, delay: d },
  }),
};

export default function HeroStage() {
  const equalizerRef = useRef<HTMLDivElement>(null);
  const { stageMode } = useStageMode();

  useEffect(() => {
    const bars = equalizerRef.current?.querySelectorAll(".eq-bar");
    if (!bars) return;

    const intervals: ReturnType<typeof setInterval>[] = [];
    bars.forEach((bar) => {
      const el = bar as HTMLElement;
      const interval = setInterval(() => {
        const h = Math.random() * 60 + 10;
        el.style.height = `${h}%`;
      }, 200 + Math.random() * 300);
      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section
      className={`relative min-h-screen overflow-hidden flex items-center transition-colors duration-700 ${stageMode ? "bg-night" : "bg-royal-blue"
        }`}
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${stageMode ? "opacity-100" : "opacity-60"
          }`}
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, #1A5FD2 0%, transparent 60%), radial-gradient(ellipse at 10% 80%, #0F3F8C 0%, transparent 50%)",
        }}
      />

      {/* Large vertical KARINA letters — editorial background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="flex flex-col leading-[0.85] opacity-[0.07]">
          {verticalLetters.map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="block font-display font-black text-white"
              style={{ fontSize: "clamp(8rem, 18vw, 20rem)" }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Main editorial grid */}
      <div className="relative z-10 w-full grid grid-cols-12 gap-4 px-8 md:px-16 min-h-screen items-center">
        {/* Left text block — columns 1-3 */}
        <div className="col-span-12 md:col-span-3 flex flex-col justify-end pb-20 md:pb-0 md:self-end md:mb-24 order-2 md:order-1">
          <motion.p
            custom={1.2}
            variants={fadeUpVariants}
            initial="initial"
            animate="animate"
            className="font-body text-xs tracking-[0.4em] text-neon-blue mb-6 uppercase"
          >
            Visual Archive
          </motion.p>
          <motion.p
            custom={1.4}
            variants={fadeUpVariants}
            initial="initial"
            animate="animate"
            className="font-body text-sm text-silver/60 leading-relaxed max-w-xs"
          >
            Documenting the artistry of aespa&apos;s Karina — from debut through every era.
          </motion.p>
        </div>

        {/* Center image — columns 4-10 */}
        <motion.div
          className="col-span-12 md:col-span-7 md:col-start-4 relative aspect-[3/4] md:aspect-[4/5] order-1 md:order-2"
          variants={imageRevealVariants}
          initial="initial"
          animate="animate"
        >
          <div
            className="w-full h-full"
            style={{
              background: stageMode
                ? "linear-gradient(135deg, #05070C 0%, #0F3F8C 60%, #1A5FD2 100%)"
                : "linear-gradient(135deg, #0F3F8C 0%, #1A5FD2 50%, #6FAEFF 100%)",
            }}
          >
            {/* Karina image */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/assets/karina-02.png"
                alt="Karina"
                fill
                priority
                className="object-cover object-center"
              />
              {/* Subtle gradient to blend the bottom of the image into the container */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                style={{
                  background: stageMode
                    ? "linear-gradient(to top, #05070C 0%, transparent 100%)"
                    : "linear-gradient(to top, #0F3F8C 0%, transparent 100%)",
                }}
              />
            </div>
            <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
              <span className="font-display text-xs tracking-[0.4em] text-silver/40">
                AESPA
              </span>
              <span className="font-display text-xs tracking-[0.4em] text-silver/40">
                2020 — PRESENT
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right column — columns 11-12 */}
        <div className="hidden md:flex col-span-2 flex-col items-center justify-center gap-8 order-3">
          <motion.div
            custom={1.6}
            variants={fadeUpVariants}
            initial="initial"
            animate="animate"
            className="writing-mode-vertical font-body text-xs tracking-[0.4em] text-silver/30 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll to explore
          </motion.div>
        </div>
      </div>

      {/* Headline overlay — large text behind image */}
      <motion.div
        className="absolute bottom-8 left-8 md:left-16 right-8 md:right-16 pointer-events-none"
        custom={1.8}
        variants={fadeUpVariants}
        initial="initial"
        animate="animate"
      >
        <h1
          className="font-display font-black text-white leading-none tracking-tight mix-blend-overlay opacity-60"
          style={{ fontSize: "clamp(5rem, 14vw, 14rem)" }}
        >
          KARINA
        </h1>
      </motion.div>

      {/* Equalizer animation */}
      <motion.div
        ref={equalizerRef}
        className="absolute bottom-0 left-0 right-0 h-16 flex items-end gap-[2px] px-8 opacity-30"
        custom={2}
        variants={fadeUpVariants}
        initial="initial"
        animate="animate"
      >
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="eq-bar flex-1 bg-neon-blue rounded-t-sm transition-all duration-200"
            style={{ height: `${Math.random() * 60 + 10}%` }}
          />
        ))}
      </motion.div>
    </section>
  );
}

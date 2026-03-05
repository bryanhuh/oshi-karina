"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import EraSection from "@/components/era-section";
import { eras } from "@/data/eras";
import { useStageMode } from "@/context/stage-mode-context";

export default function ErasPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { stageMode } = useStageMode();

  return (
    <>
      {/* Page header */}
      <section
        ref={ref}
        className={`relative h-screen flex items-end overflow-hidden transition-colors duration-700 ${
          stageMode ? "bg-night" : "bg-royal-blue"
        }`}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, #1A5FD2 0%, transparent 60%)",
          }}
        />

        {/* Huge background text */}
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none pr-4">
          <motion.span
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 0.04, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="font-display font-black text-white select-none whitespace-nowrap"
            style={{ fontSize: "clamp(10rem, 28vw, 30rem)" }}
          >
            WORKS
          </motion.span>
        </div>

        <div className="relative z-10 px-8 md:px-16 pb-24 w-full">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            className="font-display text-xs tracking-[0.5em] text-neon-blue uppercase mb-6"
          >
            Discography
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="font-display font-black text-white leading-none"
            style={{ fontSize: "clamp(4rem, 10vw, 10rem)" }}
          >
            Works &amp; Eras
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.55 }}
            className="font-body text-silver/50 text-sm mt-6 max-w-md leading-relaxed"
          >
            Each era is a visual and sonic statement. Scroll through the
            chapters of Karina&apos;s artistry.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute right-8 bottom-24 flex flex-col items-center gap-2"
        >
          <div className="w-px h-16 bg-silver/20 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 right-0 bg-neon-blue"
              animate={{ y: ["0%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              style={{ height: "30%" }}
            />
          </div>
          <span
            className="font-display text-[10px] tracking-[0.4em] text-silver/30 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
        </motion.div>
      </section>

      {/* Era sections */}
      {eras.map((era, i) => (
        <EraSection key={era.id} era={era} index={i} />
      ))}

      {/* Footer */}
      <footer
        className={`py-16 px-8 md:px-16 border-t border-silver/10 transition-colors duration-700 ${
          stageMode ? "bg-night" : "bg-royal-blue"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-xs tracking-widest text-silver/20">
            KARINA VISUAL ARCHIVE
          </span>
          <span className="font-display text-xs tracking-widest text-silver/20">
            2020 — 2024
          </span>
        </div>
      </footer>
    </>
  );
}

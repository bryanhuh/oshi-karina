"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TimelineScroll from "@/components/timeline-scroll";
import { eras } from "@/data/eras";
import { useStageMode } from "@/context/stage-mode-context";

export default function TimelinePage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { stageMode } = useStageMode();

  return (
    <>
      {/* Page header */}
      <section
        ref={ref}
        className={`relative h-[60vh] flex items-end overflow-hidden transition-colors duration-700 ${
          stageMode ? "bg-night" : "bg-royal-blue"
        }`}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, #1A5FD2 0%, transparent 60%)",
          }}
        />

        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
          <motion.span
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 0.04, x: 0 } : {}}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="font-display font-black text-white select-none whitespace-nowrap"
            style={{ fontSize: "clamp(8rem, 22vw, 26rem)" }}
          >
            TIMELINE
          </motion.span>
        </div>

        <div className="relative z-10 px-8 md:px-16 pb-16 w-full">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-display text-xs tracking-[0.5em] text-neon-blue uppercase mb-4"
          >
            Chronology
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-display font-black text-white leading-none"
            style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
          >
            Timeline
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="font-body text-silver/50 text-sm mt-4 max-w-md leading-relaxed"
          >
            Click any era to expand its editorial content.
          </motion.p>
        </div>
      </section>

      {/* Timeline content */}
      <section
        className={`relative py-24 transition-colors duration-700 ${
          stageMode ? "bg-night" : "bg-royal-blue"
        }`}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "linear-gradient(180deg, #1A5FD210 0%, transparent 30%)",
          }}
        />
        <TimelineScroll eras={eras} />
      </section>

      {/* Visual era index */}
      <section
        className={`py-24 px-8 md:px-16 transition-colors duration-700 ${
          stageMode ? "bg-night" : "bg-night"
        }`}
      >
        <div className="mb-12">
          <span className="font-display text-xs tracking-[0.5em] text-silver/30 uppercase">
            Era Index
          </span>
        </div>

        <div className="grid grid-cols-5 gap-px bg-silver/5">
          {eras.map((era) => (
            <motion.div
              key={era.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[3/4] overflow-hidden group cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${era.theme_color} 0%, ${era.accent_color}20 100%)`,
              }}
            >
              <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                <p
                  className="font-display text-[10px] tracking-[0.4em] uppercase mb-1 opacity-60"
                  style={{ color: era.accent_color }}
                >
                  {era.year}
                </p>
                <p className="font-display font-bold text-white text-sm leading-tight">
                  {era.name}
                </p>
              </div>

              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${era.accent_color}20 0%, ${era.accent_color}40 100%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-16 px-8 md:px-16 border-t border-silver/10 transition-colors duration-700 ${
          stageMode ? "bg-night" : "bg-night"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-xs tracking-widest text-silver/20">
            KARINA VISUAL ARCHIVE
          </span>
          <span className="font-display text-xs tracking-widest text-silver/20">
            2020 — {eras[eras.length - 1].year}
          </span>
        </div>
      </footer>
    </>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Era } from "@/data/eras";
import { useStageMode } from "@/context/stage-mode-context";
import { EASE } from "@/lib/motion";

const maskReveal = {
  initial: { clipPath: "inset(0 100% 0 0)" },
  animate: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1, ease: EASE },
  },
};

const slideUp = {
  initial: { y: 60, opacity: 0 },
  animate: (d: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE, delay: d },
  }),
};

type Props = {
  era: Era;
  index: number;
};

export default function EraSection({ era, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const isEven = index % 2 === 0;
  const { stageMode } = useStageMode();

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden py-24"
      style={{
        background: stageMode
          ? `linear-gradient(135deg, ${era.theme_color} 0%, #05070C 100%)`
          : `linear-gradient(135deg, ${era.theme_color} 0%, #0F3F8C 100%)`,
      }}
    >
      {/* Era number background */}
      <div
        className="absolute pointer-events-none select-none font-display font-black leading-none opacity-[0.04]"
        style={{
          fontSize: "clamp(12rem, 35vw, 40rem)",
          color: era.accent_color,
          top: "50%",
          left: isEven ? "-5%" : "auto",
          right: isEven ? "auto" : "-5%",
          transform: "translateY(-50%)",
        }}
      >
        {era.year}
      </div>

      <div className="relative z-10 w-full grid grid-cols-12 gap-6 px-8 md:px-16">
        {/* Text block */}
        <div
          className={`col-span-12 md:col-span-4 flex flex-col justify-center ${
            isEven ? "md:col-start-1 order-2 md:order-1" : "md:col-start-8 order-2"
          }`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <span
              className="font-display text-xs tracking-[0.5em] uppercase"
              style={{ color: era.accent_color }}
            >
              {era.year}
            </span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h2
              custom={0.2}
              variants={slideUp}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              className="font-display font-black text-white leading-none tracking-tight"
              style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
            >
              {era.name}
            </motion.h2>
          </div>

          <motion.p
            custom={0.35}
            variants={slideUp}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="font-body text-silver/60 text-sm leading-relaxed mb-8 max-w-sm"
          >
            {era.description}
          </motion.p>

          <motion.div
            custom={0.45}
            variants={slideUp}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="space-y-2"
          >
            <p
              className="font-display text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: `${era.accent_color}80` }}
            >
              Tracks
            </p>
            {era.songs.slice(0, 4).map((song, i) => (
              <div
                key={i}
                className="flex items-center gap-3 font-body text-xs text-silver/50"
              >
                <span
                  className="w-4 h-px"
                  style={{ background: era.accent_color }}
                />
                {song}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Image block */}
        <div
          className={`col-span-12 md:col-span-7 ${
            isEven
              ? "md:col-start-5 order-1 md:order-2"
              : "md:col-start-1 order-1"
          }`}
        >
          <motion.div
            variants={maskReveal}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="relative aspect-[4/3] md:aspect-[16/10]"
          >
            <div
              className="w-full h-full"
              style={{
                background: `linear-gradient(135deg, ${era.theme_color} 0%, ${era.accent_color}40 100%)`,
              }}
            >
              {/* Era name overlay on image */}
              <div className="absolute inset-0 flex items-end p-8">
                <span
                  className="font-display font-black leading-none opacity-20"
                  style={{
                    fontSize: "clamp(4rem, 10vw, 10rem)",
                    color: era.accent_color,
                  }}
                >
                  {era.name.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Accent line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: era.accent_color }}
            />
          </motion.div>

          {/* Era album label */}
          {era.album && (
            <motion.div
              custom={0.6}
              variants={slideUp}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              className="mt-4 flex items-center gap-4"
            >
              <div
                className="h-px flex-1 opacity-20"
                style={{ background: era.accent_color }}
              />
              <span
                className="font-display text-xs tracking-[0.4em] uppercase opacity-50"
                style={{ color: era.accent_color }}
              >
                {era.album}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

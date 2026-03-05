"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Era } from "@/data/eras";

type Props = {
  eras: Era[];
};

export default function TimelineScroll({ eras }: Props) {
  const [activeEra, setActiveEra] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/* Horizontal timeline bar */}
      <div className="relative overflow-x-auto pb-8 mb-16">
        <div className="flex items-center gap-0 min-w-max px-8 md:px-16">
          {eras.map((era, i) => (
            <div key={era.id} className="flex items-center">
              <button
                onClick={() =>
                  setActiveEra(activeEra === era.id ? null : era.id)
                }
                className="group relative flex flex-col items-center gap-4 px-8"
              >
                {/* Year label */}
                <motion.span
                  animate={{
                    color: activeEra === era.id ? era.accent_color : "#C9D3E680",
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-sm tracking-widest font-medium"
                >
                  {era.year}
                </motion.span>

                {/* Dot */}
                <motion.div
                  animate={{
                    scale: activeEra === era.id ? 1.5 : 1,
                    backgroundColor:
                      activeEra === era.id ? era.accent_color : "#C9D3E640",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-2.5 h-2.5 rounded-full"
                />

                {/* Era name */}
                <motion.span
                  animate={{
                    color: activeEra === era.id ? "#ffffff" : "#C9D3E640",
                    y: activeEra === era.id ? -4 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-xs tracking-[0.3em] uppercase whitespace-nowrap"
                >
                  {era.name}
                </motion.span>
              </button>

              {/* Connector line */}
              {i < eras.length - 1 && (
                <div className="w-16 h-px bg-silver/10" />
              )}
            </div>
          ))}
        </div>

        {/* Base line */}
        <div className="absolute left-0 right-0 top-[calc(50%+2px)] h-px bg-silver/10 pointer-events-none" />
      </div>

      {/* Expanded content block */}
      <div className="px-8 md:px-16">
        {eras.map((era) => (
          <motion.div
            key={era.id}
            initial={false}
            animate={{
              height: activeEra === era.id ? "auto" : 0,
              opacity: activeEra === era.id ? 1 : 0,
            }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden"
          >
            <div
              className="grid grid-cols-12 gap-8 py-12 border-t"
              style={{ borderColor: `${era.accent_color}30` }}
            >
              {/* Era visual */}
              <div className="col-span-12 md:col-span-5">
                <div
                  className="aspect-[16/10] relative"
                  style={{
                    background: `linear-gradient(135deg, ${era.theme_color} 0%, ${era.accent_color}30 100%)`,
                  }}
                >
                  <div className="absolute inset-0 flex items-end p-6">
                    <span
                      className="font-display font-black text-white/10 leading-none"
                      style={{ fontSize: "clamp(4rem, 8vw, 8rem)" }}
                    >
                      {era.name}
                    </span>
                  </div>
                  <div
                    className="absolute top-4 left-4 font-display text-xs tracking-[0.4em]"
                    style={{ color: era.accent_color }}
                  >
                    {era.year}
                  </div>
                </div>
              </div>

              {/* Era details */}
              <div className="col-span-12 md:col-span-7 flex flex-col justify-center">
                <h3
                  className="font-display font-black text-white mb-6"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
                >
                  {era.name}
                </h3>
                <p className="font-body text-silver/60 text-sm leading-relaxed mb-8 max-w-lg">
                  {era.description}
                </p>

                {/* Song list */}
                <div className="grid grid-cols-2 gap-3">
                  {era.songs.map((song, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 font-body text-xs"
                    >
                      <span
                        className="text-[8px] font-display"
                        style={{ color: era.accent_color }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-silver/50">{song}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

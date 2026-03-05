"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MosaicGallery from "@/components/mosaic-gallery";
import { photos } from "@/data/media";
import { useStageMode } from "@/context/stage-mode-context";

export default function GalleryPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { stageMode } = useStageMode();

  const displayPhotos = stageMode
    ? photos.filter((p) => p.category === "stage")
    : photos;

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
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 20% 100%, #1A5FD2 0%, transparent 60%)",
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <motion.span
            initial={{ opacity: 0, scale: 1.1 }}
            animate={isInView ? { opacity: 0.04, scale: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="font-display font-black text-white select-none"
            style={{ fontSize: "clamp(10rem, 30vw, 32rem)" }}
          >
            GALLERY
          </motion.span>
        </div>

        <div className="relative z-10 px-8 md:px-16 pb-16 w-full">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-display text-xs tracking-[0.5em] text-neon-blue uppercase mb-4"
          >
            {stageMode ? "Stage Mode — Performance Archive" : "Photo Archive"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-display font-black text-white leading-none"
            style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
          >
            Gallery
          </motion.h1>
        </div>
      </section>

      {/* Gallery content */}
      <section
        className={`relative px-8 md:px-16 py-20 transition-colors duration-700 ${
          stageMode ? "bg-night" : "bg-royal-blue"
        }`}
      >
        {stageMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 px-4 py-3 border border-neon-blue/30 inline-flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
            <span className="font-display text-xs tracking-[0.4em] text-neon-blue uppercase">
              Stage Mode Active — Showing Performance Photos Only
            </span>
          </motion.div>
        )}

        <MosaicGallery photos={displayPhotos} />
      </section>

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
            {displayPhotos.length} photos
          </span>
        </div>
      </footer>
    </>
  );
}

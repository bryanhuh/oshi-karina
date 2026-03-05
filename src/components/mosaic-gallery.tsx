"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Photo } from "@/data/media";
import { useStageMode } from "@/context/stage-mode-context";
import { EASE } from "@/lib/motion";

type Props = {
  photos: Photo[];
  filterCategory?: string;
};

const categories = ["all", "stage", "concept", "editorial", "behind"];

export default function MosaicGallery({ photos }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { stageMode } = useStageMode();

  const filteredPhotos =
    activeCategory === "all"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const filtered = stageMode
    ? filteredPhotos.filter((p) => p.category === "stage")
    : filteredPhotos;

  return (
    <div className="w-full">
      {/* Filter bar */}
      <div className="flex items-center gap-6 mb-12 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`font-display text-xs tracking-[0.4em] uppercase whitespace-nowrap transition-colors duration-300 pb-2 border-b ${
              activeCategory === cat
                ? "text-neon-blue border-neon-blue"
                : "text-silver/40 border-transparent hover:text-silver/70"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mosaic grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        <AnimatePresence>
          {filtered.map((photo, i) => (
            <GalleryItem
              key={photo.id}
              photo={photo}
              index={i}
              isHovered={hoveredId === photo.id}
              onHover={(id) => setHoveredId(id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function GalleryItem({
  photo,
  index,
  isHovered,
  onHover,
}: {
  photo: Photo;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const aspectMap: Record<Photo["size"], string> = {
    large: "aspect-[3/4]",
    medium: "aspect-[4/5]",
    small: "aspect-[4/3]",
    wide: "aspect-[16/9]",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.6,
        ease: EASE,
        delay: (index % 8) * 0.05,
      }}
      className="break-inside-avoid mb-3 relative overflow-hidden cursor-pointer group"
      onMouseEnter={() => onHover(photo.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className={`w-full ${aspectMap[photo.size]} relative overflow-hidden`}
        style={{
          background: `linear-gradient(135deg, #0F3F8C 0%, #1A5FD2 50%, #6FAEFF40 100%)`,
        }}
      >
        {/* Placeholder visual */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display text-xs tracking-[0.4em] uppercase text-silver/20"
          >
            {photo.category}
          </span>
        </div>

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-night/70 flex flex-col justify-end p-4"
        >
          <p className="font-display text-xs tracking-[0.3em] text-neon-blue uppercase mb-1">
            {photo.category}
          </p>
          <p className="font-body text-sm text-silver font-medium">
            {photo.title}
          </p>
          <p className="font-body text-xs text-silver/40 mt-1">{photo.date}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

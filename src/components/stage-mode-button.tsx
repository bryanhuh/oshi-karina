"use client";

import { motion } from "framer-motion";
import { useStageMode } from "@/context/stage-mode-context";

export default function StageModeButton() {
  const { stageMode, toggleStageMode } = useStageMode();

  return (
    <motion.button
      onClick={toggleStageMode}
      className="fixed bottom-8 right-8 z-40 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className={`relative px-6 py-3 font-display text-xs tracking-[0.4em] uppercase transition-all duration-500 ${
          stageMode
            ? "bg-neon-blue text-night"
            : "bg-transparent text-silver/50 border border-silver/20 hover:border-silver/50 hover:text-silver"
        }`}
      >
        {/* Glow effect when active */}
        {stageMode && (
          <motion.div
            className="absolute inset-0 bg-neon-blue"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "blur(12px)", zIndex: -1 }}
          />
        )}
        {stageMode ? "EXIT STAGE" : "ENTER STAGE"}
      </div>
    </motion.button>
  );
}

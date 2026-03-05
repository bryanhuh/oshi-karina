import type { Transition } from "framer-motion";

// Cinematic cubic bezier easing
export const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export const cinematic = (delay = 0, duration = 0.9): Transition => ({
  duration,
  ease: EASE,
  delay,
});

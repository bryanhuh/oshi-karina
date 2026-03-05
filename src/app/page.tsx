"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import HeroStage from "@/components/hero-stage";
import { eras } from "@/data/eras";
import { useStageMode } from "@/context/stage-mode-context";
import { EASE } from "@/lib/motion";

const fadeUp = {
  initial: { y: 50, opacity: 0 },
  animate: (d: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE, delay: d },
  }),
};

function IntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const { stageMode } = useStageMode();

  return (
    <section
      ref={ref}
      className={`relative min-h-screen flex items-center overflow-hidden transition-colors duration-700 ${
        stageMode ? "bg-night" : "bg-royal-blue"
      }`}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, #1A5FD2 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 grid grid-cols-12 gap-4 px-8 md:px-16 w-full py-24">
        {/* Oversized background text */}
        <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
          <motion.span
            initial={{ x: "10%", opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 0.04 } : {}}
            transition={{ duration: 1.2, ease: EASE }}
            className="font-display font-black text-white whitespace-nowrap select-none"
            style={{ fontSize: "clamp(8rem, 20vw, 22rem)" }}
          >
            ARCHIVE
          </motion.span>
        </div>

        {/* Left quote */}
        <div className="col-span-12 md:col-span-5 md:col-start-2 flex flex-col justify-center">
          <motion.div
            custom={0.1}
            variants={fadeUp}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="mb-8"
          >
            <span className="font-display text-xs tracking-[0.5em] text-neon-blue uppercase">
              About
            </span>
          </motion.div>

          <motion.h2
            custom={0.2}
            variants={fadeUp}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="font-display font-black text-white leading-tight mb-8"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            Stage. Screen.
            <br />
            <span className="text-neon-blue">Presence.</span>
          </motion.h2>

          <motion.p
            custom={0.35}
            variants={fadeUp}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="font-body text-silver/60 text-sm leading-relaxed max-w-md"
          >
            Yu Ji-min, known professionally as Karina, is the leader of SM
            Entertainment&apos;s aespa. This archive traces her artistic journey —
            each era a chapter, each stage a statement.
          </motion.p>
        </div>

        {/* Right stat block */}
        <div className="col-span-12 md:col-span-4 md:col-start-8 flex flex-col justify-center gap-10 mt-16 md:mt-0">
          {[
            { label: "Debut Year", value: "2020" },
            { label: "Eras", value: `${eras.length}` },
            { label: "Group", value: "aespa" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={0.3 + i * 0.1}
              variants={fadeUp}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              className="border-b border-silver/10 pb-6"
            >
              <p className="font-display text-xs tracking-[0.4em] text-silver/30 uppercase mb-2">
                {stat.label}
              </p>
              <p
                className="font-display font-black text-white"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedEraSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const { stageMode } = useStageMode();
  const featured = eras[eras.length - 1];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: stageMode
          ? "#05070C"
          : `linear-gradient(160deg, #05070C 0%, ${featured.theme_color} 100%)`,
      }}
    >
      <div className="relative z-10 grid grid-cols-12 gap-4 px-8 md:px-16 w-full py-24">
        <div className="col-span-12 mb-12">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            className="font-display text-xs tracking-[0.5em] text-silver/40 uppercase"
          >
            Latest Era
          </motion.span>
        </div>

        <div className="col-span-12">
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
            transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
            className="relative aspect-[16/7] overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${featured.theme_color} 0%, ${featured.accent_color}20 100%)`,
            }}
          >
            <div className="absolute inset-0 flex items-end p-10 md:p-16">
              <div>
                <p
                  className="font-display text-xs tracking-[0.5em] uppercase mb-4"
                  style={{ color: featured.accent_color }}
                >
                  {featured.year}
                </p>
                <h2
                  className="font-display font-black text-white leading-none mb-6"
                  style={{ fontSize: "clamp(4rem, 10vw, 10rem)" }}
                >
                  {featured.name}
                </h2>
                <Link
                  href="/eras"
                  className="inline-flex items-center gap-4 font-display text-xs tracking-[0.4em] text-silver/60 hover:text-silver uppercase transition-colors duration-300"
                >
                  Explore era
                  <span className="w-8 h-px bg-current" />
                </Link>
              </div>
            </div>

            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: `radial-gradient(ellipse at 80% 50%, ${featured.accent_color} 0%, transparent 60%)`,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function NavigationTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  const { stageMode } = useStageMode();

  const pages = [
    { href: "/eras", title: "Works", subtitle: "Five eras of artistry", num: "01" },
    { href: "/gallery", title: "Gallery", subtitle: "Curated photo archive", num: "02" },
    { href: "/timeline", title: "Timeline", subtitle: "A chronological journey", num: "03" },
  ];

  return (
    <section
      ref={ref}
      className={`relative py-32 transition-colors duration-700 ${
        stageMode ? "bg-night" : "bg-royal-blue"
      }`}
    >
      <div className="px-8 md:px-16">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="mb-20"
        >
          <span className="font-display text-xs tracking-[0.5em] text-neon-blue uppercase">
            Explore
          </span>
        </motion.div>

        <div className="space-y-0">
          {pages.map((page, i) => (
            <motion.div
              key={page.href}
              custom={0.1 + i * 0.1}
              variants={fadeUp}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
            >
              <Link
                href={page.href}
                className="group flex items-center justify-between py-8 border-b border-silver/10 hover:border-silver/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-8">
                  <span className="font-display text-xs text-silver/20 tracking-widest">
                    {page.num}
                  </span>
                  <div>
                    <h3
                      className="font-display font-black text-white group-hover:text-neon-blue transition-colors duration-300 leading-none"
                      style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
                    >
                      {page.title}
                    </h3>
                    <p className="font-body text-xs text-silver/40 mt-2 tracking-widest uppercase">
                      {page.subtitle}
                    </p>
                  </div>
                </div>
                <span className="font-display text-silver/20 group-hover:text-silver/60 transition-colors duration-300 text-2xl">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroStage />
      <IntroSection />
      <FeaturedEraSection />
      <NavigationTeaser />
    </>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import HeroStage from "@/components/hero-stage";
import { eras } from "@/data/eras";
import { useStageMode } from "@/context/stage-mode-context";
import { EASE } from "@/lib/motion";

const aboutParagraphs = [
  {
    label: "Introduction",
    text: "Karina (born Yoo Jimin) is a South Korean singer, rapper, and dancer under SM Entertainment. She is best known as the leader, main dancer, lead rapper, sub vocalist and visual of the girl group aespa.",
  },
  {
    label: "Pre-Debut",
    text: "Before debuting, Karina was active on social media and was recruited by SM Entertainment in 2016. She made her first public appearance in Taemin\u2019s Want MV on February 19, 2019, and also performed as a backup dancer during its promotions. She debuted as the leader of aespa on November 17, 2020, with the digital single Black Mamba.",
  },
  {
    label: "GOT the Beat",
    text: "On January 3, 2022, she debuted as a member of GOT the beat, a unit from SM\u2019s project girl group Girls On Top, alongside her aespa bandmate Winter. She also participated in SM Entertainment\u2019s ninth winter album 2022 Winter SMTOWN: SMCU Palace, featuring on the track Hot & Cold with EXO\u2019s Kai, Red Velvet\u2019s Seulgi, and NCT\u2019s Jeno.",
  },
  {
    label: "Solo Work",
    text: "In 2023, Karina contributed to the OST for the Netflix drama Song of the Bandits with the track Sad Waltz, further showcasing her versatility as an artist.",
  },
];

const fadeUp = {
  initial: { y: 50, opacity: 0 },
  animate: (d: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE, delay: d },
  }),
};

function ScrollParagraph({
  label,
  text,
  index,
  total,
  scrollYProgress,
}: {
  label: string;
  text: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const segmentSize = 1 / (total + 1);
  const start = (index + 0.5) * segmentSize;
  const peak = (index + 1) * segmentSize;
  const end = (index + 1.5) * segmentSize;

  const opacity = useTransform(
    scrollYProgress,
    [start, peak, Math.min(end, 0.95)],
    index === total - 1 ? [0, 1, 1] : [0, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [start, peak, Math.min(end, 0.95)],
    index === total - 1 ? [60, 0, 0] : [60, 0, -40]
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center"
      style={{ opacity, y }}
    >
      <span className="font-display text-xs tracking-[0.5em] text-white/50 uppercase mb-6">
        {label}
      </span>
      <p className="font-body text-white text-base md:text-lg leading-relaxed max-w-lg">
        {text}
      </p>
      <div className="flex items-center gap-3 mt-8">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-px transition-all duration-300 ${
              i === index ? "w-8 bg-neon-blue" : "w-4 bg-silver/20"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

function IntroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stickyRef, { once: true, margin: "-10%" });
  const { stageMode } = useStageMode();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Title stays visible for the first segment then fades
  const segmentSize = 1 / (aboutParagraphs.length + 1);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, segmentSize * 0.3, segmentSize * 0.8],
    [0, 1, 1]
  );
  const titleY = useTransform(
    scrollYProgress,
    [0, segmentSize * 0.3],
    [80, 0]
  );

  return (
    <section
      ref={containerRef}
      className={`relative transition-colors duration-700 ${
        stageMode ? "bg-night" : "bg-royal-blue"
      }`}
      style={{ height: `${(aboutParagraphs.length + 2) * 100}vh` }}
    >
      {/* Sticky viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Background gradient */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, #1A5FD2 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 h-full grid grid-cols-12 gap-4 px-8 md:px-16">
          {/* Left side: scroll-driven text content */}
          <div className="col-span-12 md:col-span-6 flex items-center relative">
            {/* Section title — fades in and stays */}
            <motion.div
              className="absolute top-[12vh] left-0"
              style={{ opacity: titleOpacity, y: titleY }}
            >
              <span className="font-display text-xs tracking-[0.5em] text-neon-blue uppercase">
                About
              </span>
              <h2
                className="font-display font-black text-white leading-tight mt-4"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                Who is
                <br />
                <span className="text-neon-blue">Karina?</span>
              </h2>
            </motion.div>

            {/* Paragraphs that swap in/out on scroll */}
            {aboutParagraphs.map((para, i) => (
              <ScrollParagraph
                key={para.label}
                label={para.label}
                text={para.text}
                index={i}
                total={aboutParagraphs.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>

          {/* Right side: Karina portrait — completely static */}
          <div className="hidden md:flex col-span-5 col-start-8 items-center justify-center">
            <div className="relative w-full h-[80vh]">
              <Image
                src="/assets/karina-03.png"
                alt="Karina"
                fill
                className="object-contain object-center"
                sizes="40vw"
                priority
              />
              {/* Glow effect behind portrait */}
              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-20"
                style={{
                  background:
                    "radial-gradient(ellipse at center, #1A5FD2 0%, transparent 70%)",
                }}
              />
            </div>
          </div>
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

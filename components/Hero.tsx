"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Clouds from "./Clouds";

export default function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 520], [1, 0]);
  const y = useTransform(scrollY, [0, 520], [0, -80]);
  const scale = useTransform(scrollY, [0, 520], [1, 0.94]);

  return (
    <section id="hero" className="sky sticky! top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      <Clouds />
      <motion.div style={{ opacity, y, scale }} className="z-10 flex flex-col items-center gap-8">
        <h1 className="font-display text-[clamp(64px,10vw,96px)] font-light leading-none tracking-[-0.02em] text-slate/90">Zyad</h1>
        <div className="h-[200px] w-[200px] overflow-hidden rounded-full ring-[3px] ring-white sm:h-[240px] sm:w-[240px]">
          <Image src="/img/headshot.jpg" alt="Zyad Kamal Hamed" width={240} height={240} priority />
        </div>
        <p className="label text-slate/80">Designer · Developer · AI Engineer</p>
        <p className="max-w-[560px] text-[18px] leading-relaxed text-slate/85 sm:text-[20px]">
          I design and build websites and AI tools for businesses, and work as an AI Specialist at a Sydney creative agency.
        </p>
      </motion.div>
      <motion.a style={{ opacity }} href="#services" aria-label="Scroll to services" className="bob absolute! bottom-10 left-1/2 z-10 -translate-x-1/2">
        <svg viewBox="0 0 22 16" width="22" height="16" fill="none" aria-hidden>
          <path d="M1 1.5l10 13 10-13" stroke="#1C2733" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>
  );
}

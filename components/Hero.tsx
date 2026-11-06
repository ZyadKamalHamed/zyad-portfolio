"use client";
import Headshot from "./Headshot";
import { motion, useScroll, useTransform } from "motion/react";
import Clouds from "./Clouds";

export default function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 520], [1, 0]);
  const y = useTransform(scrollY, [0, 520], [0, -80]);
  const scale = useTransform(scrollY, [0, 520], [1, 0.94]);

  return (
    <section id="hero" className="sky sticky! top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-[env(safe-area-inset-top)] text-center">
      <Clouds />
      <motion.div style={{ opacity, y, scale }} className="hero-stack z-10 flex flex-col items-center">
        <h1 className="hero-name font-display font-light leading-none tracking-[-0.02em] text-slate/90">Zyad</h1>
        <Headshot priority className="hero-photo" />
        <p className="label text-slate/80">Designer · Developer · AI Engineer</p>
        <p className="hero-intro max-w-[560px] leading-relaxed text-slate/85">
          I design and build visual media, websites and automations for businesses, and work as an AI Specialist within a Sydney creative agency.
        </p>
      </motion.div>
      <motion.a style={{ opacity }} href="#services" aria-label="Scroll to services" className="bob absolute! bottom-10 left-1/2 z-10 -translate-x-1/2 before:absolute before:-inset-x-3 before:-inset-y-4">
        <svg viewBox="0 0 22 16" width="22" height="16" fill="none" aria-hidden>
          <path d="M1 1.5l10 13 10-13" stroke="#1C2733" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>
  );
}

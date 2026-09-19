"use client";
import { motion } from "motion/react";
import { services, steps } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ServicesPanel() {
  return (
    <section id="services" className="night scroll-mt-6 rounded-t-[40px] px-5 pb-24 pt-20 shadow-[0_-40px_80px_rgba(0,0,0,0.35)] sm:px-10 sm:pt-28">
      <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-3 md:gap-10">
        {services.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.14, ease }}
            className={`flex flex-col ${i === 1 ? "md:-my-6 md:rounded-3xl md:bg-white/[0.03] md:px-8 md:py-6" : ""}`}
          >
            <p className="eyebrow text-white/50">0{i + 1}</p>
            <h2 className="font-display mt-3 text-[40px] font-light uppercase tracking-wide">{s.title}</h2>
            <p className="mt-3 text-lg text-white/90">{s.tagline}</p>
            <p className="mt-3 max-w-[420px] text-[15px] leading-relaxed text-white/60">{s.copy}</p>
            <ul className="mt-8">
              {s.items.map((it) => (
                <li key={it} className="rule py-4 text-[15px] text-white/85">{it}</li>
              ))}
              <li className="rule" />
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.7, ease }}
        className="mx-auto mt-24 max-w-[1400px]"
      >
        <p className="eyebrow text-white/50">How it works</p>
        <ol className="mt-6 grid gap-8 md:grid-cols-4">
          {steps.map(([n, t, c]) => (
            <li key={n} className="rule pt-6">
              <p className="eyebrow text-white/40">{n}</p>
              <p className="font-display mt-2 text-2xl font-light">{t}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-white/65">{c}</p>
            </li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}

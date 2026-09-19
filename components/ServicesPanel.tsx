"use client";
import { motion } from "motion/react";
import { services } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ServicesPanel() {
  return (
    <section id="services" className="night scroll-mt-6 rounded-t-[40px] px-5 pb-32 pt-20 shadow-[0_-40px_80px_rgba(0,0,0,0.35)] sm:px-10 sm:pt-28">
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.12)" }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.14, ease, backgroundColor: { duration: 0.3 }, borderColor: { duration: 0.3 } }}
            style={{ backgroundColor: "rgba(255,255,255,0)", borderColor: "rgba(255,255,255,0)" }}
            className="flex cursor-default flex-col rounded-3xl border px-6 py-8 sm:px-8"
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
    </section>
  );
}

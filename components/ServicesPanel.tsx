import Link from "next/link";
import { services } from "@/lib/content";

export default function ServicesPanel({ full = false }: { full?: boolean }) {
  return (
    <section id="services" className="night px-5 py-24 sm:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-3 md:gap-10">
        {services.map((s, i) => (
          <div key={s.key} className={`flex flex-col ${i === 1 ? "md:rounded-3xl md:bg-white/[0.03] md:px-8 md:py-6 md:-my-6" : ""}`}>
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
          </div>
        ))}
      </div>
      {!full && (
        <div className="mx-auto mt-16 flex max-w-[1400px] justify-center">
          <Link href="/services" className="label rounded-full glass-on-night px-7 py-4 text-white hover:bg-white/15">How it works →</Link>
        </div>
      )}
    </section>
  );
}

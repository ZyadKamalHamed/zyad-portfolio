import Image from "next/image";

export const metadata = { title: "About · Zyad Kamal Hamed" };

const marks = [
  { year: "2026", side: "left" },
  { year: "2025", side: "right" },
  { year: "2025", side: "left" },
];

export default function AboutPage() {
  return (
    <section className="night-sky min-h-[100svh] px-5 pb-32 pt-40 sm:px-10">
      <div className="mx-auto max-w-[1240px]">
        <h1 className="font-display text-center text-[40px] font-light uppercase tracking-wide">About</h1>
        <div className="mx-auto mt-10 flex max-w-[720px] flex-col items-center gap-6 text-center">
          <div className="h-[140px] w-[140px] overflow-hidden rounded-full ring-2 ring-white/80">
            <Image src="/img/headshot.jpg" alt="Zyad Kamal Hamed" width={140} height={140} />
          </div>
          <p className="leading-relaxed text-white/80">
            I build machine learning systems and design the interfaces around them. Final-year Bachelor of AI at UTS, graduating December 2026, and the sole technical hire at The General Store, a design and advertising agency in Surry Hills, where I run AI implementation, tooling and training across a team of sixty. On the side I design and build websites and automations for small businesses.
          </p>
        </div>

        <div className="relative mx-auto mt-24 max-w-[1000px]">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/25" aria-hidden />
          <p className="label glass-on-night relative left-1/2 w-max -translate-x-1/2 rounded-full px-6 py-3 text-white/90">Timeline · coming soon</p>
          <ol className="mt-16 flex flex-col gap-28">
            {marks.map((m, i) => (
              <li key={i} className={`relative flex items-center ${m.side === "left" ? "justify-start" : "justify-end"}`}>
                <span className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border border-white/60 bg-[#0e141b]" aria-hidden>
                  <span className="absolute inset-[4px] rounded-full bg-white/80" />
                </span>
                <div className={`w-[46%] ${m.side === "left" ? "pr-10 text-right" : "pl-10 text-left"}`}>
                  <p className="eyebrow text-white/60">{m.year}</p>
                  <div className="mt-3 h-24 rounded-2xl border border-dashed border-white/15" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

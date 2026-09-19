import Image from "next/image";
import { aboutBio, timeline, type TimelineEntry } from "@/lib/content";

export const metadata = { title: "About · Zyad Kamal Hamed" };

function Photo({ entry }: { entry: TimelineEntry }) {
  return (
    <div className="grid aspect-[200/214] w-[160px] shrink-0 place-items-center overflow-hidden border border-white/70 bg-white/[0.06] md:w-[200px]">
      {entry.image
        ? <Image src={entry.image.src} alt={entry.image.alt} width={200} height={214} className="h-full w-full object-cover" />
        : <span className="eyebrow text-[10px] text-white/50">Add image</span>}
    </div>
  );
}

function Copy({ entry, align }: { entry: TimelineEntry; align: "left" | "right" }) {
  return (
    <div className={`max-w-[300px] pt-1 ${align === "right" ? "md:text-right" : ""}`}>
      <h2 className="text-[20px] font-medium leading-snug">{entry.title}</h2>
      <p className="eyebrow mt-2 text-white/60">{entry.meta}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-white/78">{entry.body}</p>
    </div>
  );
}

function Dot({ className = "" }: { className?: string }) {
  return <span className={`shrink-0 rounded-full border-[1.5px] border-white/70 bg-slate ${className}`} aria-hidden />;
}

export default function AboutPage() {
  return (
    <section className="night-sky min-h-[100svh] px-5 pb-32 pt-40 sm:px-10">
      <div className="mx-auto max-w-[1240px]">
        <h1 className="font-display text-center text-[40px] font-light uppercase tracking-wide">About</h1>
        <div className="mx-auto mt-10 flex max-w-[720px] flex-col items-center gap-6 text-center">
          <div className="h-[140px] w-[140px] overflow-hidden rounded-full ring-2 ring-white/80">
            <Image src="/img/headshot.jpg" alt="Zyad Kamal Hamed" width={140} height={140} />
          </div>
          <p className="leading-relaxed text-white/80">{aboutBio}</p>
        </div>

        {/* Phones: one column on a left rail. Desktop: centre rail, entries alternate sides. */}
        <ol className="relative mt-20 flex flex-col gap-14 md:gap-16">
          <span className="absolute left-[5px] top-0 h-full w-px bg-white/35 md:left-1/2 md:-translate-x-1/2" aria-hidden />
          {timeline.map((t, i) => {
            const left = i % 2 === 0;
            return (
              <li key={`${t.year}-${t.title}`} className="relative md:grid md:grid-cols-2">
                <div className="flex flex-col gap-4 pl-8 md:hidden">
                  <Dot className="absolute left-0 top-1 h-3 w-3" />
                  <p className="eyebrow text-white/70">{t.year}</p>
                  <Photo entry={t} />
                  <Copy entry={t} align="left" />
                </div>
                {left ? (
                  <>
                    <div className="hidden items-start justify-end gap-4 md:flex">
                      <Copy entry={t} align="right" />
                      <Photo entry={t} />
                      <div className="-mr-3 flex items-start gap-3 pt-1">
                        <p className="eyebrow text-white/70">{t.year}</p>
                        <Dot className="mt-[1px] h-6 w-6" />
                      </div>
                    </div>
                    <div className="hidden md:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block" />
                    <div className="hidden items-start gap-4 md:flex">
                      <div className="-ml-3 flex items-start gap-3 pt-1">
                        <Dot className="mt-[1px] h-6 w-6" />
                        <p className="eyebrow text-white/70">{t.year}</p>
                      </div>
                      <Photo entry={t} />
                      <Copy entry={t} align="left" />
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

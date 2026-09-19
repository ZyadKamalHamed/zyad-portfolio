"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { caseStudies, type CaseMedia, type CaseStudy } from "@/lib/content";

const HOLD_MS = 8000;
const ease = [0.22, 1, 0.36, 1] as const;

const textCard = {
  enter: (d: number) => ({ opacity: 0, x: -48 * d, rotate: -2.5 * d }),
  center: { opacity: 1, x: 0, rotate: 0 },
  exit: (d: number) => ({ opacity: 0, x: 48 * d, rotate: 2.5 * d }),
};
const mediaCard = {
  enter: (d: number) => ({ opacity: 0, x: 48 * d, rotate: 2.5 * d }),
  center: { opacity: 1, x: 0, rotate: 0 },
  exit: (d: number) => ({ opacity: 0, x: -48 * d, rotate: -2.5 * d }),
};

function Media({ media, stats }: { media: CaseMedia; stats?: CaseStudy["stats"] }) {
  const [videoFailed, setVideoFailed] = useState(false);
  if (media.kind === "video" && !videoFailed) {
    return (
      <video
        src={media.src}
        poster={media.poster}
        autoPlay muted loop playsInline
        aria-label={media.alt}
        onError={() => setVideoFailed(true)}
        className="h-full w-full object-cover"
      />
    );
  }
  if (media.kind === "video") {
    return <Image src={media.poster} alt={media.alt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />;
  }
  if (media.kind === "image") {
    return <Image src={media.src} alt={media.alt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />;
  }
  if (media.images.length > 0) {
    return (
      <div className="relative h-full w-full">
        {media.images.slice(0, 3).map((im, i) => (
          <div
            key={im.src}
            className="absolute overflow-hidden rounded-2xl border border-white/15 shadow-2xl"
            style={{ inset: `${8 + i * 6}% ${6 + (2 - i) * 8}% ${8 + (2 - i) * 6}% ${6 + i * 8}%`, rotate: `${(i - 1) * 2}deg`, zIndex: i }}
          >
            <Image src={im.src} alt={im.alt} fill sizes="50vw" className="object-cover object-top" />
          </div>
        ))}
      </div>
    );
  }
  // Stack with no screenshots yet: show the numbers instead.
  return (
    <div className="grid h-full w-full grid-cols-2 gap-3 p-4 sm:gap-4 sm:p-6">
      {stats?.map((st) => (
        <div key={st.label} className="flex flex-col justify-end rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
          <p className="font-display text-4xl font-light sm:text-5xl">{st.value}</p>
          <p className="eyebrow mt-2 text-white/50">{st.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function WorkCarousel() {
  const n = caseStudies.length;
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = useCallback((d: number) => setState(([i]) => [(i + d + n) % n, d]), [n]);
  const jump = (to: number) => setState(([i]) => [to, to > i ? 1 : -1]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), HOLD_MS);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  const cs = caseStudies[index];
  const external = cs.link?.href.startsWith("http");
  const pad = (v: number) => String(v).padStart(2, "0");

  return (
    <section id="work" className="night-sky scroll-mt-6 px-5 py-24 sm:px-10" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-white/50">Selected work</p>
            <h2 className="font-display mt-3 text-[40px] font-light">Case studies</h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="label text-white/60 tabular-nums">{pad(index + 1)} / {pad(n)}</p>
            <button onClick={() => go(-1)} aria-label="Previous case study" className="glass-on-night grid h-12 w-12 place-items-center rounded-full hover:bg-white/15">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden><path d="M10 2 4 8l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={() => go(1)} aria-label="Next case study" className="glass-on-night grid h-12 w-12 place-items-center rounded-full hover:bg-white/15">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden><path d="m6 2 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>

        <div className="relative mt-14 min-h-[560px] md:min-h-[520px]">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div key={cs.slug} className="grid items-center gap-6 md:grid-cols-[1fr_1.15fr] md:gap-10">
              <motion.article
                custom={dir}
                variants={textCard}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.55, ease }}
                className="float rounded-[32px] bg-white p-8 text-slate shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-10"
              >
                <span className="eyebrow inline-block rounded-full border border-slate/20 px-3 py-1.5 text-slate/70">{cs.category}</span>
                <h3 className="font-display mt-5 text-[32px] font-light leading-tight sm:text-[40px]">{cs.title}</h3>
                <p className="mt-2 text-sm text-slate/60">{cs.client}</p>
                <p className="mt-5 text-[15px] leading-relaxed text-slate/80">{cs.summary}</p>
                <p className="mt-5 text-sm text-slate/50">{cs.stack.join(" · ")}</p>
                {cs.link && (
                  external
                    ? <a href={cs.link.href} target="_blank" rel="noreferrer" className="label mt-6 inline-block text-signal hover:text-slate">{cs.link.label}</a>
                    : <Link href={cs.link.href} className="label mt-6 inline-block text-signal hover:text-slate">{cs.link.label}</Link>
                )}
              </motion.article>

              <motion.div
                custom={dir}
                variants={mediaCard}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.55, ease, delay: 0.06 }}
                className="float-late relative aspect-[4/3] overflow-hidden rounded-[32px] border border-white/12 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
              >
                <Media media={cs.media} stats={cs.stats} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center gap-2" role="tablist" aria-label="Case studies">
          {caseStudies.map((c, i) => (
            <button
              key={c.slug}
              role="tab"
              aria-selected={i === index}
              aria-label={c.title}
              onClick={() => jump(i)}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-3 bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

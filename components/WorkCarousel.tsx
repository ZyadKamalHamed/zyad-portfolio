"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type PanInfo } from "motion/react";
import { caseStudies, type CaseMedia, type CaseStudy } from "@/lib/content";

const HOLD_MS = 8000;
const ease = [0.22, 1, 0.36, 1] as const;
const spring = { type: "spring", stiffness: 260, damping: 32, mass: 0.9 } as const;

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
  if (media.kind === "video" && !stats) {
    return <Image src={media.poster} alt={media.alt} fill sizes="(min-width: 768px) 50vw, 90vw" className="object-cover" />;
  }
  if (media.kind === "image") {
    return <Image src={media.src} alt={media.alt} fill sizes="(min-width: 768px) 50vw, 90vw" className="object-cover" />;
  }
  if (media.kind === "stack" && media.images.length > 0) {
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
  return (
    <div className="grid h-full w-full grid-cols-2 gap-3 p-4 sm:gap-4 sm:p-6">
      {stats?.map((st) => (
        <div key={st.label} className="flex flex-col justify-end rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-7">
          <p className="font-display text-3xl font-light sm:text-5xl">{st.value}</p>
          <p className="eyebrow mt-2 text-white/50">{st.label}</p>
        </div>
      ))}
    </div>
  );
}

function Arrow({ dir, onClick, className = "", style }: { dir: -1 | 1; onClick: () => void; className?: string; style?: React.CSSProperties }) {
  return (
    <button
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
      aria-label={dir < 0 ? "Previous case study" : "Next case study"}
      style={style}
      className={`glass-on-night grid h-12 w-12 place-items-center rounded-full hover:bg-white/15 ${className}`}
    >
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden>
        <path d={dir < 0 ? "M10 2 4 8l6 6" : "m6 2 6 6-6 6"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function Slide({ cs, active, onSelect, innerRef }: { cs: CaseStudy; active: boolean; onSelect: () => void; innerRef?: React.Ref<HTMLDivElement> }) {
  const external = cs.link?.href.startsWith("http");
  return (
    <div
      ref={innerRef}
      onClick={active ? undefined : onSelect}
      className={`grid h-full content-start items-center gap-4 md:content-center md:grid-cols-[1fr_1.15fr] md:gap-8 ${active ? "" : "cursor-pointer"}`}
      aria-hidden={!active}
    >
      <article className="float rounded-[28px] bg-white p-6 text-slate shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:rounded-[32px] sm:p-10">
        <span className="eyebrow inline-block rounded-full border border-slate/20 px-3 py-1.5 text-slate/70">{cs.category}</span>
        <h3 className="font-display mt-4 text-[28px] font-light leading-tight sm:mt-5 sm:text-[40px]">{cs.title}</h3>
        <p className="mt-2 text-sm text-slate/60">{cs.client}</p>
        <p className="mt-4 line-clamp-4 text-[15px] leading-relaxed text-slate/80 sm:mt-5 md:line-clamp-none">{cs.summary}</p>
        <p className="mt-4 text-sm text-slate/50 sm:mt-5">{cs.stack.join(" · ")}</p>
        {cs.link && (
          external
            ? <a href={cs.link.href} target="_blank" rel="noreferrer" tabIndex={active ? 0 : -1} className="label mt-5 inline-block text-signal hover:text-slate sm:mt-6">{cs.link.label}</a>
            : <Link href={cs.link.href} tabIndex={active ? 0 : -1} className="label mt-5 inline-block text-signal hover:text-slate sm:mt-6">{cs.link.label}</Link>
        )}
      </article>
      <div className="float-late relative order-first aspect-video overflow-hidden rounded-[28px] md:order-none border border-white/12 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:rounded-[32px] md:aspect-[4/3]">
        <Media media={cs.media} stats={cs.stats} />
      </div>
    </div>
  );
}

export default function WorkCarousel() {
  const n = caseStudies.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slideW, setSlideW] = useState(0);
  const [trackH, setTrackH] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLDivElement>(null);
  const wheelLock = useRef(0);

  const go = useCallback((d: number) => setIndex((i) => (i + d + n) % n), [n]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSlideW(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Size the track to the active slide: cards side by side on desktop, stacked on phones.
  useLayoutEffect(() => {
    const el = activeRef.current;
    if (!el) return;
    const measure = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      const hs = kids.map((k) => k.getBoundingClientRect().height);
      const stacked = window.innerWidth < 768;
      const gap = stacked ? 16 : 0;
      setTrackH(Math.ceil(stacked ? hs.reduce((a, b) => a + b, 0) + gap * (hs.length - 1) : Math.max(...hs)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    Array.from(el.children).forEach((k) => ro.observe(k));
    return () => ro.disconnect();
  }, [index, slideW]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), HOLD_MS);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -80) go(1);
    else if (swipe > 80) go(-1);
  };

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) < 25 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
    const now = Date.now();
    if (now - wheelLock.current < 700) return;
    wheelLock.current = now;
    go(e.deltaX > 0 ? 1 : -1);
  };

  const pad = (v: number) => String(v).padStart(2, "0");
  // Slides sit at 82% of the track width, so the neighbours peek in on both sides.
  const cardW = slideW * 0.82;
  const gap = slideW * 0.86;

  return (
    <section
      id="work"
      className="night-sky relative -mt-10 scroll-mt-6 overflow-hidden rounded-t-[40px] px-5 py-24 shadow-[0_-40px_80px_rgba(0,0,0,0.45)] sm:px-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ duration: 0.7, ease }}
        className="mx-auto flex max-w-[1240px] flex-wrap items-end justify-between gap-6"
      >
        <div>
          <p className="eyebrow text-white/50">Case studies</p>
          <h2 className="font-display mt-3 text-[40px] font-light">Work</h2>
        </div>
        <div className="flex items-center gap-4">
          <p className="label text-white/60 tabular-nums">{pad(index + 1)} / {pad(n)}</p>
          <div className="flex gap-3 md:hidden">
            <Arrow dir={-1} onClick={() => go(-1)} />
            <Arrow dir={1} onClick={() => go(1)} />
          </div>
        </div>
      </motion.div>

      <motion.div
        ref={trackRef}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.8, delay: 0.1, ease }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        onDragEnd={onDragEnd}
        onWheel={onWheel}
        style={{ height: trackH ?? undefined }}
        className="relative mx-auto mt-14 h-[640px] max-w-[1240px] cursor-grab touch-pan-y active:cursor-grabbing md:h-[520px]"
        aria-roledescription="carousel"
      >
        {slideW > 0 && (
          <>
            <Arrow dir={-1} onClick={() => go(-1)} className="absolute top-1/2 z-10 hidden -translate-y-1/2 md:grid" style={{ left: (slideW - cardW) / 2 - 72 }} />
            <Arrow dir={1} onClick={() => go(1)} className="absolute top-1/2 z-10 hidden -translate-y-1/2 md:grid" style={{ left: (slideW + cardW) / 2 + 24 }} />
          </>
        )}
        {slideW > 0 && caseStudies.map((cs, i) => {
          let off = (i - index) % n;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const active = off === 0;
          return (
            <motion.div
              key={cs.slug}
              initial={false}
              animate={{ x: off * gap, scale: active ? 1 : 0.88, opacity: active ? 1 : 0.35, filter: active ? "blur(0px)" : "blur(1px)" }}
              transition={spring}
              style={{ width: cardW, left: (slideW - cardW) / 2, zIndex: active ? 2 : 1 }}
              className="absolute top-0 h-full"
            >
              <Slide cs={cs} active={active} onSelect={() => setIndex(i)} innerRef={active ? activeRef : undefined} />
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-10 flex justify-center gap-2" role="tablist" aria-label="Case studies">
        {caseStudies.map((c, i) => (
          <button
            key={c.slug}
            role="tab"
            aria-selected={i === index}
            aria-label={c.title}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-3 bg-white/30 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </section>
  );
}

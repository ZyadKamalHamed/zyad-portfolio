import { statSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Headshot from "@/components/Headshot";
import { aboutBio, resume, timeline, type TimelineEntry } from "@/lib/content";

export const metadata = { title: "About · Zyad Kamal Hamed" };

function Photo({ entry }: { entry: TimelineEntry }) {
  return (
    <div className={`grid aspect-[200/214] w-[160px] shrink-0 place-items-center overflow-hidden border border-white/70 lg:w-[200px] ${entry.image?.fit === "contain" ? "bg-white p-6" : "bg-white/[0.06]"}`}>
      {entry.image
        ? <Image src={entry.image.src} alt={entry.image.alt} width={200} height={214} className={`h-full w-full ${entry.image.fit === "contain" ? "object-contain" : "object-cover"}`} />
        : <span className="eyebrow text-[10px] text-white/50">Add image</span>}
    </div>
  );
}

function Copy({ entry, align }: { entry: TimelineEntry; align: "left" | "right" }) {
  return (
    <div className={`max-w-[300px] pt-1 ${align === "right" ? "lg:text-right" : ""}`}>
      <h2 className="text-[20px] font-medium leading-snug">{entry.title}</h2>
      <p className="eyebrow mt-2 text-white/60">{entry.meta}</p>
      <p className="mt-3 text-[15px] leading-relaxed text-white/78">{entry.body}</p>
    </div>
  );
}

function Dot({ className = "" }: { className?: string }) {
  return <span className={`shrink-0 rounded-full border-[1.5px] border-white/70 bg-slate ${className}`} aria-hidden />;
}

// Read at build time so the size can never drift from the file that is actually served.
function resumeSize() {
  try {
    const bytes = statSync(path.join(process.cwd(), "public", resume.href)).size;
    return `${Math.round(bytes / 1024)} KB`;
  } catch {
    return null;
  }
}

// One primary (solid white, matches the contact form's submit) and one quieter echo at the end of the rail.
function ResumeLink({ variant, id }: { variant: "primary" | "quiet"; id: string }) {
  const size = resumeSize();
  const meta = ["PDF", `${resume.pages} pages`, size, `Updated ${resume.updated}`].filter((m): m is string => Boolean(m));
  const pill = variant === "primary"
    ? "bg-white text-slate hover:bg-white/90"
    : "glass-on-night text-white hover:bg-white/15";
  return (
    <div className={`flex flex-col gap-3 ${variant === "primary" ? "items-center" : "items-start lg:items-center"}`}>
      <a
        href={resume.href}
        download={resume.filename}
        type="application/pdf"
        aria-describedby={id}
        className={`label inline-flex items-center rounded-full px-8 py-4 transition-colors ${pill}`}
      >
        Download CV ↓
      </a>
      {/* Each segment is unbreakable so narrow screens wrap at a separator, never inside the date. */}
      <p id={id} className={`eyebrow text-white/55 ${variant === "primary" ? "text-center" : "lg:text-center"}`}>
        {meta.map((m, i) => (
          <span key={m}>{i > 0 && " · "}<span className="whitespace-nowrap">{m}</span></span>
        ))}
      </p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <section className="night-sky min-h-[100svh] px-5 pb-32 pt-40 sm:px-10">
      <div className="mx-auto max-w-[1240px]">
        <h1 className="font-display text-center text-[40px] font-light uppercase tracking-wide">About</h1>
        <div className="mx-auto mt-10 flex max-w-[720px] flex-col items-center gap-6 text-center">
          <Headshot className="h-[160px] w-[160px]" />
          <p className="leading-relaxed text-white/80">{aboutBio}</p>
          <div className="mt-2">
            <ResumeLink variant="primary" id="cv-meta-top" />
          </div>
        </div>

        {/* Phones: one column on a left rail. Desktop: centre rail, entries alternate sides. */}
        <ol className="relative mt-20 flex flex-col gap-14 lg:gap-16">
          <span className="absolute left-[5px] top-0 h-full w-px bg-white/35 lg:left-1/2 lg:-translate-x-1/2" aria-hidden />
          {timeline.map((t, i) => {
            const left = i % 2 === 0;
            return (
              <li key={`${t.year}-${t.title}`} className="relative lg:grid lg:grid-cols-2">
                <div className="flex flex-col gap-4 pl-8 lg:hidden">
                  <Dot className="absolute left-0 top-1 h-3 w-3" />
                  <p className="eyebrow text-white/70">{t.year}</p>
                  <Photo entry={t} />
                  <Copy entry={t} align="left" />
                </div>
                {left ? (
                  <>
                    <div className="hidden items-start justify-end gap-4 lg:flex">
                      <Copy entry={t} align="right" />
                      <Photo entry={t} />
                      <div className="-mr-3 flex items-start gap-3 pt-1">
                        <p className="eyebrow text-white/70">{t.year}</p>
                        <Dot className="mt-[1px] h-6 w-6" />
                      </div>
                    </div>
                    <div className="hidden lg:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden lg:block" />
                    <div className="hidden items-start gap-4 lg:flex">
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

        {/* The rail ends in the document itself, so a reader who has scrolled the whole story does not have to go back up.
            Sits outside the list so the rail stops at the dot instead of running on behind the button. */}
        <div className="relative mt-14 flex flex-col gap-5 pl-8 lg:mt-16 lg:items-center lg:pl-0 lg:text-center">
          <span className="absolute -top-14 left-[5px] h-[3.75rem] w-px bg-white/35 lg:-top-16 lg:left-1/2 lg:h-16 lg:-translate-x-1/2" aria-hidden />
          <Dot className="absolute left-0 top-1 h-3 w-3 lg:static lg:h-6 lg:w-6" />
          <p className="max-w-[300px] text-[15px] leading-relaxed text-white/78 lg:max-w-[360px]">{resume.railIntro}</p>
          <div className="lg:mt-1">
            <ResumeLink variant="quiet" id="cv-meta-rail" />
          </div>
        </div>
      </div>
    </section>
  );
}

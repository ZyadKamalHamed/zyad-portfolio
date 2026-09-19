import Image from "next/image";
import { aboutBio, timeline } from "@/lib/content";

export const metadata = { title: "About · Zyad Kamal Hamed" };

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

        <ol className="mx-auto mt-20 max-w-[1000px]">
          {timeline.map((t, i) => {
            const last = i === timeline.length - 1;
            return (
              <li key={`${t.year}-${t.title}`} className="grid grid-cols-[40px_1fr] md:grid-cols-[96px_48px_1fr]">
                <p className="eyebrow hidden pt-7 text-white/55 md:block">{t.year}</p>
                <div className="flex flex-col items-center pt-7">
                  <span className="h-3 w-3 shrink-0 rounded-full border-[1.5px] border-white/60 bg-slate" aria-hidden />
                  {!last && <span className="mt-2 w-px flex-1 bg-white/12" aria-hidden />}
                </div>
                <div className="pb-5">
                  <article className="flex flex-col gap-5 rounded-[20px] border border-white/12 bg-white/[0.04] p-5 sm:flex-row sm:p-6">
                    <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl border border-dashed border-white/25 bg-white/[0.06]">
                      {t.image
                        ? <Image src={t.image.src} alt={t.image.alt} width={96} height={96} className="h-full w-full object-cover" />
                        : <span className="eyebrow text-[10px] text-white/50">Add image</span>}
                    </div>
                    <div className="min-w-0">
                      <p className="eyebrow mb-2 text-white/55 md:hidden">{t.year}</p>
                      <h2 className="text-[20px] font-medium leading-snug">{t.title}</h2>
                      <p className="eyebrow mt-2 text-white/60">{t.meta}</p>
                      <p className="mt-3 text-[15px] leading-relaxed text-white/78">{t.body}</p>
                    </div>
                  </article>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

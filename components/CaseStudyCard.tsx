import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/content";

export default function CaseStudyCard({ cs, index, compact = false }: { cs: CaseStudy; index: number; compact?: boolean }) {
  const external = cs.link?.href.startsWith("http");
  return (
    <article id={cs.slug} className="grid gap-8 md:grid-cols-2 md:gap-14">
      <div className="order-2 md:order-1">
        <p className="eyebrow text-white/50">Case study 0{index + 1}</p>
        <h3 className="font-display mt-3 text-[32px] font-light sm:text-[40px]">{cs.title}</h3>
        <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
          <dt className="eyebrow text-white/40 pt-0.5">Client</dt><dd className="text-white/80">{cs.client}</dd>
          <dt className="eyebrow text-white/40 pt-0.5">Role</dt><dd className="text-white/80">{cs.role}</dd>
        </dl>
        <p className="mt-6 leading-relaxed text-white/75">{cs.summary}</p>
        {!compact && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="eyebrow text-white/40">Decision</p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/80">{cs.decision}</p>
          </div>
        )}
        <p className="mt-6 text-sm text-white/50">{cs.stack.join(" · ")}</p>
        {cs.link && (
          external
            ? <a href={cs.link.href} target="_blank" rel="noreferrer" className="label mt-6 inline-block text-white/90 hover:text-white">{cs.link.label}</a>
            : <Link href={cs.link.href} className="label mt-6 inline-block text-white/90 hover:text-white">{cs.link.label}</Link>
        )}
      </div>
      <div className="order-1 md:order-2">
        {cs.image ? (
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <Image src={cs.image} alt={cs.imageAlt ?? cs.title} width={1200} height={800} className="h-auto w-full object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        ) : cs.stats ? (
          <div className="grid grid-cols-2 gap-4">
            {cs.stats.map((st) => (
              <div key={st.label} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
                <p className="font-display text-5xl font-light">{st.value}</p>
                <p className="eyebrow mt-2 text-white/50">{st.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

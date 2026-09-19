import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudies } from "@/lib/content";

export const metadata = { title: "Case Studies · Zyad Kamal Hamed" };

export default function CaseStudiesPage() {
  return (
    <>
      <section className="sky px-5 pb-16 pt-40 text-center sm:px-10">
        <p className="eyebrow text-slate/70">Case studies</p>
        <h1 className="font-display mt-3 text-[clamp(44px,7vw,72px)] font-light leading-none text-slate/90">Work, with the decisions</h1>
        <p className="mx-auto mt-6 max-w-[560px] text-lg text-slate/80">Each one says what I decided and why, not just what it does.</p>
      </section>
      <section className="night-sky px-5 py-24 sm:px-10">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-32">
          {caseStudies.map((cs, i) => <CaseStudyCard key={cs.slug} cs={cs} index={i} />)}
        </div>
      </section>
    </>
  );
}

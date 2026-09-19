import Link from "next/link";
import Hero from "@/components/Hero";
import ServicesPanel from "@/components/ServicesPanel";
import CaseStudyCard from "@/components/CaseStudyCard";
import { caseStudies } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPanel />
      <section className="night-sky px-5 py-24 sm:px-10">
        <div className="mx-auto max-w-[1240px]">
          <p className="eyebrow text-white/50">Selected work</p>
          <h2 className="font-display mt-3 text-[40px] font-light">Case studies</h2>
          <div className="mt-16 flex flex-col gap-24">
            {caseStudies.slice(0, 2).map((cs, i) => <CaseStudyCard key={cs.slug} cs={cs} index={i} compact />)}
          </div>
          <div className="mt-16">
            <Link href="/case-studies" className="label glass-on-night inline-block rounded-full px-7 py-4 hover:bg-white/15">All case studies →</Link>
          </div>
        </div>
      </section>
      <section className="sky px-5 py-24 text-center sm:px-10">
        <p className="eyebrow text-slate/70">Let&apos;s build</p>
        <h2 className="font-display mt-3 text-[40px] font-light text-slate/90 sm:text-[56px]">Have a project in mind?</h2>
        <p className="mx-auto mt-4 max-w-[520px] text-slate/80">Design, development or automation. Tell me what you are trying to do and I will come back with a plan and a price.</p>
        <Link href="/contact" className="label mt-8 inline-block rounded-full bg-slate px-8 py-4 text-white hover:bg-slate/90">Get in touch →</Link>
      </section>
    </>
  );
}

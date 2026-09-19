import Link from "next/link";
import ServicesPanel from "@/components/ServicesPanel";

export const metadata = { title: "Services · Zyad Kamal Hamed" };

const steps = [
  ["01", "Discovery", "A short call and a written brief. What you sell, who buys it, what has to be true for this to be worth doing."],
  ["02", "Design", "Wireframes, then a full Figma design and system. You see and approve every screen before a line of code is written."],
  ["03", "Build", "AI-assisted development from the approved design. A staging link within days, iterated with you until it is right."],
  ["04", "Launch and automate", "Deployed on your domain, handed over with docs. Then the systems that keep it running without you."],
];

export default function ServicesPage() {
  return (
    <>
      <section className="sky px-5 pb-16 pt-40 text-center sm:px-10">
        <p className="eyebrow text-slate/70">Services</p>
        <h1 className="font-display mt-3 text-[clamp(44px,7vw,72px)] font-light leading-none text-slate/90">Design. Develop. Automate.</h1>
        <p className="mx-auto mt-6 max-w-[560px] text-lg text-slate/80">Three things, done in order, by one person who does all three. That is the whole pitch.</p>
      </section>
      <ServicesPanel full />
      <section className="night-sky px-5 py-24 sm:px-10">
        <div className="mx-auto max-w-[1240px]">
          <p className="eyebrow text-white/50">Process</p>
          <h2 className="font-display mt-3 text-[40px] font-light">How it works</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {steps.map(([n, t, c]) => (
              <li key={n} className="rule pt-6">
                <p className="eyebrow text-white/40">{n}</p>
                <p className="font-display mt-2 text-2xl font-light">{t}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65">{c}</p>
              </li>
            ))}
          </ol>
          <Link href="/contact" className="label glass-on-night mt-16 inline-block rounded-full px-7 py-4 hover:bg-white/15">Start a project →</Link>
        </div>
      </section>
    </>
  );
}

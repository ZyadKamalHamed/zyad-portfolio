import Hero from "@/components/Hero";
import ServicesPanel from "@/components/ServicesPanel";
import WorkCarousel from "@/components/WorkCarousel";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10">
        <ServicesPanel />
        <WorkCarousel />
        <section id="contact" className="night scroll-mt-6 px-5 py-24 sm:px-10">
          <div className="mx-auto grid max-w-[1100px] gap-16 md:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="eyebrow text-white/50">Contact</p>
              <h2 className="font-display mt-3 text-[clamp(40px,6vw,64px)] font-light leading-none">Let&apos;s build.</h2>
              <p className="mt-6 max-w-[420px] leading-relaxed text-white/75">Tell me what you are trying to do. I reply within a day, usually with a couple of questions and a rough plan.</p>
              <p className="mt-8 text-sm text-white/50">Prefer email? <a href="mailto:zyad2408@live.com.au" className="text-white/80 underline-offset-4 hover:underline">zyad2408@live.com.au</a></p>
            </div>
            <ContactForm />
          </div>
        </section>
      </div>
    </>
  );
}

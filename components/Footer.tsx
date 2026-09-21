import Link from "next/link";

const site = [
  { href: "/#top", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];
const elsewhere = [
  { href: "https://github.com/ZyadKamalHamed", label: "GitHub" },
  { href: "https://www.linkedin.com/in/zyadkamalhamed/", label: "LinkedIn" },
  { href: "mailto:zyad2408@live.com.au", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="footer-ground px-5 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-14 sm:px-10">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="sm:col-span-2 md:col-span-1">
            <p className="font-display text-2xl font-light">Zyad Kamal Hamed</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">Designer, developer and AI engineer in Sydney. Websites, online shops and AI systems for small businesses.</p>
          </div>
          <nav aria-label="Site">
            <p className="eyebrow text-white/45">Site</p>
            <ul className="mt-4 flex flex-col gap-3">
              {site.map((l) => (
                <li key={l.label}><Link href={l.href} className="label text-white/80 transition-colors hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Elsewhere">
            <p className="eyebrow text-white/45">Elsewhere</p>
            <ul className="mt-4 flex flex-col gap-3">
              {elsewhere.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="label text-white/80 transition-colors hover:text-white" {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="rule mt-12 flex flex-wrap justify-between gap-2 pt-5 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Zyad Kamal Hamed</p>
          <p>Sydney, Australia</p>
        </div>
      </div>
    </footer>
  );
}

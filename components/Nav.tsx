"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const links = [
  { id: "home", href: "/#top", label: "Home" },
  { id: "services", href: "/#services", label: "Services" },
  { id: "work", href: "/#work", label: "Case Studies" },
  { id: "about", href: "/about", label: "About" },
];
const spyIds = ["services", "work", "contact"];
const MLink = motion.create(Link);

function useActiveSection(path: string) {
  const [section, setSection] = useState("home");
  useEffect(() => {
    if (path !== "/") return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.45;
      let current = "home";
      for (const id of spyIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setSection(current);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [path]);
  return path.startsWith("/about") ? "about" : section;
}

function MailIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 37 30" className={className} fill="currentColor" aria-hidden>
      <path d="M3.7 30c-1.02 0-1.89-.37-2.61-1.1S0 27.28 0 26.25V3.75c0-1.03.36-1.91 1.09-2.65S2.68 0 3.7 0h29.6c1.02 0 1.89.37 2.61 1.1S37 2.72 37 3.75v22.5c0 1.03-.36 1.91-1.09 2.65S34.32 30 33.3 30H3.7Zm14.8-13.13L3.7 7.5v18.75h29.6V7.5l-14.8 9.37Zm0-3.75L33.3 3.75H3.7l14.8 9.37Z" />
    </svg>
  );
}

export default function Nav() {
  const path = usePathname();
  const active = useActiveSection(path);
  const contactActive = active === "contact";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="relative mx-auto flex max-w-[1728px] items-center justify-center px-4 py-4 sm:px-10 sm:py-5">
        <nav className="glass pointer-events-auto flex h-12 items-center gap-0.5 whitespace-nowrap rounded-full px-1.5 md:h-14 md:gap-2 md:px-3">
          {links.map((l) => (
            <MLink
              key={l.id}
              href={l.href}
              whileTap={{ scale: 0.94 }}
              className={`relative rounded-full px-2 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] transition-colors md:px-4 md:py-2 md:text-[14px] md:tracking-[0.1em] ${active === l.id ? "text-white" : "text-white/75 hover:text-white"}`}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-bubble"
                  className="absolute inset-0 rounded-full bg-white/18 ring-1 ring-white/30"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  aria-hidden
                />
              )}
              <span className="relative">{l.label}</span>
            </MLink>
          ))}
          <MLink
            href="/#contact"
            aria-label="Contact"
            whileTap={{ scale: 0.94 }}
            className={`ml-0.5 grid h-9 w-9 place-items-center rounded-full text-white transition-colors md:hidden ${contactActive ? "bg-white/25" : "hover:bg-white/15"}`}
          >
            <MailIcon className="h-3.5 w-4" />
          </MLink>
        </nav>

        <MLink
          href="/#contact"
          aria-label="Contact"
          whileTap={{ scale: 0.94 }}
          className={`glass pointer-events-auto absolute right-10 top-1/2 hidden h-14 w-14 -translate-y-1/2 place-items-center rounded-full text-white transition-colors md:grid ${contactActive ? "bg-white/25" : "hover:bg-white/15"}`}
        >
          <MailIcon className="h-5 w-6" />
        </MLink>
      </div>
    </header>
  );
}

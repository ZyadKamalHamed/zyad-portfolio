"use client";
import Image from "next/image";
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

export default function Nav() {
  const path = usePathname();
  const active = useActiveSection(path);
  const contactActive = active === "contact";

  const item = (l: (typeof links)[number], small = false) => (
    <MLink
      key={l.id}
      href={l.href}
      whileTap={{ scale: 0.94 }}
      className={`relative rounded-full transition-colors ${small ? "eyebrow px-3 py-1.5" : "label px-4 py-2"} ${active === l.id ? "text-white" : "text-white/75 hover:text-white"}`}
    >
      {active === l.id && (
        <motion.span
          layoutId={small ? "nav-bubble-sm" : "nav-bubble"}
          className="absolute inset-0 rounded-full bg-white/18 ring-1 ring-white/30"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          aria-hidden
        />
      )}
      <span className="relative">{l.label}</span>
    </MLink>
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1728px] items-center justify-between px-5 py-5 sm:px-10">
        <MLink href="/#top" aria-label="Home" whileTap={{ scale: 0.94 }} className="pointer-events-auto block h-12 w-12 overflow-hidden rounded-full ring-2 ring-white/80 sm:h-14 sm:w-14">
          <Image src="/img/headshot.jpg" alt="Zyad" width={56} height={56} className="h-full w-full object-cover" />
        </MLink>

        <nav className="glass pointer-events-auto hidden h-14 items-center gap-2 rounded-full px-3 md:flex">
          {links.map((l) => item(l))}
        </nav>

        <MLink
          href="/#contact"
          aria-label="Contact"
          whileTap={{ scale: 0.94 }}
          className={`glass pointer-events-auto grid h-12 w-12 place-items-center rounded-full transition-colors sm:h-14 sm:w-14 ${contactActive ? "bg-white/25" : "hover:bg-white/15"}`}
        >
          <svg viewBox="0 0 37 30" className="h-4 w-5 sm:h-5 sm:w-6" fill="white" aria-hidden>
            <path d="M3.7 30c-1.02 0-1.89-.37-2.61-1.1S0 27.28 0 26.25V3.75c0-1.03.36-1.91 1.09-2.65S2.68 0 3.7 0h29.6c1.02 0 1.89.37 2.61 1.1S37 2.72 37 3.75v22.5c0 1.03-.36 1.91-1.09 2.65S34.32 30 33.3 30H3.7Zm14.8-13.13L3.7 7.5v18.75h29.6V7.5l-14.8 9.37Zm0-3.75L33.3 3.75H3.7l14.8 9.37Z" />
          </svg>
        </MLink>
      </div>

      <nav className="glass pointer-events-auto mx-auto flex h-11 w-max items-center gap-1 rounded-full px-2 md:hidden">
        {links.map((l) => item(l, true))}
      </nav>
    </header>
  );
}

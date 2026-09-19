"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const path = usePathname();
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1728px] items-center justify-between px-5 py-5 sm:px-10">
        <Link href="/" aria-label="Home" className="pointer-events-auto block h-[52px] w-[52px] overflow-hidden rounded-full ring-2 ring-white/80 sm:h-[70px] sm:w-[70px]">
          <Image src="/img/headshot.jpg" alt="Zyad" width={70} height={70} />
        </Link>

        <nav className="glass pointer-events-auto hidden items-center gap-10 rounded-full px-10 py-4 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`label transition-opacity hover:opacity-100 ${path.startsWith(l.href) ? "text-white" : "text-white/80"}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" aria-label="Contact" className="glass pointer-events-auto grid h-[52px] w-[52px] place-items-center rounded-full sm:h-[70px] sm:w-[70px]">
          <svg viewBox="0 0 37 30" className="h-5 w-6 sm:h-6 sm:w-7" fill="white" aria-hidden>
            <path d="M3.7 30c-1.02 0-1.89-.37-2.61-1.1S0 27.28 0 26.25V3.75c0-1.03.36-1.91 1.09-2.65S2.68 0 3.7 0h29.6c1.02 0 1.89.37 2.61 1.1S37 2.72 37 3.75v22.5c0 1.03-.36 1.91-1.09 2.65S34.32 30 33.3 30H3.7Zm14.8-13.13L3.7 7.5v18.75h29.6V7.5l-14.8 9.37Zm0-3.75L33.3 3.75H3.7l14.8 9.37Z" />
          </svg>
        </Link>
      </div>

      <nav className="glass pointer-events-auto mx-auto mt-1 flex w-max items-center gap-6 rounded-full px-6 py-3 md:hidden">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={`eyebrow ${path.startsWith(l.href) ? "text-white" : "text-white/80"}`}>{l.label}</Link>
        ))}
      </nav>
    </header>
  );
}

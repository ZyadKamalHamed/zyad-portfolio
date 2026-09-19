import Link from "next/link";

export default function Footer() {
  return (
    <footer className="night px-5 py-12 sm:px-10">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl font-light">Zyad Kamal Hamed</p>
          <p className="mt-2 max-w-md text-sm text-white/60">Designer, developer and AI engineer in Sydney.</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <Link href="/#contact" className="label text-white/80 hover:text-white">Contact</Link>
          <a href="https://github.com/ZyadKamalHamed" className="label text-white/80 hover:text-white" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="mailto:zyad2408@live.com.au" className="label text-white/80 hover:text-white">Email</a>
        </div>
      </div>
    </footer>
  );
}

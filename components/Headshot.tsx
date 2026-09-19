import Image from "next/image";

/* Cut-out portrait on the translucent slate gradient from the Figma hero, with the light-to-slate ring. */
export default function Headshot({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <div className={`headshot-ring rounded-full p-[3px] ${className}`}>
      <div className="headshot-ground relative h-full w-full overflow-hidden rounded-full">
        <Image src="/img/headshot-cutout.png" alt="Zyad Kamal Hamed" width={240} height={240} priority={priority} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

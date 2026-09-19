export const services = [
  {
    key: "design",
    title: "Design",
    tagline: "Human-centred design, no AI slop.",
    copy: "Research, wireframes and a proper design system, built around the people who will actually use it. Every screen is decided by a human, then handed over in Figma with the reasoning attached.",
    items: ["Brand identity", "Website design", "Customer experience", "Design systems", "Campaign rollouts"],
  },
  {
    key: "develop",
    title: "Develop",
    tagline: "A live link in days, not months.",
    copy: "Once the design is signed off, AI-assisted development turns it into a working site fast, without cutting corners on the code you end up owning. Deployed, tested and handed over clean.",
    items: ["Next.js builds", "E-commerce and payments", "Admin and content tools", "Performance and SEO", "Deployment and handover"],
  },
  {
    key: "automate",
    title: "Automate",
    tagline: "Systems that keep you hands-off.",
    copy: "With your product live, we build the automations around it: lead capture, follow-ups, content, reporting, AI assistants. The goal is a business that keeps working while you are not.",
    items: ["Lead capture and CRM", "Email and follow-up flows", "AI assistants and chatbots", "Reporting dashboards", "Integrations and APIs"],
  },
];

export type CaseMedia =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; poster: string; alt: string }
  | { kind: "stack"; images: { src: string; alt: string }[]; alt: string };

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  client: string;
  role: string;
  summary: string;
  decision: string;
  stack: string[];
  stats?: { value: string; label: string }[];
  media: CaseMedia;
  link?: { href: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "solemate",
    title: "Solemate",
    category: "Landing pages",
    client: "Solemate, custom footwear",
    role: "Design translation · Front-end · Motion",
    summary:
      "A scroll-driven landing page built from the Solemate Figma file. One pinned stage runs the whole story, from a scanned foot contour to a rotating sole and exploded pressure layers, with every element driven by scroll progress.",
    decision:
      "Scroll progress, not time, drives the motion. The page never plays at the visitor, it responds to them, and the same timeline holds at every window size because every beat is defined as a fraction of the track rather than in pixels.",
    stack: ["Next.js", "React", "Motion", "Figma"],
    media: { kind: "video", src: "/case/solemate.mp4", poster: "/case/solemate.jpg", alt: "Solemate landing page" },
    link: { href: "https://github.com/ZyadKamalHamed/solemate", label: "View repository ↗" },
  },
  {
    slug: "by-george",
    title: "By George! Food & Coffee",
    category: "E-commerce",
    client: "By George, Croydon Park",
    role: "Design · Build · Shop · Maintain",
    summary:
      "A neighbourhood cafe's website and online shop. I designed it and built it: one fast page carrying menu, gallery and retail in the shop's own hand-drawn voice, with Stripe Checkout, live stock and order emails behind it, kept current through every menu change since.",
    decision:
      "The owner edits products, prices and stock from a small admin console, and checkout only ever trusts the server-side catalog. A hidden product cannot be listed, linked to or bought, but it stays editable, so going offline is a toggle rather than a deletion.",
    stack: ["HTML/CSS/JS", "Stripe Checkout", "Redis", "Resend", "Vercel"],
    media: { kind: "video", src: "/case/bygeorge.mp4", poster: "/case/bygeorge.jpg", alt: "By George website" },
    link: { href: "https://bygeorgecoffee.com.au", label: "Visit live site ↗" },
  },
  {
    slug: "safesize-triage",
    title: "SafeSize Triage",
    category: "Triage platforms",
    client: "SafeSize × The General Store",
    role: "Discovery · Data model · UX · Security",
    summary:
      "SafeSize 3D foot scanners sit on shop floors across Asia-Pacific. When one breaks, the fix used to start with a phone call. Triage replaces that: machines report their own faults, store staff report through an AI chatbot, and every fault becomes a ticket routed to the right support tier across three countries.",
    decision:
      "Row-level security in Postgres, not application code, decides who sees what. Stores never see tiers, countries or the supply chain behind their fix, and every region choice keeps the data in Australia.",
    stack: ["Next.js", "Supabase Postgres", "Claude on AWS Bedrock", "Twilio"],
    stats: [
      { value: "16", label: "tables" },
      { value: "46", label: "RLS policies" },
      { value: "21", label: "screens" },
      { value: "3", label: "countries" },
    ],
    media: { kind: "video", src: "/case/safesize.mp4", poster: "/case/safesize.jpg", alt: "SafeSize Triage customer demo" },
    link: { href: "/#contact", label: "Private client repository, walkthrough on request" },
  },
  {
    slug: "jarvis",
    title: "JARVIS",
    category: "AI systems",
    client: "Personal AI operating system",
    role: "Everything",
    summary:
      "A personal AI operating system that runs as one zero-dependency Node process over a folder of JSON, with a browser as the only client. Scheduled agents write the morning briefing, plan the day and file the tasks; the dashboard renders that state and reads it back. It rewrites itself nightly, one change at a time, gated on its own tests.",
    decision:
      "Stealth mode strips personal data server-side, before the response is serialised, rather than hiding it with CSS on the client. Anything the browser never receives cannot leak off a shared screen.",
    stack: ["Node", "JSON store", "Web Speech", "Tailscale"],
    media: { kind: "video", src: "/case/jarvis.mp4", poster: "/case/jarvis.jpg", alt: "JARVIS HUD" },
    link: { href: "/#contact", label: "Private repository, walkthrough on request" },
  },
];

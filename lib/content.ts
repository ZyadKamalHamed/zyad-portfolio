export const services = [
  {
    key: "design",
    title: "Design",
    tagline: "Human-centred design, no AI slop.",
    copy: "Research, wireframes and a proper design system, with copywriting that sounds like your brand. You are part of every decision, and design iterations are included, not billed as extras.",
    items: ["Website design", "Brand identity", "Campaign rollouts", "Design systems", "Customer experience"],
  },
  {
    key: "develop",
    title: "Develop",
    tagline: "A live link in days, not months.",
    copy: "Once you are happy with the design, AI-assisted development turns it into a working product fast, without cutting corners on the code you end up owning. Deployed, tested and live on your own domain.",
    items: ["E-commerce platforms", "Sales and analytics dashboards", "Landing pages", "AI systems", "AI generated media"],
  },
  {
    key: "automate",
    title: "Automate",
    tagline: "Systems that keep you hands-off.",
    copy: "With your product live, we build the automations around it to lighten the load: payments, lead capture, follow-ups, AI assistants. The goal is a business that keeps working while you are not.",
    items: ["Automatic email and SMS", "Payment systems", "AI assistants and chatbots", "Reporting dashboards", "Integrations and APIs"],
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
    title: "Figma file to scroll-driven product story",
    category: "Landing pages",
    client: "Solemate · Custom footwear landing page",
    role: "Design translation · Front-end · Motion",
    summary:
      "A scroll-driven landing page built from the Solemate Figma file. One pinned stage runs the whole story, from a scanned foot contour to a rotating sole and exploded pressure layers, with every element driven by scroll progress.",
    decision:
      "Scroll progress, not time, drives the motion. The page never plays at the visitor, it responds to them, and the same timeline holds at every window size because every beat is defined as a fraction of the track rather than in pixels.",
    stack: ["Next.js", "React", "Motion", "Figma"],
    media: { kind: "video", src: "/case/solemate.mp4", poster: "/case/solemate.jpg", alt: "Solemate landing page" },
    link: { href: "/#contact", label: "Private repository, walkthrough on request" },
  },
  {
    slug: "by-george",
    title: "Pitch to launch in two weeks",
    category: "E-commerce",
    client: "By George! Food & Coffee · Croydon Park",
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
    title: "Faults reported in minutes, not phone calls",
    category: "Triage platforms",
    client: "SafeSize Triage · with The General Store",
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
    title: "One AI system running a job and a degree",
    category: "AI systems",
    client: "JARVIS · Personal AI operating system",
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

export const contactIntro =
  "Tell me what you are trying to do. I reply within a day, and I will tell you straight if I am not the right person for it.";

export const aboutBio =
  "Hi, I am Zyad. I work full-time as the sole AI specialist at a mid-sized Sydney creative agency, I am in the final year of a Bachelor of AI at UTS, and I freelance as a designer and developer for small businesses that want a proper presence online and systems that run without them. Here is how I got here.";

export type TimelineEntry = { year: string; title: string; meta: string; body: string; image?: { src: string; alt: string } };

export const timeline: TimelineEntry[] = [
  {
    year: "2026",
    title: "Bachelor of Artificial Intelligence, graduating",
    meta: "UTS · Aug 2024 to Dec 2026",
    body: "Distinction average. Final-year work includes a court keypoint detector at 0.994 mAP50 shown at UTS Tech Fest, and a RAG chatbot built for UTS FEIT students.",
  },
  {
    year: "2025",
    title: "AI Specialist, The General Store",
    meta: "Surry Hills · Sep 2025 to present",
    body: "Sole technical hire at a 60-person creative agency. Shipped the staff onboarding platform, wrote automation that removed 39 weeks of manual documentation a year, and trained 50+ people on AI tools.",
  },
  {
    year: "2024",
    title: "Freelance designer and developer",
    meta: "Self-employed · Sep 2024 to present",
    body: "Pitched and won By George's first website, then came back in 2026 with a rebuild: design, build, Stripe checkout, photography and owner training, from pitch to launch in two weeks.",
  },
  {
    year: "2024",
    title: "Started the Bachelor of AI at UTS",
    meta: "Sydney · Aug 2024",
    body: "Mature-age entry, studying full-time alongside full-time work.",
  },
  {
    year: "2023",
    title: "Google UX Design Certificate",
    meta: "Coursera · Apr 2023",
    body: "User research, journey mapping and stakeholder communication. Where the design half started.",
  },
  {
    year: "2018",
    title: "Retail and customer service, Platypus Shoes",
    meta: "Sydney CBD · Nov 2018 to Oct 2021",
    body: "Beat individual KPIs by 20% or more, trained new staff on POS and sales, and learned how people actually shop.",
  },
];

"use client";
import { useState } from "react";

type State = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [contact, setContact] = useState({ Email: true, Phone: true });
  const toggle = (k: "Email" | "Phone") => setContact((c) => (c[k] && !c[k === "Email" ? "Phone" : "Email"] ? c : { ...c, [k]: !c[k] }));
  const phoneOnly = contact.Phone && !contact.Email;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    data.contact = (["Email", "Phone"] as const).filter((k) => contact[k]).join(" and ");
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setState(res.ok ? "sent" : "error");
  }

  if (state === "sent") {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <p className="font-display text-2xl font-light">Thanks, got it.</p>
        <p className="mt-2 text-white/70">I will be in touch soon!</p>
      </div>
    );
  }

  const field = "w-full rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/35 focus:border-white/50 focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2"><span className="eyebrow text-white/50">Name</span><input name="name" required className={field} placeholder="Your name" /></label>
        <label className="flex flex-col gap-2"><span className="eyebrow text-white/50">Email</span><input name="email" type="email" required className={field} placeholder="you@company.com" /></label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2"><span className="eyebrow text-white/50">Business</span><input name="business" className={field} placeholder="Optional" /></label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-white/50">Phone</span>
          <input name="phone" type="tel" autoComplete="tel" required={phoneOnly} className={field} placeholder={phoneOnly ? "Needed if you prefer a call or text" : "Optional"} />
        </label>
      </div>
      <fieldset className="flex flex-col gap-2">
        <legend className="eyebrow text-white/50">Preferred contact</legend>
        <div className="mt-2 flex flex-wrap gap-3">
          {(["Email", "Phone"] as const).map((k) => (
            <label key={k} className={`label flex cursor-pointer items-center gap-3 rounded-full border px-5 py-2.5 transition-colors ${contact[k] ? "border-white/60 text-white" : "border-white/20 text-white/55 hover:border-white/40"}`}>
              <input type="checkbox" checked={contact[k]} onChange={() => toggle(k)} className="sr-only" />
              <span className={`grid h-4 w-4 place-items-center rounded-[4px] border ${contact[k] ? "border-white bg-white" : "border-white/40"}`} aria-hidden>
                {contact[k] && <svg viewBox="0 0 12 12" width="10" height="10" fill="none"><path d="M2 6.5l2.5 2.5L10 3.5" stroke="#1C2733" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </span>
              {k}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="flex flex-col gap-2">
        <span className="eyebrow text-white/50">What do you need?</span>
        <select
          name="service"
          defaultValue="Not sure yet"
          className={`${field} appearance-none bg-no-repeat pr-12`}
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 16 16'%3E%3Cpath d='M3 6l5 5 5-5' stroke='%23ffffff' stroke-opacity='0.75' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")", backgroundPosition: "right 18px center" }}
        >
          {["Design", "Develop", "Automate", "All three", "Hiring / job opportunity", "Not sure yet"].map((o) => <option key={o} className="bg-slate">{o}</option>)}
        </select>
      </label>
      <label className="flex flex-col gap-2"><span className="eyebrow text-white/50">Message</span><textarea name="message" required rows={6} className={field} placeholder="What are you trying to do, and by when?" /></label>
      <button type="submit" disabled={state === "sending"} className="label mt-2 rounded-full bg-white px-8 py-4 text-slate hover:bg-white/90 disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Send message →"}
      </button>
      {state === "error" && <p className="text-sm text-red-300">Something went wrong. Email me directly at zyad2408@live.com.au.</p>}
    </form>
  );
}

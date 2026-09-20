"use client";
import { useState } from "react";

type State = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [contact, setContact] = useState<"Email" | "SMS" | "Either">("Email");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
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
          <input name="phone" type="tel" autoComplete="tel" required={contact !== "Email"} className={field} placeholder={contact === "Email" ? "Optional" : "Needed for SMS"} />
        </label>
      </div>
      <fieldset className="flex flex-col gap-2">
        <legend className="eyebrow text-white/50">Preferred contact</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {(["Email", "SMS", "Either"] as const).map((o) => (
            <label key={o} className={`label cursor-pointer rounded-full border px-5 py-2.5 transition-colors ${contact === o ? "border-white bg-white text-slate" : "border-white/20 text-white/70 hover:border-white/50 hover:text-white"}`}>
              <input type="radio" name="contact" value={o} checked={contact === o} onChange={() => setContact(o)} className="sr-only" />
              {o}
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

# Zyad Kamal Hamed, portfolio

Live at [zyad-portfolio-sage.vercel.app](https://zyad-portfolio-sage.vercel.app).

One-page freelance and portfolio site: a sticky sky hero with drifting clouds, three services, a draggable case study carousel with looping demo videos, a contact form, and an About page with a timeline. Designed in Figma, built with Next.js.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind v4 with a five-colour palette (cloud, slate, sky, signal, iris)
- `motion` for the hero fade, section reveals, nav bubble and carousel spring
- Sora, Geist and Geist Mono via `next/font`
- Contact form posts to `app/api/contact` and sends through Resend when `RESEND_API_KEY` is set; without it the message is logged server-side and the form still succeeds
- Deployed on Vercel

## Run it

```bash
npm install
cp .env.example .env.local   # add RESEND_API_KEY to send real email
npm run dev
```

## Where things live

- `lib/content.ts` holds all copy: services, case studies, contact intro, About bio and timeline entries. Edit there, not in components.
- `components/` has the Hero, Clouds, ServicesPanel, WorkCarousel, ContactForm, Nav, Footer and Headshot.
- `public/case/` holds the case study videos and posters. `scripts/convert-video.sh <recording.mov> <slug>` converts a screen recording into the right mp4 and poster.
- `public/img/` holds the headshot, sky and timeline images.

## Case studies

Solemate (landing page), By George! Food & Coffee (e-commerce), SafeSize Triage (triage platform, private client work) and JARVIS (personal AI operating system, [repo](https://github.com/ZyadKamalHamed/jarvis)).

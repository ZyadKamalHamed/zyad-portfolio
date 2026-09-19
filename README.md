# zyad-portfolio-v2

Portfolio and freelance site for Zyad Kamal Hamed. Next.js App Router, Tailwind v4, deployed on Vercel.

Pages: `/` (hero, Design / Develop / Automate, selected case studies), `/services`, `/case-studies`, `/about` (timeline stubbed "coming soon"), `/contact` (form → `/api/contact`).

- Fonts: Sora (display), Geist (body), Geist Mono (labels) via `next/font/google`.
- Colours: Cloud `#FFFFFF`, Slate `#1C2733`, Sky `#8FC1E8`, Signal `#3D7FD1`, Iris `#8B7BD8` (see `app/globals.css`).
- Sky background is the `Cloud-export` frame from the Figma file (a shader fill, exported to `public/img/sky.jpg`).
- Copy for services and case studies lives in `lib/content.ts`.
- Contact form emails through Resend when `RESEND_API_KEY` is set (see `.env.example`); otherwise it logs server-side and still returns success.

```
npm run dev
npm run build
```

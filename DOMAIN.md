# Custom domain setup

Target: **zyadkamalhamed.com** as the primary domain, with
`zyad-portfolio-sage.vercel.app` permanently redirecting to it. That Vercel URL has
been submitted in job applications, so it must keep resolving forever.

Both `zyadkamalhamed.com` and `zyadkamalhamed.dev` were unregistered as of 31 August
2026. `.com` is the recommendation: recruiters and small business clients both type it
without thinking. If you buy `.dev` instead, change the one `destination` value in
`vercel.json` and the four URLs in the `<head>` of `index.html`.

## Order of operations, and it matters

The redirect in `vercel.json` sends every request for `zyad-portfolio-sage.vercel.app`
to `https://zyadkamalhamed.com`. If that domain does not resolve yet, the Vercel URL
becomes a dead end, and because the redirect is a permanent 301, browsers that see it
will cache it and keep going to the dead domain even after you fix it.

So do these in order. Do not run a production deploy until step 4 passes.

1. **Buy the domain.**
2. **Add it to Vercel** and wait for it to verify.
3. **Confirm it serves the current site** at `https://zyadkamalhamed.com`.
4. **Only then** promote this branch to production.

Preview deployments are unaffected either way: the redirect is scoped by host to
`zyad-portfolio-sage.vercel.app`, so it never fires on a preview URL.

## Buying it

**Easiest:** buy through Vercel (`vercel domains buy zyadkamalhamed.com`). DNS is
configured automatically and you can skip the records section below entirely.

**Anywhere else:** Cloudflare Registrar sells at cost, Porkbun is close. Then add the
records below.

## DNS records

Vercel's Domains tab shows the authoritative values when you add the domain. Copy what
it displays. Vercel has been migrating the apex address, so you may be shown
`216.198.79.1` rather than the older `76.76.21.21`. Either is correct if the dashboard
says so.

| Type  | Name  | Value                  |
| ----- | ----- | ---------------------- |
| A     | `@`   | `76.76.21.21`          |
| CNAME | `www` | `cname.vercel-dns.com` |

Set the apex (`zyadkamalhamed.com`) as the primary domain in Vercel, and set `www` to
redirect to it.

## After the domain is live

Update these in `index.html`, which still point at the Vercel URL:

- `<link rel="canonical">`
- `og:url`
- `og:image`

## Why vercel.json and not vercel.ts

`vercel.ts` is the current recommendation, but it needs `@vercel/config` installed and a
Node toolchain. This site is three static files with no package.json and no build step,
so a config file that requires npm would be the only dependency in the project. Not
worth it for one redirect.

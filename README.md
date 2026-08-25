# Zyad Kamal Hamed — Portfolio

Single-page portfolio under four service buckets: web design, static asset
rollouts, platform design, and AI solutions.

Static site — no build step. `index.html` + `styles.css` + `script.js`,
optimised imagery in `img/`. Deployed on Vercel.

`assets/` holds the raw source exports (Figma renders, full-resolution
screenshots) and is not committed; `img/` carries the web-ready versions.

## Run locally

```bash
python3 -m http.server 8000
# http://localhost:8000
```

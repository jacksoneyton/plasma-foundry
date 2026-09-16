# plasma-foundry

Landing page and download host for **Plasma Foundry** — cohesive theme packs for KDE Plasma, starting with **Nightfall**. Plain HTML/CSS, no build step, served via GitHub Pages.

The actual downloadable binaries (`downloads/*.AppImage`, `*.flatpak`) are committed straight into this repo and served as static files. They're built from the (private) Nightfall source repo's CI — when a new version ships, pull the fresh artifacts from there and replace the files in `downloads/`.

When a second theme pack exists, this is also where the site grows from a single-theme landing page into a small catalog — not built out yet since there's nothing to catalog.

## Local preview

No build step — just serve the directory:

```bash
python3 -m http.server 8000
```

## Structure

```
index.html          the whole site (single page)
css/style.css        design system + layout
assets/               favicon, screenshots (optimized to JPEG for web)
downloads/            the actual binaries users download
```

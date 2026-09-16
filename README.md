# nightfall-site

The [Nightfall](https://buymeacoffee.com/jacksoneyton) theme's landing page and download host — plain HTML/CSS/no build step, served via GitHub Pages.

The actual downloadable binaries (`downloads/*.AppImage`, `*.deb`, `*.rpm`) are committed straight into this repo and served as static files. They're built from the (private) Nightfall source repo's CI — when a new version ships, pull the fresh artifacts from there and replace the files in `downloads/`, bumping the version numbers referenced in `index.html`'s download links.

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

# Clean Sweep Website Concepts

Static HTML/CSS/JS website concepts for Clean Sweep, a professional street sweeping and exterior maintenance business serving Los Angeles County.

## Files

- `index.html` - concept-selection page
- `concept-clean-corporate.html` - bright corporate concept
- `concept-blue-motion.html` - dark motion-driven concept
- `concept-skyline-minimal.html` - light premium editorial concept
- `concept-route-command.html` - operational dispatch-style concept
- `concept-ocean-cut.html` - bold editorial image-slice concept
- `concept-county-atlas.html` - map-led service-area concept
- `styles.css` - shared responsive styling and concept-specific design systems
- `script.js` - mobile navigation, smooth anchors, header shadow, reveal effects, pointer glow, dynamic year, and quote-form validation
- `assets/logo/clean-sweep-logo.jpg` - official uploaded logo
- `assets/images/` - street sweeping photography placeholders and image guide

## Preview locally

Run a local server from this folder:

```bash
python3 -m http.server 8080
```

Then visit:

```text
http://localhost:8080/
```

## Replace the logo

The official uploaded logo is currently:

```text
assets/logo/clean-sweep-logo.jpg
```

The JPG has a white rectangular background, so the layouts keep it on white or inside a white logo container. If a transparent PNG or SVG becomes available later, update the image path in the HTML files and keep the same aspect ratio.

## Replace photographs

Replace these files in `assets/images/`:

```text
assets/images/street-sweeper-hero.webp
assets/images/commercial-sweeping.webp
assets/images/street-sweeping-detail.webp
```

Recommended dimensions and usage notes are in:

```text
assets/images/IMAGE-GUIDE.txt
```

## Change the phone number

The current phone number is `(661) 618-8375` and all call links use:

```text
tel:+16616188375
```

To change it, update the visible phone text and every `tel:` link in the HTML files. Also update `businessPhone` in `script.js` and the JSON-LD telephone value in each concept page.

## Configure the quote form

The form is intentionally not connected to a backend yet. In `script.js`, update:

```js
const QUOTE_ENDPOINT = "";
```

Set it to a secure form endpoint from a provider such as Formspree, Netlify Forms, Cloudflare Workers, or another backend. Do not place private API keys in this file.

When `QUOTE_ENDPOINT` is empty, the form validates the fields and then tells the visitor to call `(661) 618-8375` to complete the request.

## Deploy

### GitHub Pages

1. Push these files to a GitHub repository.
2. In GitHub, open Settings > Pages.
3. Choose the branch and root folder.
4. Save and wait for the published URL.

### Netlify

1. Create a new Netlify site from the repository.
2. Build command: leave empty.
3. Publish directory: `/` or the repository root.
4. Deploy.

### Cloudflare Pages

1. Create a new Cloudflare Pages project from the repository.
2. Framework preset: None.
3. Build command: leave empty.
4. Output directory: `/` or the repository root.
5. Deploy.

## Connect cleansweephq.com

After deployment, add `cleansweephq.com` as a custom domain in the hosting provider dashboard. Follow that provider's DNS instructions, usually by adding `A`, `AAAA`, or `CNAME` records at the domain registrar. After DNS is active, enable HTTPS in the hosting provider dashboard.

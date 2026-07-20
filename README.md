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
- `script.js` - mobile navigation, smooth anchors, header shadow, reveal effects, video playlist handling, quote-form reveal, dynamic year, and quote-form validation
- `assets/logo/full-logo-transparent.png` - official transparent logo
- `assets/video/` - client-provided background videos used in the Free Quote montage
- `assets/images/` - media guide for future client-provided photography

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

The official transparent logo is currently:

```text
assets/logo/full-logo-transparent.png
```

The header uses transparent symbol and wordmark crops from the same logo source for a compact horizontal lockup. Keep the PNG files optimized and avoid spaces in logo file names.

## Add client photographs

AI-generated placeholder photos have been removed. If the client provides original photography later, add optimized files to `assets/images/` and update the page references intentionally.

Usage notes are in:

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

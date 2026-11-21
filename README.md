# PROJECT EXP website

Static website for projectexp.com.au, served by GitHub Pages. Plain HTML, CSS and a little JavaScript. There is no build step.

## Structure

- `index.html` — home
- `services/`, `about/`, `contact/` — one `index.html` each
- `styles.css`, `script.js` — shared styling and behaviour
- `assets/` — logos and icons
- `CNAME` — custom domain

## Editing

Change the text in the relevant `index.html` and commit. GitHub Pages redeploys automatically. The footer year updates itself.

## Contact form

The form on `contact/index.html` is switched off until `data-endpoint` is set to the `https://` address from a form service. Until then it asks visitors to email instead.

## Keep this repo free of private information

This repository is public. Do not commit passwords, API keys, personal details or anything about customers.

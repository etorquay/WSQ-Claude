# WSQ-Claude — DevForge Marketing Site

A single-page static marketing website for **DevForge**, a fictional software development agency. Built as a demonstration project.

## Live Site

[https://etorquay.github.io/WSQ-Claude/](https://etorquay.github.io/WSQ-Claude/)

## Project Structure

Everything lives in a single self-contained file:

```
index.html   — all HTML, CSS, and JavaScript in one file
```

## Running Locally

No build step required. Open `index.html` directly in a browser, or serve it:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then visit `http://localhost:8080`.

## Features

- **Premium dark design** — navy void (`#080D1A`) background with electric teal (`#00C9A7`) accent
- **DM Serif Display + Inter** type pairing — serif display for personality, Inter for UI clarity
- **Signature headline** — CSS `text-stroke` outlined "That Scales." in teal
- **Ambient engineering grid** — subtle CSS background-image grid on the hero
- **7 sections**: Hero, Tech Strip, Services, Process, Testimonials, Contact, Footer
- **Tech stack pill strip** between hero and services
- **Service cards** with technology tags and teal top-border hover reveal
- **Process section** — 4-step engagement model on dark background
- **Multi-column footer** — brand, services, company, and contact columns with social icons
- **Contact form** with strict pre-submit validation (name, email, phone regex) and real email delivery via FormSubmit
- **Post-submit celebration** — balloon burst animation + Web Speech API voice message on successful submission
- **WhatsApp floating widget** — FAB button with suggestive query bubbles, opens WhatsApp with pre-filled messages
- Fixed navigation with hamburger menu for mobile
- Fully responsive (breakpoints at 480px, 640px, 768px, 960px)
- Accessible: semantic HTML, ARIA labels, keyboard focus, reduced-motion support

## Deployment

Deployed automatically to GitHub Pages via GitHub Actions on every push to `main`.

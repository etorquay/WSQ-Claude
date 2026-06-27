# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-page static marketing website for "DevForge" (a software development agency). The entire project is one self-contained file: `index.html`.

## Running the Site

No build step required. Open `index.html` directly in a browser, or serve it with any static file server:

```powershell
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

## Architecture

Everything lives in `index.html` (~977 lines):

- **CSS** — embedded in `<style>`. Theming via CSS custom properties (`--primary`, `--accent`, `--bg`, `--surface`, etc.). Responsive breakpoints at 480px, 640px, 768px.
- **HTML** — five sections with anchor IDs: `#home`, `#services`, `#testimonials`, `#contact`, plus a fixed nav and footer.
- **JavaScript** — embedded in `<script>` at the bottom. Handles: hamburger menu toggle, contact form validation (email regex, required-field checks), and a form submit stub that logs to console (no backend wired up yet).

## Key Details

- The contact form's `submit` event listener (inline in `<script>`, near the bottom of `index.html`) is the integration point for a real backend — it currently logs to `console.log`. A commented-out `fetch('/api/enquiries', ...)` POST block is directly below the `console.log` call.
- CSS variables are declared at `:root` near the top of the `<style>` block — change colors/spacing there.
- No linter, formatter, or test tooling is configured.

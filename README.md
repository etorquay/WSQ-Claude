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

- Responsive layout (breakpoints at 480px, 640px, 768px)
- Five sections: Home, Services, Testimonials, Contact, Footer
- Fixed navigation with hamburger menu for mobile
- Contact form with client-side validation
- CSS custom properties for easy theming

## Deployment

Deployed automatically to GitHub Pages via GitHub Actions on every push to `main`.

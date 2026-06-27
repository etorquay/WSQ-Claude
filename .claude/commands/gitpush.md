# Git Push & Deploy

Full publish workflow: security scan, push code, generate README, deploy GitHub Pages, and update repo About.

## Steps

### 1. Security Scan
Before pushing, scan all files for sensitive data:
- API keys, tokens, secrets (patterns: `sk-`, `Bearer `, `api_key`, `password`, `secret`, `token`)
- `.env` files or files containing credentials
- Hardcoded email addresses or personal data beyond what is intentional

If any sensitive data is found, **stop and warn the user** — do not proceed with the push until resolved.

```bash
cd "c:\Users\I066782\Documents\SAP Share 2026\WSQ Claude"
git diff --cached --diff-filter=A -U0 | grep -iE "(api_key|secret|password|token|bearer|sk-|private_key)" || true
grep -rniE "(api_key|secret|password|token=|bearer |sk-[a-zA-Z0-9])" --include="*.html" --include="*.js" --include="*.json" --include="*.md" --exclude-dir=".git" . || true
```

Report findings to the user. If clean, proceed.

### 2. Generate / Update README
Check if README.md exists and is up to date. If missing or minimal, generate one covering:
- Project name and description
- Live site link: `https://etorquay.github.io/WSQ-Claude/`
- How to run locally
- Features overview
- Deployment notes

### 3. Ensure GitHub Actions Workflow Exists
Check that `.github/workflows/deploy.yml` exists. If missing, create it:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
          exclude_assets: '.github'
```

### 4. Stage, Commit, and Push
```bash
cd "c:\Users\I066782\Documents\SAP Share 2026\WSQ Claude"
git add -A
git commit -m "${ARGUMENTS:-update site}"
git push origin main
```

Confirm the commit hash and list of files pushed.

### 5. Update Repo About (manual step)
Remind the user to set the repo About on GitHub if not already done:
1. Go to **github.com/etorquay/WSQ-Claude**
2. Click the **gear icon** next to "About"
3. Set Website to: `https://etorquay.github.io/WSQ-Claude/`
4. Set Description to a one-line summary of the project

### 6. Confirm Deployment
After pushing, remind the user:
- The GitHub Actions workflow will auto-deploy to `https://etorquay.github.io/WSQ-Claude/`
- They can monitor progress at: **github.com/etorquay/WSQ-Claude/actions**
- Site is live ~1–2 minutes after the workflow completes

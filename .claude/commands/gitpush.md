# Git Push

Stage all changes, commit, and push to GitHub.

## Steps

```bash
cd "c:\Users\I066782\Documents\SAP Share 2026\WSQ Claude"

# Stage all changes
git add -A

# Commit with a message — ask the user if none provided, otherwise use $ARGUMENTS
git commit -m "${ARGUMENTS:-update site}"

# Push to origin main
git push origin main
```

After pushing, confirm the commit hash and summary of what was pushed.

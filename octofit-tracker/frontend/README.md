# OctoFit Tracker Frontend

## Environment variables

Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The presentation tier builds API URLs like:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is missing, the app falls back to:

```text
http://localhost:8000
```

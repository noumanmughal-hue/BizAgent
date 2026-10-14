# CLAUDE.md — BizAgent

## Purpose
BizAgent is a business web app that uses Claude to help with everyday business tasks. Users work through a simple web UI; the backend sends their requests to the Claude Messages API and returns the results.

## Stack
- **Frontend:** plain HTML, CSS and JavaScript in `public/`. No frameworks, no build step.
- **Backend:** Node.js with Express in `backend/`.
- **AI:** Claude Messages API, called **only** from the backend.
- **Hosting:** Vercel. `public/` is served as static files and the Express app runs as a serverless function.

## Architecture
```
Browser (public/)  ──fetch /api/*──▶  Express (backend/)  ──▶  Claude Messages API
                                         │
                                         ├── prompts/  (system prompts and templates)
                                         └── data/     (static business data)
```
- `public/index.html`, `styles.css` and `app.js` hold the UI and its client-side logic.
- `backend/` holds the Express routes, the Claude client and validation.
- `prompts/` holds the prompt text. Keep prompts out of the code.
- `data/` holds non-secret data files.

## Scope rule
**Only modify the files the current task needs.** No drive-by refactors, renames, reformatting or new dependencies unless the task asks for them. If another change looks necessary, ask first.

## Coding rules
- Keep it simple and readable. Prefer small functions and clear names.
- Use modern vanilla JS (ES modules, `const`/`let`, `async`/`await`). No jQuery or UI frameworks.
- Use the same style in the frontend and the backend: 2-space indent, semicolons, single quotes.
- Comment only where the reason isn't obvious.
- Handle errors explicitly. The backend returns JSON errors with the right status codes, and the frontend shows users a friendly message.
- Add a dependency only when it clearly earns its place.
- Read config from environment variables (`ANTHROPIC_API_KEY`, `CLAUDE_MODEL`, etc.). Never hard-code config.

## Security rules
- **Never expose `ANTHROPIC_API_KEY` to the browser.** All Claude calls go through the backend.
- Never commit secrets. Keep `.env` in `.gitignore` and store production keys in Vercel environment variables.
- Validate and size-limit all request input on the server. Never trust client data.
- Never insert user or model output into the DOM with `innerHTML`. Use `textContent` or sanitize it first.
- Add basic rate limiting to the `/api/*` routes.
- Don't log secrets, full prompts with personal data, or API keys.
- Keep user-supplied text clearly separated from system prompts, and never let it override them.

## Token-saving rules
**When working in this repo (Claude Code):**
- Read only the files the task needs, and target searches instead of reading whole folders.
- Don't re-read files you just edited, and don't repeat file contents in replies.
- Keep explanations short. Show the diffs or changed sections, not whole files.

**In the app (Claude API usage):**
- Set a sensible `max_tokens` for each endpoint.
- Keep system prompts short and reusable, and use prompt caching for long, stable prompts.
- Send only the conversation history and data the request needs. Trim or summarize long histories.
- Use the smallest model that does the job well, and make it configurable via `CLAUDE_MODEL`.

## DESIGN SYSTEM
Every page and widget must follow this design system. Define these values once as CSS custom properties in `public/styles.css` and reuse them. Don't hard-code colors anywhere else.

**Colors**
| Token | Value | Use |
|---|---|---|
| `--bg-start` / `--bg-end` | `#E8EAED` → `#D3D6DB` | Page background: a subtle metallic silver gradient |
| `--maroon-start` / `--maroon-end` | `#5E1224` → `#8C1D36` | Hero banner: a deep metallic maroon gradient |
| `--text-on-maroon` | `#FFFFFF` | All text on maroon surfaces |
| `--heading` | `#000000` | Headings on light surfaces |
| `--body` | `#2E3238` | Body text |

- **Page background:** `linear-gradient(180deg, var(--bg-start), var(--bg-end))` across the full page.
- **Hero banner:** a maroon gradient plus a soft shine. Layer a faint white highlight on top, e.g. `linear-gradient(135deg, rgba(255,255,255,0.18), transparent 45%)`. All banner text is white.

**Typography**
- Load both fonts from Google Fonts in each page's `<head>`:
  `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700&family=Figtree:wght@400;500;600&display=swap`
- **Bricolage Grotesque:** all headings (`h1`–`h6`) and buttons.
- **Figtree:** paragraphs and all other body text.
- Fallback stacks: `'Bricolage Grotesque', system-ui, sans-serif` and `'Figtree', system-ui, sans-serif`.

**Rules**
- Headings are black and body text is dark grey on light surfaces. On maroon surfaces, everything is white.
- New components (cards, forms, modals, chat widgets) must reuse these tokens and fonts. Don't add new colors or typefaces.
- Keep contrast at WCAG AA or better.

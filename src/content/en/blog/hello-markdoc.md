---
title: "Hello, Markdoc: building a localized site with Next.js and Lingo"
description: A walkthrough of how this example repo wires Markdoc into the Next.js App Router and keeps every locale in sync with Lingo.
date: 2026-04-21
author: Lingo team
---

{% blog-hero version="v1" /%}

## Why this example exists

Plenty of tutorials cover Markdoc on its own, or i18n on its own. This repo shows the whole stack wired together: long-form Markdoc pages, JSON UI strings, locale-prefixed routes, and an automated translation pipeline.

## How the pieces fit together

{% callout type="note" %}
The goal is one source of truth per piece of content, in a single language, with translations generated on demand.
{% /callout %}

### Markdoc renders in App Router

Each route under `src/app/[lang]/` loads a document with `loadDoc(locale, collection, slug)` and hands the transformed tree to `renderMarkdoc`. Custom tags – `callout`, `bento`, `blog-hero`, and friends – are declared in `src/markdoc.schema.ts` and implemented under `src/components/markdoc/`.

### UI strings live in JSON

Anything that shows up in a component (navbar labels, CTA copy, button states) lives in `src/content/<locale>/ui.json` and is loaded by `getMessages(locale)`. TypeScript infers the message shape from the English source file, so missing keys fail at build time.

### Lingo owns the translations

`.lingo/config.json` declares two file groups:

- `markdoc` – every `.md` under `src/content/<locale>/pages` and `src/content/<locale>/blog`
- `json` – the UI-string catalog at `src/content/<locale>/ui.json`

Running `lingo push` reads the source-locale files, translates whatever has changed, writes the target-locale files, and updates `.lingo/lock.json` with content checksums. Unchanged entries are skipped on the next run.

### A middleware picks a sensible default

`src/proxy.ts` inspects the `Accept-Language` header and redirects bare paths like `/` or `/blog/hello-markdoc` to the best-matching locale. Unknown locales fall back to `en`.

## Try it yourself

1. Clone the repo and run `pnpm install`.
2. Authenticate once: `lingo login`, then `lingo link` to bind your engine.
3. Edit any file under `src/content/en/` – the home page, this blog post, or `ui.json`.
4. Run `lingo push` to regenerate the other locales.
5. Run `pnpm dev` and switch languages from the navbar.

That's the whole loop.

---

Questions or feedback? Open an issue on GitHub – contributions welcome.

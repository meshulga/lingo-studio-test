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

## Adding a new locale

Adding a language is a single edit. `src/lib/i18n.ts` builds its `locales` list from `.lingo/config.json`, so the router, static generation and the translation pipeline all read the same list:

```json
{
  "sourceLocale": "en",
  "targetLocales": ["es", "fr", "de", "ja"]
}
```

Run `lingo push` after the change. Every source file is translated into the new locale, and the existing locales are left alone. On the next build, `generateStaticParams` in `src/app/[lang]/layout.tsx` emits one set of pages per language, including the new one.

{% callout type="warning" %}
Pick locale codes once and keep them. Renaming `pt` to `pt-BR` later moves every translated file to a new folder and changes every URL that contains the locale.
{% /callout %}

## Writing content that translates well

Machine translation is only as good as its source. A few habits make the output noticeably better:

- **Keep sentences short.** One idea per sentence is easier to translate and easier to review.
- **Avoid idioms and wordplay.** "Hit the ground running" survives a trip through German about as well as you'd expect.
- **Put commands and file names in backticks.** Inline code is copied as written, so `lingo push` never turns into a verb in Spanish.
- **Write headings that stand alone.** "Setup" is ambiguous; "Set up your engine" gives the translator the context it needs.
- **Keep whole sentences in one string.** Sentences glued together from fragments break in languages with a different word order. Use a placeholder for the part that changes instead.

### Frontmatter is content too

The `title` and `description` fields at the top of each post are translated along with the body, because they appear in the blog index and in search results. Fields that are not listed in `translateFrontmatterFields`, such as `date` and `author`, are copied unchanged.

## Reviewing translations

Generated translations are a first draft. Treat them the way you treat code:

1. Run `git diff` after `lingo push` and read the changes for each locale.
2. Pay extra attention to headings, calls to action and anything legal.
3. Fix wording directly in the target file and commit it together with the generated changes.

Because unchanged entries are skipped, a fix stays in place until the English passage it translates changes.

{% callout type="danger" %}
Never change the meaning of a translated file on its own. If the English is wrong, fix the English and translate again; otherwise the locales drift apart, and nobody notices until a reader does.
{% /callout %}

## Common pitfalls

A few things that trip people up:

- **Renaming a source file.** The translations stay behind under the old name. Move or delete them in the same commit.
- **Breaking a Markdoc tag in a translation.** If a translated page fails to render, compare its tags with the English source. Tag names and attributes must match exactly.
- **Translating text inside components.** Strings passed as tag attributes are not translated unless the config lists them, the way `translateComponentProps` lists `label` for the bento tiles on the home page.

## Try it yourself

1. Clone the repo and run `pnpm install`.
2. Authenticate once: `lingo login`, then `lingo link` to bind your engine.
3. Edit any file under `src/content/en/` – the home page, this blog post, or `ui.json`.
4. Run `lingo push` to regenerate the other locales.
5. Run `pnpm dev` and switch languages from the navbar.

That's the whole loop.

---

Questions or feedback? Open an issue on GitHub – contributions welcome.

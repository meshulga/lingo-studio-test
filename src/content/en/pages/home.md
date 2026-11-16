---
title: Author once in Markdoc, ship in every language.
description: An example Next.js App Router app that renders Markdoc content and localizes it with Lingo.
badge: New – read the hello-markdoc post
---

{% callout type="note" %}
This site is authored in Markdoc and translated into Spanish, French, and German by Lingo. Use the language switcher in the top bar to compare.
{% /callout %}

## Built from three pieces

{% bento %}

{% bento-tile colSpan=2 %}
### Rich components in Markdown

Markdoc custom tags render as React components – even interactive ones.

{% bento-video label="Markdoc × Next.js · 1:24" /%}
{% /bento-tile %}

{% bento-tile colSpan=1 %}
### Interactive demos

Drop any client component into a document.

{% bento-payment amount="$40.00" label="Try it" /%}
{% /bento-tile %}

{% bento-tile colSpan=3 %}
### One config, every language

Point Lingo at your Markdoc and JSON files, run one command, and every target locale stays in sync.

{% bento-code language="json" %}
```json
{
  "sourceLocale": "en",
  "targetLocales": ["es", "fr", "de"],
  "files": [
    { "pattern": "src/content/en/pages/*.md", "format": "markdoc" },
    { "pattern": "src/content/en/blog/*.md", "format": "markdoc" },
    { "pattern": "src/content/en/ui.json", "format": "json" }
  ]
}
```
{% /bento-code %}
{% /bento-tile %}

{% /bento %}

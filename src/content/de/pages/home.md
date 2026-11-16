---
title: Einmal in Markdoc schreiben, in jeder Sprache ausliefern.
description: Ein Beispiel mit Next.js App Router, das Markdoc-Inhalte rendert und sie mit Lingo lokalisiert.
badge: Neu – lies den hello-markdoc-Beitrag
---

{% callout type="note" %}
Diese Seite ist in Markdoc geschrieben und wird von Lingo ins Spanische, Französische und Deutsche übersetzt. Wechsle die Sprache über die Leiste oben, um zu vergleichen.
{% /callout %}

## Aus drei Bausteinen zusammengesetzt

{% bento %}

{% bento-tile colSpan=2 %}
### Reiche Komponenten im Markdown

Markdoc-eigene Tags werden als React-Komponenten gerendert – auch interaktive.

{% bento-video label="Markdoc × Next.js · 1:24" /%}
{% /bento-tile %}

{% bento-tile colSpan=1 %}
### Interaktive Demos

Binde jede Client-Komponente in ein Dokument ein.

{% bento-payment amount="$40.00" label="Ausprobieren" /%}
{% /bento-tile %}

{% bento-tile colSpan=3 %}
### Eine Konfiguration, jede Sprache

Zeige Lingo auf deine Markdoc- und JSON-Dateien, führe einen Befehl aus, und jede Zielsprache bleibt synchron.

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

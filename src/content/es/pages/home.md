---
title: Escribe una vez en Markdoc, publícalo en todos los idiomas.
description: Un ejemplo con Next.js App Router que renderiza contenido Markdoc y lo localiza con Lingo.
badge: Nuevo – lee el artículo hello-markdoc
---

{% callout type="note" %}
Este sitio está escrito en Markdoc y traducido al español, francés y alemán por Lingo. Cambia de idioma en la barra superior para comparar.
{% /callout %}

## Tres piezas que encajan

{% bento %}

{% bento-tile colSpan=2 %}
### Componentes ricos en Markdown

Las etiquetas personalizadas de Markdoc se renderizan como componentes React, incluso los interactivos.

{% bento-video label="Markdoc × Next.js · 1:24" /%}
{% /bento-tile %}

{% bento-tile colSpan=1 %}
### Demos interactivas

Inserta cualquier componente cliente dentro de un documento.

{% bento-payment amount="$40.00" label="Probar" /%}
{% /bento-tile %}

{% bento-tile colSpan=3 %}
### Una configuración, todos los idiomas

Apunta Lingo a tus archivos Markdoc y JSON, ejecuta un solo comando y cada locale se mantiene sincronizado.

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

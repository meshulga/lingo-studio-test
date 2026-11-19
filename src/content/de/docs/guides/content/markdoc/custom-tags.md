---
title: Benutzerdefinierte Markdoc-Tags
description: Wie Callouts geschrieben werden und welche Teile eines Tags übersetzt werden.
order: 1
---

# Benutzerdefinierte Markdoc-Tags

Markdoc-Tags fügen Struktur hinzu, die sich mit reinem Markdown nicht ausdrücken lässt. Diese Website definiert ein `callout`-Tag mit drei Typen.

{% callout type="note" %}
Ein Hinweis liefert hilfreichen Kontext, den Leserinnen und Leser überspringen können.
{% /callout %}

{% callout type="warning" %}
Eine Warnung beschreibt etwas, das schiefgehen kann, wenn man sie ignoriert.
{% /callout %}

{% callout type="danger" %}
Ein Gefahrenhinweis kennzeichnet eine Aktion, die sich nicht rückgängig machen lässt.
{% /callout %}

Der Text innerhalb eines Tags wird übersetzt. Attributwerte wie `type="note"` bleiben unverändert.

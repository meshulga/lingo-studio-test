---
title: Etiquetas personalizadas de Markdoc
description: Cómo se escriben los avisos y qué partes de una etiqueta se traducen.
order: 1
---

# Etiquetas personalizadas de Markdoc

Las etiquetas de Markdoc añaden una estructura que el Markdown simple no puede expresar. Este sitio define una etiqueta `callout` con tres tipos.

{% callout type="note" %}
Una nota añade contexto útil que los lectores pueden omitir.
{% /callout %}

{% callout type="warning" %}
Una advertencia describe algo que puede salir mal si el lector la ignora.
{% /callout %}

{% callout type="danger" %}
Un aviso de peligro señala una acción que no se puede deshacer.
{% /callout %}

El texto dentro de una etiqueta se traduce. Los valores de atributos como `type="note"` se mantienen tal cual.

---
title: Listar artículos (v1)
description: Devuelve los artículos publicados con sus títulos y fechas de publicación.
order: 1
---

# Listar artículos (v1)

Este endpoint de ejemplo devuelve los artículos publicados, de más reciente a más antiguo.

`GET /api/v1/articles`

## Parámetros de consulta

| Parámetro | Descripción                                                  |
| --------- | ------------------------------------------------------------ |
| `limit`   | Número máximo de artículos que se devolverán. El valor predeterminado es 20.     |
| `cursor`  | Posición desde la que continuar, tomada de la respuesta anterior. |

## Respuesta

Cada artículo incluye su título, un breve resumen y la fecha de publicación.

{% callout type="note" %}
Esta referencia es contenido de ejemplo para pruebas de traducción. El sitio no ofrece este endpoint.
{% /callout %}

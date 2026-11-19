---
title: Obtener un autor (v1)
description: Devuelve el nombre, la biografía y los artículos publicados de un autor.
order: 2
---

# Obtener un autor (v1)

Devuelve un autor y los artículos que ha publicado.

`GET /api/v1/authors/{id}`

Si ningún autor tiene el ID indicado, el endpoint responde con `404 Not Found` y el mensaje "Author not found."

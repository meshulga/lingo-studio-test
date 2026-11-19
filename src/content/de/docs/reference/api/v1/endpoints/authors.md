---
title: Autor abrufen (v1)
description: Gibt den Namen, die Biografie und die veröffentlichten Artikel eines Autors zurück.
order: 2
---

# Autor abrufen (v1)

Gibt einen Autor und die von ihm veröffentlichten Artikel zurück.

`GET /api/v1/authors/{id}`

Wenn kein Autor mit der angegebenen ID existiert, antwortet der Endpunkt mit `404 Not Found` und der Meldung "Autor nicht gefunden."

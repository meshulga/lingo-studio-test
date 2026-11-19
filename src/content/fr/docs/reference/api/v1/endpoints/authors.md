---
title: Obtenir un auteur (v1)
description: Renvoie le nom, la biographie et les articles publiés d'un auteur.
order: 2
---

# Obtenir un auteur (v1)

Renvoie un auteur ainsi que les articles qu'il a publiés.

`GET /api/v1/authors/{id}`

Si aucun auteur ne correspond à l'ID donné, le point de terminaison renvoie `404 Not Found` accompagné du message "Author not found."

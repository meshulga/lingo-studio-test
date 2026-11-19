---
title: Get an author (v1)
description: Return an author's name, biography and published articles.
order: 2
---

# Get an author (v1)

Returns one author and the articles they have published.

`GET /api/v1/authors/{id}`

If no author has the given ID, the endpoint responds with `404 Not Found` and the message "Author not found."

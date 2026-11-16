---
title: Lister les articles (v1)
description: Renvoie les articles publiés avec leurs titres et leurs dates de publication.
order: 1
---

# Lister les articles (v1)

Ce point de terminaison d'exemple renvoie les articles publiés, du plus récent au plus ancien.

`GET /api/v1/articles`

## Paramètres de requête

| Paramètre | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `limit`   | Nombre maximal d'articles à renvoyer. La valeur par défaut est 20.     |
| `cursor`  | Position à partir de laquelle poursuivre, obtenue dans la réponse précédente. |

## Réponse

Chaque article comprend son titre, un bref résumé et sa date de publication.

{% callout type="note" %}
Cette référence est un exemple de contenu destiné aux tests de traduction. Le site ne fournit pas ce point de terminaison.
{% /callout %}

---
title: Clés JSON imbriquées
description: Comment les catalogues de messages sont répartis en dossiers et en objets imbriqués.
order: 1
---

# Clés JSON imbriquées

Les catalogues de messages situés sous `src/content/en/messages/` sont répartis par domaine de produit et imbriqués sur plusieurs niveaux de dossiers. Dans un fichier, les clés peuvent également être imbriquées dans des objets.

```json
{
  "billing": {
    "invoices": {
      "empty": "You have no invoices yet."
    }
  }
}
```

Seules les valeurs de type chaîne sont traduites. Les clés, les nombres et les booléens restent identiques dans toutes les langues.

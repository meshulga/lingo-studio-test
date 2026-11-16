---
title: Rédigez une fois en Markdoc, publiez dans toutes les langues.
description: Un exemple Next.js App Router qui affiche du contenu Markdoc et le localise avec Lingo.
badge: Nouveau – lire l'article hello-markdoc
---

{% callout type="note" %}
Ce site est rédigé en Markdoc et traduit en espagnol, en français et en allemand par Lingo. Utilisez le sélecteur de langue dans la barre supérieure pour comparer.
{% /callout %}

## Trois briques qui s'emboîtent

{% bento %}

{% bento-tile colSpan=2 %}
### Des composants riches en Markdown

Les balises personnalisées de Markdoc s'affichent comme des composants React – même interactifs.

{% bento-video label="Markdoc × Next.js · 1:24" /%}
{% /bento-tile %}

{% bento-tile colSpan=1 %}
### Démos interactives

Intégrez n'importe quel composant client dans un document.

{% bento-payment amount="$40.00" label="Essayer" /%}
{% /bento-tile %}

{% bento-tile colSpan=3 %}
### Une seule config, toutes les langues

Pointez Lingo vers vos fichiers Markdoc et JSON, lancez une commande, et chaque locale cible reste synchronisée.

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

---
title: "Bonjour, Markdoc : créer un site localisé avec Next.js et Lingo"
description: Un guide détaillé expliquant comment cet exemple de dépôt intègre Markdoc dans le routeur d'application Next.js et maintient chaque locale synchronisée avec Lingo.
date: 2026-04-21
author: Lingo team
---

{% blog-hero version="v1" /%}

## Pourquoi cet exemple existe

De nombreux tutoriels couvrent Markdoc seul ou l'i18n seul. Ce dépôt montre l'ensemble de la pile assemblée : pages Markdoc longues, chaînes d'interface JSON, routes préfixées par locale et un pipeline de traduction automatisé.

## Comment les éléments s'assemblent

{% callout type="note" %}
L'objectif est une source unique de vérité par élément de contenu, dans une seule langue, avec des traductions générées à la demande.
{% /callout %}

### Markdoc s'affiche dans App Router

Chaque route sous `src/app/[lang]/` charge un document avec `loadDoc(locale, collection, slug)` et transmet l'arbre transformé à `renderMarkdoc`. Les balises personnalisées – `callout`, `bento`, `blog-hero` et autres – sont déclarées dans `src/markdoc.schema.ts` et implémentées sous `src/components/markdoc/`.

### Les chaînes d'interface résident dans JSON

Tout ce qui apparaît dans un composant (libellés de barre de navigation, texte de CTA, états de bouton) se trouve dans `src/content/<locale>/ui.json` et est chargé par `getMessages(locale)`. TypeScript déduit la structure des messages à partir du fichier source anglais, donc les clés manquantes échouent au moment de la compilation.

### Lingo gère les traductions

`.lingo/config.json` déclare deux groupes de fichiers :

- `markdoc` – chaque `.md` sous `src/content/<locale>/pages` et `src/content/<locale>/blog`
- `json` – le catalogue de chaînes d'interface à `src/content/<locale>/ui.json`

L'exécution de `lingo push` lit les fichiers de la locale source, traduit ce qui a changé, écrit les fichiers de la locale cible et met à jour `.lingo/lock.json` avec les sommes de contrôle du contenu. Les entrées inchangées sont ignorées lors de la prochaine exécution.

### Un middleware choisit une valeur par défaut appropriée

`src/proxy.ts` inspecte l'en-tête `Accept-Language` et redirige les chemins nus comme `/` ou `/blog/hello-markdoc` vers la locale la mieux adaptée. Les locales inconnues reviennent à `en`.

## Essayez-le vous-même

1. Clonez le dépôt et exécutez `pnpm install`.
2. Authentifiez-vous une fois : `lingo login`, puis `lingo link` pour lier votre moteur.
3. Modifiez n'importe quel fichier sous `src/content/en/` – la page d'accueil, cet article de blog ou `ui.json`.
4. Exécutez `lingo push` pour régénérer les autres locales.
5. Exécutez `pnpm dev` et changez de langue depuis la barre de navigation.

C'est toute la boucle.

---

Des questions ou des commentaires ? Ouvrez un ticket sur GitHub – les contributions sont les bienvenues.

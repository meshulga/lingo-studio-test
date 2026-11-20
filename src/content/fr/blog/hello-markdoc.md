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

## Ajouter une nouvelle langue

Ajouter une langue se fait en une seule modification. `src/lib/i18n.ts` construit sa liste `locales` à partir de `.lingo/config.json`, de sorte que le routeur, la génération statique et le pipeline de traduction lisent tous la même liste :

```json
{
  "sourceLocale": "en",
  "targetLocales": ["es", "fr", "de", "ja"]
}
```

Exécutez `lingo push` après la modification. Chaque fichier source est traduit dans la nouvelle langue, et les langues existantes ne sont pas touchées. Lors de la prochaine compilation, `generateStaticParams` dans `src/app/[lang]/layout.tsx` génère un ensemble de pages par langue, y compris la nouvelle.

{% callout type="warning" %}
Choisissez les codes de langue une fois pour toutes et conservez-les. Renommer `pt` en `pt-BR` par la suite déplace chaque fichier traduit vers un nouveau dossier et modifie chaque URL contenant la langue.
{% /callout %}

## Rédiger un contenu qui se traduit bien

La traduction automatique ne vaut que ce que vaut son texte source. Quelques habitudes améliorent sensiblement le résultat :

- **Gardez des phrases courtes.** Une seule idée par phrase est plus facile à traduire et à relire.
- **Évitez les expressions idiomatiques et les jeux de mots.** « Hit the ground running » ne survit pas à un passage par l'allemand, comme on pouvait s'y attendre.
- **Mettez les commandes et les noms de fichiers entre accents graves.** Le code en ligne est copié tel quel, si bien que `lingo push` ne devient jamais un verbe en espagnol.
- **Rédigez des titres compréhensibles seuls.** « Setup » est ambigu ; « Set up your engine » donne au traducteur le contexte dont il a besoin.
- **Gardez des phrases entières dans une seule chaîne.** Les phrases assemblées à partir de fragments se brisent dans les langues dont l'ordre des mots est différent. Utilisez plutôt un espace réservé pour la partie qui change.

### Le frontmatter est aussi du contenu

Les champs `title` et `description` en haut de chaque article sont traduits en même temps que le corps du texte, car ils apparaissent dans l'index du blog et dans les résultats de recherche. Les champs qui ne figurent pas dans `translateFrontmatterFields`, comme `date` et `author`, sont copiés tels quels.

## Relire les traductions

Les traductions générées sont une première ébauche. Traitez-les comme vous traitez du code :

1. Exécutez `git diff` après `lingo push` et relisez les modifications pour chaque langue.
2. Portez une attention particulière aux titres, aux appels à l'action et à tout contenu juridique.
3. Corrigez la formulation directement dans le fichier cible et validez-la avec les modifications générées.

Comme les entrées inchangées sont ignorées, une correction reste en place jusqu'à ce que le passage anglais qu'elle traduit change.

{% callout type="danger" %}
Ne modifiez jamais le sens d'un fichier traduit de façon isolée. Si l'anglais est erroné, corrigez l'anglais et traduisez à nouveau ; sinon, les langues divergent, et personne ne s'en aperçoit avant qu'un lecteur ne le remarque.
{% /callout %}

## Pièges courants

Quelques points qui piègent souvent les utilisateurs :

- **Renommer un fichier source.** Les traductions restent derrière, sous l'ancien nom. Déplacez-les ou supprimez-les dans le même commit.
- **Casser une balise Markdoc dans une traduction.** Si une page traduite ne s'affiche pas, comparez ses balises avec la source anglaise. Les noms de balises et les attributs doivent correspondre exactement.
- **Traduire du texte à l'intérieur des composants.** Les chaînes passées en attributs de balise ne sont pas traduites, sauf si la configuration les liste, comme `translateComponentProps` liste `label` pour les tuiles bento de la page d'accueil.

## Essayez-le vous-même

1. Clonez le dépôt et exécutez `pnpm install`.
2. Authentifiez-vous une fois : `lingo login`, puis `lingo link` pour lier votre moteur.
3. Modifiez n'importe quel fichier sous `src/content/en/` – la page d'accueil, cet article de blog ou `ui.json`.
4. Exécutez `lingo push` pour régénérer les autres locales.
5. Exécutez `pnpm dev` et changez de langue depuis la barre de navigation.

C'est toute la boucle.

---

Des questions ou des commentaires ? Ouvrez un ticket sur GitHub – les contributions sont les bienvenues.

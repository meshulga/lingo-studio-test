---
title: Balises Markdoc personnalisées
description: Comment rédiger les encadrés et quelles parties d'une balise sont traduites.
order: 1
---

# Balises Markdoc personnalisées

Les balises Markdoc ajoutent une structure que le Markdown classique ne peut pas exprimer. Ce site définit une balise `callout` avec trois types.

{% callout type="note" %}
Une note apporte un contexte utile que les lecteurs peuvent ignorer.
{% /callout %}

{% callout type="warning" %}
Un avertissement décrit quelque chose qui peut mal tourner si le lecteur l'ignore.
{% /callout %}

{% callout type="danger" %}
Un encadré de danger signale une action irréversible.
{% /callout %}

Le texte à l'intérieur d'une balise est traduit. Les valeurs d'attribut telles que `type="note"` restent inchangées.

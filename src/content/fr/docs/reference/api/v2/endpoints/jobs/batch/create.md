---
title: Créer une tâche d'export par lot (v2)
description: Lancez une tâche en arrière-plan qui exporte plusieurs articles à la fois.
order: 1
---

# Créer une tâche d'export par lot (v2)

Les exports peuvent prendre plusieurs minutes. C'est pourquoi la version 2 de l'API d'exemple les exécute sous forme de tâches en arrière-plan.

`POST /api/v2/jobs/batch`

## Corps de la requête

Envoyez les identifiants des articles à exporter ainsi que le format de fichier souhaité.

## Statut de la tâche

Une nouvelle tâche démarre avec le statut **en file d'attente**, passe à **en cours d'exécution**, puis se termine avec le statut **terminée** ou **échouée**. Vérifiez le statut jusqu'à la fin de la tâche, puis téléchargez le fichier à partir du lien fourni dans la réponse.

{% callout type="warning" %}
Les liens de téléchargement expirent au bout de 24 heures. Lancez une nouvelle tâche si un lien a expiré.
{% /callout %}

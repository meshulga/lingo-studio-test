---
title: Artikel auflisten (v1)
description: Gibt veröffentlichte Artikel mit ihren Titeln und Veröffentlichungsdaten zurück.
order: 1
---

# Artikel auflisten (v1)

Dieser Beispiel-Endpunkt gibt veröffentlichte Artikel zurück, die neuesten zuerst.

`GET /api/v1/articles`

## Abfrageparameter

| Parameter | Beschreibung                                                  |
| --------- | ------------------------------------------------------------ |
| `limit`   | Maximale Anzahl der zurückzugebenden Artikel. Der Standardwert ist 20.     |
| `cursor`  | Position, ab der fortgefahren werden soll, entnommen aus der vorherigen Antwort. |

## Antwort

Jeder Artikel enthält seinen Titel, eine kurze Zusammenfassung und das Datum seiner Veröffentlichung.

{% callout type="note" %}
Diese Referenz ist Beispielinhalt für Übersetzungstests. Die Website stellt diesen Endpunkt nicht bereit.
{% /callout %}

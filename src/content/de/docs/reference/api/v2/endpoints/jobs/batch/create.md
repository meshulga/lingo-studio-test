---
title: Einen Batch-Export-Job erstellen (v2)
description: Starten Sie einen Hintergrundjob, der viele Artikel auf einmal exportiert.
order: 1
---

# Einen Batch-Export-Job erstellen (v2)

Exporte können mehrere Minuten dauern, daher führt Version 2 der Beispiel-API sie als Hintergrundjobs aus.

`POST /api/v2/jobs/batch`

## Anfragetext

Senden Sie die IDs der zu exportierenden Artikel sowie das gewünschte Dateiformat für die Rückgabe.

## Job-Status

Ein neuer Job startet mit dem Status **queued** (in der Warteschlange), wechselt zu **running** (wird ausgeführt) und endet als **completed** (abgeschlossen) oder **failed** (fehlgeschlagen). Prüfen Sie den Status, bis der Job beendet ist, und laden Sie anschließend die Datei über den Link in der Antwort herunter.

{% callout type="warning" %}
Download-Links laufen nach 24 Stunden ab. Starten Sie einen neuen Job, wenn ein Link abgelaufen ist.
{% /callout %}

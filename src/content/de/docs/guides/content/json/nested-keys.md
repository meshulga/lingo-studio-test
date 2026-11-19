---
title: Verschachtelte JSON-Schlüssel
description: Wie die Nachrichtenkataloge in Ordner und verschachtelte Objekte aufgeteilt werden.
order: 1
---

# Verschachtelte JSON-Schlüssel

Nachrichtenkataloge unter `src/content/en/messages/` sind nach Produktbereichen aufgeteilt und mehrere Ordner tief verschachtelt. Innerhalb einer Datei können Schlüssel ebenfalls in Objekten verschachtelt sein.

```json
{
  "billing": {
    "invoices": {
      "empty": "You have no invoices yet."
    }
  }
}
```

Nur String-Werte werden übersetzt. Schlüssel, Zahlen und boolesche Werte bleiben in jeder Sprache gleich.

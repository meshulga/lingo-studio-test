---
title: Nested JSON keys
description: How the message catalogs are split into folders and nested objects.
order: 1
---

# Nested JSON keys

Message catalogs under `src/content/en/messages/` are split by product area and nested several folders deep. Inside a file, keys can be nested in objects too.

```json
{
  "billing": {
    "invoices": {
      "empty": "You have no invoices yet."
    }
  }
}
```

Only string values are translated. Keys, numbers and booleans stay the same in every language.

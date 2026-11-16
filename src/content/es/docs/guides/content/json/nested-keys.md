---
title: Claves JSON anidadas
description: Cómo se dividen los catálogos de mensajes en carpetas y objetos anidados.
order: 1
---

# Claves JSON anidadas

Los catálogos de mensajes de `src/content/en/messages/` se dividen por área de producto y se anidan en varias carpetas de profundidad. Dentro de un archivo, las claves también pueden estar anidadas en objetos.

```json
{
  "billing": {
    "invoices": {
      "empty": "You have no invoices yet."
    }
  }
}
```

Solo se traducen los valores de cadena. Las claves, los números y los booleanos permanecen iguales en todos los idiomas.

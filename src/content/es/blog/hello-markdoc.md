---
title: "Hola, Markdoc: construyendo un sitio localizado con Next.js y Lingo"
description: Un recorrido sobre cómo este repositorio de ejemplo integra Markdoc en el App Router de Next.js y mantiene cada idioma sincronizado con Lingo.
date: 2026-04-21
author: Lingo team
---

{% blog-hero version="v1" /%}

## Por qué existe este ejemploывы

Muchos tutoriales cubren Markdoc por sí solo, o i18n por sí solo. Este repositorio muestra toda la arquitectura integrada: páginas extensas en Markdoc, cadenas de interfaz en JSON, rutas con prefijo de idioma y un pipeline de traducción automatizado.

## Cómo encajan las piezas

{% callout type="note" %}
El objetivo es tener una única fuente de verdad por cada pieza de contenido, en un solo idioma, con traducciones generadas bajo demanda.
{% /callout %}

### Markdoc se renderiza en App Router

Cada ruta bajo `src/app/[lang]/` carga un documento con `loadDoc(locale, collection, slug)` y pasa el árbol transformado a `renderMarkdoc`. Las etiquetas personalizadas – `callout`, `bento`, `blog-hero` y similares – se declaran en `src/markdoc.schema.ts` e implementan bajo `src/components/markdoc/`.

### Las cadenas de interfaz viven en JSON

Todo lo que aparece en un componente (etiquetas de la barra de navegación, textos de CTA, estados de botones) vive en `src/content/<locale>/ui.json` y se carga mediante `getMessages(locale)`. TypeScript infiere la estructura de los mensajes desde el archivo fuente en inglés, por lo que las claves faltantes fallan en tiempo de compilación.

### Lingo gestiona las traducciones

`.lingo/config.json` declara dos grupos de archivos:

- `markdoc` – cada `.md` bajo `src/content/<locale>/pages` y `src/content/<locale>/blog`
- `json` – el catálogo de cadenas de interfaz en `src/content/<locale>/ui.json`

Al ejecutar `lingo push` se leen los archivos del idioma de origen, se traduce lo que ha cambiado, se escriben los archivos del idioma de destino y se actualiza `.lingo/lock.json` con checksums del contenido. Las entradas sin cambios se omiten en la siguiente ejecución.

### Un middleware elige un valor predeterminado sensato

`src/proxy.ts` inspecciona el encabezado `Accept-Language` y redirige rutas simples como `/` o `/blog/hello-markdoc` al idioma que mejor coincida. Los idiomas desconocidos vuelven a `en`.

## Pruébalo tú mismo

1. Clona el repositorio y ejecuta `pnpm install`.
2. Autentica una vez: `lingo login`, luego `lingo link` para vincular tu motor.
3. Edita cualquier archivo bajo `src/content/en/` – la página de inicio, esta entrada de blog o `ui.json`.
4. Ejecuta `lingo push` para regenerar los demás idiomas.
5. Ejecuta `pnpm dev` y cambia de idioma desde la barra de navegación.

Ese es todo el ciclo.

---

¿Preguntas o comentarios? Abre un issue en GitHub – las contribuciones son bienvenidas.

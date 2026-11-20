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

## Añadir un nuevo idioma

Añadir un idioma es una sola edición. `src/lib/i18n.ts` construye su lista de `locales` a partir de `.lingo/config.json`, de modo que el enrutador, la generación estática y el flujo de traducción leen la misma lista:

```json
{
  "sourceLocale": "en",
  "targetLocales": ["es", "fr", "de", "ja"]
}
```

Ejecuta `lingo push` después del cambio. Cada archivo fuente se traduce al nuevo idioma y los idiomas existentes no se tocan. En la siguiente compilación, `generateStaticParams` en `src/app/[lang]/layout.tsx` genera un conjunto de páginas por idioma, incluido el nuevo.

{% callout type="warning" %}
Elige los códigos de idioma una sola vez y mantenlos. Cambiar el nombre de `pt` a `pt-BR` más adelante mueve todos los archivos traducidos a una carpeta nueva y modifica todas las URL que contienen el código de idioma.
{% /callout %}

## Cómo escribir contenido que se traduzca bien

La traducción automática es tan buena como su texto de origen. Unos cuantos hábitos mejoran notablemente el resultado:

- **Mantén las frases cortas.** Una idea por frase es más fácil de traducir y de revisar.
- **Evita los modismos y los juegos de palabras.** "Hit the ground running" sale de un viaje por el alemán tan bien como cabría esperar.
- **Pon los comandos y los nombres de archivo entre acentos graves.** El código en línea se copia tal cual, así que `lingo push` nunca se convierte en un verbo en español.
- **Escribe encabezados que se entiendan por sí solos.** "Setup" es ambiguo; "Set up your engine" da al traductor el contexto que necesita.
- **Mantén las frases completas en una sola cadena.** Las frases construidas uniendo fragmentos fallan en idiomas con un orden de palabras distinto. Usa un marcador de posición para la parte que cambia.

### El frontmatter también es contenido

Los campos `title` y `description` que aparecen al inicio de cada entrada se traducen junto con el cuerpo, porque aparecen en el índice del blog y en los resultados de búsqueda. Los campos que no figuran en `translateFrontmatterFields`, como `date` y `author`, se copian sin cambios.

## Revisión de las traducciones

Las traducciones generadas son un primer borrador. Trátalas como tratas el código:

1. Ejecuta `git diff` después de `lingo push` y lee los cambios de cada idioma.
2. Presta especial atención a los encabezados, las llamadas a la acción y todo lo que tenga carácter legal.
3. Corrige la redacción directamente en el archivo de destino y súbela con un commit junto con los cambios generados.

Como las entradas sin cambios se omiten, una corrección se mantiene hasta que cambie el pasaje en inglés que traduce.

{% callout type="danger" %}
Nunca cambies por tu cuenta el significado de un archivo traducido. Si el inglés es incorrecto, corrige el inglés y vuelve a traducir; de lo contrario, los idiomas se van desalineando y nadie se da cuenta hasta que lo hace un lector.
{% /callout %}

## Errores comunes

Algunas cosas en las que suele tropezar la gente:

- **Cambiar el nombre de un archivo fuente.** Las traducciones se quedan con el nombre antiguo. Muévelas o elimínalas en el mismo commit.
- **Romper una etiqueta de Markdoc en una traducción.** Si una página traducida no se renderiza, compara sus etiquetas con el original en inglés. Los nombres y atributos de las etiquetas deben coincidir exactamente.
- **Traducir texto dentro de componentes.** Las cadenas pasadas como atributos de etiqueta no se traducen a menos que la configuración las indique, como hace `translateComponentProps` con `label` para los bloques bento de la página de inicio.

## Pruébalo tú mismo

1. Clona el repositorio y ejecuta `pnpm install`.
2. Autentica una vez: `lingo login`, luego `lingo link` para vincular tu motor.
3. Edita cualquier archivo bajo `src/content/en/` – la página de inicio, esta entrada de blog o `ui.json`.
4. Ejecuta `lingo push` para regenerar los demás idiomas.
5. Ejecuta `pnpm dev` y cambia de idioma desde la barra de navegación.

Ese es todo el ciclo.

---

¿Preguntas o comentarios? Abre un issue en GitHub – las contribuciones son bienvenidas.

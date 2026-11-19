---
title: Crear un trabajo de exportación por lotes (v2)
description: Inicia un trabajo en segundo plano que exporta muchos artículos a la vez.
order: 1
---

# Crear un trabajo de exportación por lotes (v2)

Las exportaciones pueden tardar varios minutos, por lo que la versión 2 de la API de ejemplo las ejecuta como trabajos en segundo plano.

`POST /api/v2/jobs/batch`

## Cuerpo de la solicitud

Envía los ID de los artículos que quieres exportar y el formato de archivo que deseas recibir.

## Estado del trabajo

Un trabajo nuevo comienza como **en cola**, pasa a **en ejecución** y termina como **completado** o **fallido**. Consulta el estado hasta que el trabajo finalice y, después, descarga el archivo desde el enlace que aparece en la respuesta.

{% callout type="warning" %}
Los enlaces de descarga caducan después de 24 horas. Inicia un nuevo trabajo si un enlace ha caducado.
{% /callout %}

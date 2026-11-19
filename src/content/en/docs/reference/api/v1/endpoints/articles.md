---
title: List articles (v1)
description: Return published articles with their titles and publication dates.
order: 1
---

# List articles (v1)

This sample endpoint returns published articles, newest first.

`GET /api/v1/articles`

## Query parameters

| Parameter | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `limit`   | Maximum number of articles to return. The default is 20.     |
| `cursor`  | Position to continue from, taken from the previous response. |

## Response

Each article includes its title, a short summary and the date it was published.

{% callout type="note" %}
This reference is sample content for translation tests. The site does not serve this endpoint.
{% /callout %}

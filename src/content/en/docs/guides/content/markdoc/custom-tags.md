---
title: Custom Markdoc tags
description: How callouts are written and which parts of a tag are translated.
order: 1
---

# Custom Markdoc tags

Markdoc tags add structure that plain Markdown cannot express. This site defines a `callout` tag with three types.

{% callout type="note" %}
A note adds helpful context that readers can skip.
{% /callout %}

{% callout type="warning" %}
A warning describes something that can go wrong if the reader ignores it.
{% /callout %}

{% callout type="danger" %}
A danger callout marks an action that cannot be undone.
{% /callout %}

The text inside a tag is translated. Attribute values such as `type="note"` stay as they are.

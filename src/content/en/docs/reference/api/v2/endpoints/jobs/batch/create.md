---
title: Create a batch export job (v2)
description: Start a background job that exports many articles at once.
order: 1
---

# Create a batch export job (v2)

Exports can take several minutes, so version 2 of the sample API runs them as background jobs.

`POST /api/v2/jobs/batch`

## Request body

Send the IDs of the articles to export and the file format you want back.

## Job status

A new job starts as **queued**, moves to **running**, and finishes as **completed** or **failed**. Check the status until the job finishes, then download the file from the link in the response.

{% callout type="warning" %}
Download links expire after 24 hours. Start a new job if a link has expired.
{% /callout %}

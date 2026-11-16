---
title: "Hallo, Markdoc: Eine lokalisierte Website mit Next.js und Lingo erstellen"
description: Eine Anleitung, wie dieses Beispiel-Repository Markdoc in den Next.js App Router integriert und alle Sprachen mit Lingo synchron hält.
date: 2026-04-21
author: Lingo team
---

{% blog-hero version="v1" /%}

## Warum dieses Beispiel existiert

Es gibt viele Tutorials, die Markdoc allein oder i18n allein behandeln. Dieses Repository zeigt den gesamten Stack zusammen verdrahtet: ausführliche Markdoc-Seiten, JSON-UI-Strings, Routen mit Sprachpräfixen und eine automatisierte Übersetzungspipeline.

## Wie die Teile zusammenpassen

{% callout type="note" %}
Das Ziel ist eine einzige Quelle der Wahrheit pro Inhaltselement, in einer einzigen Sprache, wobei Übersetzungen bei Bedarf generiert werden.
{% /callout %}

### Markdoc rendert im App Router

Jede Route unter `src/app/[lang]/` lädt ein Dokument mit `loadDoc(locale, collection, slug)` und übergibt den transformierten Baum an `renderMarkdoc`. Benutzerdefinierte Tags – `callout`, `bento`, `blog-hero` und weitere – werden in `src/markdoc.schema.ts` deklariert und unter `src/components/markdoc/` implementiert.

### UI-Strings leben in JSON

Alles, was in einer Komponente angezeigt wird (Navigationsleisten-Labels, CTA-Texte, Button-Zustände), befindet sich in `src/content/<locale>/ui.json` und wird von `getMessages(locale)` geladen. TypeScript leitet die Nachrichtenstruktur aus der englischen Quelldatei ab, sodass fehlende Schlüssel zur Build-Zeit fehlschlagen.

### Lingo verwaltet die Übersetzungen

`.lingo/config.json` deklariert zwei Dateigruppen:

- `markdoc` – jede `.md`-Datei unter `src/content/<locale>/pages` und `src/content/<locale>/blog`
- `json` – der UI-String-Katalog unter `src/content/<locale>/ui.json`

Das Ausführen von `lingo push` liest die Quelldateien der Ausgangssprache, übersetzt alles, was sich geändert hat, schreibt die Zieldateien der Zielsprache und aktualisiert `.lingo/lock.json` mit Inhaltsprüfsummen. Unveränderte Einträge werden beim nächsten Durchlauf übersprungen.

### Eine Middleware wählt eine sinnvolle Standardeinstellung

`src/proxy.ts` prüft den `Accept-Language`-Header und leitet nackte Pfade wie `/` oder `/blog/hello-markdoc` zur am besten passenden Sprache um. Unbekannte Sprachen fallen auf `en` zurück.

## Probieren Sie es selbst aus

1. Klonen Sie das Repository und führen Sie `pnpm install` aus.
2. Authentifizieren Sie sich einmalig: `lingo login`, dann `lingo link`, um Ihre Engine zu binden.
3. Bearbeiten Sie eine beliebige Datei unter `src/content/en/` – die Startseite, diesen Blogbeitrag oder `ui.json`.
4. Führen Sie `lingo push` aus, um die anderen Sprachen neu zu generieren.
5. Führen Sie `pnpm dev` aus und wechseln Sie die Sprache über die Navigationsleiste.

Das ist der gesamte Ablauf.

---

Fragen oder Feedback? Öffnen Sie ein Issue auf GitHub – Beiträge sind willkommen.

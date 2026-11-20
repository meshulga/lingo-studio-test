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

## Eine neue Locale hinzufügen

Eine Sprache hinzuzufügen ist nur eine einzige Änderung. `src/lib/i18n.ts` erstellt seine `locales`-Liste aus `.lingo/config.json`, sodass Router, statische Generierung und Übersetzungspipeline alle dieselbe Liste lesen:

```json
{
  "sourceLocale": "en",
  "targetLocales": ["es", "fr", "de", "ja"]
}
```

Führe nach der Änderung `lingo push` aus. Jede Quelldatei wird in die neue Locale übersetzt, die bestehenden Locales bleiben unberührt. Beim nächsten Build erzeugt `generateStaticParams` in `src/app/[lang]/layout.tsx` pro Sprache einen Satz Seiten, einschließlich der neuen.

{% callout type="warning" %}
Wähle Locale-Codes einmal und behalte sie bei. Wenn du `pt` später in `pt-BR` umbenennst, wird jede übersetzte Datei in einen neuen Ordner verschoben, und jede URL, die die Locale enthält, ändert sich.
{% /callout %}

## Inhalte schreiben, die sich gut übersetzen lassen

Maschinelle Übersetzung ist nur so gut wie ihr Ausgangstext. Ein paar Gewohnheiten verbessern das Ergebnis spürbar:

- **Halte Sätze kurz.** Ein Gedanke pro Satz lässt sich leichter übersetzen und leichter prüfen.
- **Vermeide Redewendungen und Wortspiele.** „Hit the ground running“ übersteht eine Reise durch das Deutsche ungefähr so gut, wie man es erwarten würde.
- **Setze Befehle und Dateinamen in Backticks.** Inline-Code wird unverändert übernommen, sodass aus `lingo push` im Spanischen nie ein Verb wird.
- **Schreibe Überschriften, die für sich stehen.** „Setup“ ist mehrdeutig; „Richte deine Engine ein“ gibt dem Übersetzer den nötigen Kontext.
- **Belasse ganze Sätze in einem String.** Aus Fragmenten zusammengesetzte Sätze funktionieren in Sprachen mit anderer Wortstellung nicht. Verwende stattdessen einen Platzhalter für den veränderlichen Teil.

### Frontmatter ist auch Inhalt

Die Felder `title` und `description` am Anfang jedes Beitrags werden zusammen mit dem Haupttext übersetzt, da sie im Blog-Index und in den Suchergebnissen erscheinen. Felder, die nicht in `translateFrontmatterFields` aufgeführt sind, wie `date` und `author`, werden unverändert kopiert.

## Übersetzungen prüfen

Generierte Übersetzungen sind ein erster Entwurf. Behandle sie so, wie du Code behandelst:

1. Führe `git diff` nach `lingo push` aus und lies die Änderungen für jede Locale.
2. Achte besonders auf Überschriften, Handlungsaufforderungen und alles Rechtliche.
3. Korrigiere Formulierungen direkt in der Zieldatei und committe sie zusammen mit den generierten Änderungen.

Da unveränderte Einträge übersprungen werden, bleibt eine Korrektur bestehen, bis sich die englische Passage ändert, die sie übersetzt.

{% callout type="danger" %}
Ändere niemals die Bedeutung einer übersetzten Datei isoliert. Wenn das Englische falsch ist, korrigiere das Englische und übersetze erneut; andernfalls driften die Locales auseinander, und niemand bemerkt es, bis es ein Leser tut.
{% /callout %}

## Häufige Fallstricke

Ein paar Dinge, über die man leicht stolpert:

- **Eine Quelldatei umbenennen.** Die Übersetzungen bleiben unter dem alten Namen zurück. Verschiebe oder lösche sie im selben Commit.
- **Ein Markdoc-Tag in einer Übersetzung beschädigen.** Wenn eine übersetzte Seite nicht gerendert wird, vergleiche ihre Tags mit der englischen Quelle. Tag-Namen und Attribute müssen exakt übereinstimmen.
- **Text innerhalb von Komponenten übersetzen.** Strings, die als Tag-Attribute übergeben werden, werden nicht übersetzt, es sei denn, die Konfiguration listet sie auf – so wie `translateComponentProps` den Eintrag `label` für die Bento-Kacheln auf der Startseite aufführt.

## Probieren Sie es selbst aus

1. Klonen Sie das Repository und führen Sie `pnpm install` aus.
2. Authentifizieren Sie sich einmalig: `lingo login`, dann `lingo link`, um Ihre Engine zu binden.
3. Bearbeiten Sie eine beliebige Datei unter `src/content/en/` – die Startseite, diesen Blogbeitrag oder `ui.json`.
4. Führen Sie `lingo push` aus, um die anderen Sprachen neu zu generieren.
5. Führen Sie `pnpm dev` aus und wechseln Sie die Sprache über die Navigationsleiste.

Das ist der gesamte Ablauf.

---

Fragen oder Feedback? Öffnen Sie ein Issue auf GitHub – Beiträge sind willkommen.

import fs from "node:fs/promises";
import path from "node:path";
import Markdoc, { type RenderableTreeNode } from "@markdoc/markdoc";
import { schema } from "@/markdoc.schema";
import { resolveBucketDir, type Locale } from "./i18n";

export type DocFrontmatter = {
  title?: string;
  description?: string;
  badge?: string;
  date?: string;
  author?: string;
};

export type Collection = "pages" | "blog";

export type LoadedDoc = {
  slug: string;
  locale: Locale;
  collection: Collection;
  frontmatter: DocFrontmatter;
  content: RenderableTreeNode;
};

function collectionDir(locale: Locale, collection: Collection): string {
  return resolveBucketDir("markdoc", locale, collection);
}

async function readDoc(
  locale: Locale,
  collection: Collection,
  slug: string,
): Promise<string | null> {
  try {
    return await fs.readFile(
      path.join(collectionDir(locale, collection), `${slug}.md`),
      "utf8",
    );
  } catch {
    return null;
  }
}

export async function loadDoc(
  locale: Locale,
  collection: Collection,
  slug: string,
): Promise<LoadedDoc | null> {
  const raw = await readDoc(locale, collection, slug);
  if (raw === null) return null;

  const ast = Markdoc.parse(raw);
  const frontmatter = (ast.attributes.frontmatter
    ? parseFrontmatter(ast.attributes.frontmatter)
    : {}) as DocFrontmatter;

  const content = Markdoc.transform(ast, {
    ...schema,
    variables: { ...schema.variables, frontmatter },
  });

  return { slug, locale, collection, frontmatter, content };
}

export async function listDocSlugs(
  locale: Locale,
  collection: Collection,
): Promise<string[]> {
  try {
    const entries = await fs.readdir(collectionDir(locale, collection));
    return entries
      .filter((name) => name.endsWith(".md"))
      .map((name) => name.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

function parseFrontmatter(source: string): Record<string, unknown> {
  const result: Record<string, string> = {};
  let currentKey: string | null = null;
  for (const rawLine of source.split("\n")) {
    const line = rawLine.replace(/\s+$/, "");
    if (line === "") continue;
    const keyed = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (keyed && !/^\s/.test(rawLine)) {
      const [, key, value] = keyed;
      result[key] = value;
      currentKey = key;
      continue;
    }
    if (currentKey && /^\s/.test(rawLine)) {
      const cont = line.trim();
      if (!cont) continue;
      result[currentKey] = result[currentKey]
        ? `${result[currentKey]} ${cont}`
        : cont;
    }
  }
  for (const key of Object.keys(result)) {
    result[key] = unquote(result[key]);
  }
  return result;
}

function unquote(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length >= 2) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'") && trimmed.length >= 2)
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

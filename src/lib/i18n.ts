import path from "node:path";
import lingoConfig from "../../.lingo/config.json";

export { lingoConfig };

export const defaultLocale = lingoConfig.sourceLocale;
export const locales = [
  lingoConfig.sourceLocale,
  ...lingoConfig.targetLocales,
] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Source-locale glob patterns for a given file format (e.g. "markdoc", "json"). */
export function bucketPatterns(format: string): string[] {
  return lingoConfig.files
    .filter((file) => file.format === format)
    .map((file) => file.pattern);
}

/**
 * Resolve the on-disk directory for a format + locale. Config patterns point at
 * the source locale (`src/content/en/pages/*.md`); we strip the glob tail and
 * swap the `/en/` segment for the requested locale — the same rewrite the CLI's
 * `deriveTargetPath` performs.
 */
export function resolveBucketDir(
  format: string,
  locale: string,
  subpath: string = "",
): string {
  const patterns = bucketPatterns(format);
  const matched =
    (subpath && patterns.find((p) => p.includes(`/${subpath}/`))) ||
    patterns[0];
  const dir = matched
    // strip the trailing glob (e.g. "/*.md" or "/**/*.md")
    .replace(/\/(\*\*\/)?\*[^/]*$/, "")
    // config patterns are source-locale-based with exactly one `/<sourceLocale>/`
    // segment, so rewriting the first occurrence swaps the locale dir safely
    .replace(`/${defaultLocale}/`, `/${locale}/`);
  return path.join(process.cwd(), dir);
}

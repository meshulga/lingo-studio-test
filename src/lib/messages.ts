import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { defaultLocale, type Locale } from "./i18n";
import enMessages from "../content/en/ui.json";

export type Messages = typeof enMessages;

export const getMessages = cache(async (locale: Locale): Promise<Messages> => {
  if (locale === defaultLocale) return enMessages;
  try {
    const raw = await fs.readFile(
      path.join(process.cwd(), "src/content", locale, "ui.json"),
      "utf8",
    );
    return JSON.parse(raw) as Messages;
  } catch {
    return enMessages;
  }
});

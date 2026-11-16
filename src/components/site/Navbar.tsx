import Link from "next/link";
import { getMessages } from "@/lib/messages";
import type { Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavbarProps = {
  lang: Locale;
};

export async function Navbar({ lang }: NavbarProps) {
  const { nav } = await getMessages(lang);

  return (
    <header className="w-full">
      <nav
        aria-label="Primary"
        className="flex h-16 items-center justify-between px-2 md:px-4"
      >
        <div className="flex items-center gap-3">
          <Link
            href={`/${lang}`}
            className="font-heading text-2xl font-semibold tracking-tight text-foreground"
          >
            Markdoc × Lingo
          </Link>
          <LanguageSwitcher lang={lang} />
        </div>

        <Link
          href={`/${lang}/blog`}
          className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
        >
          {nav.blog}
        </Link>
      </nav>
    </header>
  );
}

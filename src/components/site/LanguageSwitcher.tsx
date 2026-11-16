"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LOCALE_META: Record<Locale, { native: string; english: string }> = {
  en: { native: "English", english: "English" },
  es: { native: "Español", english: "Spanish" },
  fr: { native: "Français", english: "French" },
  de: { native: "Deutsch", english: "German" },
};

function swapLocale(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/");
  if (segments.length >= 2) segments[1] = nextLocale;
  return segments.join("/") || `/${nextLocale}`;
}

export function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const select = (next: Locale) => {
    if (next === lang) return;
    startTransition(() => {
      router.push(swapLocale(pathname ?? `/${lang}`, next));
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Change language"
        className={cn(
          "inline-flex h-8 items-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-2.5 text-xs font-medium text-foreground/80 shadow-xs transition-colors",
          "hover:border-border hover:bg-muted hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
          "data-[state=open]:border-border data-[state=open]:bg-muted data-[state=open]:text-foreground",
          isPending && "opacity-70",
        )}
      >
        <Globe className="size-3.5 opacity-70" aria-hidden />
        <span className="tabular-nums uppercase tracking-wide">{lang}</span>
        <ChevronDown
          className="size-3 opacity-50 transition-transform duration-200 data-[state=open]:rotate-180"
          aria-hidden
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={8} className="min-w-44">
        <DropdownMenuLabel className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locales.map((code) => {
          const meta = LOCALE_META[code];
          const active = code === lang;
          return (
            <DropdownMenuItem
              key={code}
              onSelect={() => select(code)}
              className="gap-3 pr-2"
            >
              <span className="flex flex-1 flex-col">
                <span className="font-medium text-foreground">
                  {meta.native}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {meta.english}
                </span>
              </span>
              <span className="ml-auto flex items-center gap-2">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {code}
                </span>
                <Check
                  className={cn(
                    "size-3.5 text-foreground transition-opacity",
                    active ? "opacity-100" : "opacity-0",
                  )}
                  aria-hidden
                />
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

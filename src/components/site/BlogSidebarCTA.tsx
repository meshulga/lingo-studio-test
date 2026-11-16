import { getMessages } from "@/lib/messages";
import type { Locale } from "@/lib/i18n";

export async function BlogSidebarCTA({ lang }: { lang: Locale }) {
  const { blogSidebar } = await getMessages(lang);

  return (
    <aside className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-foreground font-heading text-sm font-semibold text-background">
        MD
      </div>
      <h3 className="font-heading text-lg font-semibold text-foreground">
        {blogSidebar.heading}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {blogSidebar.body}
      </p>
    </aside>
  );
}

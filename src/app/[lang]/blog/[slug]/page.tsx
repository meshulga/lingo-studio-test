import { notFound, redirect } from "next/navigation";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";
import { listDocSlugs, loadDoc, type DocFrontmatter } from "@/lib/markdoc";
import { getMessages, type Messages } from "@/lib/messages";
import { renderMarkdoc } from "@/markdoc.schema";
import { BlogSidebarCTA } from "@/components/site/BlogSidebarCTA";

export async function generateStaticParams() {
  const entries = await Promise.all(
    locales.map(async (lang) => {
      const slugs = await listDocSlugs(lang, "blog");
      return slugs.map((slug) => ({ lang, slug }));
    }),
  );
  return entries.flat();
}

export async function generateMetadata(
  props: PageProps<"/[lang]/blog/[slug]">,
) {
  const { lang, slug } = await props.params;
  if (!isLocale(lang)) return {};
  const doc = await loadDoc(lang, "blog", slug);
  if (!doc) return {};
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
  };
}

export default async function BlogPost(
  props: PageProps<"/[lang]/blog/[slug]">,
) {
  const { lang, slug } = await props.params;
  if (!isLocale(lang)) notFound();

  const doc = await loadDoc(lang, "blog", slug);
  if (!doc) {
    if (lang === defaultLocale) notFound();
    const fallback = await loadDoc(defaultLocale, "blog", slug);
    if (!fallback) notFound();
    redirect(`/${defaultLocale}/blog/${slug}`);
  }

  const messages = await getMessages(lang);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 md:py-20">
      <div className="max-w-3xl">
        <ArticleHeader
          frontmatter={doc.frontmatter}
          messages={messages.blog}
          locale={lang}
        />
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_300px] md:gap-12">
        <div className="min-w-0">
          <ArticleBody>{renderMarkdoc(doc.content)}</ArticleBody>
        </div>
        <div className="md:col-start-2 md:row-start-1">
          <div className="md:sticky md:top-8">
            <BlogSidebarCTA lang={lang} />
          </div>
        </div>
      </div>
    </main>
  );
}

function ArticleHeader({
  frontmatter,
  messages,
  locale,
}: {
  frontmatter: DocFrontmatter;
  messages: Messages["blog"];
  locale: string;
}) {
  const { title, description, author, date } = frontmatter;
  const formattedDate = date ? formatDate(date, locale) : null;

  return (
    <header className="flex flex-col gap-6">
      <MetaRow
        author={author}
        authorPrefix={messages.metaAuthorPrefix}
        category={messages.metaCategoryUpdates}
        date={formattedDate}
      />

      <h1 className="font-heading text-4xl font-semibold leading-[1.1] text-foreground md:text-5xl">
        {title}
      </h1>

      {description ? (
        <p className="text-lg leading-7 text-muted-foreground">{description}</p>
      ) : null}
    </header>
  );
}

function MetaRow({
  author,
  authorPrefix,
  category,
  date,
}: {
  author?: string;
  authorPrefix: string;
  category?: string;
  date?: string | null;
}) {
  const items = [
    author ? (
      <span key="author" className="flex items-center gap-2">
        <span className="text-muted-foreground">{authorPrefix}</span>
        <span
          aria-hidden
          className="inline-block h-5 w-5 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500"
        />
        <span className="font-medium text-foreground">{author}</span>
      </span>
    ) : null,
    category ? (
      <span key="category" className="text-muted-foreground">
        {category}
      </span>
    ) : null,
    date ? (
      <span key="date" className="text-muted-foreground">
        {date}
      </span>
    ) : null,
  ].filter(Boolean);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-3">
          {item}
          {i < items.length - 1 ? (
            <span aria-hidden className="text-muted-foreground">
              •
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

function ArticleBody({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={[
        "mt-10 text-base leading-7 text-foreground",
        "[&>*+*]:mt-5",
        "[&_p]:text-foreground/85",
        "[&_h2]:font-heading [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground",
        "[&_h3]:font-heading [&_h3]:mt-10 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground",
        "[&_ul]:ml-5 [&_ul]:list-disc [&_ul_li]:mt-2",
        "[&_ol]:ml-5 [&_ol]:list-decimal [&_ol_li]:mt-2",
        "[&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:opacity-70",
        "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.9em]",
        "[&_pre]:mt-6 [&_pre]:rounded-xl [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-6 [&_pre]:overflow-x-auto",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
        "[&_hr]:my-12 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-border",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

const DATE_LOCALE: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
};

function formatDate(iso: string, locale: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.valueOf())) return iso;
  return d.toLocaleDateString(DATE_LOCALE[locale] ?? "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

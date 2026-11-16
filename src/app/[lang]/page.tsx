import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { defaultLocale, isLocale } from "@/lib/i18n";
import { loadDoc } from "@/lib/markdoc";
import { getMessages } from "@/lib/messages";
import { renderMarkdoc } from "@/markdoc.schema";
import { BentoMessagesProvider } from "@/components/markdoc/BentoMessages";

export async function generateMetadata(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};
  const doc = await loadDoc(lang, "pages", "home");
  if (!doc) return {};
  return {
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
  };
}

export default async function Home(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();

  const doc = await loadDoc(lang, "pages", "home");
  if (!doc) {
    if (lang === defaultLocale) notFound();
    redirect(`/${defaultLocale}`);
  }

  const { title, description, badge } = doc.frontmatter;
  const { home } = await getMessages(lang);

  return (
    <>
    <main className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-6 py-16 text-center md:py-24">
      {badge ? (
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {badge}
          <span aria-hidden className="text-sm leading-none">›</span>
        </Link>
      ) : null}

      <h1 className="font-heading text-5xl font-normal leading-[1.05] text-foreground md:text-[64px] md:leading-[1.1]">
        {title}
      </h1>

      {description ? (
        <p className="max-w-xl text-lg leading-7 text-muted-foreground">
          {description}
        </p>
      ) : null}
    </main>

    <section
      className={[
        "mx-auto w-full max-w-6xl px-6 pb-20 md:pb-28",
        "[&_h2]:font-heading [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:md:text-4xl",
      ].join(" ")}
    >
      <BentoMessagesProvider messages={home.bento}>
        {renderMarkdoc(doc.content)}
      </BentoMessagesProvider>
    </section>
    </>
  );
}

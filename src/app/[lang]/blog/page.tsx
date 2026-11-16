import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";

const FEATURED_SLUG = "hello-markdoc";

export default async function BlogIndex(props: PageProps<"/[lang]/blog">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();
  redirect(`/${lang}/blog/${FEATURED_SLUG}`);
}

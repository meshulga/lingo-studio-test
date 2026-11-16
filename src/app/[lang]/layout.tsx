import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "../globals.css";
import { isLocale, locales } from "@/lib/i18n";
import { Navbar } from "@/components/site/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Markdoc + Next.js + Lingo",
  description:
    "An example Next.js App Router app that authors content in Markdoc and localizes it with Lingo.",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout(props: LayoutProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f4f4f4]">
        <div className="mx-4 flex min-h-screen flex-col border-x border-zinc-300/70 md:mx-6">
          <div className="border-b border-zinc-300/70 px-4 md:px-6">
            <Navbar lang={lang} />
          </div>
          <div className="flex flex-1 flex-col p-4 md:p-6">
            <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-background md:rounded-3xl">
              {props.children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

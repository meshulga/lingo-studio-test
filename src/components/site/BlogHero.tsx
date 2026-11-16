type BlogHeroProps = {
  brand?: string;
  version?: string;
};

export function BlogHero({ brand = "Markdoc", version }: BlogHeroProps) {
  return (
    <div className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-zinc-50 via-white to-zinc-100">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 [background-image:linear-gradient(theme(colors.zinc.200/0.5)_1px,transparent_1px),linear-gradient(90deg,theme(colors.zinc.200/0.5)_1px,transparent_1px)] [background-size:48px_48px]"
      />
      <div className="relative flex items-center gap-4">
        <span className="font-heading text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
          {brand}
        </span>
        {version ? (
          <span className="inline-flex h-10 items-center rounded-xl bg-foreground px-3 font-heading text-base font-semibold text-background md:h-14 md:px-4 md:text-2xl">
            {version}
          </span>
        ) : null}
      </div>
    </div>
  );
}

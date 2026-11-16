import { BlogHero as SiteBlogHero } from "@/components/site/BlogHero";

export function BlogHero({
  brand,
  version,
}: {
  brand?: string;
  version?: string;
}) {
  return (
    <div className="my-6 first:mt-0">
      <SiteBlogHero brand={brand} version={version} />
    </div>
  );
}

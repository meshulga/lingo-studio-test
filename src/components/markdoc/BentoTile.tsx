import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const COL_CLASSES: Record<number, string> = {
  1: "sm:col-span-1",
  2: "sm:col-span-2",
  3: "sm:col-span-3",
};

const ROW_CLASSES: Record<number, string> = {
  1: "row-span-1",
  2: "sm:row-span-2",
};

type Props = {
  colSpan?: number;
  rowSpan?: number;
  children?: ReactNode;
};

export function BentoTile({ colSpan = 1, rowSpan = 1, children }: Props) {
  const cols = COL_CLASSES[colSpan] ?? COL_CLASSES[1];
  const rows = ROW_CLASSES[rowSpan] ?? ROW_CLASSES[1];

  return (
    <article
      className={cn(
        "flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 md:p-6",
        "[&>h3]:font-heading [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-foreground md:[&>h3]:text-xl",
        "[&>h3+p]:-mt-4 [&>p]:text-sm [&>p]:text-muted-foreground",
        cols,
        rows,
      )}
    >
      {children}
    </article>
  );
}

import type { ReactNode } from "react";

const styles = {
  note: "border-zinc-200 bg-zinc-50 text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100",
  warning:
    "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100",
  danger:
    "border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100",
} as const;

type CalloutType = keyof typeof styles;

export function Callout({
  type = "note",
  children,
}: {
  type?: CalloutType;
  children?: ReactNode;
}) {
  return (
    <aside
      className={`my-4 rounded-md border px-4 py-3 text-sm ${styles[type]}`}
    >
      {children}
    </aside>
  );
}

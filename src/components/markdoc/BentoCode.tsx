import type { ReactNode } from "react";

export function BentoCode({
  language,
  children,
}: {
  language?: string;
  children?: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-100">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        </div>
        {language && (
          <span className="font-mono text-xs uppercase tracking-wide text-zinc-500">
            {language}
          </span>
        )}
      </div>
      <div className="overflow-x-auto [&_code]:bg-transparent [&_code]:font-mono [&_code]:text-sm [&_code]:leading-relaxed [&_code]:text-zinc-100 [&_pre]:bg-transparent [&_pre]:p-4">
        {children}
      </div>
    </div>
  );
}

"use client";

import { Play } from "lucide-react";
import { useBentoMessages } from "./BentoMessages";

export function BentoVideo({ label }: { label?: string }) {
  const messages = useBentoMessages();
  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700">
      <span
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.12),transparent_55%)]"
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent"
      />
      <button
        type="button"
        aria-label={messages.playVideo}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-zinc-900 shadow-xl transition hover:scale-105 md:h-16 md:w-16"
      >
        <Play className="h-6 w-6 translate-x-0.5 fill-current" />
      </button>
      {label && (
        <span className="absolute bottom-3 left-4 text-xs font-medium text-white/90">
          {label}
        </span>
      )}
    </div>
  );
}

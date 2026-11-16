"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { useBentoMessages } from "./BentoMessages";

type Status = "idle" | "loading" | "success";

export function BentoPayment({
  amount = "$40.00",
  label = "Pay now",
}: {
  amount?: string;
  label?: string;
}) {
  const messages = useBentoMessages();
  const [status, setStatus] = useState<Status>("idle");

  function handleClick() {
    if (status !== "idle") return;
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1100);
    setTimeout(() => setStatus("idle"), 3200);
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-muted p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{messages.amountDue}</span>
        <span className="font-mono text-xl font-semibold text-foreground">
          {amount}
        </span>
      </div>
      <button
        type="button"
        onClick={handleClick}
        disabled={status !== "idle"}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-80"
      >
        {status === "idle" && (
          <>
            {label}
            <span aria-hidden className="text-base leading-none">›</span>
          </>
        )}
        {status === "loading" && (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {messages.processing}
          </>
        )}
        {status === "success" && (
          <>
            <Check className="h-4 w-4" />
            {messages.paid}
          </>
        )}
      </button>
    </div>
  );
}

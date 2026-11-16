"use client";

import { createContext, useContext, type ReactNode } from "react";

export type BentoMessages = {
  playVideo: string;
  amountDue: string;
  processing: string;
  paid: string;
};

const BentoMessagesContext = createContext<BentoMessages | null>(null);

export function BentoMessagesProvider({
  messages,
  children,
}: {
  messages: BentoMessages;
  children: ReactNode;
}) {
  return (
    <BentoMessagesContext.Provider value={messages}>
      {children}
    </BentoMessagesContext.Provider>
  );
}

export function useBentoMessages(): BentoMessages {
  const ctx = useContext(BentoMessagesContext);
  if (!ctx) {
    return {
      playVideo: "Play video",
      amountDue: "Amount due",
      processing: "Processing…",
      paid: "Paid",
    };
  }
  return ctx;
}

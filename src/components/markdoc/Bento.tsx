import type { ReactNode } from "react";

export function Bento({ children }: { children?: ReactNode }) {
  return (
    <section className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-3 md:my-16 md:gap-5">
      {children}
    </section>
  );
}

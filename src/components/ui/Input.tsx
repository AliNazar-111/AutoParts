import * as React from "react";

import { cn } from "./Utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-xl border border-white/5 bg-graphite-900 px-5 py-3 text-sm font-medium text-white shadow-inner transition-all duration-300 placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/50 focus-visible:bg-graphite-800 disabled:cursor-not-allowed disabled:opacity-30",
        className,
      )}
      {...props}
    />
  );
}

export { Input };

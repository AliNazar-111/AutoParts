import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./Utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-white/10 bg-graphite-800 text-zinc-400",
        destructive:
          "border-destructive/20 bg-destructive/10 text-destructive",
        success:
          "border-green-500/20 bg-green-500/10 text-green-500",
        warning:
          "border-yellow-500/20 bg-yellow-500/10 text-yellow-500",
        outline:
          "border-white/10 bg-transparent text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

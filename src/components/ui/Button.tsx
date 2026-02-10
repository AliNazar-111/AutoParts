import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./Utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-xl text-sm font-bold tracking-tight uppercase transition-all duration-300 disabled:pointer-events-none disabled:opacity-30 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:brightness-110 shadow-lg shadow-primary/20",
        destructive:
          "bg-destructive text-destructive-foreground hover:brightness-110",
        outline:
          "border border-white/10 bg-transparent text-white hover:bg-white/5 hover:border-white/20",
        secondary:
          "bg-graphite-800 text-white border border-white/5 hover:bg-graphite-700 hover:border-white/10",
        ghost:
          "text-zinc-400 hover:text-white hover:bg-white/5",
        link: "text-primary underline-offset-4 hover:underline lowercase",
        "industrial": "industrial-border text-white hover:border-primary/50 hover:shadow-[0_0_15px_rgba(227,30,36,0.2)]",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-lg px-4 text-xs tracking-widest",
        lg: "h-14 rounded-2xl px-10 text-base font-black tracking-widest",
        icon: "size-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

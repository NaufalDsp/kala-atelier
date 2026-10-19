import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "clay" | "muted";
  withDot?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  withDot = false,
  className,
  ...props
}: BadgeProps) {
  const dotColor = {
    default: "bg-ink",
    clay: "bg-clay",
    muted: "bg-stone",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-mono uppercase tracking-normal select-none text-graphite",
        className
      )}
      {...props}
    >
      {withDot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full inline-block shrink-0", dotColor)}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}


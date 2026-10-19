import React from "react";
import { cn } from "@/lib/utils";

interface IndexLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  index: string | number;
  className?: string;
  total?: string | number;
}

export function IndexLabel({
  index,
  total,
  className,
  ...props
}: IndexLabelProps) {
  const formattedIndex =
    typeof index === "number" ? String(index).padStart(2, "0") : index;
  const formattedTotal =
    typeof total === "number" ? String(total).padStart(2, "0") : total;

  return (
    <span
      className={cn(
        "font-mono text-mono text-stone tracking-normal select-none uppercase",
        className
      )}
      {...props}
    >
      ({formattedIndex}
      {formattedTotal ? `/${formattedTotal}` : ""})
    </span>
  );
}


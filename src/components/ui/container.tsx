import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  className,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn("w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16", className)}
      {...props}
    >
      {children}
    </Component>
  );
}


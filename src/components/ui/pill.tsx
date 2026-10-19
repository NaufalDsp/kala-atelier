import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PillBaseProps {
  children: React.ReactNode;
  variant?: "ink" | "paper" | "outline";
  showArrow?: boolean;
  className?: string;
}

type PillAsButton = PillBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type PillAsLink = PillBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type PillProps = PillAsButton | PillAsLink;

export function Pill({
  children,
  variant = "ink",
  showArrow = false,
  className,
  ...props
}: PillProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-label font-semibold uppercase tracking-[0.04em] transition-all duration-200 select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

  const variantClasses = {
    ink: "bg-ink text-paper hover:bg-graphite active:bg-black focus-visible:outline-ink",
    paper: "bg-paper text-ink hover:bg-bone active:bg-stone focus-visible:outline-paper",
    outline:
      "bg-transparent text-ink border border-ink-hairline hover:bg-ink hover:text-paper focus-visible:outline-ink",
  }[variant];

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowUpRight
          size={14}
          strokeWidth={1.5}
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if ("href" in props && typeof props.href === "string") {
    const { href, ...rest } = props;
    return (
      <Link
        href={href}
        className={cn("group", baseClasses, variantClasses, className)}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={buttonProps.type || "button"}
      className={cn("group", baseClasses, variantClasses, className)}
      {...buttonProps}
    >
      {content}
    </button>
  );
}


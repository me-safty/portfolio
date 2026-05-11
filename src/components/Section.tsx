import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  children: ReactNode;
  className?: string;
  variant?: "default" | "dot-grid" | "diagonal";
  noBorder?: boolean;
}

export function Section({
  children,
  className,
  variant = "default",
  noBorder = false,
  ...props
}: SectionProps) {
  const bgVariants = {
    default: "",
    "dot-grid": "dot-grid-bg",
    diagonal: "diagonal-lines-bg",
  };

  return (
    <section
      {...props}
      className={cn(
        "relative overflow-hidden",
        !noBorder && "frame-section",
        bgVariants[variant],
        className
      )}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-b border-border/70 px-5 py-4 sm:px-6 md:px-7",
        className
      )}
    >
      <h2 className="text-xs font-semibold uppercase leading-none tracking-[0.2em] text-muted-foreground">
        {title}
      </h2>
      <div className="h-px flex-1 bg-border/55" aria-hidden="true" />
    </div>
  );
}
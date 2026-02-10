import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "dot-grid" | "diagonal" | "noise";
  noBorder?: boolean;
}

export function Section({
  children,
  className,
  variant = "default",
  noBorder = false,
}: SectionProps) {
  const bgVariants = {
    default: "",
    "dot-grid": "dot-grid-bg",
    diagonal: "diagonal-lines-bg",
    noise: "noise-section",
  };

  return (
    <section
      className={cn(
        "relative",
        !noBorder && "section-divider",
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
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn("px-0 pt-12 pb-6", className)}>
      <div className="flex items-end gap-4">
        <h2 className="font-display text-[2.2rem] sm:text-[2.6rem] tracking-tight leading-none">
          {title}
        </h2>
        {subtitle && (
          <span className="text-sm text-muted-foreground tracking-wide mb-1">{subtitle}</span>
        )}
      </div>
      <div className="mt-3 h-px bg-linear-to-r from-accent via-accent/30 to-transparent w-32" />
    </div>
  );
}

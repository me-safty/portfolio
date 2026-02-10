import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
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
}: SectionProps) {
  const bgVariants = {
    default: "",
    "dot-grid": "dot-grid-bg",
    diagonal: "diagonal-lines-bg",
  };

  return (
    <section
      className={cn(
        "relative",
        !noBorder && "dashed-border-section",
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
    <div className={cn("dashed-border-section border-t-0 border-x-0 px-4 sm:px-5 md:px-6 py-3.5", className)}>
      <h2 className="text-[1.95rem] font-semibold tracking-tight leading-none">{title}</h2>
    </div>
  );
}

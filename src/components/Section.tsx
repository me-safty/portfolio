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
  showViewAll?: boolean;
}

export function SectionHeader({ title, className, showViewAll }: SectionHeaderProps) {
  return (
    <div className={cn("dashed-border-section border-t-0 border-x-0 px-4 sm:px-5 md:px-6 py-3.5 flex items-center justify-between gap-4", className)}>
      <h2 className="text-xl sm:text-[1.95rem] font-semibold tracking-tight leading-none">{title}</h2>
      {showViewAll && (
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shrink-0"
        >
          View All
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </a>
      )}
    </div>
  );
}

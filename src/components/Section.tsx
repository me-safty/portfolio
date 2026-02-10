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
  return (
    <section
      className={cn(
        "relative py-12 md:py-16",
        !noBorder && "border-t border-border",
        className
      )}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ title, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", className)}>
      <div className="flex items-center gap-4 mb-4">
        <div className="h-[1px] w-12 bg-primary"></div>
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary">
          Section_0{Math.floor(Math.random() * 9) + 1}
        </span>
      </div>
      <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2 uppercase">{title}</h2>
      {description && (
        <p className="text-muted-foreground text-lg max-w-2xl font-light">{description}</p>
      )}
    </div>
  );
}

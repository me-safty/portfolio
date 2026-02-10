import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export function Section({ children, className }: SectionProps) {
  return (
    <section className={cn("relative pt-16 border-t border-border/60", className)}>
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
    <div className={cn("pb-6", className)}>
      <h2 className="text-lg font-medium tracking-tight text-foreground/90">{title}</h2>
    </div>
  );
}

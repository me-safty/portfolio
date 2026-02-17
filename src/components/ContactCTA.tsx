import { Button } from "@/components/ui/button";
import { Mail, ArrowUpRight } from "lucide-react";

interface ContactCTAProps {
  email: string;
  quote: {
    text: string;
    author: string;
  };
}

export function ContactCTA({ email, quote }: ContactCTAProps) {
  return (
    <div>
      {/* CTA Section */}
      <div className="relative noise-section rounded-2xl border border-border/60 bg-card/50 px-6 sm:px-10 py-14 sm:py-16 text-center overflow-hidden">
        {/* Decorative gradient blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        
        <p className="text-sm font-mono text-accent tracking-widest uppercase mb-4 relative z-10">
          Let's collaborate
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 relative z-10">
          Have a project in mind?
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto relative z-10 leading-relaxed">
          I'm currently available for freelance work and new opportunities.
        </p>
        <div className="flex flex-wrap justify-center gap-3 relative z-10">
          <Button
            asChild
            className="gap-2.5 h-12 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 px-7 text-base font-medium shadow-lg shadow-accent/20 transition-all duration-300"
          >
            <a href={`mailto:${email}`}>
              <Mail className="size-4" />
              Send an email
              <ArrowUpRight className="size-3.5 opacity-60" />
            </a>
          </Button>
        </div>
      </div>

      {/* Quote Section */}
      <div className="relative py-16 sm:py-20 text-center">
        {/* Large decorative quote mark */}
        <div className="font-display text-[8rem] sm:text-[10rem] leading-none text-border/40 absolute top-4 left-1/2 -translate-x-1/2 select-none pointer-events-none">
          "
        </div>

        {/* Quote text */}
        <blockquote className="max-w-xl mx-auto mb-6 relative z-10 pt-8">
          <p className="font-display text-xl sm:text-2xl md:text-[1.7rem] italic leading-relaxed text-foreground/90">
            "{quote.text}"
          </p>
        </blockquote>

        {/* Author attribution */}
        <div className="flex items-center justify-center gap-4 relative z-10">
          <div className="h-px w-10 bg-accent/50" />
          <span className="text-sm text-muted-foreground font-mono tracking-wider uppercase">
            {quote.author}
          </span>
          <div className="h-px w-10 bg-accent/50" />
        </div>
      </div>
    </div>
  );
}

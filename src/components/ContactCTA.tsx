import { Button } from "@/components/ui/button";
import { Mail, Quote } from "lucide-react";

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
      <div className="diagonal-lines-bg border-b border-border/70 px-6 py-12 text-center">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight">Let's work together</h2>
        <p className="mx-auto mb-6 max-w-md text-[0.98rem] leading-7 text-muted-foreground">
          I'm currently available for freelance work and new opportunities. Feel free to reach out!
        </p>
        <Button asChild size="lg" className="h-11 gap-2 rounded-full px-6">
          <a href={`mailto:${email}`}>
            <Mail className="size-4" aria-hidden="true" />
            Send an email
          </a>
        </Button>
      </div>

      {/* Quote Section */}
      <div className="dot-grid-bg px-6 py-14 text-center sm:py-16">
        {/* Large quote marks */}
        <Quote className="mx-auto mb-6 size-10 text-muted-foreground/25" aria-hidden="true" />

        {/* Quote text */}
        <blockquote className="mx-auto mb-6 max-w-2xl">
          <p className="text-xl font-medium italic leading-relaxed md:text-2xl">
            "{quote.text}"
          </p>
        </blockquote>

        {/* Author attribution */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-8 bg-border" />
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {quote.author}
          </span>
          <div className="h-px w-8 bg-border" />
        </div>
      </div>
    </div>
  );
}
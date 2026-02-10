import { Button } from "@/components/ui/button";

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
      <div className="diagonal-lines-bg px-6 py-14 text-center border-b border-dashed border-border">
        <h2 className="text-xl sm:text-2xl font-display font-semibold mb-2">Let's work together</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto text-[1.02rem] leading-relaxed">
          I'm currently available for freelance work and new opportunities. Feel free to reach out!
        </p>
        <Button asChild size="lg" className="gap-2 bg-foreground text-background hover:bg-foreground/90">
          <a href={`mailto:${email}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Send an email
          </a>
        </Button>
      </div>

      {/* Quote Section */}
      <div className="dot-grid-bg px-6 py-16 text-center">
        {/* Large quote marks */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-12 text-muted-foreground/20 mx-auto mb-6"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        {/* Quote text */}
        <blockquote className="max-w-2xl mx-auto mb-6">
          <p className="text-xl md:text-2xl font-medium italic leading-relaxed text-foreground/90">
            "{quote.text}"
          </p>
        </blockquote>

        {/* Author attribution */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-accent-warm/50" />
          <span className="text-sm text-muted-foreground font-medium uppercase tracking-[0.15em]">
            {quote.author}
          </span>
          <div className="h-px w-12 bg-accent-warm/50" />
        </div>
      </div>
    </div>
  );
}

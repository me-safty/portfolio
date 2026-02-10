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
    <div className="space-y-12">
      <div className="space-y-4">
        <p className="text-sm text-foreground/85">
          Available for freelance and new opportunities.
        </p>
        <Button asChild size="sm" className="h-9 rounded-lg">
          <a href={`mailto:${email}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Get in touch
          </a>
        </Button>
      </div>

      <blockquote className="border-l-2 border-border pl-4 py-2">
        <p className="text-sm text-muted-foreground italic">"{quote.text}"</p>
        <cite className="text-xs text-muted-foreground/80 not-italic mt-1 block">
          — {quote.author}
        </cite>
      </blockquote>
    </div>
  );
}

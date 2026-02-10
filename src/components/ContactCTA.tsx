import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface ContactCTAProps {
  email: string;
  quote: {
    text: string;
    author: string;
  };
}

export function ContactCTA({ email, quote }: ContactCTAProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground p-8 md:p-12 flex flex-col justify-between min-h-[300px] relative overflow-hidden group">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            READY TO<br />BUILD?
          </h2>
          <p className="text-primary-foreground/80 max-w-sm text-lg">
            Available for freelance projects and consulting.
          </p>
        </div>
        
        <div className="relative z-10 mt-8">
          <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto h-14 text-lg font-bold rounded-none border-2 border-transparent hover:border-primary-foreground hover:bg-transparent hover:text-primary-foreground transition-all">
            <a href={`mailto:${email}`}>
              <Mail className="mr-2 size-5" />
              {email}
            </a>
          </Button>
        </div>

        {/* Decorative */}
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <div className="size-32 rounded-full border-[20px] border-primary-foreground"></div>
        </div>
        <div className="absolute -bottom-10 -right-10 size-64 bg-primary-foreground/10 rounded-full blur-3xl group-hover:bg-primary-foreground/20 transition-all duration-700"></div>
      </div>

      {/* Quote Section */}
      <div className="bg-muted p-8 md:p-12 flex flex-col justify-center text-center md:text-left relative">
        <blockquote className="relative z-10">
          <span className="text-6xl font-black text-border absolute -top-8 -left-4 select-none">"</span>
          <p className="text-2xl md:text-3xl font-bold leading-tight mb-6">
            {quote.text}
          </p>
          <footer className="flex items-center gap-4 md:justify-start justify-center">
            <div className="h-[2px] w-8 bg-primary"></div>
            <cite className="not-italic font-mono text-sm uppercase tracking-widest text-muted-foreground">
              {quote.author}
            </cite>
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

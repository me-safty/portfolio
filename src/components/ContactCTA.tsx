"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ContactCTAProps {
  email: string;
  quote: {
    text: string;
    author: string;
  };
}

export function ContactCTA({ email, quote }: ContactCTAProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      window.location.href = `mailto:${email}?subject=Newsletter%20Signup&body=Please%20add%20me%20to%20your%20newsletter:%20${encodeURIComponent(newsletterEmail)}`;
    }
  };

  return (
    <div>
      {/* Newsletter Section - matches reference */}
      <div className="diagonal-lines-bg px-4 sm:px-6 py-8 sm:py-10">
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md">
          <input
            type="email"
            placeholder="Enter your email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            className="flex-1 h-10 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50"
          />
          <Button type="submit" size="default" className="h-10 rounded-lg px-5 shrink-0">
            Subscribe
          </Button>
        </form>
      </div>

      {/* Quote Section - matches reference */}
      <div className="dot-grid-bg px-4 sm:px-6 py-14 sm:py-16 text-center">
        {/* Large decorative quote marks */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-16 sm:size-20 text-muted-foreground/25 mx-auto mb-6"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        <blockquote className="max-w-2xl mx-auto mb-6">
          <p className="text-xl sm:text-2xl font-semibold italic leading-relaxed text-foreground/90">
            {quote.text}
          </p>
        </blockquote>

        {/* Author with horizontal lines */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-border" />
          <span className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-[0.2em]">
            {quote.author}
          </span>
          <div className="h-px w-12 bg-border" />
        </div>
      </div>
    </div>
  );
}

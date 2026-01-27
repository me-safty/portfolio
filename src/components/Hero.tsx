import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"

interface HeroProps {
  profile: {
    name: string
    titles: string[]
    avatar: string
    bio: string
    email: string
    calendarLink: string
  }
}

export function Hero({ profile }: HeroProps) {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentTitleIndex((prev) => (prev + 1) % profile.titles.length)
        setIsAnimating(false)
      }, 400)
    }, 3000)

    return () => clearInterval(interval)
  }, [profile.titles.length])

  return (
    <div>
      {/* Top dotted box with buttons */}
      <div className="dashed-border-section border-b-0 dot-grid-bg min-h-[140px] md:min-h-[180px] flex items-center justify-center p-10">
        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild className="gap-2">
            <a
              href={profile.calendarLink}
              target="_blank"
              rel="noopener noreferrer"
            >
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
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              Book an intro call
            </a>
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <a href={`mailto:${profile.email}`}>
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
      </div>

      {/* Profile section */}
      <div className="dashed-border-section border-t-0 p-6 md:p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="size-20 md:size-24 rounded-lg overflow-hidden bg-muted border">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="size-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  target.parentElement!.innerHTML = `
                    <div class="size-full flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/20 text-2xl font-semibold text-muted-foreground">
                      ${profile.name.charAt(0)}
                    </div>
                  `
                }}
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-muted-foreground/50" />
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    {profile.name}
                  </h1>
                </div>

                {/* Animated title */}
                <div className="h-6 overflow-hidden mt-1">
                  <p
                    className={`text-muted-foreground font-medium ${
                      isAnimating ? "title-exit" : "title-enter"
                    }`}
                  >
                    {profile.titles[currentTitleIndex]}
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Bio section */}
      <div className="dashed-border-section border-t-0 p-6 md:p-8 pt-0">
        <div className="text-muted-foreground text-sm md:text-base leading-relaxed space-y-3">
          {profile.bio.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

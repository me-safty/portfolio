import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { Calendar, Eye, Mail, RefreshCcw } from "lucide-react"

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

  const cycleTitle = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % profile.titles.length)
      setIsAnimating(false)
    }, 400)
  }

  return (
    <div>
      {/* Profile section */}
      <div className="frame-section relative p-5 sm:p-6 md:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="size-24 overflow-hidden rounded-2xl border border-border bg-muted shadow-sm ring-4 ring-background sm:size-28">
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
          <div className="flex min-w-0 flex-1 flex-col justify-center pt-1 pr-12">
            <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent" />
              Portfolio
            </div>
            <h1 className="mb-2 text-[2.55rem] font-semibold leading-[0.98] tracking-tight text-foreground sm:text-[3.2rem] md:text-[3.65rem]">
              {profile.name}
            </h1>

            {/* Animated title */}
            <div className="h-8 overflow-hidden">
              <p
                className={`text-base font-medium text-muted-foreground sm:text-lg ${
                  isAnimating ? "title-exit" : "title-enter"
                }`}
              >
                {profile.titles[currentTitleIndex]}
              </p>
            </div>
          </div>

          {/* Top Right Icons */}
          <div className="absolute right-4 top-4 flex items-center gap-1.5 sm:right-5 sm:top-5">
            <Button 
              variant="ghost" 
              size="icon" 
              className="size-8 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
              onClick={cycleTitle}
              title="Change title"
            >
              <RefreshCcw className="size-4" />
            </Button>
            <ThemeToggle />
          </div>

          {/* Bottom Right View Count */}
          <div className="absolute bottom-5 right-5 hidden items-center gap-1.5 rounded-full border border-border bg-card/80 px-2.5 py-1 text-sm font-medium text-muted-foreground sm:flex">
            <Eye className="size-3.5 opacity-80" aria-hidden="true" />
            <span>2.9k</span>
          </div>
        </div>
      </div>

      {/* Bio section */}
      <div className="frame-section border-t-0 p-5 sm:p-6 md:p-7">
        <div className="mb-6 max-w-2xl space-y-3 text-[1.02rem] leading-8 text-foreground/78">
          {profile.bio.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2.5">
          <Button asChild className="h-10 gap-2 rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90">
            <a
              href={profile.calendarLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Calendar className="size-4" />
              Book an intro call
            </a>
          </Button>
          <Button variant="secondary" asChild className="h-10 gap-2 rounded-full border border-border bg-secondary/70 px-5 hover:bg-secondary">
            <a href={`mailto:${profile.email}`}>
              <Mail className="size-4" />
              Send an email
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
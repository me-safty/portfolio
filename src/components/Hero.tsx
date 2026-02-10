import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { RefreshCcw, Eye, Calendar, Mail } from "lucide-react"

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
      <div className="dashed-border-section p-4 sm:p-5 md:p-6 relative">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="size-24 sm:size-28 rounded-2xl overflow-hidden bg-muted border border-border shadow-md ring-1 ring-black/5 dark:ring-white/5">
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
          <div className="flex-1 min-w-0 flex flex-col justify-center h-full pt-1">
            <h1 className="text-[2.25rem] sm:text-[2.6rem] font-display font-bold tracking-tight leading-[1.12] mb-1.5">
              {profile.name}
            </h1>

            {/* Animated title */}
            <div className="h-6 overflow-hidden pr-12">
              <p
                className={`text-muted-foreground font-medium text-[1.02rem] ${
                  isAnimating ? "title-exit" : "title-enter"
                }`}
              >
                {profile.titles[currentTitleIndex]}
              </p>
            </div>
          </div>

          {/* Top Right Icons */}
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 flex items-center gap-1.5">
            <Button 
              variant="ghost" 
              size="icon" 
              className="size-7 text-muted-foreground hover:text-foreground hover:bg-transparent"
              onClick={cycleTitle}
              title="Change title"
            >
              <RefreshCcw className="size-3.5" />
            </Button>
            <ThemeToggle />
          </div>

          {/* Bottom Right View Count */}
          <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
            <Eye className="size-3.5 opacity-80" />
            <span>2.9k</span>
          </div>
        </div>
      </div>

      {/* Bio section */}
      <div className="dashed-border-section border-t-0 p-4 sm:p-5 md:p-6">
        <div className="text-foreground/90 text-[1.02rem] leading-8 space-y-3 mb-5">
          {profile.bio.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2.5">
          <Button asChild className="gap-2 h-9 rounded-[10px] bg-primary text-primary-foreground hover:bg-primary/90">
            <a
              href={profile.calendarLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Calendar className="size-4" />
              Book an intro call
            </a>
          </Button>
          <Button variant="secondary" asChild className="gap-2 h-9 rounded-[10px] border border-border bg-secondary/70 hover:bg-secondary">
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

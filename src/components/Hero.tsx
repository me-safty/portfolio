import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { Calendar, Mail } from "lucide-react"

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
      }, 350)
    }, 3000)

    return () => clearInterval(interval)
  }, [profile.titles.length])

  const cycleTitle = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % profile.titles.length)
      setIsAnimating(false)
    }, 350)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
        <div className="shrink-0">
          <div className="size-20 rounded-2xl overflow-hidden bg-muted ring-1 ring-border/50">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="size-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = "none"
                target.parentElement!.innerHTML = `
                  <div class="size-full flex items-center justify-center bg-muted text-xl font-medium text-muted-foreground">
                    ${profile.name.charAt(0)}
                  </div>
                `
              }}
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-[1.75rem] font-semibold tracking-tight text-foreground">
                {profile.name}
              </h1>
              <div className="h-5 overflow-hidden mt-0.5">
                <p
                  className={`text-sm text-muted-foreground ${
                    isAnimating ? "title-exit" : "title-enter"
                  }`}
                >
                  {profile.titles[currentTitleIndex]}
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          <button
            type="button"
            onClick={cycleTitle}
            className="mt-2 text-xs text-muted-foreground/70 hover:text-muted-foreground transition-colors"
            aria-label="Cycle title"
          >
            Change title
          </button>
        </div>
      </div>

      <div className="text-[0.9375rem] leading-[1.7] text-foreground/85 space-y-4">
        {profile.bio.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button asChild size="sm" className="h-9 rounded-lg bg-foreground text-background hover:bg-foreground/90">
          <a href={profile.calendarLink} target="_blank" rel="noopener noreferrer">
            <Calendar className="size-3.5" />
            Book a call
          </a>
        </Button>
        <Button variant="outline" asChild size="sm" className="h-9 rounded-lg border-border/80">
          <a href={`mailto:${profile.email}`}>
            <Mail className="size-3.5" />
            Email
          </a>
        </Button>
      </div>
    </div>
  )
}

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
      <div className="dashed-border-section p-6 md:p-8 relative">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="size-28 md:size-32 rounded-xl overflow-hidden bg-muted border border-border shadow-sm">
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
          <div className="flex-1 min-w-0 flex flex-col justify-center h-full pt-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              {profile.name}
            </h1>

            {/* Animated title */}
            <div className="h-6 overflow-hidden">
              <p
                className={`text-muted-foreground font-medium text-lg ${
                  isAnimating ? "title-exit" : "title-enter"
                }`}
              >
                {profile.titles[currentTitleIndex]}
              </p>
            </div>
          </div>

          {/* Top Right Icons */}
          <div className="absolute top-6 right-6 flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="size-9 text-muted-foreground hover:text-foreground"
              onClick={cycleTitle}
              title="Change title"
            >
              <RefreshCcw className="size-4" />
            </Button>
            <ThemeToggle />
          </div>

          {/* Bottom Right View Count */}
          <div className="absolute bottom-6 right-6 flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Eye className="size-3.5" />
            <span>2.9k</span>
          </div>
        </div>
      </div>

      {/* Bio section */}
      <div className="dashed-border-section border-t-0 p-6 md:p-8">
        <div className="text-muted-foreground text-sm md:text-base leading-relaxed space-y-3 mb-6">
          {profile.bio.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button asChild className="gap-2 bg-foreground text-background hover:bg-foreground/90">
            <a
              href={profile.calendarLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Calendar className="size-4" />
              Book an intro call
            </a>
          </Button>
          <Button variant="secondary" asChild className="gap-2 border border-border/50">
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

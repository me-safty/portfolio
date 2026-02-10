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
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
          {/* Avatar - circular like reference */}
          <div className="shrink-0">
            <div className="size-20 sm:size-24 rounded-full overflow-hidden bg-muted border border-border shadow-sm">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="size-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  target.parentElement!.innerHTML = `
                    <div class="size-full flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/20 text-xl font-semibold text-muted-foreground">
                      ${profile.name.charAt(0)}
                    </div>
                  `
                }}
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-start gap-3 justify-between">
              <div>
                <h1 className="text-2xl sm:text-[2rem] font-bold tracking-tight leading-[1.2] mb-0.5">
                  {profile.name}
                </h1>
                {/* Animated title */}
                <div className="h-5 overflow-hidden">
                  <p
                    className={`text-muted-foreground font-medium text-[0.95rem] ${
                      isAnimating ? "title-exit" : "title-enter"
                    }`}
                  >
                    {profile.titles[currentTitleIndex]}
                  </p>
                </div>
                {/* View count - below name like reference */}
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
                  <Eye className="size-3.5" />
                  <span>2.9k</span>
                </div>
              </div>
              {/* Top right: cycle title + theme toggle */}
              <div className="flex items-center gap-1 shrink-0">
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
            </div>
          </div>
        </div>
      </div>

      {/* Bio section */}
      <div className="dashed-border-section border-t-0 p-4 sm:p-5 md:p-6">
        <div className="text-foreground/85 text-[1.02rem] leading-8 space-y-3 mb-5">
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

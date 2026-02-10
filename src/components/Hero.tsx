import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { RefreshCcw, Eye, Calendar, Mail, ArrowUpRight } from "lucide-react"

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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentTitleIndex((prev) => (prev + 1) % profile.titles.length)
        setIsAnimating(false)
      }, 500)
    }, 3500)

    return () => clearInterval(interval)
  }, [profile.titles.length])

  const cycleTitle = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % profile.titles.length)
      setIsAnimating(false)
    }, 500)
  }

  // Split name for stylized display
  const nameParts = profile.name.split(" ")

  return (
    <div className={`transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
      {/* ── Top bar: status + theme toggle ── */}
      <div className="flex items-center justify-between mb-8 reveal-up">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
          </span>
          <span className="text-sm text-muted-foreground tracking-wide">Available for work</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mr-2">
            <Eye className="size-3.5 opacity-70" />
            <span>2.9k</span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* ── Hero content ── */}
      <div className="relative mb-10">
        {/* Avatar + Name row */}
        <div className="flex items-start gap-5 sm:gap-6 mb-6 reveal-up delay-100">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="size-20 sm:size-24 rounded-2xl overflow-hidden ring-2 ring-border ring-offset-2 ring-offset-background shadow-lg">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="size-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  target.parentElement!.innerHTML = `
                    <div class="size-full flex items-center justify-center bg-gradient-to-br from-[#D4A853] to-[#C4956A] text-3xl font-display text-white">
                      ${profile.name.charAt(0)}
                    </div>
                  `
                }}
              />
            </div>
          </div>

          {/* Name — editorial serif style */}
          <div className="flex-1 min-w-0 pt-1">
            <h1 className="font-display text-[2.8rem] sm:text-[3.5rem] md:text-[4rem] leading-[0.95] tracking-tight mb-3">
              {nameParts[0]}
              <br />
              <span className="text-muted-foreground">{nameParts.slice(1).join(" ")}</span>
            </h1>

            {/* Animated title */}
            <div className="flex items-center gap-2.5">
              <div className="h-px w-8 bg-accent" />
              <div className="h-6 overflow-hidden">
                <p
                  className={`text-accent font-medium text-sm sm:text-base tracking-wide uppercase ${
                    isAnimating ? "title-exit" : "title-enter"
                  }`}
                >
                  {profile.titles[currentTitleIndex]}
                </p>
              </div>
              <button
                onClick={cycleTitle}
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Change title"
              >
                <RefreshCcw className="size-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="reveal-up delay-200">
          <div className="text-foreground/80 text-[1.05rem] sm:text-lg leading-[1.85] mb-7 max-w-[580px]">
            {profile.bio.split("\n\n").map((paragraph, i) => (
              <p key={i} className={i > 0 ? "mt-4" : ""}>{paragraph}</p>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 reveal-up delay-300">
            <Button
              asChild
              className="gap-2.5 h-11 rounded-xl bg-foreground text-background hover:bg-foreground/90 px-6 font-medium text-[0.95rem] transition-all duration-300 hover:shadow-lg"
            >
              <a href={profile.calendarLink} target="_blank" rel="noopener noreferrer">
                <Calendar className="size-4" />
                Book an intro call
                <ArrowUpRight className="size-3.5 opacity-60" />
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
              className="gap-2 h-11 rounded-xl border-border/80 px-6 font-medium text-[0.95rem] hover:bg-secondary/80 transition-all duration-300"
            >
              <a href={`mailto:${profile.email}`}>
                <Mail className="size-4" />
                Send an email
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

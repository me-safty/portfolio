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

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentTitleIndex((prev) => (prev + 1) % profile.titles.length)
        setIsAnimating(false)
      }, 500)
    }, 4000)

    return () => clearInterval(interval)
  }, [profile.titles.length])

  const cycleTitle = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % profile.titles.length)
      setIsAnimating(false)
    }, 500)
  }

  return (
    <div className="relative pt-10 pb-8 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Top Controls */}
      <div className="absolute top-0 right-4 sm:right-8 flex items-center gap-3">
        <ThemeToggle />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-start">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-2">
             <div className="flex items-center gap-2 text-primary font-mono text-sm tracking-wider uppercase mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for work
            </div>
            
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] text-foreground mix-blend-difference">
              {profile.name.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
            
            <div className="h-8 overflow-hidden flex items-center gap-2 mt-4">
              <span className="text-muted-foreground font-mono text-lg">{'>'}</span>
              <p
                className={`text-xl sm:text-2xl font-medium text-muted-foreground ${
                  isAnimating ? "title-exit" : "title-enter"
                }`}
              >
                {profile.titles[currentTitleIndex]}
              </p>
            </div>
          </div>

          <div className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed font-light">
            {profile.bio.split("\n\n")[0]}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild size="lg" className="rounded-none border-2 border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary transition-all duration-300 shadow-[4px_4px_0px_0px_var(--primary-foreground)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
              <a
                href={profile.calendarLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 size-5" />
                Book Intro
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-none border-2 bg-transparent hover:bg-secondary transition-all duration-300">
              <a href={`mailto:${profile.email}`}>
                <Mail className="mr-2 size-5" />
                Email Me
              </a>
            </Button>
          </div>
        </div>

        {/* Right Avatar */}
        <div className="relative group md:mt-8 mx-auto md:mx-0">
          <div className="absolute -inset-2 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="tech-corners p-2 relative">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 overflow-hidden bg-muted grayscale hover:grayscale-0 transition-all duration-500">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/20 to-transparent mix-blend-overlay"></div>
            </div>
            
            {/* Tech decorative elements */}
            <div className="absolute -right-3 top-10 text-[0.6rem] font-mono writing-vertical-rl text-muted-foreground/50">
              SYS.ID: {Math.floor(Math.random() * 9999)}
            </div>
            <div className="absolute -bottom-6 left-0 text-xs font-mono text-muted-foreground/50 flex gap-4">
              <span>FIG.01</span>
              <span>DEV_PROFILE</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-8 bg-foreground"></div>
      </div>
    </div>
  )
}

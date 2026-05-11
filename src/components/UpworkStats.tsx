import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star } from "lucide-react"

interface UpworkStat {
  label: string
  value: string
  detail: string
}

interface UpworkProfile {
  url: string
  headline: string
  rate: string
  location: string
  badges: string[]
  stats: UpworkStat[]
  summary: string
  recentJobs: string[]
  portfolioProjects: string[]
}

interface UpworkStatsProps {
  upwork: UpworkProfile
}

export function UpworkStats({ upwork }: UpworkStatsProps) {
  return (
    <div className="p-5 sm:p-6 md:p-7">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            {upwork.badges.map((badge) => (
              <Badge key={badge} variant="outline" className="bg-secondary/60">
                {badge}
              </Badge>
            ))}
          </div>
          <h3 className="text-2xl font-semibold leading-tight tracking-tight">
            {upwork.headline}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {upwork.rate} · {upwork.location}
          </p>
        </div>

        <Button asChild className="h-10 shrink-0 gap-2 rounded-full px-5">
          <a href={upwork.url} target="_blank" rel="noopener noreferrer">
            Upwork
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2 md:grid-cols-4">
        {upwork.stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border/75 bg-secondary/35 p-3">
            <div className="mb-1 flex items-center gap-1.5">
              {stat.label === "Rating" && <Star className="size-3.5 fill-accent text-accent-foreground" />}
              <span className="text-2xl font-semibold leading-none">{stat.value}</span>
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-1 text-xs text-muted-foreground/80">{stat.detail}</p>
          </div>
        ))}
      </div>

      <p className="mb-5 max-w-2xl text-[0.98rem] leading-7 text-foreground/76">
        {upwork.summary}
      </p>

      <div className="grid gap-4 md:grid-cols-[1.35fr_0.65fr]">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Recent Upwork jobs
          </p>
          <ul className="grid gap-2">
            {upwork.recentJobs.map((job) => (
              <li key={job} className="flex gap-2 text-sm leading-6 text-foreground/78">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                <span>{job}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Portfolio
          </p>
          <div className="flex flex-wrap gap-1.5">
            {upwork.portfolioProjects.map((project) => (
              <Badge key={project} variant="secondary" className="border border-border bg-secondary/70">
                {project}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
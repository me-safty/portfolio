import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ExternalLink } from "lucide-react";

interface Experience {
  id: string;
  company: string;
  logo: string;
  role: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string[];
  technologies: string[];
}

interface ExperiencesProps {
  experiences: Experience[];
}

function ExperienceCard({
  experience,
  defaultOpen = false,
}: {
  experience: Experience;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border-b border-border/70 last:border-b-0">
        <CollapsibleTrigger asChild>
          <button className="flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/45 sm:px-6 md:px-7">
            {/* Company logo */}
            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-muted">
              <img
                src={experience.logo}
                alt={experience.company}
                className="size-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.parentElement!.innerHTML = `
                    <span class="text-lg font-semibold text-muted-foreground">
                      ${experience.company.charAt(0)}
                    </span>
                  `;
                }}
              />
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl">{experience.company}</span>
                <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs font-normal">
                  {experience.type}
                </Badge>
              </div>
              <p className="mt-1 text-[0.98rem] text-muted-foreground">{experience.role}</p>
            </div>

            {/* Date and location */}
            <div className="text-right shrink-0 hidden sm:block">
              <p className="text-sm font-medium">
                {experience.startDate} - {experience.endDate}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">{experience.location}</p>
            </div>

            {/* Expand icon */}
            <ChevronDown
              className={`size-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="pb-5 pl-[4.25rem] pr-5 sm:pl-[5rem] sm:pr-6 md:pr-7">
            {/* Mobile date */}
            <p className="mb-3 text-sm text-muted-foreground sm:hidden">
              {experience.startDate} - {experience.endDate} · {experience.location}
            </p>

            {/* Description */}
            <ul className="mb-4 space-y-2.5">
              {experience.description.map((item, i) => (
                <li key={i} className="flex gap-2 text-[0.98rem] leading-7 text-foreground/78">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5">
              {experience.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="rounded-full border-border bg-secondary/60 text-xs font-normal">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export function Experiences({ experiences }: ExperiencesProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 3);

  return (
    <div>
      {displayedExperiences.map((exp, index) => (
        <ExperienceCard key={exp.id} experience={exp} defaultOpen={index === 0} />
      ))}

      {experiences.length > 3 && (
        <div className="flex justify-center py-4">
          <Button
            variant="default"
            onClick={() => setShowAll(!showAll)}
            className="h-10 rounded-full border border-border/70 px-5 text-sm"
          >
            {showAll ? "Show Less" : "View All"}
            <ExternalLink className="size-4" aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  );
}
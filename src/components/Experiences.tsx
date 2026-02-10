import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
      <div className="dashed-border-section border-t-0 border-x-0 last:border-b-0">
        <CollapsibleTrigger asChild>
          <button className="w-full px-4 sm:px-5 md:px-6 py-4 flex items-start gap-3 text-left hover:bg-muted/40 transition-colors">
            {/* Company logo */}
            <div className="size-12 rounded-xl bg-muted border flex items-center justify-center shrink-0 overflow-hidden">
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
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-2xl font-semibold leading-none">{experience.company}</span>
                <Badge variant="outline" className="text-sm font-normal rounded-[8px] px-2 py-0.5">
                  {experience.type}
                </Badge>
              </div>
              <p className="text-[1.05rem] text-muted-foreground mt-1">{experience.role}</p>
            </div>

            {/* Date and location */}
            <div className="text-right shrink-0 hidden sm:block">
              <p className="text-[1.02rem] font-medium">
                {experience.startDate} - {experience.endDate}
              </p>
              <p className="text-[1.02rem] text-muted-foreground mt-0.5">{experience.location}</p>
            </div>

            {/* Expand icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`size-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 sm:px-5 md:px-6 pb-4 pl-[4.25rem] sm:pl-[4.75rem]">
            {/* Mobile date */}
            <p className="text-[1.02rem] text-muted-foreground mb-3 sm:hidden">
              {experience.startDate} - {experience.endDate} · {experience.location}
            </p>

            {/* Description */}
            <ul className="space-y-2.5 mb-4">
              {experience.description.map((item, i) => (
                <li key={i} className="flex gap-2 text-[1.04rem] leading-8 text-foreground/85">
                  <span className="text-foreground mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5">
              {experience.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-sm font-normal rounded-[8px] border-border bg-secondary/60">
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
            className="h-10 rounded-[12px] border border-border/70 px-5 text-base"
          >
            {showAll ? "Show Less" : "View All"}
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
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

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
  index,
}: {
  experience: Experience;
  defaultOpen?: boolean;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative pl-8 sm:pl-10">
        {/* Timeline line */}
        <div className="absolute left-[11px] sm:left-[15px] top-0 bottom-0 w-px bg-border" />
        
        {/* Timeline dot */}
        <div className="absolute left-[6px] sm:left-[10px] top-[22px] size-[12px] rounded-full border-2 border-accent bg-background z-10" />

        <div className="pb-8 last:pb-0">
          <CollapsibleTrigger asChild>
            <button className="w-full text-left group">
              <div className="flex items-start gap-3.5 sm:gap-4">
                {/* Company logo */}
                <div className="size-11 sm:size-12 rounded-xl bg-card border border-border/60 flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={experience.logo}
                    alt={experience.company}
                    className="size-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.parentElement!.innerHTML = `
                        <span class="text-lg font-display italic text-muted-foreground">
                          ${experience.company.charAt(0)}
                        </span>
                      `;
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap mb-0.5">
                    <span className="font-display text-xl sm:text-2xl leading-tight">{experience.company}</span>
                    <Badge variant="outline" className="text-xs font-normal rounded-full px-2.5 py-0.5 border-border/60">
                      {experience.type}
                    </Badge>
                  </div>
                  <p className="text-[0.95rem] text-muted-foreground">{experience.role}</p>
                  
                  {/* Date — always visible */}
                  <p className="text-sm text-muted-foreground/70 mt-1 font-mono">
                    {experience.startDate} — {experience.endDate}
                    <span className="hidden sm:inline"> · {experience.location}</span>
                  </p>
                </div>

                {/* Expand icon */}
                <ChevronDown
                  className={`size-5 shrink-0 text-muted-foreground/50 transition-transform duration-300 mt-1 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="mt-4 ml-[3.25rem] sm:ml-[3.75rem]">
              {/* Description */}
              <ul className="space-y-2.5 mb-4">
                {experience.description.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-foreground/80">
                    <span className="text-accent mt-0.5 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5">
                {experience.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-xs font-normal rounded-full border-border/40 bg-card/50 px-2.5 py-0.5"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </div>
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
        <ExperienceCard key={exp.id} experience={exp} defaultOpen={index === 0} index={index} />
      ))}

      {experiences.length > 3 && (
        <div className="flex justify-center pt-2 pb-4">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="gap-2 h-10 rounded-xl px-5 border-border/60 hover:border-accent/40 text-sm font-medium"
          >
            {showAll ? "Show Less" : "View All Experiences"}
            <ChevronDown className={`size-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
          </Button>
        </div>
      )}
    </div>
  );
}

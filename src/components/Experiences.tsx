import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="relative pl-8 md:pl-12 py-2 group">
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border group-last:bottom-auto group-last:h-8"></div>
      
      {/* Timeline Dot */}
      <div className="absolute left-[-4px] top-8 size-[9px] rounded-full bg-background border-2 border-primary z-10"></div>

      <div className="bg-card/50 border border-border/50 p-6 md:p-8 hover:bg-card hover:border-primary/50 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
             <div className="size-12 bg-muted border border-border flex items-center justify-center overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all">
              <img
                src={experience.logo}
                alt={experience.company}
                className="size-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.parentElement!.innerHTML = `
                    <span class="text-xl font-bold font-display text-muted-foreground">
                      ${experience.company.charAt(0)}
                    </span>
                  `;
                }}
              />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold font-display leading-tight">{experience.company}</h3>
              <p className="text-primary font-mono text-sm uppercase tracking-wider">{experience.role}</p>
            </div>
          </div>

          <div className="text-left md:text-right">
             <div className="inline-block bg-secondary/50 px-3 py-1 text-xs font-mono mb-1">
              {experience.startDate} — {experience.endDate}
             </div>
             <p className="text-sm text-muted-foreground">{experience.location} · {experience.type}</p>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {experience.description.map((item, i) => (
            <li key={i} className="flex gap-3 text-base text-muted-foreground leading-relaxed font-light">
              <span className="text-primary mt-1.5 text-xs">■</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <span key={tech} className="text-xs font-mono border border-border px-2 py-1 text-muted-foreground/80">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Experiences({ experiences }: ExperiencesProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedExperiences = showAll ? experiences : experiences.slice(0, 3);

  return (
    <div className="relative space-y-8">
      {displayedExperiences.map((exp) => (
        <ExperienceCard key={exp.id} experience={exp} />
      ))}

      {experiences.length > 3 && (
        <div className="flex justify-center pt-8 pl-8 md:pl-12">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            {showAll ? "Show Less" : "View All History"}
          </Button>
        </div>
      )}
    </div>
  );
}

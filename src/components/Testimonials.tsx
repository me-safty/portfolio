interface Testimonial {
  id: string;
  text: string;
  author: string;
  role: string;
  avatar: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="p-6 border-r border-dashed border-border last:border-r-0 flex flex-col">
      {/* Quote icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-8 text-muted-foreground/30 mb-4"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      {/* Quote text */}
      <p className="text-muted-foreground mb-6 flex-1 leading-relaxed">
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-muted overflow-hidden">
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="size-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.parentElement!.innerHTML = `
                <div class="size-full flex items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/20 text-sm font-semibold text-muted-foreground">
                  ${testimonial.author.charAt(0)}
                </div>
              `;
            }}
          />
        </div>
        <div>
          <p className="font-medium text-sm">{testimonial.author}</p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
}

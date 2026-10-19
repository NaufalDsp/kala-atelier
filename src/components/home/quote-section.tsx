import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { IndexLabel } from "@/components/ui/index-label";
import { Testimonial } from "@/domain/testimonial";

interface QuoteSectionProps {
  testimonials: Testimonial[];
}

export function QuoteSection({ testimonials }: QuoteSectionProps) {
  // Use the primary featured client testimonial
  const primaryTestimonial = testimonials[0];

  if (!primaryTestimonial) return null;

  return (
    <section className="py-28 md:py-36 bg-bone text-ink border-b border-ink-hairline">
      <Container>
        <div className="flex flex-col gap-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-ink/15 pb-4">
            <div className="flex items-center gap-3">
              <IndexLabel index={5} />
              <span className="font-mono text-label uppercase tracking-widest text-graphite">
                Kesan Penghuni
              </span>
            </div>

            {primaryTestimonial.projectSlug && (
              <Link
                href={`/karya/${primaryTestimonial.projectSlug}`}
                className="group inline-flex items-center gap-1.5 font-mono text-label uppercase tracking-wider text-graphite hover:text-ink transition-colors"
              >
                <span>Proyek Terkait</span>
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>

          <blockquote className="font-sans text-statement font-medium tracking-[-0.03em] leading-[1.1] text-balance text-ink">
            &ldquo;{primaryTestimonial.quoteId}&rdquo;
          </blockquote>

          <div className="flex flex-col gap-1 pt-2">
            <span className="font-sans text-lg font-medium text-ink">
              {primaryTestimonial.author}
            </span>
            <span className="font-mono text-mono text-graphite">
              {primaryTestimonial.authorNote}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}


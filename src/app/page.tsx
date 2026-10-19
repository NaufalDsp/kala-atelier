import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Statement } from "@/components/home/statement";
import { StudioTeaser } from "@/components/home/studio-teaser";
import { WorkList } from "@/components/home/work-list";
import { ProcessList } from "@/components/home/process-list";
import { QuoteSection } from "@/components/home/quote-section";
import { ClosingCTA } from "@/components/home/closing-cta";
import { projectRepository } from "@/lib/repositories";
import { LOCAL_TESTIMONIALS } from "@/data/testimonials";


export default async function HomePage() {
  const featuredProjects = await projectRepository.getFeaturedProjects();
  const allProjects = await projectRepository.getAllProjects();

  const heroProject = featuredProjects[0] || allProjects[0];
  const listProjects = featuredProjects.length >= 3 ? featuredProjects : allProjects.slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink selection:bg-stone selection:text-ink">
      {/* Editorial Fixed Header with Transparent Hero Overlay */}
      <Header isHeroOverlay={true} />

      {/* Main Sections */}
      <main className="flex-1 flex flex-col">
        {/* Full-Screen Hero */}
        <Hero featuredProject={heroProject} />

        {/* Studio Philosophy Statement */}
        <Statement />

        {/* Studio Teaser & Tactile Material Craft */}
        <StudioTeaser />

        {/* Numbered Row Works List with Desktop Hover Preview */}
        <WorkList projects={listProjects} />

        {/* 6-Stage Methodology */}
        <ProcessList />

        {/* Featured Testimonial Quote */}
        <QuoteSection testimonials={LOCAL_TESTIMONIALS} />

        {/* Closing Lead Consultation CTA */}
        <ClosingCTA />
      </main>

      {/* Editorial Footer with Live Jakarta Clock */}
      <Footer />
    </div>
  );
}

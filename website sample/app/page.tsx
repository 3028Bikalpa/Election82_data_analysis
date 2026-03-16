import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { TimelineSection } from "@/components/sections/timeline-section"
import { SeatsSection } from "@/components/sections/seats-section"
import { ComparisonSection } from "@/components/sections/comparison-section"
import { TurnoutSection } from "@/components/sections/turnout-section"
import { MomentsSection } from "@/components/sections/moments-section"
import { WinnersSection } from "@/components/sections/winners-section"
import { ImplicationsSection } from "@/components/sections/implications-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <TimelineSection />
      <SeatsSection />
      <ComparisonSection />
      <TurnoutSection />
      <MomentsSection />
      <WinnersSection />
      <ImplicationsSection />
      <Footer />
    </main>
  )
}

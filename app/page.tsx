import { Header } from "@/components/landing/Header"
import { HeroSection } from "@/components/landing/HeroSection"
import { TrustIndicators } from "@/components/landing/TrustIndicators"
import { FeaturesGrid } from "@/components/landing/FeaturesGrid"
import { IndustrySolutions } from "@/components/landing/IndustrySolutions"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { ProductModules } from "@/components/landing/ProductModules"
import { ComplianceSafety } from "@/components/landing/ComplianceSafety"
import { ReportingAnalytics } from "@/components/landing/ReportingAnalytics"
import { Testimonials } from "@/components/landing/Testimonials"
import { Pricing } from "@/components/landing/Pricing"
import { FinalCTA } from "@/components/landing/FinalCTA"
import { Footer } from "@/components/landing/Footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <TrustIndicators />
        <FeaturesGrid />
        <IndustrySolutions />
        <HowItWorks />
        <ProductModules />
        <ComplianceSafety />
        <ReportingAnalytics />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

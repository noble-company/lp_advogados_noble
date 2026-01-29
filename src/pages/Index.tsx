import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import PainPointsSection from "@/components/PainPointsSection";
import SolutionPresentationSection from "@/components/SolutionPresentationSection";
import ThreePillarsSection from "@/components/ThreePillarsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TangibleBenefitsSection from "@/components/TangibleBenefitsSection";
import SocialProofSection from "@/components/SocialProofSection";
import GuaranteesSection from "@/components/GuaranteesSection";
import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import ROICalculator from "@/components/ROICalculator";
import { useScrollDepthTracking } from "@/hooks/useScrollDepthTracking";

const Index = () => {
  // Track user scroll depth for engagement analytics
  useScrollDepthTracking();
  return (
    <>
      <main className="min-h-screen">
        <HeroSection />
        <StatsSection />
        <PainPointsSection />
        <ROICalculator />
        <SolutionPresentationSection />
        <ThreePillarsSection />
        <HowItWorksSection />
        <TangibleBenefitsSection />
        <SocialProofSection />
        <GuaranteesSection />

        <FAQSection />
        <Footer />
      </main>
      <FloatingCTA />
    </>
  );
};

export default Index;

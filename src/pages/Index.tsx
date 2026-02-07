import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import PainPointsSection from "@/components/PainPointsSection";
import ThreePillarsSection from "@/components/ThreePillarsSection";
import TangibleBenefitsSection from "@/components/TangibleBenefitsSection";
import SocialProofSection from "@/components/SocialProofSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
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
        <ThreePillarsSection />
        <TangibleBenefitsSection />
        <SocialProofSection />
        <Footer />
      </main>
      <FloatingCTA />
    </>
  );
};

export default Index;

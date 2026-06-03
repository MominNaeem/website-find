import { useState, useEffect } from "react";
import { SEOHead } from "./components/SEOHead";
import { LoadingScreen } from "./components/LoadingScreen";
import { CustomCursor } from "./components/CustomCursor";
import { GrainOverlay } from "./components/GrainOverlay";
import { ScrollProgress } from "./components/ScrollProgress";
import { FloatingCTA } from "./components/FloatingCTA";
import { StickyCTABar } from "./components/StickyCTABar";
import { Toast } from "./components/Toast";
import { BookingModal } from "./components/BookingModal";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { FeaturedIn } from "./components/FeaturedIn";
import { ClientLogos } from "./components/ClientLogos";
import { TrustBadges } from "./components/TrustBadges";
import { Services } from "./components/Services";
import { VideoSection } from "./components/VideoSection";
import { BeforeAfterSlider } from "./components/BeforeAfterSlider";
import { ProcessTimeline } from "./components/ProcessTimeline";
import { Stats } from "./components/Stats";
import { ROICalculator } from "./components/ROICalculator";
import { Testimonials } from "./components/Testimonials";
import { ComparisonTable } from "./components/ComparisonTable";
import { CalendlySection } from "./components/CalendlySection";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { UrgencyBanner } from "./components/UrgencyBanner";
import { ExitIntentPopup } from "./components/ExitIntentPopup";
import { NewsletterPopup } from "./components/NewsletterPopup";
import { SocialProofNotifications } from "./components/SocialProofNotifications";
import { PerformanceBadge } from "./components/PerformanceBadge";
import { VisitorCounter } from "./components/VisitorCounter";

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleBookingSuccess = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <SEOHead />
      <LoadingScreen />
      <CustomCursor />
      <GrainOverlay />
      <ScrollProgress />
      <UrgencyBanner />
      <StickyCTABar onBookCall={() => setIsBookingOpen(true)} />
      <FloatingCTA onBookCall={() => setIsBookingOpen(true)} />
      <PerformanceBadge />
      <VisitorCounter />
      <SocialProofNotifications />
      <ExitIntentPopup onBookCall={() => setIsBookingOpen(true)} />
      <NewsletterPopup />
      <Toast
        message="🎉 Request received! We'll send your free audit within 24 hours."
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onSuccess={handleBookingSuccess}
      />
      <Navbar onBookCall={() => setIsBookingOpen(true)} />
      <Hero onBookCall={() => setIsBookingOpen(true)} />
      <FeaturedIn />
      <ClientLogos />
      <TrustBadges />
      <Services onBookCall={() => setIsBookingOpen(true)} />
      <VideoSection />
      <BeforeAfterSlider />
      <ProcessTimeline />
      <Stats />
      <ROICalculator />
      <Testimonials />
      <ComparisonTable />
      <CalendlySection onBookCall={() => setIsBookingOpen(true)} />
      <FAQ />
      <CTA onBookCall={() => setIsBookingOpen(true)} />
      <Footer />
    </div>
  );
}
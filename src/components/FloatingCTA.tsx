import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConversionForm from "./ConversionForm";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating CTA Button */}
      <div
        className={`fixed bottom-4 left-0 right-0 z-50 px-4 transition-all duration-300 md:hidden ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-20 opacity-0"
        }`}
      >
        <Button
          onClick={() => setShowForm(true)}
          className="h-14 w-full animate-pulse bg-gradient-to-r from-orange-500 to-orange-600 text-base font-bold text-white shadow-2xl hover:from-orange-600 hover:to-orange-700 hover:scale-105"
        >
          GARANTIR MINHA VAGA
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>

      {/* Conversion Form Modal */}
      <ConversionForm isOpen={showForm} onClose={() => setShowForm(false)} />
    </>
  );
};

export default FloatingCTA;

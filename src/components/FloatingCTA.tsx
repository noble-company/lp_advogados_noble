import { useState, useEffect } from "react";
import { MessageCircle, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_CONFIG } from "@/lib/constants";

const WHATSAPP_LINK = WHATSAPP_CONFIG.getLink('default');

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show tooltip briefly after button appears
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowTooltip(true), 500);
      const hideTimer = setTimeout(() => setShowTooltip(false), 5000);
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [isVisible]);

  return (
    <>
      {/* Desktop Floating Button - Bottom Right */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 hidden md:block"
          >
            <div className="relative">
              {/* Tooltip */}
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="absolute right-full top-1/2 -translate-y-1/2 mr-4 whitespace-nowrap"
                  >
                    <div className="relative rounded-xl bg-primary px-4 py-3 shadow-2xl border border-white/10">
                      <p className="text-sm font-semibold text-white">
                        💬 Fale com um especialista agora!
                      </p>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 h-3 w-3 bg-primary border-r border-t border-white/10" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Button */}
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-success to-success/80 shadow-2xl shadow-success/40 hover:shadow-success/60 transition-all"
                >
                  {/* Pulse animation */}
                  <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-30" />
                  
                  {/* Icon */}
                  <MessageCircle className="relative z-10 h-8 w-8 text-white" />
                  
                  {/* Badge */}
                  <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-white animate-bounce">
                    1
                  </span>
                </motion.button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Floating Button - Bottom Full Width */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 md:hidden bg-gradient-to-t from-background via-background/95 to-transparent pt-3"
          >
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block">
              <Button
                className="btn-noble group h-14 w-full text-sm font-bold text-white shadow-2xl shadow-accent/30"
              >
                <MessageCircle className="mr-1.5 h-4 w-4" />
                FALAR COM ESPECIALISTA
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <p className="mt-1.5 text-center text-[10px] text-foreground/70">
              ⚡ Resposta em até 5 minutos
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingCTA;

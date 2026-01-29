import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_CONFIG } from "@/lib/constants";
import { useTracking } from "@/hooks/useTracking";

interface WhatsAppCTAButtonProps {
  messageKey?: keyof typeof WHATSAPP_CONFIG.messages;
  variant?: "default" | "hero" | "floating" | "minimal";
  size?: "default" | "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export const WhatsAppCTAButton = ({ 
  messageKey = "default",
  variant = "default",
  size = "lg",
  className = "",
  children
}: WhatsAppCTAButtonProps) => {
  const link = WHATSAPP_CONFIG.getLink(messageKey);
  const { trackWhatsAppClick } = useTracking();
  
  const handleClick = () => {
    trackWhatsAppClick({
      buttonLocation: variant,
      messageKey,
      variant,
    });
  };
  
  const variants = {
    default: "bg-green-800 hover:bg-green-700 active:bg-green-900 text-white shadow-lg hover:shadow-xl",
    hero: "bg-green-800 hover:bg-green-700 active:bg-green-900 text-white shadow-lg hover:shadow-xl",
    floating: "bg-green-600 hover:bg-green-700 active:bg-green-800 text-white shadow-xl",
    minimal: "bg-success hover:bg-success/90 active:bg-success/80 text-white",
  };

  const defaultText = {
    default: "FALAR COM ESPECIALISTA",
    hero: "QUERO CAPTAR MAIS CLIENTES",
    floating: "Falar no WhatsApp",
    minimal: "Começar Agora",
  };

  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="inline-block w-full sm:w-auto"
      onClick={handleClick}
    >
      <Button 
        size={size}
        className={`group transition-all w-full sm:w-auto ${variants[variant]} ${className}`}
      >
        {variant === "floating" && <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />}
        <span className="truncate">{children || defaultText[variant]}</span>
        <ArrowRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
      </Button>
    </a>
  );
};

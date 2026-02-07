import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";

interface WhatsAppCTAButtonProps {
  messageKey?: string;
  variant?: "default" | "hero" | "floating" | "minimal";
  size?: "default" | "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export const WhatsAppCTAButton = ({ 
  variant = "default",
  size = "lg",
  className = "",
  children
}: WhatsAppCTAButtonProps) => {
  const { openLeadForm } = useLeadForm();
  
  const variants = {
    default: "bg-green-800 hover:bg-green-700 active:bg-green-900 text-white shadow-lg hover:shadow-xl",
    hero: "bg-green-800 hover:bg-green-700 active:bg-green-900 text-white shadow-lg hover:shadow-xl",
    floating: "bg-green-600 hover:bg-green-700 active:bg-green-800 text-white shadow-xl",
    minimal: "bg-success hover:bg-success/90 active:bg-success/80 text-white",
  };

  const defaultText = {
    default: "FALAR COM ESPECIALISTA",
    hero: "QUERO CAPTAR MAIS CLIENTES",
    floating: "Falar com Especialista",
    minimal: "Começar Agora",
  };

  return (
    <div className="inline-block w-full sm:w-auto">
      <Button 
        size={size}
        onClick={openLeadForm}
        className={`group transition-all w-full sm:w-auto cursor-pointer ${variants[variant]} ${className}`}
      >
        {variant === "floating" && <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />}
        <span className="truncate">{children || defaultText[variant]}</span>
        <ArrowRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
};

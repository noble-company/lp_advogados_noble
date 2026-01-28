import { Check, ArrowRight, Star, AlertTriangle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppMockup from "./WhatsAppMockup";

// Configure your WhatsApp number here
const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Vi a apresentação sobre os Agentes de IA para advocacia e gostaria de saber mais."
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const HeroSection = () => {
  const benefits = [
    "Setup em 7 dias (feito 100% por nós)",
    "Primeiros resultados em 30 dias",
    "Garantia incondicional de 60 dias + R$ 1.000 se não funcionar",
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-hero-gradient">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Guarantee Badge - Top Right */}
      <div className="absolute right-4 top-4 z-20 opacity-0 animate-fade-in-up animation-delay-100 md:right-8 md:top-8">
        <div className="flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm border border-primary-foreground/20">
          <Shield className="h-5 w-5 text-success" />
          <span className="text-sm font-semibold text-primary-foreground">
            Garantia 60 dias + R$ 1.000
          </span>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Headline */}
            <h1 className="opacity-0 animate-fade-in-up text-3xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
              Como Captar{" "}
              <span className="text-accent">3-5 Novos Clientes</span>{" "}
              Jurídicos Por Mês No Automático em{" "}
              <span className="text-accent">30 Dias</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 opacity-0 animate-fade-in-up animation-delay-100 text-lg text-primary-foreground/80 md:text-xl">
              (Sem Contratar Atendente, Sem Mudar Sua Rotina, Sem Gastar Mais Com Ads)
            </p>

            {/* Benefits List */}
            <ul className="mt-8 space-y-4 opacity-0 animate-fade-in-up animation-delay-200">
              {benefits.map((benefit, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3 text-left"
                >
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-success">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-base text-primary-foreground md:text-lg">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="mt-10 flex flex-col items-center gap-4 opacity-0 animate-fade-in-up animation-delay-300 lg:items-start">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="group h-14 animate-pulse-glow bg-cta px-8 text-lg font-bold text-cta-foreground shadow-lg transition-all hover:bg-cta/90 hover:scale-105"
                >
                  QUERO CAPTAR MAIS CLIENTES
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              
              <p className="text-sm text-primary-foreground/70">
                👇 Agende uma demonstração gratuita de 15min e veja funcionando ao vivo
              </p>
            </div>

            {/* Social Proof */}
            <div className="mt-8 flex flex-col items-center gap-4 opacity-0 animate-fade-in-up animation-delay-400 sm:flex-row sm:gap-6 lg:items-start">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                ))}
                <span className="ml-2 font-semibold text-primary-foreground">4.9/5</span>
              </div>
              <div className="h-4 w-px bg-primary-foreground/30 hidden sm:block" />
              <span className="text-sm text-primary-foreground/80">
                +40% média de aumento em conversão
              </span>
            </div>

            {/* Urgency Counter */}
            <div className="mt-6 opacity-0 animate-fade-in-up animation-delay-500">
              <div className="inline-flex items-center gap-2 rounded-lg bg-warning/20 px-4 py-2 border border-warning/30">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span className="text-sm font-semibold text-warning">
                  ⚠️ Restam apenas 2 vagas este mês
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - WhatsApp Mockup */}
          <div className="flex justify-center opacity-0 animate-fade-in-up animation-delay-300 lg:justify-end">
            <div className="animate-float">
              <WhatsAppMockup />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/20 to-transparent" />
    </section>
  );
};

export default HeroSection;

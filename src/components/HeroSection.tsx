import { Check, Star, Shield } from "lucide-react";
import WhatsAppMockup from "./WhatsAppMockup";
import { WhatsAppCTAButton } from "./WhatsAppCTAButton";
import { WHATSAPP_CONFIG } from "@/lib/constants";

const HeroSection = () => {
  const benefits = [
    "Setup em 7 dias (feito 100% por nós)",
    "Primeiros resultados em 30 dias",
    "Garantia incondicional de 60 dias",
  ];


  return (
    <section className="relative min-h-screen overflow-hidden bg-noble-gradient">
      {/* Animated Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.6'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Guarantee Badge - Top Right */}
      <div className="absolute right-2 top-2 z-20 sm:right-4 sm:top-4 md:right-8 md:top-8">
        <div className="flex items-center gap-1.5 sm:gap-2 rounded-full bg-primary-foreground/10 px-2.5 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm border border-primary-foreground/20">
          <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
          <span className="text-xs sm:text-sm font-semibold text-primary-foreground">
            Garantia 60 dias
          </span>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-3 py-8 sm:px-4 sm:py-12 md:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Headline */}
            <h1 className="text-[1.75rem] leading-[1.2] font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
              Como Captar{" "}
              <span className="text-green-800">3-5 Novos Clientes</span>{" "}
              Jurídicos Por Mês No Automático em{" "}
              <span className="text-green-800">30 Dias</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-primary-foreground/80 md:text-xl leading-relaxed">
              (Sem Contratar Atendente, Sem Mudar Sua Rotina, Sem Gastar Mais Com Ads)
            </p>

            {/* Benefits List */}
            <ul className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              {benefits.map((benefit, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-2.5 sm:gap-3 text-left"
                >
                  <div className="mt-0.5 flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-full bg-success">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-primary-foreground" />
                  </div>
                  <span className="text-sm sm:text-base text-primary-foreground md:text-lg">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3 sm:gap-4 lg:items-start w-full lg:w-auto">
              <WhatsAppCTAButton 
                messageKey="hero"
                variant="hero"
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-bold w-full sm:w-auto"
              />
              
              <p className="text-xs sm:text-sm text-primary-foreground/70 text-center lg:text-left">
                👇 Agende uma demonstração gratuita de 15min e veja funcionando ao vivo
              </p>
            </div>

            {/* Social Proof */}
            <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-6 lg:items-start">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-warning text-warning" />
                ))}
                <span className="ml-1.5 sm:ml-2 text-sm sm:text-base font-semibold text-primary-foreground">4.9/5</span>
              </div>
              <div className="h-4 w-px bg-primary-foreground/30 hidden sm:block" />
              <span className="text-xs sm:text-sm text-primary-foreground/80 text-center sm:text-left">
                +40% média de aumento em conversão
              </span>
            </div>
          </div>

          {/* Right Column - WhatsApp Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div>
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

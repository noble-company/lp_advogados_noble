import { Check, ArrowRight, Star, Shield, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import WhatsAppMockup from "./WhatsAppMockup";

// Noble Company WhatsApp Configuration
const WHATSAPP_NUMBER = "5535911013 80";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá Noble Company! Vi a apresentação sobre os Agentes de IA para advocacia e gostaria de saber mais sobre como posso captar mais clientes qualificados."
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const HeroSection = () => {
  const benefits = [
    { text: "Setup completo em 7 dias (feito 100% pela Noble Company)", icon: Clock },
    { text: "Primeiros clientes qualificados em 30 dias ou menos", icon: TrendingUp },
    { text: "Garantia incondicional de satisfação por 60 dias", icon: Shield },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-noble-gradient">
      {/* Animated Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.6'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />

      {/* Trust Badges - Top */}
      <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2 md:top-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 md:gap-6"
        >
          <div className="glass-effect flex items-center gap-2 rounded-full px-4 py-2 shadow-lg">
            <Shield className="h-4 w-4 text-success" />
            <span className="text-xs font-semibold text-white md:text-sm">
              Garantia 60 dias
            </span>
          </div>
          <div className="glass-effect flex items-center gap-2 rounded-full px-4 py-2 shadow-lg">
            <TrendingUp className="h-4 w-4 text-warning" />
            <span className="text-xs font-semibold text-white md:text-sm">
              +40% conversão média
            </span>
          </div>
        </motion.div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 md:py-28 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left Column - Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Company Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/30 px-4 py-2">
                <span className="text-sm font-bold text-accent">NOBLE COMPANY</span>
                <span className="text-sm text-white">•</span>
                <span className="text-sm text-white/90">Tecnologia Jurídica</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl"
            >
              Como Captar{" "}
              <span className="text-gradient-noble">3-5 Novos Clientes</span>{" "}
              Jurídicos Por Mês{" "}
              <span className="relative inline-block">
                <span className="relative z-10">No Automático</span>
                <span className="absolute bottom-1 left-0 h-3 w-full bg-accent/30 -rotate-1"></span>
              </span>{" "}
              em 30 Dias
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg text-white/80 md:text-xl lg:text-2xl font-light"
            >
              Sem Contratar Atendente • Sem Mudar Sua Rotina • Sem Gastar Mais Com Ads
            </motion.p>

            {/* Benefits List */}
            <motion.ul variants={itemVariants} className="mt-10 w-full space-y-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.li
                    key={index}
                    className="group flex items-start gap-4 rounded-xl bg-white/5 p-4 backdrop-blur-sm border border-white/10 transition-all hover:bg-white/10 hover:border-accent/30"
                    whileHover={{ x: 5 }}
                  >
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-success shadow-lg shadow-success/20">
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-base text-white md:text-lg font-medium">
                      {benefit.text}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col items-center gap-4 lg:items-start w-full"
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="btn-noble group h-16 w-full sm:w-auto px-8 text-lg font-bold text-white shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all hover:scale-105"
                >
                  <span className="mr-3 text-xl">💬</span>
                  FALAR COM ESPECIALISTA AGORA
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>

              <p className="text-sm text-white/60 text-center lg:text-left">
                ⚡ Resposta em até 5 minutos • 100% gratuito • Sem compromisso
              </p>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:gap-8 lg:items-start"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-warning text-warning drop-shadow-md"
                    />
                  ))}
                </div>
                <span className="ml-2 text-lg font-bold text-white">4.9/5</span>
              </div>
              <div className="h-6 w-px bg-white/20 hidden sm:block" />
              <span className="text-sm text-white/70 font-medium">
                <strong className="text-white">+50 escritórios</strong> já automatizaram
              </span>
            </motion.div>
          </div>

          {/* Right Column - WhatsApp Mockup */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Glow effect behind mockup */}
              <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full transform scale-110" />
              <div className="relative z-10">
                <WhatsAppMockup />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent opacity-50" />
    </section>
  );
};

export default HeroSection;

const HeroSection = () => {
  const benefits = [
    "Setup em 7 dias (feito 100% por nós)",
    "Primeiros resultados em 30 dias",
    "Garantia incondicional de 60 dias",
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
            Garantia 60 dias
          </span>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Headline */}
            <h1 className="opacity-0 animate-fade-in-up text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
              Como Captar{" "}
              <span className="text-green-800">3-5 Novos Clientes</span>{" "}
              Jurídicos Por Mês No Automático em{" "}
              <span className="text-green-800">30 Dias</span>
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
                  className="group h-14 animate-pulse-glow bg-green-800 px-8 text-lg font-bold text-white shadow-lg transition-all hover:bg-green-700 hover:scale-105"
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

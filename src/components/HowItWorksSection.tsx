import { ArrowDown, MessageCircle, Zap, Brain, Calendar, Bell, User, Briefcase, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "553591101380";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá Noble Company! Quero entender melhor como o processo funciona. Pode me explicar?"
);

const HowItWorksSection = () => {
  const clientSteps = [
    {
      number: 1,
      icon: MessageCircle,
      title: "Lead envia mensagem no seu WhatsApp",
      example: "'Oi, preciso de um advogado para X...'",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      number: 2,
      icon: Zap,
      title: "Sistema responde em menos de 2min",
      example:
        "'Olá! Atendemos sim. Para te ajudar melhor, preciso entender alguns detalhes...'",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      number: 3,
      icon: Brain,
      title: "IA faz perguntas de qualificação",
      example:
        "'Qual o valor envolvido?' 'Há quanto tempo?' 'Você já tentou resolver?' (etc)",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      number: 4,
      icon: Calendar,
      title: "Sistema agenda automaticamente",
      example:
        "'Perfeito! Tenho uma vaga segunda às 10h. Confirmo para você?'",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      number: 5,
      icon: Bell,
      title: "Envio de confirmação e lembretes",
      example: "(1 dia antes e 1h antes da consulta)",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  const lawyerSteps = [
    {
      number: 1,
      icon: Bell,
      title: "Você recebe notificação",
      example:
        "'Novo lead qualificado: João Silva | Caso: Trabalhista - Valor: R$ 15k | Consulta agendada: Seg 10h'",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      number: 2,
      icon: User,
      title: "Você revisa o resumo do caso",
      example: "(5 minutos antes da call)",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      number: 3,
      icon: Briefcase,
      title: "Você entra na reunião",
      example: "Lead já está qualificado, contexto claro, pronto para fechar",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  const stepVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    }),
  };

  return (
    <section className="relative bg-noble-gradient py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 h-96 w-96 rounded-full bg-accent blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-success blur-3xl animate-pulse" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 backdrop-blur-sm">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="text-sm font-bold text-white uppercase tracking-wide">
              Processo Simples
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            📋 Como Funciona <span className="text-accent">(Passo a Passo)</span>
          </h2>
          <p className="mt-4 text-lg text-white/80 md:text-xl max-w-3xl mx-auto">
            Do primeiro contato até o fechamento - tudo no automático
          </p>
        </motion.div>

        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold text-success md:text-4xl"
          >
            🎯 Para o Seu Cliente <span className="text-white/60">(Lado de Fora)</span>
          </motion.h3>

          <div className="mx-auto max-w-4xl">
            {clientSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index}>
                  <motion.div
                    custom={index}
                    variants={stepVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ x: 10 }}
                    className="group rounded-2xl bg-card border-2 border-border p-6 shadow-xl hover:border-success/50 hover:shadow-2xl transition-all duration-300 md:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl ${step.bgColor} group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-7 w-7 ${step.color}`} />
                      </div>

                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <span className={`text-3xl font-black ${step.color}`}>
                            {step.number}
                          </span>
                          <h4 className="text-xl font-bold text-foreground md:text-2xl">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-base italic text-muted-foreground leading-relaxed md:text-lg">
                          {step.example}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {index < clientSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                      className="flex justify-center py-6"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20 backdrop-blur-sm">
                        <ArrowDown className="h-6 w-6 text-success animate-bounce-subtle" />
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-20 h-1 w-full max-w-4xl bg-gradient-to-r from-transparent via-accent to-transparent"
        />

        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold text-warning md:text-4xl"
          >
            👨‍💼 Para Você <span className="text-white/60">(Lado de Dentro)</span>
          </motion.h3>

          <div className="mx-auto max-w-4xl">
            {lawyerSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index}>
                  <motion.div
                    custom={index}
                    variants={stepVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ x: 10 }}
                    className="group rounded-2xl bg-card border-2 border-border p-6 shadow-xl hover:border-warning/50 hover:shadow-2xl transition-all duration-300 md:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl ${step.bgColor} group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-7 w-7 ${step.color}`} />
                      </div>

                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <span className={`text-3xl font-black ${step.color}`}>
                            {step.number}
                          </span>
                          <h4 className="text-xl font-bold text-foreground md:text-2xl">
                            {step.title}
                          </h4>
                        </div>
                        <p className="text-base text-muted-foreground leading-relaxed md:text-lg">
                          {step.example}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {index < lawyerSteps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                      className="flex justify-center py-6"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/20 backdrop-blur-sm">
                        <ArrowDown className="h-6 w-6 text-warning animate-bounce-subtle" />
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-accent via-accent to-accent/80 p-8 text-center shadow-2xl border-4 border-white/20 md:p-12"
        >
          <div className="mb-6 text-7xl md:text-8xl">⏱️</div>
          <h3 className="mb-6 text-4xl font-black text-white md:text-5xl">
            Tempo Total Que Você Gasta: <span className="text-success">ZERO</span>
          </h3>
          <p className="text-2xl font-semibold text-white/90 md:text-3xl mb-8">
            O sistema faz TODO o trabalho pesado.<br />
            Você só aparece para a parte boa: <span className="text-warning">fechar o cliente</span>.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-white text-accent hover:bg-white/90 h-14 px-8 text-lg font-bold shadow-xl"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              QUERO ESSE PROCESSO NO MEU ESCRITÓRIO
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

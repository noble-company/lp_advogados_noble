import { Calendar, Zap, Brain, Shield, Check } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainerSlowVariants, fadeInUpVariants } from "@/lib/animations";

const ThreePillarsSection = () => {
  const pillars = [
    {
      icon: Zap,
      iconColor: "text-accent",
      iconBg: "bg-accent/10",
      number: "01",
      title: "Atendimento Instantâneo 24/7",
      description: "Nunca mais perca um cliente por demora na resposta",
      benefits: [
        "Responde em menos de 2 minutos, qualquer hora do dia",
        "Linguagem natural e humanizada (cliente nem percebe)",
        "Funciona em feriados, fins de semana e madrugadas",
        "Fim das mensagens perdidas e leads impacientes",
      ],
    },
    {
      icon: Brain,
      iconColor: "text-success",
      iconBg: "bg-success/10",
      number: "02",
      title: "Qualificação Automática Inteligente",
      description: "Filtra curiosos e entrega apenas leads prontos para fechar",
      benefits: [
        "Faz as perguntas certas personalizadas para seu nicho",
        "Identifica casos viáveis vs curiosos automaticamente",
        "Filtra leads desqualificados antes de chegar em você",
        "Só encaminha quem tem potencial real de conversão",
      ],
    },
    {
      icon: Calendar,
      iconColor: "text-warning",
      iconBg: "bg-warning/10",
      number: "03",
      title: "Agendamento Inteligente",
      description: "Agenda automática sincronizada com sua disponibilidade",
      benefits: [
        "Marca consultas direto na sua agenda Google/Outlook",
        "Envia confirmações e lembretes por email/WhatsApp",
        "Reduz no-shows em até 70% com lembretes automáticos",
        "Você só aparece para reuniões com leads qualificados",
      ],
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-background via-muted/20 to-background py-12 sm:py-16 md:py-20 lg:py-32">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-success/30 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-3 sm:px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 md:mb-16 text-center"
        >
          <div className="mb-3 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-accent/10 border border-accent/20 px-3 py-1.5 sm:px-4 sm:py-2">
            <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
            <span className="text-xs sm:text-sm font-bold text-accent uppercase tracking-wide">
              Como Funciona
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground md:text-4xl lg:text-5xl xl:text-6xl px-2">
            ⚡ Os 3 Pilares do <span className="text-accent">Sistema Noble</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto px-4">
            A combinação perfeita de velocidade, inteligência e automação para captar mais clientes
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={staggerContainerSlowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-3xl border-2 border-border bg-card p-8 shadow-lg hover:border-accent/50 hover:shadow-2xl transition-all duration-300"
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-all duration-500" />

                <div className="relative z-10">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -right-4 text-8xl font-black text-muted/10 group-hover:text-accent/10 transition-colors">
                    {pillar.number}
                  </div>

                  {/* Icon */}
                  <div className={`relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${pillar.iconBg} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className={`h-8 w-8 ${pillar.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="relative mb-3 text-2xl font-bold text-foreground">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-sm text-muted-foreground font-medium">
                    {pillar.description}
                  </p>

                  {/* Benefits List */}
                  <div className="space-y-3">
                    {pillar.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-success/20">
                          <Check className="h-3 w-3 text-success" />
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative corner element */}
                <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-all duration-500" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-success/10 border border-success/20 px-6 py-3">
            <Check className="h-5 w-5 text-success" />
            <span className="text-sm font-semibold text-foreground">
              Tudo isso rodando 100% no automático, enquanto você foca no que realmente importa: <strong className="text-accent">fechar casos</strong>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThreePillarsSection;

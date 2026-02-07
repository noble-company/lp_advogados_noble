import { TrendingUp, Clock, DollarSign, Sparkles, Target, CheckCircle2, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLeadForm } from "@/hooks/useLeadForm";

const TangibleBenefitsSection = () => {
  const { openLeadForm } = useLeadForm();
  const benefits = [
    {
      icon: TrendingUp,
      title: "MAIS CLIENTES",
      items: [
        "Taxa de conversão sobe 20-40%",
        "Cada lead vira oportunidade real",
        "Qualificação automática = menos perda",
      ],
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: Clock,
      title: "MAIS TEMPO",
      items: [
        "15-20h/semana economizadas",
        "Zero tempo em WhatsApp",
        "Fim das ligações perdidas",
      ],
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: DollarSign,
      title: "MAIS LUCRO",
      items: [
        "+R$ 50-150k faturamento/ano",
        "Sem contratar SDR/recepcionista",
        "ROI positivo em 30-45 dias",
      ],
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Sparkles,
      title: "MAIS PREVISIBILIDADE",
      items: [
        "Agenda sempre cheia",
        "Pipeline organizado",
        "Dados claros de performance",
      ],
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      icon: Target,
      title: "MAIS FOCO",
      items: [
        "Você só atende leads qualificados",
        "Fim do retrabalho",
        "Mais estratégia, menos operacional",
      ],
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  const beforeData = [
    { label: "Conversão", value: "5-10%", color: "text-destructive" },
    { label: "Tempo/Lead", value: "45min", color: "text-destructive" },
    { label: "Leads Perdidos", value: "60-70%", color: "text-destructive" },
    { label: "Custo Operacional", value: "Alto", color: "text-destructive" },
  ];

  const afterData = [
    { label: "Conversão", value: "20-40%", color: "text-success" },
    { label: "Tempo/Lead", value: "0min", color: "text-success" },
    { label: "Leads Perdidos", value: "0%", color: "text-success" },
    { label: "Custo Operacional", value: "Mínimo", color: "text-success" },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    }),
  };

  return (
    <section className="relative bg-background py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 h-80 w-80 rounded-full bg-success blur-3xl" />
        <div className="absolute bottom-40 left-20 h-80 w-80 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-success/10 border border-success/20 px-4 py-2">
            <Sparkles className="h-4 w-4 text-success" />
            <span className="text-sm font-bold text-success uppercase tracking-wide">
              Resultados Reais
            </span>
          </div>
          <h2 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            💎 Benefícios <span className="text-gradient-noble">Tangíveis & Mensuráveis</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
            Não é teoria. São resultados que você vai ver na conta bancária.
          </p>
        </motion.div>

        <div className="mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -10 }}
                className="group rounded-2xl bg-card border-2 border-border p-6 shadow-lg hover:border-accent/50 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${benefit.bgColor} group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-7 w-7 ${benefit.color}`} />
                </div>
                <h3 className={`mb-4 text-2xl font-black ${benefit.color}`}>
                  {benefit.title}
                </h3>
                <ul className="space-y-2">
                  {benefit.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-success" />
                      <span className="text-base text-muted-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="mb-10 text-center text-3xl font-bold text-foreground md:text-4xl">
            ⚖️ Antes vs Depois <span className="text-accent">(Comparação Real)</span>
          </h3>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl bg-gradient-to-br from-destructive/10 to-destructive/5 border-2 border-destructive/30 p-8 shadow-xl"
            >
              <h4 className="mb-6 text-center text-2xl font-black text-destructive">
                ❌ SEM O SISTEMA
              </h4>
              <div className="space-y-4">
                {beforeData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-card/50 p-4"
                  >
                    <span className="font-semibold text-foreground">
                      {item.label}:
                    </span>
                    <span className={`text-xl font-black ${item.color}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/30 p-8 shadow-xl"
            >
              <h4 className="mb-6 text-center text-2xl font-black text-success">
                ✅ COM O SISTEMA
              </h4>
              <div className="space-y-4">
                {afterData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-card/50 p-4"
                  >
                    <span className="font-semibold text-foreground">
                      {item.label}:
                    </span>
                    <span className={`text-xl font-black ${item.color}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-accent via-accent to-accent/80 p-8 text-center shadow-2xl border-4 border-white/20 md:p-12"
        >
          <p className="text-2xl font-black text-white md:text-3xl lg:text-4xl mb-8">
            <span className="text-success">Resultado:</span> +250% de conversão | +R$ 420k/ano | <span className="text-warning">15 horas/semana</span> recuperadas
          </p>
          <div className="flex justify-center">
              <Button
                size="lg"
                onClick={openLeadForm}
                className="bg-green-600 text-white hover:bg-green-700 active:bg-green-800 h-16 sm:h-14 px-4 sm:px-8 text-sm sm:text-lg font-bold shadow-xl w-full sm:w-auto flex flex-wrap items-center justify-center gap-2 sm:gap-2 cursor-pointer"
              >
                <MessageCircle className="h-5 w-5 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="hidden sm:inline">QUERO ESSES RESULTADOS TAMBÉM</span>
                <span className="sm:hidden text-center">QUERO ESSES RESULTADOS<br />TAMBÉM</span>
              </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TangibleBenefitsSection;

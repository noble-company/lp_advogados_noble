import { TrendingUp, Clock, DollarSign, Sparkles, Target, CheckCircle2, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Noble Company WhatsApp Configuration
const WHATSAPP_NUMBER = "553591101380";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá Noble Company! Vi os resultados tangíveis que o sistema entrega. Quero saber como implementar no meu escritório!"
);

const TangibleBenefitsSection = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "MAIS CLIENTES",
      items: [
        "Taxa de conversão sobe 40-60%",
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
    { label: "Conversão", value: "40-60%", color: "text-success" },
    { label: "Tempo/Lead", value: "0min", color: "text-success" },
    { label: "Leads Perdidos", value: "5-10%", color: "text-success" },
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
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section className="relative bg-background py-20 md:py-32 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 right-20 h-80 w-80 rounded-full bg-success blur-3xl" />
        <div className="absolute bottom-40 left-20 h-80 w-80 rounded-full bg-accent blur-3xl" />
      </div>

      <div className=Grid */}
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
         motion.div
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
            {/* Before Box */}
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

            {/* After Box */}
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
        </motion.    <ul className="space-y-3">
                {beforeData.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-800"
                  >
                    <span className="mt-1 text-red-600">•</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After Box */}
            <div className="rounded-xl bg-green-50 p-6 shadow-lg md:p-8">
              <h4 className="mb-4 text-center text-xl font-bold text-green-800 md:text-2xl">
                DEPOIS DO SISTEMA:
              </h4>
              <ul className="space-y-3">
                {afterData.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-800"
                  >
                    <span className="mt-1 text-green-600">✓</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Result Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl rounded-3xl bg-gradient-noble p-8 text-center shadow-2xl border-4 border-white/10 md:p-12"
        >
          <p className="text-2xl font-black text-white md:text-3xl lg:text-4xl mb-8">
            <span className="text-success">Resultado:</span> +250% de conversão | +R$ 420k/ano | <span className="text-warning">15 horas/semana</span> recuperadas
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="btn-noble h-14 px-8 text-lg font-bold"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              QUERO ESSES RESULTADOS TAMBÉM
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TangibleBenefitsSection;

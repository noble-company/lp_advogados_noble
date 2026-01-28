import { X, Check, AlertCircle, TrendingDown, Clock, DollarSign, Zap } from "lucide-react";
import { motion } from "framer-motion";

const PainPointsSection = () => {
  const painPoints = [
    {
      icon: Clock,
      text: "Leads te procuram no WhatsApp mas você demora horas (ou dias) para responder - e quando responde, já contrataram outro escritório",
      impact: "alta",
    },
    {
      icon: TrendingDown,
      text: "Você perde entre 3-7 clientes em potencial TODO MÊS simplesmente por não conseguir atender rápido o suficiente",
      impact: "crítica",
    },
    {
      icon: AlertCircle,
      text: 'Sua equipe (ou você mesmo) gasta 70% do dia respondendo mensagens básicas: "Quanto custa?", "Vocês atendem X?", "Quais documentos?"',
      impact: "alta",
    },
    {
      icon: X,
      text: "Leads desqualificados tomam seu tempo enquanto os bons ficam esperando... e desistem",
      impact: "média",
    },
    {
      icon: Clock,
      text: 'Você trabalha até tarde da noite "só para responder o WhatsApp" e ainda assim não consegue dar conta',
      impact: "alta",
    },
    {
      icon: TrendingDown,
      text: "Fim de semana chega mensagem e segunda-feira o lead já fechou com seu concorrente",
      impact: "crítica",
    },
  ];

  const solutions = [
    {
      icon: Zap,
      text: "Responder TODOS os leads em menos de 2 minutos",
    },
    {
      icon: Clock,
      text: "Funcionar 24/7 (inclusive domingos e feriados)",
    },
    {
      icon: Check,
      text: "Qualificar automaticamente (filtra curiosos)",
    },
    {
      icon: Check,
      text: "Agendar consultas direto na sua agenda",
    },
    {
      icon: Check,
      text: "Sem você fazer ABSOLUTAMENTE NADA",
    },
  ];

  const impactColors = {
    crítica: "border-destructive/50 bg-destructive/5 hover:bg-destructive/10",
    alta: "border-accent/30 bg-accent/5 hover:bg-accent/10",
    média: "border-muted-foreground/30 bg-muted/30 hover:bg-muted/50",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Pain Points Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-destructive/10 border border-destructive/20 px-4 py-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <span className="text-sm font-bold text-destructive uppercase tracking-wide">
              A Realidade Dolorosa
            </span>
          </div>
          <h2 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            Reconhece Alguma Dessas{" "}
            <span className="text-destructive">Situações</span>?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
            Se pelo menos 2 desses problemas são familiares, você está deixando dinheiro na mesa
          </p>
        </motion.div>

        {/* Pain Points List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto max-w-4xl space-y-4 mb-16"
        >
          {painPoints.map((pain, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              className={`group flex items-start gap-4 rounded-xl border-2 p-6 transition-all duration-300 ${
                impactColors[pain.impact as keyof typeof impactColors]
              }`}
            >
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-destructive/10 border-2 border-destructive/30">
                <pain.icon className="h-5 w-5 text-destructive" />
              </div>
              <p className="text-foreground text-base md:text-lg leading-relaxed">{pain.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Cost Highlight Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-destructive/10 via-accent/10 to-destructive/10 border-2 border-accent/30 p-8 md:p-12 text-center shadow-2xl"
        >
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
              <DollarSign className="h-8 w-8 text-accent" />
            </div>
          </div>
          <h3 className="mb-8 text-3xl font-bold text-foreground md:text-4xl">
            💸 Quanto Isso Está Te Custando?
          </h3>
          <div className="space-y-6 text-lg text-foreground">
            <p className="text-xl">
              Se você capta em média <strong className="text-accent">1-2 clientes/mês</strong> de forma "orgânica" por indicação ou WhatsApp...
            </p>
            <p className="text-xl">
              E cada cliente vale entre <strong className="text-accent">R$ 5.000 - R$ 15.000</strong> para você...
            </p>
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="my-8 rounded-2xl bg-destructive/20 border-2 border-destructive/40 p-6"
            >
              <p className="text-2xl font-bold text-destructive md:text-3xl">
                Você está perdendo entre<br />
                <span className="text-4xl md:text-5xl">R$ 15.000 - R$ 105.000</span><br />
                POR MÊS
              </p>
              <p className="mt-4 text-muted-foreground text-base">
                em clientes que te procuraram mas não foram atendidos a tempo.
              </p>
            </motion.div>
            <p className="text-3xl font-black text-destructive md:text-4xl">
              São R$ 180.000 - R$ 1.260.000 POR ANO<br />
              <span className="text-2xl">jogados no lixo.</span>
            </p>
          </div>
        </motion.div>

        {/* Transition Section */}
        <div className="mt-20 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-3xl font-bold text-foreground md:text-4xl"
          >
            E se existisse uma forma de:
          </motion.h3>

          {/* Solutions List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto max-w-2xl space-y-4"
          >
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 rounded-xl bg-success/10 border-2 border-success/30 px-6 py-4 text-left shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-success shadow-md">
                  <solution.icon className="h-5 w-5 text-white" />
                </div>
                <p className="font-semibold text-foreground text-lg">{solution.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-2xl font-bold text-muted-foreground"
          >
            E sem contratar nenhum atendente?
          </motion.p>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            animate={{ y: [0, 10, 0] }}
            transition-animate={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="mt-8 text-5xl font-bold text-accent">
              ↓ Existe. ↓
            </p>
            <p className="mt-4 text-lg font-semibold text-accent">
              Continue lendo...
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Pain Points Title */}
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          Reconhece Alguma Dessas Situações?
        </h2>

        {/* Pain Points List */}
        <div className="mx-auto max-w-3xl space-y-4">
          {painPoints.map((pain, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:border-destructive/30 hover:bg-destructive/5"
            >
              <Square className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
              <p className="text-foreground">{pain}</p>
            </div>
          ))}
        </div>

        {/* Cost Highlight Box */}
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-accent/10 border-2 border-accent/30 p-8 text-center">
          <h3 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">
            💸 QUANTO ISSO ESTÁ TE CUSTANDO?
          </h3>
          <div className="space-y-4 text-lg text-foreground">
            <p>
              Se você capta em média 1-2 clientes/mês de forma "orgânica" por indicação ou WhatsApp...
            </p>
            <p>
              E cada cliente vale entre <strong>R$ 5.000 - R$ 15.000</strong> para você...
            </p>
            <p className="text-xl font-semibold text-destructive">
              Você está perdendo entre R$ 15.000 - R$ 105.000 POR MÊS em clientes que te procuraram mas não foram atendidos a tempo.
            </p>
            <p className="text-2xl font-bold text-destructive">
              São R$ 180.000 - R$ 1.260.000 POR ANO jogados no lixo.
            </p>
          </div>
        </div>

        {/* Transition Section */}
        <div className="mt-16 text-center">
          <h3 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">
            E se existisse uma forma de:
          </h3>

          {/* Solutions List */}
          <div className="mx-auto max-w-xl space-y-4">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-lg bg-success/10 px-6 py-3 text-left"
              >
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-success">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
                <p className="font-medium text-foreground">{solution}</p>
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <p className="mt-8 text-xl font-semibold text-muted-foreground">
            E sem contratar nenhum atendente?
          </p>

          {/* Arrow */}
          <p className="mt-6 text-3xl font-bold text-accent">
            ↓ Existe. ↓
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;

import { Shield, CheckCircle2, MessageCircle, Award, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Noble Company WhatsApp Configuration
const WHATSAPP_NUMBER = "553591101380";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá Noble Company! Quero conhecer as garantias do sistema e começar sem riscos!"
);

const GuaranteesSection = () => {
  const guarantees = [
    {
      number: "01",
      icon: Shield,
      title: "Garantia de Resultado em 30 Dias",
      text: "Se em 30 dias você não ver aumento na taxa de conversão de leads ou redução no tempo gasto com atendimento, devolvemos 100% do investimento.",
      subtext: "Sem burocracia. Sem perguntas. Simples assim.",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      number: "02",
      icon: Lock,
      title: "Garantia de Segurança Total",
      text: "Seus dados e dos seus clientes são criptografados e protegidos com os mais altos padrões de segurança (LGPD compliant).",
      subtext: "Privacidade e confidencialidade garantidas.",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      number: "03",
      icon: Award,
      title: "Garantia de Suporte Ilimitado",
      text: "Você nunca fica sozinho. Suporte técnico e treinamento completo inclusos, sem custo adicional, pelo tempo que precisar.",
      subtext: "Estamos com você do setup ao sucesso.",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section className="relative bg-noble-gradient py-20 md:py-32 overflow-hidden">
      {/* Decorative Background */}6 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            return (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative rounded-3xl bg-card border-2 border-border p-8 shadow-2xl hover:border-success/50 hover:shadow-3xl transition-all duration-300 overflow-hidden"
              >
                {/* Background Number */}
                <div className="absolute top-4 right-4 text-8xl font-black text-muted opacity-5">
                  {guarantee.number}
                </div>

                {/* Icon */}
                <div className={`relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${guarantee.bgColor} group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-8 w-8 ${guarantee.color}`} strokeWidth={2.5} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="mb-4 text-2xl font-black text-foreground">
                    {guarantee.title}
                  </h3>
                  <p className="mb-4 text-base text-muted-foreground leading-relaxed">
                    {guarantee.text}
                  </p>
                  <div className={`rounded-xl ${guarantee.bgColor} p-4 border-l-4 ${guarantee.color.replace('text-', 'border-')}`}>
                    <p className={`text-sm font-bold ${guarantee.color}`}>
                      {guarantee.subtext}
                    </p>
                  </div>
                </div>

                {/* Checkmark Badge */}
                <div className="absolute bottom-4 right-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${guarantee.bgColor}`}>
                    <CheckCircle2 className={`h-6 w-6 ${guarantee.color}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Explanation Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-4xl rounded-3xl bg-gradient-to-br from-warning/20 to-warning/10 border-2 border-warning/30 p-8 text-center md:p-12"
        >
          <div className="mb-6 text-6xl">💡</div>
          <h3 className="mb-6 text-3xl font-black text-foreground md:text-4xl">
            Por Que Oferecemos Isso?
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed md:text-xl">
            Porque sabemos que funciona. Já vimos dezenas de escritórios aumentarem conversão, recuperarem tempo e captarem mais clientes. Se não funcionar para você (o que é extremamente raro), não queremos seu dinheiro. Simples assim.
          </p>
        </motion.div>

        {/* Final Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-success via-success to-success/80 p-8 text-center shadow-2xl border-4 border-white/20 md:p-12"
        >
          <p className="text-3xl font-black text-white md:text-4xl lg:text-5xl mb-8">
            O risco é <span className="text-warning">TODO NOSSO</span>. Você só tem a <span className="text-accent">GANHAR</span>.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-white text-success hover:bg-white/90 h-14 px-8 text-lg font-bold shadow-xl"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              COMEÇAR AGORA SEM RISCOS
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GuaranteesSection;

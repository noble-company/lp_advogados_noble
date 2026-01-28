import { Quote, Play, Star, TrendingUp, Users, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Noble Company WhatsApp Configuration
const WHATSAPP_NUMBER = "553591101380";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá Noble Company! Vi os depoimentos de outros escritórios e gostaria de saber como posso ter resultados semelhantes."
);

const SocialProofSection = () => {
  const testimonials = [
    {
      text: "Antes eu perdia pelo menos 3-4 clientes por mês porque demorava para responder. Agora NENHUM lead fica sem resposta e minha conversão aumentou 40%. Melhor investimento que já fiz.",
      name: "Dr. Carlos Mendes",
      role: "Direito Trabalhista",
      location: "São Paulo/SP",
      avatar: "👨‍💼",
      rating: 5,
      result: "+40% conversão",
      videoPlaceholder: true,
    },
    {
      text: "Eu ficava até 23h respondendo WhatsApp e mesmo assim não dava conta. Hoje o sistema faz tudo e eu só entro nas calls com leads já qualificados. Recuperei minha vida pessoal.",
      name: "Dra. Ana Paula Silva",
      role: "Direito de Família",
      location: "Rio de Janeiro/RJ",
      avatar: "👩‍💼",
      rating: 5,
      result: "15h/semana economizadas",
      videoPlaceholder: false,
    },
    {
      text: "Skeptical no começo, mas os números não mentem. Captei 6 novos clientes no primeiro mês apenas com leads que antes se perderiam. O ROI foi absurdo.",
      name: "Dr. Roberto Alves",
      role: "Direito Empresarial",
      location: "Belo Horizonte/MG",
      avatar: "👨‍⚖️",
      rating: 5,
      result: "6 novos clientes/mês",
      videoPlaceholder: true,
    },
  ];

  const stats = [
    {
      icon: TrendingUp,
      value: "+40%",
      label: "Aumento médio na conversão",
      color: "text-success",
    },
    {
      icon: Users,
      value: "2 min",
      label: "Tempo de resposta médio",
      color: "text-accent",
    },
    {
      icon: Award,
      value: "50+",
      label: "Escritórios confiando",
      color: "text-warning",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-muted/30 via-background to-muted/30 py-20 md:py-32">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-success/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-success/10 border border-success/20 px-4 py-2">
            <Award className="h-4 w-4 text-success" />
            <span className="text-sm font-bold text-success uppercase tracking-wide">
              Casos de Sucesso
            </span>
          </div>
          <h2 className="text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            Resultados Reais de Escritórios{" "}
            <span className="text-success">Que Automatizaram</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto">
            Veja o que advogados como você estão dizendo sobre a Noble Company
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col rounded-2xl bg-card border-2 border-border p-8 shadow-lg hover:border-accent/50 hover:shadow-2xl transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -right-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent shadow-lg">
                <Quote className="h-6 w-6 text-white" />
              </div>

              {/* Video Placeholder (if available) */}
              {testimonial.videoPlaceholder && (
                <div className="relative mb-4 -mx-8 -mt-8 rounded-t-2xl overflow-hidden">
                  <div className="relative aspect-video bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40" />
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm cursor-pointer"
                    >
                      <Play className="h-8 w-8 text-accent ml-1" fill="currentColor" />
                    </motion.div>
                    <div className="absolute bottom-2 right-2 rounded-lg bg-black/70 px-2 py-1 text-xs text-white">
                      📹 Ver depoimento
                    </div>
                  </div>
                </div>
              )}

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="mb-6 flex-grow text-base leading-relaxed text-foreground">
                "{testimonial.text}"
              </p>

              {/* Result Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-success/10 border border-success/20 px-3 py-2 w-fit">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm font-bold text-success">{testimonial.result}</span>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 border-t border-border pt-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Proven Numbers Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl"
        >
          <h3 className="mb-10 text-center text-3xl font-bold text-foreground md:text-4xl">
            📊 Números Que Comprovam
          </h3>

          <div className="grid gap-6 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl bg-card border-2 border-border p-8 text-center shadow-md hover:border-accent/50 hover:shadow-xl transition-all"
              >
                <div className={`mb-4 flex justify-center`}>
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent/10">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
                <div className={`mb-2 text-5xl font-black ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-sm font-semibold text-foreground/80">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-xl font-semibold text-foreground">
            Quer resultados como estes para seu escritório?
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="btn-noble group h-14 px-8 text-lg font-bold text-white shadow-xl"
            >
              <span className="mr-2 text-xl">💬</span>
              CONVERSAR COM ESPECIALISTA
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                →
              </motion.span>
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;

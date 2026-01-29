import { Quote, Star, TrendingUp, Users, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WHATSAPP_CONFIG } from "@/lib/constants";
import { staggerContainerSlowVariants, fadeInUpVariants } from "@/lib/animations";
import { MediaCarousel } from "./MediaCarousel";
import { Media } from "./MediaRenderer";

const SocialProofSection = () => {
  interface Testimonial {
    text: string;
    name: string;
    role: string;
    location: string;
    avatar: string;
    rating: number;
    result: string;
    media?: Media[];
  }

  const testimonials: Testimonial[] = [
    {
      text: "A Aurora é simplesmente incrível, eu ficava até 23h respondendo WhatsApp e mesmo assim não dava conta. Hoje a Aurora faz tudo e eu só entro nas calls com leads já qualificados. Recuperei minha vida pessoal.",
      name: "Dra. Rose - FG Advogados",
      role: "Direito da Familia e Criminal",
      location: "Blumenau/SC",
      avatar: "👨‍💼",
      rating: 5,
      result: "15h/semana economizadas",
      media: [
        { type: "audio", url: "public/media/audios/fgAdvogados/fg_advogados_01.ogg" },
        { type: "audio", url: "public/media/audios/fgAdvogados/fg_advogados_02.ogg" },
        { type: "image", url: "public/media/images/fgAdvogados/fg_advogados_01.jpeg" },
        { type: "image", url: "public/media/images/fgAdvogados/fg_advogados_02.jpeg" }
      ],
    },
    /*{
      text: "Antes eu perdia pelo menos 10-15 clientes por mês porque a equipe ficava sobrecarregada e demorava para responder. Agora NENHUM lead fica sem resposta e minha conversão aumentou 40%. Melhor investimento que já fiz.",
      name: "Dr. Rogério Mazza - Mazza Advocacia",
      role: "Direito de Família",
      location: "Rio de Janeiro/RJ",
      avatar: "👩‍💼",
      rating: 5,
      result: "+40% conversão",
      media: [
        { type: "audio", url: "//media/audios/dra-ana-paula.mp3" },
        { type: "image", url: "//media/images/dra-ana-paula-1.jpg" },
      ],
    },*/
    {
      text: "Tava em dúvidas no começo se o atendimento ia ser bom, mas me surpreendi. Captei 6 novos clientes no primeiro mês apenas com leads que antes se perderiam. O ROI foi absurdo.",
      name: "Dr. Wellington Alves - WA Advocacia",
      role: "Direito Trabalhista",
      location: "Nova Mutum/MG",
      avatar: "👨‍⚖️",
      rating: 5,
      result: "6 novos clientes/mês",
      media: [
        { type: "video", url: "public/media/videos/WA_ADV/wa_adv_01.mp4" },
        { type: "audio", url: "public/media/audios/WA_ADV/wa_adv_01.ogg" },
        { type: "image", url: "public/media/images/WA_ADV/wa_adv_01.png" }
      ],
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
          <h2 className="text-3xl font-bold text-foreground md:text-5xl lg:text-6xl px-4">
            Resultados Reais de Escritórios <span className="text-success">Que Automatizaram</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-xl max-w-3xl mx-auto">
            Veja o que advogados como você estão dizendo sobre a Noble Company
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={staggerContainerSlowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUpVariants}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col items-center rounded-2xl bg-card border-2 border-border p-6 md:p-8 shadow-lg hover:border-accent/50 hover:shadow-2xl transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-accent shadow-lg">
                <Quote className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>

              {/* Media Carousel */}
              {testimonial.media && testimonial.media.length > 0 && (
                <MediaCarousel media={testimonial.media} />
              )}

              {/* Stars */}
              <div className="flex gap-1 mb-4 justify-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="mb-6 flex-grow text-sm md:text-base leading-relaxed text-foreground text-center">
                "{testimonial.text}"
              </p>

              {/* Result Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-success/10 border border-success/20 px-3 py-2 w-fit">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm font-bold text-success">{testimonial.result}</span>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 md:gap-4 border-t border-border pt-4 w-full">
                <div className="flex h-12 w-12 md:h-14 md:w-14 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-2xl md:text-3xl">
                  {testimonial.avatar}
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="font-bold text-sm md:text-base text-foreground break-words">{testimonial.name}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</p>
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
          <h3 className="mb-8 md:mb-10 text-center text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            📊 Números Que Comprovam
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl bg-card border-2 border-border p-6 md:p-8 text-center shadow-md hover:border-accent/50 hover:shadow-xl transition-all"
              >
                <div className={`mb-4 flex justify-center`}>
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent/10">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
                <div className={`mb-2 text-4xl md:text-5xl font-black ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-xs md:text-sm font-semibold text-foreground/80">
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
          <p className="mb-6 text-base md:text-lg lg:text-xl font-semibold text-foreground px-4">
            Quer resultados como estes para seu escritório?
          </p>
          <a
            href={WHATSAPP_CONFIG.getLink('testimonials')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="btn-noble group h-12 md:h-14 px-6 md:px-8 text-base md:text-lg font-bold text-white shadow-xl w-full max-w-md mx-auto"
            >
              <span className="mr-2 text-lg md:text-xl">💬</span>
              <span className="hidden sm:inline">CONVERSAR COM ESPECIALISTA</span>
              <span className="sm:hidden">FALAR COM ESPECIALISTA</span>
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

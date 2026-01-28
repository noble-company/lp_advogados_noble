import { ArrowRight, Check, Sparkles, Zap, Clock, Brain, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Noble Company WhatsApp Configuration
const WHATSAPP_NUMBER = "553591101380";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá Noble Company! Vi a demonstração do Assistente de IA em ação e quero saber como ele pode ajudar meu escritório a captar mais clientes!"
);

const SolutionPresentationSection = () => {
  const benefits = [
    { icon: Clock, text: "Nunca dorme, nunca tira férias, nunca adoece" },
    { icon: Zap, text: "Responde em menos de 2 minutos, 24 horas por dia" },
    { icon: Brain, text: "Faz as perguntas certas para qualificar o lead" },
    { icon: Calendar, text: "Agenda consultas automaticamente na sua agenda" },
    { icon: Check, text: "Filtra curiosos e só encaminha quem está pronto para fechar" },
    { icon: Sparkles, text: "Fala de forma natural (clientes nem percebem que é IA)" },
    { icon: ArrowRight, text: "Custa MENOS que 1 café por dia" },
  ];

  const conversation = [
    {
      sender: "client",
      time: "23:47",
      message: "Oi, preciso de advogado trabalhista",
    },
    {
      sender: "ai",
      time: "23:48",
      message:
        "Olá! Sim, atendemos direito trabalhista. Para te ajudar melhor, preciso entender seu caso. Você ainda está empregado ou já foi desligado?",
      typing: true,
    },
    {
      sender: "client",
      time: "23:50",
      message: "Fui demitido sem justa causa",
    },
    {
      sender: "ai",
      time: "23:50",
      message: "Entendi. Há quanto tempo você trabalhou na empresa?",
      typing: true,
    },
    {
      sender: "client",
      time: "23:52",
      message: "3 anos",
    },
    {
      sender: "ai",
      time: "23:52",
      message:
        "Perfeito. Seu caso tem mérito. Tenho disponibilidade para uma consulta segunda às 10h ou terça às 14h. Qual prefere?",
      typing: true,
    },
    {
      sender: "client",
      time: "23:54",
      message: "Segunda 10h",
    },
    {
      sender: "ai",
      time: "23:54",
      message:
        "✅ Agendado! Confirmei na agenda do Dr. Silva para segunda 10h. Você receberá confirmação por email e lembrete 1 dia antes.",
      typing: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.2,
        duration: 0.4,

      },
    }),
  };

  return (
    <section className="relative bg-noble-gradient py-20 md:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-accent blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-secondary blur-3xl animate-pulse" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-bold text-white uppercase tracking-wide">
              A Solução Noble Company
            </span>
          </div>
          <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Conheça o Assistente Jurídico de IA<br />
            Que <span className="text-accent">Capta, Qualifica e Agenda</span> Clientes 24/7<br />
            <span className="text-success text-3xl md:text-4xl">(Enquanto Você Dorme)</span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 text-center text-2xl font-semibold text-white/90 md:text-3xl"
        >
          Imagine ter um atendente <span className="text-accent">PERFEITO</span> que:
        </motion.h3>

        {/* Benefits List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mx-auto mb-16 max-w-4xl space-y-3"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="group flex items-start gap-4 rounded-xl bg-white/5 p-4 backdrop-blur-sm border border-white/10 transition-all hover:bg-white/10 hover:border-accent/50 shadow-lg"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/20 group-hover:bg-accent/30 transition-colors">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <p className="text-lg text-white/90 leading-relaxed pt-1">{benefit.text}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Highlight Paragraph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 max-w-3xl rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/30 p-8 text-center backdrop-blur-sm shadow-2xl md:p-10"
        >
          <Sparkles className="mx-auto mb-4 h-12 w-12 text-accent" />
          <p className="text-2xl font-bold text-white md:text-3xl leading-relaxed">
            E o melhor: você <span className="text-accent">NÃO precisa fazer NADA</span>. 
            Nós instalamos tudo e você só recebe leads qualificados.
          </p>
        </motion.div>

        {/* WhatsApp Demo Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl"
        >
          👀 Veja uma Conversa <span className="text-accent">Real</span> em Ação
        </motion.h3>

        {/* WhatsApp Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl"
        >
          <div className="overflow-hidden rounded-3xl bg-[#0a3d2c] shadow-2xl border-4 border-white/10">
            {/* WhatsApp Header */}
            <div className="flex items-center gap-3 bg-[#075e54] px-4 py-4 shadow-md">
              <div className="relative h-12 w-12">
                <div className="h-full w-full rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center text-white font-bold text-lg">
                  AI
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-[#075e54]"></div>
              </div>
              <div>
                <p className="font-semibold text-white text-lg">
                  Assistente Jurídico IA
                </p>
                <p className="text-xs text-green-300 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse"></span>
                  online • responde em 2min
                </p>
              </div>
            </div>

            {/* Chat Area */}
            <div
              className="space-y-3 p-4 min-h-[500px]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            >
              {conversation.map((msg, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={messageVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className={`flex ${
                    msg.sender === "client" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-md ${
                      msg.sender === "client"
                        ? "bg-white text-gray-800 rounded-tl-none"
                        : "bg-[#d9fdd3] text-gray-800 rounded-tr-none"
                    }`}
                  >
                    <p className="text-sm leading-relaxed md:text-base">
                      {msg.message}
                    </p>
                    <div className="mt-1 flex items-center justify-end gap-1">
                      <p className="text-xs text-gray-500">
                        {msg.time}
                      </p>
                      {msg.sender === "ai" && (
                        <span className="text-success">✓✓</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 rounded-2xl bg-gradient-to-br from-success/20 to-success/10 border-2 border-success/30 p-6 text-center shadow-xl md:p-8"
          >
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
                <Clock className="h-6 w-6 text-success" />
              </div>
            </div>
            <p className="text-xl font-bold leading-relaxed text-white md:text-2xl">
              👆 Isso aconteceu às <span className="text-accent">23h de um DOMINGO</span>. 
              Sem a IA, esse cliente teria ido para o concorrente na segunda-feira de manhã.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="btn-noble group h-16 px-8 text-lg font-bold text-white shadow-2xl"
              >
                <span className="mr-3 text-xl">💬</span>
                QUERO ESSE SISTEMA NO MEU ESCRITÓRIO
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionPresentationSection;

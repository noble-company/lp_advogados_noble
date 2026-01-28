import { Check, ArrowRight, Clock, Users, TrendingUp, AlertCircle, MessageCircle, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Configure your WhatsApp number here
const WHATSAPP_NUMBER = "553591101380";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Vi a página sobre IA para advogados e quero garantir minha vaga para implementação este mês!"
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const FinalCTASection = () => {
  // Countdown timer to end of month
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const difference = endOfMonth.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const nextSteps = [
    "PASSO 1: Você preenche um formulário rápido (2min)",
    "PASSO 2: Agendamos uma demonstração de 15min",
    "PASSO 3: Mostramos o sistema funcionando AO VIVO",
    "PASSO 4: Vemos se faz sentido para você",
    "PASSO 5: Se sim, começamos o setup na mesma semana",
  ];

  const guaranteePoints = [
    "30 dias para ter os primeiros resultados",
    "Se não funcionar, devolvemos tudo",
    "Você literalmente NÃO PODE PERDER",
  ];

  return (
    <section className="relative overflow-hidden bg-noble-gradient py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="absolute left-1/4 top-0 h-96 w-96 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 translate-y-1/2 rounded-full bg-warning/20 blur-3xl" />

      <div className="container relative mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive animate-pulse">
            <AlertCircle className="h-4 w-4" />
            Urgente
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            <span className="text-gradient-noble">ATENÇÃO:</span> VAGAS LIMITADAS ESTE MÊS
          </h2>
          <p className="mx-auto max-w-4xl text-xl text-gray-300 md:text-2xl">
            Atendemos APENAS 5 escritórios por mês para garantir implementação
            impecável e suporte personalizado.
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-12 max-w-4xl rounded-2xl border border-destructive/30 bg-gradient-to-r from-destructive/10 to-warning/10 p-6 backdrop-blur-sm md:p-8"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <Clock className="h-6 w-6 text-destructive" />
            <p className="text-lg font-semibold text-white md:text-xl">
              Tempo restante para garantir sua vaga este mês:
            </p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Dias', value: timeLeft.days },
              { label: 'Horas', value: timeLeft.hours },
              { label: 'Minutos', value: timeLeft.minutes },
              { label: 'Segundos', value: timeLeft.seconds },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-2 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <span className="text-3xl font-bold text-white md:text-4xl">
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-300">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vacancy Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mb-12 max-w-3xl"
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div className="glass-effect rounded-xl border border-primary/30 bg-white/95 p-6 text-center backdrop-blur-sm">
              <Users className="mx-auto mb-2 h-8 w-8 text-primary" />
              <p className="mb-1 text-sm font-medium text-gray-600">VAGAS ESTE MÊS</p>
              <p className="text-3xl font-bold text-gray-900">5</p>
            </div>
            <div className="glass-effect rounded-xl border border-success/30 bg-white/95 p-6 text-center backdrop-blur-sm">
              <Check className="mx-auto mb-2 h-8 w-8 text-success" />
              <p className="mb-1 text-sm font-medium text-gray-600">PREENCHIDAS</p>
              <p className="text-3xl font-bold text-success">3</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="glass-effect rounded-xl border-2 border-destructive bg-gradient-to-br from-destructive/20 to-warning/20 p-6 text-center backdrop-blur-sm"
            >
              <Zap className="mx-auto mb-2 h-8 w-8 text-destructive" />
              <p className="mb-1 text-sm font-medium text-white">RESTAM APENAS</p>
              <p className="text-3xl font-bold text-white">2</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Warning Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mb-12 max-w-3xl rounded-xl border border-warning/30 bg-warning/10 p-6 text-center backdrop-blur-sm md:p-8"
        >
          <AlertCircle className="mx-auto mb-4 h-10 w-10 text-warning" />
          <p className="mb-4 text-lg font-semibold text-white md:text-xl">
            Se as 5 vagas fecharem hoje, a próxima turma só abre em{" "}
            <span className="font-bold text-warning underline">MARÇO 2026</span>.
          </p>
          <p className="text-lg font-semibold text-gray-200 md:text-xl">
            E enquanto isso, você continua perdendo clientes por lentidão no
            atendimento.
          </p>
        </motion.div>

        {/* Cost of Inaction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mb-12 max-w-4xl rounded-2xl border border-destructive/30 bg-gradient-to-br from-destructive/10 to-warning/10 p-6 shadow-xl backdrop-blur-sm md:p-8"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <TrendingUp className="h-8 w-8 text-destructive" />
            <h3 className="text-center text-2xl font-bold text-white md:text-3xl">
              QUANTO ISSO ESTÁ TE CUSTANDO?
            </h3>
          </div>
          <p className="text-center text-lg leading-relaxed text-gray-200">
            A cada dia que você adia, perde em média 1-2 clientes em potencial
            que não foram respondidos a tempo. Em 30 dias? São 30-60 leads
            perdidos. Em R$? São{" "}
            <span className="font-bold text-warning">
              R$ 15.000 - R$ 50.000
            </span>{" "}
            jogados fora. Você pode estar deixando um BMW 0km na mesa TODO MÊS
            por não ter esse sistema.
          </p>
        </motion.div>

        {/* Main CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => window.open(WHATSAPP_LINK, "_blank")}
              size="lg"
              className="group h-auto bg-gradient-noble px-8 py-6 text-xl font-bold text-white shadow-2xl transition-all duration-300 hover:shadow-accent/50 md:px-12 md:py-8 md:text-2xl"
            >
              <MessageCircle className="mr-2 h-6 w-6 transition-transform group-hover:scale-110" />
              GARANTIR MINHA VAGA AGORA
              <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
          <p className="mt-4 text-sm text-gray-300">
            Clique para falar direto no WhatsApp • Resposta em minutos
          </p>
        </motion.div>

        {/* What Happens Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mx-auto mb-12 max-w-3xl"
        >
          <p className="mb-6 text-center text-xl font-bold text-white">
            O que acontece depois do clique:
          </p>
          <div className="glass-effect space-y-3 rounded-xl border border-success/30 bg-white/95 p-6 backdrop-blur-sm md:p-8">
            {nextSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <Check className="mt-1 h-6 w-6 flex-shrink-0 text-success" />
                <p className="text-lg font-semibold text-gray-900">{step}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-center text-lg font-semibold text-gray-200">
            Sem pressão. Sem compromisso. Sem pegadinhas. Apenas uma
            demonstração honesta.
          </p>
        </motion.div>

        {/* Guarantee Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mx-auto mb-12 max-w-3xl rounded-xl border border-success/30 bg-success/10 p-6 shadow-xl backdrop-blur-sm md:p-8"
        >
          <div className="mb-6 flex items-center justify-center gap-2">
            <Shield className="h-8 w-8 text-success" />
            <h3 className="text-center text-2xl font-bold text-white md:text-3xl">
              LEMBRE-SE DA GARANTIA:
            </h3>
          </div>
          <div className="mb-6 space-y-3">
            {guaranteePoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-2"
              >
                <Check className="mt-1 h-5 w-5 flex-shrink-0 text-success" />
                <p className="text-lg font-semibold text-white">{point}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-lg leading-relaxed text-gray-200">
            O pior que pode acontecer? Você recebe o seu dinheiro de volta. O
            melhor? Você capta 3-5 novos clientes/mês e aumenta faturamento em
            R$ 15-50k/mês.
          </p>
        </motion.div>

        {/* Final Call */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mx-auto max-w-3xl space-y-6"
        >
          <div className="rounded-2xl bg-gradient-noble p-8 text-center shadow-2xl md:p-10">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Clock className="h-8 w-8 text-white" />
              <h3 className="text-3xl font-bold text-white md:text-4xl">
                ÚLTIMA CHAMADA
              </h3>
            </div>
            <p className="mb-6 text-xl text-gray-200">
              Não deixe para depois. As vagas estão acabando.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => window.open(WHATSAPP_LINK, "_blank")}
                size="lg"
                className="group mb-4 h-auto bg-white px-8 py-6 text-xl font-bold text-noble-purple shadow-2xl transition-all duration-300 hover:bg-gray-100 md:px-12 md:py-8 md:text-2xl"
              >
                <MessageCircle className="mr-2 h-6 w-6 transition-transform group-hover:scale-110" />
                FALAR NO WHATSAPP AGORA
                <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.p
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xl font-bold text-warning"
            >
              ⚠️ Restam apenas 2 vagas este mês
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
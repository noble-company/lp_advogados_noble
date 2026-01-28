import { useState } from "react";
import { Calculator, TrendingUp, DollarSign, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

// Noble Company WhatsApp Configuration
const WHATSAPP_NUMBER = "553591101380";

const ROICalculator = () => {
  const [leadsPerMonth, setLeadsPerMonth] = useState(10);
  const [averageCaseValue, setAverageCaseValue] = useState(8000);
  const [currentResponseTime, setCurrentResponseTime] = useState(4);

  // Calculations
  const leadsLostPerMonth = Math.round(leadsPerMonth * (currentResponseTime / 24) * 0.6);
  const monthlyLoss = leadsLostPerMonth * averageCaseValue;
  const yearlyLoss = monthlyLoss * 12;
  
  // With AI Assistant (80% recovery)
  const leadsRecovered = Math.round(leadsLostPerMonth * 0.8);
  const monthlyGain = leadsRecovered * averageCaseValue;
  const yearlyGain = monthlyGain * 12;
  
  const roi = ((yearlyGain / 3588) * 100).toFixed(0); // Cost: R$ 299/month = R$ 3,588/year

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Olá Noble Company! Calculei meu ROI e descobri que estou perdendo R$ ${monthlyLoss.toLocaleString('pt-BR')} por mês (R$ ${yearlyLoss.toLocaleString('pt-BR')} por ano). Gostaria de saber como o Assistente de IA pode me ajudar a recuperar esses clientes!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-secondary py-20 md:py-32 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-warning blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 backdrop-blur-sm">
            <Calculator className="h-4 w-4 text-accent" />
            <span className="text-sm font-bold text-white uppercase tracking-wide">
              Calculadora Interativa
            </span>
          </div>
          <h2 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Quanto Dinheiro Você Está{" "}
            <span className="text-accent">Perdendo</span>?
          </h2>
          <p className="mt-4 text-lg text-white/80 md:text-xl max-w-3xl mx-auto">
            Ajuste os valores abaixo para ver quanto você está perdendo em clientes não atendidos
            (e quanto poderia recuperar com a Noble Company)
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-card border-2 border-white/10 p-8 md:p-12 shadow-2xl backdrop-blur-sm"
          >
            {/* Input Controls */}
            <div className="grid gap-8 md:grid-cols-3 mb-12">
              {/* Leads per Month */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-foreground">
                  Leads recebidos por mês
                </Label>
                <div className="text-4xl font-bold text-accent">{leadsPerMonth}</div>
                <Slider
                  value={[leadsPerMonth]}
                  onValueChange={(value) => setLeadsPerMonth(value[0])}
                  min={5}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5</span>
                  <span>100</span>
                </div>
              </div>

              {/* Average Case Value */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-foreground">
                  Valor médio por cliente (R$)
                </Label>
                <div className="text-4xl font-bold text-accent">
                  {averageCaseValue.toLocaleString('pt-BR')}
                </div>
                <Slider
                  value={[averageCaseValue]}
                  onValueChange={(value) => setAverageCaseValue(value[0])}
                  min={1000}
                  max={50000}
                  step={1000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1k</span>
                  <span>50k</span>
                </div>
              </div>

              {/* Response Time */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-foreground">
                  Tempo médio de resposta (horas)
                </Label>
                <div className="text-4xl font-bold text-accent">{currentResponseTime}h</div>
                <Slider
                  value={[currentResponseTime]}
                  onValueChange={(value) => setCurrentResponseTime(value[0])}
                  min={1}
                  max={24}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1h</span>
                  <span>24h</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid gap-6 md:grid-cols-2 border-t-2 border-border pt-8">
              {/* Current Situation (Loss) */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl bg-destructive/10 border-2 border-destructive/30 p-6 text-center"
              >
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20">
                    <TrendingUp className="h-6 w-6 text-destructive rotate-180" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  💔 Situação Atual
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Leads perdidos por mês
                  </p>
                  <p className="text-3xl font-bold text-destructive">
                    ~{leadsLostPerMonth} clientes
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Perda mensal
                  </p>
                  <p className="text-4xl font-black text-destructive">
                    R$ {monthlyLoss.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Perda anual
                  </p>
                  <p className="text-2xl font-bold text-destructive">
                    R$ {yearlyLoss.toLocaleString('pt-BR')}
                  </p>
                </div>
              </motion.div>

              {/* With Noble Company (Gain) */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl bg-success/10 border-2 border-success/30 p-6 text-center"
              >
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">
                  ✨ Com Noble Company
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Clientes recuperados por mês
                  </p>
                  <p className="text-3xl font-bold text-success">
                    +{leadsRecovered} clientes
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Ganho mensal
                  </p>
                  <p className="text-4xl font-black text-success">
                    R$ {monthlyGain.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Ganho anual
                  </p>
                  <p className="text-2xl font-bold text-success">
                    R$ {yearlyGain.toLocaleString('pt-BR')}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* ROI Banner */}
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mt-8 rounded-2xl bg-gradient-to-r from-accent via-accent to-accent/80 p-6 text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <DollarSign className="h-8 w-8 text-white" />
                <h3 className="text-2xl font-bold text-white md:text-3xl">
                  ROI Estimado
                </h3>
              </div>
              <p className="text-6xl font-black text-white md:text-7xl">
                {roi}x
              </p>
              <p className="text-white/90 text-lg mt-2">
                Retorno sobre o investimento no primeiro ano
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-8 text-center"
            >
              <Button
                onClick={handleWhatsAppContact}
                size="lg"
                className="btn-noble group h-16 px-8 text-lg font-bold text-white shadow-2xl hover:shadow-accent/50 w-full md:w-auto"
              >
                <span className="mr-3 text-xl">💬</span>
                RECUPERAR ESSES CLIENTES AGORA
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                ⚡ Fale com um especialista • Resposta em até 5 minutos
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;

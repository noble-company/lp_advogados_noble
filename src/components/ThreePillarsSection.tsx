import { ArrowRight } from "lucide-react";

const ThreePillarsSection = () => {
  const pillars = [
    {
      emoji: "🕐",
      number: "1️⃣",
      title: "ATENDIMENTO INSTANTÂNEO 24/7",
      benefits: [
        "Responde em menos de 2 minutos, qualquer hora",
        "Linguagem natural e humanizada",
        "Clientes não percebem que é IA",
        "Fim das mensagens perdidas e leads impacientes",
      ],
    },
    {
      emoji: "🎯",
      number: "2️⃣",
      title: "QUALIFICAÇÃO AUTOMÁTICA INTELIGENTE",
      benefits: [
        "Faz as perguntas certas para seu nicho",
        "Identifica casos viáveis vs curiosos",
        "Filtra automaticamente leads desqualificados",
        "Só encaminha quem tem potencial real de fechar",
      ],
    },
    {
      emoji: "📅",
      number: "3️⃣",
      title: "AGENDAMENTO INTELIGENTE",
      benefits: [
        "Marca consultas direto na sua agenda",
        "Envia confirmações e lembretes automaticamente",
        "Reduz no-shows em até 70%",
        "Você só aparece para a reunião pronta para fechar",
      ],
    },
  ];

  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="mb-12 text-center text-3xl font-bold text-white md:mb-16 md:text-4xl lg:text-5xl">
          ⚡ OS 3 PILARES DO SISTEMA
        </h2>

        {/* Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="group rounded-2xl border-2 border-primary/30 bg-card p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-2xl"
            >
              {/* Emoji and Number */}
              <div className="mb-6 flex items-center justify-between">
                <div className="text-6xl">{pillar.emoji}</div>
                <div className="text-4xl">{pillar.number}</div>
              </div>

              {/* Title */}
              <h3 className="mb-6 text-2xl font-bold text-foreground">
                {pillar.title}
              </h3>

              {/* Benefits List */}
              <div className="space-y-3">
                {pillar.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-start gap-2">
                    <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <p className="text-base text-muted-foreground">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreePillarsSection;

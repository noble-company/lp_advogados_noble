import { ArrowRight } from "lucide-react";

const TangibleBenefitsSection = () => {
  const benefits = [
    {
      emoji: "📈",
      title: "MAIS CLIENTES (3-5 NOVOS/MÊS)",
      items: [
        "Converta 30-50% mais leads que já te procuram",
        "Capture clientes que antes eram perdidos por demora",
        "Atenda leads que chegam fora do horário comercial",
        "Aumente seu faturamento em R$ 15-50k/mês",
      ],
    },
    {
      emoji: "⏰",
      title: "MAIS TEMPO (10-15 HORAS/SEMANA RECUPERADAS)",
      items: [
        "Pare de gastar 70% do dia com atendimento básico",
        "Foque em advogar e fechar casos de alto valor",
        "Recupere suas noites e fins de semana",
        "Delegue 100% do atendimento inicial para a IA",
      ],
    },
    {
      emoji: "💰",
      title: "MAIS LUCRO (SEM AUMENTAR CUSTOS)",
      items: [
        "Economize R$ 3-5k/mês que gastaria com atendente",
        "Sem CLT, sem férias, sem 13º, sem encargos",
        "ROI positivo já no primeiro cliente captado",
        "Margem de lucro aumenta sem contratar ninguém",
      ],
    },
    {
      emoji: "😌",
      title: "MAIS TRANQUILIDADE (ZERO PREOCUPAÇÃO)",
      items: [
        "Nunca mais perca clientes por demora",
        "Durma sabendo que nenhum lead fica sem resposta",
        "Viaje sem se preocupar com o WhatsApp",
        "Sistema funciona 24/7 mesmo quando você não está",
      ],
    },
    {
      emoji: "🎯",
      title: "MAIS QUALIDADE (SÓ LEADS BONS)",
      items: [
        "Pare de perder tempo com curiosos e \"tire-dúvidas\"",
        "Receba apenas leads pré-qualificados prontos para fechar",
        "Aumente sua taxa de conversão em consultas",
        "Foque energia em casos que realmente valem a pena",
      ],
    },
  ];

  const beforeData = [
    "20 leads/mês no WhatsApp",
    "8 leads respondidos (40% perdidos por demora)",
    "2 leads convertidos (25% de conversão)",
    "Faturamento: R$ 20.000/mês",
    "Tempo gasto: 15h/semana no WhatsApp",
  ];

  const afterData = [
    "20 leads/mês no WhatsApp",
    "20 leads respondidos (0% perdidos)",
    "7 leads convertidos (35% de conversão)",
    "Faturamento: R$ 55.000/mês (+R$ 35k)",
    "Tempo gasto: 0h/semana no WhatsApp",
  ];

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:mb-16 md:text-4xl lg:text-5xl">
          O QUE ISSO SIGNIFICA PARA O SEU ESCRITÓRIO
        </h2>

        {/* Benefits Cards */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8"
            >
              {/* Emoji */}
              <div className="mb-4 text-5xl">{benefit.emoji}</div>

              {/* Title */}
              <h3 className="mb-4 text-xl font-bold text-gray-800">
                {benefit.title}
              </h3>

              {/* Items List */}
              <div className="space-y-2">
                {benefit.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-2">
                    <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <p className="text-sm text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Before/After Comparison */}
        <div className="mb-8">
          <h3 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
            EXEMPLO REAL
          </h3>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {/* Before Box */}
            <div className="rounded-xl bg-red-50 p-6 shadow-lg md:p-8">
              <h4 className="mb-4 text-center text-xl font-bold text-red-800 md:text-2xl">
                ANTES DO SISTEMA:
              </h4>
              <ul className="space-y-3">
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
        <div className="mx-auto max-w-4xl rounded-xl bg-gradient-to-r from-primary to-primary/80 p-6 text-center shadow-xl md:p-8">
          <p className="text-xl font-bold text-white md:text-2xl lg:text-3xl">
            Resultado: +250% de conversão | +R$ 420k/ano | 15 horas/semana
            recuperadas
          </p>
        </div>
      </div>
    </section>
  );
};

export default TangibleBenefitsSection;

const SocialProofSection = () => {
  const testimonials = [
    {
      text: "Antes eu perdia pelo menos 3-4 clientes por mês porque demorava para responder. Agora NENHUM lead fica sem resposta e minha conversão aumentou 40%. Melhor investimento que já fiz.",
      name: "— Dr. Carlos Mendes, Direito Trabalhista",
      location: "São Paulo/SP",
    },
    {
      text: "Eu ficava até 23h respondendo WhatsApp e mesmo assim não dava conta. Hoje o sistema faz tudo e eu só entro nas calls com leads já qualificados. Recuperei minha vida pessoal.",
      name: "— Dra. Ana Paula Silva, Direito de Família",
      location: "Rio de Janeiro/RJ",
    },
    {
      text: "Skeptical no começo, mas os números não mentem. Captei 6 novos clientes no primeiro mês apenas com leads que antes se perderiam. O ROI foi absurdo.",
      name: "— Dr. Roberto Alves, Direito Empresarial",
      location: "Belo Horizonte/MG",
    },
  ];

  const stats = [
    {
      emoji: "📈",
      text: "+40% média de aumento na taxa de conversão",
    },
    {
      emoji: "⏱️",
      text: "Tempo de resposta: de 4h para 2 minutos",
    },
    {
      emoji: "💰",
      text: "R$ 15-30k/mês em casos que seriam perdidos",
    },
    {
      emoji: "👥",
      text: "80% de redução no tempo gasto com triagem",
    },
    {
      emoji: "⭐",
      text: "4.9/5 de satisfação dos clientes",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:mb-16 md:text-4xl lg:text-5xl">
          RESULTADOS REAIS DE ESCRITÓRIOS QUE AUTOMATIZARAM O ATENDIMENTO
        </h2>

        {/* Testimonials Grid */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8"
            >
              {/* Quote Icon */}
              <div className="mb-4 text-5xl">💬</div>

              {/* Testimonial Text */}
              <p className="mb-6 flex-grow text-base leading-relaxed text-gray-700 md:text-lg">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="border-t border-gray-200 pt-4">
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Proven Numbers Section */}
        <div className="mx-auto max-w-5xl">
          <h3 className="mb-8 text-center text-2xl font-bold text-foreground md:text-3xl">
            📊 NÚMEROS QUE COMPROVAM
          </h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-3 text-4xl">{stat.emoji}</div>
                <p className="text-sm font-semibold text-gray-800 md:text-base">
                  {stat.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;

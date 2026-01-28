import { Check } from "lucide-react";

const GuaranteesSection = () => {
  const guarantees = [
    {
      number: 1,
      title: "Implementação no Prazo",
      text: "Se não entregarmos o setup completo e funcional em 7 dias úteis, você NÃO PAGA NADA pelo setup.",
      subtext: "ZERO burocracia. ZERO desculpas.",
    },
    {
      number: 2,
      title: "Resultados ou Dinheiro de Volta + Bônus",
      text: "Você tem 60 dias para ver os primeiros resultados. Se sua taxa de conversão não aumentar pelo menos 20%, devolvemos 100% do seu investimento.",
      subtext: "Sem perguntas. Sem justificativas. Sem burocracia.",
    },
    {
      number: 3,
      title: "Suporte ou Mês Grátis",
      text: "Se qualquer problema técnico não for resolvido em 72 horas úteis, aquele mês da mensalidade sai GRÁTIS.",
      subtext: "Simples assim.",
    },
  ];

  return (
    <section className="bg-[#1a2942] py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="mb-6 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          🛡️ GARANTIA TRIPLA - RISCO ZERO PARA VOCÊ
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mb-12 max-w-4xl text-center text-lg text-gray-300 md:mb-16 md:text-xl">
          Estamos TÃO confiantes nos resultados que oferecemos uma garantia que
          ELIMINA qualquer risco:
        </p>

        {/* Guarantees Grid */}
        <div className="mx-auto mb-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="rounded-xl border-2 border-green-400 bg-white p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl md:p-8"
            >
              {/* Checkmark */}
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
                  <Check className="h-10 w-10 text-white" strokeWidth={3} />
                </div>
              </div>

              {/* Title */}
              <h3 className="mb-4 text-center text-xl font-bold text-gray-900">
                GARANTIA #{guarantee.number}: {guarantee.title}
              </h3>

              {/* Text */}
              <p className="mb-4 text-center text-base leading-relaxed text-gray-700">
                {guarantee.text}
              </p>

              {/* Subtext */}
              <p className="text-center text-sm font-semibold italic text-primary">
                {guarantee.subtext}
              </p>
            </div>
          ))}
        </div>

        {/* Explanation Box */}
        <div className="mx-auto mb-8 max-w-4xl rounded-xl border-2 border-yellow-400 bg-yellow-50 p-6 md:p-8">
          <h3 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl">
            💡 POR QUE OFERECEMOS ISSO?
          </h3>
          <p className="mb-0 text-center text-lg leading-relaxed text-gray-800">
            Porque sabemos que funciona. Já vimos dezenas de escritórios
            aumentarem conversão, recuperarem tempo e captarem mais clientes. Se
            não funcionar para você (o que é extremamente raro), não queremos
            seu dinheiro. Simples assim.
          </p>
        </div>

        {/* Final Highlight */}
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-green-500 to-green-600 p-6 text-center shadow-2xl md:p-8">
          <p className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            O risco é TODO NOSSO. Você só tem a ganhar.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GuaranteesSection;

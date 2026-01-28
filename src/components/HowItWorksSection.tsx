import { ArrowDown } from "lucide-react";

const HowItWorksSection = () => {
  const clientSteps = [
    {
      number: 1,
      title: "Lead envia mensagem no seu WhatsApp",
      example: "'Oi, preciso de um advogado para X...'",
    },
    {
      number: 2,
      title: "Sistema responde em menos de 2min",
      example:
        "'Olá! Atendemos sim. Para te ajudar melhor, preciso entender alguns detalhes...'",
    },
    {
      number: 3,
      title: "IA faz perguntas de qualificação",
      example:
        "'Qual o valor envolvido?' 'Há quanto tempo?' 'Você já tentou resolver?' (etc)",
    },
    {
      number: 4,
      title: "Sistema agenda automaticamente",
      example:
        "'Perfeito! Tenho uma vaga segunda às 10h. Confirmo para você?'",
    },
    {
      number: 5,
      title: "Envio de confirmação e lembretes",
      example: "(1 dia antes e 1h antes da consulta)",
    },
  ];

  const lawyerSteps = [
    {
      number: 1,
      title: "Você recebe notificação",
      example:
        "'Novo lead qualificado: João Silva | Caso: Trabalhista - Valor: R$ 15k | Consulta agendada: Seg 10h'",
    },
    {
      number: 2,
      title: "Você revisa o resumo do caso",
      example: "(5 minutos antes da call)",
    },
    {
      number: 3,
      title: "Você entra na reunião",
      example: "Lead já está qualificado, contexto claro, pronto para fechar",
    },
  ];

  return (
    <section className="bg-[#1a2942] py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          📋 COMO FUNCIONA (PASSO A PASSO)
        </h2>

        {/* Client Side */}
        <div className="mb-16 mt-12">
          <h3 className="mb-8 text-center text-2xl font-bold text-green-300 md:text-3xl">
            PARA O SEU CLIENTE (Lado de Fora):
          </h3>

          <div className="mx-auto max-w-3xl">
            {clientSteps.map((step, index) => (
              <div key={index}>
                {/* Step Card */}
                <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                      {step.number}
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 md:text-xl">
                      PASSO {step.number}: {step.title}
                    </h4>
                  </div>
                  <p className="ml-13 italic text-gray-600">{step.example}</p>
                </div>

                {/* Arrow Between Steps */}
                {index < clientSteps.length - 1 && (
                  <div className="flex justify-center py-4">
                    <ArrowDown className="h-8 w-8 text-green-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto mb-16 w-full max-w-4xl border-t-4 border-green-300"></div>

        {/* Lawyer Side */}
        <div className="mb-12">
          <h3 className="mb-8 text-center text-2xl font-bold text-yellow-300 md:text-3xl">
            PARA VOCÊ (Lado de Dentro):
          </h3>

          <div className="mx-auto max-w-3xl">
            {lawyerSteps.map((step, index) => (
              <div key={index}>
                {/* Step Card */}
                <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500 text-lg font-bold text-white">
                      {step.number}
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 md:text-xl">
                      PASSO {step.number}: {step.title}
                    </h4>
                  </div>
                  <p className="ml-13 text-gray-600">{step.example}</p>
                </div>

                {/* Arrow Between Steps */}
                {index < lawyerSteps.length - 1 && (
                  <div className="flex justify-center py-4">
                    <ArrowDown className="h-8 w-8 text-yellow-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final Highlight Box */}
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-center shadow-2xl md:p-10">
          <div className="mb-4 text-5xl md:text-6xl">⏱️</div>
          <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            TEMPO TOTAL QUE VOCÊ GASTA: ZERO
          </h3>
          <p className="text-xl font-semibold text-white md:text-2xl">
            O sistema faz TODO o trabalho pesado. Você só aparece para a parte
            boa: fechar o cliente.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Meus clientes vão perceber que é IA?",
      answer:
        "Não. O sistema usa linguagem 100% natural e humanizada. Em testes cegos, 9 em cada 10 pessoas não conseguiram identificar que estavam conversando com IA. E sabe o que eles REALMENTE se importam? Com a velocidade de resposta. Preferem uma resposta em 2 minutos (mesmo que seja IA) do que esperar 4 horas por um humano.",
    },
    {
      question: "E se a IA não entender casos complexos?",
      answer:
        "O sistema é treinado para QUALIFICAR, não para advogar. Quando detecta complexidade ou dúvida, encaminha automaticamente para você com todo o contexto coletado. Você mantém 100% do controle. A IA só faz a triagem e filtragem inicial.",
    },
    {
      question: "Quanto tempo leva para implementar?",
      answer:
        "7 dias úteis do momento que você fecha. Nós fazemos TODO o trabalho técnico. Você só precisa: 1 reunião de 30min para entender seu fluxo, aprovar os scripts que criamos, e ativar (literalmente 1 clique). Tempo total do seu lado: menos de 1 hora.",
    },
    {
      question: "Funciona para minha área específica do direito?",
      answer:
        "Sim. O sistema é customizado para seu nicho específico. Já implementamos para: Direito Trabalhista, Direito de Família, Direito Empresarial, Direito do Consumidor, Direito Previdenciário, e muitas outras áreas. Cada implementação é única para suas especificidades.",
    },
    {
      question: "E se eu já uso CRM/WhatsApp Business?",
      answer:
        "Perfeito. Integramos com as principais ferramentas: WhatsApp Business / Business API, Google Calendar / Outlook, RD Station, HubSpot, Pipedrive, Zoho, Bitrix24, Monday, qualquer CRM via API ou Zapier. Se você usa algo diferente, provavelmente conseguimos integrar também.",
    },
    {
      question: "Posso cancelar quando quiser?",
      answer:
        "Sim. Sem multa, sem burocracia, sem fidelidade. Você pode cancelar a qualquer momento com 30 dias de antecedência. Mas honestamente? Depois que você ver os resultados, não vai querer cancelar.",
    },
    {
      question: "Vocês atendem apenas 5 escritórios/mês. Por quê?",
      answer:
        "Porque cada implementação leva 7 dias de dedicação quase exclusiva do nosso time técnico. Não fazemos implementação 'meia-boca'. Cada cliente recebe atenção total para garantir que o sistema funcione perfeitamente. Nossa capacidade atual é de 5 clientes/mês. Se as vagas fecharem, próxima turma só no mês seguinte.",
    },
    {
      question: "Como sei que vou ter suporte quando precisar?",
      answer:
        "Garantia #3: Se não resolvermos seu problema em 24h, aquele mês sai grátis. Além disso: WhatsApp direto com o time técnico, Suporte prioritário nos primeiros 60 dias, Acompanhamento semanal de performance, Resposta em até 2 horas úteis. Não deixamos ninguém na mão.",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:mb-16 md:text-4xl lg:text-5xl">
          ❓ PERGUNTAS FREQUENTES
        </h2>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-gray-200 bg-white px-6 shadow-sm transition-all hover:shadow-md"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 pt-2 text-base leading-relaxed text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

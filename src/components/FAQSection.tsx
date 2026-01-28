import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { MessageCircle, HelpCircle, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

const WHATSAPP_NUMBER = "553591101380";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Vi a página sobre IA para advogados e tenho algumas dúvidas. Pode me ajudar?"
);

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
    <section className="relative overflow-hidden bg-noble-gradient py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="absolute left-0 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 h-96 w-96 translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />

      <div className="container relative mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <HelpCircle className="h-4 w-4" />
            Dúvidas Frequentes
          </div>
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            <span className="text-gradient-noble">PERGUNTAS</span> FREQUENTES
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Tire suas dúvidas sobre como funciona a implementação e os resultados
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-4xl"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="glass-effect group overflow-hidden rounded-lg border border-primary/20 bg-white/95 px-6 shadow-lg backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-xl"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 transition-colors hover:text-noble-purple hover:no-underline">
                    <span className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary transition-transform group-hover:scale-110" />
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pl-8 pt-2 text-base leading-relaxed text-gray-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA after FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-12 max-w-3xl text-center"
        >
          <div className="rounded-2xl border border-accent/30 bg-gradient-noble p-8 shadow-2xl md:p-10">
            <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Ainda tem dúvidas?
            </h3>
            <p className="mb-6 text-lg text-gray-200">
              Fale direto com nosso time no WhatsApp. Respondemos em minutos.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="group h-auto bg-white px-8 py-4 text-lg font-bold text-noble-purple shadow-xl transition-all duration-300 hover:bg-gray-100 md:text-xl"
                onClick={() =>
                  window.open(
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`,
                    "_blank"
                  )
                }
              >
                <MessageCircle className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Tirar Dúvidas no WhatsApp
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

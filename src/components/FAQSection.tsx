import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { MessageCircle, HelpCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_CONFIG } from "@/lib/constants";

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
      question: "Como sei que vou ter suporte quando precisar?",
      answer:
        "Garantia #3: Se não resolvermos seu problema em 72 horas úteis, aquele mês sai grátis. Além disso: WhatsApp direto com o time técnico, Suporte prioritário nos primeiros 60 dias, Acompanhamento semanal de performance, Resposta em até 2 horas úteis. Não deixamos ninguém na mão.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-noble-gradient py-12 sm:py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="absolute left-0 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 h-96 w-96 translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />

      <div className="container relative mx-auto px-3 sm:px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 md:mb-16 text-center"
        >
          <div className="mb-3 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-primary">
            <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Dúvidas Frequentes
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            <span className="text-gradient-noble">PERGUNTAS</span> FREQUENTES
          </h2>
          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg text-gray-300">
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
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
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
                  className="glass-effect group overflow-hidden rounded-lg border border-primary/20 bg-white/95 px-3 sm:px-6 shadow-lg backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-xl"
                >
                  <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-gray-200 transition-colors hover:text-accent hover:no-underline py-3 sm:py-4">
                    <span className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle2 className="mt-0.5 sm:mt-1 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-primary transition-transform group-hover:scale-110" />
                      <span className="pr-2">{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 sm:pb-4 pl-6 sm:pl-8 pt-1 sm:pt-2 text-sm sm:text-base leading-relaxed text-gray-300">
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
          className="mx-auto mt-8 sm:mt-12 max-w-3xl text-center"
        >
          <div className="rounded-xl sm:rounded-2xl border border-accent/30 bg-gradient-noble p-6 sm:p-8 md:p-10 shadow-2xl">
            <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold text-white md:text-3xl">
              Ainda tem dúvidas?
            </h3>
            <p className="mb-5 sm:mb-6 text-base sm:text-lg text-gray-100">
              Fale direto com nosso time no WhatsApp. Respondemos em minutos.
            </p>
            <div className="w-full sm:w-auto">
              <a
                href={WHATSAPP_CONFIG.getLink('faq')}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="bg-green-600 text-white hover:bg-green-700 active:bg-green-800 h-16 sm:h-14 px-4 sm:px-8 text-sm sm:text-lg font-bold shadow-xl w-full sm:w-auto flex flex-wrap items-center justify-center gap-2 sm:gap-2"
                >
                  <MessageCircle className="h-5 w-5 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="hidden sm:inline">TIRAR DÚVIDAS NO WHATSAPP</span>
                  <span className="sm:hidden text-center">TIRAR DÚVIDAS<br />NO WHATSAPP</span>
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

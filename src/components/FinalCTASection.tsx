import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ConversionForm from "./ConversionForm";

// Configure your WhatsApp number here
const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Vi a página sobre os Agentes de IA para advocacia e quero garantir minha vaga para implementação."
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const FinalCTASection = () => {
  const [showForm, setShowForm] = useState(false);
  const nextSteps = [
    "PASSO 1: Você preenche um formulário rápido (2min)",
    "PASSO 2: Agendamos uma demonstração de 15min",
    "PASSO 3: Mostramos o sistema funcionando AO VIVO",
    "PASSO 4: Vemos se faz sentido para você",
    "PASSO 5: Se sim, começamos o setup na mesma semana",
  ];

  const guaranteePoints = [
    "60 dias para testar sem risco",
    "Se não funcionar, devolvemos tudo + R$ 1.000",
    "Você literalmente NÃO PODE PERDER",
  ];

  return (
    <section className="bg-gradient-to-b from-orange-500 to-orange-600 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="mb-6 text-center text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          ⚠️ ATENÇÃO: VAGAS LIMITADAS ESTE MÊS
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mb-12 max-w-4xl text-center text-xl text-white md:text-2xl">
          Atendemos APENAS 5 escritórios por mês para garantir implementação
          impecável e suporte personalizado.
        </p>

        {/* Vacancy Counter */}
        <div className="mx-auto mb-12 max-w-2xl rounded-xl bg-white p-6 shadow-2xl md:p-8">
          <div className="space-y-3 text-center">
            <p className="text-2xl font-bold text-gray-900 md:text-3xl">
              📊 VAGAS ESTE MÊS: 5
            </p>
            <p className="text-xl font-semibold text-green-600 md:text-2xl">
              ✅ PREENCHIDAS: 3
            </p>
            <p className="text-2xl font-bold text-red-600 md:text-3xl">
              🔥 RESTAM APENAS: 2
            </p>
          </div>
        </div>

        {/* Warning Text */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-4 text-lg font-semibold text-white md:text-xl">
            Se as 5 vagas fecharem hoje, a próxima turma só abre em{" "}
            <span className="font-bold underline">MARÇO 2026</span>.
          </p>
          <p className="text-lg font-semibold text-white md:text-xl">
            E enquanto isso, você continua perdendo clientes por lentidão no
            atendimento.
          </p>
        </div>

        {/* Cost of Inaction */}
        <div className="mx-auto mb-12 max-w-4xl rounded-xl bg-red-50 p-6 shadow-xl md:p-8">
          <h3 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl">
            📅 QUANTO ISSO ESTÁ TE CUSTANDO?
          </h3>
          <p className="text-center text-lg leading-relaxed text-gray-800">
            A cada dia que você adia, perde em média 1-2 clientes em potencial
            que não foram respondidos a tempo. Em 30 dias? São 30-60 leads
            perdidos. Em R$? São{" "}
            <span className="font-bold text-red-600">
              R$ 15.000 - R$ 50.000
            </span>{" "}
            jogados fora. Você pode estar deixando um BMW 0km na mesa TODO MÊS
            por não ter esse sistema.
          </p>
        </div>

        {/* Main CTA Button */}
        <div className="mb-8 text-center">
          <Button
            onClick={() => setShowForm(true)}
            size="lg"
            className="h-auto bg-orange-800 px-8 py-6 text-xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-orange-900 md:px-12 md:py-8 md:text-2xl"
          >
            QUERO CAPTAR MAIS CLIENTES
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>

        {/* What Happens Next */}
        <div className="mx-auto mb-12 max-w-3xl">
          <p className="mb-6 text-center text-xl font-bold text-white">
            👇 O que acontece depois do clique:
          </p>
          <div className="space-y-3 rounded-xl bg-white/10 p-6 backdrop-blur-sm md:p-8">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="mt-1 h-6 w-6 flex-shrink-0 text-green-300" />
                <p className="text-lg font-semibold text-white">{step}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-lg font-semibold text-white">
            Sem pressão. Sem compromisso. Sem pegadinhas. Apenas uma
            demonstração honesta.
          </p>
        </div>

        {/* Guarantee Reminder */}
        <div className="mx-auto mb-12 max-w-3xl rounded-xl border-2 border-blue-400 bg-blue-50 p-6 shadow-xl md:p-8">
          <h3 className="mb-6 text-center text-2xl font-bold text-gray-900 md:text-3xl">
            🔐 LEMBRE-SE DA GARANTIA:
          </h3>
          <div className="mb-6 space-y-3">
            {guaranteePoints.map((point, index) => (
              <div key={index} className="flex items-start gap-2">
                <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                <p className="text-lg font-semibold text-gray-800">{point}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-lg leading-relaxed text-gray-800">
            O pior que pode acontecer? Você ganha R$ 1.000 se não gostar. O
            melhor? Você capta 3-5 novos clientes/mês e aumenta faturamento em
            R$ 15-50k/mês.
          </p>
        </div>

        {/* Final Call */}
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-red-600 to-red-700 p-8 text-center shadow-2xl md:p-10">
          <h3 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            ⏰ ÚLTIMA CHAMADA:
          </h3>
          <Button
            onClick={() => setShowForm(true)}
            size="lg"
            className="mb-4 h-auto bg-orange-800 px-8 py-6 text-xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-orange-900 md:px-12 md:py-8 md:text-2xl"
          >
            GARANTIR MINHA VAGA AGORA
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
          <p className="text-xl font-bold text-yellow-300">
            ⚠️ Restam apenas 2 vagas este mês
          </p>
        </div>

        {/* Contact Info */}
        <div className="mx-auto mt-12 max-w-2xl rounded-xl bg-white/10 p-6 text-center backdrop-blur-sm md:p-8">
          <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            💬 DÚVIDAS? FALE COM A GENTE:
          </h3>
          <p className="mb-2 text-lg text-white">
            <strong>WhatsApp:</strong>{" "}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-yellow-300"
            >
              +55 11 99999-9999
            </a>
          </p>
          <p className="mb-4 text-lg text-white">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:contato@exemplo.com"
              className="underline hover:text-yellow-300"
            >
              contato@exemplo.com
            </a>
          </p>
          <p className="text-lg font-semibold text-white">
            Estamos aqui para ajudar.
          </p>
        </div>
      </div>
    </section>
  );

      {/* Conversion Form Modal */}
      <ConversionForm isOpen={showForm} onClose={() => setShowForm(false)} />
};

export default FinalCTASection;

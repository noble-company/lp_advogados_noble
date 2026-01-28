import { ArrowRight } from "lucide-react";

const SolutionPresentationSection = () => {
  const benefits = [
    "Nunca dorme, nunca tira férias, nunca adoece",
    "Responde em menos de 2 minutos, 24 horas por dia",
    "Faz as perguntas certas para qualificar o lead",
    "Agenda consultas automaticamente na sua agenda",
    "Filtra curiosos e só encaminha quem está pronto para fechar",
    "Fala de forma natural (clientes nem percebem que é IA)",
    "Custa MENOS que 1 café por dia",
  ];

  const conversation = [
    {
      sender: "client",
      time: "23:47",
      message: "Oi, preciso de advogado trabalhista",
    },
    {
      sender: "ai",
      time: "23:48",
      message:
        "Olá! Sim, atendemos direito trabalhista. Para te ajudar melhor, preciso entender seu caso. Você ainda está empregado ou já foi desligado?",
    },
    {
      sender: "client",
      time: "23:50",
      message: "Fui demitido sem justa causa",
    },
    {
      sender: "ai",
      time: "23:50",
      message: "Entendi. Há quanto tempo você trabalhou na empresa?",
    },
    {
      sender: "client",
      time: "23:52",
      message: "3 anos",
    },
    {
      sender: "ai",
      time: "23:52",
      message:
        "Perfeito. Seu caso tem mérito. Tenho disponibilidade para uma consulta segunda às 10h ou terça às 14h. Qual prefere?",
    },
    {
      sender: "client",
      time: "23:54",
      message: "Segunda 10h",
    },
    {
      sender: "ai",
      time: "23:54",
      message:
        "✅ Agendado! Confirmei na agenda do Dr. Silva para segunda 10h. Você receberá confirmação por email e lembrete 1 dia antes.",
    },
  ];

  return (
    <section className="relative bg-hero-gradient py-16 md:py-24">
      <div className="container relative z-10 mx-auto px-4">
        {/* Main Title */}
        <h2 className="mb-6 text-center text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          Conheça o Assistente Jurídico de IA
          <br />
          Que Capta, Qualifica e Agenda Clientes 24/7
          <br />
          <span className="text-green-300">(Enquanto Você Dorme)</span>
        </h2>

        {/* Subtitle */}
        <h3 className="mb-8 mt-12 text-center text-2xl font-semibold text-white md:text-3xl">
          Imagine ter um atendente PERFEITO que:
        </h3>

        {/* Benefits List */}
        <div className="mx-auto mb-12 max-w-3xl space-y-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-lg bg-white/10 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:bg-white/15"
            >
              <ArrowRight className="mt-1 h-6 w-6 flex-shrink-0 text-green-300" />
              <p className="text-lg text-white">{benefit}</p>
            </div>
          ))}
        </div>

        {/* Highlight Paragraph */}
        <div className="mx-auto mb-16 max-w-3xl rounded-xl bg-white/10 p-6 text-center backdrop-blur-sm md:p-8">
          <p className="text-xl font-bold text-white md:text-2xl">
            E o melhor: você NÃO precisa fazer NADA. Nós instalamos tudo e você
            só recebe leads qualificados.
          </p>
        </div>

        {/* WhatsApp Demo Title */}
        <h3 className="mb-8 text-center text-3xl font-bold text-white md:text-4xl">
          👀 VEJA UMA CONVERSA REAL EM AÇÃO:
        </h3>

        {/* WhatsApp Mockup */}
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-3xl bg-[#0a3d2c] shadow-2xl">
            {/* WhatsApp Header */}
            <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3">
              <div className="h-10 w-10 rounded-full bg-gray-300"></div>
              <div>
                <p className="font-semibold text-white">
                  Assistente Jurídico IA
                </p>
                <p className="text-xs text-gray-300">online</p>
              </div>
            </div>

            {/* Chat Area */}
            <div
              className="space-y-3 p-4"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            >
              {conversation.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "client" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 shadow-md ${
                      msg.sender === "client"
                        ? "bg-white text-gray-800"
                        : "bg-[#d9fdd3] text-gray-800"
                    }`}
                  >
                    <p className="text-sm leading-relaxed md:text-base">
                      {msg.message}
                    </p>
                    <p
                      className={`mt-1 text-right text-xs ${
                        msg.sender === "client"
                          ? "text-gray-500"
                          : "text-gray-600"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Highlight */}
          <div className="mt-8 rounded-xl bg-green-50 p-6 text-center shadow-lg md:p-8">
            <p className="text-xl font-bold leading-relaxed text-gray-800 md:text-2xl">
              👆 Isso aconteceu às 23h de um DOMINGO. Sem a IA, esse cliente
              teria ido para o concorrente na segunda-feira de manhã.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionPresentationSection;

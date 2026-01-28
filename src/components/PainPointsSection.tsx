import { Square, Check } from "lucide-react";

const PainPointsSection = () => {
  const painPoints = [
    "Leads te procuram no WhatsApp mas você demora horas (ou dias) para responder - e quando responde, já contrataram outro escritório",
    "Você perde entre 3-7 clientes em potencial TODO MÊS simplesmente por não conseguir atender rápido o suficiente",
    "Sua equipe (ou você mesmo) gasta 70% do dia respondendo mensagens básicas: \"Quanto custa?\", \"Vocês atendem X?\", \"Quais documentos?\"",
    "Leads desqualificados tomam seu tempo enquanto os bons ficam esperando... e desistem",
    "Você trabalha até tarde da noite \"só para responder o WhatsApp\" e ainda assim não consegue dar conta",
    "Fim de semana chega mensagem e segunda-feira o lead já fechou com seu concorrente",
  ];

  const solutions = [
    "Responder TODOS os leads em menos de 2 minutos",
    "Funcionar 24/7 (inclusive domingos e feriados)",
    "Qualificar automaticamente (filtra curiosos)",
    "Agendar consultas direto na sua agenda",
    "Sem você fazer ABSOLUTAMENTE NADA",
  ];

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Pain Points Title */}
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          Reconhece Alguma Dessas Situações?
        </h2>

        {/* Pain Points List */}
        <div className="mx-auto max-w-3xl space-y-4">
          {painPoints.map((pain, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:border-destructive/30 hover:bg-destructive/5"
            >
              <Square className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
              <p className="text-foreground">{pain}</p>
            </div>
          ))}
        </div>

        {/* Cost Highlight Box */}
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl bg-accent/10 border-2 border-accent/30 p-8 text-center">
          <h3 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">
            💸 QUANTO ISSO ESTÁ TE CUSTANDO?
          </h3>
          <div className="space-y-4 text-lg text-foreground">
            <p>
              Se você capta em média 1-2 clientes/mês de forma "orgânica" por indicação ou WhatsApp...
            </p>
            <p>
              E cada cliente vale entre <strong>R$ 5.000 - R$ 15.000</strong> para você...
            </p>
            <p className="text-xl font-semibold text-destructive">
              Você está perdendo entre R$ 15.000 - R$ 105.000 POR MÊS em clientes que te procuraram mas não foram atendidos a tempo.
            </p>
            <p className="text-2xl font-bold text-destructive">
              São R$ 180.000 - R$ 1.260.000 POR ANO jogados no lixo.
            </p>
          </div>
        </div>

        {/* Transition Section */}
        <div className="mt-16 text-center">
          <h3 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">
            E se existisse uma forma de:
          </h3>

          {/* Solutions List */}
          <div className="mx-auto max-w-xl space-y-4">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-lg bg-success/10 px-6 py-3 text-left"
              >
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-success">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
                <p className="font-medium text-foreground">{solution}</p>
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <p className="mt-8 text-xl font-semibold text-muted-foreground">
            E sem contratar nenhum atendente?
          </p>

          {/* Arrow */}
          <p className="mt-6 text-3xl font-bold text-accent">
            ↓ Existe. ↓
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainPointsSection;

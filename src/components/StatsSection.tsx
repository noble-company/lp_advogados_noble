import { TrendingUp, Clock, DollarSign, Timer, Target } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: "+40%",
      label: "de aumento na conversão de leads",
    },
    {
      icon: Clock,
      value: "2min",
      label: "vs 4h (média do mercado)",
      sublabel: "Tempo de resposta",
    },
    {
      icon: DollarSign,
      value: "R$ 15-30k",
      label: "/mês em clientes recuperados",
    },
    {
      icon: Timer,
      value: "15h",
      label: "/semana de tempo recuperado",
    },
    {
      icon: Target,
      value: "80%",
      label: "de redução em leads não qualificados",
    },
  ];

  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          📊 OS NÚMEROS NÃO MENTEM
        </h2>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group rounded-xl bg-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <stat.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="text-3xl font-bold text-accent">{stat.value}</div>
              {stat.sublabel && (
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {stat.sublabel}
                </div>
              )}
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

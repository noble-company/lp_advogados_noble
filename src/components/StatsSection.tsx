import { TrendingUp, Clock, DollarSign, Timer, Target, CheckCircle2 } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${new Intl.NumberFormat("pt-BR").format(Math.round(latest))}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
};

const StatsSection = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: 40,
      suffix: "%",
      prefix: "+",
      label: "Aumento na conversão de leads",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: Clock,
      displayValue: "2min",
      label: "Tempo de resposta médio",
      sublabel: "vs 4h do mercado",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: DollarSign,
      displayValue: "15-30k",
      prefix: "R$",
      label: "Novos clientes por mês",
      sublabel: "Valor médio recuperado",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      icon: Timer,
      value: 15,
      suffix: "h",
      label: "Tempo recuperado por semana",
      sublabel: "Para focar no core business",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      icon: Target,
      value: 80,
      suffix: "%",
      label: "Redução em leads não qualificados",
      sublabel: "Apenas clientes prontos",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-background via-muted/20 to-background py-12 sm:py-16 md:py-20 lg:py-32">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-3 sm:px-4">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 md:mb-16 text-center"
        >
          <div className="mb-3 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-accent/10 border border-accent/20 px-3 py-1.5 sm:px-4 sm:py-2">
            <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
            <span className="text-xs sm:text-sm font-bold text-accent uppercase tracking-wide">
              Resultados Comprovados
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground md:text-4xl lg:text-5xl xl:text-6xl">
            Os Números Não Mentem
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto px-4">
            Dados reais de escritórios que automatizaram o atendimento com Noble Company
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-card p-4 sm:p-6 shadow-lg border border-border hover:border-accent/50 transition-all duration-300"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-all duration-500" />

              <div className="relative z-10">
                {/* Icon */}
                <div className={`mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${stat.color}`} />
                </div>

                {/* Value */}
                <div className={`text-3xl sm:text-4xl font-bold ${stat.color} mb-1`}>
                  {stat.value !== undefined ? (
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  ) : (
                    <span>{stat.prefix}{stat.displayValue}</span>
                  )}
                </div>

                {/* Sublabel */}
                {stat.sublabel && (
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                    {stat.sublabel}
                  </div>
                )}

                {/* Label */}
                <p className="text-xs sm:text-sm text-foreground/80 font-medium leading-tight">
                  {stat.label}
                </p>
              </div>

              {/* Decorative corner */}
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <p className="text-xs sm:text-sm text-muted-foreground">
            ✨ <span className="font-semibold text-foreground">Estes resultados podem ser seus</span> • Continue lendo
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;

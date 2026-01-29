import { Check, CheckCheck } from "lucide-react";

const WhatsAppMockup = () => {
  return (
    <div className="relative mx-auto w-[240px] sm:w-[280px] md:w-[320px]">
      {/* Phone Frame */}
      <div className="relative rounded-[32px] sm:rounded-[40px] bg-foreground p-1.5 sm:p-2 shadow-2xl">
        {/* Phone Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-5 w-20 sm:h-6 sm:w-24 -translate-x-1/2 rounded-b-2xl bg-foreground" />
        
        {/* Screen */}
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] bg-[#0b141a]">
          {/* WhatsApp Header */}
          <div className="flex items-center gap-2 sm:gap-3 bg-[#1f2c34] px-3 py-2.5 pt-7 sm:px-4 sm:py-3 sm:pt-8">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent/80">
              <span className="text-base sm:text-lg font-bold text-accent-foreground">IA</span>
            </div>
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-medium text-primary-foreground">Assistente Jurídico</p>
              <p className="text-[10px] sm:text-xs text-success">online</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div 
            className="space-y-2 sm:space-y-3 p-2.5 sm:p-4" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              minHeight: "260px"
            }}
          >
            {/* Bot Message 1 */}
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg rounded-tl-none bg-[#1f2c34] px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-sm">
                <p className="text-xs sm:text-sm text-primary-foreground">
                  Olá! Sou a assistente virtual do escritório. Em que posso ajudar?
                </p>
                <div className="mt-1 flex items-center justify-end gap-1">
                  <span className="text-[10px] text-muted-foreground">10:32</span>
                </div>
              </div>
            </div>

            {/* User Message */}
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-lg rounded-tr-none bg-[#005c4b] px-3 py-2 shadow-sm">
                <p className="text-sm text-primary-foreground">
                  Preciso de ajuda com um caso de direito trabalhista
                </p>
                <div className="mt-1 flex items-center justify-end gap-1">
                  <span className="text-[10px] text-primary-foreground/70">10:33</span>
                  <CheckCheck className="h-3 w-3 text-[#53bdeb]" />
                </div>
              </div>
            </div>

            {/* Bot Message 2 */}
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg rounded-tl-none bg-[#1f2c34] px-3 py-2 shadow-sm">
                <p className="text-sm text-primary-foreground">
                  Claro! Temos especialistas em Direito Trabalhista. Posso agendar uma consulta gratuita para você?
                </p>
                <div className="mt-1 flex items-center justify-end gap-1">
                  <span className="text-[10px] text-muted-foreground">10:33</span>
                </div>
              </div>
            </div>

            {/* User Message 2 */}
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-lg rounded-tr-none bg-[#005c4b] px-3 py-2 shadow-sm">
                <p className="text-sm text-primary-foreground">
                  Sim, por favor! 🙏
                </p>
                <div className="mt-1 flex items-center justify-end gap-1">
                  <span className="text-[10px] text-primary-foreground/70">10:34</span>
                  <CheckCheck className="h-3 w-3 text-[#53bdeb]" />
                </div>
              </div>
            </div>

            {/* Bot Message 3 - Typing */}
            <div className="flex justify-start">
              <div className="rounded-lg rounded-tl-none bg-[#1f2c34] px-4 py-3 shadow-sm">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-accent/20 blur-2xl" />
      <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-primary/30 blur-2xl" />
    </div>
  );
};

export default WhatsAppMockup;

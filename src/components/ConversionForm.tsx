import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WHATSAPP_CONFIG } from "@/lib/constants";
import { useTracking } from "@/hooks/useTracking";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ConversionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConversionForm = ({ isOpen, onClose }: ConversionFormProps) => {
  const { trackFormEvent } = useTracking();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    firm: "",
    area: "",
    leadsPerMonth: "",
  });

  // Track form open/close
  useEffect(() => {
    if (isOpen) {
      trackFormEvent("open", "conversion_form");
    }
  }, [isOpen, trackFormEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission
    trackFormEvent("submit", "conversion_form", {
      area: formData.area,
      leads_per_month: formData.leadsPerMonth,
      has_firm_name: !!formData.firm,
    });
    
    // Create WhatsApp message with form data
    const message = `🎯 *Nova Demonstração Solicitada*

📋 *Dados do Interessado:*
• Nome: ${formData.name}
• Email: ${formData.email}
• WhatsApp: ${formData.whatsapp}
• Escritório: ${formData.firm}
• Área de Atuação: ${formData.area}
• Leads/mês: ${formData.leadsPerMonth}

Aguardo contato para agendar a demonstração!`;

    const whatsappLink = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappLink, "_blank");
    
    // Reset form and close
    setFormData({
      name: "",
      email: "",
      whatsapp: "",
      firm: "",
      area: "",
      leadsPerMonth: "",
    });
    onClose();
  };


  // Debounce map para cada campo
  const debounceTimers = React.useRef<{ [key: string]: NodeJS.Timeout }>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Limpa debounce anterior se existir
    if (debounceTimers.current[field]) {
      clearTimeout(debounceTimers.current[field]);
    }
    // Inicia novo debounce
    debounceTimers.current[field] = setTimeout(() => {
      trackFormEvent("field_interaction", "conversion_form", {
        field,
      });
    }, 1500);
  };

  const handleClose = () => {
    trackFormEvent("close", "conversion_form");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            🎯 Agende Sua Demonstração Gratuita
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            Preencha os dados abaixo e entraremos em contato em até 2 horas
            úteis para agendar sua demonstração personalizada.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold">
              Nome Completo *
            </Label>
            <Input
              id="name"
              type="text"
              required
              placeholder="Dr. João Silva"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="h-11"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="joao@escritorio.com.br"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="h-11"
            />
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="text-sm font-semibold">
              WhatsApp (com DDD) *
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              required
              placeholder="(11) 99999-9999"
              value={formData.whatsapp}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
              className="h-11"
            />
          </div>

          {/* Firm Name */}
          <div className="space-y-2">
            <Label htmlFor="firm" className="text-sm font-semibold">
              Nome do Escritório *
            </Label>
            <Input
              id="firm"
              type="text"
              required
              placeholder="Silva & Advogados Associados"
              value={formData.firm}
              onChange={(e) => handleChange("firm", e.target.value)}
              className="h-11"
            />
          </div>

          {/* Practice Area */}
          <div className="space-y-2">
            <Label htmlFor="area" className="text-sm font-semibold">
              Área de Atuação Principal *
            </Label>
            <Select
              required
              value={formData.area}
              onValueChange={(value) => handleChange("area", value)}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Selecione sua área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trabalhista">Direito Trabalhista</SelectItem>
                <SelectItem value="familia">Direito de Família</SelectItem>
                <SelectItem value="empresarial">
                  Direito Empresarial
                </SelectItem>
                <SelectItem value="consumidor">
                  Direito do Consumidor
                </SelectItem>
                <SelectItem value="previdenciario">
                  Direito Previdenciário
                </SelectItem>
                <SelectItem value="civil">Direito Civil</SelectItem>
                <SelectItem value="criminal">Direito Criminal</SelectItem>
                <SelectItem value="tributario">Direito Tributário</SelectItem>
                <SelectItem value="imobiliario">
                  Direito Imobiliário
                </SelectItem>
                <SelectItem value="outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Leads per Month */}
          <div className="space-y-2">
            <Label htmlFor="leadsPerMonth" className="text-sm font-semibold">
              Quantos leads você recebe por mês (aproximadamente)? *
            </Label>
            <Select
              required
              value={formData.leadsPerMonth}
              onValueChange={(value) => handleChange("leadsPerMonth", value)}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Selecione uma faixa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-10">0-10 leads/mês</SelectItem>
                <SelectItem value="10-20">10-20 leads/mês</SelectItem>
                <SelectItem value="20-50">20-50 leads/mês</SelectItem>
                <SelectItem value="50-100">50-100 leads/mês</SelectItem>
                <SelectItem value="100+">Mais de 100 leads/mês</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="h-12 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-base font-bold text-white hover:from-orange-600 hover:to-orange-700"
          >
            🚀 Agendar Demonstração Gratuita
          </Button>

          <p className="text-center text-xs text-gray-500">
            ✅ Sem compromisso • ✅ Resposta em até 2h • ✅ 100% gratuito
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ConversionForm;

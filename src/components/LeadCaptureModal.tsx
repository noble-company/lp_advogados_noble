import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTracking } from "@/hooks/useTracking";
import { useLeadForm } from "@/hooks/useLeadForm";
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
import { Send, CheckCircle } from "lucide-react";

const LeadCaptureModal = () => {
  const { isOpen, closeLeadForm } = useLeadForm();
  const { trackFormEvent } = useTracking();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    instagram: "",
    companySize: "",
    dailyServices: "",
  });

  // Track form open
  useEffect(() => {
    if (isOpen) {
      trackFormEvent("open", "lead_capture_form");
      setIsSubmitted(false);
    }
  }, [isOpen, trackFormEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Track form submission
    trackFormEvent("submit", "lead_capture_form", {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      instagram: formData.instagram,
      company_size: formData.companySize,
      daily_services: formData.dailyServices,
      has_instagram: !!formData.instagram,
    });

    // Show success state
    setIsSubmitted(true);

    // Reset form after delay and close
    setTimeout(() => {
      setFormData({
        name: "",
        phone: "",
        email: "",
        instagram: "",
        companySize: "",
        dailyServices: "",
      });
      setIsSubmitted(false);
      closeLeadForm();
    }, 3000);
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
      trackFormEvent("field_interaction", "lead_capture_form", {
        field,
      });
    }, 1500);
  };

  const handleClose = () => {
    trackFormEvent("close", "lead_capture_form");
    closeLeadForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle className="mb-4 h-16 w-16 text-success" />
            <h3 className="mb-2 text-2xl font-bold text-gray-900">
              Dados enviados com sucesso!
            </h3>
            <p className="text-base text-gray-600">
              Entraremos em contato em breve. Aguarde! 🚀
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                🎯 Fale Com Um Especialista
              </DialogTitle>
              <DialogDescription className="text-base text-gray-600">
                Preencha os dados abaixo e nosso Agente IA Sofia vai entrar em contato em no máximo 2 minutos.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="lead-name" className="text-sm font-semibold">
                  Nome *
                </Label>
                <Input
                  id="lead-name"
                  type="text"
                  required
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="h-11"
                />
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <Label htmlFor="lead-phone" className="text-sm font-semibold">
                  Telefone *
                </Label>
                <Input
                  id="lead-phone"
                  type="tel"
                  required
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="h-11"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="lead-email" className="text-sm font-semibold">
                  Email *
                </Label>
                <Input
                  id="lead-email"
                  type="email"
                  required
                  placeholder="seuemail@empresa.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="h-11"
                />
              </div>

              {/* Instagram da Empresa */}
              <div className="space-y-2">
                <Label htmlFor="lead-instagram" className="text-sm font-semibold">
                  Instagram da Empresa *
                </Label>
                <Input
                  id="lead-instagram"
                  type="text"
                  placeholder="@suaempresa"
                  value={formData.instagram}
                  onChange={(e) => handleChange("instagram", e.target.value)}
                  className="h-11"
                />
              </div>

              {/* Tamanho da Empresa */}
              <div className="space-y-2">
                <Label htmlFor="lead-companySize" className="text-sm font-semibold">
                  Qual o Tamanho da Empresa? *
                </Label>
                <Select
                  required
                  value={formData.companySize}
                  onValueChange={(value) => handleChange("companySize", value)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Selecione o tamanho" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="somente_eu">Somente eu</SelectItem>
                    <SelectItem value="1-5">1-5 colaboradores</SelectItem>
                    <SelectItem value="5-20">5-20 colaboradores</SelectItem>
                    <SelectItem value="20-50">20-50 colaboradores</SelectItem>
                    <SelectItem value="50-100">50-100 colaboradores</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Média de Atendimentos/Dia */}
              <div className="space-y-2">
                <Label htmlFor="lead-dailyServices" className="text-sm font-semibold">
                  Qual a Média de Atendimentos/Dia? *
                </Label>
                <Select
                  required
                  value={formData.dailyServices}
                  onValueChange={(value) => handleChange("dailyServices", value)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Selecione a faixa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-10">0-10 atendimentos</SelectItem>
                    <SelectItem value="10-30">10-30 atendimentos</SelectItem>
                    <SelectItem value="30-50">30-50 atendimentos</SelectItem>
                    <SelectItem value="50-100">50-100 atendimentos</SelectItem>
                    <SelectItem value="100+">100+ atendimentos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="h-12 w-full bg-gradient-to-r from-green-600 to-green-700 text-base font-bold text-white hover:from-green-700 hover:to-green-800"
              >
                <Send className="mr-2 h-5 w-5" />
                Enviar e Falar com Especialista
              </Button>

              <p className="text-center text-xs text-gray-500">
                ✅ Sem compromisso • ✅ Resposta em até 2 minutos • ✅ 100% gratuito
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;

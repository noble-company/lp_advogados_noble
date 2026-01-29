// WhatsApp Configuration - Noble Company
export const WHATSAPP_CONFIG = {
  number: "553591101380",
  
  messages: {
    default: "Olá Noble Company! Vi a apresentação sobre os Agentes de IA para advocacia e gostaria de saber mais sobre como posso captar mais clientes qualificados.",
    hero: "Olá Noble Company! Vi a apresentação sobre os Agentes de IA para advocacia e gostaria de saber mais sobre como posso captar mais clientes qualificados.",
    testimonials: "Olá Noble Company! Vi os depoimentos de outros escritórios e gostaria de saber como posso ter resultados semelhantes.",
    guarantees: "Olá! Vi a garantia tripla e gostaria de agendar uma demonstração sem compromisso.",
    benefits: "Olá! Quero saber mais sobre como automatizar meu atendimento e captar mais clientes.",
    finalCta: "Olá! Estou pronto para começar a captar mais clientes com o Assistente Jurídico de IA.",
    faq: "Olá! Tenho algumas dúvidas sobre o Assistente Jurídico de IA.",
    solution: "Olá! Vi a demonstração da conversa e quero implementar isso no meu escritório.",
  },
  
  getLink: (
    messageKey: keyof typeof WHATSAPP_CONFIG.messages = 'default',
    utmParams?: Record<string, string>
  ) => {
    const message = WHATSAPP_CONFIG.messages[messageKey];
    let link = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(message)}`;
    
    // Append UTM parameters if provided
    if (utmParams) {
      const utmString = Object.entries(utmParams)
        .filter(([_, value]) => value) // Filter out empty values
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
      
      if (utmString) {
        link += `&${utmString}`;
      }
    }
    
    return link;
  },
};

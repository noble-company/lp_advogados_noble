const Footer = () => {
  return (
    <footer className="bg-[#1a2942] py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Copyright */}
        <p className="mb-4 text-center text-sm text-gray-300 md:text-base">
          © 2025 LP Advogados - Todos os direitos reservados
        </p>

        {/* Links */}
        <div className="flex justify-center gap-4 text-sm text-gray-400 md:gap-6 md:text-base">
          <a
            href="#termos"
            className="transition-colors hover:text-white hover:underline"
          >
            Termos de Uso
          </a>
          <span>|</span>
          <a
            href="#privacidade"
            className="transition-colors hover:text-white hover:underline"
          >
            Política de Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

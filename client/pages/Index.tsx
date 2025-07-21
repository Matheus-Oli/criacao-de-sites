import {
  Zap,
  Globe,
  Target,
  Cog,
  Star,
  Check,
  ArrowRight,
  Smartphone,
  Users,
  TrendingUp,
  Clock,
  ShoppingCart,
  Camera,
  BarChart3,
  Menu,
  X,
  Award,
  UserCheck,
  Heart,
  Briefcase,
  Shield,
  Lightbulb,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

// Project Carousel Component
const ProjectCarousel = ({
  images,
  projectName,
  onImageClick,
}: {
  images: string[];
  projectName: string;
  onImageClick: (index: number) => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full group">
      <img
        src={images[currentIndex]}
        alt={`${projectName} - Imagem ${currentIndex + 1}`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer touch-manipulation"
        onClick={() => onImageClick(currentIndex)}
        loading="lazy"
      />

      {/* Navigation arrows - Always visible on mobile */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          prevImage();
        }}
        className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1.5 sm:p-2 rounded-full opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 z-20 touch-manipulation"
        aria-label="Imagem anterior"
      >
        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          nextImage();
        }}
        className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1.5 sm:p-2 rounded-full opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 z-20 touch-manipulation"
        aria-label="Próxima imagem"
      >
        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-1 sm:bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 touch-manipulation ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Ir para imagem ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Full Screen Modal Component
const ProjectModal = ({
  project,
  imageIndex,
  onClose,
  onImageChange,
}: {
  project: {
    name: string;
    images: string[];
    description: string;
    category: string;
    technologies: string[];
    features: string[];
    status: string;
  };
  imageIndex: number;
  onClose: () => void;
  onImageChange: (index: number) => void;
}) => {
  const nextImage = () => {
    onImageChange((imageIndex + 1) % project.images.length);
  };

  const prevImage = () => {
    onImageChange(
      (imageIndex - 1 + project.images.length) % project.images.length,
    );
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "unset";
    };
  }, [imageIndex]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-60"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Image navigation */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
      >
        <ArrowRight className="w-6 h-6 rotate-180" />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
      >
        <ArrowRight className="w-6 h-6" />
      </button>

      {/* Main content */}
      <div className="max-w-6xl w-full max-h-[90vh] flex flex-col lg:flex-row gap-6">
        {/* Image */}
        <div className="flex-1 relative">
          <img
            src={project.images[imageIndex]}
            alt={`${project.name} - Imagem ${imageIndex + 1}`}
            className="w-full h-full max-h-[70vh] object-contain rounded-lg"
          />

          {/* Image counter */}
          <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {imageIndex + 1} / {project.images.length}
          </div>
        </div>

        {/* Project info */}
        <div className="lg:w-80 bg-white rounded-lg p-6 max-h-[70vh] overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-brand-blue text-white">
              {project.category}
            </Badge>
            <Badge className="bg-green-500 text-white">{project.status}</Badge>
          </div>

          <h3 className="text-2xl font-bold text-brand-dark mb-4">
            {project.name}
          </h3>
          <p className="text-gray-600 mb-6">{project.description}</p>

          <div className="mb-6">
            <h4 className="font-semibold text-brand-dark mb-2">Tecnologias:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-brand-dark mb-2">
              Funcionalidades:
            </h4>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Thumbnail navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {project.images.map((image, index) => (
          <button
            key={index}
            onClick={() => onImageChange(index)}
            className={`w-16 h-10 rounded overflow-hidden transition-all duration-300 ${
              index === imageIndex
                ? "ring-2 ring-white"
                : "opacity-50 hover:opacity-75"
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default function Index() {
  const whatsappNumber = "5511999999999"; // Replace with actual WhatsApp number
  const whatsappMessage =
    "Olá! Tenho interesse nos seus serviços digitais. Podemos conversar?";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  // Mobile navigation state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu after navigation
      setIsMobileMenuOpen(false);
    }
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Simple scroll animation setup
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll(".scroll-animate");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Typewriter effect
  const words = ["tecnologia", "velocidade", "preço justo", "qualidade"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const current = words[currentWordIndex];

        if (isDeleting) {
          setCurrentText(current.substring(0, currentText.length - 1));
        } else {
          setCurrentText(current.substring(0, currentText.length + 1));
        }

        if (!isDeleting && currentText === current) {
          setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((currentWordIndex + 1) % words.length);
        }
      },
      isDeleting ? 100 : 150,
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words]);

  const services = [
    {
      icon: Target,
      title: "Landing Pages",
      description:
        "Páginas estratégicas focadas em conversão. Ideal para campanhas, captação de leads e ofertas. Layouts persuasivos, integração com marketing para maximizar seus resultados.",
      features: [
        "Alta conversão",
        "Mostra seus serviços",
        "Seus clientes entendem",
      ],
      popular: false,
    },
    {
      icon: Globe,
      title: "Sites Institucionais",
      description:
        "Sites profissionais e completos com design moderno, responsivo e pensado para gerar confiança e resultados. Inclui páginas institucionais, formulários personalizados e integração com redes sociais.",
      features: [
        "Design responsivo",
        "SEO otimizado",
        "Formulários integrados",
      ],
      popular: true,
    },
    {
      icon: Cog,
      title: "Sistemas Personalizados",
      description:
        "Desenvolvimento sob medida para o seu negócio. Desde controle de estoque até sistemas de gestão completos, com foco em automação e praticidade para o dia a dia.",
      features: [
        "Desenvolvimento customizado",
        "Banco de dados integrado",
        "Suporte técnico 24h",
      ],
      popular: false,
    },
    {
      icon: Users,
      title: "Renovação de Sites",
      description:
        "Modernize seu site atual com novo design, performance otimizada e funcionalidades atualizadas. Reaproveitamos seu conteúdo e melhoramos o que realmente importa.",
      features: [
        "Design moderno e responsivo",
        "Performance otimizada",
        "Migração segura",
      ],
      popular: false,
    },
    {
      icon: Instagram, // ou Instagram, Facebook, Twitter dependendo do que você preferir
      title: "Gerencia de Redes Sociais",
      description:
        "Estratégias completas para suas redes sociais. Criação de conteúdo, engajamento, análise de métricas e crescimento orgânico. Presença digital consistente que conecta com seu público.",
      features: [
        "Conteúdo estratégico",
        "Identidade visual",
        "Análise de conversão digital",
      ],
      popular: false,
      comingSoon: true,
    },
    {
      icon: Camera,
      title: "Portfólios Profissionais",
      description:
        "Websites elegantes para artistas, criadores, fotógrafos e freelancers que querem mostrar seus trabalhos com estilo e profissionalismo.",
      features: [
        "Galeria de projetos",
        "Design elegante e personalizado",
        "Formulário de contato",
      ],
      popular: false,
    },
  ];

  const handleServiceClick = (serviceTitle: string) => {
    const message = `Olá! Quero seguir com o serviço: ${serviceTitle}. Podemos conversar sobre os detalhes?`;
    const serviceWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(serviceWhatsappUrl, "_blank");
  };

  const projects = [
    {
      name: "Sistema Pedal Cicle",
      images: ["/pedal-cicle/PC3.png", "/pedal-cicle/PC1.png", "/pedal-cicle/PC2.png"],
      description:
        "Sistema completo para gestão de estoque e vendas, com dashboards interativos, geração de relatórios detalhados e exportação de dados para Excel.",
      category: "Sistema Web",
      technologies: ["React", "Node.js", "Supabase"],
      features: [
        "Dashboard de produtos e vendas",
        "Controle de estoque",
        "Relatórios financeiros",
      ],
      status: "Concluído",
    },
    {
      "name": "Landing Page Pedal Cicle",
      "images": ["/pedal-cicle/PC4.png", "/pedal-cicle/PC5.png", "/pedal-cicle/PC6.png"],
      "description": "Landing page moderna e responsiva para apresentação de serviços e produtos, com foco em captura de leads, integração com formuláriose monitoramento de analytics.",
      "category": "Landing Page",
      "technologies": ["React", "Tailwind", "TypeScript"],
      "features": [
        "Design responsivo otimizado para múltiplos dispositivos",
        "Formulários integrados para captura de leads",
        "Análise de dados e performance via ferramentas de analytics"
      ],
      "status": "Em andamento"
    },
    {
      name: "Portfólio Pessoal",
      images: ["/portfolio-pessoal/PP1.png", "/portfolio-pessoal/PP2.png", "/portfolio-pessoal/PP3.png"],
      description:
        "Portfólio profissional apresentando competências, trajetória, projetos realizados e experiências relevantes.",
      category: "Portfólio Profissional",
      technologies: ["React", "Vite"],
      features: ["Apresentação de projetos", "Links para redes sociais e contato", "Design moderno e condizente"],
      status: "Concluído",
    },
    {
      name: "Site Institucional Conexao 31",
      images: ["/conexao-31/C3.png", "/conexao-31/C1.png", "/conexao-31/C2.png"],
      description: "Site institucional completo com formulário, envio de email, captura de leads, responsividade e chamativo, trazendo uma experiência relevante para os usuários.",
      category: "Site Institucional",
      technologies: ["React", "Vite", "Resend"],
      features: ["Formulário funcional", "Captura de leads", "Projeto personalizavel"],
      status: "Concluído",
    },
  ];

  // Modal state for fullscreen project view
  const [selectedProject, setSelectedProject] = useState<{
    name: string;
    images: string[];
    description: string;
    category: string;
    technologies: string[];
    features: string[];
    status: string;
  } | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const plans = [
    {
      name: "Site Essencial",
      price: "397",
      description: "Para quem precisa de um site simples e funcional.",
      features: [
        "Até 4 páginas (Início, Sobre, Serviços, Contato)",
        "Design moderno e responsivo",
        "Formulário de contato",
        "SEO básico",
        "Domínio incluído (1 ano)",
        "Hospedagem gratuita (1 ano)",
        "Suporte até a entrega",
        "Suporte técnico mensal opcional (R$49/mês)",
      ],
    },
    {
      name: "Site Profissional",
      price: "697",
      description: "Para empresas que querem uma presença forte e completa na internet.",
      features: [
        "Até 8 páginas personalizadas",
        "Design profissional",
        "Blog integrado",
        "Galeria de fotos ou serviços",
        "Integração com Google Analytics",
        "SEO otimizado",
        "Domínio .com.br incluído (1 ano)",
        "Hospedagem gratuita (1 ano)",
        "Suporte por 3 meses incluso",
        "Suporte técnico mensal opcional (R$49/mês)",
      ],
      popular: true,
    },
    {
      name: "Site Avançado",
      price: "Em breve",
      description: "Para empresas que precisam de funcionalidades mais robustas e exclusivas.",
      features: [
        "Páginas ilimitadas",
        "Painel administrativo completo",
        "Sistema de agendamento",
        "Chat integrado",
        "Certificado SSL premium",
        "Manutenção mensal incluída",
        "Suporte técnico 24h",
      ],
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex flex-row items-center">
              <img src="/favicon.ico" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" alt="Matheus Oliveira Logo" />
              <h1 className="text-sm sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent ml-2">
                <span className="hidden xs:inline">M</span>atheus Oliveira
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8">
              <button
                onClick={() => scrollToSection("sobre")}
                className="text-gray-700 hover:text-brand-blue transition-colors duration-200 font-medium text-sm xl:text-base"
              >
                Sobre mim
              </button>
              <button
                onClick={() => scrollToSection("servicos")}
                className="text-gray-700 hover:text-brand-blue transition-colors duration-200 font-medium text-sm xl:text-base"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection("diferenciais")}
                className="text-gray-700 hover:text-brand-blue transition-colors duration-200 font-medium text-sm xl:text-base"
              >
                Diferenciais
              </button>
              <button
                onClick={() => scrollToSection("certificacoes")}
                className="text-gray-700 hover:text-brand-blue transition-colors duration-200 font-medium text-sm xl:text-base"
              >
                Certificações
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="text-gray-700 hover:text-brand-blue transition-colors duration-200 font-medium text-sm xl:text-base"
              >
                Portfólio
              </button>
              <button
                onClick={() => scrollToSection("planos")}
                className="text-gray-700 hover:text-brand-blue transition-colors duration-200 font-medium text-sm xl:text-base"
              >
                Planos
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-brand-blue hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg animate-in slide-in-from-top-2 duration-200">
              <nav className="px-4 py-6 space-y-2 max-h-[80vh] overflow-y-auto">
                <button
                  onClick={() => scrollToSection("sobre")}
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:text-brand-blue hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 font-medium rounded-lg touch-manipulation"
                >
                  Sobre mim
                </button>
                <button
                  onClick={() => scrollToSection("servicos")}
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:text-brand-blue hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 font-medium rounded-lg touch-manipulation"
                >
                  Serviços
                </button>
                <button
                  onClick={() => scrollToSection("diferenciais")}
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:text-brand-blue hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 font-medium rounded-lg touch-manipulation"
                >
                  Diferenciais
                </button>
                <button
                  onClick={() => scrollToSection("certificacoes")}
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:text-brand-blue hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 font-medium rounded-lg touch-manipulation"
                >
                  Certificações
                </button>
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:text-brand-blue hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 font-medium rounded-lg touch-manipulation"
                >
                  Portfólio
                </button>
                <button
                  onClick={() => scrollToSection("planos")}
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:text-brand-blue hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 font-medium rounded-lg touch-manipulation"
                >
                  Planos
                </button>
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <Button
                    className="w-full bg-whatsapp hover:bg-whatsapp/90 active:bg-whatsapp/80 text-white px-4 py-3 text-base rounded-lg shadow-md transition-all duration-300 font-medium touch-manipulation"
                    onClick={() => {
                      window.open(whatsappUrl, "_blank");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F516abc652f6f499f9918c14a2c7d6dd1%2F77d1d20784d044eebc6da2c26251256e?format=webp&width=800"
                      alt="WhatsApp"
                      className="w-4 h-4 mr-2"
                    />
                    Fale comigo no WhatsApp
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[85vh] sm:min-h-[90vh] flex items-center pt-4 sm:pt-8">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/50"></div>

          {/* Floating Geometric Shapes - Responsive positioning */}
          <div className="absolute top-10 left-4 sm:top-20 sm:left-20 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 rounded-2xl sm:rounded-3xl rotate-12"></div>
          <div className="absolute top-20 right-8 sm:top-40 sm:right-32 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-brand-purple/15 to-brand-blue/15 rounded-full"></div>
          <div className="absolute bottom-32 left-8 sm:bottom-40 sm:left-40 w-8 h-8 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 rounded-xl sm:rounded-2xl rotate-45"></div>
          <div className="absolute bottom-10 right-4 sm:bottom-20 sm:right-20 w-10 h-10 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-purple/10 to-brand-blue/10 rounded-full"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] opacity-50 sm:opacity-100"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6 sm:space-y-8 lg:pr-8 text-center lg:text-left">
              <div className="space-y-4 sm:space-y-6">
                <Badge className="inline-flex items-center bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 text-brand-dark border-brand-blue/20 px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium shadow-lg backdrop-blur-sm">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-yellow-500" />
                  Mais barato que o mercado
                </Badge>

                <div className="space-y-4 sm:space-y-6">
                  <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    <span className="block text-brand-dark">Seu negócio</span>
                    <span className="block text-brand-dark">
                      no digital com
                    </span>
                    <span className="block bg-gradient-to-r from-brand-blue via-brand-purple to-brand-blue bg-clip-text text-transparent min-h-[1.2em]">
                      {currentText}
                      <span className="animate-pulse">|</span>
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Criação de sites, sistemas e páginas para transformar a
                    presença digital do seu negócio
                  </p>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/60 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-sm">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-brand-blue flex-shrink-0" />
                    <span>Entrega rápida</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/60 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-sm">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F516abc652f6f499f9918c14a2c7d6dd1%2Fcf4a28f9586f4e19a291c587dc7d9a75?format=webp&width=800"
                      alt="WhatsApp"
                      className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                    />
                    <span>Suporte direto</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/60 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-sm">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 flex-shrink-0" />
                    <span>Pagamento facilitado</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                <Button
                  className="bg-whatsapp hover:bg-whatsapp/90 active:bg-whatsapp/80 text-white px-4 py-3 sm:px-6 sm:py-3 text-sm sm:text-base rounded-full shadow-md transform hover:scale-105 active:scale-95 transition-all duration-300 font-medium touch-manipulation"
                  onClick={() => window.open(whatsappUrl, "_blank")}
                >
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F516abc652f6f499f9918c14a2c7d6dd1%2F77d1d20784d044eebc6da2c26251256e?format=webp&width=800"
                    alt="WhatsApp"
                    className="w-4 h-4 mr-2"
                  />
                  Fale comigo no WhatsApp
                </Button>

                <Button
                  variant="outline"
                  onClick={() => scrollToSection("portfolio")}
                  className="px-4 py-3 sm:px-6 sm:py-3 text-sm sm:text-base rounded-full border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white active:bg-brand-blue/90 transition-all duration-300 bg-white/80 backdrop-blur-sm touch-manipulation"
                >
                  <span className="hidden sm:inline">Veja exemplos de projetos</span>
                  <span className="sm:hidden">Ver projetos</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Right Column - Creative Visual - Hidden on mobile, simplified on tablet */}
            <div className="relative hidden lg:block">
              <div className="relative max-w-lg mx-auto">
                {/* Main Feature Cards Stack */}
                <div className="relative space-y-6">
                  {/* Top Card - Website Preview */}
                  <div className="transform rotate-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-200/50 hover:rotate-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      </div>
                      <div className="text-xs text-gray-500 ml-auto">
                        seusite.com.br
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gradient-to-r from-brand-blue to-brand-purple rounded w-3/4"></div>
                      <div className="h-2 bg-gray-200 rounded w-full"></div>
                      <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="h-12 bg-brand-blue/20 rounded"></div>
                        <div className="h-12 bg-brand-purple/20 rounded"></div>
                        <div className="h-12 bg-whatsapp/20 rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Card - Analytics */}
                  <div className="transform -rotate-3 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-200/50 hover:rotate-0 transition-transform duration-500 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-whatsapp" />
                        Resultados
                      </h3>
                      <Badge className="bg-whatsapp/10 text-whatsapp text-xs">
                        +127%
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-brand-blue">
                          2.4k
                        </div>
                        <div className="text-xs text-gray-500">Visitantes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-brand-purple">
                          89
                        </div>
                        <div className="text-xs text-gray-500">Conversões</div>
                      </div>
                    </div>
                    <div className="flex items-end gap-1 h-8 mt-4">
                      {[30, 60, 40, 80, 50, 90, 70].map((height, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-t from-brand-blue to-brand-purple rounded-sm flex-1 opacity-80"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Card - Services */}
                  <div className="transform rotate-1 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-200/50 hover:rotate-0 transition-transform duration-500">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Cog className="w-4 h-4 text-brand-blue" />
                      Serviços
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-brand-blue rounded-full"></div>
                        <span className="text-gray-700">
                          Sites Institucionais
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-brand-purple rounded-full"></div>
                        <span className="text-gray-700">
                          Sistemas Personalizados
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-whatsapp rounded-full"></div>
                        <span className="text-gray-700">Landing Pages</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-gray-700">
                          Portfólio Profissional
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Success Badge */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-brand-blue to-brand-purple text-white rounded-full p-3 shadow-xl">
                  <Check className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="sobre"
        className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50 scroll-animate"
        style={{
          opacity: 0,
          transform: "translateY(30px)",
          transition: "all 0.6s ease-out",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-4 sm:mb-6">
              Sobre mim
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Desenvolvedor apaixonado por criar soluções digitais que
              transformam negócios
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">

              {/* Main Title */}
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-brand-dark leading-tight">
                  Criando <span className="text-brand-blue">soluções digitais</span>{" "} sob medida para negócios que querem <span className="text-brand-blue">crescer online</span>{" "}
                </h3>

                <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                  Olá! Eu sou o Matheus Oliveira, desenvolvedor focado em transformar ideias em soluções digitais funcionais e acessíveis.
                  Trabalho com criação de <strong>sites institucionais, landing pages e sistemas sob medida</strong>, tudo com atenção aos detalhes, visual moderno e foco no que realmente importa: resolver a necessidade de cada cliente.
                </p>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Minha missão é ajudar pequenos negócios a se posicionarem online com qualidade, proximidade e preço justo.
                  Tecnologia não precisa ser complicada, ela só precisa fazer sentido pra quem usa.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start gap-3 text-gray-600">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-brand-blue" />
                  </div>
                  <span className="text-xs sm:text-sm">Sites modernos e responsivos</span>
                </div>

                <div className="flex items-start gap-3 text-gray-600">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-brand-blue" />
                  </div>
                  <span className="text-xs sm:text-sm">Atendimento direto e suporte contínuo</span>
                </div>

                <div className="flex items-start gap-3 text-gray-600">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-brand-blue" />
                  </div>
                  <span className="text-xs sm:text-sm">Otimização com foco em performance</span>
                </div>

                <div className="flex items-start gap-3 text-gray-600">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-brand-blue" />
                  </div>
                  <span className="text-xs sm:text-sm">SEO técnico básico incluído</span>
                </div>

                <div className="flex items-start gap-3 text-gray-600">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-brand-blue" />
                  </div>
                  <span className="text-xs sm:text-sm">Consultoria focada no seu tipo de negócio</span>
                </div>

                <div className="flex items-start gap-3 text-gray-600">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-brand-blue" />
                  </div>
                  <span className="text-xs sm:text-sm">Manutenção e atualizações sob demanda</span>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white p-4 sm:p-6 lg:p-8 shadow-xl">
                <img
                  src="/public/matheus.jpg"
                  alt="Matheus Oliveira trabalhando"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl sm:rounded-2xl"
                />

                {/* Floating Certifications Card */}
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-gray-200 shadow-lg">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brand-blue rounded-full flex items-center justify-center">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <h3 className="text-brand-dark font-semibold text-sm sm:text-base">
                      Certificações
                    </h3>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                    Técnico formado e qualificado
                  </p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                      />
                    ))}
                    <span className="text-yellow-400 text-xs sm:text-sm ml-1 sm:ml-2">5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="servicos"
        className="py-16 sm:py-20 lg:py-24 bg-white scroll-animate"
        style={{
          opacity: 0,
          transform: "translateY(30px)",
          transition: "all 0.6s ease-out",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-4 sm:mb-6">
              Serviços que Transformam
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Soluções digitais completas para levar seu negócio ao próximo
              nível
            </p>
          </div>

          {/* Services Grid - Mobile-first responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 lg:mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-100 hover:border-brand-blue/30 transition-all duration-300 flex flex-col h-full touch-manipulation ${
                  service.comingSoon
                    ? "opacity-70 cursor-not-allowed"
                    : "cursor-pointer hover:shadow-xl active:shadow-lg hover:-translate-y-1 sm:hover:-translate-y-2 active:translate-y-0"
                }`}
                onClick={() =>
                  !service.comingSoon && handleServiceClick(service.title)
                }
              >
                {/* Service Icon */}
                <div className="relative mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 group-active:scale-105 transition-transform duration-300">
                    <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-brand-blue group-hover:text-brand-purple transition-colors duration-300" />
                  </div>
                  {service.popular && (
                    <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gradient-to-r from-brand-blue to-brand-purple text-white px-2 py-1 sm:px-3 sm:py-1 text-xs">
                      Popular
                    </Badge>
                  )}
                  {service.comingSoon && (
                    <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-yellow-500 text-white px-2 py-1 sm:px-3 sm:py-1 text-xs">
                      Em Breve
                    </Badge>
                  )}
                </div>

                {/* Service Title */}
                <h3 className="text-lg sm:text-xl font-bold text-brand-dark mb-2 sm:mb-3 group-hover:text-brand-blue transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 sm:mb-6 flex-1">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-4 sm:mb-6">
                  {service.features
                    .slice(0, 3)
                    .map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-2 text-xs sm:text-sm text-gray-600"
                      >
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-whatsapp flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <Button
                    className={`w-full rounded-lg sm:rounded-xl transition-all duration-300 py-2.5 sm:py-3 text-sm sm:text-base touch-manipulation ${
                      service.comingSoon
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-brand-blue hover:bg-brand-purple active:bg-brand-purple/90 text-white group-hover:shadow-lg active:shadow-md"
                    }`}
                    disabled={service.comingSoon}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!service.comingSoon) {
                        handleServiceClick(service.title);
                      }
                    }}
                  >
                    <img
                      src={
                        service.comingSoon
                          ? "https://cdn.builder.io/api/v1/image/assets%2F516abc652f6f499f9918c14a2c7d6dd1%2Fcf4a28f9586f4e19a291c587dc7d9a75?format=webp&width=800"
                          : "https://cdn.builder.io/api/v1/image/assets%2F516abc652f6f499f9918c14a2c7d6dd1%2F77d1d20784d044eebc6da2c26251256e?format=webp&width=800"
                      }
                      alt="WhatsApp"
                      className="w-3 h-3 sm:w-4 sm:h-4 mr-2"
                    />
                    {service.comingSoon ? "Em Breve" : "Contratar"}
                  </Button>
                </div>

                {/* Hover Gradient Border */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-blue via-brand-purple to-brand-blue opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 sm:mt-16 lg:mt-20 text-center bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
            <h3 className="text-xl sm:text-2xl font-bold text-brand-dark mb-3 sm:mb-4">
              Precisa de algo personalizado?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">
              Criamos soluções sob medida para necessidades específicas do seu
              negócio
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white active:bg-brand-blue/90 px-6 py-3 sm:px-8 sm:py-3 rounded-full transition-all duration-300 touch-manipulation text-sm sm:text-base"
              onClick={() => window.open(whatsappUrl, "_blank")}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F516abc652f6f499f9918c14a2c7d6dd1%2Fcf4a28f9586f4e19a291c587dc7d9a75?format=webp&width=800"
                alt="WhatsApp"
                className="w-6 h-6 sm:w-8 sm:h-8 mr-2"
              />
              <span className="hidden sm:inline">Conversar no WhatsApp</span>
              <span className="sm:hidden">Conversar</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section
        id="diferenciais"
        className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50 scroll-animate"
        style={{
          opacity: 0,
          transform: "translateY(30px)",
          transition: "all 0.6s ease-out",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-4 sm:mb-6">
              Meus Diferenciais
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              O que me torna único e por que escolher meus serviços
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:shadow-lg active:shadow-md transition-all duration-300 touch-manipulation">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-brand-blue to-brand-purple rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-dark mb-3 sm:mb-4">
                Entrega Rápida
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Projetos entregues em prazos otimizados sem comprometer a
                qualidade. Metodologia ágil para resultados eficientes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:shadow-lg active:shadow-md transition-all duration-300 touch-manipulation">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-whatsapp to-brand-blue rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Star className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-dark mb-3 sm:mb-4">
                Preço Justo
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Tecnologia de qualidade com preços acessíveis. Sem taxas ocultas
                ou surpresas no orçamento.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:shadow-lg active:shadow-md transition-all duration-300 touch-manipulation">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-500 to-brand-purple rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-dark mb-3 sm:mb-4">
                Soluções Personalizadas
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Cada projeto é único. Desenvolvo soluções sob medida para
                atender exatamente às suas necessidades específicas.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:shadow-lg active:shadow-md transition-all duration-300 touch-manipulation">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-brand-purple to-brand-blue rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F516abc652f6f499f9918c14a2c7d6dd1%2F77d1d20784d044eebc6da2c26251256e?format=webp&width=800"
                  alt="WhatsApp"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-dark mb-3 sm:mb-4">
                Comunicação Direta
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Atendimento personalizado via WhatsApp. Você fala diretamente
                comigo, sem intermediários ou call centers.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:shadow-lg active:shadow-md transition-all duration-300 touch-manipulation">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-brand-blue to-whatsapp rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-dark mb-3 sm:mb-4">
                Suporte Contínuo
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Não abandono você após a entrega. Ofereço suporte técnico e
                manutenção para garantir que tudo funcione perfeitamente.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-yellow-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:shadow-lg active:shadow-md transition-all duration-300 touch-manipulation">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-brand-purple to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-brand-dark mb-3 sm:mb-4">
                Resultados Comprovados
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Foco em métricas e resultados reais. Seus projetos são
                otimizados para conversão e performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section
        id="certificacoes"
        className="py-24 bg-white scroll-animate"
        style={{
          opacity: 0,
          transform: "translateY(30px)",
          transition: "all 0.6s ease-out",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-6">
              Certificações
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conhecimento certificado e sempre atualizado com as melhores
              práticas do mercado
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark">Desenvolvimento De Sistemas</h3>
                  <p className="text-sm text-gray-600">SENAI</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Certificação tecnica em desenvolvimento de sistemas (+ algo)
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark">
                    Análise e Desenvolvimento De Sistemas
                  </h3>
                  <p className="text-sm text-gray-600">FAESA</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Curso superior em Analise e Desenvolvimento de Sistemas
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark">
                    Complete Web Design
                  </h3>
                  <p className="text-sm text-gray-600">Udemy</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Curso completo sobre web design paragarantir uma experiência agradável e funcional para o usuário.
              </p>
            </div>

            {/* <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark">
                    AWS Cloud Practitioner
                  </h3>
                  <p className="text-sm text-gray-600">Amazon Web Services</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Conhecimento em serviços de nuvem AWS para deploy e
                escalabilidade de aplicações.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark">
                    Google Analytics
                  </h3>
                  <p className="text-sm text-gray-600">Google</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Certificação em análise de dados web e otimização de performance
                de sites.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark">Scrum Master</h3>
                  <p className="text-sm text-gray-600">Scrum Alliance</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Metodologias ágeis para gestão eficiente de projetos e entregas
                no prazo.
              </p>
            </div> */}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue to-brand-purple text-white px-8 py-4 rounded-full">
              <Star className="w-5 h-5" />
              <span className="font-semibold">
                Sempre aprendendo e me atualizando com as últimas tecnologias
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50 scroll-animate"
        style={{
          opacity: 0,
          transform: "translateY(30px)",
          transition: "all 0.6s ease-out",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-4">
              Projetos em Destaque
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              Exemplos de soluções criadas para diferentes segmentos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 bg-white"
              >
                <div className="aspect-video bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 relative overflow-hidden">
                  <ProjectCarousel
                    images={project.images}
                    projectName={project.name}
                    onImageClick={(imageIndex) => {
                      setSelectedProject(project);
                      setSelectedImageIndex(imageIndex);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <Badge className="absolute top-4 left-4 bg-white/90 text-brand-dark z-10">
                    {project.category}
                  </Badge>
                  <div className="absolute top-4 right-4 z-10">
                    <Badge
                      className={`${
                        project.status === "Concluído"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-brand-dark mb-2">
                    {project.name}
                  </CardTitle>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-brand-dark mb-2">
                      Tecnologias:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="text-xs border-brand-blue text-brand-blue"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-brand-dark mb-2">
                      Principais funcionalidades:
                    </h4>
                    <ul className="space-y-1">
                      {project.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <Check className="w-3 h-3 text-whatsapp flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className="w-full bg-brand-blue hover:bg-brand-purple text-white transition-all duration-300"
                    onClick={() => {
                      const message = `Olá! Vi o projeto "${project.name}" no seu portfólio e gostaria de conversar sobre um projeto similar.`;
                      const projectWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                      window.open(projectWhatsappUrl, "_blank");
                    }}
                  >
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F516abc652f6f499f9918c14a2c7d6dd1%2F77d1d20784d044eebc6da2c26251256e?format=webp&width=800"
                      alt="WhatsApp"
                      className="w-4 h-4 mr-2"
                    />
                    Projeto similar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section
        id="planos"
        className="py-24 bg-white scroll-animate"
        style={{
          opacity: 0,
          transform: "translateY(30px)",
          transition: "all 0.6s ease-out",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">
              Sites Institucionais
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              Planos especializados em sites institucionais para empresas
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue to-brand-purple text-white px-6 py-3 rounded-full">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">
                Sites institucionais a partir de R$397
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden transition-all duration-300 ${plan.popular ? "ring-2 ring-brand-blue shadow-xl scale-105" : "hover:shadow-lg"}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-brand-blue to-brand-purple text-white px-6 py-2 rounded-b-lg text-sm font-semibold">
                    Mais Popular
                  </div>
                )}

                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl text-brand-dark mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    {plan.comingSoon ? (
                      <span className="text-4xl font-bold text-gray-500">
                        {plan.price}
                      </span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold text-brand-blue">
                          R${plan.price}
                        </span>
                        <span className="text-gray-600 ml-2">à vista</span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-brand-blue flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}

                  <Button
                    className={`w-full mt-6 ${
                      plan.comingSoon
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : plan.popular
                        ? "bg-gradient-to-r from-brand-blue to-brand-purple hover:shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } transition-all duration-200`}
                    onClick={() => !plan.comingSoon && window.open(whatsappUrl, "_blank")}
                    disabled={plan.comingSoon}
                  >
                    {plan.comingSoon ? "Em breve" : "Escolher Plano"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-blue" />
                Entrega rápida
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F516abc652f6f499f9918c14a2c7d6dd1%2F77d1d20784d044eebc6da2c26251256e?format=webp&width=800"
                  alt="WhatsApp"
                  className="w-4 h-4"
                />
                Suporte direto no WhatsApp
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                Pagamento facilitado
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strong CTA Section */}
      <section className="py-24 bg-gradient-to-br from-brand-blue via-brand-purple to-brand-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Pronto para levar seu negócio ao digital?
          </h2>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Transforme sua presença digital hoje mesmo. Resultados garantidos
            com tecnologia e preço justo.
          </p>

          <Button
            size="lg"
            className="bg-whatsapp hover:bg-whatsapp/90 text-white px-12 py-6 text-xl rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            onClick={() => window.open(whatsappUrl, "_blank")}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F516abc652f6f499f9918c14a2c7d6dd1%2F77d1d20784d044eebc6da2c26251256e?format=webp&width=800"
              alt="WhatsApp"
              className="w-6 h-6 mr-3"
            />
            Fale comigo agora pelo WhatsApp
          </Button>

          <p className="mt-6 text-white/80 text-sm">
            Resposta em até 2 horas • Orçamento gratuito • Sem compromisso
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xl mb-8 text-white/90">
              Este site está em constante evolução — novos serviços estão
              chegando.
            </p>

            <div className="flex justify-center items-center gap-8 mb-8"></div>

            <div className="border-t border-white/20 pt-8">
              <p className="text-white/70 text-sm">
                © {new Date().getFullYear()} • Desenvolvido com tecnologia
                moderna • Todos os direitos reservados
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          imageIndex={selectedImageIndex}
          onClose={() => setSelectedProject(null)}
          onImageChange={setSelectedImageIndex}
        />
      )}

      {/* Floating WhatsApp Button - Mobile Optimized */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button
          onClick={() => window.open(whatsappUrl, "_blank")}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-whatsapp hover:bg-whatsapp/90 active:bg-whatsapp/80 text-white rounded-full shadow-lg p-0 border-2 sm:border-4 border-white touch-manipulation transform hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Entrar em contato via WhatsApp"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F516abc652f6f499f9918c14a2c7d6dd1%2F77d1d20784d044eebc6da2c26251256e?format=webp&width=800"
            alt="WhatsApp"
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
            loading="lazy"
          />
        </Button>

        {/* Mobile-only pulsing animation */}
        <div className="absolute inset-0 bg-whatsapp rounded-full animate-ping opacity-20 sm:hidden"></div>
      </div>
    </div>
  );
}

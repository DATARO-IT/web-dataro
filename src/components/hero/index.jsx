import React, { useState, useEffect } from 'react';
import './index.css';

// Lista de imagens para o carrossel. Usamos placeholders para demonstração.
const slides = [
  {
    url: 'https://www.conexasaude.com.br/blog/wp-content/uploads/2021/12/tecnologia-e-saude-medica-touch-screen.jpg',
    alt: 'Imagem representando tecnologia na área da saúde, com gráficos e dados médicos em uma tela digital.'
  },
  {
    url: 'https://assets.corteva.com/is/image/Corteva/IMG-Drones1-BPA-LA-BR-V1?$image_desktop$',
    alt: 'Imagem de um drone sobrevoando uma plantação, simbolizando a automação na agricultura.'
  },
  {
    url: 'https://portal.ifro.edu.br/images/Jornalismo/Jornalismo-2025/08-Agosto-2025/21-08/ZN-Rob%C3%B3tica.jpg',
    alt: 'Imagem de uma sala de aula moderna com estudantes usando tablets e lousas digitais.'
  },
  {
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROXnWypryJoi_x0IcgxR5xLwIpmPht325V1A&s',
    alt: 'Imagem de um braço robótico em uma linha de produção industrial, representando a automação.'
  }
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Função para avançar para o próximo slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };
  
  // Efeito para trocar de slide automaticamente a cada 5 segundos
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval); // Limpa o intervalo quando o componente é desmontado
  }, []);


  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          A Tecnologia da Informação Transformando o Futuro
        </h1>
        <p className="hero-subtitle">
          Em um mundo conectado, a TI é o motor que impulsiona todos os setores. Da precisão na <strong>saúde</strong> ao avanço na <strong>educação</strong> e à eficiência no <strong>agronegócio</strong>, a tecnologia otimiza processos e abre portas para a inovação.
        </p>
        <p className="hero-text">
          A automação, em particular, revoluciona a maneira como trabalhamos, eliminando tarefas repetitivas e permitindo que as equipes foquem no que realmente importa: a estratégia e o crescimento.
        </p>
        <div className="hero-company-intro">
          <p>
            É nesse cenário que a <strong>DATA-RO</strong> atua, trazendo soluções sob medida para o seu negócio. Nós transformamos desafios em oportunidades através de:
          </p>
          <ul className="services-list">
            <li>Automação Inteligente</li>
            <li>Gestão Estratégica de Dados</li>
            <li>Desenvolvimento Web e de Aplicativos</li>
          </ul>
        </div>
        <a href="#contato" className="hero-cta-button">
          Conheça Nossas Soluções
        </a>
      </div>
      <div className="hero-carousel">
        <img src={slides[currentIndex].url} alt={slides[currentIndex].alt} className="carousel-image" />
        <div className="carousel-indicators">
            {slides.map((_, index) => (
                <div 
                    key={index} 
                    className={`indicator-dot ${currentIndex === index ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(index)}
                ></div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;

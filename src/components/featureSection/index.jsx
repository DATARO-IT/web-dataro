import React, { useState, useEffect } from 'react';
import './index.css';

function FeatureSection({ id, title, description, companyMention, slides, reverse = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Lógica do Carrossel Automático
  useEffect(() => {
    if (!slides || slides.length === 0) return; // Proteção caso não tenha slides

    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Troca a cada 5 segundos
    return () => clearInterval(slideInterval);
  }, [slides]);

  // Define a classe para inverter o layout (Zigue-Zague)
  const sectionClassName = `feature-section-component ${reverse ? 'reverse' : ''}`;

  return (
    <section id={id} className={sectionClassName}>
      <div className="feature-container">
        
        {/* Lado do Texto */}
        <div className="feature-content">
          <h2 className="feature-title">{title}</h2>
          <p className="feature-description">{description}</p>
          
          {companyMention && (
            <div className="feature-company-mention">
              <p>{companyMention}</p>
            </div>
          )}
        </div>

        {/* Lado do Carrossel */}
        <div className="feature-carousel">
          <div 
            className="carousel-inner" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="carousel-slide">
                <img src={slide.url} alt={slide.alt} className="carousel-image" />
              </div>
            ))}
          </div>
          
          {/* Bolinhas de navegação */}
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

      </div>
    </section>
  );
}

export default FeatureSection;
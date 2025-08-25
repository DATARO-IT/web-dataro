import React, { useState, useEffect } from 'react';
import './index.css';

function FeatureSection({ id, title, description, companyMention, slides, reverse = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  // Adiciona a classe 'reverse' ao container se a prop for verdadeira
  const sectionClassName = `feature-section ${reverse ? 'reverse' : ''}`;

  return (
    <section id={id} className={sectionClassName}>
      <div className="feature-content">
        <h2 className="feature-title">{title}</h2>
        <p className="feature-description">{description}</p>
        <div className="feature-company-mention">
          <p>{companyMention}</p>
        </div>
      </div>
      <div className="feature-carousel">
        <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {slides.map((slide, index) => (
            <img key={index} src={slide.url} alt={slide.alt} className="carousel-image" />
          ))}
        </div>
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

export default FeatureSection;

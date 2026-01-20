import React from 'react';
import './index.css';

// Adicionei 'VisualComponent' na desestruturação das props
function ServiceItem({ icon, title, description, image, VisualComponent, reverse = false }) {
  const sectionClassName = `service-item-container ${reverse ? 'reverse' : ''}`;

  return (
    <section className={sectionClassName}>
      <div className="service-image-wrapper">
        {/* Lógica condicional: Se tiver o componente visual (SVG), renderiza ele.
            Caso contrário, renderiza a imagem padrão antiga. */}
        {VisualComponent ? (
          VisualComponent
        ) : (
          <img src={image?.url} alt={image?.alt} />
        )}
      </div>
      
      <div className="service-content-wrapper">
        <div className="service-title">
          {icon}
          <h3>{title}</h3>
        </div>
        <p>{description}</p>
      </div>
    </section>
  );
}

export default ServiceItem;
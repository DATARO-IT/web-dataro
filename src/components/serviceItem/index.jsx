import React from 'react';
import './index.css';

// Componente reutilizável para cada serviço
function ServiceItem({ icon, title, description, image, reverse = false }) {
  const sectionClassName = `service-item-container ${reverse ? 'reverse' : ''}`;

  return (
    <section className={sectionClassName}>
      <div className="service-image-wrapper">
        <img src={image.url} alt={image.alt} />
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

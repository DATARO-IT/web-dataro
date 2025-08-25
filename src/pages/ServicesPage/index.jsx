import React from 'react';
import ServiceItem from '../../components/serviceItem'; // O componente que já criamos
import './index.css';

// --- Ícones para cada serviço ---
const WebDevIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
const AppDevIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>;
const DataIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const CreativeIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;


// --- Dados Detalhados dos Serviços ---
const servicesData = [
  {
    icon: <WebDevIcon />,
    title: "Desenvolvimento Web",
    description: "Sua presença online é a porta de entrada para o seu negócio. Criamos websites institucionais, portais e e-commerces que não são apenas visualmente atraentes, mas também rápidos, seguros e perfeitamente adaptados a todos os dispositivos. Nossa abordagem foca em uma arquitetura robusta e uma experiência de usuário (UX) impecável para converter visitantes em clientes.",
    image: { url: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Desenvolvedor trabalhando em um website em múltiplos monitores.' },
    reverse: false
  },
  {
    icon: <AppDevIcon />,
    title: "Desenvolvimento de Aplicativos",
    description: "Leve sua empresa para o bolso do seu cliente. Desenvolvemos aplicativos móveis nativos e híbridos para iOS e Android, desde a concepção e design (UI/UX) até a publicação nas lojas. Criamos soluções intuitivas e de alta performance que resolvem problemas reais e fortalecem o relacionamento com seu público.",
    image: { url: 'https://uds.com.br/blog/wp-content/uploads/2024/10/Mao-segurando-aplicativo-Imagem-ilustrativa-de-desenvolvimento-de-app.jpg', alt: 'Interface de um aplicativo sendo exibida em um smartphone.' },
    reverse: true
  },
  {
    icon: <DataIcon />,
    title: "Inteligência de Negócios e Automação",
    description: "A verdadeira eficiência nasce da clareza dos dados. Integramos seus diversos sistemas e transformamos vastos volumes de informações (Big Data) em painéis gráficos interativos e intuitivos. Essas plataformas visuais permitem que você monitore o desempenho do seu negócio em tempo real, identifique tendências e tome decisões estratégicas com uma velocidade e precisão sem precedentes.",
    image: { url: 'https://img.freepik.com/vetores-premium/tela-do-laptop-com-tabelas-e-graficos-financeiros_389832-821.jpg?semt=ais_hybrid&w=740&q=80', alt: 'Equipe de negócios colaborando em frente a um painel com gráficos e dados.' },
    reverse: false
  },
  {
    icon: <CreativeIcon />,
    title: "Design Gráfico e Edição de Vídeo",
    description: "A tecnologia precisa de uma comunicação visual impactante. Unimos nossa expertise técnica com criatividade para produzir materiais que contam a sua história. Desde a criação de identidades visuais e peças para redes sociais até a edição de vídeos institucionais e promocionais, garantimos que sua marca se destaque no mercado.",
    image: { url: 'https://static.wixstatic.com/media/0c253f_dee2e76b440841d591b2bcd53b657b6f~mv2.jpeg/v1/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/0c253f_dee2e76b440841d591b2bcd53b657b6f~mv2.jpeg', alt: 'Editor de vídeo trabalhando em um software de edição profissional.' },
    reverse: true
  }
];

function ServicesPage() {
  return (
    <div className="services-page-container">
      <div className="services-header">
        <h1>Nossas Soluções</h1>
        <p>Da estratégia à execução, a DATA-RO é sua parceira completa em tecnologia e comunicação digital.</p>
      </div>
      {servicesData.map((service, index) => (
        <ServiceItem key={index} {...service} />
      ))}
    </div>
  );
}

export default ServicesPage;

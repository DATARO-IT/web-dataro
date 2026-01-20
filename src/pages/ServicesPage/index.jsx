import React from 'react';
import ServiceItem from '../../components/serviceItem';
import './index.css';

// --- ILUSTRAÇÕES PRINCIPAIS (Os "Grandes Ícones" para o destaque) ---

const ReiDoAnzolVisual = () => (
  <svg viewBox="0 0 200 150" className="project-visual" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="150" rx="12" fill="#e0f2fe"/>
    <path d="M40 120 C60 110, 80 130, 100 120 C120 110, 140 130, 160 120" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round"/>
    <path d="M100 30 V80 M100 80 C100 95, 115 95, 115 80" stroke="#0284c7" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="100" cy="30" r="5" fill="#0284c7"/>
    <path d="M130 90 L115 80 L130 70" fill="#0ea5e9"/>
  </svg>
);

const TurismoVisual = () => (
  <svg viewBox="0 0 200 150" className="project-visual" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="150" rx="12" fill="#ecfccb"/>
    <path d="M100 100 L70 140 H130 L100 100Z" fill="#84cc16" opacity="0.5"/>
    <circle cx="100" cy="60" r="30" stroke="#65a30d" strokeWidth="6"/>
    <circle cx="100" cy="60" r="10" fill="#65a30d"/>
    <path d="M100 90 V110" stroke="#65a30d" strokeWidth="6"/>
    <path d="M140 40 L160 20 M40 40 L60 60" stroke="#84cc16" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

const LucrofyVisual = () => (
  <svg viewBox="0 0 200 150" className="project-visual" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="150" rx="12" fill="#f0fdf4"/>
    <rect x="40" y="80" width="30" height="40" rx="4" fill="#86efac"/>
    <rect x="85" y="50" width="30" height="70" rx="4" fill="#4ade80"/>
    <rect x="130" y="30" width="30" height="90" rx="4" fill="#22c55e"/>
    <path d="M30 130 H170" stroke="#16a34a" strokeWidth="4" strokeLinecap="round"/>
    <path d="M40 70 L85 40 L130 20 L160 10" stroke="#15803d" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 8"/>
  </svg>
);

const GeraçãoEmpregoVisual = () => (
  <svg viewBox="0 0 200 150" className="project-visual" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="150" rx="12" fill="#f1f5f9"/>
    <rect x="50" y="40" width="100" height="80" rx="8" stroke="#475569" strokeWidth="6" fill="white"/>
    <path d="M80 40 V30 C80 25, 120 25, 120 30 V40" stroke="#475569" strokeWidth="6"/>
    <circle cx="100" cy="70" r="15" fill="#94a3b8"/>
    <path d="M70 100 C70 90, 130 90, 130 100" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round"/>
  </svg>
);

const DataPlannerVisual = () => (
  <svg viewBox="0 0 200 150" className="project-visual" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="150" rx="12" fill="#fff7ed"/>
    <rect x="40" y="30" width="120" height="90" rx="4" stroke="#f97316" strokeWidth="4" fill="white"/>
    <line x1="60" y1="50" x2="140" y2="50" stroke="#fdba74" strokeWidth="4"/>
    <line x1="60" y1="70" x2="120" y2="70" stroke="#fdba74" strokeWidth="4"/>
    <line x1="60" y1="90" x2="140" y2="90" stroke="#fdba74" strokeWidth="4"/>
    <circle cx="150" cy="110" r="20" fill="#f97316"/>
    <path d="M142 110 L148 116 L158 104" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


// --- ÍCONES PEQUENOS (Para acompanhar o título) ---
const FishingIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10c-5.523 0-10 4.477-10 10"/><path d="M2 10c5.523 0 10 4.477 10 10"/><circle cx="12" cy="10" r="3"/></svg>;
const MapIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>;
const ChartIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>;
const GovIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
const PlannerIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;

// --- DADOS DOS PROJETOS ---
// Nota: Substituímos 'image' por 'VisualComponent' para renderizar o SVG direto
const projectsData = [
  {
    icon: <FishingIcon />,
    title: "Rei do Anzol",
    description: "A principal plataforma de gestão de torneios de pesca esportiva. Um sistema completo que gerencia inscrições, regulamentos e rankings em tempo real, conectando pescadores e organizadores.",
    VisualComponent: <ReiDoAnzolVisual />,
    reverse: false
  },
  {
    icon: <MapIcon />,
    title: "Rondonia Turismo e Pesca Esportiva",
    description: "Antigo Rota Rondônia, agora a vitrine digital do turismo no estado. Focado na pesca esportiva e ecoturismo, conectando visitantes às belezas naturais e roteiros exclusivos.",
    VisualComponent: <TurismoVisual />,
    reverse: true
  },
  {
    icon: <ChartIcon />,
    title: "Lucrofy",
    description: "O Lucrofy é um SaaS robusto para gestão financeira e empresarial. Com dashboards intuitivos e automação, permite que empresas monitorem sua saúde financeira e tomem decisões baseadas em dados.",
    VisualComponent: <LucrofyVisual />,
    reverse: false
  },
  {
    icon: <GovIcon />,
    title: "Geração Emprego",
    description: "Uma iniciativa de impacto social e governamental. Plataforma que utiliza inteligência de dados para conectar cidadãos a oportunidades de trabalho, modernizando o sistema de empregabilidade.",
    VisualComponent: <GeraçãoEmpregoVisual />,
    reverse: true
  },
  {
    icon: <PlannerIcon />,
    title: "Data Planner",
    description: "Solução interna para organização estratégica. Integra planejamento de projetos com inteligência territorial, permitindo uma visão macro de operações e recursos da DATA-RO.",
    VisualComponent: <DataPlannerVisual />,
    reverse: false
  }
];

function ProjectsPage() {
  return (
    <div className="projects-page-container">
      <title>DATA-RO - Projetos</title>
      <div className="projects-header">
        <h1>Nossos Projetos</h1>
        <p>Conheça as soluções desenvolvidas pela DATA-RO que estão transformando mercados.</p>
      </div>
      {projectsData.map((project, index) => (
        // Passamos todas as props, incluindo o novo VisualComponent
        <ServiceItem key={index} {...project} />
      ))}
    </div>
  );
}

export default ProjectsPage;
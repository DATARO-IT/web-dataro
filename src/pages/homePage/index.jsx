import React from 'react';
import HeroCarousel from '../../components/heroCarousel';
import AdvantagesSection from '../../components/advantagesSection';
import FeatureSection from '../../components/featureSection';
import InsightsSection from '../../components/InsightsSection'; // Componente novo com Modal

// Importando o CSS atualizado
import './index.css';

// --- DADOS DOS SLIDES ---
const saudeSlides = [
  { url: 'https://i2.wp.com/blog.iclinic.com.br/wp-content/uploads/2022/12/auditoria-de-prontuario-medico-mexendo-no-notebook.jpg?ssl=1', alt: 'Médico analisando prontuário eletrônico em um tablet.' },
  { url: 'https://fia.com.br/wp-content/uploads/2022/06/tecnologia-na-saude-principais-avancos-tendencias-aplicad.jpg', alt: 'Paciente em uma consulta por vídeo com um profissional de saúde.' },
];

const educacaoSlides = [
  { url: 'https://www.itexperts.com.br/wp-content/uploads/2022/02/25161921/267114-o-que-e-educacao-40-e-como-ela-vai-mudar-o-modo-como-se-aprende-1.jpg', alt: 'Estudante interagindo com uma plataforma de ensino a distância.' },
  { url: 'https://escolaweb.com.br/wp-content/uploads/2024/03/topo-blogo_Prancheta-1.png', alt: 'Gráficos e dados de um sistema de gestão escolar.' },
];

const agroSlides = [
  { url: 'https://maxmaq.com.br/wp-content/uploads/2019/09/286624-raphael-favor-entregar-ate-1504-como-o-uso-de-drones-na-agricultura-tem-gerado-melhores-resultados-1280x720-1.jpg', alt: 'Drone monitorando uma lavoura com dados sobrepostos.' },
  { url: 'https://networdagro.com.br/blog/wp-content/uploads/2022/02/iStock-1254095794-1.jpg', alt: 'Sistema de monitoramento de gado em um dispositivo móvel.' },
];

const automacaoSlides = [
  { url: 'https://img.lovepik.com/bg/20231216/laptop-with-business-data-chart-on-table-stock-photo_2489663_wh860.png', alt: 'Braço robótico operando em uma fábrica.' },
  { url: 'https://img.freepik.com/fotos-premium/homem-de-negocios-com-laptop-notebook-portatil-no-escritorio-em-casa_10134-3.jpg', alt: 'Fluxograma de processos de negócios sendo automatizado.' },
];

function HomePage() {
  return (
    <div className="home-page-wrapper">
      <title>DATA-RO | Inteligência Territorial</title>

      <HeroCarousel />
      <AdvantagesSection />

      {/* SEÇÃO METODOLOGIA */}
      <section className="tech-explanation-section">
        <div className="home-container">
          <div className="section-header-center">
            <span className="badge">METODOLOGIA</span>
            <h2>Não apenas coletamos dados. <br/>Nós geramos <span className="highlight-text">Inteligência</span>.</h2>
            <p className="section-desc">
              A DATA-RO utiliza algoritmos proprietários para transformar dados brutos em decisões governamentais estratégicas.
            </p>
          </div>

          <div className="tech-grid">
            <div className="tech-card">
              <div className="tech-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <h3>Mineração de Dados Públicos</h3>
              <p>Nossa IA varre portais de transparência e diários oficiais, estruturando milhões de linhas de dados não padronizados.</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <h3>Análise Preditiva</h3>
              <p>Cruzamos históricos orçamentários com indicadores socioeconômicos para prever demandas em saúde e educação.</p>
            </div>
            <div className="tech-card">
              <div className="tech-icon-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </div>
              <h3>Mapeamento Territorial</h3>
              <p>Georreferenciamento avançado para identificar onde aplicar emendas parlamentares com maior impacto social.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO CASE SEDEC */}
      <section className="partners-section">
        <div className="home-container">
          <div className="partners-content">
            <div className="partners-text">
              <span className="badge-outline">CASES DE SUCESSO</span>
              <h2>Transformando Rondônia</h2>
              <p>
                A tecnologia da DATA-RO já impulsiona setores estratégicos do estado. 
                Em parceria com a <strong>SEDEC</strong>, desenvolvemos a vitrine digital do turismo rondoniense.
              </p>
              <a href="https://rondoniapescaesportiva.tur.br/" target="_blank" rel="noopener noreferrer" className="btn-arrow">
                Ver Projeto ao Vivo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
            </div>
            <div className="partners-logos">
              <div className="case-card">
                <div className="case-header">
                  <strong>SEDEC</strong>
                  <span>Governo de Rondônia</span>
                </div>
                <div className="case-body">
                  <h4>Rondônia Turismo e Pesca Esportiva</h4>
                  <p>Plataforma oficial de fomento ao turismo e catalogação de roteiros de pesca.</p>
                  <div className="tags">
                    <span>Turismo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÕES DE FEATURES (WRAPPER PARA CSS) */}
      <div className="features-stack">
        <FeatureSection
          id="saude"
          title="Tecnologia a Serviço da Saúde"
          description="A digitalização está revolucionando o cuidado ao paciente. Prontuários eletrônicos agilizam diagnósticos, a telemedicina quebra barreiras geográficas e a análise de dados permite tratamentos mais precisos e preventivos. A TI garante a segurança, a agilidade e a inteligência necessárias para um sistema de saúde moderno e eficiente."
          companyMention="A DATA-RO desenvolve sistemas de gestão para clínicas e hospitais, garantindo a integridade e a acessibilidade das informações vitais para salvar vidas."
          slides={saudeSlides}
        />

        <FeatureSection
          id="educacao"
          title="Inovação na Educação"
          description="O futuro do aprendizado é interativo e acessível. Plataformas de ensino a distância (EAD), lousas digitais e sistemas de gestão acadêmica personalizam a jornada do estudante e otimizam o trabalho dos educadores. A tecnologia cria um ambiente de aprendizado mais engajador, colaborativo e alinhado às demandas do século XXI."
          companyMention="Com a DATA-RO, instituições de ensino podem implementar sistemas de gestão que simplificam a administração e enriquecem a experiência educacional."
          slides={educacaoSlides}
          reverse={true}
        />

        <FeatureSection
          id="agro"
          title="Inteligência para o Agronegócio"
          description="O campo nunca foi tão tecnológico. Drones, sensores IoT e softwares de gestão transformam dados em produtividade. A agricultura de precisão otimiza o uso de recursos, a rastreabilidade garante a qualidade do produto e a automação de maquinário aumenta a eficiência da colheita, fortalecendo um dos pilares da nossa economia."
          companyMention="A DATA-RO oferece soluções de automação e gestão de dados para o agronegócio, ajudando produtores de Rondônia a maximizar sua produção com sustentabilidade e tecnologia de ponta."
          slides={agroSlides}
        />

        <FeatureSection
          id="automacao"
          title="Automação e Gestão Empresarial"
          description="Eficiência é a chave para o crescimento. A automação de processos (RPA) elimina tarefas manuais e repetitivas, reduzindo erros e liberando equipes para atividades estratégicas. Sistemas de gestão integrados (ERPs) oferecem uma visão 360° do negócio, desde o estoque até o financeiro, permitindo decisões mais rápidas e inteligentes."
          companyMention="Seja no desenvolvimento de aplicativos customizados ou na implementação de sistemas de gestão, a DATA-RO é sua parceira para automatizar operações e impulsionar o crescimento do seu negócio."
          slides={automacaoSlides}
          reverse={true}
        />
      </div>

      {/* SEÇÃO INSIGHTS (Com Modal Integrado) */}
      <InsightsSection />
      
    </div>
  );
}

export default HomePage;
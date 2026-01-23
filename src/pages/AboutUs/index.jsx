import React from 'react';
import './index.css';

// --- IMPORTAÇÃO DAS IMAGENS ---
// Certifique-se de que os nomes dos arquivos aqui batem com os que estão na sua pasta assets
// O caminho '../../assets/' assume que seu componente está em src/components/AboutUs
import victorPhoto from '../../assets/victor.jpeg'; 
import kaykyPhoto from '../../assets/kayky.jpeg';
import kalielPhoto from '../../assets/kaliel.jpeg';

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Victor Eduardo Sousa Moraes",
      role: "CEO & Diretor de Desenvolvimento",
      bio: "Sócio-administrador e arquiteto de software. Lidera o desenvolvimento de sites, aplicativos e ecossistemas digitais, garantindo que cada linha de código converta em valor de negócio.",
      photo: victorPhoto, // Usando a variável importada (sem aspas)
      linkedin: "https://www.linkedin.com/in/victor-eduardo-b32ba2316/"
    },
    {
      id: 2,
      name: "Kayky Luka Ramos Da Silva Guedes",
      role: "Diretor de Marketing",
      bio: "Estrategista de crescimento e posicionamento de marca. Traduz a complexidade dos dados em comunicação assertiva, conectando as soluções da DATA-RO às necessidades reais do mercado.",
      photo: kaykyPhoto, // Usando a variável importada
      linkedin: "https://br.linkedin.com/in/kayky-luka-717234256"
    },
    {
      id: 3,
      name: "Kaliel Mendes Da Silva",
      role: "Diretor de Cyber Segurança e Big Data",
      bio: "Especialista em proteção de infraestruturas críticas e análise massiva de dados. Assegura a integridade das informações e transforma volumes complexos de dados em inteligência acionável.",
      photo: kalielPhoto, // Usando a variável importada
      linkedin: "https://www.linkedin.com/in/kalielmendescardoso?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    }
  ];

  return (
    <section className="about-us-section">
      <div className="container">
        {/* Cabeçalho */}
        <div className="header-content">
          <h2 className="section-title">Nossa Liderança</h2>
          <p className="section-subtitle">
            Mentes inovadoras por trás da <strong>DATA-RO</strong>. Unimos desenvolvimento de ponta, segurança de dados e estratégias de mercado.
          </p>
        </div>

        {/* Grid da Equipe */}
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="card-header-bg"></div>
              <div className="image-wrapper">
                <img src={member.photo} alt={member.name} className="member-photo" />
              </div>
              
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <span className="member-role">{member.role}</span>
                <p className="member-bio">{member.bio}</p>
                
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="linkedin-btn personal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  LinkedIn Pessoal
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé da Seção com LinkedIn da Empresa */}
        <div className="company-social-footer">
          <p>Acompanhe a DATA-RO nas redes profissionais</p>
          <a 
            href="https://www.linkedin.com/in/data-ro-intelig%C3%AAncia-territorial-0586313a2/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="linkedin-btn company"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            Siga a DATA-RO no LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
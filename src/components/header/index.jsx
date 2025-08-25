import React from 'react';
import './index.css'; // Corrigido para corresponder ao nome do arquivo CSS
import logo from '../../assets/logo.png';

// O Header agora recebe as duas props necessárias
function Header({ onContactClick, onNavigate }) {
  
  // Função genérica para lidar com a navegação entre páginas
  const handleNavClick = (event, page) => {
    event.preventDefault(); // Impede o link de recarregar a página
    onNavigate(page); // Chama a função que veio do App.jsx para trocar de página
  };

  // Função específica para o popup de contato
  const handleContactClick = (event) => {
    event.preventDefault();
    onContactClick();
  };

  return (
    <header className="header-container">
      {/* Clicar na logo também leva para a página inicial */}
      <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="header-logo-link">
        <img src={logo} alt="Logo da Empresa" className="header-logo" />
      </a>
      <nav className="header-nav">
        <ul>
          {/* Cada link agora chama a função correta */}
          <li><a href="#" onClick={(e) => handleNavClick(e, 'home')}>Início</a></li>
          <li><a href="#" onClick={(e) => handleNavClick(e, 'services')}>Serviços</a></li>
          <li><a href="#" onClick={handleContactClick}>Contato</a></li>
          {/* O link "Sobre Nós" foi removido temporariamente. Para adicioná-lo,
              você precisaria criar uma página 'sobre' e adicionar a lógica no App.jsx */}
        </ul>
      </nav>
      <div className="mobile-menu-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </div>
    </header>
  );
}

export default Header;

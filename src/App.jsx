import React, { useState } from 'react';

// Importando componentes reutilizáveis
import Header from './components/header';
import Footer from './components/footer';
import ContactPopup from './components/contactPopup';

// Importando as PÁGINAS
import HomePage from './pages/homePage';
import ServicesPage from './pages/ServicesPage/index';

import './App.css';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // Estado para controlar a página

  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Leva o usuário para o topo da nova página
  };

  return (
    <div className="App">
      <Header onContactClick={togglePopup} onNavigate={navigateTo} />
      
      <main className="main-content">
        {/* Renderização condicional da página com base no estado */}
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'services' && <ServicesPage />}
      </main>

      <Footer />
      
      {isPopupOpen && <ContactPopup handleClose={togglePopup} />}
    </div>
  );
}

export default App;

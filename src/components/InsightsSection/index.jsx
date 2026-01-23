import React, { useState } from 'react';
import { articlesData } from '../../data/articles'; // Importa os dados que criamos
import './index.css';

const InsightsSection = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openArticle = (article) => {
    setSelectedArticle(article);
    document.body.style.overflow = 'hidden'; // Trava o scroll da página de trás
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    document.body.style.overflow = 'auto'; // Destrava o scroll
  };

  return (
    <>
      {/* SEÇÃO PRINCIPAL (GRID) */}
      <section className="insights-section">
        <div className="home-container">
          <div className="section-header-center">
            <span className="badge">CONHECIMENTO & AUTORIDADE</span>
            <h2>Insights DATA-RO</h2>
            <p className="section-desc">Análises profundas sobre o impacto da tecnologia na gestão pública e no desenvolvimento territorial.</p>
          </div>
          
          <div className="articles-grid">
            {articlesData.map((article) => (
              <article key={article.id} className="article-card">
                <div className="article-content-wrapper">
                  <div className="article-meta">
                    <span className="article-category">{article.category}</span>
                    <span className="article-date">{article.date}</span>
                  </div>
                  
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-summary">{article.summary}</p>
                </div>
                
                <button onClick={() => openArticle(article)} className="read-more-btn">
                  Ler Artigo Completo
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL DE LEITURA (OVERLAY) */}
      {selectedArticle && (
        <div className="article-modal-overlay" onClick={closeArticle}>
          <div className="article-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeArticle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="modal-header">
              <span className="modal-category">{selectedArticle.category}</span>
              <h2 className="modal-title">{selectedArticle.title}</h2>
              <span className="modal-date">{selectedArticle.date} • Leitura de 5 min</span>
            </div>

            <div className="modal-body">
              {/* Renderiza o HTML do artigo com segurança */}
              <div dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
            </div>

            <div className="modal-footer">
              <p>Escrito pela equipe de Inteligência da <strong>DATA-RO</strong></p>
              <button className="btn-finish" onClick={closeArticle}>Fechar Leitura</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InsightsSection;
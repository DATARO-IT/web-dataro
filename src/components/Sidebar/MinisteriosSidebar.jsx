import React, { useState } from 'react';
import './MinisteriosSidebar.css';

const MinisteriosSidebar = ({ isOpen, onToggle }) => {
  const [expandedMinisterio, setExpandedMinisterio] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const ministerios = [
    {
      id: 'mapa',
      sigla: 'MAPA',
      nome: 'Ministério da Agricultura, Pecuária e Abastecimento',
      icone: '🌾',
      cor: '#2e7d32',
      descricao: 'Responsável pela política agrícola e pecuária.',
      programas: [
        { nome: 'PAA - Programa de Aquisição de Alimentos', link: 'https://www.gov.br/agricultura/pt-br/assuntos/agricultura-familiar/paa' },
        { nome: 'PRONAF - Programa Nacional de Fortalecimento da Agricultura Familiar', link: 'https://www.gov.br/agricultura/pt-br/assuntos/agricultura-familiar/pronaf' },
        { nome: 'Garantia-Safra', link: 'https://www.gov.br/agricultura/pt-br/assuntos/agricultura-familiar/garantia-safra' }
      ],
      site: 'https://www.gov.br/agricultura',
      telefone: '(61) 3218-2828',
      email: 'ouvidoria@agricultura.gov.br'
    },
    {
      id: 'mec',
      sigla: 'MEC',
      nome: 'Ministério da Educação',
      icone: '📚',
      cor: '#1565c0',
      descricao: 'Responsável pela política nacional de educação.',
      programas: [
        { nome: 'FNDE - Fundo Nacional de Desenvolvimento da Educação', link: 'https://www.fnde.gov.br' },
        { nome: 'PDDE - Programa Dinheiro Direto na Escola', link: 'https://www.fnde.gov.br/programas/pdde' },
        { nome: 'PNAE - Programa Nacional de Alimentação Escolar', link: 'https://www.fnde.gov.br/programas/pnae' },
        { nome: 'PNATE - Programa Nacional de Apoio ao Transporte Escolar', link: 'https://www.fnde.gov.br/programas/pnate' },
        { nome: 'Caminho da Escola', link: 'https://www.fnde.gov.br/programas/caminho-da-escola' }
      ],
      site: 'https://www.gov.br/mec',
      telefone: '(61) 2022-7000',
      email: 'ouvidoria@mec.gov.br'
    },
    {
      id: 'ms',
      sigla: 'MS',
      nome: 'Ministério da Saúde',
      icone: '🏥',
      cor: '#c62828',
      descricao: 'Responsável pela política nacional de saúde.',
      programas: [
        { nome: 'PAB - Piso da Atenção Básica', link: 'https://www.gov.br/saude/pt-br/composicao/saps/pab' },
        { nome: 'ESF - Estratégia Saúde da Família', link: 'https://www.gov.br/saude/pt-br/composicao/saps/esf' },
        { nome: 'MAC - Média e Alta Complexidade', link: 'https://www.gov.br/saude/pt-br/composicao/saes/mac' },
        { nome: 'Farmácia Popular', link: 'https://www.gov.br/saude/pt-br/composicao/sctie/farmacia-popular' },
        { nome: 'SAMU 192', link: 'https://www.gov.br/saude/pt-br/composicao/saes/samu' }
      ],
      site: 'https://www.gov.br/saude',
      telefone: '136',
      email: 'ouvidoria@saude.gov.br'
    },
    {
      id: 'mda',
      sigla: 'MDA',
      nome: 'Ministério do Desenvolvimento Agrário e Agricultura Familiar',
      icone: '🚜',
      cor: '#558b2f',
      descricao: 'Responsável pela reforma agrária e agricultura familiar.',
      programas: [
        { nome: 'Terra Legal', link: 'https://www.gov.br/incra/pt-br/assuntos/governanca-fundiaria/terra-legal' },
        { nome: 'Crédito Fundiário', link: 'https://www.gov.br/agricultura/pt-br/assuntos/agricultura-familiar/credito-fundiario' },
        { nome: 'ATER - Assistência Técnica e Extensão Rural', link: 'https://www.gov.br/agricultura/pt-br/assuntos/agricultura-familiar/ater' }
      ],
      site: 'https://www.gov.br/mda',
      telefone: '(61) 2020-0002',
      email: 'ouvidoria@mda.gov.br'
    },
    {
      id: 'mcidades',
      sigla: 'MCIDADES',
      nome: 'Ministério das Cidades',
      icone: '🏙️',
      cor: '#6a1b9a',
      descricao: 'Responsável pela política de desenvolvimento urbano.',
      programas: [
        { nome: 'PAC - Programa de Aceleração do Crescimento', link: 'https://www.gov.br/cidades/pt-br/pac' },
        { nome: 'Minha Casa, Minha Vida', link: 'https://www.gov.br/cidades/pt-br/assuntos/habitacao/minha-casa-minha-vida' },
        { nome: 'Saneamento Básico', link: 'https://www.gov.br/cidades/pt-br/assuntos/saneamento' },
        { nome: 'Mobilidade Urbana', link: 'https://www.gov.br/cidades/pt-br/assuntos/mobilidade-urbana' }
      ],
      site: 'https://www.gov.br/cidades',
      telefone: '(61) 2108-1000',
      email: 'ouvidoria@cidades.gov.br'
    },
    {
      id: 'mma',
      sigla: 'MMA',
      nome: 'Ministério do Meio Ambiente',
      icone: '🌿',
      cor: '#00695c',
      descricao: 'Responsável pela política ambiental.',
      programas: [
        { nome: 'Fundo Amazônia', link: 'https://www.fundoamazonia.gov.br' },
        { nome: 'Bolsa Verde', link: 'https://www.gov.br/mma/pt-br/assuntos/servicosambientais/bolsa-verde' },
        { nome: 'Programa Água Doce', link: 'https://www.gov.br/mma/pt-br/assuntos/agua/programa-agua-doce' }
      ],
      site: 'https://www.gov.br/mma',
      telefone: '(61) 2028-1000',
      email: 'ouvidoria@mma.gov.br'
    },
    {
      id: 'midr',
      sigla: 'MIDR',
      nome: 'Ministério da Integração e do Desenvolvimento Regional',
      icone: '🗺️',
      cor: '#ef6c00',
      descricao: 'Responsável pelo desenvolvimento regional e defesa civil.',
      programas: [
        { nome: 'Defesa Civil', link: 'https://www.gov.br/mdr/pt-br/assuntos/protecao-e-defesa-civil' },
        { nome: 'Desenvolvimento Regional', link: 'https://www.gov.br/mdr/pt-br/assuntos/desenvolvimento-regional' },
        { nome: 'Obras Hídricas', link: 'https://www.gov.br/mdr/pt-br/assuntos/seguranca-hidrica' }
      ],
      site: 'https://www.gov.br/mdr',
      telefone: '(61) 2034-4000',
      email: 'ouvidoria@mdr.gov.br'
    },
    {
      id: 'mds',
      sigla: 'MDS',
      nome: 'Ministério do Desenvolvimento e Assistência Social',
      icone: '🤝',
      cor: '#ad1457',
      descricao: 'Responsável pelas políticas de assistência social.',
      programas: [
        { nome: 'Bolsa Família', link: 'https://www.gov.br/mds/pt-br/acoes-e-programas/bolsa-familia' },
        { nome: 'SUAS - Sistema Único de Assistência Social', link: 'https://www.gov.br/mds/pt-br/acoes-e-programas/suas' },
        { nome: 'BPC - Benefício de Prestação Continuada', link: 'https://www.gov.br/mds/pt-br/acoes-e-programas/suas/bpc' },
        { nome: 'CRAS/CREAS', link: 'https://www.gov.br/mds/pt-br/acoes-e-programas/suas/cras-creas' }
      ],
      site: 'https://www.gov.br/mds',
      telefone: '121',
      email: 'ouvidoria@mds.gov.br'
    }
  ];

  const filteredMinisterios = ministerios.filter(m =>
    m.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.sigla.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.programas.some(p => p.nome.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleMinisterio = (id) => {
    setExpandedMinisterio(expandedMinisterio === id ? null : id);
  };

  return (
    <>
      {/* Botão de toggle para mobile */}
      <button 
        className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
        onClick={onToggle}
        title={isOpen ? 'Fechar menu' : 'Abrir menu de ministérios'}
      >
        {isOpen ? '✕' : '🏛️'}
      </button>

      {/* Overlay para mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}

      {/* Sidebar */}
      <aside className={`ministerios-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>🏛️ Ministérios</h2>
          <p>Programas e Transferências Federais</p>
        </div>

        <div className="sidebar-search">
          <input
            type="text"
            placeholder="Buscar ministério ou programa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="sidebar-content">
          {filteredMinisterios.map((ministerio) => (
            <div key={ministerio.id} className="ministerio-item">
              <button
                className={`ministerio-header ${expandedMinisterio === ministerio.id ? 'expanded' : ''}`}
                onClick={() => toggleMinisterio(ministerio.id)}
                style={{ borderLeftColor: ministerio.cor }}
              >
                <span className="ministerio-icone">{ministerio.icone}</span>
                <div className="ministerio-info">
                  <span className="ministerio-sigla">{ministerio.sigla}</span>
                  <span className="ministerio-nome">{ministerio.nome}</span>
                </div>
                <span className="expand-icon">{expandedMinisterio === ministerio.id ? '▲' : '▼'}</span>
              </button>

              {expandedMinisterio === ministerio.id && (
                <div className="ministerio-details">
                  <p className="ministerio-descricao">{ministerio.descricao}</p>
                  
                  <div className="programas-lista">
                    <h4>Programas:</h4>
                    {ministerio.programas.map((programa, idx) => (
                      <a
                        key={idx}
                        href={programa.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="programa-link"
                      >
                        📋 {programa.nome}
                      </a>
                    ))}
                  </div>

                  <div className="ministerio-contato">
                    <p><strong>📞 Telefone:</strong> {ministerio.telefone}</p>
                    <p><strong>📧 E-mail:</strong> {ministerio.email}</p>
                    <a
                      href={ministerio.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="site-link"
                    >
                      🌐 Visitar site oficial
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="transferegov-section">
            <h3>🔗 Portal Transferegov</h3>
            <p>Acesse o portal oficial para consultar todos os programas e fazer adesão:</p>
            <a
              href="https://www.gov.br/transferegov"
              target="_blank"
              rel="noopener noreferrer"
              className="transferegov-btn"
            >
              Acessar Transferegov
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MinisteriosSidebar;

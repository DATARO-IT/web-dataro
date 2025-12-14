import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../utils/supabaseClient';
import './Dashboard.css';

const Dashboard = () => {
  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/paineis/login');
      return;
    }

    fetchMunicipios();
  }, [user, navigate]);

  const fetchMunicipios = async () => {
    try {
      const { data, error } = await supabase
        .from('municipios')
        .select(`
          *,
          paineis_bi (
            id,
            titulo,
            url_powerbi,
            status
          )
        `)
        .order('nome', { ascending: true });

      if (error) throw error;
      setMunicipios(data || []);
    } catch (error) {
      console.error('Erro ao carregar municípios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/paineis/login');
  };

  const filteredMunicipios = municipios.filter(m =>
    m.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPainel = (municipio) => {
    navigate(`/paineis/municipio/${municipio.id}`);
  };

  // Função para gerar URL da bandeira
  const getBandeiraUrl = (municipioNome) => {
    // Placeholder com gradiente personalizado
    return `https://via.placeholder.com/300x200/667eea/ffffff?text=${encodeURIComponent(municipioNome)}`;
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>Painéis de BI - CIMCERO</h1>
            <p>Rondônia em Números</p>
          </div>
          <div className="header-actions">
            <span className="user-name">Olá, {user?.nome}</span>
            <button onClick={handleLogout} className="logout-button">
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="search-section">
          <input
            type="text"
            placeholder="Buscar município..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <p className="results-count">
            {filteredMunicipios.length} município(s) encontrado(s)
          </p>
        </div>

        {loading ? (
          <div className="loading">Carregando municípios...</div>
        ) : (
          <div className="bandeiras-grid">
            {filteredMunicipios.map((municipio) => {
              const hasPainel = municipio.paineis_bi && municipio.paineis_bi.length > 0;
              const painel = hasPainel ? municipio.paineis_bi[0] : null;
              const painelAtivo = painel?.status === 'ativo';

              return (
                <div
                  key={municipio.id}
                  className={`bandeira-card ${painelAtivo ? 'com-painel' : 'sem-painel'}`}
                  onClick={() => handleViewPainel(municipio)}
                >
                  <div className="bandeira-container">
                    <img
                      src={getBandeiraUrl(municipio.nome)}
                      alt={`Bandeira de ${municipio.nome}`}
                      className="bandeira-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/300x200/667eea/ffffff?text=${encodeURIComponent(municipio.nome)}`;
                      }}
                    />
                    {painelAtivo && (
                      <div className="painel-badge">
                        <span>✓ Painel Disponível</span>
                      </div>
                    )}
                  </div>
                  <div className="bandeira-info">
                    <h3>{municipio.nome}</h3>
                    <p className="bandeira-description">
                      Acesse o painel do município de {municipio.nome}
                    </p>
                    {!painelAtivo && (
                      <span className="em-desenvolvimento">Em desenvolvimento</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && filteredMunicipios.length === 0 && (
          <div className="no-results">
            <p>Nenhum município encontrado com "{searchTerm}"</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabaseClient';
import logo from '../../assets/logo.png';
import './AdminProjetos.css';

// Ícones SVG inline
const Icons = {
  Folder: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  ExternalLink: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  ),
  BarChart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="12" y1="20" x2="12" y2="4"></line>
      <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
  ),
  Globe: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  Calendar: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  Info: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  ),
  Edit: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  Save: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  )
};

// Dados padrão do projeto (fallback)
const projetoPadrao = {
  id: 1,
  nome: 'Rondônia em Números',
  descricao: 'Painel de Business Intelligence com dados estatísticos dos 52 municípios de Rondônia. Inclui indicadores socioeconômicos, demográficos, educacionais, de saúde e infraestrutura.',
  status: 'Ativo',
  tipo: 'Painel de BI',
  url: '/paineis',
  urlExterna: null,
  icone: 'BarChart',
  cor: '#10b981',
  dataCriacao: '2024-01-15',
  ultimaAtualizacao: '2026-01-25',
  estatisticas: {
    municipios: 52,
    indicadores: 150,
    acessos: 12500
  }
};

// Tipos de projeto disponíveis
const tiposProjeto = [
  'Painel de BI',
  'Dashboard',
  'Plataforma Web',
  'API',
  'Aplicativo Mobile',
  'Sistema de Gestão',
  'Outro'
];

// Status disponíveis
const statusProjeto = [
  'Ativo',
  'Em Desenvolvimento',
  'Pausado',
  'Concluído',
  'Arquivado'
];

const AdminProjetos = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [projetos, setProjetos] = useState([projetoPadrao]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProjeto, setEditingProjeto] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Carregar projetos do Supabase
  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const { data, error } = await supabase
          .from('admin_projetos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.log('Tabela admin_projetos não encontrada, usando dados padrão');
          setProjetos([projetoPadrao]);
        } else if (data && data.length > 0) {
          // Mapear dados do Supabase para o formato esperado
          const projetosMapeados = data.map(p => ({
            id: p.id,
            nome: p.nome || projetoPadrao.nome,
            descricao: p.descricao || projetoPadrao.descricao,
            status: p.status || projetoPadrao.status,
            tipo: p.tipo || projetoPadrao.tipo,
            url: p.url || projetoPadrao.url,
            urlExterna: p.url_externa || null,
            icone: p.icone || 'BarChart',
            cor: p.cor || '#10b981',
            dataCriacao: p.data_criacao || p.created_at?.split('T')[0] || projetoPadrao.dataCriacao,
            ultimaAtualizacao: p.updated_at?.split('T')[0] || projetoPadrao.ultimaAtualizacao,
            estatisticas: p.estatisticas || projetoPadrao.estatisticas
          }));
          setProjetos(projetosMapeados);
        } else {
          // Se não há dados, inserir o projeto padrão
          await inserirProjetoPadrao();
        }
      } catch (err) {
        console.error('Erro ao carregar projetos:', err);
        setProjetos([projetoPadrao]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjetos();
    window.scrollTo(0, 0);
  }, []);

  // Inserir projeto padrão no Supabase
  const inserirProjetoPadrao = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_projetos')
        .insert([{
          nome: projetoPadrao.nome,
          descricao: projetoPadrao.descricao,
          status: projetoPadrao.status,
          tipo: projetoPadrao.tipo,
          url: projetoPadrao.url,
          icone: projetoPadrao.icone,
          cor: projetoPadrao.cor,
          data_criacao: projetoPadrao.dataCriacao,
          estatisticas: projetoPadrao.estatisticas
        }])
        .select();

      if (!error && data) {
        setProjetos(data.map(p => ({
          ...projetoPadrao,
          id: p.id
        })));
      }
    } catch (err) {
      console.error('Erro ao inserir projeto padrão:', err);
    }
  };

  const projetosFiltrados = projetos.filter(projeto =>
    projeto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    projeto.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    projeto.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAcessarProjeto = (projeto) => {
    if (projeto.urlExterna) {
      window.open(projeto.urlExterna, '_blank');
    } else if (projeto.url) {
      navigate(projeto.url);
    }
  };

  const handleEditarProjeto = (projeto) => {
    setEditingProjeto({ ...projeto });
    setShowEditModal(true);
    setMessage({ type: '', text: '' });
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingProjeto(null);
    setMessage({ type: '', text: '' });
  };

  const handleSalvarProjeto = async () => {
    if (!editingProjeto) return;

    // Validação
    if (!editingProjeto.nome || editingProjeto.nome.trim().length < 3) {
      setMessage({ type: 'error', text: 'O nome do projeto deve ter pelo menos 3 caracteres.' });
      return;
    }

    if (!editingProjeto.tipo) {
      setMessage({ type: 'error', text: 'Selecione um tipo de projeto.' });
      return;
    }

    if (!editingProjeto.status) {
      setMessage({ type: 'error', text: 'Selecione um status para o projeto.' });
      return;
    }

    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const { error } = await supabase
        .from('admin_projetos')
        .update({
          nome: editingProjeto.nome.trim(),
          descricao: editingProjeto.descricao?.trim() || '',
          status: editingProjeto.status,
          tipo: editingProjeto.tipo,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingProjeto.id);

      if (error) {
        console.error('Erro ao atualizar projeto:', error);
        setMessage({ type: 'error', text: 'Erro ao salvar alterações. Tente novamente.' });
      } else {
        // Atualizar estado local
        setProjetos(prev => prev.map(p => 
          p.id === editingProjeto.id 
            ? { 
                ...p, 
                nome: editingProjeto.nome.trim(),
                descricao: editingProjeto.descricao?.trim() || '',
                status: editingProjeto.status,
                tipo: editingProjeto.tipo,
                ultimaAtualizacao: new Date().toISOString().split('T')[0]
              } 
            : p
        ));
        setMessage({ type: 'success', text: 'Projeto atualizado com sucesso!' });
        setTimeout(() => {
          handleCloseModal();
        }, 1500);
      }
    } catch (err) {
      console.error('Erro ao salvar projeto:', err);
      setMessage({ type: 'error', text: 'Erro ao salvar alterações. Tente novamente.' });
    } finally {
      setSaving(false);
    }
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'BarChart':
        return <Icons.BarChart />;
      case 'Globe':
        return <Icons.Globe />;
      case 'Users':
        return <Icons.Users />;
      default:
        return <Icons.Folder />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'ativo':
        return 'ativo';
      case 'em desenvolvimento':
        return 'desenvolvimento';
      case 'pausado':
        return 'pausado';
      case 'concluído':
        return 'concluido';
      case 'arquivado':
        return 'arquivado';
      default:
        return 'ativo';
    }
  };

  return (
    <div className="admin-projetos">
      {/* Logo */}
      <div className="page-header-with-logo">
        <img src={logo} alt="DATA-RO" className="page-logo" />
      </div>

      {/* Header */}
      <div className="projetos-header">
        <div className="header-content">
          <div className="header-icon">
            <Icons.Folder />
          </div>
          <div className="header-text">
            <h1>Projetos</h1>
            <p>Gerencie os projetos e painéis desenvolvidos pela DATA-RO</p>
          </div>
        </div>
      </div>

      {/* Barra de busca */}
      <div className="projetos-toolbar">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar projetos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="projetos-count">
          {projetosFiltrados.length} projeto(s) encontrado(s)
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando projetos...</p>
        </div>
      )}

      {/* Grid de Projetos */}
      {!loading && (
        <div className="projetos-grid">
          {projetosFiltrados.map((projeto) => (
            <div key={projeto.id} className="projeto-card">
              <div className="projeto-card-header" style={{ borderColor: projeto.cor }}>
                <div className="projeto-icon" style={{ backgroundColor: projeto.cor }}>
                  {getIconComponent(projeto.icone)}
                </div>
                <div className="projeto-status">
                  <span className={`status-badge ${getStatusClass(projeto.status)}`}>
                    {projeto.status}
                  </span>
                </div>
              </div>

              <div className="projeto-card-body">
                <h3 className="projeto-nome">{projeto.nome}</h3>
                <span className="projeto-tipo">{projeto.tipo}</span>
                <p className="projeto-descricao">{projeto.descricao}</p>

                {/* Estatísticas */}
                {projeto.estatisticas && (
                  <div className="projeto-stats">
                    <div className="stat-item">
                      <Icons.Globe />
                      <span>{projeto.estatisticas.municipios} municípios</span>
                    </div>
                    <div className="stat-item">
                      <Icons.BarChart />
                      <span>{projeto.estatisticas.indicadores} indicadores</span>
                    </div>
                    <div className="stat-item">
                      <Icons.Users />
                      <span>{projeto.estatisticas.acessos?.toLocaleString()} acessos</span>
                    </div>
                  </div>
                )}

                {/* Datas */}
                <div className="projeto-dates">
                  <div className="date-item">
                    <Icons.Calendar />
                    <span>Criado em: {formatDate(projeto.dataCriacao)}</span>
                  </div>
                  <div className="date-item">
                    <Icons.Info />
                    <span>Atualizado: {formatDate(projeto.ultimaAtualizacao)}</span>
                  </div>
                </div>
              </div>

              <div className="projeto-card-footer">
                <button 
                  className="btn-editar"
                  onClick={() => handleEditarProjeto(projeto)}
                >
                  <Icons.Edit />
                  Editar Projeto
                </button>
                <button 
                  className="btn-acessar"
                  onClick={() => handleAcessarProjeto(projeto)}
                  style={{ backgroundColor: projeto.cor }}
                >
                  Acessar Projeto
                  <Icons.ExternalLink />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mensagem quando não há projetos */}
      {!loading && projetosFiltrados.length === 0 && (
        <div className="no-projetos">
          <Icons.Folder />
          <h3>Nenhum projeto encontrado</h3>
          <p>Tente ajustar os termos de busca</p>
        </div>
      )}

      {/* Modal de Edição */}
      {showEditModal && editingProjeto && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Editar Projeto</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                <Icons.X />
              </button>
            </div>

            <div className="modal-body">
              {message.text && (
                <div className={`message ${message.type}`}>
                  {message.text}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="nome">Nome do Projeto *</label>
                <input
                  type="text"
                  id="nome"
                  value={editingProjeto.nome}
                  onChange={(e) => setEditingProjeto({ ...editingProjeto, nome: e.target.value })}
                  placeholder="Nome do projeto"
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tipo">Tipo *</label>
                  <select
                    id="tipo"
                    value={editingProjeto.tipo}
                    onChange={(e) => setEditingProjeto({ ...editingProjeto, tipo: e.target.value })}
                    className="form-select"
                  >
                    <option value="">Selecione o tipo</option>
                    {tiposProjeto.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status *</label>
                  <select
                    id="status"
                    value={editingProjeto.status}
                    onChange={(e) => setEditingProjeto({ ...editingProjeto, status: e.target.value })}
                    className="form-select"
                  >
                    <option value="">Selecione o status</option>
                    {statusProjeto.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="descricao">Descrição</label>
                <textarea
                  id="descricao"
                  value={editingProjeto.descricao}
                  onChange={(e) => setEditingProjeto({ ...editingProjeto, descricao: e.target.value })}
                  placeholder="Descrição do projeto"
                  className="form-textarea"
                  rows="4"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancelar" onClick={handleCloseModal} disabled={saving}>
                Cancelar
              </button>
              <button className="btn-salvar" onClick={handleSalvarProjeto} disabled={saving}>
                {saving ? (
                  <>
                    <span className="btn-spinner"></span>
                    Salvando...
                  </>
                ) : (
                  <>
                    <Icons.Save />
                    Salvar Alterações
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rodapé */}
      <div className="projetos-footer">
        <img src={logo} alt="DATA-RO" className="footer-logo" />
        <p>Desenvolvido por DATA-RO Inteligência Territorial</p>
      </div>
    </div>
  );
};

export default AdminProjetos;

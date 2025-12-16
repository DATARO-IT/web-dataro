import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import './AdminPanel.css';

const AdminPanel = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [paineis, setPaineis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMunicipios: 0,
    totalPaineis: 0,
    paineisAtivos: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Buscar usuários
      const { data: usersData } = await supabase
        .from('usuarios')
        .select('*')
        .order('data_criacao', { ascending: false });

      // Buscar municípios
      const { data: municipiosData } = await supabase
        .from('municipios')
        .select('*')
        .order('nome');

      // Buscar painéis
      const { data: paineisData } = await supabase
        .from('paineis_bi')
        .select(`
          *,
          municipios (nome)
        `)
        .order('created_at', { ascending: false });

      setUsers(usersData || []);
      setMunicipios(municipiosData || []);
      setPaineis(paineisData || []);

      // Calcular estatísticas
      setStats({
        totalUsers: usersData?.length || 0,
        totalMunicipios: municipiosData?.length || 0,
        totalPaineis: paineisData?.length || 0,
        paineisAtivos: paineisData?.filter(p => p.status === 'ativo').length || 0
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('usuarios')
        .update({ ativo: !currentStatus })
        .eq('id', userId);

      if (error) throw error;
      
      fetchData(); // Recarregar dados
      alert('Status do usuário atualizado!');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar status do usuário');
    }
  };

  const deleteUser = async (userId) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

    try {
      const { error } = await supabase
        .from('usuarios')
        .delete()
        .eq('id', userId);

      if (error) throw error;
      
      fetchData();
      alert('Usuário excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir usuário');
    }
  };

  if (loading) {
    return (
      <div className="admin-panel-overlay">
        <div className="admin-panel">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Carregando dados administrativos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel-overlay">
      <div className="admin-panel">
        <div className="admin-panel-header">
          <h2>🔧 Painel Administrativo</h2>
          <button onClick={onClose} className="close-button">✕</button>
        </div>

        {/* Estatísticas */}
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <div className="stat-value">{stats.totalUsers}</div>
              <div className="stat-label">Usuários</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏛️</div>
            <div className="stat-info">
              <div className="stat-value">{stats.totalMunicipios}</div>
              <div className="stat-label">Municípios</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <div className="stat-value">{stats.totalPaineis}</div>
              <div className="stat-label">Painéis</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-value">{stats.paineisAtivos}</div>
              <div className="stat-label">Ativos</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button 
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Usuários ({stats.totalUsers})
          </button>
          <button 
            className={`tab-button ${activeTab === 'municipios' ? 'active' : ''}`}
            onClick={() => setActiveTab('municipios')}
          >
            🏛️ Municípios ({stats.totalMunicipios})
          </button>
          <button 
            className={`tab-button ${activeTab === 'paineis' ? 'active' : ''}`}
            onClick={() => setActiveTab('paineis')}
          >
            📊 Painéis ({stats.totalPaineis})
          </button>
        </div>

        {/* Conteúdo das Tabs */}
        <div className="admin-content">
          {activeTab === 'users' && (
            <div className="users-table">
              <h3>Gerenciar Usuários</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Data Criação</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.nome}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role || 'user'}`}>
                          {user.role === 'admin' ? '👑 Admin' : '👤 Usuário'}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.ativo ? 'ativo' : 'inativo'}`}>
                          {user.ativo ? '✅ Ativo' : '❌ Inativo'}
                        </span>
                      </td>
                      <td>{new Date(user.data_criacao).toLocaleDateString('pt-BR')}</td>
                      <td className="action-buttons">
                        <button 
                          onClick={() => toggleUserStatus(user.id, user.ativo)}
                          className="btn-toggle"
                          title={user.ativo ? 'Desativar' : 'Ativar'}
                        >
                          {user.ativo ? '🔒' : '🔓'}
                        </button>
                        <button 
                          onClick={() => deleteUser(user.id)}
                          className="btn-delete"
                          title="Excluir"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'municipios' && (
            <div className="municipios-table">
              <h3>Municípios Cadastrados</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Prefeito</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Lei</th>
                  </tr>
                </thead>
                <tbody>
                  {municipios.map(mun => (
                    <tr key={mun.id}>
                      <td>{mun.id}</td>
                      <td><strong>{mun.nome}</strong></td>
                      <td>{mun.prefeito}</td>
                      <td>{mun.email}</td>
                      <td>{mun.telefone}</td>
                      <td>{mun.lei}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'paineis' && (
            <div className="paineis-table">
              <h3>Painéis Power BI</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Município</th>
                    <th>Título</th>
                    <th>Status</th>
                    <th>URL</th>
                    <th>Data Criação</th>
                  </tr>
                </thead>
                <tbody>
                  {paineis.map(painel => (
                    <tr key={painel.id}>
                      <td>{painel.id}</td>
                      <td><strong>{painel.municipios?.nome || 'N/A'}</strong></td>
                      <td>{painel.titulo}</td>
                      <td>
                        <span className={`status-badge ${painel.status}`}>
                          {painel.status === 'ativo' ? '✅ Ativo' : '⏳ Pendente'}
                        </span>
                      </td>
                      <td className="url-cell">{painel.url_powerbi ? '🔗 Configurado' : '❌ Sem URL'}</td>
                      <td>{new Date(painel.created_at).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getBandeiraUrl } from '../../utils/bandeirasMap';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Lista de municípios com bandeiras que funcionam corretamente (24 municípios)
  const municipiosDestaque = [
    'Ariquemes', 'Cacoal', 'Jaru', 'Pimenta Bueno',
    'Buritis', 'Espigão d\'Oeste', 'Alta Floresta d\'Oeste', 'Alto Alegre dos Parecis',
    'Alto Paraíso', 'Alvorada d\'Oeste', 'Cacaulândia', 'Campo Novo de Rondônia',
    'Candeias do Jamari', 'Cerejeiras', 'Chupinguaia', 'Corumbiara',
    'Itapuã do Oeste', 'Machadinho d\'Oeste', 'Monte Negro', 'Nova Mamoré',
    'Nova União', 'Novo Horizonte do Oeste', 'Parecis', 'Seringueiras'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, senha);

    if (result.success) {
      navigate('/paineis/dashboard');
    } else {
      setError(result.error || 'Erro ao fazer login');
    }

    setLoading(false);
  };

  const handleVoltar = () => {
    navigate('/');
  };

  const handleContato = () => {
    navigate('/');
    // Após navegar, rolar até a seção de contato
    setTimeout(() => {
      const contatoSection = document.getElementById('contato');
      if (contatoSection) {
        contatoSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="login-container">
      {/* Coluna Esquerda - Bandeiras */}
      <div className="login-left">
        <h3>Municípios de Rondônia</h3>
        <div className="bandeiras-preview-left">
          {municipiosDestaque.slice(0, 12).map((municipio, index) => (
            <div key={index} className="bandeira-mini">
              <img
                src={getBandeiraUrl(municipio)}
                alt={`Bandeira de ${municipio}`}
                loading="lazy"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/80x60/667eea/ffffff?text=${encodeURIComponent(municipio.substring(0, 3))}`;
                }}
              />
              <span className="bandeira-nome">{municipio}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Coluna Centro - Formulário */}
      <div className="login-center">
        <div className="login-box">
          <div className="login-header">
            <h1>Painéis de BI</h1>
            <p>CIMCERO - Rondônia em Números</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Botões adicionais */}
          <div className="login-actions">
            <button onClick={handleVoltar} className="action-button secondary">
              Voltar à página inicial
            </button>
            <button onClick={handleContato} className="action-button secondary">
              Para ter acesso entre em contato conosco
            </button>
          </div>

          <div className="login-footer">
            <p>DATA-RO INTELIGÊNCIA TERRITORIAL. TODOS OS DIREITOS RESERVADOS</p>
          </div>
        </div>
      </div>

      {/* Coluna Direita - Mais Bandeiras */}
      <div className="login-right">
        <h3>Membros do CIMCERO</h3>
        <div className="bandeiras-preview-right">
          {municipiosDestaque.slice(12, 24).map((municipio, index) => (
            <div key={index} className="bandeira-mini">
              <img
                src={getBandeiraUrl(municipio)}
                alt={`Bandeira de ${municipio}`}
                loading="lazy"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/80x60/667eea/ffffff?text=${encodeURIComponent(municipio.substring(0, 3))}`;
                }}
              />
              <span className="bandeira-nome">{municipio}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;

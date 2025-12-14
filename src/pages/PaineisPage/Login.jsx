import React, { useState, useEffect } from 'react';
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

  // Lista de alguns municípios para mostrar bandeiras
  const municipiosDestaque = [
    'Porto Velho', 'Ariquemes', 'Cacoal', 'Ji-Paraná', 'Vilhena',
    'Rolim de Moura', 'Jaru', 'Pimenta Bueno', 'Ouro Preto do Oeste',
    'Guajará-Mirim', 'Buritis', 'Espigão d\'Oeste'
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

  return (
    <div className="login-container">
      {/* Coluna Esquerda - Logo */}
      <div className="login-left">
        <img src="/src/assets/logo.png" alt="DATA-RO Logo" className="login-logo" />
        <h2>Inteligência Territorial</h2>
        <p>Dados estratégicos para tomada de decisão</p>
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

          <div className="login-footer">
            <p>© 2024 DATA-RO - Todos os direitos reservados</p>
          </div>
        </div>
      </div>

      {/* Coluna Direita - Bandeiras */}
      <div className="login-right">
        <h3>Municípios de Rondônia</h3>
        <div className="bandeiras-preview">
          {municipiosDestaque.map((municipio, index) => (
            <div key={index} className="bandeira-mini">
              <img
                src={getBandeiraUrl(municipio)}
                alt={`Bandeira de ${municipio}`}
                loading="lazy"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/80x60/667eea/ffffff?text=${encodeURIComponent(municipio.substring(0, 3))}`;
                }}
              />
            </div>
          ))}
        </div>
        <p className="total-municipios">48 municípios</p>
      </div>
    </div>
  );
};

export default Login;

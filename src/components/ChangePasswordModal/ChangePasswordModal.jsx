import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { validatePassword, getStrengthColor, getPasswordHints, passwordsMatch } from '../../utils/passwordValidator';
import './ChangePasswordModal.css';

const ChangePasswordModal = ({ user, onPasswordChanged }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Validar senha em tempo real
  useEffect(() => {
    if (newPassword) {
      const validation = validatePassword(newPassword);
      setPasswordValidation(validation);
    } else {
      setPasswordValidation(null);
    }
  }, [newPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validar senha
    const validation = validatePassword(newPassword);
    if (!validation.isValid) {
      setError(validation.errors[0]);
      return;
    }

    // Verificar se as senhas coincidem
    if (!passwordsMatch(newPassword, confirmPassword)) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      // Atualizar senha no banco
      const { error: updateError } = await supabase
        .from('usuarios')
        .update({ 
          senha_hash: newPassword,
          primeiro_acesso: false 
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Notificar sucesso
      alert('Senha alterada com sucesso! Faça login novamente.');
      onPasswordChanged();
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      setError('Erro ao alterar senha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-modal-overlay">
      <div className="change-password-modal">
        <div className="modal-header">
          <h2>🔐 Primeiro Acesso - Segurança Obrigatória</h2>
          <p>Por segurança, você deve criar uma senha forte antes de continuar.</p>
        </div>

        <form onSubmit={handleSubmit} className="change-password-form">
          <div className="form-group">
            <label htmlFor="newPassword">Nova Senha *</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Digite sua nova senha"
                required
                autoFocus
                className={passwordValidation && !passwordValidation.isValid ? 'invalid' : ''}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            
            {/* Indicador de força da senha */}
            {passwordValidation && (
              <div className="password-strength">
                <div className="strength-bar-container">
                  <div 
                    className="strength-bar" 
                    style={{
                      width: passwordValidation.isValid ? '100%' : '33%',
                      backgroundColor: getStrengthColor(passwordValidation.strength)
                    }}
                  ></div>
                </div>
                <span 
                  className="strength-label"
                  style={{ color: getStrengthColor(passwordValidation.strength) }}
                >
                  {passwordValidation.strength}
                </span>
              </div>
            )}

            {/* Erros de validação em tempo real */}
            {passwordValidation && !passwordValidation.isValid && (
              <div className="validation-errors">
                {passwordValidation.errors.map((err, index) => (
                  <div key={index} className="validation-error">
                    ❌ {err}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha *</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Digite novamente sua nova senha"
              required
              className={confirmPassword && !passwordsMatch(newPassword, confirmPassword) ? 'invalid' : ''}
            />
            {confirmPassword && !passwordsMatch(newPassword, confirmPassword) && (
              <div className="validation-error">
                ❌ As senhas não coincidem
              </div>
            )}
            {confirmPassword && passwordsMatch(newPassword, confirmPassword) && (
              <div className="validation-success">
                ✅ As senhas coincidem
              </div>
            )}
          </div>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading || !passwordValidation || !passwordValidation.isValid || !passwordsMatch(newPassword, confirmPassword)}
            >
              {loading ? 'Alterando...' : 'Alterar Senha e Continuar'}
            </button>
          </div>

          <div className="password-requirements">
            <p><strong>📋 Requisitos Obrigatórios de Segurança:</strong></p>
            <ul>
              {getPasswordHints().map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
            <div className="security-note">
              <strong>⚠️ Importante:</strong> Escolha uma senha forte e única que você não use em outros sites.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;

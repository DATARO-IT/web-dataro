// src/utils/passwordValidator.js

/**
 * Valida se a senha atende aos requisitos de segurança
 * 
 * Requisitos:
 * - Mínimo 8 caracteres
 * - Pelo menos uma letra maiúscula
 * - Pelo menos uma letra minúscula
 * - Pelo menos um número
 * - Pelo menos um caractere especial
 * 
 * @param {string} password - A senha a ser validada
 * @returns {Object} - { isValid: boolean, errors: string[], strength: string }
 */
export const validatePassword = (password) => {
  const errors = [];
  
  // Verificar comprimento mínimo
  if (!password || password.length < 8) {
    errors.push('A senha deve ter no mínimo 8 caracteres');
  }
  
  // Verificar letra maiúscula
  if (!/[A-Z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra maiúscula');
  }
  
  // Verificar letra minúscula
  if (!/[a-z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra minúscula');
  }
  
  // Verificar número
  if (!/[0-9]/.test(password)) {
    errors.push('A senha deve conter pelo menos um número');
  }
  
  // Verificar caractere especial
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('A senha deve conter pelo menos um caractere especial (!@#$%^&*...)');
  }
  
  // Calcular força da senha
  let strength = 'Fraca';
  if (errors.length === 0) {
    if (password.length >= 12) {
      strength = 'Muito Forte';
    } else if (password.length >= 10) {
      strength = 'Forte';
    } else {
      strength = 'Média';
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strength
  };
};

/**
 * Retorna a cor correspondente à força da senha
 * @param {string} strength - Força da senha
 * @returns {string} - Cor CSS
 */
export const getStrengthColor = (strength) => {
  switch (strength) {
    case 'Muito Forte':
      return '#059669'; // Verde escuro
    case 'Forte':
      return '#10b981'; // Verde
    case 'Média':
      return '#f59e0b'; // Amarelo
    case 'Fraca':
    default:
      return '#ef4444'; // Vermelho
  }
};

/**
 * Retorna mensagens de ajuda para criação de senha segura
 * @returns {Array<string>} - Lista de dicas
 */
export const getPasswordHints = () => {
  return [
    'Mínimo 8 caracteres (recomendado 10+)',
    'Pelo menos uma letra maiúscula (A-Z)',
    'Pelo menos uma letra minúscula (a-z)',
    'Pelo menos um número (0-9)',
    'Pelo menos um caractere especial (!@#$%^&*...)'
  ];
};

/**
 * Verifica se duas senhas são iguais
 * @param {string} password - Senha
 * @param {string} confirmPassword - Confirmação da senha
 * @returns {boolean} - True se são iguais
 */
export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword && password.length > 0;
};

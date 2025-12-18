import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const storedUser = localStorage.getItem('paineis_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, senha) => {
    try {
      // Primeiro, buscar usuário pelo email (independente do status)
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email)
        .single();

      // Se usuário existe mas está inativo, mostrar mensagem personalizada
      if (userData && !userData.ativo) {
        // Mensagem específica para usuários inativos
        if (userData.email === 'romuloazevedo.ro@gmail.com') {
          throw new Error('Base de dados indisponível.');
        }
        throw new Error('Conta desativada. Entre em contato com o administrador.');
      }

      // Buscar usuário ativo
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email)
        .eq('ativo', true)
        .single();

      if (error || !data) {
        throw new Error('Credenciais inválidas');
      }

      // Por simplicidade, vamos usar comparação direta de senha
      // Em produção, use bcrypt para hash de senhas
      if (data.senha_hash !== senha) {
        throw new Error('Credenciais inválidas');
      }

      const userData = {
        id: data.id,
        email: data.email,
        nome: data.nome
      };

      setUser(userData);
      localStorage.setItem('paineis_user', JSON.stringify(userData));
      
      // Verificar se é senha padrão (requer troca)
      const requerTrocaSenha = data.senha_hash === '123456';
      
      return { success: true, requerTrocaSenha };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('paineis_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

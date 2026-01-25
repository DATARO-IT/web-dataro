import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const AdminAuthContext = createContext({});

// Função para registrar log de auditoria admin
const registrarLogAuditoriaAdmin = async (email, tipoEvento, detalhes) => {
  try {
    await supabase
      .from('admin_log_auditoria')
      .insert({
        email: email,
        tipo_evento: tipoEvento,
        user_agent: navigator.userAgent,
        detalhes: detalhes,
        ip_address: null // Será preenchido pelo backend se disponível
      });
  } catch (error) {
    console.error('Erro ao registrar log de auditoria admin:', error);
  }
};

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há admin logado no localStorage
    const storedAdmin = localStorage.getItem('admin_user');
    if (storedAdmin) {
      setAdminUser(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const loginAdmin = async (email, senha) => {
    try {
      // Buscar admin pelo email
      const { data, error } = await supabase
        .from('admin_usuarios')
        .select('*')
        .eq('email', email)
        .eq('ativo', true)
        .single();

      if (error || !data) {
        await registrarLogAuditoriaAdmin(
          email,
          'TENTATIVA_LOGIN_FALHA',
          'Usuário admin não encontrado ou inativo'
        );
        throw new Error('Credenciais inválidas');
      }

      // Verificar senha
      if (data.senha_hash !== senha) {
        await registrarLogAuditoriaAdmin(
          email,
          'TENTATIVA_LOGIN_SENHA_INCORRETA',
          `Senha incorreta para o admin: ${data.nome}`
        );
        throw new Error('Credenciais inválidas');
      }

      // Login bem-sucedido
      await registrarLogAuditoriaAdmin(
        email,
        'LOGIN_SUCESSO',
        `Login admin realizado com sucesso. Nome: ${data.nome}`
      );

      // Atualizar último acesso
      await supabase
        .from('admin_usuarios')
        .update({ ultimo_acesso: new Date().toISOString() })
        .eq('id', data.id);

      const adminData = {
        id: data.id,
        email: data.email,
        nome: data.nome,
        role: data.role,
        avatar_url: data.avatar_url,
        is_super_admin: data.is_super_admin || data.email === 'contato@dataro-it.com.br',
        primeiro_acesso: data.primeiro_acesso
      };

      setAdminUser(adminData);
      localStorage.setItem('admin_user', JSON.stringify(adminData));
      
      return { success: true, primeiro_acesso: data.primeiro_acesso };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const atualizarSenha = async (novaSenha) => {
    try {
      if (!adminUser) {
        throw new Error('Usuário não autenticado');
      }

      // Atualizar senha no banco
      const { error } = await supabase
        .from('admin_usuarios')
        .update({ 
          senha_hash: novaSenha,
          primeiro_acesso: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', adminUser.id);

      if (error) {
        throw new Error('Erro ao atualizar senha');
      }

      // Registrar log
      await registrarLogAuditoriaAdmin(
        adminUser.email,
        'SENHA_ALTERADA',
        `Senha alterada com sucesso. Nome: ${adminUser.nome}`
      );

      // Atualizar estado local
      const updatedUser = { ...adminUser, primeiro_acesso: false };
      setAdminUser(updatedUser);
      localStorage.setItem('admin_user', JSON.stringify(updatedUser));

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logoutAdmin = () => {
    if (adminUser) {
      registrarLogAuditoriaAdmin(
        adminUser.email,
        'LOGOUT',
        `Logout admin realizado. Nome: ${adminUser.nome}`
      );
    }
    setAdminUser(null);
    localStorage.removeItem('admin_user');
  };

  const isSuperAdmin = () => {
    return adminUser?.is_super_admin || adminUser?.email === 'contato@dataro-it.com.br';
  };

  return (
    <AdminAuthContext.Provider value={{ 
      adminUser, 
      loginAdmin, 
      logoutAdmin, 
      atualizarSenha,
      loading,
      isSuperAdmin 
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);

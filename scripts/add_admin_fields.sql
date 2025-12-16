-- Script para adicionar campos de administração à tabela usuarios

-- Adicionar coluna role (função do usuário)
ALTER TABLE usuarios 
ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user';

-- Adicionar coluna primeiro_acesso (flag para forçar troca de senha)
ALTER TABLE usuarios 
ADD COLUMN IF NOT EXISTS primeiro_acesso BOOLEAN DEFAULT false;

-- Atualizar usuário Bruno para ser admin e forçar troca de senha
UPDATE usuarios 
SET role = 'admin', primeiro_acesso = true 
WHERE email = 'brunohbotelhos@gmail.com';

-- Atualizar usuário admin@cimcero para ser admin
UPDATE usuarios 
SET role = 'admin' 
WHERE email = 'admin@cimcero.ro.gov.br';

-- Comentários nas colunas
COMMENT ON COLUMN usuarios.role IS 'Função do usuário: admin, user';
COMMENT ON COLUMN usuarios.primeiro_acesso IS 'Flag para forçar troca de senha no primeiro acesso';

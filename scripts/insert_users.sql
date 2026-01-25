-- Script para inserir usuários no sistema de administração DATA-RO
-- Todos os usuários começam com senha padrão '123456' e primeiro_acesso = TRUE

-- Limpar usuários existentes (exceto o super admin já criado)
-- DELETE FROM admin_usuarios WHERE email != 'contato@dataro-it.com.br';

-- Atualizar o usuário super admin existente
UPDATE admin_usuarios 
SET 
    nome = 'DATA-RO INTELIGÊNCIA TERRITORIAL',
    role = 'super_admin',
    is_super_admin = TRUE,
    primeiro_acesso = FALSE,
    ativo = TRUE,
    updated_at = NOW()
WHERE email = 'contato@dataro-it.com.br';

-- Inserir novos usuários
-- Administradores (suporte.dev, suporte, suporte.mkt, hugonsilva)
INSERT INTO admin_usuarios (email, nome, senha_hash, role, is_super_admin, primeiro_acesso, ativo)
VALUES 
    ('suporte.dev@dataro-it.com.br', 'Victor Eduardo Sousa Moraes', '123456', 'admin', FALSE, TRUE, TRUE),
    ('suporte@dataro-it.com.br', 'Kaliel Mendes Cardoso', '123456', 'admin', FALSE, TRUE, TRUE),
    ('suporte.mkt@dataro-it.com.br', 'Kayky Luka Guedes da Silva Ramos', '123456', 'admin', FALSE, TRUE, TRUE),
    ('hugonsilva@dataro-it.com.br', 'Hugo Nascimento Silva', '123456', 'admin', FALSE, TRUE, TRUE)
ON CONFLICT (email) DO UPDATE SET
    nome = EXCLUDED.nome,
    role = 'admin',
    primeiro_acesso = TRUE,
    updated_at = NOW();

-- Usuários comuns
INSERT INTO admin_usuarios (email, nome, senha_hash, role, is_super_admin, primeiro_acesso, ativo)
VALUES 
    ('suporte.bi@dataro-it.com.br', 'Bruno Henrique Botelho dos Santos', '123456', 'user', FALSE, TRUE, TRUE),
    ('dba@dataro-it.com.br', 'Felipe Barros da Costa', '123456', 'user', FALSE, TRUE, TRUE),
    ('consultoria@dataro-it.com.br', 'Ranieri Braga dos Santos', '123456', 'user', FALSE, TRUE, TRUE),
    ('viniciuspaes@dataro-it.com.br', 'Vinicius da Silva Paes', '123456', 'user', FALSE, TRUE, TRUE)
ON CONFLICT (email) DO UPDATE SET
    nome = EXCLUDED.nome,
    role = 'user',
    primeiro_acesso = TRUE,
    updated_at = NOW();

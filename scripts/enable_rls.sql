-- ============================================================================
-- SCRIPT PARA ATIVAR RLS (ROW LEVEL SECURITY) NO BANCO RO_BI_DATABASE
-- ============================================================================
-- Data: 15/12/2025
-- Descrição: Ativa RLS e cria políticas de segurança para todas as tabelas
-- ============================================================================

-- ============================================================================
-- 1. ATIVAR RLS NAS TABELAS
-- ============================================================================

-- Ativar RLS na tabela usuarios
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Ativar RLS na tabela municipios
ALTER TABLE municipios ENABLE ROW LEVEL SECURITY;

-- Ativar RLS na tabela paineis_bi
ALTER TABLE paineis_bi ENABLE ROW LEVEL SECURITY;

-- Ativar RLS na tabela acessos (se existir)
ALTER TABLE IF EXISTS acessos ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 2. POLÍTICAS PARA TABELA USUARIOS
-- ============================================================================

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Usuários podem ver seu próprio perfil" ON usuarios;
DROP POLICY IF EXISTS "Admins podem ver todos os usuários" ON usuarios;
DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio perfil" ON usuarios;
DROP POLICY IF EXISTS "Admins podem gerenciar usuários" ON usuarios;
DROP POLICY IF EXISTS "Permitir inserção de novos usuários" ON usuarios;

-- Política: Usuários podem ver seu próprio perfil
CREATE POLICY "Usuários podem ver seu próprio perfil" 
ON usuarios FOR SELECT 
USING (auth.uid()::text = id::text OR email = current_setting('request.jwt.claims', true)::json->>'email');

-- Política: Admins podem ver todos os usuários
CREATE POLICY "Admins podem ver todos os usuários" 
ON usuarios FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM usuarios 
    WHERE email = current_setting('request.jwt.claims', true)::json->>'email' 
    AND role = 'admin'
  )
);

-- Política: Usuários podem atualizar seu próprio perfil
CREATE POLICY "Usuários podem atualizar seu próprio perfil" 
ON usuarios FOR UPDATE 
USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Política: Admins podem gerenciar todos os usuários
CREATE POLICY "Admins podem gerenciar usuários" 
ON usuarios FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM usuarios 
    WHERE email = current_setting('request.jwt.claims', true)::json->>'email' 
    AND role = 'admin'
  )
);

-- Política: Permitir inserção de novos usuários (para registro)
CREATE POLICY "Permitir inserção de novos usuários" 
ON usuarios FOR INSERT 
WITH CHECK (true);

-- ============================================================================
-- 3. POLÍTICAS PARA TABELA MUNICIPIOS
-- ============================================================================

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Todos podem visualizar municípios" ON municipios;
DROP POLICY IF EXISTS "Admins podem gerenciar municípios" ON municipios;

-- Política: Todos os usuários autenticados podem visualizar municípios
CREATE POLICY "Todos podem visualizar municípios" 
ON municipios FOR SELECT 
USING (true);

-- Política: Apenas admins podem inserir/atualizar/deletar municípios
CREATE POLICY "Admins podem gerenciar municípios" 
ON municipios FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM usuarios 
    WHERE email = current_setting('request.jwt.claims', true)::json->>'email' 
    AND role = 'admin'
  )
);

-- ============================================================================
-- 4. POLÍTICAS PARA TABELA PAINEIS_BI
-- ============================================================================

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Todos podem visualizar painéis" ON paineis_bi;
DROP POLICY IF EXISTS "Admins podem gerenciar painéis" ON paineis_bi;

-- Política: Todos os usuários autenticados podem visualizar painéis
CREATE POLICY "Todos podem visualizar painéis" 
ON paineis_bi FOR SELECT 
USING (true);

-- Política: Apenas admins podem inserir/atualizar/deletar painéis
CREATE POLICY "Admins podem gerenciar painéis" 
ON paineis_bi FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM usuarios 
    WHERE email = current_setting('request.jwt.claims', true)::json->>'email' 
    AND role = 'admin'
  )
);

-- ============================================================================
-- 5. POLÍTICAS PARA TABELA ACESSOS (se existir)
-- ============================================================================

-- Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Usuários podem ver seus próprios acessos" ON acessos;
DROP POLICY IF EXISTS "Admins podem ver todos os acessos" ON acessos;
DROP POLICY IF EXISTS "Sistema pode registrar acessos" ON acessos;

-- Política: Usuários podem ver seus próprios acessos
CREATE POLICY "Usuários podem ver seus próprios acessos" 
ON acessos FOR SELECT 
USING (
  usuario_id IN (
    SELECT id FROM usuarios 
    WHERE email = current_setting('request.jwt.claims', true)::json->>'email'
  )
);

-- Política: Admins podem ver todos os acessos
CREATE POLICY "Admins podem ver todos os acessos" 
ON acessos FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM usuarios 
    WHERE email = current_setting('request.jwt.claims', true)::json->>'email' 
    AND role = 'admin'
  )
);

-- Política: Sistema pode registrar novos acessos
CREATE POLICY "Sistema pode registrar acessos" 
ON acessos FOR INSERT 
WITH CHECK (true);

-- ============================================================================
-- 6. CONCEDER PERMISSÕES PARA ACESSO ANÔNIMO (API KEY)
-- ============================================================================

-- Permitir acesso anônimo para leitura de municípios e painéis
GRANT SELECT ON municipios TO anon;
GRANT SELECT ON paineis_bi TO anon;

-- Permitir acesso anônimo para autenticação
GRANT SELECT, INSERT, UPDATE ON usuarios TO anon;

-- Permitir registro de acessos
GRANT INSERT ON acessos TO anon;

-- ============================================================================
-- 7. VERIFICAR STATUS DO RLS
-- ============================================================================

-- Consulta para verificar se RLS está ativo
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('usuarios', 'municipios', 'paineis_bi', 'acessos')
ORDER BY tablename;

-- Consulta para listar todas as políticas criadas
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ============================================================================
-- FIM DO SCRIPT
-- ============================================================================

-- IMPORTANTE:
-- Após executar este script, teste o acesso com diferentes usuários para
-- garantir que as políticas estão funcionando corretamente.
--
-- Para testar:
-- 1. Faça login como usuário comum e verifique se consegue ver apenas seus dados
-- 2. Faça login como admin e verifique se consegue ver todos os dados
-- 3. Tente acessar sem autenticação e verifique se apenas dados públicos são visíveis

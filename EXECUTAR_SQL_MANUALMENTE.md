# Como Executar o Script SQL no Supabase

**IMPORTANTE:** O sandbox não tem acesso direto ao banco de dados Supabase devido a restrições de rede. Você precisa executar o SQL manualmente.

---

## 📋 Opção 1: Via Supabase Dashboard (RECOMENDADO)

### Passo a Passo:

1. **Acesse o Supabase Dashboard**
   - URL: https://supabase.com/dashboard
   - Faça login com sua conta

2. **Selecione o Projeto**
   - Procure pelo projeto: `csuzmlajnhfauxqgczmu`
   - Ou pelo nome do projeto que você criou

3. **Abra o SQL Editor**
   - No menu lateral esquerdo, clique em **"SQL Editor"**
   - Ou acesse diretamente: https://supabase.com/dashboard/project/csuzmlajnhfauxqgczmu/sql

4. **Crie uma Nova Query**
   - Clique em **"New query"** ou **"+"**

5. **Cole o SQL**
   ```sql
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
   ```

6. **Execute**
   - Clique em **"Run"** ou pressione `Ctrl+Enter` (Windows/Linux) ou `Cmd+Enter` (Mac)

7. **Verifique o Resultado**
   - Você deve ver mensagens de sucesso:
     ```
     ALTER TABLE
     ALTER TABLE
     UPDATE 1
     UPDATE 1
     COMMENT
     COMMENT
     ```

---

## 📋 Opção 2: Via psql (Linha de Comando)

Se você tiver `psql` instalado localmente:

```bash
PGPASSWORD='@Data210308!' psql \
  -h db.csuzmlajnhfauxqgczmu.supabase.co \
  -U postgres \
  -d postgres \
  -p 5432 \
  -f scripts/add_admin_fields.sql
```

Ou copie e cole diretamente:

```bash
PGPASSWORD='@Data210308!' psql \
  -h db.csuzmlajnhfauxqgczmu.supabase.co \
  -U postgres \
  -d postgres \
  -p 5432 \
  -c "
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user';
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS primeiro_acesso BOOLEAN DEFAULT false;
UPDATE usuarios SET role = 'admin', primeiro_acesso = true WHERE email = 'brunohbotelhos@gmail.com';
UPDATE usuarios SET role = 'admin' WHERE email = 'admin@cimcero.ro.gov.br';
COMMENT ON COLUMN usuarios.role IS 'Função do usuário: admin, user';
COMMENT ON COLUMN usuarios.primeiro_acesso IS 'Flag para forçar troca de senha no primeiro acesso';
"
```

---

## 📋 Opção 3: Via Supabase CLI

Se você tiver o Supabase CLI instalado:

```bash
supabase db execute --project-ref csuzmlajnhfauxqgczmu --file scripts/add_admin_fields.sql
```

---

## ✅ Como Verificar se Funcionou

Após executar o SQL, verifique se as colunas foram criadas:

### Via SQL Editor:

```sql
SELECT 
  email, 
  nome, 
  role, 
  primeiro_acesso, 
  ativo 
FROM usuarios;
```

### Resultado Esperado:

| email | nome | role | primeiro_acesso | ativo |
|-------|------|------|-----------------|-------|
| admin@cimcero.ro.gov.br | Administrador CIMCERO | admin | false | true |
| romulo.azevedo@cimcero.ro.gov.br | Rômulo Azevedo | user | false | true |
| brunohbotelhos@gmail.com | Bruno Henrique Botelho dos Santos | admin | true | true |

---

## 🔍 Troubleshooting

### Erro: "column already exists"

**Solução:** Tudo bem! Isso significa que a coluna já foi criada antes. Continue com os próximos comandos.

### Erro: "permission denied"

**Solução:** Você precisa estar logado como usuário `postgres` (superuser). Verifique suas credenciais.

### Erro: "relation usuarios does not exist"

**Solução:** Verifique se você está conectado ao banco de dados correto. A tabela `usuarios` deve existir.

---

## 📞 Após Executar

1. ✅ As colunas `role` e `primeiro_acesso` estarão criadas
2. ✅ Bruno terá `role = 'admin'` e `primeiro_acesso = true`
3. ✅ Admin CIMCERO terá `role = 'admin'`
4. ✅ O botão "🔧 Admin" aparecerá para administradores
5. ✅ Bruno será forçado a trocar a senha no primeiro login

---

## 🚀 Próximo Passo

Após executar o SQL com sucesso, teste o sistema:

1. Acesse: https://www.dataro-it.com.br/paineis/login
2. Faça login como Bruno:
   - Email: brunohbotelhos@gmail.com
   - Senha: 123456
3. O modal de troca de senha deve aparecer automaticamente
4. Após trocar a senha e fazer login novamente, o botão "🔧 Admin" deve estar visível

---

**Arquivo SQL:** `/home/ubuntu/web-dataro/scripts/add_admin_fields.sql`

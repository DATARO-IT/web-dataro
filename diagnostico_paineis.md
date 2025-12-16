# Diagnóstico - Painéis Não Carregados

**Data:** 16/12/2025  
**Hora:** 02:25 UTC  
**Problema:** Painéis não aparecem no Dashboard

---

## 🔍 Investigação

### ✅ Painéis Cadastrados no Banco

**Status:** ✅ **4 PAINÉIS ATIVOS NO BANCO**

| ID | Município | Título | Status |
|----|-----------|--------|--------|
| 1 | Alto Paraíso (ID: 3) | Inteligência Territorial de Alto Paraíso | ✅ ativo |
| 2 | Alto Alegre dos Parecis (ID: 2) | Inteligência Territorial de Alto Alegre dos Parecis | ✅ ativo |
| 3 | Costa Marques (ID: 16) | Painel de Costa Marques | ✅ ativo |
| 4 | Ji-Paraná (ID: 22) | Inteligência Territorial de Ji-Paraná | ✅ ativo |

**Conclusão:** ✅ Os painéis ESTÃO no banco de dados

---

### ✅ Consulta SQL do Dashboard

**Código em `Dashboard.jsx` (linhas 37-48):**
```javascript
const { data, error } = await supabase
  .from('municipios')
  .select(`
    *,
    paineis_bi (
      id,
      titulo,
      url_powerbi,
      status
    )
  `)
  .order('nome', { ascending: true });
```

**Conclusão:** ✅ A consulta está CORRETA e faz JOIN com paineis_bi

---

### ✅ Lógica de Renderização

**Código em `Dashboard.jsx` (linhas 187-188):**
```javascript
const hasPainel = municipio.paineis_bi && municipio.paineis_bi.length > 0;
const painel = hasPainel ? municipio.paineis_bi[0] : null;
```

**Conclusão:** ✅ A lógica está CORRETA

---

## 🎯 Possíveis Causas

### 1. ⚠️ Você não fez login

**Sintoma:** Se você não está logado, o Dashboard redireciona para `/paineis/login`

**Solução:** Fazer login com uma das contas:
- dataroadmin / @D4taR0x1
- admin@cimcero.ro.gov.br / 123456
- brunohbotelhos@gmail.com / 123456

---

### 2. ⚠️ Erro na consulta do Supabase

**Sintoma:** A consulta pode estar falhando silenciosamente

**Verificação:** Checar console do navegador (F12) para erros

**Possíveis erros:**
- Permissões RLS (Row Level Security) bloqueando
- API Key expirada
- CORS bloqueando

---

### 3. ⚠️ Estrutura de dados incorreta

**Sintoma:** `paineis_bi` pode estar vindo como `null` ou `undefined`

**Causa:** Relacionamento no Supabase pode não estar configurado

**Verificação:** Checar se a foreign key `municipio_id` está correta

---

### 4. ⚠️ Deploy não concluído

**Sintoma:** Código antigo ainda em produção

**Causa:** Vercel pode não ter completado o deploy

**Solução:** Aguardar alguns minutos e limpar cache

---

## 🔧 Como Verificar

### Passo 1: Fazer Login

1. Acesse: https://www.dataro-it.com.br/paineis/login
2. Use: dataroadmin / @D4taR0x1
3. Clique em "Entrar"

### Passo 2: Abrir Console do Navegador

1. Pressione F12
2. Vá na aba "Console"
3. Procure por erros em vermelho

### Passo 3: Verificar Network

1. Pressione F12
2. Vá na aba "Network"
3. Recarregue a página (F5)
4. Procure pela requisição para `/rest/v1/municipios`
5. Clique nela e veja a resposta

### Passo 4: Verificar Dados

1. Na resposta da requisição
2. Procure por um município (ex: "JI-PARANÁ")
3. Veja se tem `paineis_bi: [...]` com dados

---

## 📊 Exemplo de Resposta Esperada

```json
{
  "id": 22,
  "nome": "JI-PARANÁ",
  "prefeito": "A definir",
  "telefone": null,
  "email": null,
  "endereco": null,
  "ativo": true,
  "data_criacao": "2025-12-15T...",
  "data_atualizacao": "2025-12-15T...",
  "paineis_bi": [
    {
      "id": 4,
      "titulo": "Inteligência Territorial de Ji-Paraná",
      "url_powerbi": "https://app.powerbi.com/view?r=...",
      "status": "ativo"
    }
  ]
}
```

Se `paineis_bi` estiver **vazio** `[]` ou **null**, o problema está na consulta ou permissões.

---

## 🛠️ Soluções Possíveis

### Solução 1: Verificar Permissões RLS

**Problema:** Row Level Security pode estar bloqueando

**Como verificar:**
1. Acesse Supabase Dashboard
2. Vá em "Authentication" > "Policies"
3. Verifique se há policies na tabela `paineis_bi`
4. Se houver, desabilite temporariamente para testar

**SQL para desabilitar RLS:**
```sql
ALTER TABLE paineis_bi DISABLE ROW LEVEL SECURITY;
```

---

### Solução 2: Verificar Foreign Key

**Problema:** Relacionamento pode não estar configurado

**Como verificar:**
```sql
SELECT 
  m.id as municipio_id,
  m.nome,
  p.id as painel_id,
  p.titulo
FROM municipios m
LEFT JOIN paineis_bi p ON p.municipio_id = m.id
WHERE m.id IN (2, 3, 16, 22);
```

**Resultado esperado:**
- 4 linhas com dados de painéis
- Se `painel_id` for NULL, o relacionamento está quebrado

---

### Solução 3: Recriar Painéis

**Se nada funcionar, recriar os painéis:**

```javascript
// Deletar painéis existentes
await supabase.from('paineis_bi').delete().neq('id', 0);

// Recriar painéis
const paineis = [
  {
    municipio_id: 22, // Ji-Paraná
    titulo: "Inteligência Territorial de Ji-Paraná",
    url_powerbi: "https://app.powerbi.com/view?r=eyJrIjoiMzA3MGJiMTMtYjVhYy00MmE4LTgyNzktMzdjZTJlNjVjMjNmIiwidCI6IjliZDQ3NzVkLTk5OWYtNGM4Ny1iM2NmLWJmZjA0YmI0YTFlNCJ9&pageName=1d498ca6093563e54074",
    embed_url: "https://app.powerbi.com/view?r=eyJrIjoiMzA3MGJiMTMtYjVhYy00MmE4LTgyNzktMzdjZTJlNjVjMjNmIiwidCI6IjliZDQ3NzVkLTk5OWYtNGM4Ny1iM2NmLWJmZjA0YmI0YTFlNCJ9&pageName=1d498ca6093563e54074",
    status: "ativo"
  },
  // ... outros painéis
];

for (const painel of paineis) {
  await supabase.from('paineis_bi').insert(painel);
}
```

---

## 📝 Checklist de Diagnóstico

- [ ] Fez login no sistema?
- [ ] Abriu o console do navegador (F12)?
- [ ] Verificou se há erros no console?
- [ ] Verificou a aba Network?
- [ ] Viu a resposta da requisição `/municipios`?
- [ ] A resposta tem `paineis_bi` com dados?
- [ ] Verificou permissões RLS no Supabase?
- [ ] Verificou foreign keys no banco?
- [ ] Aguardou deploy completar (5-10 min)?
- [ ] Limpou cache do navegador (Ctrl+Shift+R)?

---

## 🎯 Próximos Passos

1. **Fazer login** no sistema
2. **Abrir console** do navegador (F12)
3. **Verificar** se há erros
4. **Compartilhar** screenshot do console
5. **Verificar** resposta da API no Network

---

## 📧 Informações para Suporte

Se o problema persistir, forneça:

1. **Screenshot do console** (F12 > Console)
2. **Screenshot do Network** (F12 > Network > municipios)
3. **Usuário usado** para login
4. **Navegador e versão** (Chrome, Firefox, etc.)
5. **Sistema operacional** (Windows, Mac, Linux)

---

**Status Atual:**
- ✅ Painéis no banco: 4
- ✅ Código correto: Sim
- ⚠️ Problema: A investigar
- 🔍 Próximo passo: Verificar login e console

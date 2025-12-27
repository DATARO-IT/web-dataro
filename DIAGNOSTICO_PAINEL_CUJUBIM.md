# 🔍 Diagnóstico do Painel de Cujubim

## Teste 1: Verificar no Console do Navegador

Abra o DevTools (F12) no site https://www.dataro-it.com.br/paineis/dashboard e execute:

```javascript
// Teste de conexão e busca do painel
const supabaseUrl = 'https://csuzmlajnhfauxqgczmu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzdXptbGFqbmhmYXV4cWdjem11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MzExMzcsImV4cCI6MjA4MTMwNzEzN30.eATRbvz2klesZnV3iGBk6sgrvZMbk_1YscW5oi9etfA';

fetch(`${supabaseUrl}/rest/v1/municipios?nome=eq.Cujubim&select=*,paineis_bi(*)`, {
  headers: {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`
  }
})
.then(r => r.json())
.then(data => {
  console.log('=== RESULTADO CUJUBIM ===');
  console.log('Município:', data);
  if (data[0]?.paineis_bi) {
    console.log('✅ TEM PAINEL:', data[0].paineis_bi);
  } else {
    console.log('❌ SEM PAINEL');
  }
});
```

## Teste 2: Verificar no Supabase Dashboard

Execute este SQL no Supabase SQL Editor:

```sql
-- Verificação completa
SELECT 
    m.id,
    m.nome,
    COUNT(p.id) as total_paineis,
    STRING_AGG(p.status, ', ') as status_paineis,
    STRING_AGG(p.titulo, ' | ') as titulos
FROM municipios m
LEFT JOIN paineis_bi p ON p.municipio_id = m.id
WHERE m.nome = 'Cujubim'
GROUP BY m.id, m.nome;

-- Se retornar 0 paineis, o problema está na inserção
-- Se retornar 1 painel mas status != 'ativo', precisa atualizar o status
```

## Teste 3: Verificar se existe algum filtro bloqueando

```sql
-- Ver TODOS os painéis de Cujubim (sem filtro de status)
SELECT 
    p.*,
    m.nome as municipio
FROM paineis_bi p
JOIN municipios m ON m.id = p.municipio_id
WHERE m.nome = 'Cujubim';
```

## Possíveis Problemas e Soluções

### Problema 1: Painel existe mas status não é 'ativo'
**Solução:**
```sql
UPDATE paineis_bi 
SET status = 'ativo' 
WHERE municipio_id = (SELECT id FROM municipios WHERE nome = 'Cujubim');
```

### Problema 2: Painel não foi inserido
**Solução:** Re-executar o INSERT de `scripts/adicionar_painel_cujubim.sql`

### Problema 3: Nome do município está diferente
**Solução:**
```sql
-- Ver nome exato
SELECT id, nome FROM municipios WHERE nome ILIKE '%cujubim%';

-- Se o nome estiver diferente, ajustar
UPDATE paineis_bi 
SET municipio_id = (SELECT id FROM municipios WHERE nome ILIKE '%cujubim%')
WHERE titulo LIKE '%Cujubim%';
```

### Problema 4: RLS (Row Level Security) bloqueando
**Solução:**
```sql
-- Verificar políticas RLS
SELECT * FROM pg_policies WHERE tablename = 'paineis_bi';

-- Se necessário, desabilitar temporariamente para teste
ALTER TABLE paineis_bi DISABLE ROW LEVEL SECURITY;
```

## Resultado Esperado

Após executar os testes, você deve ver:

1. **No console do navegador:** Objeto do município com array `paineis_bi` contendo 1 item
2. **No SQL:** Linha mostrando 1 painel com status 'ativo'
3. **No dashboard:** Card de Cujubim mostrando "Disponível ✅"

## Debug do Card

Se o card ainda não mostrar como disponível, adicione esta linha no console para ver todos os municípios carregados:

```javascript
// No console do navegador, após a página carregar
console.log('Todos os municípios:', window.location.pathname);
// Então na aba React DevTools, inspecionar o componente Dashboard
// e ver o estado 'municipios'
```

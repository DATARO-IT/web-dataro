# Integração com Power BI - Painéis CIMCERO

## 📊 Formato do Painel de Exemplo

O painel de exemplo fornecido pelo Bruno (DATA-RO) está disponível em:
- **URL:** https://app.powerbi.com/view?r=eyJrIjoiNzY5NWUxNWEtNmFkMy00MzQzLTliODgtZmE3Y2I2NzVhYjEwIiwidCI6IjliZDQ3NzVkLTk5OWYtNGM4Ny1iM2NmLWJmZjA0YmI0YTFlNCJ9
- **Título:** PAINEL ECONÔMICO DO ESTADO DE RONDÔNIA
- **Descrição:** Dados sobre a econômica do estado
- **Formato:** Power BI Report com 7 páginas

## 🔗 Como Adicionar Painéis ao Sistema

### 1. Obter o Link do Painel

Quando o Bruno fornecer um novo painel de BI, você receberá uma URL no formato:
```
https://app.powerbi.com/view?r=CODIGO_DO_PAINEL
```

### 2. Adicionar ao Banco de Dados

Use o seguinte script Python para adicionar o painel ao município correspondente:

```python
from supabase import create_client, Client

supabase_url = "https://csuzmlajnhfauxqgczmu.supabase.co"
supabase_key = "SUA_CHAVE_AQUI"
supabase = create_client(supabase_url, supabase_key)

# Exemplo: Adicionar painel para ARIQUEMES (id = 5)
painel_data = {
    'municipio_id': 5,  # ID do município no banco
    'titulo': 'Painel Econômico de Ariquemes',
    'descricao': 'Dados econômicos e sociais do município',
    'url_powerbi': 'https://app.powerbi.com/view?r=CODIGO_DO_PAINEL',
    'embed_url': 'https://app.powerbi.com/view?r=CODIGO_DO_PAINEL',  # Mesma URL para embed
    'status': 'ativo'
}

response = supabase.table('paineis_bi').insert(painel_data).execute()
print("Painel adicionado com sucesso!")
```

### 3. Formato de Incorporação (Embed)

A plataforma já está preparada para exibir painéis do Power BI usando iframe. O componente `MunicipioPainel.jsx` renderiza automaticamente o painel quando:

- `embed_url` está preenchido → Exibe o painel em iframe
- Apenas `url_powerbi` está preenchido → Exibe link para abrir em nova janela
- Nenhum dos dois → Exibe mensagem "Painel em desenvolvimento"

## 📝 Script de Exemplo para Adicionar Múltiplos Painéis

```python
from supabase import create_client, Client

supabase_url = "https://csuzmlajnhfauxqgczmu.supabase.co"
supabase_key = "SUA_CHAVE_AQUI"
supabase = create_client(supabase_url, supabase_key)

# Lista de painéis a serem adicionados
paineis = [
    {
        'municipio_id': 5,  # ARIQUEMES
        'titulo': 'Painel Econômico de Ariquemes',
        'descricao': 'Indicadores econômicos e sociais',
        'url_powerbi': 'https://app.powerbi.com/view?r=CODIGO_1',
        'embed_url': 'https://app.powerbi.com/view?r=CODIGO_1',
        'status': 'ativo'
    },
    {
        'municipio_id': 22,  # JI-PARANÁ
        'titulo': 'Painel Econômico de Ji-Paraná',
        'descricao': 'Indicadores econômicos e sociais',
        'url_powerbi': 'https://app.powerbi.com/view?r=CODIGO_2',
        'embed_url': 'https://app.powerbi.com/view?r=CODIGO_2',
        'status': 'ativo'
    }
]

for painel in paineis:
    try:
        response = supabase.table('paineis_bi').insert(painel).execute()
        print(f"✅ Painel adicionado: {painel['titulo']}")
    except Exception as e:
        print(f"❌ Erro ao adicionar {painel['titulo']}: {e}")
```

## 🔍 Consultar Municípios Disponíveis

Para ver a lista completa de municípios e seus IDs:

```python
from supabase import create_client, Client

supabase_url = "https://csuzmlajnhfauxqgczmu.supabase.co"
supabase_key = "SUA_CHAVE_AQUI"
supabase = create_client(supabase_url, supabase_key)

response = supabase.table('municipios').select('id, nome').order('nome').execute()

for municipio in response.data:
    print(f"ID: {municipio['id']} - {municipio['nome']}")
```

## 🚀 Atualizar Painel Existente

Para atualizar a URL de um painel já cadastrado:

```python
from supabase import create_client, Client

supabase_url = "https://csuzmlajnhfauxqgczmu.supabase.co"
supabase_key = "SUA_CHAVE_AQUI"
supabase = create_client(supabase_url, supabase_key)

# Atualizar painel do município ID 5
response = supabase.table('paineis_bi').update({
    'url_powerbi': 'NOVA_URL',
    'embed_url': 'NOVA_URL',
    'status': 'ativo'
}).eq('municipio_id', 5).execute()

print("Painel atualizado!")
```

## ⚠️ Observações Importantes

1. **Um painel por município:** A estrutura atual permite apenas um painel por município (constraint UNIQUE na tabela)
2. **Status do painel:** Use 'ativo', 'pendente' ou 'inativo'
3. **URLs públicas:** Certifique-se de que as URLs do Power BI são públicas e não requerem autenticação
4. **Responsividade:** Os painéis são exibidos em iframe responsivo que ocupa toda a área disponível

## 📞 Contato

Para dúvidas sobre a integração, entre em contato com a equipe DATA-RO.

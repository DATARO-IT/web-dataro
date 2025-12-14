# 🗺️ Sistema de Painéis de BI - CIMCERO

Sistema de gerenciamento e visualização de painéis de Business Intelligence para os 48 municípios do CIMCERO (Consórcio Público Intermunicipal da Região Centro Leste de Rondônia).

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Usar](#como-usar)
- [Deploy no Vercel](#deploy-no-vercel)
- [Gerenciamento de Painéis](#gerenciamento-de-painéis)
- [Credenciais de Teste](#credenciais-de-teste)

## 🎯 Visão Geral

O sistema permite que usuários autenticados visualizem painéis de Power BI específicos para cada um dos 48 municípios do CIMCERO. A plataforma inclui:

- ✅ Sistema de autenticação seguro
- ✅ Dashboard com lista de todos os municípios
- ✅ Visualização de painéis individuais por município
- ✅ Integração com Power BI Embedded
- ✅ Interface responsiva e moderna
- ✅ Gerenciamento de usuários e permissões

## 🛠️ Tecnologias

### Frontend
- **React 19** - Biblioteca JavaScript para interfaces
- **React Router DOM** - Roteamento de páginas
- **Vite** - Build tool e dev server
- **CSS3** - Estilização moderna

### Backend/Database
- **Supabase** - Backend as a Service
  - PostgreSQL Database
  - Row Level Security (RLS)
  - API REST automática

### Integração
- **Power BI** - Painéis de Business Intelligence
- **Vercel** - Hospedagem e deploy

## 🗄️ Estrutura do Banco de Dados

### Tabelas

#### `municipios`
Armazena informações dos 48 municípios do CIMCERO.

```sql
- id (SERIAL PRIMARY KEY)
- nome (VARCHAR 255, UNIQUE)
- cnpj (VARCHAR 18, UNIQUE)
- prefeito (VARCHAR 255)
- telefone (VARCHAR 20)
- email (VARCHAR 255)
- endereco (TEXT)
- lei (VARCHAR 50)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### `paineis_bi`
Armazena os painéis de BI vinculados a cada município.

```sql
- id (SERIAL PRIMARY KEY)
- municipio_id (INTEGER, FK → municipios.id)
- titulo (VARCHAR 255)
- descricao (TEXT)
- url_powerbi (TEXT)
- embed_url (TEXT)
- status (VARCHAR 50) - 'pendente', 'ativo', 'inativo'
- data_criacao (TIMESTAMP)
- data_atualizacao (TIMESTAMP)
- UNIQUE(municipio_id)
```

#### `usuarios`
Gerencia usuários com acesso ao sistema.

```sql
- id (SERIAL PRIMARY KEY)
- email (VARCHAR 255, UNIQUE)
- senha_hash (VARCHAR 255)
- nome (VARCHAR 255)
- ativo (BOOLEAN)
- data_criacao (TIMESTAMP)
- data_atualizacao (TIMESTAMP)
```

#### `acessos`
Controla permissões de acesso por usuário e município.

```sql
- id (SERIAL PRIMARY KEY)
- usuario_id (INTEGER, FK → usuarios.id)
- municipio_id (INTEGER, FK → municipios.id)
- tipo_acesso (VARCHAR 50) - 'visualizar', 'editar', 'admin'
- data_concessao (TIMESTAMP)
- data_expiracao (TIMESTAMP)
- UNIQUE(usuario_id, municipio_id)
```

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta no Supabase
- Conta no Vercel (para deploy)

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/wernnon/web-dataro.git
cd web-dataro
git checkout feature/paineis-bi-cimcero
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Edite o arquivo `src/utils/supabaseClient.js` com suas credenciais do Supabase:

```javascript
const supabaseUrl = 'SUA_URL_SUPABASE';
const supabaseAnonKey = 'SUA_CHAVE_SUPABASE';
```

4. **Execute o projeto localmente**
```bash
npm run dev
```

Acesse: http://localhost:5173

## ⚙️ Configuração

### Supabase

1. Acesse https://app.supabase.com/
2. Crie um novo projeto ou use o existente
3. Execute o script SQL em `create_database_schema.sql` no SQL Editor
4. Copie a URL e a chave anon do projeto
5. Atualize `src/utils/supabaseClient.js`

### Importar Municípios

Os 48 municípios já foram importados. Para reimportar:

```bash
python3 << 'EOF'
from supabase import create_client
import json

supabase = create_client('SUA_URL', 'SUA_CHAVE')

with open('municipios_cimcero.json', 'r') as f:
    municipios = json.load(f)

for m in municipios:
    dados = {k: v for k, v in m.items() if k not in ['id', 'painel_bi']}
    supabase.table('municipios').insert(dados).execute()
EOF
```

## 🚀 Como Usar

### Rotas Disponíveis

- `/` - Página inicial do site DATA-RO
- `/services` - Página de serviços
- `/paineis/login` - Login para área restrita
- `/paineis/dashboard` - Dashboard com lista de municípios (protegido)
- `/paineis/municipio/:id` - Visualização de painel individual (protegido)

### Fluxo de Uso

1. Acesse `/paineis/login`
2. Faça login com credenciais válidas
3. Navegue pelo dashboard de municípios
4. Clique em um município com painel disponível
5. Visualize o painel de BI em tela cheia

## 🌐 Deploy no Vercel

### Via GitHub

1. **Faça merge do branch**
```bash
git checkout main
git merge feature/paineis-bi-cimcero
git push origin main
```

2. **No Vercel Dashboard**
   - Acesse https://vercel.com/
   - Selecione o projeto `web-dataro`
   - O deploy será automático após o push

### Via CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Variáveis de Ambiente no Vercel

Não são necessárias variáveis de ambiente pois as credenciais do Supabase estão no código (chave pública anon).

## 📊 Gerenciamento de Painéis

### Adicionar Novo Painel

```python
from supabase import create_client

supabase = create_client('SUA_URL', 'SUA_CHAVE')

painel = {
    'municipio_id': 5,  # ID do município
    'titulo': 'Painel Econômico',
    'descricao': 'Indicadores econômicos do município',
    'url_powerbi': 'https://app.powerbi.com/view?r=CODIGO',
    'embed_url': 'https://app.powerbi.com/view?r=CODIGO',
    'status': 'ativo'
}

supabase.table('paineis_bi').insert(painel).execute()
```

### Atualizar Painel

```python
supabase.table('paineis_bi').update({
    'url_powerbi': 'NOVA_URL',
    'status': 'ativo'
}).eq('municipio_id', 5).execute()
```

### Listar Painéis

```python
response = supabase.table('paineis_bi').select('*, municipios(nome)').execute()
for p in response.data:
    print(f"{p['municipios']['nome']}: {p['titulo']} - {p['status']}")
```

## 🔐 Credenciais de Teste

**Usuário Administrador:**
- **E-mail:** admin@cimcero.ro.gov.br
- **Senha:** cimcero2024

### Criar Novos Usuários

```python
from supabase import create_client

supabase = create_client('SUA_URL', 'SUA_CHAVE')

usuario = {
    'email': 'usuario@exemplo.com',
    'senha_hash': 'senha123',  # Em produção, use bcrypt
    'nome': 'Nome do Usuário',
    'ativo': True
}

supabase.table('usuarios').insert(usuario).execute()
```

## 📁 Estrutura de Arquivos

```
src/
├── components/
│   ├── header/          # Cabeçalho do site
│   ├── footer/          # Rodapé do site
│   └── paineis/         # Componentes específicos de painéis
├── contexts/
│   └── AuthContext.jsx  # Contexto de autenticação
├── pages/
│   ├── homePage/        # Página inicial
│   ├── ServicesPage/    # Página de serviços
│   └── PaineisPage/     # Páginas de painéis
│       ├── Login.jsx
│       ├── Dashboard.jsx
│       └── MunicipioPainel.jsx
├── utils/
│   └── supabaseClient.js # Cliente Supabase
└── App.jsx              # Componente principal com rotas
```

## 🔧 Manutenção

### Backup do Banco de Dados

No Supabase Dashboard:
1. Vá em Database → Backups
2. Configure backups automáticos
3. Faça download manual quando necessário

### Monitoramento

- **Vercel Analytics:** Ativado automaticamente
- **Supabase Logs:** Acesse via Dashboard → Logs
- **Erros:** Monitore via Console do navegador

## 📞 Suporte

Para dúvidas ou problemas:
- **E-mail:** contato@dataro-it.com.br
- **GitHub Issues:** https://github.com/wernnon/web-dataro/issues

## 📄 Licença

© 2024 DATA-RO - Todos os direitos reservados

---

**Desenvolvido por:** Manus AI  
**Data:** Dezembro 2024  
**Versão:** 1.0.0

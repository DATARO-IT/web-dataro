
# Copilot Instructions for DATA-RO (web-dataro)

## 🎯 Project Purpose
BI dashboard platform for 48 CIMCERO municipalities in Rondônia. Combines institutional website with authenticated Power BI panel viewer and AI-powered federal data assistant.

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend:** React 19 + Vite + React Router (SPA)
- **Backend:** Supabase (PostgreSQL + Auth)
- **Deploy:** Vercel (auto-deploy from `main` branch)
- **Integrations:** Power BI Embedded, OpenAI API, Portal da Transparência API

### Directory Structure
```
src/
├── App.jsx              # Root router with PublicLayout & ProtectedRoute wrappers
├── components/          # Reusable UI (Header, Footer, AIAssistant, AdminPanel, etc.)
├── pages/               # Page containers (homePage/, PaineisPage/, ServicesPage/)
├── contexts/            # React Context (AuthContext.jsx, ThemeContext.jsx)
├── services/            # API/data logic (aiService, federalDataService, supabaseTransferenciasService)
├── utils/               # Helpers (supabaseClient.js, bandeirasMap.js - static imports for Vite)
└── assets/              # Images, bandeiras (municipality flags)
scripts/                 # SQL scripts for Supabase (run via Supabase Dashboard)
```

## 🔐 Authentication & Authorization

**Flow:** Custom auth system (not Supabase Auth) - passwords stored as plaintext in `usuarios.senha_hash` (legacy naming, no bcrypt).

**Implementation:**
- `AuthContext.jsx` manages login/logout, stores user in `localStorage` as `paineis_user`
- `ProtectedRoute` in `App.jsx` checks `user` from context, redirects to `/paineis/login` if null
- Role-based access: `user.role` in `['user', 'admin', 'superadmin']`
  - Admin/superadmin see Admin dropdown in Dashboard (`Dashboard.jsx` line 172)
  - Conditional rendering: `{(user?.role === 'admin' || user?.role === 'superadmin') && ...}`

**Key Files:**
- Login: `src/pages/PaineisPage/Login.jsx`
- Context: `src/contexts/AuthContext.jsx`
- Protected Routes: Wrap children with `<ProtectedRoute>` in `App.jsx`

## 🗄️ Database Schema (Supabase)

**Core Tables:**
- `municipios` - 48 CIMCERO municipalities (id, nome, cnpj, prefeito, etc.)
- `paineis_bi` - Power BI panels (municipio_id FK, titulo, embed_url, status) - **UNIQUE constraint on municipio_id** (one panel per municipality)
- `usuarios` - Users (email, senha_hash, nome, ativo, role, primeiro_acesso)
- `acessos` - User-municipality permissions (usuario_id, municipio_id)

**SQL Workflow:**
1. Create SQL scripts in `/scripts/`
2. Execute via Supabase Dashboard SQL Editor (sandbox can't connect directly)
3. See `EXECUTAR_SQL_MANUALMENTE.md` for step-by-step

**Connection:**
- Credentials in `src/utils/supabaseClient.js` (public anon key, safe to commit)

## 📊 Power BI Integration

**Key Constraint:** One panel per municipality enforced by DB `UNIQUE(municipio_id)` on `paineis_bi`.

**Display Logic (MunicipioPainel.jsx):**
1. If `embed_url` exists → Render iframe with panel
2. Else if `url_powerbi` exists → Show "Abrir Painel Externo" button
3. Else → Show "Painel em desenvolvimento"

**Adding Panels:**
- Use Python scripts in `/scripts/` (e.g., `adicionar_paineis_pendentes.py`)
- Or SQL: `INSERT INTO paineis_bi (municipio_id, titulo, embed_url, ...) VALUES (...)`
- See `POWER_BI_INTEGRATION.md` for detailed workflow

## 🤖 AI Assistant

**Architecture:**
- UI: `src/components/AIAssistant/` (chat interface)
- Logic: `src/services/aiService.js`
  - Intent detection: editais, comparacao, ministerio, transferencias, indicadores
  - Data sources: Supabase, federal APIs (Portal Transparência, TransfereGov)
  - OpenAI integration: `VITE_OPENAI_API_KEY` env var

**Example Intent Flow:**
```javascript
// aiService.js processarConsulta()
query: "Quais editais estão disponíveis?"
→ detectarIntencao() → 'editais'
→ buscarInformacoesEditais() → calls federalDataService.buscarEditais()
→ formats response with markdown
```

## 🎨 Component Patterns

**CSS:** Each component has co-located `.css` file (e.g., `Header.jsx` + `Header.css`). No global styles except `App.css`, `index.css`.

**Icons:** Use `phosphor-react` or `react-icons`:
```jsx
import { CaretDown } from 'phosphor-react';
<CaretDown size={20} />
```

**Images (Bandeiras):**
- Municipality flags in `src/assets/bandeiras/`
- `bandeirasMap.js` uses **static imports** (required by Vite for bundling)
- Usage: `import { getBandeiraUrl } from '../../utils/bandeirasMap'`

**Responsive Design:**
- CSS Grid/Flexbox + media queries
- CSS variables for colors/spacing (defined in component `.css`)

## ⚙️ Developer Workflows

**Install & Run:**
```bash
npm install
npm run dev    # Vite dev server on port 5173
npm run build  # Production build
npm run preview
```

**Deploy:**
- Push to `main` → Vercel auto-deploys
- Manual: `vercel --prod`
- Rewrites: `vercel.json` ensures SPA routing (`/(.*) → /index.html`)

**Environment Variables:**
- `VITE_OPENAI_API_KEY` - OpenAI API for AI assistant
- `VITE_PORTAL_TRANSPARENCIA_API_KEY` - Portal da Transparência (optional, has fallback)
- No .env required for deploy (public Supabase keys in code)

## 🚨 Critical Gotchas

1. **Bandeiras imports:** Must be static imports in `bandeirasMap.js` (Vite can't bundle dynamic paths)
2. **Password handling:** Currently plaintext comparison in `AuthContext.jsx` login function (no bcrypt despite column name `senha_hash`)
3. **Power BI uniqueness:** Database enforces one panel per municipality - handle conflicts when updating
4. **Supabase SQL:** No direct DB access from sandbox - always use Supabase Dashboard
5. **Role checks:** Use `user?.role === 'admin' || user?.role === 'superadmin'` (not just `user?.role === 'admin'`)

## 📝 Common Tasks

**Add a new service to homepage:**
1. Create component in `src/components/serviceItem/`
2. Register in `src/pages/ServicesPage/index.jsx` services array

**Add a new municipality panel:**
1. Get Power BI public URL from Bruno (DATA-RO team)
2. Run SQL via Supabase Dashboard:
   ```sql
   INSERT INTO paineis_bi (municipio_id, titulo, embed_url, status)
   VALUES (5, 'Painel Ariquemes', 'https://app.powerbi.com/view?r=...', 'ativo');
   ```

**Create new admin user:**
1. Script example in `/scripts/create-user-romulo.sql`
2. Update `role` to 'admin' and set `primeiro_acesso = true` for password change flow

## 📚 Reference Documentation
- Architecture: `README.md`, `PAINEIS_BI_README.md`
- Power BI workflow: `POWER_BI_INTEGRATION.md`
- Database changes: `EXECUTAR_SQL_MANUALMENTE.md`
- Scripts: `/scripts/` (SQL, Python)

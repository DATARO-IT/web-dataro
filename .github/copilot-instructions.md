
# Copilot Instructions for DATA-RO (web-dataro)

## 🚀 Project Overview
- **Purpose:** BI dashboards and resource/resource management for municipalities in Rondônia (CIMCERO)
- **Stack:** React 19 + Vite (frontend), Supabase (backend), Power BI (BI integration), Vercel (deploy)
- **Key Features:** Modular React components, AI assistant, Power BI panel embedding, Supabase integration, responsive UI

## 🏗️ Architecture & Structure
- **SPA** with React Router; all navigation in `src/App.jsx`
- **src/components/**: Modular UI (e.g., `AIAssistant/`, `header/`, `footer/`, `heroCarousel/`, `serviceItem/`, `AdminPanel/`)
- **src/pages/**: Page containers (`homePage/`, `PaineisPage/`, `ServicesPage/`)
- **src/services/**: Data/API logic (e.g., `aiService.js` for OpenAI, `federalDataService.js` for editais/convenios)
- **src/contexts/**: React context providers (`AuthContext.jsx`, `ThemeContext.jsx`)
- **src/utils/**: Utility modules (e.g., `supabaseClient.js` for DB, `bandeirasMap.js`)
- **public/**: Static assets (images, icons)

## 🧩 Patterns & Conventions
- **Component CSS:** Each component/page has its own `.css` file (modular, not global)
- **Functional components & hooks** only; prefer prop-driven, compositional design
- **Icons:** Use `phosphor-react` or `react-icons`
- **Responsiveness:** Use CSS flex/grid, media queries, and variables for colors/spacings
- **Admin/BI:** AdminPanel and UserManagement are only visible to users with `admin` or `superadmin` roles

## 🔗 Integrations & Data Flow
- **Supabase:**
  - Credentials in `src/utils/supabaseClient.js` (public anon key)
  - SQL/schema changes: see `/scripts/` and `EXECUTAR_SQL_MANUALMENTE.md`
  - DB tables: `municipios`, `paineis_bi`, `usuarios`, `acessos` (see `PAINEIS_BI_README.md`)
- **Power BI:**
  - One panel per municipality (constraint enforced)
  - Panels embedded via iframe in `MunicipioPainel.jsx` if `embed_url` is set; fallback to link or "em desenvolvimento" message
  - URLs must be public (see `POWER_BI_INTEGRATION.md`)
- **AI Assistant:**
  - UI in `src/components/AIAssistant/`, logic in `src/services/aiService.js`
  - Uses OpenAI API (key in Vite env), context-aware prompts, intent detection for editais, comparações, ministérios, transferências, indicadores
  - Can cross-reference Supabase data and federal APIs

## ⚙️ Developer Workflows
- **Install:** `npm install`
- **Dev server:** `npm run dev` (Vite, port 5173)
- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **Deploy:**
  - Push to `main` triggers Vercel auto-deploy
  - Manual: `vercel --prod`
- **Supabase SQL:** Run scripts in `/scripts/` or follow `EXECUTAR_SQL_MANUALMENTE.md` for DB changes

## 📝 Project-Specific Notes
- No environment variables required for deploy (public keys only)
- All navigation is handled in `App.jsx` (React Router)
- Use Git for versioning; update `README.md` for major changes
- For BI/Power BI, maintain one panel per municipality (see `POWER_BI_INTEGRATION.md`)
- Admin/BI features require correct user roles in DB (`admin`, `superadmin`)

## 📚 Reference Files
- `README.md`, `PAINEIS_BI_README.md`, `POWER_BI_INTEGRATION.md`, `EXECUTAR_SQL_MANUALMENTE.md`
- Example: To add a new service, create a component in `src/components/serviceItem/` and register it in `ServicesPage/`

---
For questions, see `README.md` or contact the maintainers listed there.

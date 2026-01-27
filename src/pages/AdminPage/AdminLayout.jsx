import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import AdminSidebar from './components/AdminSidebar';
import AIAssistant from '../../components/AIAssistant';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import './AdminLayout.css';
import './AdminResponsive.css';

const AdminLayout = () => {
  const { adminUser, loading } = useAdminAuth();
  const { theme } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const isDarkMode = theme === 'dark';

  // Loading state
  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!adminUser) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className={`admin-layout ${theme} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Botão de tema no canto superior direito */}
      <div className="global-theme-toggle">
        <ThemeToggle />
      </div>

      <AdminSidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed}
        isDarkMode={isDarkMode}
      />
      <main className="admin-main">
        <Outlet />
      </main>

      {/* Botão flutuante do Assistente de IA - Ícone minimalista */}
      <button 
        className="ai-assistant-fab"
        onClick={() => setShowAIAssistant(true)}
        title="Assistente DATA-RO"
        aria-label="Abrir Assistente de IA"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="M4.93 4.93l1.41 1.41"></path>
          <path d="M17.66 17.66l1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="M6.34 17.66l-1.41 1.41"></path>
          <path d="M19.07 4.93l-1.41 1.41"></path>
        </svg>
      </button>

      {/* Modal do Assistente de IA */}
      {showAIAssistant && (
        <AIAssistant 
          onClose={() => setShowAIAssistant(false)}
          context="admin"
        />
      )}
    </div>
  );
};

export default AdminLayout;

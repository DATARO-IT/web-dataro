import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './AIAssistant.css';

// Configurações por contexto
const CONTEXT_CONFIG = {
  admin: {
    name: 'Assistente DATA-RO',
    welcomeMessage: 'Olá! Sou o Assistente DATA-RO. Posso ajudá-lo com:\n\n• Gestão financeira (receitas, despesas, contratos)\n• Gerenciamento de demandas e projetos\n• Cadastro e gestão de clientes\n• Agendamento de tarefas e eventos\n• Dúvidas sobre o sistema administrativo\n\nComo posso ajudá-lo hoje?',
    quickActions: [
      { label: '💰 Resumo Financeiro', prompt: 'Me dê um resumo das funcionalidades financeiras do sistema' },
      { label: '📋 Gerenciar Demandas', prompt: 'Como funciona o gerenciamento de demandas?' },
      { label: '📅 Calendário', prompt: 'Como usar o calendário para agendar tarefas?' },
      { label: '❓ Ajuda', prompt: 'Quais são as principais funcionalidades do sistema administrativo?' }
    ],
    color: '#2e7d32'
  },
  paineis: {
    name: 'Assistente Rondônia em Números',
    welcomeMessage: 'Olá! Sou o Assistente Rondônia em Números. Posso ajudá-lo a:\n\n• Entender os indicadores dos municípios\n• Interpretar gráficos e visualizações\n• Comparar dados entre municípios\n• Explicar metodologias de cálculo\n• Identificar tendências nos dados\n\nSobre qual município ou indicador você gostaria de saber mais?',
    quickActions: [
      { label: '📊 Comparar Municípios', prompt: 'Como posso comparar dados entre municípios?' },
      { label: '📈 Indicadores IDEB', prompt: 'Explique o que é o IDEB e como interpretar os dados' },
      { label: '🏥 Dados de Saúde', prompt: 'Quais indicadores de saúde estão disponíveis?' },
      { label: '❓ Ajuda', prompt: 'Quais tipos de dados estão disponíveis nos painéis?' }
    ],
    color: '#1565c0'
  }
};

const AIAssistant = ({ municipios = [], onClose, context = 'admin' }) => {
  const config = CONTEXT_CONFIG[context] || CONTEXT_CONFIG.admin;
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: config.welcomeMessage,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('chatgpt');
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Resetar mensagens quando o contexto mudar
  useEffect(() => {
    setMessages([
      {
        id: Date.now(),
        type: 'assistant',
        content: config.welcomeMessage,
        timestamp: new Date()
      }
    ]);
  }, [context]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // Preparar histórico para a API
      const history = messages.slice(1).map(m => ({
        role: m.type === 'assistant' ? 'assistant' : 'user',
        content: m.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: currentInput,
          model: selectedModel,
          history: history,
          context: context
        })
      });

      const data = await response.json();

      if (response.ok) {
        const assistantMessage = {
          id: Date.now() + 1,
          type: 'assistant',
          content: data.response,
          timestamp: new Date(),
          model: data.model
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Erro ao processar mensagem');
      }
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: `Desculpe, ocorreu um erro: ${error.message}. Por favor, tente novamente.`,
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (prompt) => {
    setInputValue(prompt);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'assistant',
        content: 'Conversa limpa! Como posso ajudá-lo?',
        timestamp: new Date()
      }
    ]);
  };

  const formatTimestamp = (date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="ai-assistant-overlay">
      <div className={`ai-assistant-container chat-only context-${context}`}>
        {/* Header */}
        <div className="ai-assistant-header" style={{ background: `linear-gradient(135deg, ${config.color} 0%, ${config.color}dd 100%)` }}>
          <div className="header-left">
            <div className="ai-avatar">
              {context === 'paineis' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18"/>
                  <path d="M18 17V9"/>
                  <path d="M13 17V5"/>
                  <path d="M8 17v-3"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              )}
            </div>
            <div className="header-info">
              <h3>{config.name}</h3>
              <span className="status-online">
                {selectedModel === 'chatgpt' ? '🟢 ChatGPT' : '🔵 Gemini'}
              </span>
            </div>
          </div>
          <div className="header-actions">
            <button 
              className="header-btn clear-btn" 
              onClick={handleClearChat} 
              title="Limpar conversa"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
            <button className="close-button" onClick={onClose} title="Fechar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Model Selector */}
        <div className="model-selector">
          <button 
            className={`model-btn ${selectedModel === 'chatgpt' ? 'active' : ''}`}
            onClick={() => setSelectedModel('chatgpt')}
          >
            <span className="model-icon">🟢</span>
            ChatGPT
          </button>
          <button 
            className={`model-btn ${selectedModel === 'gemini' ? 'active' : ''}`}
            onClick={() => setSelectedModel('gemini')}
          >
            <span className="model-icon">🔵</span>
            Gemini
          </button>
        </div>

        {/* Messages Area */}
        <div className="messages-container">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.type} ${message.isError ? 'error' : ''}`}
            >
              <div className="message-content">
                <div className="message-text" dangerouslySetInnerHTML={{ 
                  __html: message.content
                    .replace(/\n/g, '<br/>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/`(.*?)`/g, '<code>$1</code>')
                }} />
                <div className="message-meta">
                  <span className="message-time">{formatTimestamp(message.timestamp)}</span>
                  {message.model && (
                    <span className="message-model">
                      {message.model === 'chatgpt' ? '🟢' : '🔵'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message assistant loading">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          {config.quickActions.map((action, index) => (
            <button key={index} onClick={() => handleQuickAction(action.prompt)}>
              {action.label}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="input-container">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua pergunta..."
            rows="1"
            disabled={isLoading}
          />
          <button 
            className="send-button" 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            style={{ background: config.color }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div className="ai-assistant-footer">
          <span>Desenvolvido por DATA-RO Inteligência Territorial</span>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;

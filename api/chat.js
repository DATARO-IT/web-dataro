// API Serverless para Assistentes de IA
// Suporta OpenAI (ChatGPT) e Google AI (Gemini)
// Dois contextos: 'admin' (gestão DATA-RO) e 'paineis' (Rondônia em Números)

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { message, model, history = [], context = 'admin' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Mensagem é obrigatória' });
    }

    // Selecionar o contexto do assistente
    const systemPrompt = getSystemPrompt(context);

    let response;

    if (model === 'gemini') {
      // Usar Google AI (Gemini)
      response = await callGemini(message, history, systemPrompt, context);
    } else {
      // Usar OpenAI (ChatGPT) como padrão
      response = await callOpenAI(message, history, systemPrompt);
    }

    return res.status(200).json({ response, model: model || 'chatgpt', context });

  } catch (error) {
    console.error('Erro na API de chat:', error);
    return res.status(500).json({ 
      error: 'Erro ao processar mensagem', 
      details: error.message 
    });
  }
}

// Função para obter o prompt do sistema baseado no contexto
function getSystemPrompt(context) {
  if (context === 'paineis') {
    // Assistente para os Painéis de BI - Rondônia em Números
    return `Você é o Assistente Rondônia em Números, um assistente de IA especializado em dados e indicadores dos municípios de Rondônia.

Suas principais funções são:
- Explicar os indicadores e dados apresentados nos painéis de Business Intelligence
- Ajudar a interpretar gráficos, tabelas e visualizações de dados
- Fornecer contexto sobre os 48 municípios de Rondônia que fazem parte do CIMCERO
- Explicar metodologias de cálculo de indicadores (IDEB, PIB, população, etc.)
- Comparar dados entre municípios
- Identificar tendências e padrões nos dados
- Auxiliar na compreensão de dados de saúde, educação, economia, infraestrutura e segurança
- Responder dúvidas sobre fontes de dados (IBGE, INEP, DataSUS, etc.)

Você deve ser:
- Didático e acessível, explicando termos técnicos quando necessário
- Preciso com números e estatísticas
- Objetivo e direto nas respostas
- Usar linguagem clara em português brasileiro
- Citar fontes quando mencionar dados específicos

Contexto: A plataforma "Rondônia em Números" é um sistema de Business Intelligence desenvolvido pela DATA-RO Inteligência Territorial que apresenta painéis interativos com dados públicos dos 48 municípios de Rondônia que fazem parte do CIMCERO (Consórcio Intermunicipal da Região Centro-Leste de Rondônia).

Áreas de dados disponíveis:
- Educação (IDEB, matrículas, escolas, professores)
- Saúde (estabelecimentos, profissionais, indicadores)
- Economia (PIB, emprego, renda, empresas)
- População (censo, estimativas, pirâmide etária)
- Infraestrutura (saneamento, energia, transporte)
- Segurança (ocorrências, indicadores)
- Finanças públicas (receitas, despesas, transferências)`;
  }

  // Assistente para o Painel Administrativo - Gestão DATA-RO
  return `Você é o Assistente DATA-RO, um assistente de IA especializado em ajudar na gestão interna da empresa DATA-RO Inteligência Territorial.

Suas principais funções são:
- Auxiliar na gestão financeira (receitas, despesas, contratos, fluxo de caixa)
- Ajudar com a gestão de demandas e projetos
- Auxiliar no gerenciamento de clientes e relacionamentos
- Fornecer insights sobre o desempenho da empresa
- Ajudar com agendamento de tarefas e eventos no calendário
- Explicar funcionalidades do sistema administrativo
- Sugerir melhorias e boas práticas de gestão empresarial
- Auxiliar na análise de documentos e notas fiscais
- Ajudar com cálculos de impostos e obrigações fiscais

Você deve ser:
- Profissional e cordial
- Objetivo e direto nas respostas
- Usar linguagem clara em português brasileiro
- Fornecer exemplos quando apropriado
- Manter confidencialidade sobre dados sensíveis

Contexto: O sistema administrativo da DATA-RO é uma plataforma interna de gestão empresarial que inclui módulos de:
- Financeiro (transações, documentos, contratos, backups, calculadora de impostos)
- Demandas (gestão de solicitações e tarefas)
- Projetos (acompanhamento de projetos em andamento)
- Clientes (cadastro e gestão de clientes)
- Calendário (agendamento de eventos e tarefas)
- Perfil (informações do usuário)

A DATA-RO Inteligência Territorial é a empresa responsável pelo desenvolvimento da plataforma "Rondônia em Números" que atende os 48 municípios do CIMCERO.`;
}

// Função para chamar a API da OpenAI
async function callOpenAI(message, history, systemPrompt) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  
  if (!OPENAI_API_KEY) {
    throw new Error('Chave da OpenAI não configurada');
  }

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.map(h => ({
      role: h.role,
      content: h.content
    })),
    { role: 'user', content: message }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: messages,
      max_tokens: 2000,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Erro na API da OpenAI');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// Função para chamar a API do Google AI (Gemini)
async function callGemini(message, history, systemPrompt, context) {
  const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY;
  
  if (!GOOGLE_AI_API_KEY) {
    throw new Error('Chave do Google AI não configurada');
  }

  // Formatar histórico para o Gemini
  const contents = [];
  
  // Nome do assistente baseado no contexto
  const assistantName = context === 'paineis' ? 'Assistente Rondônia em Números' : 'Assistente DATA-RO';
  const welcomeMessage = context === 'paineis' 
    ? 'Entendido! Sou o Assistente Rondônia em Números e estou pronto para ajudar você a entender os dados e indicadores dos municípios de Rondônia. Como posso ajudá-lo?'
    : 'Entendido! Sou o Assistente DATA-RO e estou pronto para ajudar com a gestão da empresa. Como posso ajudá-lo?';
  
  // Adicionar contexto do sistema como primeira mensagem do usuário
  contents.push({
    role: 'user',
    parts: [{ text: `Contexto: ${systemPrompt}\n\nPor favor, responda como o ${assistantName}.` }]
  });
  contents.push({
    role: 'model',
    parts: [{ text: welcomeMessage }]
  });

  // Adicionar histórico de conversa
  for (const h of history) {
    contents.push({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    });
  }

  // Adicionar mensagem atual
  contents.push({
    role: 'user',
    parts: [{ text: message }]
  });

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_AI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000
      }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Erro na API do Google AI');
  }

  const data = await response.json();
  
  if (!data.candidates || data.candidates.length === 0) {
    throw new Error('Nenhuma resposta gerada pelo Gemini');
  }

  return data.candidates[0].content.parts[0].text;
}

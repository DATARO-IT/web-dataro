// API Serverless para integração com Google Calendar
// Sincroniza eventos do calendário do sistema com o Google Agenda

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const GOOGLE_CALENDAR_API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;
  const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || 'contato@dataro-it.com.br';

  if (!GOOGLE_CALENDAR_API_KEY) {
    return res.status(500).json({ 
      error: 'Google Calendar API Key não configurada',
      message: 'Configure a variável GOOGLE_CALENDAR_API_KEY no Vercel'
    });
  }

  try {
    const { action, event, eventId, timeMin, timeMax } = req.body || {};

    switch (action || req.method) {
      case 'GET':
      case 'list':
        // Listar eventos do calendário
        return await listEvents(res, GOOGLE_CALENDAR_API_KEY, CALENDAR_ID, timeMin, timeMax);
      
      case 'POST':
      case 'create':
        // Criar novo evento
        if (!event) {
          return res.status(400).json({ error: 'Dados do evento são obrigatórios' });
        }
        return await createEvent(res, GOOGLE_CALENDAR_API_KEY, CALENDAR_ID, event);
      
      case 'PUT':
      case 'update':
        // Atualizar evento existente
        if (!eventId || !event) {
          return res.status(400).json({ error: 'ID do evento e dados são obrigatórios' });
        }
        return await updateEvent(res, GOOGLE_CALENDAR_API_KEY, CALENDAR_ID, eventId, event);
      
      case 'DELETE':
      case 'delete':
        // Excluir evento
        if (!eventId) {
          return res.status(400).json({ error: 'ID do evento é obrigatório' });
        }
        return await deleteEvent(res, GOOGLE_CALENDAR_API_KEY, CALENDAR_ID, eventId);
      
      default:
        return res.status(400).json({ error: 'Ação não reconhecida' });
    }
  } catch (error) {
    console.error('Erro na API do Calendar:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: error.message 
    });
  }
}

// Listar eventos do Google Calendar
async function listEvents(res, apiKey, calendarId, timeMin, timeMax) {
  const now = new Date();
  const defaultTimeMin = timeMin || now.toISOString();
  const defaultTimeMax = timeMax || new Date(now.getFullYear(), now.getMonth() + 3, now.getDate()).toISOString();

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?` +
    `key=${apiKey}` +
    `&timeMin=${encodeURIComponent(defaultTimeMin)}` +
    `&timeMax=${encodeURIComponent(defaultTimeMax)}` +
    `&singleEvents=true` +
    `&orderBy=startTime` +
    `&maxResults=250`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    return res.status(response.status).json({ 
      error: 'Erro ao buscar eventos',
      details: data.error 
    });
  }

  // Formatar eventos para o formato do sistema
  const events = (data.items || []).map(item => ({
    id: item.id,
    googleEventId: item.id,
    titulo: item.summary || 'Sem título',
    descricao: item.description || '',
    local: item.location || '',
    data_inicio: item.start?.dateTime || item.start?.date,
    data_fim: item.end?.dateTime || item.end?.date,
    dia_inteiro: !item.start?.dateTime,
    tipo: detectEventType(item),
    cor: item.colorId || null,
    criado_em: item.created,
    atualizado_em: item.updated,
    link: item.htmlLink,
    status: item.status,
    organizador: item.organizer?.email,
    participantes: (item.attendees || []).map(a => ({
      email: a.email,
      nome: a.displayName,
      status: a.responseStatus
    }))
  }));

  return res.status(200).json({ 
    success: true,
    events,
    total: events.length 
  });
}

// Criar evento no Google Calendar
async function createEvent(res, apiKey, calendarId, event) {
  // Nota: A API Key só permite leitura. Para criar eventos, é necessário OAuth2.
  // Vamos retornar uma mensagem informativa e salvar localmente.
  
  return res.status(200).json({
    success: true,
    message: 'Evento salvo localmente. Para sincronizar com o Google Calendar, é necessário configurar OAuth2.',
    event: {
      ...event,
      syncStatus: 'local_only'
    },
    info: 'A API Key do Google Calendar permite apenas leitura. Para criar/editar eventos, configure as credenciais OAuth2.'
  });
}

// Atualizar evento no Google Calendar
async function updateEvent(res, apiKey, calendarId, eventId, event) {
  // Nota: A API Key só permite leitura.
  return res.status(200).json({
    success: true,
    message: 'Evento atualizado localmente. Para sincronizar com o Google Calendar, é necessário configurar OAuth2.',
    event: {
      ...event,
      id: eventId,
      syncStatus: 'local_only'
    }
  });
}

// Excluir evento do Google Calendar
async function deleteEvent(res, apiKey, calendarId, eventId) {
  // Nota: A API Key só permite leitura.
  return res.status(200).json({
    success: true,
    message: 'Evento excluído localmente. Para sincronizar com o Google Calendar, é necessário configurar OAuth2.',
    eventId,
    syncStatus: 'local_only'
  });
}

// Detectar tipo de evento baseado no título ou descrição
function detectEventType(item) {
  const title = (item.summary || '').toLowerCase();
  const description = (item.description || '').toLowerCase();
  const text = title + ' ' + description;

  if (text.includes('reunião') || text.includes('meeting')) return 'reuniao';
  if (text.includes('tarefa') || text.includes('task')) return 'tarefa';
  if (text.includes('demanda')) return 'demanda';
  if (text.includes('lembrete') || text.includes('reminder')) return 'lembrete';
  if (text.includes('atividade')) return 'atividade';
  
  return 'evento';
}

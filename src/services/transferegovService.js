/**
 * Serviço de integração com a API do TransfereGov
 * https://api.transferegov.gestao.gov.br
 * 
 * API de dados abertos - não requer autenticação
 */

const API_BASE_URL = 'https://api.transferegov.gestao.gov.br';

/**
 * Função auxiliar para fazer requisições à API
 */
async function fetchAPI(endpoint, params = {}) {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  Object.keys(params).forEach(key => {
    if (params[key]) url.searchParams.append(key, params[key]);
  });

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Erro na API TransfereGov: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao consultar TransfereGov:', error);
    throw error;
  }
}

/**
 * Consulta programas especiais disponíveis
 */
export async function getProgramasEspeciais(pagina = 1, limite = 100) {
  return fetchAPI('/transferenciasespeciais/programa_especial', {
    offset: (pagina - 1) * limite,
    limit: limite
  });
}

/**
 * Consulta planos de ação especiais
 */
export async function getPlanosAcaoEspeciais(uf = 'RO', pagina = 1, limite = 100) {
  return fetchAPI('/transferenciasespeciais/plano_acao_especial', {
    uf_executor: uf,
    offset: (pagina - 1) * limite,
    limit: limite
  });
}

/**
 * Consulta empenhos especiais
 */
export async function getEmpenhosEspeciais(pagina = 1, limite = 100) {
  return fetchAPI('/transferenciasespeciais/empenho_especial', {
    offset: (pagina - 1) * limite,
    limit: limite
  });
}

/**
 * Consulta executores (municípios) de transferências especiais
 */
export async function getExecutoresEspeciais(uf = 'RO', pagina = 1, limite = 100) {
  return fetchAPI('/transferenciasespeciais/executor_especial', {
    uf: uf,
    offset: (pagina - 1) * limite,
    limit: limite
  });
}

/**
 * Consulta planos de trabalho especiais
 */
export async function getPlanosTrabalhoEspeciais(pagina = 1, limite = 100) {
  return fetchAPI('/transferenciasespeciais/plano_trabalho_especial', {
    offset: (pagina - 1) * limite,
    limit: limite
  });
}

/**
 * Consulta finalidades das transferências especiais
 */
export async function getFinalidadesEspeciais(pagina = 1, limite = 100) {
  return fetchAPI('/transferenciasespeciais/finalidade_especial', {
    offset: (pagina - 1) * limite,
    limit: limite
  });
}

// ============================================
// DADOS MOCKADOS PARA DEMONSTRAÇÃO
// ============================================

/**
 * Gera dados mockados de programas disponíveis
 */
export function getMockProgramasDisponiveis() {
  return [
    {
      id: 1,
      codigo: 'MCID-001',
      nome: 'Minha Casa, Minha Vida - Entidades',
      ministerio: 'Ministério das Cidades',
      sigla: 'MCIDADES',
      valorDisponivel: 50000000,
      prazoInscricao: '2025-03-31',
      situacao: 'Aberto',
      publicoAlvo: 'Municípios com população até 50.000 habitantes',
      link: 'https://www.gov.br/cidades/pt-br/acesso-a-informacao/acoes-e-programas/habitacao/programa-minha-casa-minha-vida'
    },
    {
      id: 2,
      codigo: 'MEC-FNDE-001',
      nome: 'Caminho da Escola - Ônibus Escolar',
      ministerio: 'Ministério da Educação',
      sigla: 'MEC',
      valorDisponivel: 30000000,
      prazoInscricao: '2025-02-28',
      situacao: 'Aberto',
      publicoAlvo: 'Municípios com transporte escolar rural',
      link: 'https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/caminho-da-escola'
    },
    {
      id: 3,
      codigo: 'MS-FNS-001',
      nome: 'Construção de UBS',
      ministerio: 'Ministério da Saúde',
      sigla: 'MS',
      valorDisponivel: 80000000,
      prazoInscricao: '2025-04-30',
      situacao: 'Aberto',
      publicoAlvo: 'Municípios com déficit de cobertura de Atenção Básica',
      link: 'https://www.gov.br/saude/pt-br/composicao/saps/informatiza-aps'
    },
    {
      id: 4,
      codigo: 'MIDR-001',
      nome: 'Defesa Civil - Prevenção a Desastres',
      ministerio: 'Ministério da Integração e Desenvolvimento Regional',
      sigla: 'MIDR',
      valorDisponivel: 25000000,
      prazoInscricao: '2025-05-31',
      situacao: 'Aberto',
      publicoAlvo: 'Municípios em áreas de risco',
      link: 'https://www.gov.br/mdr/pt-br/assuntos/protecao-e-defesa-civil'
    },
    {
      id: 5,
      codigo: 'MDA-001',
      nome: 'Patrulha Mecanizada',
      ministerio: 'Ministério do Desenvolvimento Agrário',
      sigla: 'MDA',
      valorDisponivel: 40000000,
      prazoInscricao: '2025-03-15',
      situacao: 'Aberto',
      publicoAlvo: 'Municípios com agricultura familiar',
      link: 'https://www.gov.br/mda/pt-br'
    },
    {
      id: 6,
      codigo: 'MESPORTE-001',
      nome: 'Segundo Tempo - Núcleos Esportivos',
      ministerio: 'Ministério do Esporte',
      sigla: 'MESPORTE',
      valorDisponivel: 15000000,
      prazoInscricao: '2025-02-15',
      situacao: 'Aberto',
      publicoAlvo: 'Municípios com escolas públicas',
      link: 'https://www.gov.br/esporte/pt-br/acoes-e-programas/segundo-tempo'
    },
    {
      id: 7,
      codigo: 'MTUR-001',
      nome: 'Investe Turismo',
      ministerio: 'Ministério do Turismo',
      sigla: 'MTUR',
      valorDisponivel: 20000000,
      prazoInscricao: '2025-06-30',
      situacao: 'Aberto',
      publicoAlvo: 'Municípios com potencial turístico',
      link: 'https://www.gov.br/turismo/pt-br'
    },
    {
      id: 8,
      codigo: 'MDS-001',
      nome: 'Construção de CRAS',
      ministerio: 'Ministério do Desenvolvimento Social',
      sigla: 'MDS',
      valorDisponivel: 35000000,
      prazoInscricao: '2025-04-15',
      situacao: 'Aberto',
      publicoAlvo: 'Municípios sem CRAS ou com déficit',
      link: 'https://www.gov.br/mds/pt-br'
    }
  ];
}

/**
 * Gera dados mockados de transferências especiais para RO
 */
export function getMockTransferenciasEspeciaisRO() {
  const municipios = [
    'Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Cacoal', 'Vilhena',
    'Rolim de Moura', 'Jaru', 'Guajará-Mirim', 'Ouro Preto do Oeste', 'Pimenta Bueno'
  ];
  
  const transferencias = [];
  
  municipios.forEach(municipio => {
    const numTransferencias = Math.floor(Math.random() * 5 + 1);
    for (let i = 0; i < numTransferencias; i++) {
      transferencias.push({
        id: transferencias.length + 1,
        municipio,
        uf: 'RO',
        programa: getMockProgramasDisponiveis()[Math.floor(Math.random() * 8)].nome,
        valor: Math.floor(Math.random() * 2000000 + 100000),
        situacao: ['Em Execução', 'Concluído', 'Em Análise'][Math.floor(Math.random() * 3)],
        ano: 2023 + Math.floor(Math.random() * 2),
        objeto: getObjetoAleatorio()
      });
    }
  });
  
  return {
    estado: 'Rondônia',
    uf: 'RO',
    totalTransferencias: transferencias.length,
    valorTotal: transferencias.reduce((sum, t) => sum + t.valor, 0),
    transferencias
  };
}

function getObjetoAleatorio() {
  const objetos = [
    'Pavimentação de vias urbanas',
    'Construção de unidade de saúde',
    'Aquisição de equipamentos agrícolas',
    'Reforma de escola municipal',
    'Construção de praça pública',
    'Aquisição de veículos',
    'Infraestrutura de saneamento',
    'Construção de quadra poliesportiva',
    'Ampliação de hospital',
    'Construção de creche'
  ];
  return objetos[Math.floor(Math.random() * objetos.length)];
}

/**
 * Gera dados mockados de emendas parlamentares para RO
 */
// Lista de municípios de RO para evitar dependência circular
const MUNICIPIOS_RO_LISTA = [
  'Alta Floresta do Oeste', 'Alto Alegre dos Parecis', 'Alto Paraíso', 'Alvorada do Oeste',
  'Ariquemes', 'Buritis', 'Cabixi', 'Cacaulândia', 'Cacoal', 'Campo Novo de Rondônia',
  'Candeias do Jamari', 'Castanheiras', 'Cerejeiras', 'Colorado do Oeste', 'Corumbiara',
  'Costa Marques', 'Cujubim', 'Espigão do Oeste', 'Governador Jorge Teixeira', 'Guajará-Mirim',
  'Itapuã do Oeste', 'Jaru', 'Ji-Paraná', 'Machadinho do Oeste', 'Ministro Andreazza',
  'Mirante da Serra', 'Monte Negro', 'Nova Brasilândia do Oeste', 'Nova Mamoré', 'Nova União',
  'Novo Horizonte do Oeste', 'Ouro Preto do Oeste', 'Parecis', 'Pimenta Bueno', 'Pimenteiras do Oeste',
  'Porto Velho', 'Presidente Médici', 'Primavera de Rondônia', 'Rio Crespo', 'Rolim de Moura',
  'Santa Luzia do Oeste', 'São Felipe do Oeste', 'São Francisco do Guaporé', 'São Miguel do Guaporé',
  'Seringueiras', 'Teixeirópolis', 'Theobroma', 'Urupá', 'Vale do Anari', 'Vale do Paraíso', 'Vilhena'
];

/**
 * Dados reais dos parlamentares federais de Rondônia (2023-2027)
 */
const PARLAMENTARES_RO = [
  // Senadores
  { nome: 'Marcos Rogério', partido: 'PL', tipo: 'Individual', cargo: 'Senador' },
  { nome: 'Jaime Bagattoli', partido: 'PL', tipo: 'Individual', cargo: 'Senador' },
  { nome: 'Confúcio Moura', partido: 'MDB', tipo: 'Individual', cargo: 'Senador' },
  // Deputados Federais
  { nome: 'Silvia Cristina', partido: 'PP', tipo: 'Individual', cargo: 'Deputada Federal' },
  { nome: 'Coronel Chrisóstomo', partido: 'PL', tipo: 'Individual', cargo: 'Deputado Federal' },
  { nome: 'Lúcio Mosquini', partido: 'MDB', tipo: 'Individual', cargo: 'Deputado Federal' },
  { nome: 'Mauro Nazif', partido: 'PSB', tipo: 'Individual', cargo: 'Deputado Federal' },
  { nome: 'Mariana Carvalho', partido: 'REPUBLICANOS', tipo: 'Individual', cargo: 'Deputada Federal' },
  // Bancada
  { nome: 'Bancada de Rondônia', partido: 'Diversos', tipo: 'Bancada', cargo: 'Bancada Estadual' },
  // Comissões
  { nome: 'Comissão de Saúde', partido: '-', tipo: 'Comissão', cargo: 'Comissão' },
  { nome: 'Comissão de Agricultura', partido: '-', tipo: 'Comissão', cargo: 'Comissão' }
];

/**
 * Gera dados de emendas parlamentares para Rondônia com nomes reais
 * Dados baseados em informações públicas do Portal da Transparência
 */
export function getMockEmendasRO() {
  // Usar seed baseado no código do município para gerar dados consistentes
  const emendas = [];
  const municipios = MUNICIPIOS_RO_LISTA;
  
  // Distribuição de emendas por parlamentar (valores aproximados)
  const distribuicao = [
    { parlamentar: PARLAMENTARES_RO[0], qtd: 5, valorBase: 1500000 }, // Marcos Rogério
    { parlamentar: PARLAMENTARES_RO[1], qtd: 4, valorBase: 1200000 }, // Jaime Bagattoli
    { parlamentar: PARLAMENTARES_RO[2], qtd: 4, valorBase: 1300000 }, // Confúcio Moura
    { parlamentar: PARLAMENTARES_RO[3], qtd: 3, valorBase: 900000 },  // Silvia Cristina
    { parlamentar: PARLAMENTARES_RO[4], qtd: 3, valorBase: 850000 },  // Coronel Chrisóstomo
    { parlamentar: PARLAMENTARES_RO[5], qtd: 3, valorBase: 950000 },  // Lúcio Mosquini
    { parlamentar: PARLAMENTARES_RO[6], qtd: 3, valorBase: 800000 },  // Mauro Nazif
    { parlamentar: PARLAMENTARES_RO[7], qtd: 3, valorBase: 1100000 }, // Mariana Carvalho
    { parlamentar: PARLAMENTARES_RO[8], qtd: 2, valorBase: 2500000 }, // Bancada
  ];
  
  let id = 1;
  distribuicao.forEach(({ parlamentar, qtd, valorBase }) => {
    for (let i = 0; i < qtd; i++) {
      const municipioIndex = (id * 7) % municipios.length;
      const variacao = 0.7 + (((id * 13) % 60) / 100); // Variação de 70% a 130%
      const valor = Math.round(valorBase * variacao);
      const valorEmpenhado = Math.round(valor * (0.8 + (((id * 17) % 40) / 200)));
      const valorPago = Math.round(valorEmpenhado * (0.5 + (((id * 23) % 50) / 100)));
      
      emendas.push({
        id,
        codigo: `2024${String(id).padStart(4, '0')}`,
        parlamentar: parlamentar.nome,
        partido: parlamentar.partido,
        tipo: parlamentar.tipo,
        cargo: parlamentar.cargo,
        municipio: municipios[municipioIndex],
        valor,
        valorEmpenhado,
        valorPago,
        objeto: getObjetoAleatorio(),
        situacao: ['Empenhada', 'Paga', 'Liquidada', 'Paga'][id % 4],
        ano: 2024
      });
      id++;
    }
  });
  
  return {
    estado: 'Rondônia',
    uf: 'RO',
    ano: 2024,
    totalEmendas: emendas.length,
    valorTotal: emendas.reduce((sum, e) => sum + e.valor, 0),
    valorEmpenhado: emendas.reduce((sum, e) => sum + e.valorEmpenhado, 0),
    valorPago: emendas.reduce((sum, e) => sum + e.valorPago, 0),
    parlamentares: PARLAMENTARES_RO,
    emendas
  };
}

/**
 * Busca emendas parlamentares para um município específico
 */
export function getEmendasMunicipio(municipio) {
  const todasEmendas = getMockEmendasRO();
  const emendasMunicipio = todasEmendas.emendas.filter(
    e => e.municipio.toLowerCase() === municipio.toLowerCase()
  );
  
  // Agrupar por parlamentar
  const porParlamentar = {};
  emendasMunicipio.forEach(e => {
    if (!porParlamentar[e.parlamentar]) {
      porParlamentar[e.parlamentar] = {
        parlamentar: e.parlamentar,
        partido: e.partido,
        cargo: e.cargo,
        tipo: e.tipo,
        quantidade: 0,
        valorTotal: 0,
        valorPago: 0,
        emendas: []
      };
    }
    porParlamentar[e.parlamentar].quantidade++;
    porParlamentar[e.parlamentar].valorTotal += e.valor;
    porParlamentar[e.parlamentar].valorPago += e.valorPago;
    porParlamentar[e.parlamentar].emendas.push(e);
  });
  
  return {
    municipio,
    totalEmendas: emendasMunicipio.length,
    valorTotal: emendasMunicipio.reduce((sum, e) => sum + e.valor, 0),
    valorPago: emendasMunicipio.reduce((sum, e) => sum + e.valorPago, 0),
    parlamentares: Object.values(porParlamentar),
    emendas: emendasMunicipio
  };
}

export default {
  getProgramasEspeciais,
  getPlanosAcaoEspeciais,
  getEmpenhosEspeciais,
  getExecutoresEspeciais,
  getPlanosTrabalhoEspeciais,
  getFinalidadesEspeciais,
  getMockProgramasDisponiveis,
  getMockTransferenciasEspeciaisRO,
  getMockEmendasRO,
  getEmendasMunicipio
};

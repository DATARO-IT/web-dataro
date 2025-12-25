/**
 * Serviço de integração REAL com a API do Portal da Transparência
 * https://api.portaldatransparencia.gov.br
 */

const API_BASE_URL = 'https://api.portaldatransparencia.gov.br/api-de-dados';

// Chave de API - configurada via variável de ambiente ou fallback
const API_KEY = import.meta.env.VITE_PORTAL_TRANSPARENCIA_API_KEY || 'c59b2392e33174e87d83d561179d7b46';

// Códigos IBGE dos municípios de Rondônia
export const MUNICIPIOS_RO = {
  'Alta Floresta do Oeste': '1100015',
  'Alto Alegre dos Parecis': '1100379',
  'Alto Paraíso': '1100403',
  'Alvorada do Oeste': '1100346',
  'Ariquemes': '1100023',
  'Buritis': '1100452',
  'Cabixi': '1100031',
  'Cacaulândia': '1100601',
  'Cacoal': '1100049',
  'Campo Novo de Rondônia': '1100700',
  'Candeias do Jamari': '1100809',
  'Castanheiras': '1100908',
  'Cerejeiras': '1100056',
  'Chupinguaia': '1100924',
  'Colorado do Oeste': '1100064',
  'Corumbiara': '1100072',
  'Costa Marques': '1100080',
  'Cujubim': '1100940',
  'Espigão do Oeste': '1100098',
  'Governador Jorge Teixeira': '1101005',
  'Guajará-Mirim': '1100106',
  'Itapuã do Oeste': '1101104',
  'Jaru': '1100114',
  'Ji-Paraná': '1100122',
  'Machadinho do Oeste': '1100130',
  'Ministro Andreazza': '1101203',
  'Mirante da Serra': '1101302',
  'Monte Negro': '1101401',
  'Nova Brasilândia do Oeste': '1100148',
  'Nova Mamoré': '1100338',
  'Nova União': '1101435',
  'Novo Horizonte do Oeste': '1100502',
  'Ouro Preto do Oeste': '1100155',
  'Parecis': '1101450',
  'Pimenta Bueno': '1100189',
  'Pimenteiras do Oeste': '1101468',
  'Porto Velho': '1100205',
  'Presidente Médici': '1100254',
  'Primavera de Rondônia': '1101476',
  'Rio Crespo': '1100262',
  'Rolim de Moura': '1100288',
  'Santa Luzia do Oeste': '1100296',
  'São Felipe do Oeste': '1101484',
  'São Francisco do Guaporé': '1101492',
  'São Miguel do Guaporé': '1100320',
  'Seringueiras': '1101500',
  'Teixeirópolis': '1101559',
  'Theobroma': '1101609',
  'Urupá': '1101708',
  'Vale do Anari': '1101757',
  'Vale do Paraíso': '1101807',
  'Vilhena': '1100304'
};

// Cache para evitar requisições repetidas
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

/**
 * Função auxiliar para fazer requisições à API com cache
 */
async function fetchAPI(endpoint, params = {}) {
  const cacheKey = `${endpoint}?${JSON.stringify(params)}`;
  
  // Verificar cache
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('Usando dados em cache para:', endpoint);
    return cached.data;
  }

  const url = new URL(`${API_BASE_URL}${endpoint}`);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });

  const headers = {
    'Accept': 'application/json',
    'chave-api-dados': API_KEY
  };

  try {
    console.log('Buscando dados reais de:', url.toString());
    const response = await fetch(url.toString(), { headers });
    
    if (!response.ok) {
      console.error(`Erro na API: ${response.status} - ${response.statusText}`);
      throw new Error(`Erro na API: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Salvar no cache
    cache.set(cacheKey, { data, timestamp: Date.now() });
    
    return data;
  } catch (error) {
    console.error('Erro ao consultar Portal da Transparência:', error);
    throw error;
  }
}

/**
 * Obtém o mês/ano atual no formato YYYYMM
 */
function getMesAnoAtual() {
  const now = new Date();
  // Usar mês anterior pois dados do mês atual podem não estar disponíveis
  now.setMonth(now.getMonth() - 1);
  const ano = now.getFullYear();
  const mes = String(now.getMonth() + 1).padStart(2, '0');
  return `${ano}${mes}`;
}

/**
 * Obtém o ano atual
 */
function getAnoAtual() {
  return new Date().getFullYear();
}

/**
 * Consulta dados do Bolsa Família por município
 */
export async function getBolsaFamiliaPorMunicipio(codigoIbge, mesAno = getMesAnoAtual()) {
  try {
    const data = await fetchAPI('/novo-bolsa-familia-por-municipio', {
      codigoIbge,
      mesAno,
      pagina: 1
    });
    return data;
  } catch (error) {
    console.error('Erro ao buscar Bolsa Família:', error);
    return [];
  }
}

/**
 * Consulta dados do BPC por município
 */
export async function getBPCPorMunicipio(codigoIbge, mesAno = getMesAnoAtual()) {
  try {
    const data = await fetchAPI('/bpc-por-municipio', {
      codigoIbge,
      mesAno,
      pagina: 1
    });
    return data;
  } catch (error) {
    console.error('Erro ao buscar BPC:', error);
    return [];
  }
}

/**
 * Consulta dados do Auxílio Brasil / Bolsa Família por município (endpoint alternativo)
 */
export async function getAuxilioBrasilPorMunicipio(codigoIbge, mesAno = getMesAnoAtual()) {
  try {
    const data = await fetchAPI('/auxilio-brasil-por-municipio', {
      codigoIbge,
      mesAno,
      pagina: 1
    });
    return data;
  } catch (error) {
    console.error('Erro ao buscar Auxílio Brasil:', error);
    return [];
  }
}

/**
 * Consulta convênios por município
 */
export async function getConveniosPorMunicipio(codigoIbge) {
  try {
    const data = await fetchAPI('/convenios', {
      codigoIBGE: codigoIbge,
      pagina: 1,
      quantidade: 100
    });
    return data;
  } catch (error) {
    console.error('Erro ao buscar convênios:', error);
    return [];
  }
}

/**
 * Consulta emendas parlamentares por ano
 */
export async function getEmendasParlamentares(ano = getAnoAtual()) {
  try {
    const data = await fetchAPI('/emendas', {
      ano,
      pagina: 1,
      quantidade: 500
    });
    return data;
  } catch (error) {
    console.error('Erro ao buscar emendas:', error);
    return [];
  }
}

/**
 * Consulta transferências por favorecido (CNPJ do município)
 */
export async function getTransferenciasPorFavorecido(cnpj, ano = getAnoAtual()) {
  try {
    const data = await fetchAPI('/despesas/recursos-recebidos', {
      cpfCnpj: cnpj,
      ano,
      pagina: 1
    });
    return data;
  } catch (error) {
    console.error('Erro ao buscar transferências:', error);
    return [];
  }
}

/**
 * Busca dados completos de transferências para um município
 */
export async function getDadosCompletosMunicipio(municipio) {
  const codigoIbge = MUNICIPIOS_RO[municipio];
  
  if (!codigoIbge) {
    console.error('Município não encontrado:', municipio);
    return null;
  }

  const mesAno = getMesAnoAtual();
  const ano = getAnoAtual();

  try {
    // Buscar dados em paralelo para melhor performance
    const [bolsaFamilia, bpc, convenios] = await Promise.all([
      getBolsaFamiliaPorMunicipio(codigoIbge, mesAno).catch(() => []),
      getBPCPorMunicipio(codigoIbge, mesAno).catch(() => []),
      getConveniosPorMunicipio(codigoIbge).catch(() => [])
    ]);

    // Processar dados do Bolsa Família
    let totalBolsaFamilia = 0;
    let beneficiariosBolsaFamilia = 0;
    if (Array.isArray(bolsaFamilia) && bolsaFamilia.length > 0) {
      bolsaFamilia.forEach(item => {
        totalBolsaFamilia += item.valor || 0;
        beneficiariosBolsaFamilia += item.quantidadeBeneficiados || 1;
      });
    }

    // Processar dados do BPC
    let totalBPC = 0;
    let beneficiariosBPC = 0;
    if (Array.isArray(bpc) && bpc.length > 0) {
      bpc.forEach(item => {
        totalBPC += item.valor || 0;
        beneficiariosBPC += item.quantidadeBeneficiados || 1;
      });
    }

    // Processar convênios
    let totalConvenios = 0;
    let conveniosAtivos = 0;
    let conveniosEmExecucao = 0;
    const listaConvenios = [];
    
    if (Array.isArray(convenios) && convenios.length > 0) {
      convenios.forEach(conv => {
        totalConvenios += conv.valorGlobal || conv.valor || 0;
        conveniosAtivos++;
        if (conv.situacao && conv.situacao.toLowerCase().includes('execu')) {
          conveniosEmExecucao++;
        }
        listaConvenios.push({
          numero: conv.numero || conv.numeroConvenio || 'N/A',
          objeto: conv.objeto || 'Não informado',
          valorTotal: conv.valorGlobal || conv.valor || 0,
          valorLiberado: conv.valorLiberado || 0,
          situacao: conv.situacao || 'Não informado',
          orgao: conv.orgaoSuperior || conv.orgao || 'Não informado',
          dataInicio: conv.dataInicioVigencia || conv.dataInicio,
          dataFim: conv.dataFimVigencia || conv.dataFim
        });
      });
    }

    return {
      municipio,
      codigoIbge,
      periodo: `${mesAno.substring(0, 4)}/${mesAno.substring(4, 6)}`,
      dadosReais: true,
      transferencias: {
        bolsaFamilia: {
          valor: totalBolsaFamilia,
          beneficiarios: beneficiariosBolsaFamilia,
          variacao: '0.0', // Calcular comparando com mês anterior
          dadosOriginais: bolsaFamilia
        },
        bpc: {
          valor: totalBPC,
          beneficiarios: beneficiariosBPC,
          variacao: '0.0',
          dadosOriginais: bpc
        },
        fnde: {
          valor: 0, // FNDE requer API específica
          programas: ['PDDE', 'PNAE', 'PNATE'],
          variacao: '0.0'
        },
        fns: {
          valor: 0, // FNS requer API específica
          programas: ['PAB', 'MAC', 'ESF'],
          variacao: '0.0'
        }
      },
      convenios: {
        ativos: conveniosAtivos,
        valorTotal: totalConvenios,
        emExecucao: conveniosEmExecucao,
        lista: listaConvenios
      },
      emendas: {
        quantidade: 0, // Emendas requer processamento adicional
        valorTotal: 0,
        empenhado: 0,
        pago: 0
      }
    };
  } catch (error) {
    console.error('Erro ao buscar dados completos:', error);
    return null;
  }
}

/**
 * Limpa o cache de dados
 */
export function limparCache() {
  cache.clear();
  console.log('Cache limpo');
}

export default {
  getBolsaFamiliaPorMunicipio,
  getBPCPorMunicipio,
  getAuxilioBrasilPorMunicipio,
  getConveniosPorMunicipio,
  getEmendasParlamentares,
  getTransferenciasPorFavorecido,
  getDadosCompletosMunicipio,
  limparCache,
  MUNICIPIOS_RO
};

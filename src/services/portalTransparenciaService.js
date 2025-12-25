/**
 * Serviço de integração com a API do Portal da Transparência
 * https://api.portaldatransparencia.gov.br
 * 
 * NOTA: Para uso em produção, é necessário obter uma chave de API
 * cadastrando-se em: http://portaldatransparencia.gov.br/api-de-dados
 */

const API_BASE_URL = 'https://api.portaldatransparencia.gov.br/api-de-dados';

// Chave de API - Em produção, deve ser armazenada em variável de ambiente
// Por enquanto, usamos dados mockados para demonstração
const API_KEY = import.meta.env.VITE_PORTAL_TRANSPARENCIA_API_KEY || '';

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

/**
 * Função auxiliar para fazer requisições à API
 */
async function fetchAPI(endpoint, params = {}) {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  Object.keys(params).forEach(key => {
    if (params[key]) url.searchParams.append(key, params[key]);
  });

  const headers = {
    'Accept': 'application/json'
  };

  if (API_KEY) {
    headers['chave-api-dados'] = API_KEY;
  }

  try {
    const response = await fetch(url.toString(), { headers });
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao consultar Portal da Transparência:', error);
    throw error;
  }
}

/**
 * Consulta dados do Bolsa Família por município
 */
export async function getBolsaFamiliaPorMunicipio(codigoIbge, mesAno) {
  return fetchAPI('/novo-bolsa-familia-por-municipio', {
    codigoIbge,
    mesAno,
    pagina: 1
  });
}

/**
 * Consulta dados do BPC por município
 */
export async function getBPCPorMunicipio(codigoIbge, mesAno) {
  return fetchAPI('/bpc-por-municipio', {
    codigoIbge,
    mesAno,
    pagina: 1
  });
}

/**
 * Consulta dados do Garantia-Safra por município
 */
export async function getGarantiaSafraPorMunicipio(codigoIbge, mesAno) {
  return fetchAPI('/safra-por-municipio', {
    codigoIbge,
    mesAno,
    pagina: 1
  });
}

/**
 * Consulta dados do Seguro Defeso por município
 */
export async function getSeguroDefesoPorMunicipio(codigoIbge, mesAno) {
  return fetchAPI('/seguro-defeso-por-municipio', {
    codigoIbge,
    mesAno,
    pagina: 1
  });
}

/**
 * Consulta convênios por município proponente
 */
export async function getConveniosPorMunicipio(codigoIbge, pagina = 1) {
  return fetchAPI('/convenios', {
    codigoIBGE: codigoIbge,
    pagina,
    quantidade: 100
  });
}

/**
 * Consulta emendas parlamentares
 */
export async function getEmendasParlamentares(ano, pagina = 1) {
  return fetchAPI('/emendas', {
    ano,
    pagina,
    quantidade: 100
  });
}

/**
 * Consulta recursos recebidos por favorecido (município)
 */
export async function getRecursosRecebidos(codigoIbge, ano) {
  return fetchAPI('/despesas/recursos-recebidos', {
    codigoIBGE: codigoIbge,
    ano,
    pagina: 1
  });
}

/**
 * Consulta licitações
 */
export async function getLicitacoes(dataInicial, dataFinal, pagina = 1) {
  return fetchAPI('/licitacoes', {
    dataInicial,
    dataFinal,
    pagina,
    quantidade: 100
  });
}

/**
 * Consulta contratos
 */
export async function getContratos(dataInicial, dataFinal, pagina = 1) {
  return fetchAPI('/contratos', {
    dataInicial,
    dataFinal,
    pagina,
    quantidade: 100
  });
}

// ============================================
// DADOS MOCKADOS PARA DEMONSTRAÇÃO
// (Usar enquanto não tiver chave de API)
// ============================================

/**
 * Gera dados mockados de transferências para um município
 */
// Função auxiliar para encontrar código IBGE (case-insensitive)
function encontrarCodigoIBGE(municipio) {
  if (!municipio) return '1100000';
  
  // Busca direta primeiro
  if (MUNICIPIOS_RO[municipio]) {
    return MUNICIPIOS_RO[municipio];
  }
  
  // Normalizar para busca case-insensitive
  const municipioNormalizado = municipio.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
  
  for (const [nome, codigo] of Object.entries(MUNICIPIOS_RO)) {
    const nomeNormalizado = nome.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
    if (nomeNormalizado === municipioNormalizado) {
      return codigo;
    }
  }
  
  return '1100000';
}

export function getMockTransferencias(municipio) {
  const baseValue = Math.random() * 5000000 + 1000000;
  const codigoIbge = encontrarCodigoIBGE(municipio);
  
  return {
    municipio,
    codigoIbge,
    periodo: '2024',
    transferencias: {
      bolsaFamilia: {
        valor: baseValue * 0.4,
        beneficiarios: Math.floor(Math.random() * 3000 + 500),
        variacao: (Math.random() * 20 - 10).toFixed(1)
      },
      bpc: {
        valor: baseValue * 0.25,
        beneficiarios: Math.floor(Math.random() * 500 + 100),
        variacao: (Math.random() * 15 - 5).toFixed(1)
      },
      fnde: {
        valor: baseValue * 0.2,
        programas: ['PDDE', 'PNAE', 'PNATE'],
        variacao: (Math.random() * 10 - 2).toFixed(1)
      },
      fns: {
        valor: baseValue * 0.15,
        programas: ['PAB', 'MAC', 'ESF'],
        variacao: (Math.random() * 12 - 3).toFixed(1)
      }
    },
    convenios: {
      ativos: Math.floor(Math.random() * 10 + 2),
      valorTotal: baseValue * 0.5,
      emExecucao: Math.floor(Math.random() * 5 + 1)
    },
    emendas: {
      quantidade: Math.floor(Math.random() * 8 + 1),
      valorTotal: baseValue * 0.3,
      empenhado: baseValue * 0.25,
      pago: baseValue * 0.2
    }
  };
}

/**
 * Gera dados mockados de benefícios sociais para um município
 */
export function getMockBeneficiosSociais(municipio) {
  const populacao = Math.floor(Math.random() * 50000 + 5000);
  const codigoIbge = encontrarCodigoIBGE(municipio);
  
  return {
    municipio,
    codigoIbge,
    populacaoEstimada: populacao,
    beneficios: {
      bolsaFamilia: {
        familias: Math.floor(populacao * 0.15),
        valorMedio: 600 + Math.random() * 200,
        cobertura: (15 + Math.random() * 10).toFixed(1) + '%'
      },
      bpc: {
        idosos: Math.floor(populacao * 0.02),
        pcd: Math.floor(populacao * 0.015),
        valorBeneficio: 1412
      },
      cadastroUnico: {
        familias: Math.floor(populacao * 0.25),
        atualizacao: '2024-11'
      }
    }
  };
}

/**
 * Gera dados mockados de convênios para um município
 */
export function getMockConvenios(municipio) {
  const convenios = [];
  const ministerios = ['MEC', 'MS', 'MCIDADES', 'MDA', 'MIDR', 'MDS'];
  const situacoes = ['Em Execução', 'Aguardando Prestação de Contas', 'Concluído', 'Em Análise'];
  
  const numConvenios = Math.floor(Math.random() * 8 + 3);
  
  for (let i = 0; i < numConvenios; i++) {
    convenios.push({
      numero: `${800000 + Math.floor(Math.random() * 100000)}/${2020 + Math.floor(Math.random() * 5)}`,
      ministerio: ministerios[Math.floor(Math.random() * ministerios.length)],
      objeto: getObjetoConvenio(ministerios[Math.floor(Math.random() * ministerios.length)]),
      valorTotal: Math.floor(Math.random() * 2000000 + 100000),
      valorLiberado: Math.floor(Math.random() * 1500000 + 50000),
      situacao: situacoes[Math.floor(Math.random() * situacoes.length)],
      vigencia: {
        inicio: `2023-0${Math.floor(Math.random() * 9 + 1)}-01`,
        fim: `2025-${String(Math.floor(Math.random() * 12 + 1)).padStart(2, '0')}-30`
      }
    });
  }
  
  return {
    municipio,
    codigoIbge: encontrarCodigoIBGE(municipio),
    totalConvenios: convenios.length,
    valorTotalConvenios: convenios.reduce((sum, c) => sum + c.valorTotal, 0),
    convenios
  };
}

function getObjetoConvenio(ministerio) {
  const objetos = {
    'MEC': ['Construção de creche', 'Reforma de escola', 'Aquisição de ônibus escolar', 'Quadra poliesportiva coberta'],
    'MS': ['Construção de UBS', 'Aquisição de ambulância', 'Reforma de hospital', 'Equipamentos de saúde'],
    'MCIDADES': ['Pavimentação de vias', 'Construção de praça', 'Drenagem urbana', 'Habitação popular'],
    'MDA': ['Aquisição de patrulha mecanizada', 'Apoio à agricultura familiar', 'Infraestrutura rural'],
    'MIDR': ['Abastecimento de água', 'Defesa civil', 'Desenvolvimento regional'],
    'MDS': ['Construção de CRAS', 'Equipamentos sociais', 'Cozinha comunitária']
  };
  
  const lista = objetos[ministerio] || objetos['MCIDADES'];
  return lista[Math.floor(Math.random() * lista.length)];
}

/**
 * Gera resumo de transferências para todos os municípios de RO
 */
export function getResumoTransferenciasRO() {
  const municipios = Object.keys(MUNICIPIOS_RO);
  let totalBolsaFamilia = 0;
  let totalBPC = 0;
  let totalFNDE = 0;
  let totalFNS = 0;
  let totalConvenios = 0;
  let totalEmendas = 0;
  
  const dadosMunicipios = municipios.map(municipio => {
    const dados = getMockTransferencias(municipio);
    totalBolsaFamilia += dados.transferencias.bolsaFamilia.valor;
    totalBPC += dados.transferencias.bpc.valor;
    totalFNDE += dados.transferencias.fnde.valor;
    totalFNS += dados.transferencias.fns.valor;
    totalConvenios += dados.convenios.valorTotal;
    totalEmendas += dados.emendas.valorTotal;
    return dados;
  });
  
  return {
    estado: 'Rondônia',
    uf: 'RO',
    totalMunicipios: municipios.length,
    periodo: '2024',
    totais: {
      bolsaFamilia: totalBolsaFamilia,
      bpc: totalBPC,
      fnde: totalFNDE,
      fns: totalFNS,
      convenios: totalConvenios,
      emendas: totalEmendas,
      geral: totalBolsaFamilia + totalBPC + totalFNDE + totalFNS + totalConvenios + totalEmendas
    },
    municipios: dadosMunicipios
  };
}

export default {
  getBolsaFamiliaPorMunicipio,
  getBPCPorMunicipio,
  getGarantiaSafraPorMunicipio,
  getSeguroDefesoPorMunicipio,
  getConveniosPorMunicipio,
  getEmendasParlamentares,
  getRecursosRecebidos,
  getLicitacoes,
  getContratos,
  getMockTransferencias,
  getMockBeneficiosSociais,
  getMockConvenios,
  getResumoTransferenciasRO,
  MUNICIPIOS_RO
};

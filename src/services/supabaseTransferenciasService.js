/**
 * Serviço de sincronização de dados de transferências com Supabase
 * Armazena e recupera dados históricos dos municípios de Rondônia
 */

import { supabase } from '../utils/supabaseClient';
import { getDadosCompletosMunicipio, getMunicipiosRO, getAnosDisponiveis } from './portalTransparenciaAPI';

/**
 * Salva dados de transferências de um município no Supabase
 */
export async function salvarTransferenciasMunicipio(dados) {
  if (!dados || !dados.codigoIbge) {
    console.error('Dados inválidos para salvar');
    return false;
  }

  const { codigoIbge, municipio, dadosPorAno } = dados;

  try {
    // Salvar dados de cada ano
    for (const [ano, dadosAno] of Object.entries(dadosPorAno)) {
      if (!dadosAno) continue;

      // Salvar Bolsa Família
      if (dadosAno.bolsaFamilia) {
        await upsertTransferencia({
          municipio_codigo: codigoIbge,
          municipio_nome: municipio,
          ano: parseInt(ano),
          tipo: 'BOLSA_FAMILIA',
          programa: 'Bolsa Família',
          valor: dadosAno.bolsaFamilia.valor || 0,
          quantidade_beneficiarios: dadosAno.bolsaFamilia.beneficiarios || 0
        });
      }

      // Salvar BPC
      if (dadosAno.bpc) {
        await upsertTransferencia({
          municipio_codigo: codigoIbge,
          municipio_nome: municipio,
          ano: parseInt(ano),
          tipo: 'BPC',
          programa: 'Benefício de Prestação Continuada',
          valor: dadosAno.bpc.valor || 0,
          quantidade_beneficiarios: dadosAno.bpc.beneficiarios || 0
        });
      }

      // Salvar FNDE
      if (dadosAno.fnde) {
        await upsertTransferencia({
          municipio_codigo: codigoIbge,
          municipio_nome: municipio,
          ano: parseInt(ano),
          tipo: 'FNDE',
          programa: 'Fundo Nacional de Desenvolvimento da Educação',
          valor: dadosAno.fnde.valor || 0,
          quantidade_beneficiarios: 0
        });
      }

      // Salvar FNS
      if (dadosAno.fns) {
        await upsertTransferencia({
          municipio_codigo: codigoIbge,
          municipio_nome: municipio,
          ano: parseInt(ano),
          tipo: 'FNS',
          programa: 'Fundo Nacional de Saúde',
          valor: dadosAno.fns.valor || 0,
          quantidade_beneficiarios: 0
        });
      }

      // Salvar total de convênios do ano
      if (dadosAno.convenios) {
        await upsertTransferencia({
          municipio_codigo: codigoIbge,
          municipio_nome: municipio,
          ano: parseInt(ano),
          tipo: 'CONVENIOS',
          programa: 'Convênios Federais',
          valor: dadosAno.convenios.valor || 0,
          quantidade_beneficiarios: dadosAno.convenios.quantidade || 0
        });
      }
    }

    // Salvar convênios detalhados
    if (dados.convenios && dados.convenios.lista) {
      for (const convenio of dados.convenios.lista) {
        await upsertConvenio({
          municipio_codigo: codigoIbge,
          municipio_nome: municipio,
          numero_convenio: convenio.numero,
          ano: convenio.dataInicio ? new Date(convenio.dataInicio).getFullYear() : 2024,
          orgao_superior: convenio.orgao,
          orgao_concedente: convenio.orgao,
          objeto: convenio.objeto,
          valor_convenio: convenio.valorTotal || 0,
          valor_liberado: convenio.valorLiberado || 0,
          situacao: convenio.situacao,
          data_inicio: convenio.dataInicio,
          data_fim: convenio.dataFim
        });
      }
    }

    return true;
  } catch (error) {
    console.error(`Erro ao salvar dados de ${municipio}:`, error);
    return false;
  }
}

/**
 * Insere ou atualiza uma transferência
 */
async function upsertTransferencia(dados) {
  const { error } = await supabase
    .from('transferencias_federais')
    .upsert(dados, {
      onConflict: 'municipio_codigo,ano,tipo,programa'
    });

  if (error) {
    console.error('Erro ao salvar transferência:', error);
    throw error;
  }
}

/**
 * Insere ou atualiza um convênio
 */
async function upsertConvenio(dados) {
  // Verificar se já existe
  const { data: existente } = await supabase
    .from('convenios_federais')
    .select('id')
    .eq('municipio_codigo', dados.municipio_codigo)
    .eq('numero_convenio', dados.numero_convenio)
    .single();

  if (existente) {
    // Atualizar
    const { error } = await supabase
      .from('convenios_federais')
      .update(dados)
      .eq('id', existente.id);

    if (error) throw error;
  } else {
    // Inserir
    const { error } = await supabase
      .from('convenios_federais')
      .insert(dados);

    if (error) throw error;
  }
}

/**
 * Busca dados de transferências de um município do Supabase
 */
export async function buscarTransferenciasMunicipio(codigoIbge) {
  try {
    // Buscar transferências
    const { data: transferencias, error: errTransf } = await supabase
      .from('transferencias_federais')
      .select('*')
      .eq('municipio_codigo', codigoIbge)
      .order('ano', { ascending: false });

    if (errTransf) throw errTransf;

    // Buscar convênios
    const { data: convenios, error: errConv } = await supabase
      .from('convenios_federais')
      .select('*')
      .eq('municipio_codigo', codigoIbge)
      .order('ano', { ascending: false });

    if (errConv) throw errConv;

    // Organizar dados por ano
    const dadosPorAno = {};
    const anos = getAnosDisponiveis();

    for (const ano of anos) {
      const transfAno = transferencias?.filter(t => t.ano === ano) || [];
      
      dadosPorAno[ano] = {
        bolsaFamilia: transfAno.find(t => t.tipo === 'BOLSA_FAMILIA') || { valor: 0, quantidade_beneficiarios: 0 },
        bpc: transfAno.find(t => t.tipo === 'BPC') || { valor: 0, quantidade_beneficiarios: 0 },
        fnde: transfAno.find(t => t.tipo === 'FNDE') || { valor: 0 },
        fns: transfAno.find(t => t.tipo === 'FNS') || { valor: 0 },
        convenios: transfAno.find(t => t.tipo === 'CONVENIOS') || { valor: 0, quantidade_beneficiarios: 0 }
      };
    }

    return {
      transferencias,
      convenios,
      dadosPorAno,
      dataAtualizacao: transferencias?.[0]?.data_atualizacao
    };
  } catch (error) {
    console.error('Erro ao buscar dados do Supabase:', error);
    return null;
  }
}

/**
 * Verifica se os dados de um município precisam ser atualizados
 */
export async function precisaAtualizar(codigoIbge) {
  try {
    const { data, error } = await supabase
      .from('transferencias_federais')
      .select('data_atualizacao')
      .eq('municipio_codigo', codigoIbge)
      .order('data_atualizacao', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) return true;

    // Atualizar se os dados tiverem mais de 24 horas
    const ultimaAtualizacao = new Date(data.data_atualizacao);
    const agora = new Date();
    const diferencaHoras = (agora - ultimaAtualizacao) / (1000 * 60 * 60);

    return diferencaHoras > 24;
  } catch (error) {
    return true;
  }
}

/**
 * Busca dados de um município (do Supabase ou da API)
 */
export async function getDadosMunicipio(municipio, forcarAtualizacao = false) {
  const municipios = getMunicipiosRO();
  
  // Encontrar código IBGE
  let codigoIbge = null;
  const municipioNormalizado = municipio.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  for (const [nome, codigo] of Object.entries(municipios)) {
    const nomeNormalizado = nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (nomeNormalizado === municipioNormalizado) {
      codigoIbge = codigo;
      break;
    }
  }

  if (!codigoIbge) {
    console.error('Município não encontrado:', municipio);
    return null;
  }

  // Verificar se precisa atualizar
  const atualizar = forcarAtualizacao || await precisaAtualizar(codigoIbge);

  if (atualizar) {
    // Buscar da API
    const dadosAPI = await getDadosCompletosMunicipio(municipio);
    
    if (dadosAPI) {
      // Salvar no Supabase
      await salvarTransferenciasMunicipio(dadosAPI);
      return dadosAPI;
    }
  }

  // Buscar do Supabase
  const dadosCache = await buscarTransferenciasMunicipio(codigoIbge);
  
  if (dadosCache && dadosCache.transferencias?.length > 0) {
    return {
      municipio,
      codigoIbge,
      dadosReais: true,
      dadosPorAno: dadosCache.dadosPorAno,
      convenios: {
        lista: dadosCache.convenios || [],
        quantidade: dadosCache.convenios?.length || 0
      },
      dataAtualizacao: dadosCache.dataAtualizacao,
      fonteCache: true
    };
  }

  // Se não tem cache, buscar da API
  return await getDadosCompletosMunicipio(municipio);
}

/**
 * Sincroniza dados de todos os municípios
 */
export async function sincronizarTodosMunicipios(progressCallback = null) {
  const municipios = Object.keys(getMunicipiosRO());
  const resultados = { sucesso: 0, erro: 0, municipios: [] };

  for (let i = 0; i < municipios.length; i++) {
    const municipio = municipios[i];
    
    if (progressCallback) {
      progressCallback({
        atual: i + 1,
        total: municipios.length,
        municipio,
        percentual: Math.round(((i + 1) / municipios.length) * 100)
      });
    }

    try {
      const dados = await getDadosCompletosMunicipio(municipio);
      
      if (dados) {
        await salvarTransferenciasMunicipio(dados);
        resultados.sucesso++;
        resultados.municipios.push({ municipio, status: 'sucesso' });
      } else {
        resultados.erro++;
        resultados.municipios.push({ municipio, status: 'erro', motivo: 'Dados não encontrados' });
      }

      // Delay para não sobrecarregar a API
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      resultados.erro++;
      resultados.municipios.push({ municipio, status: 'erro', motivo: error.message });
    }
  }

  return resultados;
}

/**
 * Busca estatísticas gerais de todos os municípios
 */
export async function getEstatisticasGerais() {
  try {
    const { data, error } = await supabase
      .from('transferencias_federais')
      .select('tipo, ano, valor')
      .eq('ano', 2024);

    if (error) throw error;

    // Calcular totais por tipo
    const totais = {};
    data?.forEach(item => {
      if (!totais[item.tipo]) {
        totais[item.tipo] = 0;
      }
      totais[item.tipo] += parseFloat(item.valor) || 0;
    });

    return {
      ano: 2024,
      totais,
      quantidadeMunicipios: new Set(data?.map(d => d.municipio_codigo)).size
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return null;
  }
}

export default {
  salvarTransferenciasMunicipio,
  buscarTransferenciasMunicipio,
  getDadosMunicipio,
  sincronizarTodosMunicipios,
  getEstatisticasGerais,
  precisaAtualizar
};

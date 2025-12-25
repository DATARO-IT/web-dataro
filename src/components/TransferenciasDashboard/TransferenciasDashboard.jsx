import React, { useState, useEffect } from 'react';
import { getDadosCompletosMunicipio, MUNICIPIOS_RO } from '../../services/portalTransparenciaAPI';
import { 
  getMockTransferencias, 
  getMockBeneficiosSociais, 
  getMockConvenios 
} from '../../services/portalTransparenciaService';
import { 
  getMockProgramasDisponiveis, 
  getMockEmendasRO 
} from '../../services/transferegovService';
import './TransferenciasDashboard.css';

const TransferenciasDashboard = ({ municipio, onClose }) => {
  const [activeTab, setActiveTab] = useState('resumo');
  const [dados, setDados] = useState(null);
  const [beneficios, setBeneficios] = useState(null);
  const [convenios, setConvenios] = useState(null);
  const [programas, setProgramas] = useState([]);
  const [emendas, setEmendas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usandoDadosReais, setUsandoDadosReais] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    carregarDados();
  }, [municipio]);

  const carregarDados = async () => {
    setLoading(true);
    setErro(null);
    
    try {
      // Tentar buscar dados reais da API do Portal da Transparência
      console.log('Buscando dados reais para:', municipio);
      const dadosReais = await getDadosCompletosMunicipio(municipio);
      
      if (dadosReais && dadosReais.dadosReais) {
        console.log('Dados reais obtidos com sucesso!');
        setDados(dadosReais);
        setUsandoDadosReais(true);
        
        // Usar dados reais de convênios se disponíveis
        if (dadosReais.convenios && dadosReais.convenios.lista) {
          setConvenios({
            municipio,
            codigoIbge: dadosReais.codigoIbge,
            totalConvenios: dadosReais.convenios.ativos,
            valorTotalConvenios: dadosReais.convenios.valorTotal,
            convenios: dadosReais.convenios.lista
          });
        } else {
          setConvenios(getMockConvenios(municipio));
        }
      } else {
        // Fallback para dados mockados se a API falhar
        console.log('Usando dados mockados como fallback');
        setDados(getMockTransferencias(municipio));
        setConvenios(getMockConvenios(municipio));
        setUsandoDadosReais(false);
      }
      
      // Dados de benefícios (ainda mockados - requer API específica)
      setBeneficios(getMockBeneficiosSociais(municipio));
      
      // Programas disponíveis (dados estáticos)
      setProgramas(getMockProgramasDisponiveis());
      
      // Emendas (ainda mockadas - requer processamento adicional)
      setEmendas(getMockEmendasRO());
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setErro('Erro ao carregar dados. Usando dados de demonstração.');
      
      // Fallback para dados mockados
      setDados(getMockTransferencias(municipio));
      setBeneficios(getMockBeneficiosSociais(municipio));
      setConvenios(getMockConvenios(municipio));
      setProgramas(getMockProgramasDisponiveis());
      setEmendas(getMockEmendasRO());
      setUsandoDadosReais(false);
    } finally {
      setLoading(false);
    }
  };

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(valor || 0);
  };

  const formatarNumero = (numero) => {
    return new Intl.NumberFormat('pt-BR').format(numero || 0);
  };

  if (loading) {
    return (
      <div className="transferencias-dashboard">
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Carregando dados de transferências...</p>
          <small>Consultando Portal da Transparência...</small>
        </div>
      </div>
    );
  }

  return (
    <div className="transferencias-dashboard">
      <div className="dashboard-header">
        <div className="header-info">
          <h2>📊 Painel de Transferências Federais</h2>
          <p className="municipio-nome">{municipio}</p>
          <span className="codigo-ibge">IBGE: {MUNICIPIOS_RO[municipio]}</span>
          {usandoDadosReais ? (
            <span className="badge-dados-reais">✅ Dados Reais - Portal da Transparência</span>
          ) : (
            <span className="badge-dados-demo">⚠️ Dados de Demonstração</span>
          )}
        </div>
        <button className="btn-close" onClick={onClose}>✕</button>
      </div>

      {erro && (
        <div className="erro-banner">
          <span>⚠️ {erro}</span>
        </div>
      )}

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'resumo' ? 'active' : ''}`}
          onClick={() => setActiveTab('resumo')}
        >
          📈 Resumo
        </button>
        <button 
          className={`tab ${activeTab === 'beneficios' ? 'active' : ''}`}
          onClick={() => setActiveTab('beneficios')}
        >
          👥 Benefícios Sociais
        </button>
        <button 
          className={`tab ${activeTab === 'convenios' ? 'active' : ''}`}
          onClick={() => setActiveTab('convenios')}
        >
          📋 Convênios
        </button>
        <button 
          className={`tab ${activeTab === 'programas' ? 'active' : ''}`}
          onClick={() => setActiveTab('programas')}
        >
          🎯 Programas Disponíveis
        </button>
        <button 
          className={`tab ${activeTab === 'emendas' ? 'active' : ''}`}
          onClick={() => setActiveTab('emendas')}
        >
          🏛️ Emendas Parlamentares
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'resumo' && dados && (
          <div className="tab-content resumo">
            <div className="cards-grid">
              <div className="card card-bolsa-familia">
                <div className="card-icon">👨‍👩‍👧‍👦</div>
                <div className="card-info">
                  <h3>Bolsa Família</h3>
                  <p className="valor">{formatarMoeda(dados.transferencias?.bolsaFamilia?.valor)}</p>
                  <span className="detalhe">{formatarNumero(dados.transferencias?.bolsaFamilia?.beneficiarios)} beneficiários</span>
                  {dados.transferencias?.bolsaFamilia?.variacao && (
                    <span className={`variacao ${parseFloat(dados.transferencias.bolsaFamilia.variacao) >= 0 ? 'positiva' : 'negativa'}`}>
                      {parseFloat(dados.transferencias.bolsaFamilia.variacao) >= 0 ? '↑' : '↓'} {dados.transferencias.bolsaFamilia.variacao}%
                    </span>
                  )}
                </div>
              </div>

              <div className="card card-bpc">
                <div className="card-icon">🧓</div>
                <div className="card-info">
                  <h3>BPC</h3>
                  <p className="valor">{formatarMoeda(dados.transferencias?.bpc?.valor)}</p>
                  <span className="detalhe">{formatarNumero(dados.transferencias?.bpc?.beneficiarios)} beneficiários</span>
                  {dados.transferencias?.bpc?.variacao && (
                    <span className={`variacao ${parseFloat(dados.transferencias.bpc.variacao) >= 0 ? 'positiva' : 'negativa'}`}>
                      {parseFloat(dados.transferencias.bpc.variacao) >= 0 ? '↑' : '↓'} {dados.transferencias.bpc.variacao}%
                    </span>
                  )}
                </div>
              </div>

              <div className="card card-fnde">
                <div className="card-icon">📚</div>
                <div className="card-info">
                  <h3>FNDE (Educação)</h3>
                  <p className="valor">{formatarMoeda(dados.transferencias?.fnde?.valor)}</p>
                  <span className="detalhe">{dados.transferencias?.fnde?.programas?.join(', ') || 'PDDE, PNAE, PNATE'}</span>
                  {dados.transferencias?.fnde?.variacao && (
                    <span className={`variacao ${parseFloat(dados.transferencias.fnde.variacao) >= 0 ? 'positiva' : 'negativa'}`}>
                      {parseFloat(dados.transferencias.fnde.variacao) >= 0 ? '↑' : '↓'} {dados.transferencias.fnde.variacao}%
                    </span>
                  )}
                </div>
              </div>

              <div className="card card-fns">
                <div className="card-icon">🏥</div>
                <div className="card-info">
                  <h3>FNS (Saúde)</h3>
                  <p className="valor">{formatarMoeda(dados.transferencias?.fns?.valor)}</p>
                  <span className="detalhe">{dados.transferencias?.fns?.programas?.join(', ') || 'PAB, MAC, ESF'}</span>
                  {dados.transferencias?.fns?.variacao && (
                    <span className={`variacao ${parseFloat(dados.transferencias.fns.variacao) >= 0 ? 'positiva' : 'negativa'}`}>
                      {parseFloat(dados.transferencias.fns.variacao) >= 0 ? '↑' : '↓'} {dados.transferencias.fns.variacao}%
                    </span>
                  )}
                </div>
              </div>

              <div className="card card-convenios">
                <div className="card-icon">📝</div>
                <div className="card-info">
                  <h3>Convênios</h3>
                  <p className="valor">{formatarMoeda(dados.convenios?.valorTotal)}</p>
                  <span className="detalhe">{dados.convenios?.ativos || 0} ativos ({dados.convenios?.emExecucao || 0} em execução)</span>
                </div>
              </div>

              <div className="card card-emendas">
                <div className="card-icon">🏛️</div>
                <div className="card-info">
                  <h3>Emendas Parlamentares</h3>
                  <p className="valor">{formatarMoeda(dados.emendas?.valorTotal)}</p>
                  <span className="detalhe">{dados.emendas?.quantidade || 0} emendas</span>
                  {dados.emendas?.valorTotal > 0 && (
                    <>
                      <div className="barra-progresso">
                        <div className="progresso empenhado" style={{width: `${(dados.emendas.empenhado / dados.emendas.valorTotal) * 100}%`}}></div>
                        <div className="progresso pago" style={{width: `${(dados.emendas.pago / dados.emendas.valorTotal) * 100}%`}}></div>
                      </div>
                      <span className="legenda-barra">Pago: {formatarMoeda(dados.emendas.pago)}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="total-geral">
              <h3>Total de Transferências Federais ({dados.periodo || '2024'})</h3>
              <p className="valor-total">
                {formatarMoeda(
                  (dados.transferencias?.bolsaFamilia?.valor || 0) +
                  (dados.transferencias?.bpc?.valor || 0) +
                  (dados.transferencias?.fnde?.valor || 0) +
                  (dados.transferencias?.fns?.valor || 0) +
                  (dados.convenios?.valorTotal || 0) +
                  (dados.emendas?.valorTotal || 0)
                )}
              </p>
              {usandoDadosReais && (
                <p className="fonte-dados">Fonte: Portal da Transparência do Governo Federal</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'beneficios' && beneficios && (
          <div className="tab-content beneficios">
            <div className="info-populacao">
              <h3>População Estimada</h3>
              <p className="valor-grande">{formatarNumero(beneficios.populacaoEstimada)}</p>
            </div>

            <div className="beneficios-grid">
              <div className="beneficio-card">
                <h4>👨‍👩‍👧‍👦 Bolsa Família</h4>
                <div className="beneficio-dados">
                  <div className="dado">
                    <span className="label">Famílias Beneficiárias</span>
                    <span className="valor">{formatarNumero(beneficios.beneficios?.bolsaFamilia?.familias)}</span>
                  </div>
                  <div className="dado">
                    <span className="label">Valor Médio</span>
                    <span className="valor">{formatarMoeda(beneficios.beneficios?.bolsaFamilia?.valorMedio)}</span>
                  </div>
                  <div className="dado">
                    <span className="label">Cobertura</span>
                    <span className="valor">{beneficios.beneficios?.bolsaFamilia?.cobertura}</span>
                  </div>
                </div>
              </div>

              <div className="beneficio-card">
                <h4>🧓 BPC - Benefício de Prestação Continuada</h4>
                <div className="beneficio-dados">
                  <div className="dado">
                    <span className="label">Idosos (65+)</span>
                    <span className="valor">{formatarNumero(beneficios.beneficios?.bpc?.idosos)}</span>
                  </div>
                  <div className="dado">
                    <span className="label">PCD</span>
                    <span className="valor">{formatarNumero(beneficios.beneficios?.bpc?.pcd)}</span>
                  </div>
                  <div className="dado">
                    <span className="label">Valor do Benefício</span>
                    <span className="valor">{formatarMoeda(beneficios.beneficios?.bpc?.valorBeneficio)}</span>
                  </div>
                </div>
              </div>

              <div className="beneficio-card">
                <h4>📋 Cadastro Único</h4>
                <div className="beneficio-dados">
                  <div className="dado">
                    <span className="label">Famílias Cadastradas</span>
                    <span className="valor">{formatarNumero(beneficios.beneficios?.cadastroUnico?.familias)}</span>
                  </div>
                  <div className="dado">
                    <span className="label">Última Atualização</span>
                    <span className="valor">{beneficios.beneficios?.cadastroUnico?.atualizacao}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'convenios' && convenios && (
          <div className="tab-content convenios">
            <div className="convenios-resumo">
              <div className="resumo-item">
                <span className="numero">{convenios.totalConvenios || 0}</span>
                <span className="label">Total de Convênios</span>
              </div>
              <div className="resumo-item">
                <span className="numero">{formatarMoeda(convenios.valorTotalConvenios)}</span>
                <span className="label">Valor Total</span>
              </div>
            </div>

            <div className="convenios-lista">
              <h4>Lista de Convênios</h4>
              {convenios.convenios && convenios.convenios.length > 0 ? (
                <table className="tabela-convenios">
                  <thead>
                    <tr>
                      <th>Número</th>
                      <th>Órgão</th>
                      <th>Objeto</th>
                      <th>Valor</th>
                      <th>Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {convenios.convenios.map((conv, index) => (
                      <tr key={index}>
                        <td>{conv.numero}</td>
                        <td>{conv.ministerio || conv.orgao}</td>
                        <td className="objeto">{conv.objeto}</td>
                        <td>{formatarMoeda(conv.valorTotal)}</td>
                        <td>
                          <span className={`status-badge ${conv.situacao?.toLowerCase().replace(/\s/g, '-')}`}>
                            {conv.situacao}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="sem-dados">Nenhum convênio encontrado para este município.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'programas' && (
          <div className="tab-content programas">
            <h4>🎯 Programas Federais Disponíveis para Adesão</h4>
            <div className="programas-grid">
              {programas.map((programa, index) => (
                <div key={index} className="programa-card">
                  <div className="programa-header">
                    <span className="ministerio">{programa.ministerio}</span>
                    <span className={`status ${programa.status?.toLowerCase()}`}>{programa.status}</span>
                  </div>
                  <h5>{programa.nome}</h5>
                  <p className="descricao">{programa.descricao}</p>
                  <div className="programa-info">
                    <span className="valor-disponivel">💰 {formatarMoeda(programa.valorDisponivel)}</span>
                    <span className="prazo">📅 Prazo: {programa.prazo}</span>
                  </div>
                  <a href={programa.link} target="_blank" rel="noopener noreferrer" className="btn-acessar">
                    Acessar Programa →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'emendas' && emendas && (
          <div className="tab-content emendas">
            <h4>🏛️ Emendas Parlamentares para Rondônia</h4>
            <div className="emendas-resumo">
              <div className="resumo-item">
                <span className="numero">{emendas.totalEmendas || 0}</span>
                <span className="label">Total de Emendas</span>
              </div>
              <div className="resumo-item">
                <span className="numero">{formatarMoeda(emendas.valorTotal)}</span>
                <span className="label">Valor Total</span>
              </div>
              <div className="resumo-item">
                <span className="numero">{formatarMoeda(emendas.valorPago)}</span>
                <span className="label">Valor Pago</span>
              </div>
            </div>

            <div className="emendas-lista">
              <h5>Emendas por Parlamentar</h5>
              {emendas.emendas && emendas.emendas.length > 0 ? (
                <table className="tabela-emendas">
                  <thead>
                    <tr>
                      <th>Parlamentar</th>
                      <th>Partido</th>
                      <th>Tipo</th>
                      <th>Valor</th>
                      <th>Situação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emendas.emendas.map((emenda, index) => (
                      <tr key={index}>
                        <td>{emenda.autor}</td>
                        <td>{emenda.partido}</td>
                        <td>{emenda.tipo}</td>
                        <td>{formatarMoeda(emenda.valor)}</td>
                        <td>
                          <span className={`status-badge ${emenda.situacao?.toLowerCase().replace(/\s/g, '-')}`}>
                            {emenda.situacao}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="sem-dados">Nenhuma emenda encontrada.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferenciasDashboard;

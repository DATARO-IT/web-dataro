import React, { useState, useEffect } from 'react';
import { 
  getMockTransferencias, 
  getMockBeneficiosSociais, 
  getMockConvenios,
  getResumoTransferenciasRO,
  MUNICIPIOS_RO 
} from '../../services/portalTransparenciaService';
import { 
  getMockProgramasDisponiveis, 
  getMockTransferenciasEspeciaisRO,
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

  useEffect(() => {
    carregarDados();
  }, [municipio]);

  const carregarDados = async () => {
    setLoading(true);
    try {
      // Carregar dados mockados (substituir por API real quando disponível)
      const dadosTransferencias = getMockTransferencias(municipio);
      const dadosBeneficios = getMockBeneficiosSociais(municipio);
      const dadosConvenios = getMockConvenios(municipio);
      const programasDisponiveis = getMockProgramasDisponiveis();
      const emendasRO = getMockEmendasRO();

      setDados(dadosTransferencias);
      setBeneficios(dadosBeneficios);
      setConvenios(dadosConvenios);
      setProgramas(programasDisponiveis);
      setEmendas(emendasRO);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
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
    }).format(valor);
  };

  const formatarNumero = (numero) => {
    return new Intl.NumberFormat('pt-BR').format(numero);
  };

  if (loading) {
    return (
      <div className="transferencias-dashboard">
        <div className="dashboard-loading">
          <div className="spinner"></div>
          <p>Carregando dados de transferências...</p>
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
        </div>
        <button className="btn-close" onClick={onClose}>✕</button>
      </div>

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
                  <p className="valor">{formatarMoeda(dados.transferencias.bolsaFamilia.valor)}</p>
                  <span className="detalhe">{formatarNumero(dados.transferencias.bolsaFamilia.beneficiarios)} beneficiários</span>
                  <span className={`variacao ${parseFloat(dados.transferencias.bolsaFamilia.variacao) >= 0 ? 'positiva' : 'negativa'}`}>
                    {parseFloat(dados.transferencias.bolsaFamilia.variacao) >= 0 ? '↑' : '↓'} {dados.transferencias.bolsaFamilia.variacao}%
                  </span>
                </div>
              </div>

              <div className="card card-bpc">
                <div className="card-icon">🧓</div>
                <div className="card-info">
                  <h3>BPC</h3>
                  <p className="valor">{formatarMoeda(dados.transferencias.bpc.valor)}</p>
                  <span className="detalhe">{formatarNumero(dados.transferencias.bpc.beneficiarios)} beneficiários</span>
                  <span className={`variacao ${parseFloat(dados.transferencias.bpc.variacao) >= 0 ? 'positiva' : 'negativa'}`}>
                    {parseFloat(dados.transferencias.bpc.variacao) >= 0 ? '↑' : '↓'} {dados.transferencias.bpc.variacao}%
                  </span>
                </div>
              </div>

              <div className="card card-fnde">
                <div className="card-icon">📚</div>
                <div className="card-info">
                  <h3>FNDE (Educação)</h3>
                  <p className="valor">{formatarMoeda(dados.transferencias.fnde.valor)}</p>
                  <span className="detalhe">{dados.transferencias.fnde.programas.join(', ')}</span>
                  <span className={`variacao ${parseFloat(dados.transferencias.fnde.variacao) >= 0 ? 'positiva' : 'negativa'}`}>
                    {parseFloat(dados.transferencias.fnde.variacao) >= 0 ? '↑' : '↓'} {dados.transferencias.fnde.variacao}%
                  </span>
                </div>
              </div>

              <div className="card card-fns">
                <div className="card-icon">🏥</div>
                <div className="card-info">
                  <h3>FNS (Saúde)</h3>
                  <p className="valor">{formatarMoeda(dados.transferencias.fns.valor)}</p>
                  <span className="detalhe">{dados.transferencias.fns.programas.join(', ')}</span>
                  <span className={`variacao ${parseFloat(dados.transferencias.fns.variacao) >= 0 ? 'positiva' : 'negativa'}`}>
                    {parseFloat(dados.transferencias.fns.variacao) >= 0 ? '↑' : '↓'} {dados.transferencias.fns.variacao}%
                  </span>
                </div>
              </div>

              <div className="card card-convenios">
                <div className="card-icon">📝</div>
                <div className="card-info">
                  <h3>Convênios</h3>
                  <p className="valor">{formatarMoeda(dados.convenios.valorTotal)}</p>
                  <span className="detalhe">{dados.convenios.ativos} ativos ({dados.convenios.emExecucao} em execução)</span>
                </div>
              </div>

              <div className="card card-emendas">
                <div className="card-icon">🏛️</div>
                <div className="card-info">
                  <h3>Emendas Parlamentares</h3>
                  <p className="valor">{formatarMoeda(dados.emendas.valorTotal)}</p>
                  <span className="detalhe">{dados.emendas.quantidade} emendas</span>
                  <div className="barra-progresso">
                    <div className="progresso empenhado" style={{width: `${(dados.emendas.empenhado / dados.emendas.valorTotal) * 100}%`}}></div>
                    <div className="progresso pago" style={{width: `${(dados.emendas.pago / dados.emendas.valorTotal) * 100}%`}}></div>
                  </div>
                  <span className="legenda-barra">Pago: {formatarMoeda(dados.emendas.pago)}</span>
                </div>
              </div>
            </div>

            <div className="total-geral">
              <h3>Total de Transferências Federais (2024)</h3>
              <p className="valor-total">
                {formatarMoeda(
                  dados.transferencias.bolsaFamilia.valor +
                  dados.transferencias.bpc.valor +
                  dados.transferencias.fnde.valor +
                  dados.transferencias.fns.valor +
                  dados.convenios.valorTotal +
                  dados.emendas.valorTotal
                )}
              </p>
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
                    <span className="valor">{formatarNumero(beneficios.beneficios.bolsaFamilia.familias)}</span>
                  </div>
                  <div className="dado">
                    <span className="label">Valor Médio</span>
                    <span className="valor">{formatarMoeda(beneficios.beneficios.bolsaFamilia.valorMedio)}</span>
                  </div>
                  <div className="dado">
                    <span className="label">Cobertura</span>
                    <span className="valor">{beneficios.beneficios.bolsaFamilia.cobertura}</span>
                  </div>
                </div>
              </div>

              <div className="beneficio-card">
                <h4>🧓 BPC - Benefício de Prestação Continuada</h4>
                <div className="beneficio-dados">
                  <div className="dado">
                    <span className="label">Idosos (65+)</span>
                    <span className="valor">{formatarNumero(beneficios.beneficios.bpc.idosos)}</span>
                  </div>
                  <div className="dado">
                    <span className="label">PCD</span>
                    <span className="valor">{formatarNumero(beneficios.beneficios.bpc.pcd)}</span>
                  </div>
                  <div className="dado">
                    <span className="label">Valor do Benefício</span>
                    <span className="valor">{formatarMoeda(beneficios.beneficios.bpc.valorBeneficio)}</span>
                  </div>
                </div>
              </div>

              <div className="beneficio-card">
                <h4>📋 Cadastro Único</h4>
                <div className="beneficio-dados">
                  <div className="dado">
                    <span className="label">Famílias Cadastradas</span>
                    <span className="valor">{formatarNumero(beneficios.beneficios.cadastroUnico.familias)}</span>
                  </div>
                  <div className="dado">
                    <span className="label">Última Atualização</span>
                    <span className="valor">{beneficios.beneficios.cadastroUnico.atualizacao}</span>
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
                <span className="numero">{convenios.totalConvenios}</span>
                <span className="label">Convênios</span>
              </div>
              <div className="resumo-item">
                <span className="numero">{formatarMoeda(convenios.valorTotalConvenios)}</span>
                <span className="label">Valor Total</span>
              </div>
            </div>

            <div className="convenios-lista">
              <h4>Lista de Convênios</h4>
              <table className="tabela-convenios">
                <thead>
                  <tr>
                    <th>Número</th>
                    <th>Ministério</th>
                    <th>Objeto</th>
                    <th>Valor</th>
                    <th>Situação</th>
                  </tr>
                </thead>
                <tbody>
                  {convenios.convenios.map((conv, index) => (
                    <tr key={index}>
                      <td>{conv.numero}</td>
                      <td><span className={`tag tag-${conv.ministerio.toLowerCase()}`}>{conv.ministerio}</span></td>
                      <td>{conv.objeto}</td>
                      <td>{formatarMoeda(conv.valorTotal)}</td>
                      <td><span className={`status status-${conv.situacao.toLowerCase().replace(/ /g, '-')}`}>{conv.situacao}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'programas' && (
          <div className="tab-content programas">
            <h3>🎯 Programas Federais Disponíveis para Adesão</h3>
            <p className="subtitulo">Oportunidades de captação de recursos para o município</p>

            <div className="programas-lista">
              {programas.map((programa, index) => (
                <div key={index} className="programa-card">
                  <div className="programa-header">
                    <span className={`tag-ministerio tag-${programa.sigla.toLowerCase()}`}>{programa.sigla}</span>
                    <span className={`status-programa ${programa.situacao.toLowerCase()}`}>{programa.situacao}</span>
                  </div>
                  <h4>{programa.nome}</h4>
                  <p className="ministerio">{programa.ministerio}</p>
                  <div className="programa-info">
                    <div className="info-item">
                      <span className="label">Valor Disponível</span>
                      <span className="valor">{formatarMoeda(programa.valorDisponivel)}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Prazo de Inscrição</span>
                      <span className="valor">{new Date(programa.prazoInscricao).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  <p className="publico-alvo"><strong>Público-alvo:</strong> {programa.publicoAlvo}</p>
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
            <div className="emendas-resumo">
              <div className="resumo-card">
                <h4>Total de Emendas (RO)</h4>
                <p className="valor-grande">{formatarMoeda(emendas.valorTotal)}</p>
                <span className="detalhe">{emendas.totalEmendas} emendas em 2024</span>
              </div>
              <div className="resumo-card">
                <h4>Valor Empenhado</h4>
                <p className="valor-grande">{formatarMoeda(emendas.valorEmpenhado)}</p>
                <span className="percentual">{((emendas.valorEmpenhado / emendas.valorTotal) * 100).toFixed(1)}%</span>
              </div>
              <div className="resumo-card">
                <h4>Valor Pago</h4>
                <p className="valor-grande">{formatarMoeda(emendas.valorPago)}</p>
                <span className="percentual">{((emendas.valorPago / emendas.valorTotal) * 100).toFixed(1)}%</span>
              </div>
            </div>

            <div className="emendas-lista">
              <h4>Emendas para {municipio}</h4>
              <table className="tabela-emendas">
                <thead>
                  <tr>
                    <th>Parlamentar</th>
                    <th>Tipo</th>
                    <th>Objeto</th>
                    <th>Valor</th>
                    <th>Situação</th>
                  </tr>
                </thead>
                <tbody>
                  {emendas.emendas
                    .filter(e => e.municipio === municipio || Math.random() > 0.7)
                    .slice(0, 10)
                    .map((emenda, index) => (
                      <tr key={index}>
                        <td>
                          <div className="parlamentar-info">
                            <span className="nome">{emenda.parlamentar}</span>
                            <span className="partido">{emenda.partido}</span>
                          </div>
                        </td>
                        <td><span className={`tipo-emenda tipo-${emenda.tipo.toLowerCase()}`}>{emenda.tipo}</span></td>
                        <td>{emenda.objeto}</td>
                        <td>{formatarMoeda(emenda.valor)}</td>
                        <td><span className={`status-emenda status-${emenda.situacao.toLowerCase()}`}>{emenda.situacao}</span></td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="dashboard-footer">
        <p className="fonte">Fonte: Portal da Transparência / TransfereGov (Dados demonstrativos)</p>
        <p className="atualizacao">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
      </div>
    </div>
  );
};

export default TransferenciasDashboard;

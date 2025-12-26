import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import './Anotacoes.css';

const MAX_ANOTACOES = 15;
const MAX_CARACTERES = 500;

const Anotacoes = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [anotacoes, setAnotacoes] = useState([]);
  const [novaAnotacao, setNovaAnotacao] = useState('');
  const [editando, setEditando] = useState(null);
  const [textoEditando, setTextoEditando] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && user) {
      carregarAnotacoes();
    }
  }, [isOpen, user]);

  const carregarAnotacoes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('anotacoes')
        .select('*')
        .eq('usuario_id', user.id)
        .order('numero', { ascending: true });

      if (error) throw error;
      setAnotacoes(data || []);
    } catch (err) {
      setError('Erro ao carregar anotações');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const adicionarAnotacao = async () => {
    if (!novaAnotacao.trim()) {
      setError('Digite uma anotação');
      return;
    }

    if (novaAnotacao.length > MAX_CARACTERES) {
      setError(`Máximo de ${MAX_CARACTERES} caracteres`);
      return;
    }

    if (anotacoes.length >= MAX_ANOTACOES) {
      setError(`Limite de ${MAX_ANOTACOES} anotações atingido`);
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const proximoNumero = anotacoes.length > 0 
        ? Math.max(...anotacoes.map(a => a.numero)) + 1 
        : 1;

      const { data, error } = await supabase
        .from('anotacoes')
        .insert({
          usuario_id: user.id,
          numero: proximoNumero,
          conteudo: novaAnotacao.trim()
        })
        .select()
        .single();

      if (error) throw error;
      
      setAnotacoes([...anotacoes, data]);
      setNovaAnotacao('');
    } catch (err) {
      setError('Erro ao salvar anotação');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const editarAnotacao = async (id) => {
    if (!textoEditando.trim()) {
      setError('Digite uma anotação');
      return;
    }

    if (textoEditando.length > MAX_CARACTERES) {
      setError(`Máximo de ${MAX_CARACTERES} caracteres`);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const { error } = await supabase
        .from('anotacoes')
        .update({ 
          conteudo: textoEditando.trim(),
          data_atualizacao: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      setAnotacoes(anotacoes.map(a => 
        a.id === id ? { ...a, conteudo: textoEditando.trim() } : a
      ));
      setEditando(null);
      setTextoEditando('');
    } catch (err) {
      setError('Erro ao editar anotação');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const excluirAnotacao = async (id) => {
    if (!window.confirm('Deseja excluir esta anotação?')) return;

    try {
      setLoading(true);
      setError('');

      const { error } = await supabase
        .from('anotacoes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAnotacoes(anotacoes.filter(a => a.id !== id));
    } catch (err) {
      setError('Erro ao excluir anotação');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const iniciarEdicao = (anotacao) => {
    setEditando(anotacao.id);
    setTextoEditando(anotacao.conteudo);
  };

  const cancelarEdicao = () => {
    setEditando(null);
    setTextoEditando('');
  };

  if (!isOpen) return null;

  return (
    <div className="anotacoes-overlay" onClick={onClose}>
      <div className="anotacoes-container" onClick={e => e.stopPropagation()}>
        <div className="anotacoes-header">
          <h2>📝 Minhas Anotações</h2>
          <button className="anotacoes-close" onClick={onClose}>×</button>
        </div>

        <div className="anotacoes-info">
          <span>{anotacoes.length}/{MAX_ANOTACOES} anotações</span>
          <span>Máx. {MAX_CARACTERES} caracteres cada</span>
        </div>

        {error && <div className="anotacoes-error">{error}</div>}

        <div className="anotacoes-nova">
          <textarea
            value={novaAnotacao}
            onChange={(e) => setNovaAnotacao(e.target.value)}
            placeholder="Digite sua anotação..."
            maxLength={MAX_CARACTERES}
            disabled={loading || anotacoes.length >= MAX_ANOTACOES}
          />
          <div className="anotacoes-nova-footer">
            <span className={novaAnotacao.length > MAX_CARACTERES * 0.9 ? 'warning' : ''}>
              {novaAnotacao.length}/{MAX_CARACTERES}
            </span>
            <button 
              onClick={adicionarAnotacao} 
              disabled={loading || !novaAnotacao.trim() || anotacoes.length >= MAX_ANOTACOES}
            >
              {loading ? 'Salvando...' : '+ Adicionar'}
            </button>
          </div>
        </div>

        <div className="anotacoes-lista">
          {loading && anotacoes.length === 0 ? (
            <div className="anotacoes-loading">Carregando...</div>
          ) : anotacoes.length === 0 ? (
            <div className="anotacoes-vazio">Nenhuma anotação ainda</div>
          ) : (
            anotacoes.map((anotacao) => (
              <div key={anotacao.id} className="anotacao-item">
                <div className="anotacao-numero">#{anotacao.numero}</div>
                {editando === anotacao.id ? (
                  <div className="anotacao-editando">
                    <textarea
                      value={textoEditando}
                      onChange={(e) => setTextoEditando(e.target.value)}
                      maxLength={MAX_CARACTERES}
                    />
                    <div className="anotacao-editando-footer">
                      <span>{textoEditando.length}/{MAX_CARACTERES}</span>
                      <div className="anotacao-editando-buttons">
                        <button onClick={cancelarEdicao} className="btn-cancelar">
                          Cancelar
                        </button>
                        <button 
                          onClick={() => editarAnotacao(anotacao.id)} 
                          className="btn-salvar"
                          disabled={loading}
                        >
                          Salvar
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="anotacao-conteudo">{anotacao.conteudo}</div>
                    <div className="anotacao-acoes">
                      <button 
                        onClick={() => iniciarEdicao(anotacao)} 
                        className="btn-editar"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => excluirAnotacao(anotacao.id)} 
                        className="btn-excluir"
                        title="Excluir"
                      >
                        🗑️
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Anotacoes;

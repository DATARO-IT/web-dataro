-- Script para criar tabelas do módulo financeiro DATA-RO
-- Apenas super admins terão acesso a este módulo

-- Tabela de Categorias Financeiras
CREATE TABLE IF NOT EXISTS fin_categorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('receita', 'despesa')),
    descricao TEXT,
    cor VARCHAR(7) DEFAULT '#10b981',
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Contas Bancárias
CREATE TABLE IF NOT EXISTS fin_contas_bancarias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    banco VARCHAR(100),
    agencia VARCHAR(20),
    conta VARCHAR(30),
    tipo VARCHAR(30) CHECK (tipo IN ('corrente', 'poupanca', 'investimento', 'caixa')),
    saldo_inicial DECIMAL(15, 2) DEFAULT 0,
    saldo_atual DECIMAL(15, 2) DEFAULT 0,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Clientes/Fornecedores Financeiros
CREATE TABLE IF NOT EXISTS fin_entidades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('cliente', 'fornecedor', 'ambos')),
    nome VARCHAR(200) NOT NULL,
    documento VARCHAR(20), -- CPF ou CNPJ
    email VARCHAR(100),
    telefone VARCHAR(20),
    endereco TEXT,
    observacoes TEXT,
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Transações Financeiras (Pagamentos e Recebimentos)
CREATE TABLE IF NOT EXISTS fin_transacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('receita', 'despesa', 'transferencia')),
    descricao VARCHAR(300) NOT NULL,
    valor DECIMAL(15, 2) NOT NULL,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'pago', 'cancelado', 'atrasado')),
    categoria_id UUID REFERENCES fin_categorias(id),
    conta_id UUID REFERENCES fin_contas_bancarias(id),
    entidade_id UUID REFERENCES fin_entidades(id),
    forma_pagamento VARCHAR(50),
    numero_documento VARCHAR(100),
    observacoes TEXT,
    recorrente BOOLEAN DEFAULT FALSE,
    parcela_atual INTEGER,
    total_parcelas INTEGER,
    transacao_pai_id UUID REFERENCES fin_transacoes(id),
    created_by UUID REFERENCES admin_usuarios(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Notas Fiscais e Documentos
CREATE TABLE IF NOT EXISTS fin_documentos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transacao_id UUID REFERENCES fin_transacoes(id),
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('nota_fiscal', 'recibo', 'boleto', 'contrato', 'comprovante', 'outro')),
    numero VARCHAR(100),
    descricao VARCHAR(300),
    arquivo_nome VARCHAR(255) NOT NULL,
    arquivo_url TEXT NOT NULL,
    arquivo_tamanho INTEGER,
    arquivo_tipo VARCHAR(100),
    data_emissao DATE,
    valor DECIMAL(15, 2),
    created_by UUID REFERENCES admin_usuarios(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Centros de Custo
CREATE TABLE IF NOT EXISTS fin_centros_custo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    orcamento_mensal DECIMAL(15, 2),
    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Rateio por Centro de Custo
CREATE TABLE IF NOT EXISTS fin_rateio_centro_custo (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transacao_id UUID REFERENCES fin_transacoes(id) ON DELETE CASCADE,
    centro_custo_id UUID REFERENCES fin_centros_custo(id),
    percentual DECIMAL(5, 2) NOT NULL,
    valor DECIMAL(15, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Fluxo de Caixa Projetado
CREATE TABLE IF NOT EXISTS fin_fluxo_caixa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    data DATE NOT NULL,
    saldo_inicial DECIMAL(15, 2) NOT NULL,
    total_entradas DECIMAL(15, 2) DEFAULT 0,
    total_saidas DECIMAL(15, 2) DEFAULT 0,
    saldo_final DECIMAL(15, 2) NOT NULL,
    conta_id UUID REFERENCES fin_contas_bancarias(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Log de Ações Financeiras
CREATE TABLE IF NOT EXISTS fin_log_acoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES admin_usuarios(id),
    acao VARCHAR(50) NOT NULL,
    tabela VARCHAR(50) NOT NULL,
    registro_id UUID,
    dados_anteriores JSONB,
    dados_novos JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_fin_transacoes_tipo ON fin_transacoes(tipo);
CREATE INDEX IF NOT EXISTS idx_fin_transacoes_status ON fin_transacoes(status);
CREATE INDEX IF NOT EXISTS idx_fin_transacoes_data_vencimento ON fin_transacoes(data_vencimento);
CREATE INDEX IF NOT EXISTS idx_fin_transacoes_categoria ON fin_transacoes(categoria_id);
CREATE INDEX IF NOT EXISTS idx_fin_transacoes_conta ON fin_transacoes(conta_id);
CREATE INDEX IF NOT EXISTS idx_fin_documentos_transacao ON fin_documentos(transacao_id);
CREATE INDEX IF NOT EXISTS idx_fin_log_acoes_usuario ON fin_log_acoes(usuario_id);

-- Inserir categorias padrão
INSERT INTO fin_categorias (nome, tipo, descricao, cor) VALUES
-- Receitas
('Consultoria', 'receita', 'Serviços de consultoria em BI e dados', '#10b981'),
('Desenvolvimento', 'receita', 'Desenvolvimento de sistemas e dashboards', '#3b82f6'),
('Treinamentos', 'receita', 'Cursos e capacitações', '#8b5cf6'),
('Licenças', 'receita', 'Licenciamento de software', '#f59e0b'),
('Manutenção', 'receita', 'Contratos de manutenção', '#06b6d4'),
('Outros Recebimentos', 'receita', 'Outras receitas', '#6b7280'),
-- Despesas
('Salários', 'despesa', 'Folha de pagamento', '#ef4444'),
('Impostos', 'despesa', 'Tributos e taxas', '#dc2626'),
('Infraestrutura', 'despesa', 'Servidores, cloud, hospedagem', '#f97316'),
('Software', 'despesa', 'Licenças de software', '#eab308'),
('Marketing', 'despesa', 'Publicidade e marketing', '#ec4899'),
('Administrativo', 'despesa', 'Despesas administrativas gerais', '#64748b'),
('Viagens', 'despesa', 'Deslocamentos e hospedagens', '#14b8a6'),
('Equipamentos', 'despesa', 'Compra de equipamentos', '#a855f7'),
('Outros Pagamentos', 'despesa', 'Outras despesas', '#6b7280')
ON CONFLICT DO NOTHING;

-- Inserir conta padrão (Caixa)
INSERT INTO fin_contas_bancarias (nome, tipo, saldo_inicial, saldo_atual) VALUES
('Caixa Geral', 'caixa', 0, 0)
ON CONFLICT DO NOTHING;

-- Inserir centro de custo padrão
INSERT INTO fin_centros_custo (nome, descricao) VALUES
('Geral', 'Centro de custo padrão'),
('Projetos', 'Custos relacionados a projetos'),
('Administrativo', 'Custos administrativos'),
('Comercial', 'Custos comerciais e de vendas')
ON CONFLICT DO NOTHING;

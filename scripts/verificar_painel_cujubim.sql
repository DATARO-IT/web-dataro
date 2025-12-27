-- ============================================================================
-- VERIFICAÇÃO RÁPIDA: Painel de Cujubim
-- Execute este SQL para verificar se o painel está cadastrado corretamente
-- ============================================================================

-- 1. Verificar se o município existe
SELECT 
    id,
    nome,
    prefeito
FROM municipios
WHERE nome = 'Cujubim';

-- 2. Verificar se o painel existe e está ativo
SELECT 
    p.id as painel_id,
    p.municipio_id,
    m.nome as municipio,
    p.titulo,
    p.status,
    p.data_criacao,
    LENGTH(p.url_powerbi) as tamanho_url,
    LEFT(p.url_powerbi, 80) as url_inicio
FROM paineis_bi p
JOIN municipios m ON m.id = p.municipio_id
WHERE m.nome = 'Cujubim';

-- 3. Verificar se a URL está correta (deve começar com https://app.powerbi.com)
SELECT 
    CASE 
        WHEN url_powerbi LIKE 'https://app.powerbi.com%' THEN '✅ URL válida'
        ELSE '❌ URL inválida'
    END as validacao_url,
    CASE 
        WHEN embed_url LIKE 'https://app.powerbi.com%' THEN '✅ Embed URL válida'
        ELSE '❌ Embed URL inválida'
    END as validacao_embed,
    CASE 
        WHEN status = 'ativo' THEN '✅ Status ativo'
        ELSE '❌ Status: ' || status
    END as validacao_status
FROM paineis_bi
WHERE municipio_id = (SELECT id FROM municipios WHERE nome = 'Cujubim');

-- 4. Verificar a query exata que o Dashboard faz
SELECT 
    m.id,
    m.nome,
    m.prefeito,
    p.id as painel_id,
    p.titulo,
    p.status,
    p.url_powerbi,
    p.embed_url
FROM municipios m
LEFT JOIN paineis_bi p ON p.municipio_id = m.id AND p.status = 'ativo'
WHERE m.nome = 'Cujubim';

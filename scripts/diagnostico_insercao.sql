-- ======================================================================
-- DIAGNÓSTICO: Por que os painéis não foram inseridos?
-- ======================================================================

-- 1. Verificar se os municípios existem (checando nomes exatos)
SELECT 
    id, 
    nome,
    LENGTH(nome) as tamanho_nome,
    nome = 'Chupinguaia' as match_chupinguaia,
    nome = 'Rio Crespo' as match_rio_crespo,
    nome = 'Vilhena' as match_vilhena
FROM municipios 
WHERE nome LIKE '%Chupinguaia%' 
   OR nome LIKE '%Rio Crespo%' 
   OR nome LIKE '%Vilhena%'
ORDER BY nome;

-- 2. Verificar se já existem painéis para esses municípios
SELECT 
    m.id,
    m.nome,
    p.id as painel_id,
    p.titulo,
    p.status
FROM municipios m
LEFT JOIN paineis_bi p ON p.municipio_id = m.id
WHERE m.nome IN ('Chupinguaia', 'Rio Crespo', 'Vilhena')
ORDER BY m.nome;

-- 3. Contar quantos painéis existem no total
SELECT COUNT(*) as total_paineis FROM paineis_bi;

-- 4. Testar a condição NOT EXISTS para cada município
SELECT 
    m.id,
    m.nome,
    EXISTS (SELECT 1 FROM paineis_bi WHERE municipio_id = m.id) as ja_tem_painel
FROM municipios m
WHERE m.nome IN ('Chupinguaia', 'Rio Crespo', 'Vilhena');

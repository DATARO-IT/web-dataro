-- Verificar TODOS os painéis cadastrados
SELECT 
    m.nome AS municipio,
    p.id AS painel_id,
    p.titulo,
    p.status,
    p.municipio_id,
    SUBSTRING(p.embed_url, 1, 50) as url_inicio
FROM municipios m
LEFT JOIN paineis_bi p ON p.municipio_id = m.id
WHERE m.nome IN ('Chupinguaia', 'Rio Crespo', 'Vilhena', 'Cujubim', 'Alto Paraíso')
ORDER BY m.nome;

-- Contar total de painéis
SELECT COUNT(*) as total FROM paineis_bi WHERE status = 'ativo';

-- Ver estrutura da tabela paineis_bi
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'paineis_bi';

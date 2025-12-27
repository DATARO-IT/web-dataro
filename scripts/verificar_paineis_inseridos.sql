-- Verificar se os 3 painéis foram inseridos
SELECT 
    m.nome AS municipio,
    p.id AS painel_id,
    p.titulo,
    p.status,
    SUBSTRING(p.embed_url, 1, 60) as url_inicio
FROM municipios m
LEFT JOIN paineis_bi p ON p.municipio_id = m.id
WHERE m.nome IN ('Chupinguaia', 'Rio Crespo', 'Vilhena')
ORDER BY m.nome;

-- Contar total de painéis ativos
SELECT COUNT(*) as total_paineis_ativos FROM paineis_bi WHERE status = 'ativo';

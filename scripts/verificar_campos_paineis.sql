-- Ver estrutura completa da tabela paineis_bi
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'paineis_bi'
ORDER BY ordinal_position;

-- Ver dados de um painel que funciona (Alto Paraíso)
SELECT * FROM paineis_bi 
WHERE municipio_id = (SELECT id FROM municipios WHERE nome = 'Alto Paraíso')
LIMIT 1;

-- Ver dados dos 3 painéis novos
SELECT 
    municipio_id,
    titulo,
    url_powerbi,
    embed_url,
    status
FROM paineis_bi p
WHERE municipio_id IN (
    SELECT id FROM municipios WHERE nome IN ('Chupinguaia', 'Rio Crespo', 'Vilhena')
);

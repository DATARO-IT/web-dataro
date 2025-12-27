-- ======================================================================
-- VERIFICAR E FORÇAR INSERÇÃO DOS PAINÉIS
-- ======================================================================

-- 1. Ver o estado atual dos 3 municípios
SELECT 
    m.id,
    m.nome AS municipio,
    p.id AS painel_id,
    p.titulo,
    p.status,
    p.embed_url IS NOT NULL as tem_url
FROM municipios m
LEFT JOIN paineis_bi p ON p.municipio_id = m.id
WHERE m.nome IN ('Chupinguaia', 'Rio Crespo', 'Vilhena')
ORDER BY m.nome;

-- ======================================================================
-- 2. Se os painéis não existirem, FORCE a inserção (SEM NOT EXISTS)
-- ======================================================================

-- Chupinguaia
INSERT INTO paineis_bi (municipio_id, titulo, descricao, url_powerbi, embed_url, status)
SELECT 
    id,
    'Inteligência Territorial de Chupinguaia',
    'Painel Power BI com indicadores e análises do município de Chupinguaia',
    'https://app.powerbi.com/view?r=eyJrIjoiOTk2ZWI2YzAtZmE5Mi00MjhjLTk5YmYtNTczZGEzYmYwYTQ1IiwidCI6IjliZDQ3NzVkLTk5OWYtNGM4Ny1iM2NmLWJmZjA0YmI0YTFlNCJ9&pageName=a39dc3705064708de137',
    'https://app.powerbi.com/view?r=eyJrIjoiOTk2ZWI2YzAtZmE5Mi00MjhjLTk5YmYtNTczZGEzYmYwYTQ1IiwidCI6IjliZDQ3NzVkLTk5OWYtNGM4Ly1iM2NmLWJmZjA0YmI0YTFlNCJ9&pageName=a39dc3705064708de137',
    'ativo'
FROM municipios
WHERE nome = 'Chupinguaia';

-- Rio Crespo
INSERT INTO paineis_bi (municipio_id, titulo, descricao, url_powerbi, embed_url, status)
SELECT 
    id,
    'Inteligência Territorial de Rio Crespo',
    'Painel Power BI com indicadores e análises do município de Rio Crespo',
    'https://app.powerbi.com/view?r=eyJrIjoiM2RkZWM4OGEtMzM3OC00NzIyLWEyNWUtMWZkNDY0ZDBhMWIxIiwidCI6IjliZDQ3NzVkLTk5OWYtNGM4Ly1iM2NmLWJmZjA0YmI0YTFlNCJ9&pageName=a39dc3705064708de137',
    'https://app.powerbi.com/view?r=eyJrIjoiM2RkZWM4OGEtMzM3OC00NzIyLWEyNWUtMWZkNDY0ZDBhMWIxIiwidCI6IjliZDQ3NzVkLTk5OWYtNGM4Ly1iM2NmLWJmZjA0YmI0YTFlNCJ9&pageName=a39dc3705064708de137',
    'ativo'
FROM municipios
WHERE nome = 'Rio Crespo';

-- Vilhena
INSERT INTO paineis_bi (municipio_id, titulo, descricao, url_powerbi, embed_url, status)
SELECT 
    id,
    'Inteligência Territorial de Vilhena',
    'Painel Power BI com indicadores e análises do município de Vilhena',
    'https://app.powerbi.com/view?r=eyJrIjoiNmEzMDBhYjUtNzNlYS00NGY5LTk5ZWYtMjExZmFjODk5ZjA5IiwidCI6IjliZDQ3NzVkLTk5OWYtNGM4Ly1iM2NmLWJmZjA0YmI0YTFlNCJ9&pageName=a39dc3705064708de137',
    'https://app.powerbi.com/view?r=eyJrIjoiNmEzMDBhYjUtNzNlYS00NGY5LTk5ZWYtMjExZmFjODk5ZjA5IiwidCI6IjliZDQ3NzVkLTk5OWYtNGM4Ly1iM2NmLWJmZjA0YmI0YTFlNCJ9&pageName=a39dc3705064708de137',
    'ativo'
FROM municipios
WHERE nome = 'Vilhena';

-- ======================================================================
-- 3. VERIFICAR NOVAMENTE
-- ======================================================================
SELECT 
    m.nome AS municipio,
    p.id AS painel_id,
    p.titulo,
    p.status,
    LEFT(p.embed_url, 50) as url_preview
FROM municipios m
LEFT JOIN paineis_bi p ON p.municipio_id = m.id
WHERE m.nome IN ('Chupinguaia', 'Rio Crespo', 'Vilhena')
ORDER BY m.nome;

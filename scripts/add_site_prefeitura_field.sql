-- Script para adicionar campo site_prefeitura na tabela municipios
-- Execute este script no Supabase Dashboard > SQL Editor

-- Adicionar coluna site_prefeitura
ALTER TABLE municipios 
ADD COLUMN IF NOT EXISTS site_prefeitura VARCHAR(255);

-- Comentário da coluna
COMMENT ON COLUMN municipios.site_prefeitura IS 'URL do site oficial da prefeitura do município';

-- Exemplos de atualização (descomente e ajuste conforme necessário):
-- UPDATE municipios SET site_prefeitura = 'https://www.ariquemes.ro.gov.br' WHERE nome = 'ARIQUEMES';
-- UPDATE municipios SET site_prefeitura = 'https://www.cacoal.ro.gov.br' WHERE nome = 'CACOAL';
-- UPDATE municipios SET site_prefeitura = 'https://www.ji-parana.ro.gov.br' WHERE nome = 'JI-PARANÁ';
-- UPDATE municipios SET site_prefeitura = 'https://www.portovelho.ro.gov.br' WHERE nome = 'PORTO VELHO';
-- UPDATE municipios SET site_prefeitura = 'https://www.vilhena.ro.gov.br' WHERE nome = 'VILHENA';

-- Para verificar se a coluna foi criada:
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'municipios' AND column_name = 'site_prefeitura';

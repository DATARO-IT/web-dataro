-- ============================================================================
-- SCRIPT PARA CORRIGIR NOME DO MUNICÍPIO GUAJARÁ-MIRIM
-- ============================================================================
-- Data: 15/12/2025
-- Descrição: Corrige grafia de "Guajará-Mirrim" para "Guajará-Mirim"
-- ============================================================================

-- Verificar registro atual
SELECT id, nome, ativo 
FROM municipios 
WHERE nome ILIKE '%guajara%';

-- Corrigir o nome do município
UPDATE municipios 
SET nome = 'GUAJARÁ-MIRIM'
WHERE nome = 'GUAJARÀ MIRRIM' 
   OR nome = 'GUAJARÁ-MIRRIM'
   OR nome ILIKE 'GUAJARA%MIRRIM';

-- Verificar se a correção foi aplicada
SELECT id, nome, ativo 
FROM municipios 
WHERE nome ILIKE '%guajara%';

-- ============================================================================
-- FIM DO SCRIPT
-- ============================================================================

-- RESULTADO ESPERADO:
-- O município deve aparecer como "GUAJARÁ-MIRIM" (com 1 R apenas)

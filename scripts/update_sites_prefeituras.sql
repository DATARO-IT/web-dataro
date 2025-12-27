-- Script para atualizar os sites das prefeituras de Rondônia
-- Execute este script no Supabase Dashboard > SQL Editor

UPDATE municipios SET site_prefeitura = 'https://www.altaflorestadoeste.ro.gov.br' WHERE UPPER(nome) LIKE '%ALTA FLORESTA%';
UPDATE municipios SET site_prefeitura = 'https://www.altoalegre.ro.gov.br' WHERE UPPER(nome) LIKE '%ALTO ALEGRE%';
UPDATE municipios SET site_prefeitura = 'https://www.altoparaiso.ro.gov.br' WHERE UPPER(nome) LIKE '%ALTO PARAÍSO%' OR UPPER(nome) LIKE '%ALTO PARAISO%';
UPDATE municipios SET site_prefeitura = 'https://www.alvoradadooeste.ro.gov.br' WHERE UPPER(nome) LIKE '%ALVORADA%';
UPDATE municipios SET site_prefeitura = 'https://www.ariquemes.ro.gov.br' WHERE UPPER(nome) = 'ARIQUEMES';
UPDATE municipios SET site_prefeitura = 'https://www.buritis.ro.gov.br' WHERE UPPER(nome) = 'BURITIS';
UPDATE municipios SET site_prefeitura = 'https://www.cabixi.ro.gov.br' WHERE UPPER(nome) = 'CABIXI';
UPDATE municipios SET site_prefeitura = 'https://www.cacaulandia.ro.gov.br' WHERE UPPER(nome) LIKE '%CACAULÂNDIA%' OR UPPER(nome) LIKE '%CACAULANDIA%';
UPDATE municipios SET site_prefeitura = 'https://www.cacoal.ro.gov.br' WHERE UPPER(nome) = 'CACOAL';
UPDATE municipios SET site_prefeitura = 'https://www.camponovo.ro.gov.br' WHERE UPPER(nome) LIKE '%CAMPO NOVO%';
UPDATE municipios SET site_prefeitura = 'https://www.candeiasdojamari.ro.gov.br' WHERE UPPER(nome) LIKE '%CANDEIAS%';
UPDATE municipios SET site_prefeitura = 'https://www.castanheiras.ro.gov.br' WHERE UPPER(nome) = 'CASTANHEIRAS';
UPDATE municipios SET site_prefeitura = 'https://www.cerejeiras.ro.gov.br' WHERE UPPER(nome) = 'CEREJEIRAS';
UPDATE municipios SET site_prefeitura = 'https://www.chupinguaia.ro.gov.br' WHERE UPPER(nome) = 'CHUPINGUAIA';
UPDATE municipios SET site_prefeitura = 'https://www.coloradodooeste.ro.gov.br' WHERE UPPER(nome) LIKE '%COLORADO%';
UPDATE municipios SET site_prefeitura = 'https://www.corumbiara.ro.gov.br' WHERE UPPER(nome) = 'CORUMBIARA';
UPDATE municipios SET site_prefeitura = 'https://www.costamarques.ro.gov.br' WHERE UPPER(nome) LIKE '%COSTA MARQUES%';
UPDATE municipios SET site_prefeitura = 'https://www.cujubim.ro.gov.br' WHERE UPPER(nome) = 'CUJUBIM';
UPDATE municipios SET site_prefeitura = 'https://www.espigaodooeste.ro.gov.br' WHERE UPPER(nome) LIKE '%ESPIGÃO%' OR UPPER(nome) LIKE '%ESPIGAO%';
UPDATE municipios SET site_prefeitura = 'https://www.governadorjorgeteixeira.ro.gov.br' WHERE UPPER(nome) LIKE '%JORGE TEIXEIRA%';
UPDATE municipios SET site_prefeitura = 'https://www.guajaramirim.ro.gov.br' WHERE UPPER(nome) LIKE '%GUAJARÁ%' OR UPPER(nome) LIKE '%GUAJARA%';
UPDATE municipios SET site_prefeitura = 'https://www.itapuadooeste.ro.gov.br' WHERE UPPER(nome) LIKE '%ITAPUÃ%' OR UPPER(nome) LIKE '%ITAPUA%';
UPDATE municipios SET site_prefeitura = 'https://www.jaru.ro.gov.br' WHERE UPPER(nome) = 'JARU';
UPDATE municipios SET site_prefeitura = 'https://www.jiparana.ro.gov.br' WHERE UPPER(nome) LIKE '%JI-PARANÁ%' OR UPPER(nome) LIKE '%JI-PARANA%';
UPDATE municipios SET site_prefeitura = 'https://www.machadinho.ro.gov.br' WHERE UPPER(nome) LIKE '%MACHADINHO%';
UPDATE municipios SET site_prefeitura = 'https://www.ministroandreazza.ro.gov.br' WHERE UPPER(nome) LIKE '%MINISTRO ANDREAZZA%';
UPDATE municipios SET site_prefeitura = 'https://www.mirantedaserra.ro.gov.br' WHERE UPPER(nome) LIKE '%MIRANTE%';
UPDATE municipios SET site_prefeitura = 'https://www.montenegro.ro.gov.br' WHERE UPPER(nome) LIKE '%MONTE NEGRO%';
UPDATE municipios SET site_prefeitura = 'https://www.novabrasilandia.ro.gov.br' WHERE UPPER(nome) LIKE '%NOVA BRASILÂNDIA%' OR UPPER(nome) LIKE '%NOVA BRASILANDIA%';
UPDATE municipios SET site_prefeitura = 'https://www.novamamore.ro.gov.br' WHERE UPPER(nome) LIKE '%NOVA MAMORÉ%' OR UPPER(nome) LIKE '%NOVA MAMORE%';
UPDATE municipios SET site_prefeitura = 'https://www.novauniao.ro.gov.br' WHERE UPPER(nome) LIKE '%NOVA UNIÃO%' OR UPPER(nome) LIKE '%NOVA UNIAO%';
UPDATE municipios SET site_prefeitura = 'https://www.novohorizonte.ro.gov.br' WHERE UPPER(nome) LIKE '%NOVO HORIZONTE%';
UPDATE municipios SET site_prefeitura = 'https://www.ouropretodooeste.ro.gov.br' WHERE UPPER(nome) LIKE '%OURO PRETO%';
UPDATE municipios SET site_prefeitura = 'https://www.parecis.ro.gov.br' WHERE UPPER(nome) = 'PARECIS';
UPDATE municipios SET site_prefeitura = 'https://www.pimentabueno.ro.gov.br' WHERE UPPER(nome) LIKE '%PIMENTA BUENO%';
UPDATE municipios SET site_prefeitura = 'https://www.pimenteirasdooeste.ro.gov.br' WHERE UPPER(nome) LIKE '%PIMENTEIRAS%';
UPDATE municipios SET site_prefeitura = 'https://www.portovelho.ro.gov.br' WHERE UPPER(nome) LIKE '%PORTO VELHO%';
UPDATE municipios SET site_prefeitura = 'https://www.presidentemedici.ro.gov.br' WHERE UPPER(nome) LIKE '%PRESIDENTE MÉDICI%' OR UPPER(nome) LIKE '%PRESIDENTE MEDICI%';
UPDATE municipios SET site_prefeitura = 'https://www.primavera.ro.gov.br' WHERE UPPER(nome) LIKE '%PRIMAVERA%';
UPDATE municipios SET site_prefeitura = 'https://www.riocrespo.ro.gov.br' WHERE UPPER(nome) LIKE '%RIO CRESPO%';
UPDATE municipios SET site_prefeitura = 'https://www.rolimdemoura.ro.gov.br' WHERE UPPER(nome) LIKE '%ROLIM DE MOURA%';
UPDATE municipios SET site_prefeitura = 'https://www.santaluzia.ro.gov.br' WHERE UPPER(nome) LIKE '%SANTA LUZIA%';
UPDATE municipios SET site_prefeitura = 'https://www.saofelipe.ro.gov.br' WHERE UPPER(nome) LIKE '%SÃO FELIPE%' OR UPPER(nome) LIKE '%SAO FELIPE%';
UPDATE municipios SET site_prefeitura = 'https://www.saofrancisco.ro.gov.br' WHERE UPPER(nome) LIKE '%SÃO FRANCISCO%' OR UPPER(nome) LIKE '%SAO FRANCISCO%';
UPDATE municipios SET site_prefeitura = 'https://www.saomiguel.ro.gov.br' WHERE UPPER(nome) LIKE '%SÃO MIGUEL%' OR UPPER(nome) LIKE '%SAO MIGUEL%';
UPDATE municipios SET site_prefeitura = 'https://www.seringueiras.ro.gov.br' WHERE UPPER(nome) = 'SERINGUEIRAS';
UPDATE municipios SET site_prefeitura = 'https://www.teixeiropolis.ro.gov.br' WHERE UPPER(nome) LIKE '%TEIXEIRÓPOLIS%' OR UPPER(nome) LIKE '%TEIXEIROPOLIS%';
UPDATE municipios SET site_prefeitura = 'https://www.theobroma.ro.gov.br' WHERE UPPER(nome) = 'THEOBROMA';
UPDATE municipios SET site_prefeitura = 'https://www.urupa.ro.gov.br' WHERE UPPER(nome) LIKE '%URUPÁ%' OR UPPER(nome) LIKE '%URUPA%';
UPDATE municipios SET site_prefeitura = 'https://www.valedoanari.ro.gov.br' WHERE UPPER(nome) LIKE '%VALE DO ANARI%';
UPDATE municipios SET site_prefeitura = 'https://www.valedoparaiso.ro.gov.br' WHERE UPPER(nome) LIKE '%VALE DO PARAÍSO%' OR UPPER(nome) LIKE '%VALE DO PARAISO%';
UPDATE municipios SET site_prefeitura = 'https://www.vilhena.ro.gov.br' WHERE UPPER(nome) = 'VILHENA';

-- Verificar quantos foram atualizados
SELECT nome, site_prefeitura FROM municipios WHERE site_prefeitura IS NOT NULL ORDER BY nome;

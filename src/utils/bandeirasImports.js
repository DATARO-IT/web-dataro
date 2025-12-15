// Imports estáticos de todas as bandeiras para garantir processamento pelo Vite
import altaFloresta from '../assets/bandeiras/Alta floresta.png';
import altoAlegre from '../assets/bandeiras/Alto Alegre dos Parecis.png';
import altoParaiso from '../assets/bandeiras/Alto Paraiso.png';
import alvorada from '../assets/bandeiras/Alvorada do este.png';
import ariquemes from '../assets/bandeiras/Ariquemes.png';
import buritis from '../assets/bandeiras/buritis-ro.png';
import cacaulandia from '../assets/bandeiras/Cacaulandia .png';
import cacoal from '../assets/bandeiras/Cacoal.png';
import campoNovo from '../assets/bandeiras/Campo Novo de Rondonia.png';
import candeias from '../assets/bandeiras/Candeias do Jamari RO.png';
import cerejeiras from '../assets/bandeiras/Cerejeiras.png';
import chupinguaia from '../assets/bandeiras/Chupinguaia.png';
import corumbiara from '../assets/bandeiras/Corumbiara.png';
import espigao from '../assets/bandeiras/-espigaodoeste-ro.png';
import govJorgeTeixeira from '../assets/bandeiras/ro Gov. Jorge Teixeira.png';
import itapua from '../assets/bandeiras/Itapua do Oeste.png';
import jaru from '../assets/bandeiras/Jaru.png';
import machadinho from '../assets/bandeiras/Machadinho d\'Oeste RO.png';
import ministroAndreazza from '../assets/bandeiras/roMinistro Andreazza.png';
import monteNegro from '../assets/bandeiras/Monte Negro.png';
import novaMamore from '../assets/bandeiras/Nova Mamoré.png';
import novaUniao from '../assets/bandeiras/Nova União RO.png';
import novoHorizonte from '../assets/bandeiras/Novo Horizonte do Oeste.png';
import parecis from '../assets/bandeiras/Parecis.png';
import pimentaBueno from '../assets/bandeiras/Pimenta_bueno.png';
import rioCrespo from '../assets/bandeiras/roRio Crespo.png';
import santaLuzia from '../assets/bandeiras/Santa Luzia D\'Oeste.png';
import saoFelipe from '../assets/bandeiras/SAO FELIPE.png';
import saoMiguel from '../assets/bandeiras/São Miguel do Guaporé.png';
import seringueiras from '../assets/bandeiras/Seringueiras.png';
import teixeiropolis from '../assets/bandeiras/roTexeirópolis.png';
import theobroma from '../assets/bandeiras/-theobroma-ro.png';
import valeAnari from '../assets/bandeiras/Vale do Anari.png';
import valeParaiso from '../assets/bandeiras/Vale do Paraiso.png';

// Mapa de municípios para bandeiras importadas
export const bandeirasImportadas = {
  "Alta Floresta d'Oeste": altaFloresta,
  "Alto Alegre dos Parecis": altoAlegre,
  "Alto Paraíso": altoParaiso,
  "Alvorada d'Oeste": alvorada,
  "Ariquemes": ariquemes,
  "Buritis": buritis,
  "Cacaulândia": cacaulandia,
  "Cacoal": cacoal,
  "Campo Novo de Rondônia": campoNovo,
  "Candeias do Jamari": candeias,
  "Cerejeiras": cerejeiras,
  "Chupinguaia": chupinguaia,
  "Corumbiara": corumbiara,
  "Espigão d'Oeste": espigao,
  "Governador Jorge Teixeira": govJorgeTeixeira,
  "Itapuã do Oeste": itapua,
  "Jaru": jaru,
  "Machadinho d'Oeste": machadinho,
  "Ministro Andreazza": ministroAndreazza,
  "Monte Negro": monteNegro,
  "Nova Mamoré": novaMamore,
  "Nova União": novaUniao,
  "Novo Horizonte do Oeste": novoHorizonte,
  "Parecis": parecis,
  "Pimenta Bueno": pimentaBueno,
  "Rio Crespo": rioCrespo,
  "Santa Luzia d'Oeste": santaLuzia,
  "São Felipe d'Oeste": saoFelipe,
  "São Miguel do Guaporé": saoMiguel,
  "Seringueiras": seringueiras,
  "Teixeirópolis": teixeiropolis,
  "Theobroma": theobroma,
  "Vale do Anari": valeAnari,
  "Vale do Paraíso": valeParaiso
};

// Função otimizada para obter URL da bandeira
export const getBandeiraUrl = (municipioNome) => {
  return bandeirasImportadas[municipioNome] || null;
};

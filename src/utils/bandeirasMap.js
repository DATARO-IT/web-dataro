// Imports estáticos de todas as bandeiras para garantir processamento pelo Vite
import altaFloresta from '../assets/bandeiras/Alta floresta.png';
import altoAlegre from '../assets/bandeiras/Alto Alegre dos Parecis.png';
import altoParaiso from '../assets/bandeiras/Alto Paraiso.png';
import alvorada from '../assets/bandeiras/Alvorada do Oeste.png';
import ariquemes from '../assets/bandeiras/Ariquemes.png';
import buritis from '../assets/bandeiras/buritis-ro.png';
import cabixi from '../assets/bandeiras/Cabixi.png';
import cacaulandia from '../assets/bandeiras/Cacaulandia .png';
import cacoal from '../assets/bandeiras/Cacoal.png';
import campoNovo from '../assets/bandeiras/Campo Novo de Rondonia.png';
import candeias from '../assets/bandeiras/Candeias do Jamari RO.png';
import castanheiras from '../assets/bandeiras/Castanheiras.png';
import cerejeiras from '../assets/bandeiras/Cerejeiras.png';
import chupinguaia from '../assets/bandeiras/Chupinguaia.png';
import colorado from '../assets/bandeiras/Colorado do Oeste.png';
import corumbiara from '../assets/bandeiras/Corumbiara.png';
import costaMarques from '../assets/bandeiras/Costa Marques.png';
import espigao from '../assets/bandeiras/Espigao do Oeste.png';
import govJorgeTeixeira from '../assets/bandeiras/Governador Jorge Teixeira.png';
import guajaraMirim from '../assets/bandeiras/Guajara Mirim.png';
import itapua from '../assets/bandeiras/Itapua do Oeste.png';
import jaru from '../assets/bandeiras/jaru.png';
import jiParana from '../assets/bandeiras/Ji-Parana.png';
import machadinho from "../assets/bandeiras/Machadinho do Oeste.png";
import ministroAndreazza from '../assets/bandeiras/roMinistro Andreazza.png';
import miranteSerra from '../assets/bandeiras/Mirante da Serra.png';
import monteNegro from '../assets/bandeiras/Monte Negro.png';
import novaBrasilandia from '../assets/bandeiras/Nova Brasilandia do Oeste.png';
import novaMamore from '../assets/bandeiras/Nova Mamoré.png';
import novaUniao from '../assets/bandeiras/Nova União RO.png';
import novoHorizonte from '../assets/bandeiras/Novo Horizonte do Oeste.png';
import ouroPreto from '../assets/bandeiras/ouro_preto_do_oeste.png';
import parecis from '../assets/bandeiras/Parecis.png';
import pimentaBueno from '../assets/bandeiras/Pimenta_bueno.png';
import pimenteiras from '../assets/bandeiras/Pimenteiras do Oeste.png';
import portoVelho from '../assets/bandeiras/porto_velho.png';
import presidenteMedici from '../assets/bandeiras/Presidente Medici.png';
import primavera from '../assets/bandeiras/Primavera de Rondonia.png';
import rioCrespo from '../assets/bandeiras/roRio Crespo.png';
import rolimMoura from '../assets/bandeiras/rolim_de_moura.png';
import santaLuzia from "../assets/bandeiras/Santa Luzia D'Oeste.png";
import saoFelipe from '../assets/bandeiras/SAO FELIPE.png';
import saoFrancisco from '../assets/bandeiras/Sao Francisco do Guapore.png';
import saoMiguel from '../assets/bandeiras/São Miguel do Guaporé.png';
import seringueiras from '../assets/bandeiras/Seringueiras.png';
import teixeiropolis from '../assets/bandeiras/Teixeiropolis.png';
import theobroma from '../assets/bandeiras/-theobroma-ro.png';
import urupa from '../assets/bandeiras/urupa.png';
import valeAnari from '../assets/bandeiras/Vale do Anari.png';
import valeParaiso from '../assets/bandeiras/Vale do Paraiso.png';
import vilhena from '../assets/bandeiras/Vilhena.png';
import bandeiraRondonia from '../assets/bandeiras/Bandeira_de_Rondônia.png';

// Mapa de municípios para bandeiras importadas (MAIÚSCULAS - formato do banco)
const bandeirasImportadas = {
  // Formato em MAIÚSCULAS (usado no banco de dados)
  "ALTA FLORESTA DO OESTE": altaFloresta,
  "ALTO ALEGRE DOS PARECIS": altoAlegre,
  "ALTO PARAÍSO": altoParaiso,
  "ALVORADA DO OESTE": alvorada,
  "ARIQUEMES": ariquemes,
  "BURITIS": buritis,
  "CABIXI": cabixi,
  "CACAULÂNDIA": cacaulandia,
  "CACOAL": cacoal,
  "CAMPO NOVO DE RONDÔNIA": campoNovo,
  "CANDEIAS DO JAMARI": candeias,
  "CASTANHEIRAS": castanheiras,
  "CEREJEIRAS": cerejeiras,
  "CHUPINGUAIA": chupinguaia,
  "COLORADO DO OESTE": colorado,
  "CORUMBIARA": corumbiara,
  "COSTA MARQUES": costaMarques,
  "ESPIGÃO DO OESTE": espigao,
  "GOVERNADOR JORGE TEIXEIRA": govJorgeTeixeira,
  "GUAJARÀ MIRRIM": guajaraMirim,
  "GUAJARÁ-MIRIM": guajaraMirim,
  "ITAPUÃ DO OESTE": itapua,
  "JARU": jaru,
  "JI-PARANÁ": jiParana,
  "MACHADINHO DO OESTE": machadinho,
  "MINISTRO ANDREAZZA": ministroAndreazza,
  "MIRANTE DA SERRA": miranteSerra,
  "MONTE NEGRO": monteNegro,
  "NOVA BRASILÂNDIA DO OESTE": novaBrasilandia,
  "NOVA MAMORÉ": novaMamore,
  "NOVA UNIÃO": novaUniao,
  "NOVO HORIZONTE DO OESTE": novoHorizonte,
  "OURO PRETO DO OESTE": ouroPreto,
  "PARECIS": parecis,
  "PIMENTA BUENO": pimentaBueno,
  "PIMENTEIRAS DO OESTE": pimenteiras,
  "PORTO VELHO": portoVelho,
  "PRESIDENTE MÉDICI": presidenteMedici,
  "PRIMAVERA DE RONDONIA": primavera,
  "PRIMAVERA DE RONDÔNIA": primavera,
  "RIO CRESPO": rioCrespo,
  "ROLIM DE MOURA": rolimMoura,
  "SANTA LUZIA D'OESTE": santaLuzia,
  "SÃO FELIPE D'OESTE": saoFelipe,
  "SÃO FRANCISCO DO GUAPORÉ": saoFrancisco,
  "SÃO MIGUEL DO GUAPORÉ": saoMiguel,
  "SERINGUEIRAS": seringueiras,
  "TEIXEIRÓPOLIS": teixeiropolis,
  "THEOBROMA": theobroma,
  "URUPÁ": urupa,
  "VALE DO ANARI": valeAnari,
  "VALE DO PARAÍSO": valeParaiso,
  "VILHENA": vilhena,
  
  // Formato Title Case (usado no Login)
  "Alta Floresta d'Oeste": altaFloresta,
  "Alto Alegre dos Parecis": altoAlegre,
  "Alto Paraíso": altoParaiso,
  "Alvorada d'Oeste": alvorada,
  "Ariquemes": ariquemes,
  "Buritis": buritis,
  "Cabixi": cabixi,
  "Cacaulândia": cacaulandia,
  "Cacoal": cacoal,
  "Campo Novo de Rondônia": campoNovo,
  "Candeias do Jamari": candeias,
  "Castanheiras": castanheiras,
  "Cerejeiras": cerejeiras,
  "Chupinguaia": chupinguaia,
  "Colorado do Oeste": colorado,
  "Corumbiara": corumbiara,
  "Costa Marques": costaMarques,
  "Espigão d'Oeste": espigao,
  "Governador Jorge Teixeira": govJorgeTeixeira,
  "Guajará-Mirim": guajaraMirim,
  "Itapuã do Oeste": itapua,
  "Jaru": jaru,
  "Ji-Paraná": jiParana,
  "Machadinho d'Oeste": machadinho,
  "Ministro Andreazza": ministroAndreazza,
  "Mirante da Serra": miranteSerra,
  "Monte Negro": monteNegro,
  "Nova Brasilândia d'Oeste": novaBrasilandia,
  "Nova Mamoré": novaMamore,
  "Nova União": novaUniao,
  "Novo Horizonte do Oeste": novoHorizonte,
  "Ouro Preto do Oeste": ouroPreto,
  "Parecis": parecis,
  "Pimenta Bueno": pimentaBueno,
  "Pimenteiras do Oeste": pimenteiras,
  "Porto Velho": portoVelho,
  "Presidente Médici": presidenteMedici,
  "Primavera de Rondônia": primavera,
  "Rio Crespo": rioCrespo,
  "Rolim de Moura": rolimMoura,
  "Santa Luzia d'Oeste": santaLuzia,
  "São Felipe d'Oeste": saoFelipe,
  "São Francisco do Guaporé": saoFrancisco,
  "São Miguel do Guaporé": saoMiguel,
  "Seringueiras": seringueiras,
  "Teixeirópolis": teixeiropolis,
  "Theobroma": theobroma,
  "Urupá": urupa,
  "Vale do Anari": valeAnari,
  "Vale do Paraíso": valeParaiso,
  "Vilhena": vilhena,
  "Rondônia": bandeiraRondonia
};

// Função para obter URL da bandeira
export const getBandeiraUrl = (municipioNome) => {
  return bandeirasImportadas[municipioNome] || null;
};

export default bandeirasImportadas;

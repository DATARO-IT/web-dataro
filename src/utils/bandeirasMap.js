// Mapeamento de municípios para arquivos de bandeiras
export const bandeirasMap = {
  "Alta Floresta d'Oeste": "Alta floresta.png",
  "Alto Alegre dos Parecis": "Alto Alegre dos Parecis.png",
  "Alto Paraíso": "Alto Paraiso.png",
  "Alvorada d'Oeste": "Alvorada do este.png",
  "Ariquemes": "Ariquemes.png",
  "Buritis": "buritis-ro.png",
  "Cacaulândia": "Cacaulandia .png",
  "Cacoal": "Cacoal.png",
  "Campo Novo de Rondônia": "Campo Novo de Rondonia.png",
  "Candeias do Jamari": "Candeias do Jamari RO.png",
  "Cerejeiras": "Cerejeiras.png",
  "Chupinguaia": "Chupinguaia.png",
  "Corumbiara": "Corumbiara.png",
  "Espigão d'Oeste": "-espigaodoeste-ro.png",
  "Governador Jorge Teixeira": "ro Gov. Jorge Teixeira.png",
  "Itapuã do Oeste": "Itapua do Oeste.png",
  "Jaru": "Jaru.png",
  "Machadinho d'Oeste": "Machadinho d'Oeste RO.png",
  "Ministro Andreazza": "roMinistro Andreazza.png",
  "Monte Negro": "Monte Negro.png",
  "Nova Mamoré": "Nova Mamoré.png",
  "Nova União": "Nova União RO.png",
  "Novo Horizonte do Oeste": "Novo Horizonte do Oeste.png",
  "Parecis": "Parecis.png",
  "Pimenta Bueno": "Pimenta_bueno.png",
  "Rio Crespo": "roRio Crespo.png",
  "Santa Luzia d'Oeste": "Santa Luzia D'Oeste.png",
  "São Felipe d'Oeste": "SAO FELIPE.png",
  "São Miguel do Guaporé": "São Miguel do Guaporé.png",
  "Seringueiras": "Seringueiras.png",
  "Teixeirópolis": "roTexeirópolis.png",
  "Theobroma": "-theobroma-ro.png",
  "Vale do Anari": "Vale do Anari.png",
  "Vale do Paraíso": "Vale do Paraiso.png"
};

// Função auxiliar para obter URL da bandeira
export const getBandeiraUrl = (municipioNome) => {
  const arquivo = bandeirasMap[municipioNome];
  
  if (arquivo) {
    try {
      // Importação dinâmica da bandeira
      return new URL(`../assets/bandeiras/${arquivo}`, import.meta.url).href;
    } catch (error) {
      console.warn(`Bandeira não encontrada para ${municipioNome}:`, error);
      return null;
    }
  }
  
  return null;
};

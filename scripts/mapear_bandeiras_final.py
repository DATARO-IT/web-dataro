#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script FINAL para mapear bandeiras com matching melhorado
"""

import os
import json
import unicodedata
from pathlib import Path

# Diretório de bandeiras
BANDEIRAS_DIR = Path("/home/ubuntu/web-dataro/src/assets/bandeiras")

# Lista dos 48 municípios do CIMCERO
MUNICIPIOS_CIMCERO = [
    "ALTA FLORESTA DO OESTE",
    "ALTO ALEGRE DOS PARECIS",
    "ALTO PARAÍSO",
    "ALVORADA DO OESTE",
    "ARIQUEMES",
    "BURITIS",
    "CABIXI",
    "CACAULÂNDIA",
    "CACOAL",
    "CAMPO NOVO DE RONDÔNIA",
    "CANDEIAS DO JAMARI",
    "CASTANHEIRAS",
    "CEREJEIRAS",
    "COLORADO DO OESTE",
    "CORUMBIARA",
    "COSTA MARQUES",
    "ESPIGÃO DO OESTE",
    "GOVERNADOR JORGE TEIXEIRA",
    "GUAJARÀ MIRRIM",
    "ITAPUÃ DO OESTE",
    "JARU",
    "JI-PARANÁ",
    "MACHADINHO DO OESTE",
    "MINISTRO ANDREAZZA",
    "MIRANTE DA SERRA",
    "MONTE NEGRO",
    "NOVA BRASILÂNDIA DO OESTE",
    "NOVA MAMORÉ",
    "NOVA UNIÃO",
    "NOVO HORIZONTE DO OESTE",
    "OURO PRETO DO OESTE",
    "PARECIS",
    "PIMENTA BUENO",
    "PIMENTEIRAS DO OESTE",
    "PORTO VELHO",
    "PRESIDENTE MÉDICI",
    "PRIMAVERA DE RONDONIA",
    "ROLIM DE MOURA",
    "SANTA LUZIA D'OESTE",
    "SÃO FELIPE D'OESTE",
    "SÃO FRANCISCO DO GUAPORÉ",
    "SÃO MIGUEL DO GUAPORÉ",
    "SERINGUEIRAS",
    "TEIXEIRÓPOLIS",
    "THEOBROMA",
    "URUPÁ",
    "VALE DO ANARI",
    "VALE DO PARAÍSO"
]

# Mapeamento manual para casos problemáticos
MAPEAMENTO_MANUAL = {
    "GUAJARÀ MIRRIM": "Guajara Mirim.png",
    "JARU": "jaru.png",
    "URUPÁ": "urupa.png",
}

def normalizar_nome(nome):
    """Remove acentos e converte para minúsculas"""
    nfkd = unicodedata.normalize('NFKD', nome)
    sem_acento = "".join([c for c in nfkd if not unicodedata.combining(c)])
    return sem_acento.lower()

def encontrar_bandeira(municipio, bandeiras_existentes):
    """Encontra a bandeira correspondente ao município"""
    
    # Verificar mapeamento manual primeiro
    if municipio in MAPEAMENTO_MANUAL:
        bandeira_manual = MAPEAMENTO_MANUAL[municipio]
        if bandeira_manual in bandeiras_existentes:
            return bandeira_manual
    
    nome_normalizado = normalizar_nome(municipio)
    
    # Variações possíveis do nome
    variacoes = [
        municipio.lower(),
        nome_normalizado,
        municipio.replace(" ", ""),
        nome_normalizado.replace(" ", ""),
        municipio.replace(" ", "_"),
        municipio.replace(" ", "-"),
        municipio.replace("'", ""),
        municipio.replace("D'", "D"),
        municipio.replace("d'", "d"),
        municipio.title(),
        nome_normalizado.title(),
    ]
    
    for bandeira in bandeiras_existentes:
        bandeira_sem_ext = bandeira.replace('.png', '').replace('.jpg', '').replace('.jpeg', '')
        bandeira_normalizada = normalizar_nome(bandeira_sem_ext)
        
        for variacao in variacoes:
            variacao_norm = normalizar_nome(variacao)
            if variacao_norm in bandeira_normalizada or bandeira_normalizada in variacao_norm:
                # Verifica se é uma correspondência significativa (mais de 3 caracteres)
                if len(variacao_norm) > 3 and len(bandeira_normalizada) > 3:
                    return bandeira
    
    return None

def main():
    """Função principal"""
    print("\n" + "=" * 80)
    print("MAPEAMENTO FINAL DE BANDEIRAS DOS MUNICÍPIOS DO CIMCERO")
    print("=" * 80 + "\n")
    
    # Lista bandeiras existentes
    bandeiras_existentes = [f.name for f in BANDEIRAS_DIR.glob("*") if f.is_file() and f.suffix in ['.png', '.jpg', '.jpeg']]
    
    print(f"Total de bandeiras disponíveis: {len(bandeiras_existentes)}")
    print(f"Total de municípios CIMCERO: {len(MUNICIPIOS_CIMCERO)}\n")
    
    # Mapeia bandeiras
    mapeamento = {}
    com_bandeira = 0
    sem_bandeira = 0
    
    print("=" * 80)
    print("MAPEAMENTO:")
    print("=" * 80 + "\n")
    
    for municipio in MUNICIPIOS_CIMCERO:
        bandeira = encontrar_bandeira(municipio, bandeiras_existentes)
        
        if bandeira:
            # Caminho relativo para usar no import do React
            caminho_relativo = f"../assets/bandeiras/{bandeira}"
            mapeamento[municipio] = caminho_relativo
            print(f"✅ {municipio:<40} → {bandeira}")
            com_bandeira += 1
        else:
            mapeamento[municipio] = None
            print(f"❌ {municipio:<40} → SEM BANDEIRA")
            sem_bandeira += 1
    
    print("\n" + "=" * 80)
    print("RESUMO:")
    print("=" * 80)
    print(f"✅ Municípios COM bandeira: {com_bandeira}")
    print(f"❌ Municípios SEM bandeira: {sem_bandeira}")
    print(f"📊 Total: {len(MUNICIPIOS_CIMCERO)}")
    print(f"📈 Percentual: {(com_bandeira/len(MUNICIPIOS_CIMCERO)*100):.1f}%")
    
    # Salva mapeamento em JSON
    output_json = Path("/home/ubuntu/web-dataro/src/utils/bandeirasMap.json")
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(mapeamento, f, ensure_ascii=False, indent=2)
    
    print(f"\n📄 Mapeamento salvo em: {output_json}")
    
    # Gera arquivo JS para import no React
    output_js = Path("/home/ubuntu/web-dataro/src/utils/bandeirasData.js")
    
    with open(output_js, 'w', encoding='utf-8') as f:
        f.write("// Mapeamento de bandeiras dos municípios do CIMCERO\n")
        f.write("// Gerado automaticamente - NÃO EDITAR MANUALMENTE\n\n")
        
        # Imports
        bandeiras_importadas = {}
        for municipio, caminho in mapeamento.items():
            if caminho:
                # Cria nome de variável válido
                var_name = normalizar_nome(municipio).replace(" ", "_").replace("'", "").replace("-", "_")
                bandeira_nome = caminho.split('/')[-1]
                bandeiras_importadas[municipio] = var_name
                
                # Usar aspas duplas para caminhos com apóstrofos
                if "'" in caminho:
                    f.write(f'import {var_name} from "{caminho}";\n')
                else:
                    f.write(f"import {var_name} from '{caminho}';\n")
        
        f.write("\n// Mapeamento de municípios para bandeiras\n")
        f.write("export const bandeirasMap = {\n")
        
        for municipio in MUNICIPIOS_CIMCERO:
            if municipio in bandeiras_importadas:
                var_name = bandeiras_importadas[municipio]
                f.write(f'  "{municipio}": {var_name},\n')
            else:
                f.write(f'  "{municipio}": null,\n')
        
        f.write("};\n\n")
        
        f.write("// Lista de municípios sem bandeira\n")
        f.write("export const municipiosSemBandeira = [\n")
        for municipio, caminho in mapeamento.items():
            if not caminho:
                f.write(f'  "{municipio}",\n')
        f.write("];\n\n")
        
        f.write("// Função para obter bandeira de um município\n")
        f.write("export const getBandeira = (nomeMunicipio) => {\n")
        f.write("  return bandeirasMap[nomeMunicipio?.toUpperCase()] || null;\n")
        f.write("};\n")
    
    print(f"📄 Arquivo JS gerado em: {output_js}")
    print("\n" + "=" * 80 + "\n")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para identificar municípios de Rondônia sem bandeiras
"""

import os
import unicodedata
from pathlib import Path

# Lista completa dos 52 municípios de Rondônia
municipios = [
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
    "CHUPINGUAIA",
    "COLORADO DO OESTE",
    "CORUMBIARA",
    "COSTA MARQUES",
    "CUJUBIM",
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
    "RIO CRESPO",
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
    "VALE DO PARAÍSO",
    "VILHENA"
]

def normalizar_nome(nome):
    """Remove acentos e converte para minúsculas"""
    nfkd = unicodedata.normalize('NFKD', nome)
    sem_acento = "".join([c for c in nfkd if not unicodedata.combining(c)])
    return sem_acento.lower()

def verificar_bandeira_existe(municipio, bandeiras_existentes):
    """Verifica se existe bandeira para o município"""
    nome_normalizado = normalizar_nome(municipio)
    
    # Variações possíveis do nome
    variacoes = [
        municipio.lower(),
        nome_normalizado,
        municipio.replace(" ", ""),
        nome_normalizado.replace(" ", ""),
        municipio.replace(" ", "_"),
        municipio.replace(" ", "-"),
    ]
    
    for bandeira in bandeiras_existentes:
        bandeira_sem_ext = bandeira.replace('.png', '').replace('.jpg', '').replace('.jpeg', '')
        bandeira_normalizada = normalizar_nome(bandeira_sem_ext)
        
        for variacao in variacoes:
            if variacao in bandeira_normalizada or bandeira_normalizada in variacao:
                return True, bandeira
    
    return False, None

# Diretório de bandeiras
bandeiras_dir = Path("/home/ubuntu/web-dataro/src/assets/bandeiras")
bandeiras_existentes = [f.name for f in bandeiras_dir.glob("*") if f.is_file()]

print("=" * 80)
print("ANÁLISE DE BANDEIRAS DOS MUNICÍPIOS DE RONDÔNIA")
print("=" * 80)
print(f"\nTotal de municípios: {len(municipios)}")
print(f"Total de bandeiras existentes: {len(bandeiras_existentes)}")
print()

# Identificar municípios sem bandeira
municipios_sem_bandeira = []
municipios_com_bandeira = []

for municipio in municipios:
    existe, arquivo = verificar_bandeira_existe(municipio, bandeiras_existentes)
    if existe:
        municipios_com_bandeira.append((municipio, arquivo))
    else:
        municipios_sem_bandeira.append(municipio)

print(f"✅ Municípios COM bandeira: {len(municipios_com_bandeira)}")
print(f"❌ Municípios SEM bandeira: {len(municipios_sem_bandeira)}")
print()

if municipios_sem_bandeira:
    print("=" * 80)
    print("MUNICÍPIOS SEM BANDEIRA:")
    print("=" * 80)
    for i, municipio in enumerate(municipios_sem_bandeira, 1):
        print(f"{i:2d}. {municipio}")
    print()

# Salvar lista em arquivo
output_file = "/home/ubuntu/web-dataro/scripts/municipios_sem_bandeira.txt"
with open(output_file, 'w', encoding='utf-8') as f:
    f.write("MUNICÍPIOS DE RONDÔNIA SEM BANDEIRA\n")
    f.write("=" * 80 + "\n\n")
    for municipio in municipios_sem_bandeira:
        f.write(f"{municipio}\n")

print(f"📄 Lista salva em: {output_file}")
print()

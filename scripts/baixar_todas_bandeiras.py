#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para baixar todas as bandeiras dos municípios de Rondônia do blog SáimonRio
"""

import os
import re
import time
import requests
import unicodedata
from pathlib import Path
from bs4 import BeautifulSoup

# URL do post com todas as bandeiras
URL_POST = "https://saimonrio.blogspot.com/2019/08/conheca-todas-as-bandeiras-dos-52.html"

# Diretório de destino
BANDEIRAS_DIR = Path("/home/ubuntu/web-dataro/src/assets/bandeiras")

# Mapeamento de nomes de municípios para normalização
MUNICIPIOS_MAP = {
    "Alta Floresta d'Oeste": "alta_floresta_doeste",
    "Alto Alegre dos Parecis": "alto_alegre_dos_parecis",
    "Alto Paraíso": "alto_paraiso",
    "Ariquemes": "ariquemes",
    "Alvorada d'Oeste": "alvorada_doeste",
    "Buritis": "buritis",
    "Cabixi": "cabixi",
    "Cacaulândia": "cacaulandia",
    "Cacoal": "cacoal",
    "Castanheiras": "castanheiras",
    "Campo Novo de Rondônia": "campo_novo_de_rondonia",
    "Cerejeiras": "cerejeiras",
    "Candeias do Jamari": "candeias_do_jamari",
    "Espigão d'Oeste": "espigao_doeste",
    "Chupinguaia": "chupinguaia",
    "Colorado d'Oeste": "colorado_doeste",
    "Costa Marques": "costa_marques",
    "Corumbiara": "corumbiara",
    "Cujubim": "cujubim",
    "Gov. Jorge Teixeira": "governador_jorge_teixeira",
    "Guajará-Mirim": "guajara_mirim",
    "Ji-Paraná": "ji_parana",
    "Jaru": "jaru",
    "Ministro Andreazza": "ministro_andreazza",
    "Machadinho d'Oeste": "machadinho_doeste",
    "Mirante da Serra": "mirante_da_serra",
    "Monte Negro": "monte_negro",
    "Nova Brasilândia d'Oeste": "nova_brasilandia_doeste",
    "Nova Mamoré": "nova_mamore",
    "Ouro Preto d'Oeste": "ouro_preto_doeste",
    "Nova União": "nova_uniao",
    "Parecis": "parecis",
    "Pimenta Bueno": "pimenta_bueno",
    "Pimenteiras": "pimenteiras_do_oeste",
    "Primavera de Rondônia": "primavera_de_rondonia",
    "Porto Velho": "porto_velho",
    "Presidente Médici": "presidente_medici",
    "Rio Crespo": "rio_crespo",
    "Santa Luzia": "santa_luzia_doeste",
    "Novo Horizonte": "novo_horizonte_do_oeste",
    "São Francisco do Guaporé": "sao_francisco_do_guapore",
    "São Felipe d'Oeste": "sao_felipe_doeste",
    "Rolim de Moura": "rolim_de_moura",
    "São Miguel do Guaporé": "sao_miguel_do_guapore",
    "Itapuã d'Oeste": "itapua_do_oeste",
    "Seringueiras": "seringueiras",
    "Teixeirópolis": "teixeiropolis",
    "Theobroma": "theobroma",
    "Vale do Paraíso": "vale_do_paraiso",
    "Urupá": "urupa",
    "Vale do Anari": "vale_do_anari",
    "Vilhena": "vilhena"
}

def normalizar_nome_arquivo(nome):
    """Normaliza nome do município para nome de arquivo"""
    # Remove /RO do final
    nome = re.sub(r'/RO$', '', nome)
    
    # Busca no mapeamento
    if nome in MUNICIPIOS_MAP:
        return MUNICIPIOS_MAP[nome]
    
    # Fallback: normalização automática
    nfkd = unicodedata.normalize('NFKD', nome)
    sem_acento = "".join([c for c in nfkd if not unicodedata.combining(c)])
    return sem_acento.replace(" ", "_").replace("'", "").replace("d'", "d").lower()

def baixar_imagem(url, destino):
    """Baixa uma imagem da URL e salva no destino"""
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=15, stream=True)
        response.raise_for_status()
        
        with open(destino, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return True
    except Exception as e:
        print(f"  ❌ Erro ao baixar: {e}")
        return False

def extrair_bandeiras_do_post():
    """Extrai URLs das bandeiras do post do blog"""
    print(f"🔍 Acessando post: {URL_POST}\n")
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(URL_POST, headers=headers, timeout=15)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Encontra todas as imagens no post
        post_body = soup.find('div', class_='post-body')
        if not post_body:
            print("❌ Não foi possível encontrar o conteúdo do post")
            return []
        
        bandeiras = []
        
        # Procura por padrão de imagem seguida de texto com nome do município
        for img in post_body.find_all('img'):
            img_url = img.get('src', '')
            
            # Pega o texto próximo (geralmente em uma div ou parágrafo)
            parent = img.parent
            if parent:
                texto = parent.get_text(strip=True)
                
                # Extrai nome do município do texto
                match = re.search(r'([^|]+)/RO', texto)
                if match:
                    nome_municipio = match.group(1).strip()
                    nome_arquivo = normalizar_nome_arquivo(nome_municipio)
                    
                    bandeiras.append({
                        'municipio': nome_municipio,
                        'arquivo': nome_arquivo,
                        'url': img_url
                    })
        
        print(f"✅ Encontradas {len(bandeiras)} bandeiras no post\n")
        return bandeiras
        
    except Exception as e:
        print(f"❌ Erro ao acessar post: {e}")
        return []

def main():
    """Função principal"""
    print("\n" + "=" * 80)
    print("SCRIPT DE DOWNLOAD DE BANDEIRAS - MUNICÍPIOS DE RONDÔNIA")
    print("=" * 80 + "\n")
    
    # Cria diretório se não existir
    BANDEIRAS_DIR.mkdir(parents=True, exist_ok=True)
    
    # Extrai bandeiras do post
    bandeiras = extrair_bandeiras_do_post()
    
    if not bandeiras:
        print("❌ Nenhuma bandeira encontrada. Verifique o URL do post.")
        return
    
    # Baixa cada bandeira
    print("=" * 80)
    print("BAIXANDO BANDEIRAS")
    print("=" * 80 + "\n")
    
    sucesso = 0
    erro = 0
    ja_existe = 0
    
    for i, bandeira in enumerate(bandeiras, 1):
        municipio = bandeira['municipio']
        arquivo = bandeira['arquivo']
        url = bandeira['url']
        
        destino = BANDEIRAS_DIR / f"{arquivo}.png"
        
        print(f"[{i}/{len(bandeiras)}] {municipio}")
        
        # Verifica se já existe
        if destino.exists():
            print(f"  ⏭️  Já existe: {destino.name}")
            ja_existe += 1
        else:
            print(f"  📥 Baixando de: {url[:60]}...")
            if baixar_imagem(url, destino):
                print(f"  ✅ Salvo: {destino.name}")
                sucesso += 1
            else:
                erro += 1
        
        print()
        time.sleep(0.5)  # Delay para não sobrecarregar o servidor
    
    # Resumo
    print("=" * 80)
    print("RESUMO")
    print("=" * 80)
    print(f"✅ Baixadas com sucesso: {sucesso}")
    print(f"⏭️  Já existiam: {ja_existe}")
    print(f"❌ Erros: {erro}")
    print(f"📊 Total processado: {len(bandeiras)}")
    print(f"\n📁 Bandeiras salvas em: {BANDEIRAS_DIR}")
    print("=" * 80 + "\n")

if __name__ == "__main__":
    main()

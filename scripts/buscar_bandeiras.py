#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script de automação para buscar e baixar bandeiras dos municípios de Rondônia
Utiliza Google Images e Wikipedia como fontes
"""

import os
import sys
import time
import requests
import unicodedata
from pathlib import Path
from urllib.parse import quote

# Municípios sem bandeira identificados
MUNICIPIOS_SEM_BANDEIRA = [
    "ALVORADA DO OESTE",
    "CABIXI",
    "CASTANHEIRAS",
    "COLORADO DO OESTE",
    "COSTA MARQUES",
    "CUJUBIM",
    "ESPIGÃO DO OESTE",
    "GOVERNADOR JORGE TEIXEIRA",
    "GUAJARÀ MIRRIM",
    "JI-PARANÁ",
    "MACHADINHO DO OESTE",
    "MIRANTE DA SERRA",
    "NOVA BRASILÂNDIA DO OESTE",
    "OURO PRETO DO OESTE",
    "PIMENTA BUENO",
    "PIMENTEIRAS DO OESTE",
    "PORTO VELHO",
    "PRESIDENTE MÉDICI",
    "PRIMAVERA DE RONDONIA",
    "ROLIM DE MOURA",
    "SÃO FRANCISCO DO GUAPORÉ",
    "TEIXEIRÓPOLIS",
    "URUPÁ",
    "VILHENA"
]

def normalizar_nome_arquivo(nome):
    """Normaliza nome para usar como nome de arquivo"""
    # Remove acentos
    nfkd = unicodedata.normalize('NFKD', nome)
    sem_acento = "".join([c for c in nfkd if not unicodedata.combining(c)])
    # Substitui espaços por underscores e converte para minúsculas
    return sem_acento.replace(" ", "_").replace("'", "").lower()

def buscar_bandeira_wikipedia(municipio):
    """
    Tenta buscar a bandeira do município na Wikipedia
    Retorna a URL da imagem se encontrada
    """
    print(f"  🔍 Buscando na Wikipedia...")
    
    # Formata o nome para a URL da Wikipedia
    nome_wiki = municipio.replace(" ", "_")
    urls_tentar = [
        f"https://pt.wikipedia.org/wiki/{nome_wiki}_(Rond%C3%B4nia)",
        f"https://pt.wikipedia.org/wiki/{nome_wiki}",
    ]
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    for url in urls_tentar:
        try:
            response = requests.get(url, headers=headers, timeout=10)
            if response.status_code == 200:
                # Procura por padrões comuns de bandeira na página
                if 'Bandeira' in response.text or 'bandeira' in response.text:
                    # Aqui você poderia fazer parsing HTML para extrair a URL da imagem
                    # Por simplicidade, vamos apenas indicar que encontrou
                    print(f"  ✅ Página encontrada: {url}")
                    return url
        except Exception as e:
            continue
    
    return None

def buscar_bandeira_google(municipio):
    """
    Gera URL de busca do Google Images para a bandeira do município
    """
    query = f"bandeira {municipio} Rondônia"
    query_encoded = quote(query)
    url = f"https://www.google.com/search?q={query_encoded}&tbm=isch"
    return url

def baixar_imagem(url, destino):
    """
    Baixa uma imagem da URL e salva no destino
    """
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

def gerar_relatorio_busca():
    """
    Gera relatório com links de busca para cada município
    """
    bandeiras_dir = Path("/home/ubuntu/web-dataro/src/assets/bandeiras")
    relatorio_path = Path("/home/ubuntu/web-dataro/scripts/relatorio_busca_bandeiras.md")
    
    print("\n" + "=" * 80)
    print("GERANDO RELATÓRIO DE BUSCA DE BANDEIRAS")
    print("=" * 80 + "\n")
    
    with open(relatorio_path, 'w', encoding='utf-8') as f:
        f.write("# Relatório de Busca de Bandeiras - Municípios de Rondônia\n\n")
        f.write(f"**Data:** {time.strftime('%d/%m/%Y %H:%M:%S')}\n\n")
        f.write(f"**Total de municípios sem bandeira:** {len(MUNICIPIOS_SEM_BANDEIRA)}\n\n")
        f.write("---\n\n")
        
        for i, municipio in enumerate(MUNICIPIOS_SEM_BANDEIRA, 1):
            print(f"[{i}/{len(MUNICIPIOS_SEM_BANDEIRA)}] Processando: {municipio}")
            
            nome_arquivo = normalizar_nome_arquivo(municipio)
            
            # Busca Wikipedia
            wiki_url = buscar_bandeira_wikipedia(municipio)
            
            # Gera URL de busca Google
            google_url = buscar_bandeira_google(municipio)
            
            # Escreve no relatório
            f.write(f"## {i}. {municipio}\n\n")
            f.write(f"**Nome do arquivo:** `{nome_arquivo}.png`\n\n")
            
            if wiki_url:
                f.write(f"**Wikipedia:** [{wiki_url}]({wiki_url})\n\n")
            else:
                f.write(f"**Wikipedia:** Não encontrada\n\n")
            
            f.write(f"**Google Images:** [Buscar bandeira]({google_url})\n\n")
            f.write(f"**Caminho de destino:** `src/assets/bandeiras/{nome_arquivo}.png`\n\n")
            f.write("**Status:** ⏳ Pendente\n\n")
            f.write("---\n\n")
            
            time.sleep(0.5)  # Pequeno delay para não sobrecarregar
    
    print(f"\n✅ Relatório gerado: {relatorio_path}")
    print(f"\n📋 Use o relatório para buscar manualmente as bandeiras e salvá-las em:")
    print(f"   {bandeiras_dir}\n")
    
    return relatorio_path

def gerar_script_download_manual():
    """
    Gera script auxiliar para download manual das bandeiras
    """
    script_path = Path("/home/ubuntu/web-dataro/scripts/download_bandeira_manual.sh")
    
    with open(script_path, 'w', encoding='utf-8') as f:
        f.write("#!/bin/bash\n")
        f.write("# Script auxiliar para download manual de bandeiras\n")
        f.write("# Uso: ./download_bandeira_manual.sh <URL_DA_IMAGEM> <NOME_DO_MUNICIPIO>\n\n")
        f.write('if [ $# -ne 2 ]; then\n')
        f.write('    echo "Uso: $0 <URL_DA_IMAGEM> <NOME_DO_MUNICIPIO>"\n')
        f.write('    echo "Exemplo: $0 https://exemplo.com/bandeira.png \\"Porto Velho\\""\n')
        f.write('    exit 1\n')
        f.write('fi\n\n')
        f.write('URL=$1\n')
        f.write('MUNICIPIO=$2\n')
        f.write('DESTINO_DIR="/home/ubuntu/web-dataro/src/assets/bandeiras"\n\n')
        f.write('# Normaliza o nome do município para nome de arquivo\n')
        f.write('NOME_ARQUIVO=$(echo "$MUNICIPIO" | iconv -f UTF-8 -t ASCII//TRANSLIT | tr "[:upper:]" "[:lower:]" | tr " " "_" | tr -d "\'")\n\n')
        f.write('echo "Baixando bandeira de $MUNICIPIO..."\n')
        f.write('wget -O "$DESTINO_DIR/${NOME_ARQUIVO}.png" "$URL"\n\n')
        f.write('if [ $? -eq 0 ]; then\n')
        f.write('    echo "✅ Bandeira baixada com sucesso: ${NOME_ARQUIVO}.png"\n')
        f.write('else\n')
        f.write('    echo "❌ Erro ao baixar bandeira"\n')
        f.write('    exit 1\n')
        f.write('fi\n')
    
    os.chmod(script_path, 0o755)
    print(f"✅ Script de download manual criado: {script_path}")
    print(f"\n💡 Para usar:")
    print(f'   ./scripts/download_bandeira_manual.sh "https://url-da-imagem.png" "Nome do Município"\n')

def main():
    """Função principal"""
    print("\n" + "=" * 80)
    print("SCRIPT DE AUTOMAÇÃO - BUSCA DE BANDEIRAS DE MUNICÍPIOS DE RONDÔNIA")
    print("=" * 80 + "\n")
    
    print(f"📊 Total de municípios sem bandeira: {len(MUNICIPIOS_SEM_BANDEIRA)}\n")
    
    # Gera relatório com links de busca
    relatorio_path = gerar_relatorio_busca()
    
    # Gera script auxiliar para download manual
    gerar_script_download_manual()
    
    print("\n" + "=" * 80)
    print("PRÓXIMOS PASSOS:")
    print("=" * 80)
    print("\n1. Abra o relatório gerado:")
    print(f"   {relatorio_path}")
    print("\n2. Para cada município, clique nos links de busca")
    print("\n3. Baixe a imagem da bandeira (preferencialmente PNG, alta resolução)")
    print("\n4. Use o script auxiliar para salvar:")
    print('   ./scripts/download_bandeira_manual.sh "URL" "Nome do Município"')
    print("\n5. Ou salve manualmente em:")
    print("   src/assets/bandeiras/<nome_normalizado>.png")
    print("\n6. Execute o script de atualização do bandeirasMap.js:")
    print("   python3 scripts/atualizar_bandeiras_map.py")
    print("\n" + "=" * 80 + "\n")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para organizar bandeiras baixadas e converter para PNG
"""

import os
import csv
import shutil
from pathlib import Path
from PIL import Image

# Diretórios
TEMP_DIR = Path("/tmp/bandeiras_temp")
DEST_DIR = Path("/home/ubuntu/web-dataro/src/assets/bandeiras")
CSV_FILE = Path("/home/ubuntu/buscar_bandeiras_municipios.csv")

# Mapeamento de nomes
NOME_MAP = {
    "ALVORADA DO OESTE": "Alvorada do Oeste",
    "CABIXI": "Cabixi",
    "CASTANHEIRAS": "Castanheiras",
    "COLORADO DO OESTE": "Colorado do Oeste",
    "COSTA MARQUES": "Costa Marques",
    "ESPIGÃO DO OESTE": "Espigao do Oeste",
    "GOVERNADOR JORGE TEIXEIRA": "Governador Jorge Teixeira",
    "GUAJARÁ MIRIM": "Guajara Mirim",
    "JARU": "Jaru",
    "JI-PARANÁ": "Ji-Parana",
    "MACHADINHO DO OESTE": "Machadinho do Oeste",
    "MIRANTE DA SERRA": "Mirante da Serra",
    "NOVA BRASILÂNDIA DO OESTE": "Nova Brasilandia do Oeste",
    "PIMENTEIRAS DO OESTE": "Pimenteiras do Oeste",
    "PRESIDENTE MÉDICI": "Presidente Medici",
    "PRIMAVERA DE RONDONIA": "Primavera de Rondonia",
    "SÃO FRANCISCO DO GUAPORÉ": "Sao Francisco do Guapore",
    "TEIXEIRÓPOLIS": "Teixeiropolis",
    "URUPÁ": "Urupa",
}

def converter_para_png(arquivo_origem, arquivo_destino):
    """Converte imagem para PNG se necessário"""
    try:
        with Image.open(arquivo_origem) as img:
            # Converter para RGB se for RGBA ou outro modo
            if img.mode in ('RGBA', 'LA', 'P'):
                # Criar fundo branco
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Salvar como PNG
            img.save(arquivo_destino, 'PNG', optimize=True)
            return True
    except Exception as e:
        print(f"❌ Erro ao converter {arquivo_origem}: {e}")
        return False

def main():
    """Função principal"""
    print("\n" + "=" * 80)
    print("ORGANIZANDO BANDEIRAS BAIXADAS")
    print("=" * 80 + "\n")
    
    # Criar diretório de destino se não existir
    DEST_DIR.mkdir(parents=True, exist_ok=True)
    
    # Ler CSV com resultados
    bandeiras_processadas = 0
    bandeiras_erro = 0
    
    with open(CSV_FILE, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            municipio = row['Município']
            encontrada = row['Bandeira Encontrada'] == 'True'
            arquivo_temp = row['Arquivo da Bandeira']
            resolucao = row['Resolução']
            fonte = row['Fonte']
            
            if not encontrada:
                print(f"⚠️  {municipio:<40} - Não encontrada")
                bandeiras_erro += 1
                continue
            
            # Extrair nome do arquivo do caminho codificado
            arquivo_temp_path = Path(arquivo_temp)
            
            # Buscar arquivo no diretório temp
            arquivos_temp = list(TEMP_DIR.glob(f"*{arquivo_temp_path.stem}*"))
            
            if not arquivos_temp:
                print(f"❌ {municipio:<40} - Arquivo não encontrado")
                bandeiras_erro += 1
                continue
            
            arquivo_origem = arquivos_temp[0]
            
            # Nome do arquivo de destino
            nome_arquivo = NOME_MAP.get(municipio, municipio.title())
            arquivo_destino = DEST_DIR / f"{nome_arquivo}.png"
            
            # Converter e salvar
            if converter_para_png(arquivo_origem, arquivo_destino):
                print(f"✅ {municipio:<40} → {arquivo_destino.name} ({resolucao})")
                bandeiras_processadas += 1
            else:
                print(f"❌ {municipio:<40} - Erro ao processar")
                bandeiras_erro += 1
    
    print("\n" + "=" * 80)
    print("RESUMO:")
    print("=" * 80)
    print(f"✅ Bandeiras processadas: {bandeiras_processadas}")
    print(f"❌ Erros: {bandeiras_erro}")
    print(f"📊 Total: {bandeiras_processadas + bandeiras_erro}")
    print(f"\n📁 Bandeiras salvas em: {DEST_DIR}")
    print("=" * 80 + "\n")

if __name__ == "__main__":
    main()

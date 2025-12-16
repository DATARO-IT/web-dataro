#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para gerar URLs públicas do Google Drive para as bandeiras
"""

import subprocess
import json

# Pasta no Google Drive
GDRIVE_PATH = "manus_google_drive:DATARO/bandeiras_municipios/"

# Obter lista de arquivos
cmd = f"rclone lsf {GDRIVE_PATH} --config /home/ubuntu/.gdrive-rclone.ini"
result = subprocess.run(cmd, shell=True, capture_output=True, text=True)

arquivos = [f.strip() for f in result.stdout.split('\n') if f.strip().endswith('.png')]

print(f"Total de arquivos encontrados: {len(arquivos)}")
print("\nGerando links públicos...\n")

# Para cada arquivo, gerar link público
urls = {}
for arquivo in sorted(arquivos):
    caminho_completo = f"{GDRIVE_PATH}{arquivo}"
    # Escapar espaços com aspas
    cmd_link = f"rclone link '{caminho_completo}' --config /home/ubuntu/.gdrive-rclone.ini"
    result_link = subprocess.run(cmd_link, shell=True, capture_output=True, text=True)
    
    if result_link.returncode == 0:
        url = result_link.stdout.strip()
        # Converter para URL de visualização direta
        if "drive.google.com" in url:
            file_id = url.split("/")[-2] if "/file/d/" in url else url.split("id=")[-1]
            url_direta = f"https://drive.google.com/uc?export=view&id={file_id}"
            urls[arquivo] = url_direta
            print(f"✅ {arquivo}")
            print(f"   {url_direta}\n")
        else:
            print(f"❌ {arquivo} - Link inválido: {url}")
    else:
        print(f"❌ {arquivo} - Erro: {result_link.stderr}")

# Salvar em arquivo JSON
with open('/home/ubuntu/web-dataro/scripts/bandeiras_urls.json', 'w', encoding='utf-8') as f:
    json.dump(urls, f, indent=2, ensure_ascii=False)

print(f"\n✅ URLs salvas em: /home/ubuntu/web-dataro/scripts/bandeiras_urls.json")
print(f"Total de URLs geradas: {len(urls)}")

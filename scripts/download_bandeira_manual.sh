#!/bin/bash
# Script auxiliar para download manual de bandeiras
# Uso: ./download_bandeira_manual.sh <URL_DA_IMAGEM> <NOME_DO_MUNICIPIO>

if [ $# -ne 2 ]; then
    echo "Uso: $0 <URL_DA_IMAGEM> <NOME_DO_MUNICIPIO>"
    echo "Exemplo: $0 https://exemplo.com/bandeira.png \"Porto Velho\""
    exit 1
fi

URL=$1
MUNICIPIO=$2
DESTINO_DIR="/home/ubuntu/web-dataro/src/assets/bandeiras"

# Normaliza o nome do município para nome de arquivo
NOME_ARQUIVO=$(echo "$MUNICIPIO" | iconv -f UTF-8 -t ASCII//TRANSLIT | tr "[:upper:]" "[:lower:]" | tr " " "_" | tr -d "'")

echo "Baixando bandeira de $MUNICIPIO..."
wget -O "$DESTINO_DIR/${NOME_ARQUIVO}.png" "$URL"

if [ $? -eq 0 ]; then
    echo "✅ Bandeira baixada com sucesso: ${NOME_ARQUIVO}.png"
else
    echo "❌ Erro ao baixar bandeira"
    exit 1
fi

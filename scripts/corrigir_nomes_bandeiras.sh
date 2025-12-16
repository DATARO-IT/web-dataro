#!/bin/bash
# Script para corrigir nomes de bandeiras que não foram mapeadas

cd /home/ubuntu/web-dataro/src/assets/bandeiras

# Criar cópias com nomes alternativos para melhor matching
echo "Criando cópias com nomes alternativos..."

# GUAJARÀ MIRRIM (com acento grave)
if [ -f "Guajara-Mirim.png" ]; then
    cp "Guajara-Mirim.png" "Guajara Mirim.png"
    echo "✅ Guajara Mirim"
fi

# JARU
if [ -f "Jaru.png" ]; then
    cp "Jaru.png" "jaru.png"
    echo "✅ Jaru"
fi

# URUPÁ (com acento)
if [ -f "Urupa.png" ]; then
    cp "Urupa.png" "urupa.png"
    echo "✅ Urupa"
fi

echo ""
echo "Arquivos criados:"
ls -1 | grep -i "jaru\|guajara\|urupa"

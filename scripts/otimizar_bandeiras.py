#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para otimizar bandeiras dos municípios
- Redimensionar para tamanho máximo de 800x600px
- Comprimir com qualidade 85%
- Converter para PNG otimizado
"""

import os
from pathlib import Path
from PIL import Image

# Diretórios
BANDEIRAS_DIR = Path("/home/ubuntu/web-dataro/src/assets/bandeiras")
BACKUP_DIR = Path("/home/ubuntu/web-dataro/bandeiras_backup")

# Configurações
MAX_WIDTH = 800
MAX_HEIGHT = 600
QUALITY = 85

def otimizar_imagem(arquivo_origem):
    """Otimiza uma imagem"""
    try:
        with Image.open(arquivo_origem) as img:
            # Obter dimensões originais
            width, height = img.size
            original_size = os.path.getsize(arquivo_origem)
            
            # Calcular novas dimensões mantendo aspect ratio
            ratio = min(MAX_WIDTH / width, MAX_HEIGHT / height)
            
            # Só redimensionar se for maior que o máximo
            if ratio < 1:
                new_width = int(width * ratio)
                new_height = int(height * ratio)
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                redimensionada = True
            else:
                new_width, new_height = width, height
                redimensionada = False
            
            # Converter para RGB se necessário
            if img.mode in ('RGBA', 'LA', 'P'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'P':
                    img = img.convert('RGBA')
                if img.mode in ('RGBA', 'LA'):
                    background.paste(img, mask=img.split()[-1])
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Salvar otimizada
            img.save(arquivo_origem, 'PNG', optimize=True, quality=QUALITY)
            
            # Calcular economia
            new_size = os.path.getsize(arquivo_origem)
            economia = original_size - new_size
            economia_pct = (economia / original_size) * 100 if original_size > 0 else 0
            
            return {
                'sucesso': True,
                'original_size': original_size,
                'new_size': new_size,
                'economia': economia,
                'economia_pct': economia_pct,
                'redimensionada': redimensionada,
                'dimensoes': f"{new_width}x{new_height}"
            }
    except Exception as e:
        return {
            'sucesso': False,
            'erro': str(e)
        }

def main():
    """Função principal"""
    print("\n" + "=" * 80)
    print("OTIMIZAÇÃO DE BANDEIRAS DOS MUNICÍPIOS")
    print("=" * 80 + "\n")
    
    # Criar backup
    print("📦 Criando backup...")
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    
    # Listar bandeiras
    bandeiras = list(BANDEIRAS_DIR.glob("*.png")) + \
                list(BANDEIRAS_DIR.glob("*.jpg")) + \
                list(BANDEIRAS_DIR.glob("*.jpeg"))
    
    print(f"✅ {len(bandeiras)} bandeiras encontradas\n")
    
    # Estatísticas
    total_original = 0
    total_novo = 0
    otimizadas = 0
    erros = 0
    redimensionadas = 0
    
    print("=" * 80)
    print("PROCESSANDO:")
    print("=" * 80 + "\n")
    
    for bandeira in bandeiras:
        # Fazer backup
        backup_path = BACKUP_DIR / bandeira.name
        if not backup_path.exists():
            import shutil
            shutil.copy2(bandeira, backup_path)
        
        # Otimizar
        resultado = otimizar_imagem(bandeira)
        
        if resultado['sucesso']:
            total_original += resultado['original_size']
            total_novo += resultado['new_size']
            otimizadas += 1
            if resultado['redimensionada']:
                redimensionadas += 1
            
            # Mostrar resultado
            economia_kb = resultado['economia'] / 1024
            status = "📐" if resultado['redimensionada'] else "✅"
            print(f"{status} {bandeira.name:<40} {resultado['dimensoes']:<12} "
                  f"{economia_kb:>8.1f} KB ({resultado['economia_pct']:>5.1f}%)")
        else:
            erros += 1
            print(f"❌ {bandeira.name:<40} ERRO: {resultado['erro']}")
    
    # Resumo
    total_economia = total_original - total_novo
    total_economia_pct = (total_economia / total_original) * 100 if total_original > 0 else 0
    
    print("\n" + "=" * 80)
    print("RESUMO:")
    print("=" * 80)
    print(f"✅ Bandeiras otimizadas: {otimizadas}")
    print(f"📐 Bandeiras redimensionadas: {redimensionadas}")
    print(f"❌ Erros: {erros}")
    print(f"\n📊 ECONOMIA DE ESPAÇO:")
    print(f"   Tamanho original: {total_original / 1024 / 1024:.2f} MB")
    print(f"   Tamanho otimizado: {total_novo / 1024 / 1024:.2f} MB")
    print(f"   Economia total: {total_economia / 1024 / 1024:.2f} MB ({total_economia_pct:.1f}%)")
    print(f"\n📁 Backup salvo em: {BACKUP_DIR}")
    print("=" * 80 + "\n")

if __name__ == "__main__":
    main()

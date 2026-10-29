#!/bin/sh
# Regenera data/vocabulario.js y tools/vocab/informe.md. Uso: sh tools/vocab/construir.sh "C:/ruta/familia_romana.md"
LIBRO="${1:-C:/Users/Eric Pezoa/Downloads/familia_romana.md}"
python -X utf8 tools/vocab_index.py "$LIBRO" --glosas tools/vocab/glosas.txt tools/vocab/glosas-*.txt

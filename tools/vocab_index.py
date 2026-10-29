"""Lee el INDEX VOCABVLORVM del OCR de «Familia Romana» (fuera de la repo) y saca, por lema, el primer capítulo
donde aparece. El libro NO se copia: solo se toman hechos (qué palabra entra en qué capítulo).

    python -X utf8 tools/vocab_index.py "C:/Users/Eric Pezoa/Downloads/familia_romana.md"            # resumen
    python -X utf8 tools/vocab_index.py LIBRO.md --glosas tools/vocab/glosas.txt --out data/vocabulario.js --informe tools/vocab/informe.md

Sin --glosas solo muestra el índice leído. Con --glosas (la lista escrita a mano: una línea por lema) coteja la
lista con el índice y escribe:
  · data/vocabulario.js  → el vocabulario completo, por capítulo;
  · tools/vocab/informe.md → discrepancias para revisar a mano (lemas de la lista que el índice no tiene, lemas del
    índice sin glosa, capítulos que no coinciden, lemas que no aparecen en el texto de su capítulo).

Formato de glosas.txt (columnas separadas por |, comentarios con #; los lemas van con macrones):
  cap | lema | formas | clase | glosa | relaciones
  2 | puella | -ae f | n | niña, muchacha | ↔ puer
  Verbos: el lema es el infinitivo y «formas» las partes principales completas (cantō, -āre, -āvī, -ātum).
  clase: n (nombre), v (verbo), adj, adv, prep, conj, pron, num, interj, otro
  relaciones (opcional): «= sinónimo», «↔ contrario», «< de donde viene», separadas por « · ».
El capítulo de la lista debe ser el del índice; si no coincide, el informe lo señala."""
import argparse, json, os, re, sys, unicodedata
from collections import defaultdict

CAPS = 35


def plano(s):
    """Clave de comparación: sin macrones ni guiones, minúsculas, i/j y u/v iguales no se tocan (el libro usa i y u)."""
    s = unicodedata.normalize('NFD', s)
    s = ''.join(c for c in s if not unicodedata.combining(c))
    return re.sub(r'[^a-z]', '', s.lower())


def lee_indice(md):
    lineas = open(md, encoding='utf-8').read().split('\n')
    a = next(i for i, l in enumerate(lineas) if l.startswith('## INDEX VOCABVLORVM'))
    b = next(i for i, l in enumerate(lineas) if i > a and l.startswith('### INDEX GRAMMATICVS'))
    texto = []
    for l in lineas[a + 2:b]:
        l = l.strip().strip('#').strip()
        if not l or re.fullmatch(r'\d{3}', l) or re.fullmatch(r'(?:[A-Z]\s*){1,3}', l):
            continue  # número de página, letra de sección
        texto.append(l)
    t = ' '.join(texto)
    t = re.sub(r'(?<=[^\d\s(;,.-])(?=\d+[.,]\d)', ' ', t)  # «accūsāre4.48» → «accūsāre 4.48»
    t = re.sub(r'(?<=[a-zāēīōū])(?=\+)', ' ', t)
    return t


ANOT = {'pl', 'plm', 'n', 'm', 'f', 'sg', 'sup', 'comp', 'adv', 'v.', 'v', 'mpl', 'npl', 'gen', 'dat', 'acc', 'abl',
        'indecl', 'i.', 'm.', 'n.', 'inf', 'imp'}


def entradas(t):
    """Parte el texto en entradas «lema … localizadores». Una entrada acaba cuando, tras los localizadores
    (cifras con punto), aparece una palabra que no es una anotación breve (pl, n, +dat…)."""
    toks = t.split()
    out, cur, vistos_loc = [], [], False
    esnum = lambda w: bool(re.search(r'\d', w)) and bool(re.fullmatch(r"[\d.,;()\-–u«»\[\]]*\d[\d.,;()\-–]*[;,]?", w.replace('l', '1') if re.fullmatch(r'[\dl.,;()]+', w) else w))
    for w in toks:
        if re.search(r'\d', w):
            cur.append(w); vistos_loc = True; continue
        if vistos_loc:
            baja = w.lower().strip('.,;')
            if w.startswith('+') or baja in ANOT or len(baja) <= 1 or w in ('v.', '...'):
                cur.append(w); continue
            out.append(cur); cur, vistos_loc = [w], False
        else:
            cur.append(w)
    if cur:
        out.append(cur)
    return out


def primer_capitulo(partes):
    for w in partes:
        m = re.match(r'(\d{1,2})[.,]\d', w)
        if m:
            c = int(m.group(1))
            return c if 1 <= c <= CAPS else None
    return None


def difuso(k):
    """El OCR confunde i, l, 1 e I: para cotejar se tratan como la misma letra."""
    return k.replace('l', 'i').replace('j', 'i')


def claves_de(cabeza):
    """Posibles lemas de una cabeza del índice: el token tal cual, con un guion de compuesto («ab-dūcere»), con el genitivo
    pegado («amīcus-īm») y sin la letra de más que el OCR deja al final («ex-pugnārel»)."""
    partes = [x for x in cabeza.split('-') if x]
    ks = set()
    for j in range(1, len(partes) + 1):
        ks.add(plano(''.join(partes[:j])))
    if len(partes) > 1 and len(plano(partes[1])) <= 5 and plano(partes[1])[:1] in 'iaeuo':
        ks.add(plano(partes[0]))  # lema + terminación de genitivo
    ks |= {k[:-1] for k in ks if len(k) > 4}
    return {difuso(k) for k in ks if k}


def parsea(md):
    """→ lista de (cabeza, claves, capitulo, texto crudo)"""
    res = []
    for e in entradas(lee_indice(md)):
        crudo = ' '.join(e)
        if not re.search(r'\d', crudo):
            continue
        cabeza = e[0].rstrip('.,;')
        res.append((cabeza, claves_de(cabeza), primer_capitulo(e), crudo))
    return res


def texto_capitulos(md):
    """Texto plano (sin macrones) de cada capítulo del libro, para comprobar que un lema aparece donde dice el índice."""
    lineas = open(md, encoding='utf-8').read().split('\n')
    marcas = [(i, l) for i, l in enumerate(lineas) if re.match(r'CAPITVLVM', l)]
    fin = next(i for i, l in enumerate(lineas) if l.startswith('## INDEX VOCABVLORVM'))
    # la lista de marcas del OCR incluye algún título repetido; se toma el orden y se aceptan las 35 primeras distintas
    marcas = [m for m in marcas if m[0] < fin][:CAPS]
    out = {}
    for k, (i, _) in enumerate(marcas):
        j = marcas[k + 1][0] if k + 1 < len(marcas) else fin
        out[k + 1] = plano('\n'.join(lineas[i:j]).replace('<br>', ' '))
    return out


def listas_capitulo(md):
    """Texto crudo de las listas «Vocābula nova» de cada capítulo (el OCR las deja revueltas con las tablas):
    sirve para cotejar a ojo lo que entra en cada capítulo con lo que dice el índice."""
    lineas = open(md, encoding='utf-8').read().split(chr(10))
    fin = next(i for i, l in enumerate(lineas) if l.startswith('## INDEX VOCABVLORVM'))
    marcas = [i for i, l in enumerate(lineas) if re.match(r'CAPITVLVM', l) and i < fin][:CAPS]
    out = {}
    for k, i in enumerate(marcas):
        j = marcas[k + 1] if k + 1 < len(marcas) else fin
        bloque = chr(10).join(lineas[i:j]).replace('<br>', ' ')
        trozos = []
        for m in re.finditer(r'Voc[aā]bula\s*nov[aā]?:?', bloque):
            t = bloque[m.end():m.end() + 1400]
            t = re.split(r'PENSVM', t)[0]
            trozos.append(re.sub(r'[|]+', ' ', t).strip())
        out[k + 1] = ' · '.join(trozos)
    return out


def lee_glosas(ruta):
    filas = []
    for n, l in enumerate(open(ruta, encoding='utf-8'), 1):
        l = l.rstrip('\n')
        if not l.strip() or l.lstrip().startswith('#'):
            continue
        p = [x.strip() for x in l.split('|')]
        if len(p) < 5:
            print(f'glosas.txt:{n}: faltan columnas → {l[:60]}', file=sys.stderr); continue
        p += [''] * (6 - len(p))
        filas.append(dict(cap=int(p[0]), la=p[1].strip(), formas=p[2].strip(), clase=p[3].strip(), es=p[4].strip(), rel=p[5].strip(), n=n))
    return filas


def js_str(s):
    return json.dumps(s, ensure_ascii=False)


def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('libro')
    ap.add_argument('--glosas', nargs='+', help='uno o varios archivos de glosas')
    ap.add_argument('--out', default='data/vocabulario.js')
    ap.add_argument('--informe', default='tools/vocab/informe.md')
    ap.add_argument('--listas', action='store_true', help='mostrar las listas «Vocābula nova» crudas de cada capítulo y salir')
    ap.add_argument('--hasta', type=int, default=CAPS, help='solo hasta este capítulo (para revisiones parciales)')
    a = ap.parse_args()

    if a.listas:
        for c, t in listas_capitulo(a.libro).items():
            print(f'--- cap. {c}: {t[:1500]}')
        return
    ind = parsea(a.libro)
    por_cap = defaultdict(list)
    for cab, cl, cap, crudo in ind:
        por_cap[cap].append(cab)
    print(len(ind), 'entradas del índice;', 'por capítulo:', {k: len(v) for k, v in sorted(por_cap.items(), key=lambda x: (x[0] is None, x[0]))})
    if not a.glosas:
        return

    glosas = [g for f in a.glosas for g in lee_glosas(f)]
    vistos = {}
    for g in glosas:
        if g['la'] in vistos and vistos[g['la']] != g['cap']:
            print('lema repetido en otro capítulo:', g['la'], vistos[g['la']], g['cap'], file=sys.stderr)
        vistos[g['la']] = g['cap']
    clave_a_ind = defaultdict(list)
    for cab, cl, cap, crudo in ind:
        for c in cl:
            clave_a_ind[c].append((cab, cap, crudo))
    texto = texto_capitulos(a.libro)

    informe = ['# Informe de vocabulario', '', f'Entradas leídas del índice: {len(ind)} · lemas de la lista a mano: {len(glosas)}', '']
    sin_indice, otro_cap, no_en_texto, usadas = [], [], [], set()
    for g in glosas:
        k = difuso(plano(g['la']))
        hits = clave_a_ind.get(k)
        if not hits:
            sin_indice.append(g); continue
        for cab, cap, crudo in hits:
            usadas.add((cab, crudo))
        caps = sorted({c for _, c, _ in hits if c})
        if caps and g['cap'] != min(caps):
            otro_cap.append((g, caps))
        base = plano(g['la'])[:max(4, len(plano(g['la'])) - 3)]
        if g['cap'] in texto and base not in texto[g['cap']]:
            no_en_texto.append(g)
    legible = lambda cab: bool(re.fullmatch(r"[A-Za-zāēīōūĀĒĪŌŪ-]{2,}", cab)) and len(plano(cab)) >= 2
    sin_glosa = [(cab, cap, crudo) for cab, cl, cap, crudo in ind
                 if (cab, crudo) not in usadas and cap and cap <= a.hasta and legible(cab)]

    def seccion(titulo, filas, fmt):
        informe.extend([f'## {titulo} ({len(filas)})', ''])
        informe.extend(fmt(f) for f in filas)
        informe.append('')
    seccion('En la lista pero no en el índice (revisar ortografía o añadido a mano)', sin_indice,
            lambda g: f"- cap. {g['cap']} · {g['la']} (línea {g['n']})")
    seccion('Capítulo distinto al del índice', otro_cap,
            lambda x: f"- {x[0]['la']}: lista cap. {x[0]['cap']}, índice cap. {x[1]} (línea {x[0]['n']})")
    seccion('No aparece en el texto de su capítulo del libro (puede ser un derivado o un error de OCR)', no_en_texto,
            lambda g: f"- cap. {g['cap']} · {g['la']}")
    seccion(f'En el índice (hasta el cap. {a.hasta}) sin glosa en la lista', sin_glosa,
            lambda x: f"- cap. {x[1]} · {x[0]}   ← «{x[2][:70]}»")
    os.makedirs(os.path.dirname(a.informe) or '.', exist_ok=True)
    open(a.informe, 'w', encoding='utf-8').write('\n'.join(informe))

    por = defaultdict(list)
    for g in glosas:
        por[g['cap']].append(g)
    lineas = ['/* Vocabulario de Lingua Latina por capítulo. Generado por tools/vocab_index.py desde tools/vocab/glosas.txt; no editar a mano.',
              '   Cada lema: [latín, formas, clase, glosa, relaciones]. El primer capítulo de cada palabra sigue el índice de Familia Romana (solo el dato, no el texto). */',
              'const VOCAB={']
    for cap in sorted(por):
        filas = ','.join('[' + ','.join(js_str(x) for x in (g['la'], g['formas'], g['clase'], g['es'], g['rel'])) + ']' for g in por[cap])
        lineas.append(f' {cap}:[{filas}],')
    lineas.append('};')
    os.makedirs(os.path.dirname(a.out) or '.', exist_ok=True)
    open(a.out, 'w', encoding='utf-8').write('\n'.join(lineas) + '\n')
    print('escrito', a.out, '·', len(glosas), 'lemas ·', a.informe, ':',
          len(sin_indice), 'sin índice,', len(otro_cap), 'otro cap.,', len(no_en_texto), 'no en el texto,', len(sin_glosa), 'sin glosa')


if __name__ == '__main__':
    main()

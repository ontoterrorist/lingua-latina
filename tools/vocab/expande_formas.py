"""Expande las partes principales abreviadas de los verbos compuestos de glosas*.txt a formas completas
(«accurrō, -ere, -currī, -cursum» → «accurrō, -ere, accurrī, accursum»), para que morfo.js solo vea formas completas
o los sufijos regulares (-āvī, -uī, -īvī, -ātum, -itum, -ītum). Se ejecuta una vez; revisa la salida a ojo.

    python -X utf8 tools/vocab/expande_formas.py tools/vocab/glosas-*.txt [--aplicar]"""
import re, sys, unicodedata


def plano(s):
    s = unicodedata.normalize('NFD', s)
    return ''.join(c for c in s if not unicodedata.combining(c)).lower()


REGULARES = {'-āvī', '-uī', '-īvī', '-ātum', '-itum', '-ītum', '-ēvī', '-ētum'}
OVERRIDE = {  # perfectos que no salen de la regla general
    'cōnsistō': 'cōnstitī', 'dēsistō': 'dēstitī', 'resistō': 'restitī', 'cōnstō': 'cōnstitī', 'praestō': 'praestitī',
    'ērubescō': 'ērubuī', 'redimō': 'redēmī', 'absum': 'āfuī', 'insum': 'īnfuī', 'adsum': 'affuī', 'dēsum': 'dēfuī',
}
PARTES = {  # perfecto y supino completos de los casos que la regla general no resuelve
    'teneō': ['tenuī', 'tentum'], 'sustineō': ['sustinuī', 'sustentum'], 'retineō': ['retinuī', 'retentum'],
    'contineō': ['continuī', 'contentum'], 'abstineō': ['abstinuī', 'abstentum'], 'secō': ['secuī', 'sectum'],
    'minuō': ['minuī', 'minūtum'], 'statuō': ['statuī', 'statūtum'], 'cōnstituō': ['cōnstituī', 'cōnstitūtum'],
    'dēserō': ['dēseruī', 'dēsertum'], 'proiciō': ['proiēcī', 'proiectum'], 'ēiciō': ['ēiēcī', 'ēiectum'],
    'ēvolvō': ['ēvolvī', 'ēvolūtum'],
}
SUP_OVERRIDE = {'redimō': 'redēmptum', 'cōnstō': '', 'praestō': ''}


def pone(prefijo_de, stem, tok):
    """prefijo + resto: el prefijo es lo que queda de la raíz presente hasta la última letra que coincide con la primera del sufijo"""
    t = tok.lstrip('-')
    p = plano(stem)
    i = p.rfind(plano(t[0]), 1)
    return stem[:i] + t if i > 0 else stem + t


def expande(partes):
    t0 = partes[0]
    if len(partes) < 2:
        return partes
    if t0 in ('inquit', 'possum') or t0.endswith('or') or (partes[1] == '-īre' and t0.endswith('eō')) or partes[1:2] == ['īre']:
        return partes
    if t0 in PARTES:
        return [t0, partes[1]] + PARTES[t0]
    stem = t0[:-1] if t0.endswith('ō') else t0
    if t0.endswith('sum'):  # compuestos de esse
        base = t0[:-3]
        out = [t0, partes[1]]
        if len(partes) > 2:
            out.append(OVERRIDE.get(t0, base + 'fuī'))
        return out
    out = [t0, partes[1]]
    for k, tok in enumerate(partes[2:]):
        if not tok.startswith('-'):
            out.append(tok); continue
        if tok in REGULARES:
            out.append(tok); continue
        if k == 0 and t0 in OVERRIDE:
            out.append(OVERRIDE[t0]); continue
        if k == 1 and t0 in SUP_OVERRIDE:
            out.append(SUP_OVERRIDE[t0]); continue
        if tok in ('-tulī', '-lātum'):
            out.append(t0[:-len('ferō')] + tok.lstrip('-')); continue
        if tok == '-dī':
            out.append(stem + 'ī'); continue
        if tok in ('-sum', '-tum'):
            out.append(stem[:-1] + tok.lstrip('-')); continue
        if tok == '-uī' and t0.endswith('uō'):
            out.append(stem + 'ī'); continue
        if tok.startswith('-') and k == 0 and tok[1:] in ('uī',):
            out.append(tok); continue
        out.append(pone(None, stem, tok))
    return out


def main():
    aplicar = '--aplicar' in sys.argv
    for f in [a for a in sys.argv[1:] if not a.startswith('--')]:
        lineas = open(f, encoding='utf-8').read().split('\n')
        cambios = 0
        for n, l in enumerate(lineas):
            if l.startswith('#') or '|' not in l:
                continue
            c = [x.strip() for x in l.split('|')]
            if len(c) < 5 or c[3] != 'v' or ', ' not in c[2]:
                continue
            partes = [re.sub(r'\s*\(.*?\)', '', x) for x in c[2].split(', ')]
            if partes[0] == 'eō':
                continue
            nuevo = expande(partes)
            if nuevo != c[2].split(', '):
                cambios += 1
                print(f'{c[0]:>2} {c[1]:<16} {c[2]:<46} → {", ".join(nuevo)}')
                c[2] = ', '.join(nuevo)
                lineas[n] = ' | '.join(c) if c[5:] and c[5] else ' | '.join(c) + ' |' if len(c) == 5 else ' | '.join(c)
        if aplicar and cambios:
            open(f, 'w', encoding='utf-8').write('\n'.join(lineas))


main()

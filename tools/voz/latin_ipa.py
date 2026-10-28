"""Latín clásico → IPA, para dárselo directamente al modelo de voz (sin pasar por la ortografía italiana).

Pronunciación restaurada: c = k, v = w, qu = kw, ae = ai, au = au, i/u consonánticas = j/w, s siempre sorda,
-m final se pronuncia, vocal larga (macrón) = vocal + ː. El acento sigue la regla latina: en palabras de dos
sílabas la primera; en las demás, la penúltima si es larga (vocal larga, diptongo o vocal + dos consonantes) y
si no la antepenúltima; con -que, la sílaba anterior a la enclítica.

    python latin_ipa.py "Aemilia, familia domī est."
"""
import re, sys

MACRON = str.maketrans('āēīōūȳĀĒĪŌŪ', 'aeiouyAEIOU')
LARGAS = set('āēīōūȳ')
VOC = 'aeiouy'
SIN_ENCLITICA = {'denique', 'undique', 'itaque', 'atque', 'neque', 'quoque', 'usque', 'namque', 'quisque'}
ATONAS = {'et', 'in', 'ad', 'ab', 'ex', 'ut', 'ne', 'sed', 'cum', 'de', 'a', 'e', 'ac', 'at'}
STOPS = set('pbtdkɡf')


def analyze(word):
    """(letras sin macrón, vocal larga?, i/u consonántica?, núcleos silábicos [(ini, fin)])."""
    low = word.lower()
    letters = low.translate(MACRON).replace('j', 'i')
    longs = [c in LARGAS for c in low]
    n = len(letters)
    cons = [False] * n
    for i, c in enumerate(letters):
        prev = letters[i - 1] if i else ''
        nxt = letters[i + 1] if i + 1 < n else ''
        if c == 'u' and (prev == 'q' or (prev == 'g' and nxt in VOC and i >= 2 and letters[i - 2] == 'n')):
            cons[i] = True
        elif c == 'i' and nxt in VOC and (i == 0 or prev in VOC):
            cons[i] = True
    nuclei, i = [], 0
    while i < n:
        if letters[i] in VOC and not cons[i]:
            if i + 1 < n and letters[i:i + 2] in ('ae', 'oe', 'au') and not cons[i + 1]:
                nuclei.append((i, i + 2)); i += 2; continue
            nuclei.append((i, i + 1))
        i += 1
    return letters, longs, cons, nuclei


def heavy(letters, longs, cons, nucleus, nxt_nucleus):
    s, e = nucleus
    if e - s == 2 or longs[s]:
        return True
    grupo = [c for k, c in enumerate(letters[e:nxt_nucleus[0]], e)
             if c != 'h' and not (c == 'u' and cons[k] and letters[k - 1] == 'q')]
    n = sum(2 if c in 'xz' else 1 for c in grupo)
    return n >= 2 and not (n == 2 and grupo[0] in 'bcdgpt' and grupo[1] in 'lr')


def tonic_nucleus(letters, longs, cons, nuclei):
    n = len(nuclei)
    if n < 2:
        return None
    if n == 2:
        return nuclei[0]
    if letters.endswith('que') and letters not in SIN_ENCLITICA:
        return nuclei[n - 2]
    pen = nuclei[n - 2]
    return pen if heavy(letters, longs, cons, pen, nuclei[n - 1]) else nuclei[n - 3]


def word_ipa(word):
    letters, longs, cons, nuclei = analyze(word)
    tonic = tonic_nucleus(letters, longs, cons, nuclei)
    mono = len(nuclei) == 1 and letters not in ATONAS and len(letters) >= 2
    units = []  # (ipa, es_vocal, índice de letra)
    n, i = len(letters), 0
    while i < n:
        c = letters[i]
        nxt = letters[i + 1] if i + 1 < n else ''
        acc = (tonic is not None and i == tonic[0]) or (mono and nuclei[0][0] == i)
        if (i, i + 2) in nuclei:  # ae, oe, au
            units.append(({'ae': 'ai', 'oe': 'oi', 'au': 'au'}[letters[i:i + 2]], True, i)); i += 2; continue
        if c in VOC and not cons[i]:
            v = {'a': 'a', 'e': 'e', 'i': 'i', 'o': 'o', 'u': 'u', 'y': 'i'}[c]
            if longs[i]:
                v += 'ː'
            elif acc and v in 'eo':
                v = {'e': 'ɛ', 'o': 'ɔ'}[v]
            units.append((v, True, i))
        elif c == 'q':
            units.append(('kw' if nxt == 'u' else 'k', False, i)); i += 2 if nxt == 'u' else 1; continue
        elif c == 'g' and nxt == 'u' and cons[i + 1]:
            units.append(('ɡw', False, i)); i += 2; continue
        elif c == 'g' and nxt == 'n':
            units.append(('ŋ', False, i))
        elif c == 'g': units.append(('ɡ', False, i))
        elif c == 'n' and nxt in ('c', 'g', 'q', 'x'): units.append(('ŋ', False, i))
        elif c == 'c':
            units.append(('k', False, i)); i += 2 if nxt == 'h' else 1; continue
        elif c in 'vu': units.append(('w', False, i))
        elif c == 'i': units.append(('j', False, i))
        elif c == 'p' and nxt == 'h': units.append(('f', False, i)); i += 2; continue
        elif c == 't' and nxt == 'h': units.append(('t', False, i)); i += 2; continue
        elif c == 'r' and nxt == 'h': units.append(('r', False, i)); i += 2; continue
        elif c == 'x': units.append(('ks', False, i))
        elif c == 'z': units.append(('dz', False, i))
        elif c == 'h': pass
        else: units.append((c, False, i))
        i += 1
    if tonic is not None or mono:
        s = tonic[0] if tonic else nuclei[0][0]
        k = next(j for j, u in enumerate(units) if u[2] == s)
        cl = k
        while cl > 0 and not units[cl - 1][1]:
            cl -= 1
        grupo = [u[0] for u in units[cl:k]]
        ini = k
        if grupo:
            ini = k - 1
            if len(grupo) >= 2 and grupo[-2][-1] in STOPS and grupo[-1] in ('l', 'r'):
                ini = k - 2
        units.insert(ini, ('ˈ', False, -1))
    return ''.join(u[0] for u in units)


TOKEN = re.compile(r"([A-Za-zāēīōūȳĀĒĪŌŪ]+)|([.,!?;:]+)|\s+")


def latin_ipa(text):
    out = []
    for m in TOKEN.finditer(text):
        if m.group(1):
            out.append(word_ipa(m.group(1)))
        elif m.group(2):
            if out:
                out[-1] += m.group(2)[-1] if m.group(2)[-1] in '?!' else m.group(2)[0]
    return ' '.join(out)


if __name__ == '__main__':
    for t in sys.argv[1:]:
        print(t, '→', latin_ipa(t))

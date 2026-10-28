"""Genera un mp3 por cada frase latina de la app con una voz neuronal Piper (italiana).

No existe una voz latina, así que el latín se reescribe como lo leería un italiano pero con sonidos
clásicos (c = k, v = u, ae = ai…) y con la sílaba tónica que marcan las reglas latinas (penúltima si es
larga, si no antepenúltima). Cada personaje usa la misma voz base con otro tono (rubberband).

Uso:
    node tools/spoken.js spoken.json
    python tools/voz/gen_audio.py spoken.json audio            # solo genera lo que falta
    python tools/voz/gen_audio.py --respell "Aemilia, familia domī est."   # ver la reescritura

Necesita Python con sherpa-onnx 1.12.40 (la 2.0.x de Windows no trae el fraccionador de fonemas) y numpy, ffmpeg (con rubberband) y la voz
vits-piper-it_IT-paola-medium (https://github.com/k2-fsa/sherpa-onnx/releases/tag/tts-models)
descomprimida en $LATIN_TTS (por defecto ~/latin-tts)."""
import json, os, re, subprocess, sys

M32 = 0xffffffff
MACRON = str.maketrans('āēīōūȳĀĒĪŌŪ', 'aeiouyAEIOU')
LARGAS = set('āēīōūȳĀĒĪŌŪ')
VOC = 'aeiouy'
GRAVE = {'a': 'à', 'e': 'è', 'i': 'ì', 'o': 'ò', 'u': 'ù', 'y': 'ì'}

# (semitonos respecto a la voz base, velocidad). Las mujeres suben o se quedan; los hombres bajan.
MUJERES = {'aemilia': (1.0, 0.95), 'iulia': (2.5, 0.95), 'avia': (-1.0, 0.9), 'syra': (0.5, 0.95),
           'serva': (0.0, 0.95), 'ariadna': (1.5, 0.95), 'discipula': (2.0, 0.95), 'lector': (0.0, 0.92)}
HOMBRES = {'caesar': (-4.0, 0.9), 'iulius': (-4.5, 0.92), 'marcus': (-1.5, 0.95), 'puer': (-0.5, 0.95),
           'davus': (-3.5, 0.95), 'magister': (-5.0, 0.9), 'discipulus': (-1.5, 0.95),
           'discipulus-a': (-1.5, 0.95), 'discipulus-b': (-2.5, 0.95), 'icarus': (-1.0, 0.95)}
HOMBRE_BASE = (-3.5, 0.95)


def voice_cfg(v):
    return MUJERES.get(v) or HOMBRES.get(v) or HOMBRE_BASE


def imul(a, b):
    return (a * b) & M32


def cyrb53(s, seed=0):
    """El mismo hash que usa la app (app.js) para encontrar el archivo de cada frase."""
    h1 = (0xdeadbeef ^ seed) & M32
    h2 = (0x41c6ce57 ^ seed) & M32
    for ch in s:
        c = ord(ch)
        h1 = imul(h1 ^ c, 2654435761)
        h2 = imul(h2 ^ c, 1597334677)
    h1 = imul(h1 ^ (h1 >> 16), 2246822507)
    h1 ^= imul(h2 ^ (h2 >> 13), 3266489909)
    h2 = imul(h2 ^ (h2 >> 16), 2246822507)
    h2 ^= imul(h1 ^ (h1 >> 13), 3266489909)
    return format((2097151 & h2) * 4294967296 + (h1 & M32), 'x')


def key(voice, text):
    return cyrb53(voice + '|' + text)


# ---------- latín → ortografía italiana ----------

def analyze(word):
    """Devuelve (letras, largas, consonantica, nucleos): letras sin macrones, qué vocales son largas por
    marca, qué i/u funcionan como consonante y los núcleos silábicos [(inicio, fin)] (diptongos ae, oe, au)."""
    letters = word.lower().translate(MACRON).replace('j', 'i')
    longs = [c in LARGAS or c in 'āēīōūȳ' for c in word.lower()]
    n = len(letters)
    cons = [False] * n
    for i, c in enumerate(letters):
        prev = letters[i - 1] if i else ''
        nxt = letters[i + 1] if i + 1 < n else ''
        if c == 'u' and (prev == 'q' or (prev == 'g' and nxt in VOC and i >= 2 and letters[i - 2] == 'n')):
            cons[i] = True
        elif c == 'i' and nxt in VOC and (i == 0 or prev in VOC):
            cons[i] = True
    nuclei = []
    i = 0
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
    grupo = [c for k, c in enumerate(letters[e:nxt_nucleus[0]], e) if c != 'h' and not (c == 'u' and cons[k] and letters[k - 1] == 'q')]
    n = sum(2 if c in 'xz' else 1 for c in grupo)
    if n >= 2 and not (n == 2 and grupo[0] in 'bcdgpt' and grupo[1] in 'lr'):
        return True
    return False


SIN_ENCLITICA = {'denique', 'undique', 'itaque', 'atque', 'neque', 'quoque', 'usque', 'namque', 'quisque'}


def stressed(letters, longs, cons, nuclei, word):
    n = len(nuclei)
    if n < 2:
        return None
    if n == 2:
        return nuclei[0]
    if word.endswith('que') and word not in SIN_ENCLITICA:
        return nuclei[n - 2]
    pen = nuclei[n - 2]
    return pen if heavy(letters, longs, cons, pen, nuclei[n - 1]) else nuclei[n - 3]


def respell_word(word):
    letters, longs, cons, nuclei = analyze(word)
    tonic = stressed(letters, longs, cons, nuclei, letters)
    out = []
    n = len(letters)
    i = 0
    while i < n:
        c = letters[i]
        nxt = letters[i + 1] if i + 1 < n else ''
        acc = tonic is not None and i == tonic[0]
        if c in ('a', 'o') and nxt == 'e' and (i, i + 2) in nuclei:  # ae, oe → ai, oi
            out.append((GRAVE[c] if acc else c) + 'i'); i += 2; continue
        if c in VOC and not cons[i]:
            out.append(GRAVE[c] if acc else ('i' if c == 'y' else c))
        elif c == 'c':
            out.append('k')
            if nxt == 'h': i += 1
        elif c == 'g':
            out.append('gh' if (nxt in 'eiy' or letters[i + 1:i + 3] in ('ae', 'oe')) else 'g')
        elif c == 'v':
            out.append('' if nxt == 'u' else 'u')
        elif c == 'p' and nxt == 'h': out.append('f'); i += 1
        elif c == 't' and nxt == 'h': out.append('t'); i += 1
        elif c == 'r' and nxt == 'h': out.append('r'); i += 1
        elif c == 'x': out.append('ks')
        elif c == 'z': out.append('dz')
        elif c == 'h': pass
        else: out.append(c)
        i += 1
    return ''.join(out)


WORD = re.compile(r"[A-Za-zāēīōūȳĀĒĪŌŪ]+")


def respell(text):
    return WORD.sub(lambda m: respell_word(m.group(0)), text)


# ---------- síntesis ----------

_tts = None


def tts():
    global _tts
    if _tts is None:
        import sherpa_onnx
        d = os.environ.get('LATIN_TTS', os.path.expanduser('~/latin-tts'))
        d = os.path.join(d, 'vits-piper-it_IT-paola-medium') if os.path.isdir(os.path.join(d, 'vits-piper-it_IT-paola-medium')) else d
        cfg = sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(
            vits=sherpa_onnx.OfflineTtsVitsModelConfig(model=os.path.join(d, 'it_IT-paola-medium.onnx'),
                                                       tokens=os.path.join(d, 'tokens.txt'),
                                                       data_dir=os.path.join(d, 'espeak-ng-data')),
            num_threads=4, provider='cpu'))
        _tts = sherpa_onnx.OfflineTts(cfg)
    return _tts


def render(text, voice, out):
    import numpy as np
    semis, speed = voice_cfg(voice)
    audio = tts().generate(respell(text), sid=0, speed=speed)
    pcm = np.asarray(audio.samples, dtype=np.float32)
    if len(pcm) < audio.sample_rate * 0.15:
        raise RuntimeError('audio vacío: ' + text)
    pcm = np.concatenate([np.zeros(int(audio.sample_rate * 0.05), np.float32), pcm, np.zeros(int(audio.sample_rate * 0.12), np.float32)])
    filtro = f'rubberband=pitch={2 ** (semis / 12):.4f},loudnorm=I=-18:TP=-2' if semis else 'loudnorm=I=-18:TP=-2'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'f32le', '-ar', str(audio.sample_rate), '-ac', '1', '-i', '-',
                    '-af', filtro, '-ar', '22050', '-ac', '1', '-codec:a', 'libmp3lame', '-b:a', '56k', out],
                   input=pcm.tobytes(), check=True)


if __name__ == '__main__':
    if sys.argv[1] == '--respell':
        for t in sys.argv[2:]:
            print(t, '→', respell(t))
        sys.exit()
    items = json.load(open(sys.argv[1], encoding='utf-8'))
    outdir = sys.argv[2]
    limit = int(sys.argv[3]) if len(sys.argv) > 3 else None
    os.makedirs(outdir, exist_ok=True)
    hechos = 0
    for it in items:
        out = os.path.join(outdir, key(it['voice'], it['text']) + '.mp3')
        if os.path.exists(out):
            continue
        render(it['text'], it['voice'], out)
        hechos += 1
        if limit and hechos >= limit:
            break
    print(hechos, 'audios nuevos;', len(items), 'frases en total')

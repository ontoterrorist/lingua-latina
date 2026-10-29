"""Genera un mp3 por cada frase latina de la app con voces neuronales Kokoro (italianas).

No existe una voz latina. El texto se convierte a fonemas latinos clásicos (latin_ipa.py: c = k, v = w,
ae = ai, u siempre /u/, acento latino) y esos fonemas se le dan directamente al modelo, que los pronuncia
con su voz italiana: Sara para las mujeres y el lector, Nicola para los hombres.

Uso:
    node tools/spoken.js spoken.json
    python tools/voz/gen_audio.py spoken.json audio            # solo genera lo que falta
    python tools/voz/gen_audio.py spoken.json audio --parte=1/3   # reparte el trabajo (lanza 1/3, 2/3 y 3/3 a la vez)
    python tools/voz/gen_audio.py --ipa "Aemilia, familia domī est."   # ver los fonemas

Necesita Python con sherpa-onnx >= 2.0 (acepta fonemas propios), numpy y ffmpeg, y el modelo
kokoro-multi-lang-v1_0 (https://github.com/k2-fsa/sherpa-onnx/releases/tag/tts-models) descomprimido en
$LATIN_TTS (por defecto ~/latin-tts/kokoro-multi-lang-v1_0). Licencia de Kokoro: Apache 2.0."""
import json, os, subprocess, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from latin_ipa import latin_ipa

M32 = 0xffffffff
SARA, NICOLA = 35, 36  # índices de if_sara e im_nicola en voices.bin (comprobado por el tono: 235 Hz y 102 Hz)
MUJERES = {'aemilia', 'iulia', 'avia', 'syra', 'serva', 'ariadna', 'discipula', 'lector'}
# velocidad por voz (Kokoro: 1.0 = natural; menos = más despacio)
VELOCIDAD = {'lector': 0.8}
VELOCIDAD_BASE = 0.85


def voice_cfg(v):
    return (SARA if v in MUJERES else NICOLA), VELOCIDAD.get(v, VELOCIDAD_BASE)


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


_tts = None


def tts():
    global _tts
    if _tts is None:
        import sherpa_onnx
        d = os.environ.get('LATIN_TTS', os.path.expanduser('~/latin-tts/kokoro-multi-lang-v1_0')).replace('\\', '/')
        cfg = sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(
            kokoro=sherpa_onnx.OfflineTtsKokoroModelConfig(
                model=d + '/model.onnx', voices=d + '/voices.bin', tokens=d + '/tokens.txt',
                data_dir=d + '/espeak-ng-data', lang='it'),
            num_threads=4, provider='cpu'))
        _tts = sherpa_onnx.OfflineTts(cfg)
    return _tts


def synth(text, voice):
    import numpy as np, sherpa_onnx
    sid, speed = voice_cfg(voice)
    g = sherpa_onnx.GenerationConfig()
    g.sid, g.speed = sid, speed
    g.phoneme_codepoints = [[ord(c) for c in latin_ipa(text)]]
    audio = tts().generate(text, g)
    pcm = np.asarray(audio.samples, dtype=np.float32)
    if audio.sample_rate <= 0 or len(pcm) < audio.sample_rate * 0.15:
        raise RuntimeError('audio vacío: ' + text)
    sr = audio.sample_rate
    pad = lambda s: np.zeros(int(sr * s), np.float32)
    return np.concatenate([pad(0.05), pcm, pad(0.12)]), sr


def render(text, voice, out):
    pcm, sr = synth(text, voice)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'f32le', '-ar', str(sr), '-ac', '1', '-i', '-',
                    '-af', 'loudnorm=I=-18:TP=-2', '-ar', '24000', '-ac', '1', '-codec:a', 'libmp3lame', '-b:a', '64k', out],
                   input=pcm.tobytes(), check=True)


if __name__ == '__main__':
    if sys.argv[1] == '--ipa':
        for t in sys.argv[2:]:
            print(t, '→', latin_ipa(t))
        sys.exit()
    items = json.load(open(sys.argv[1], encoding='utf-8'))
    outdir = sys.argv[2]
    resto = sys.argv[3:]
    parte = next((a.split('=')[1] for a in resto if a.startswith('--parte=')), None)  # --parte=2/3: reparte el trabajo entre procesos
    limit = next((int(a) for a in resto if a.isdigit()), None)
    if parte:
        i, n = map(int, parte.split('/'))
        items = [it for k, it in enumerate(items) if k % n == i - 1]
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

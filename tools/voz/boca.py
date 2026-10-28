"""Envolvente de cada audio para mover la boca de César al ritmo de la voz.

Para cada mp3 de audio/ calcula la intensidad de la voz cada 50 ms y la reduce a cuatro niveles de apertura:
0 cerrada, 1 pequeña, 2 media, 3 amplia (fotogramas m1, m2, m3). Los umbrales son relativos al propio clip, así
que da igual el volumen de cada voz. Escribe audio/boca.json: {hash del audio: "0012331…"}, un dígito por 50 ms.

    python tools/voz/boca.py spoken.json audio

Necesita ffmpeg y numpy."""
import json, os, subprocess, sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gen_audio import key

SR = 16000
PASO = 0.05  # segundos por dígito (la app usa el mismo valor)


def envolvente(mp3):
    pcm = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', mp3, '-ar', str(SR), '-ac', '1', '-f', 's16le', '-'],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(pcm, dtype=np.int16).astype(np.float32) / 32768
    n = int(SR * PASO)
    k = len(x) // n
    rms = np.sqrt((x[:k * n].reshape(k, n) ** 2).mean(1))
    ref = np.percentile(rms, 90) or 1.0
    # contra el máximo local (±0,3 s): cada sílaba abre y cierra aunque la voz sea continua
    v = 6
    local = np.array([rms[max(0, i - v):i + v + 1].max() for i in range(k)])
    rl = rms / np.maximum(local, 1e-6)
    nivel = np.select([rl < 0.35, rl < 0.65, rl < 0.9], [0, 1, 2], 3)
    nivel = np.where(rms < 0.2 * ref, 0, nivel)           # silencio: boca cerrada
    nivel = np.where((nivel == 3) & (rms < 0.8 * ref), 2, nivel)  # la apertura amplia, solo en los picos
    # un nivel aislado (un solo paso) parpadea: se suaviza con la mediana de tres
    s = nivel.copy()
    for i in range(1, k - 1):
        s[i] = int(np.median(nivel[i - 1:i + 2]))
    return ''.join(str(int(v)) for v in s)


if __name__ == '__main__':
    items = json.load(open(sys.argv[1], encoding='utf-8'))
    audio = sys.argv[2]
    out = {}
    for it in items:
        h = key(it['voice'], it['text'])
        f = os.path.join(audio, h + '.mp3')
        if os.path.exists(f):
            out[h] = envolvente(f)
    json.dump(out, open(os.path.join(audio, 'boca.json'), 'w'), separators=(',', ':'))
    print(len(out), 'audios;', sum(len(v) for v in out.values()), 'pasos de', PASO, 's')

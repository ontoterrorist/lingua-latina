# Lingua Latina

Un pequeño juego de aprendizaje de latín inspirado en la progresión temática y gramatical de *Familia Romana* (Hans H. Ørberg).

## Jugar

Online en [GitHub Pages](https://ontoterrorist.github.io/lingua-latina/).

Las lecciones y las cartas funcionan en un navegador moderno sin instalación. El progreso se guarda en el almacenamiento local del navegador.

## Cómo funciona

- 35 niveles siguen los temas de los capítulos.
- Cada nivel presenta una regla breve, vocabulario y un diálogo original con traducción. Julio César es un narrador ficticio.
- Resolver ejercicios guarda automáticamente cartas de palabras y de gramática.
- En **Mis cartas**, revela la respuesta y elige **Difícil**, **Regular** o **Fácil**. El próximo intervalo se ajusta con repetición espaciada inspirada en SM-2.
- Diez escenas pixel art acompañan los diálogos. Cada una incluye PNG y proyecto editable de Pixelorama (`.pxo`).
- Pulsa 🔊 junto a cada intervención, palabra o ejemplo para oír el latín (ver *Voz*).
- `tools/make_pixel_scenes.py` regenera las escenas originales con geometría pixelada y una paleta pequeña.

## Estilo y tipografías

La interfaz comparte el estilo de [Ruso Advance](https://ontoterrorist.github.io/ruso/): fondo violeta, tarjetas color crema, acento amarillo y un narrador en el lateral. Usa las fuentes PT Sans y Unbounded (licencia SIL OFL), incluidas en `fonts/` con subconjuntos latino y latino extendido para las vocales largas (ā, ē, ī, ō, ū).

## Voz

Cada frase latina tiene su audio (167 mp3, unos 2 MB en total) con una voz neuronal [Piper](https://github.com/rhasspy/piper): la voz italiana *Paola* (dataset CC0), con tonos distintos para cada personaje. No existe una voz latina, así que el texto se reescribe como lo leería un italiano pero con sonidos clásicos (c = k, v = u, ae = ai) y con el acento latino (penúltima sílaba si es larga, si no antepenúltima). Los botones 🔊 están en cada línea del diálogo, en las palabras, en los ejemplos y en las cartas; **Lento** reproduce más despacio. Si falta un audio, suena la voz italiana del navegador.

Para regenerarlos: `node tools/spoken.js spoken.json` y `python tools/voz/gen_audio.py spoken.json audio` (requisitos en el propio script). `--respell "texto"` muestra cómo se reescribe una frase.

## Privacidad y material de referencia

El juego guarda el progreso localmente en el navegador; no envía respuestas a un servidor. El libro facilitado como referencia no se incluye. Los resúmenes, ejemplos, ejercicios y diálogos del juego son originales y no reproducen su texto.

## Licencias

El código y el arte de esta repo se publican bajo MIT. Las voces usan el modelo Piper *Paola* (dataset CC0). El libro *Familia Romana* conserva sus derechos y no forma parte de esta repo.

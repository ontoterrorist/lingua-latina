# Lingua Latina

Un pequeño juego de aprendizaje de latín inspirado en la progresión temática y gramatical de *Familia Romana* (Hans H. Ørberg).

## Jugar

Online en [GitHub Pages](https://ontoterrorist.github.io/lingua-latina/).

Las lecciones y las cartas funcionan en un navegador moderno sin instalación. El progreso se guarda en el almacenamiento local del navegador.

## Cómo funciona

- 35 niveles siguen los temas de los capítulos.
- Cada nivel presenta una regla breve, vocabulario y un diálogo original con traducción. Cayo Julio César te guía por el viaje.
- Resolver ejercicios guarda automáticamente cartas de palabras y de gramática.
- En **Mis cartas**, revela la respuesta y elige **Difícil**, **Regular** o **Fácil**. El próximo intervalo se ajusta con repetición espaciada inspirada en SM-2.
- Diez escenas pixel art acompañan los diálogos. Cada una incluye PNG y proyecto editable de Pixelorama (`.pxo`).
- Pulsa 🔊 junto a cada intervención, palabra o ejemplo para oír el latín (ver *Voz*).
- `tools/make_pixel_scenes.py` regenera las escenas originales con geometría pixelada y una paleta pequeña.

## Estilo y tipografías

La interfaz comparte el estilo de [Ruso Advance](https://ontoterrorist.github.io/ruso/): fondo violeta, tarjetas color crema, acento amarillo y César como guía en el lateral. Usa las fuentes PT Sans y Unbounded (licencia SIL OFL), incluidas en `fonts/` con subconjuntos latino y latino extendido para las vocales largas (ā, ē, ī, ō, ū).

## Voz

Cada frase latina tiene su audio (167 mp3, unos 3 MB) con voces neuronales [Kokoro](https://github.com/hexgrad/kokoro) (Apache 2.0): *Sara* para las mujeres y el lector, *Nicola* para los hombres. No existe una voz latina, así que el texto se convierte a **fonemas del latín clásico** (c = k, v = w, qu = kw, ae = ai, la *u* siempre /u/, vocales largas con macrón, -m final pronunciada) y con el acento latino (penúltima sílaba si es larga, si no antepenúltima); esos fonemas se le dan directamente al modelo. Se reproducen a unas 3,7 sílabas por segundo. Los botones 🔊 están en cada línea del diálogo, en las palabras, en los ejemplos y en las cartas; **Lento** reproduce más despacio. Si falta un audio, suena la voz italiana del navegador.

**Voz clásica (opcional).** El botón «🎙 Humana / 🏛 Clásica» de la cabecera cambia a [eSpeak NG](https://github.com/espeak-ng/espeak-ng/releases) 1.52.0 en WebAssembly con la tabla de latín clásico de [espeak-ng-wasm](https://github.com/classical-cat-dh-lab/espeak-ng-wasm): pronunciación reconstruida (vocales largas y breves, diptongos, aspiradas), pero claramente electrónica. Se descarga (~1 MB) solo al elegirla, sintetiza en el navegador sin enviar nada a un servidor y también mueve la boca de César. Necesita servir la página por http(s): desde `file://` el navegador bloquea WebAssembly y la app vuelve sola a la voz humana.

Para regenerarlos: `node tools/spoken.js spoken.json` y `python tools/voz/gen_audio.py spoken.json audio` (requisitos en el propio script). `--ipa "texto"` muestra los fonemas de una frase.

## Privacidad y material de referencia

El juego guarda el progreso localmente en el navegador; no envía respuestas a un servidor. El libro facilitado como referencia no se incluye. Los resúmenes, ejemplos, ejercicios y diálogos del juego son originales y no reproducen su texto.

## Licencias

El código y el arte de esta repo se publican bajo MIT. Las voces usan el modelo Kokoro (Apache 2.0). El motor eSpeak NG WebAssembly y su tabla fonética (`assets/espeak-ng/`) se distribuyen bajo GPL-3.0; su versión, licencia y fuente están en `assets/espeak-ng/README.md`. El libro *Familia Romana* conserva sus derechos y no forma parte de esta repo.

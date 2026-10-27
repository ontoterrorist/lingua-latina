# Lingua Latina

Un pequeño juego de aprendizaje de latín inspirado en la progresión temática y gramatical de *Familia Romana* (Hans H. Ørberg).

## Jugar

Online en [GitHub Pages](https://ontoterrorist.github.io/lingua-latina/).

Las lecciones y las cartas funcionan en un navegador moderno sin instalación. El progreso se guarda en el almacenamiento local del navegador. Para oír la voz desde una copia local, sirve el juego con un servidor web local: algunos navegadores bloquean WebAssembly en direcciones `file://`. En GitHub Pages funciona directamente.

## Cómo funciona

- 35 niveles siguen los temas de los capítulos.
- Cada nivel presenta una regla breve, vocabulario y un diálogo original con traducción. Julio César es un narrador ficticio.
- Resolver ejercicios guarda automáticamente cartas de palabras y de gramática.
- En **Mis cartas**, revela la respuesta y elige **Difícil**, **Regular** o **Fácil**. El próximo intervalo se ajusta con repetición espaciada inspirada en SM-2.
- Diez escenas pixel art acompañan los diálogos. Cada una incluye PNG y proyecto editable de Pixelorama (`.pxo`).
- Pulsa **Escuchar latín** junto a cada intervención para oír una síntesis con la pronunciación clásica reconstruida. El motor funciona en el navegador y sus archivos se sirven desde esta repo; el audio no se envía a un servidor.
- `tools/make_pixel_scenes.py` regenera las escenas originales con geometría pixelada y una paleta pequeña.

La voz aplica reglas de cantidad y acento clásico a la ortografía latina; las vocales largas se reconocen cuando están escritas con macrón. La síntesis es una aproximación electrónica para estudio, no una grabación humana.

## Estilo y tipografías

La interfaz comparte el estilo de [Ruso Advance](https://ontoterrorist.github.io/ruso/): fondo violeta, tarjetas color crema, acento amarillo y un narrador en el lateral. Usa las fuentes PT Sans y Unbounded (licencia SIL OFL), incluidas en `fonts/` con subconjuntos latino y latino extendido para las vocales largas (ā, ē, ī, ō, ū).

## Privacidad y material de referencia

El juego guarda el progreso localmente en el navegador; no envía respuestas a un servidor. El libro facilitado como referencia no se incluye. Los resúmenes, ejemplos, ejercicios y diálogos del juego son originales y no reproducen su texto.

## Licencias

El código principal y el arte original de esta repo se publican bajo MIT. El motor eSpeak NG WebAssembly y su mapeo fonético se distribuyen bajo GPL-3.0; su versión, licencia y fuente correspondiente están documentadas en `assets/espeak-ng/README.md`. El libro *Familia Romana* conserva sus derechos y no forma parte de esta repo.

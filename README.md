# Lingua Latina

Un pequeño juego de aprendizaje de latín inspirado en la progresión temática y gramatical de *Familia Romana* (Hans H. Ørberg).

## Jugar

Online en [GitHub Pages](https://ontoterrorist.github.io/lingua-latina/).

Las lecciones y las cartas funcionan en un navegador moderno sin instalación. El progreso se guarda en el almacenamiento local del navegador.

## Cómo funciona

- 35 capítulos siguen **la progresión gramatical** de *Familia Romana* (singular y plural, genitivo, acusativo, vocativo, ablativo… hasta el subjuntivo, el gerundivo y los condicionales irreales). Cayo Julio César te guía por el viaje.
- Cada capítulo trae: la **regla** (corregida contra el índice gramatical del libro), un **ejemplo** original con 🔊, un **consejo de César**, la lista de **vocabulario nuevo** (en total unas 1.800 palabras, con glosa, formas y relaciones al estilo de los márgenes: = sinónimo, ↔ contrario, < derivado) y una **tanda de ejercicios**.
- Los ejercicios son de siete tipos: completar la terminación, declinar o conjugar una tabla, transformar una forma, transformar una frase, analizar una forma (marcar todas las lecturas), palabra que falta y significado. Cada tanda cierra con 3–5 ejercicios de repaso de capítulos anteriores, elegidos por las etiquetas donde más fallas. El capítulo cuenta como completado con un **80 %** de aciertos; si no, puedes repetir con ejercicios nuevos del banco.
- Se aceptan las respuestas sin macrones (con aviso); el botón **ā Estricto** de la cabecera los exige, y el capítulo XXXIV (cantidad silábica) también.
- Resolver ejercicios guarda automáticamente **cartas**: una por palabra (con 🔊, glosa, relación y una frase original) y una por etiqueta gramatical practicada (por ejemplo «genitivo pl. · 1.ª declinación → -ārum · puellārum»). Un fallo devuelve la carta a hoy; un acierto solo la crea. Cuando una carta de palabra llega a 7 días aparece también su inversa español → latín.
- En **Mis cartas** hay filtros: para hoy, todas, palabras, gramática y por capítulo. Revela la respuesta y elige **Difícil**, **Regular** o **Fácil**; el intervalo se ajusta con repetición espaciada inspirada en SM-2. Las cartas guardadas por versiones anteriores se migran sin perder su estado.
- Pulsa 🔊 junto a cada palabra o ejemplo para oír el latín (ver *Voz*).

## Datos y código

Todo se edita a mano y no necesita compilar:

| Archivo | Contenido |
|---|---|
| `data/capitulos.js` y `data/ejercicios-*.js` | los 35 capítulos (título, tema, gramática, regla, ejemplo, consejo, tablas) y el banco de ejercicios escritos a mano (≈ 18 por capítulo) |
| `data/vocabulario.js` | **generado** por `tools/vocab_index.py` desde `tools/vocab/glosas*.txt` (las glosas escritas a mano) |
| `morfo.js` | motor morfológico: declina nombres y adjetivos, conjuga verbos (activa, pasiva, deponentes, irregulares), `analiza(forma)` y `permitido(etiqueta, capítulo)` |
| `ejercicios.js` | arma las tandas, corrige y dibuja cada tipo de ejercicio |
| `tarjetas.js` | cartas de vocabulario y de gramática a partir de los resultados |

Cada forma del banco lleva marcada su raíz, su terminación, su lema y su etiqueta (`vid{et:vidēre.3sg.pres.ind.act}`), de modo que el motor comprueba cada respuesta y nada queda mal corregido.

**Pruebas** (Node, sin dependencias):

```bash
node tools/test_morfo.js        # paradigmas modelo: puella, servus, … hortārī, esse, īre, ferre, velle
node tools/test_ejercicios.js   # todo el banco contra el motor: formas, etiquetas por capítulo, vocabulario ≤ capítulo
```

**Regenerar el vocabulario:** `sh tools/vocab/construir.sh "C:/ruta/familia_romana.md"` (lee el índice del libro, que **no** se incluye en la repo, solo para sacar en qué capítulo entra cada palabra) y deja un informe de discrepancias en `tools/vocab/informe.md`.

## Estilo y tipografías

La interfaz comparte el estilo de [Ruso Advance](https://ontoterrorist.github.io/ruso/): fondo violeta, tarjetas color crema, acento amarillo y César como guía en el lateral. Usa las fuentes PT Sans y Unbounded (licencia SIL OFL), incluidas en `fonts/` con subconjuntos latino y latino extendido para las vocales largas (ā, ē, ī, ō, ū).

## Voz

Cada palabra, cada ejemplo de capítulo y la frase que acompaña a cada carta tienen su audio pregenerado (2.049 mp3 en `audio/`, unos 25 MB) con voces neuronales [Kokoro](https://github.com/hexgrad/kokoro) (Apache 2.0): *Sara* para las mujeres y el lector, *Nicola* para los hombres. No existe una voz latina, así que el texto se convierte a **fonemas del latín clásico** (c = k, v = w, qu = kw, ae = ai, la *u* siempre /u/, vocales largas con macrón, -m final pronunciada) y con el acento latino (penúltima sílaba si es larga, si no antepenúltima); esos fonemas se le dan directamente al modelo. Se reproducen a unas 3,7 sílabas por segundo. Los botones 🔊 están en las palabras, en los ejemplos y en las cartas; **Lento** reproduce más despacio. Si falta un audio, suena la voz italiana del navegador.

**Voz clásica (opcional).** El botón «🎙 Humana / 🏛 Clásica» de la cabecera cambia a [eSpeak NG](https://github.com/espeak-ng/espeak-ng/releases) 1.52.0 en WebAssembly con la tabla de latín clásico de [espeak-ng-wasm](https://github.com/classical-cat-dh-lab/espeak-ng-wasm): pronunciación reconstruida (vocales largas y breves, diptongos, aspiradas), pero claramente electrónica. Se descarga (~1 MB) solo al elegirla, sintetiza en el navegador sin enviar nada a un servidor. Necesita servir la página por http(s): desde `file://` el navegador bloquea WebAssembly y la app vuelve sola a la voz humana.

Para regenerarlos: `node tools/spoken.js spoken.json` y `python tools/voz/gen_audio.py spoken.json audio` (requisitos en el propio script; `--parte=1/3` reparte el trabajo entre procesos). César no mueve la boca al hablar. `--ipa "texto"` muestra los fonemas de una frase.

## Privacidad y material de referencia

El juego guarda el progreso localmente en el navegador; no envía respuestas a un servidor. El libro facilitado como referencia no se incluye. Las reglas, ejemplos, glosas, frases y ejercicios del juego son originales y no reproducen su texto.

## Licencias

El código y el arte de esta repo se publican bajo MIT. Las voces usan el modelo Kokoro (Apache 2.0). El motor eSpeak NG WebAssembly y su tabla fonética (`assets/espeak-ng/`) se distribuyen bajo GPL-3.0; su versión, licencia y fuente están en `assets/espeak-ng/README.md`. El libro *Familia Romana* conserva sus derechos y no forma parte de esta repo.

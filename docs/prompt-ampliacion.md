# Prompt: Lingua Latina más completa

> Pégalo en una sesión nueva de Claude Code abierta en `C:\Users\Eric Pezoa\Downloads\lingua latina`.

---

Trabajas en **Lingua Latina**, el juego web de latín de esta carpeta (repo `ontoterrorist/lingua-latina`, publicado en GitHub Pages desde `main`). No tiene build: se editan a mano `index.html`, `style.css` y `app.js`. El objetivo es convertirlo en un acompañante serio de *Lingua Latina per se illustrata. Pars I: Familia Romana* (Ørberg), capítulo a capítulo.

## Cómo está hoy (léelo en el código antes de tocar nada)

- `app.js` líneas 1–36: arreglo `chapters` con 35 capítulos. Cada uno tiene `title`, `theme`, `grammar`, `rule`, `example`, **una sola palabra** (`word`), **una sola pregunta** (`quiz`) y un **diálogo de dos líneas inventado** (`dialog`).
- Cada capítulo tiene 2 ejercicios de opción múltiple: el significado de `word` y `quiz`. Cada uno crea una carta (`upsertCard`, tipos `word` y `grammar`) que se repasa con SM-2 en **Mis cartas** (`gradeCard`).
- César (canvas `#cesar`, poses `neutral happy surprised stern sad think` + bocas `m1–m3`) reacciona con frases genéricas (`OK_LINES`, `BAD_LINES`, `reactAnswer`). No explica por qué fallaste.
- Voz: cada frase latina tiene un mp3 en `audio/` con nombre `cyrb53(voz|texto)`. `tools/spoken.js` lee la cabecera de `app.js` (hasta `const defaultState`) para listar las frases; `tools/voz/gen_audio.py` las genera con Kokoro; `tools/voz/boca.py` rehace `audio/boca.json`. Si falta un mp3, lee la voz italiana del navegador.
- **La gramática de la app no sigue al libro** en la mayoría de los capítulos. Por ejemplo, el cap. VIII trata relativos e interrogativos (`quis/quī, quae, quod`), no números; el XIX es el imperfecto, no la comparación; el XXVII es el subjuntivo presente, no el gerundio. La tabla de abajo es la secuencia correcta.

## Fuente de referencia

`C:\Users\Eric Pezoa\Downloads\familia_romana.md` (OCR del libro, 8.288 líneas, con errores de reconocimiento: `NOWS` = NOVVS, macrones perdidos, palabras pegadas a números). **Nunca lo copies a la repo ni reproduzcas su texto**: el README promete que los ejercicios son originales. De ahí solo se toman hechos: qué palabras y qué gramática entran en cada capítulo.

Partes útiles:
- **INDEX VOCABVLORVM** (líneas ~7741–8130): cada lema con genitivo/género o partes principales y `capítulo.línea` de sus apariciones. La primera cifra es el capítulo donde se introduce. Ejemplo OCR: `aeger -gra -grum 11.24,29`, `capere -iō cēpisse captum 10.2, 78`.
- **INDEX GRAMMATICVS** (líneas ~8131–8265): tema gramatical → `capítulo.línea` de su sección *Grammatica Latina*.
- Listas al final de cada capítulo (bloque con `Vocābula:` y la tabla de palabras después de PENSVM B): sirven para cotejar el vocabulario nuevo de cada capítulo.
- Las secciones **PENSVM A/B/C** de cada capítulo muestran el tipo de ejercicio del libro: A = completar terminaciones (`Mārc- Iūliam pulsat`), B = completar con la palabra que falta, C = preguntas de comprensión. Imita el **formato**, nunca las frases.

## Secuencia gramatical del libro (úsala para reescribir `grammar`, `rule` y los ejercicios)

| Cap. | Título | Gramática nueva (Index grammaticus) | Ejercicio dominante |
|---|---|---|---|
| I | Imperium Romanum | singular/plural (-a/-ae, -us/-ī, -um/-a); `est/sunt`; números I–X | terminación de número |
| II | Familia Romana | genitivo sg/pl; masculino/femenino/neutro; `meus/tuus`; `quis? cuius?` | genitivo |
| III | Puer improbus | nominativo/acusativo; verbo en 3.ª pers. sg (-at/-et/-it) | caso + terminación verbal |
| IV | Dominus et servī | vocativo; imperativo sg vs indicativo; `suus`; `is, ea, id` | vocativo e imperativo |
| V | Villa et hortus | ablativo (con `in, ā/ab, ex, cum, sine`); acusativo pl; 3.ª pers. pl -nt; imperativo pl | ablativo, plural |
| VI | Via Latina | preposiciones + acusativo / + ablativo; activa y pasiva (3.ª pers.); locativo | caso tras preposición; activa→pasiva |
| VII | Puella et rosa | dativo; `hic, haec, hoc` (inicio) | dativo |
| VIII | Taberna Romana | pronombre interrogativo y relativo `quis/quī quae quod`; `hic haec hoc` completo | relativo concordado |
| IX | Pastor et ovēs | 3.ª declinación (masc./fem.) | 3.ª decl. |
| X | Bestiae et hominēs | infinitivo presente; 3.ª decl. (más); `velle` | infinitivo; 3.ª decl. |
| XI | Corpus hūmānum | 3.ª decl. neutra; acusativo con infinitivo; `noster` | neutros 3.ª; AcI |
| XII | Mīles Rōmānus | 4.ª declinación; adjetivos de 1.ª/2.ª y de 3.ª; comparativo; dativo posesivo | 4.ª decl.; concordancia |
| XIII | Annus et mēnsēs | 5.ª declinación; superlativo -issimus; ordinales; ablativo de tiempo | 5.ª decl.; grados |
| XIV | Novus diēs | participio presente; `uter`; ablativo absoluto (inicio) | participio presente |
| XV | Magister et discipulī | 1.ª y 2.ª persona del verbo (activa); pronombres personales; `esse`, `posse` | conjugación por persona |
| XVI | Tempestās | verbos deponentes; ablativo absoluto; genitivo partitivo | deponentes |
| XVII | Numerī difficilēs | numerales; personas de la pasiva; deponentes en presente | pasiva por persona |
| XVIII | Litterae Latīnae | adverbios -ē/-iter; comparación del adverbio; `semel, bis…`; superlativo -errimus/-illimus | adverbio |
| XIX | Marītus et uxor | imperfecto (`-bā-`, `eram`); repaso 1.ª/2.ª decl. | imperfecto |
| XX | Parentēs | futuro (`-bō/-am`, `erō`) | futuro |
| XXI | Pugna discipulōrum | perfecto; infinitivo perfecto; participio perfecto pasivo; imperfecto vs perfecto | perfecto |
| XXII | Cavē canem | supino; `ferre` | supino, `ferre` |
| XXIII | Epistula magistrī | participio e infinitivo futuro | futuro no personal |
| XXIV | Puer aegrōtus | pluscuamperfecto; perfecto de deponentes | pluscuamperfecto |
| XXV | Thēseus et Mīnōtaurus | imperativo de deponentes; genitivo con verbos (`oblīvīscī, meminisse`) | imperativo deponente |
| XXVI | Daedalus et Īcarus | gerundio; imperativo futuro | gerundio |
| XXVII | Rēs rūsticae | subjuntivo presente (también de `esse`) | subjuntivo presente |
| XXVIII | Perīcula maris | subjuntivo imperfecto; subjuntivo dubitativo | subjuntivo imperfecto |
| XXIX | Nāvigāre necesse est | `ut/nē` + subjuntivo; `cum` + subjuntivo | subordinadas |
| XXX | Convīvium | futuro perfecto; adverbios -nter; distributivos (`bīnī`) | futuro perfecto |
| XXXI | Inter pōcula | gerundivo (dativo agente); subjuntivo optativo | gerundivo |
| XXXII | Classis Rōmāna | subjuntivo perfecto; `nē` + subj. perf. (prohibición) | subjuntivo perfecto |
| XXXIII | Exercitus Rōmānus | subjuntivo pluscuamperfecto; condicional irreal (`sī/nisi`); imperativo futuro | irreal |
| XXXIV | Dē arte poēticā | cantidad silábica, hexámetro y pentámetro | escandir |
| XXXV | Ars grammatica | repaso de partes de la oración, casos, conjugaciones I–IV | repaso mixto |

Verifica cada fila contra el Index grammaticus antes de usarla; si el OCR no deja claro algo, pregúntame.

## Lo que hay que hacer

### 1. Datos fuera de `app.js`

- Crea `data/capitulos.js` y `data/vocabulario.js` (scripts normales cargados con `<script>` antes de `app.js`, sin módulos ni build). Saca `chapters` de `app.js`.
- Crea `tools/vocab_index.py` (se ejecuta en local y lee el .md desde fuera de la repo) que parsea el INDEX VOCABVLORVM, corrige el OCR obvio y produce por lema: `la` (con macrones), `gen`/`genero` o partes principales, `pos`, `cap` (primer capítulo), `decl`/`conj`. Coteja con las listas `Vocābula` de cada capítulo y deja un informe de discrepancias para revisar a mano.
- Escribe a mano la glosa española de cada lema (original, breve). Añade, al estilo de los márgenes de Ørberg, relaciones latinas cuando ayuden: sinónimo (`=`), contrario (`↔`), derivado (`<`). Ej.: `puer ↔ puella`, `aegrōtus = aeger`.
- Resultado esperado: el vocabulario completo de *Familia Romana* (del orden de 1.500–1.800 lemas), repartido por capítulo, en vez de la palabra única de hoy.
- **Punto de control**: antes de seguir, muéstrame los datos de los capítulos I–III (vocabulario + gramática) y espera mi visto bueno.

### 2. Motor morfológico (`morfo.js`)

- Declina sustantivos y adjetivos (5 declinaciones, neutros, -ius/-ium, -er, 3.ª con tema en -i, adjetivos de 1/2/3 terminaciones, comparativo y superlativo) y conjuga verbos (1.ª–4.ª y mixta en -iō; activa, pasiva y deponentes; todos los tiempos de indicativo y subjuntivo; imperativos, infinitivos, participios, gerundio, gerundivo, supino). Irregulares en tabla: `esse, posse, īre, velle, nōlle, ferre, fierī`; pronombres en tabla.
- Cada forma lleva etiqueta (`abl.pl.`, `3sg.impf.ind.act.`) y una función `analiza(forma)` que devuelve **todas** las lecturas posibles (`puellae` → gen.sg., dat.sg., nom.pl.).
- Una función `permitido(etiqueta, capitulo)` según la tabla de arriba: un ejercicio del cap. V nunca pide un dativo; uno del cap. XVIII nunca pide un subjuntivo.
- Pruebas en `tools/test_morfo.js` (Node, sin dependencias) con paradigmas modelo: `puella, servus, verbum, puer, ager, pāstor, corpus, mare, manus, cornū, diēs, rēs, bonus, pulcher, fortis, ingēns, amāre, vidēre, legere, capere, audīre, hortārī, esse, īre, ferre, velle`. Deben pasar todas.

### 3. Ejercicios en lugar de diálogos

Quita el diálogo inventado (`dialog`), su escena de chat y sus audios. En su lugar, cada capítulo tiene una tanda de **10–15 ejercicios** que mezclan, según la columna «Ejercicio dominante»:

1. **Completa la terminación** (tipo Pensum A): frase original con la raíz y un hueco, `Mārc__ Iūli__ pulsat.` Campo de texto; se acepta sin macrones (César lo menciona) y hay un teclado de macrones `ā ē ī ō ū`. Al corregir, muestra la forma completa y su análisis (`Iūliam: acusativo sg., objeto directo`).
2. **Declina / conjuga**: rellenar una tabla de paradigma con un sustantivo o verbo del capítulo, solo con las casillas ya enseñadas.
3. **Transforma**: singular→plural, activa→pasiva, presente→imperfecto, directo→AcI, según el capítulo.
4. **Analiza la forma**: marca todas las lecturas correctas de una forma ambigua (usa `analiza`).
5. **Palabra que falta** (tipo Pensum B): completar con el vocabulario del capítulo.
6. **Significado**: opción múltiple latín→español y español→latín, con distractores del mismo capítulo y de la misma clase de palabra.

Reglas:
- Las frases se escriben a mano, son originales y usan solo vocabulario de capítulos ≤ actual. Banco en `data/ejercicios.js`, marcando la forma que se pregunta, su lema y su etiqueta: así el motor comprueba cada respuesta en las pruebas y nada queda mal corregido. Las tablas y transformaciones las genera el motor.
- Cada capítulo cierra con un **repaso entrelazado**: 3–5 ejercicios de capítulos anteriores, elegidos por las etiquetas donde más fallas.
- El capítulo cuenta como completado con ≥ 80 % de aciertos; si no, se puede repetir con ejercicios nuevos del banco.
- Conserva la regla gramatical del capítulo (ya corregida) y un ejemplo con 🔊 antes de los ejercicios, y añade una lista **Vocabula** con todas las palabras nuevas del capítulo (🔊, glosa, genitivo/género o partes principales).
- Accesibilidad: todo usable con teclado (Enter corrige, Tab entre huecos) y en móvil.

### 4. Tarjetas de vocabulario y gramática

- **Vocabulario**: una carta por lema que aparece en un ejercicio. Frente: `puella, -ae f.` (o `capiō, -ere, cēpī, captum`) con 🔊; reverso: glosa, relación latina (`↔ puer`) y una frase original del banco. Se añade también la dirección inversa (español→latín) cuando la latín→español llegue a intervalo ≥ 7 días.
- **Gramática**: una carta por etiqueta practicada. Ej.: frente `Ablativo plural, 1.ª declinación`, reverso `-īs · puellīs`; frente `amābō`, reverso `1sg. futuro activo de amāre`; frente `¿Qué caso pide «sine»?`, reverso `ablativo`.
- Un fallo en un ejercicio vuelve a poner esa carta para hoy (o la crea con intervalo 0); un acierto solo la crea.
- Filtros de **Mis cartas**: Para hoy · Todas · Palabras · Gramática · por capítulo.
- **Migración**: conserva las cartas guardadas en `localStorage['lingua-latina-v1']` (ids `word-N-slug` y `grammar-N-slug`) y su estado SM-2. Las que ya no tengan equivalente quedan como están.

### 5. Pestaña «Ars» (teoría)

Tercer botón en la navegación (`El viaje · Ars · Mis cartas`) con la teoría de cómo funciona el latín, en español claro y con términos latinos al lado (`accūsātīvus = acusativo`):

1. Pronunciación clásica y cantidad (vocales largas, acento en la penúltima o antepenúltima), con 🔊.
2. Una lengua flexiva: la terminación dice la función; por eso el orden de palabras es libre.
3. Los casos y sus usos (incluido el locativo).
4. Las cinco declinaciones, adjetivos y comparación.
5. Pronombres.
6. El verbo: conjugaciones, persona, número, tiempo, modo, voz; deponentes; irregulares.
7. Formas nominales: infinitivos, participios, gerundio, gerundivo, supino.
8. Sintaxis: acusativo con infinitivo, ablativo absoluto, usos del subjuntivo, condicionales.
9. Métrica básica.
10. Cómo estudiar con el método de Ørberg: leer el capítulo del libro primero, deducir por el contexto y las notas al margen, y luego practicar aquí.

Las tablas de paradigmas salen de `morfo.js` (una sola fuente de verdad). Cada sección indica en qué capítulo se enseña; las de capítulos no alcanzados se ven atenuadas pero legibles. Cada capítulo enlaza a su sección («Ver teoría»), y la teoría a los ejercicios del capítulo. Buscador sencillo arriba.

### 6. César como tutor

- **Diagnóstico del error**: compara la respuesta con la esperada usando `analiza` y da un consejo concreto en vez de una frase genérica. Ejemplos:
  - Escribe `-ae` cuando se pide `-ās` → «Eso es genitivo o dativo singular, o nominativo plural; aquí es objeto directo plural: acusativo, `-ās`».
  - Falta solo el macrón → acepta y dice «Bien, pero es `puellā`, con ā larga: así se distingue el ablativo del nominativo».
  - Confunde 2.ª y 3.ª conjugación (`legēmus` / `legimus`) → recuerda la vocal temática.
  - Forma válida de otro tiempo → «Esa forma existe, pero es perfecto; aquí la acción dura: imperfecto».
- **Pista escalonada** (botón «Ayuda de César»): 1) qué función o caso hace falta, 2) la fila del paradigma, 3) la respuesta. Usar pistas no impide acertar, pero la carta vuelve antes.
- **Consejo del día** al abrir cada capítulo: un truco o regla mnemotécnica sobre la gramática nueva (p. ej., «Los neutros tienen nominativo y acusativo iguales, y en plural terminan en -a»).
- Tras 3 errores con la misma etiqueta, propone abrir la sección de «Ars» correspondiente.
- Usa solo las poses que existen (`neutral, happy, surprised, stern, sad, think`). **No generes ni cambies caras**: si hiciera falta una expresión nueva, propónmela y espera mi «sí».
- Sigue siendo César, sin mencionar «narrador ficticio».

### 7. Voz

- Actualiza `tools/spoken.js` para leer los nuevos archivos de datos: lemas del vocabulario, frases del banco (ya completas) y ejemplos de las reglas.
- Regenera con `tools/voz/gen_audio.py` (Kokoro, voces Sara/Nicola, velocidad 0.85; el modelo está en `~/latin-tts/`) y rehaz `audio/boca.json` con `tools/voz/boca.py`. Borra los mp3 de los diálogos quitados.
- Calcula antes el tamaño total; si supera ~40 MB, dímelo y propón qué dejar sin audio (la voz del navegador cubre lo que falte).

### 8. Sugerencias adicionales (hazlas si no complican lo anterior)

- **Mapa de dominio**: en el inicio, una cuadrícula de casos × declinaciones y de tiempos × modos coloreada según tus aciertos; César recomienda repasar lo más flojo.
- **Lectio brevis** opcional por capítulo: 4–6 líneas originales que usen solo vocabulario conocido, con glosas al pasar el cursor, para leer en contexto como propone Ørberg.
- **Escandir** en el cap. XXXIV: marcar largas y breves de un verso original y oírlo.
- **Exportar e importar progreso** (JSON) para no perderlo al cambiar de navegador.
- **Modo estricto de macrones** como opción en la cabecera.

## Restricciones

- Sin build ni dependencias. Al cambiar JS, CSS o imágenes, sube `VER` en `app.js` y el `?v=` de `style.css` y `app.js` en `index.html` (y añádelo a los nuevos scripts de `data/`).
- Mantén el estilo actual (violeta, tarjetas crema, acento amarillo, Unbounded + PT Sans con latin-ext).
- Actualiza el README: qué hay en cada capítulo, cómo regenerar datos y audio, y que el libro sigue sin incluirse.
- Prueba con el servidor `lingua-latina` de `.claude/launch.json` (puerto 8811): un capítulo de cada nivel, errores a propósito para ver los consejos de César, la pestaña Ars, migración de cartas viejas y vista móvil. `node tools/test_morfo.js` en verde.
- **No hagas commit ni push** sin preguntarme. Al terminar, resume qué cambió y qué queda pendiente.

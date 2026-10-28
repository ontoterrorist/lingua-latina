# Motor de voz latina clásica

Esta carpeta contiene la versión `v0.1.1` de [espeak-ng-wasm](https://github.com/classical-cat-dh-lab/espeak-ng-wasm), publicada por Classical Cat Digital Humanities Lab. Usa eSpeak NG `1.52.0` en WebAssembly y su tabla revisada `la.json` para convertir IPA de latín clásico a voz sintetizada.

Los archivos se sirven desde la propia repo en GitHub Pages. La síntesis ocurre en el navegador y no envía texto a un servicio externo. Los hashes SHA-256 del lanzamiento están en `sha256sums.txt`.

## Archivos y licencia

El motor, el controlador, la tabla fonética y sus artefactos compilados están bajo GPL-3.0; se incluye la licencia original en `LICENSE`. El código fuente correspondiente está disponible en [la versión v0.1.1 del proyecto](https://github.com/classical-cat-dh-lab/espeak-ng-wasm/tree/v0.1.1), que documenta el proceso reproducible y la versión fijada de eSpeak NG. El fuente de eSpeak NG está en [el commit 4870adfa25b1a32b4361592f1be8a40337c58d6c](https://github.com/espeak-ng/espeak-ng/tree/4870adfa25b1a32b4361592f1be8a40337c58d6c).

La conversión de la ortografía a IPA de este juego está en `voice.js`. Usa macrones escritos para conservar la cantidad vocálica; sin macrón, la duración de esa vocal no se puede inferir del texto.

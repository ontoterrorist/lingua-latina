// Lista todas las frases latinas que dice la app: node tools/spoken.js salida.json
// Lee data/ (vocabulario, capítulos y banco de ejercicios) y devuelve [{voice, text, tipo}] sin repetir:
//   · el lema de cada palabra (botón 🔊 de la lista de vocabulario y de las cartas),
//   · el ejemplo de la regla de cada capítulo,
//   · la frase del banco que sale como ejemplo en la carta de cada palabra (Tarj.fraseCon).
const fs = require('fs'), path = require('path');
const raiz = path.join(__dirname, '..');
const leer = f => fs.readFileSync(path.join(raiz, 'data', f), 'utf8');
const ficheros = fs.readdirSync(path.join(raiz, 'data')).filter(f => /^ejercicios.*\.js$/.test(f)).sort((a, b) => a === 'ejercicios.js' ? -1 : b === 'ejercicios.js' ? 1 : a.localeCompare(b));
const { VOCAB, CAPITULOS, BANCO, NOMBRES } = new Function(leer('vocabulario.js') + leer('capitulos.js') + ficheros.map(leer).join('\n') + ';return { VOCAB, CAPITULOS, BANCO, NOMBRES }')();
const Ejer = require('../ejercicios.js'), Tarj = require('../tarjetas.js');
Ejer.carga({ BANCO, NOMBRES, VOCAB, CAPITULOS });
const LECTOR = 'lector';
const seen = new Set(), items = [];
const add = (text, tipo) => { text = (text || '').trim(); const k = LECTOR + '|' + text; if (text && !seen.has(k)) { seen.add(k); items.push({ voice: LECTOR, text, tipo }); } };
for (const c of Object.keys(VOCAB)) for (const v of VOCAB[c]) {
  if (/^-|\s|…/.test(v[0])) continue;
  add(v[0], 'lema');
  if (/^(n|adj|v)$/.test(v[2])) add(Tarj.fraseCon(v[0], 35), 'frase');
}
CAPITULOS.forEach(c => c.ejemplo && add(c.ejemplo.la, 'ejemplo'));
fs.writeFileSync(process.argv[2] || 'spoken.json', JSON.stringify(items, null, 1));
const por = {}; items.forEach(i => { por[i.tipo] = (por[i.tipo] || 0) + 1; });
const chars = items.reduce((s, i) => s + i.text.length, 0);
console.log(items.length, 'frases', JSON.stringify(por), '· caracteres', chars, '· ≈', Math.round(chars / 13), 's de audio ≈', (chars / 13 * 8 / 1024).toFixed(1), 'MB a 64 kbps');

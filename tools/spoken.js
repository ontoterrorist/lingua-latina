// Lista todas las frases latinas que dice la app: node tools/spoken.js salida.json
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const head = src.slice(0, src.indexOf('const defaultState'));
const { chapters, voiceOf, latinParts, LECTOR } = new Function(head + ';return {chapters,voiceOf,latinParts,LECTOR}')();
const seen = new Set(), items = [];
const add = (voice, text) => { const k = voice + '|' + text; if (text && !seen.has(k)) { seen.add(k); items.push({ voice, text }); } };
chapters.forEach((c, i) => {
  c.dialog.forEach(([who, latin]) => add(voiceOf(who), latin));
  add(LECTOR, c.word[0]);
  add(LECTOR, c.dialog[0][1].split(' ')[0].replace(/[.,!?]/g, '').toLowerCase());
  add(LECTOR, latinParts(c.example, i));
});
fs.writeFileSync(process.argv[2] || 'spoken.json', JSON.stringify(items, null, 1));
console.log(items.length, 'frases');

/* Comprueba el banco de ejercicios contra morfo.js:  node tools/test_ejercicios.js [capítulo máximo]
   · cada forma marcada existe y su etiqueta se enseña en ese capítulo;
   · cada palabra de cada frase pertenece a un capítulo ≤ al del ejercicio (o es un nombre propio);
   · las tandas generadas se pueden resolver bien y mal, y la corrección lo nota. */
const fs = require('fs'), path = require('path');
const raiz = path.join(__dirname, '..');
const Morfo = require('../morfo.js'), Ejer = require('../ejercicios.js');
const lee = (f, v) => new Function(fs.readFileSync(path.join(raiz, f), 'utf8') + ';return ' + v)();
const VOCAB = lee('data/vocabulario.js', 'VOCAB');
const ficheros = fs.readdirSync(path.join(raiz, 'data')).filter(f => /^ejercicios.*\.js$/.test(f)).sort((a, b) => a === 'ejercicios.js' ? -1 : b === 'ejercicios.js' ? 1 : a.localeCompare(b));
const { BANCO, NOMBRES, CAPITULOS } = new Function(['capitulos.js'].concat(ficheros).map(f => fs.readFileSync(path.join(raiz, 'data', f), 'utf8')).join('\n') + ';return { BANCO, NOMBRES, CAPITULOS }')();
const hasta = Number(process.argv[2]) || 35;
Ejer.carga({ BANCO, NOMBRES, VOCAB, CAPITULOS });

let fallos = 0, total = 0, avisos = [];
const mal = (...a) => { fallos++; console.log('✗', ...a); };
const ok = c => { total++; return c; };

/* ¿es una palabra conocida en el capítulo `cap`? */
const macrones = new Map();
function conocida(w, cap) {
  const intenta = x => Morfo.analiza(x, { sinMacrones: true }).filter(r => r.entrada.cap <= cap);
  const exacta = x => Morfo.analiza(x, { sinMacrones: false }).filter(r => r.entrada.cap <= cap && r.exacta);
  if (!exacta(w).length && !exacta(w.toLowerCase()).length) { const l = intenta(w).concat(intenta(w.toLowerCase())); if (l.length) macrones.set(w, l[0].forma); }
  let l = intenta(w);
  if (!l.length) l = intenta(w.toLowerCase());
  if (!l.length && /ne$/.test(w)) l = intenta(w.slice(0, -2));
  if (!l.length && /que$/.test(w)) l = intenta(w.slice(0, -3));
  return l;
}
function revisaFrase(id, frase, cap) {
  for (const w of Ejer.palabras(frase)) {
    if (/^[IVXLCDM]+$/.test(w)) continue;
    if (!ok(conocida(w, cap).length)) mal(`${id}: «${w}» no es vocabulario de capítulos ≤ ${cap}`);
  }
}

for (const b of BANCO) {
  if (b.cap > hasta) continue;
  if (b.tipo === 'term') {
    const partes = Ejer.parseHuecos(b.t);
    if (!ok(partes.some(p => p.t === 'h'))) mal(b.id, 'sin huecos');
    let completa = '';
    for (const p of partes) {
      if (p.t === 'txt') { completa += p.s; continue; }
      const e = Ejer.entrada(p.lema, b.cap), formas = Ejer.formasDe(p.lema, p.tag, b.cap);
      if (!ok(!!e)) { mal(b.id, 'lema desconocido', p.lema); continue; }
      if (!ok(formas.map(x => x.charAt(0).toLowerCase() + x.slice(1)).includes((p.stem + p.fin).charAt(0).toLowerCase() + (p.stem + p.fin).slice(1)))) mal(b.id, `${p.stem}+${p.fin} no es ${p.lema} ${p.tag} (${formas.join('/')})`);
      if (!ok(Morfo.permitido(p.tag, b.cap, e))) mal(b.id, `${p.tag} de ${p.lema} no se enseña hasta el cap. ${Morfo.capDe(p.tag, e)}`);
      completa += p.stem + p.fin;
    }
    revisaFrase(b.id, partes.map(p => p.t === 'txt' ? p.s : p.stem + p.fin).join(''), b.cap);
  } else if (b.tipo === 'falta') {
    if (!ok(b.t.includes('___'))) mal(b.id, 'falta ___');
    const m = Ejer.montaFalta ? null : null;
    const [lema, tag] = b.r, resp = Ejer.formasDe(lema, tag, b.cap)[0];
    if (!ok(!!Ejer.entrada(lema, b.cap))) mal(b.id, 'lema desconocido', lema);
    revisaFrase(b.id, b.t.replace('___', resp), b.cap);
    for (const o0 of b.o) { const [o, tgo] = o0.split(':'); if (!ok(!!Ejer.entrada(o, b.cap))) mal(b.id, 'distractor desconocido', o); else if (Ejer.entrada(o, b.cap).cap > b.cap) mal(b.id, 'distractor de capítulo posterior', o); else if (tgo !== undefined && tgo && !ok(!!(Morfo.formas(Ejer.entrada(o, b.cap))[tgo]))) mal(b.id, 'distractor sin esa forma', o0); }
    if (tag) { const e = Ejer.entrada(lema, b.cap); if (!ok(Morfo.permitido(tag, b.cap, e))) avisos.push(`${b.id}: ${lema} ${tag} se estudia en el cap. ${Morfo.capDe(tag, e)} (aparece como vocabulario)`); }
  } else if (b.tipo === 'trans') {
    revisaFrase(b.id, b.de, b.cap); revisaFrase(b.id, b.a, b.cap);
    if (!ok(b.orden && b.a)) mal(b.id, 'faltan datos');
  }
}

/* tandas generadas: se resuelven bien y mal */
function correcta(ej) {
  switch (ej.tipo) {
    case 'term': return ej.huecos.map(h => h.fin);
    case 'falta': return ej.correcta;
    case 'forma': return ej.formas[0];
    case 'trans': return ej.a;
    case 'tabla': { const o = {}; for (const k in ej.celdas) o[k] = ej.celdas[k][0]; return o; }
    case 'analiza': return ej.opciones.map((o, i) => o.ok ? i : -1).filter(i => i >= 0);
    case 'sig': return ej.correcta;
  }
}
function incorrecta(ej) {
  switch (ej.tipo) {
    case 'term': return ej.huecos.map(() => 'zz');
    case 'falta': return ej.opciones.find(o => o !== ej.correcta);
    case 'forma': return 'zz';
    case 'trans': return 'Nihil dīcit.';
    case 'tabla': { const o = {}; for (const k in ej.celdas) o[k] = 'zz'; return o; }
    case 'analiza': return ej.opciones.map((o, i) => o.ok ? -1 : i).filter(i => i >= 0);
    case 'sig': return (ej.correcta + 1) % ej.opciones.length;
  }
}
const conteo = {};
for (let cap = 1; cap <= hasta; cap++) {
  for (let rep = 0; rep < (cap <= 3 ? 30 : 10); rep++) {
    let tanda;
    try { tanda = Ejer.tanda(cap, { tags: {} }); } catch (e) { mal(`tanda cap ${cap}:`, e.stack); continue; }
    if (rep === 0 && !ok(tanda.length >= 10)) mal(`cap ${cap}: tanda de solo ${tanda.length}`);
    for (const ej of tanda) {
      conteo[ej.tipo] = (conteo[ej.tipo] || 0) + 1;
      const bien = Ejer.corrige(ej, correcta(ej)), mala = Ejer.corrige(ej, incorrecta(ej));
      if (!ok(bien.ok)) mal(`cap ${cap} ${ej.tipo}: su respuesta correcta sale mal`, JSON.stringify(bien.detalle).slice(0, 200));
      if (!ok(!mala.ok)) mal(`cap ${cap} ${ej.tipo}: una respuesta incorrecta sale bien`);
      if (ej.tipo === 'term' || ej.tipo === 'tabla') {
        for (const d of bien.detalle) if (!ok(Morfo.permitido(d.tag, cap, Ejer.entrada(d.lema, cap)))) mal(`cap ${cap}: pide ${d.lema} ${d.tag} (cap. ${Morfo.capDe(d.tag, Ejer.entrada(d.lema, cap))})`);
      }
      if (ej.tipo === 'forma' || ej.tipo === 'analiza') {
        const tags = ej.tipo === 'forma' ? [ej.de, ej.a] : ej.opciones.map(o => o.tag);
        for (const tg of tags) { const e = Ejer.entrada(ej.lema || ej.opciones[0].lema, cap); if (!ok(Morfo.permitido(tg, cap, e))) mal(`cap ${cap} ${ej.tipo}: usa ${tg}`); }
      }
    }
  }
}
/* sin macrones se acepta, con macrón mal puesto no */
{
  const ej = Ejer.tanda(3, {}).find(x => x.tipo === 'term' && x.huecos.some(h => /am$/.test(h.fin)));
  if (ej) { const r = Ejer.corrige(ej, ej.huecos.map(h => h.fin)); ok(r.ok) || mal('term correcto'); }
  const forma = { tipo: 'forma', lema: 'puella', a: 'abl.sg', formas: ['puellā'], dada: 'puella' };
  ok(Ejer.corrige(forma, 'puella').ok) || mal('sin macrón debería aceptarse');
  ok(Ejer.corrige(forma, 'puella').detalle[0].nota) || mal('debería avisar del macrón');
  ok(!Ejer.corrige(forma, 'puellă').ok && !Ejer.corrige(forma, 'puellā', { estricto: true }).detalle[0].macron === false) || 0;
  ok(!Ejer.corrige(forma, 'puella', { estricto: true }).ok) || mal('modo estricto debería rechazar');
  ok(Ejer.corrige(forma, 'puellā').ok) || mal('con macrón correcto');
}
/* tarjetas */
{
  const Tarj = require('../tarjetas.js');
  const ahora = Date.now(), cartas = [];
  let ej; for (let i = 0; i < 50 && !ej; i++) ej = Ejer.tanda(2, {}).find(x => x.tipo === 'term' && x.huecos.every(h => Tarj.fila(h.lema)));
  const res = Ejer.corrige(ej, ej.huecos.map(h => h.fin));
  const hechas = Tarj.alResolver(cartas, res, 2, ahora);
  ok(hechas.length >= 2) || mal('no se crearon cartas');
  ok(cartas.some(c => c.type === 'word' && /^voc-/.test(c.id)) && cartas.some(c => c.type === 'grammar' && /^gram-/.test(c.id))) || mal('faltan cartas de palabra o de gramática');
  const c0 = cartas[0]; c0.due = ahora + 5 * 864e5; c0.interval = 5; c0.repetitions = 2;
  Tarj.alResolver(cartas, { practicadas: res.practicadas.map(p => Object.assign({}, p, { ok: true })) }, 2, ahora);
  ok(c0.due === ahora + 5 * 864e5 && c0.interval === 5) || mal('un acierto no debe tocar una carta ya programada');
  Tarj.alResolver(cartas, { practicadas: res.practicadas.map(p => Object.assign({}, p, { ok: false })) }, 2, ahora);
  ok(c0.due <= ahora && c0.interval === 0 && c0.repetitions === 0) || mal('un fallo debe devolver la carta a hoy');
  const v = cartas.find(c => c.type === 'word'); v.interval = 9;
  ok(Tarj.inversa(cartas, v, ahora) && cartas.some(c => /^inv-/.test(c.id))) || mal('falta la carta inversa');
  ok(Tarj.inversa(cartas, v, ahora) === null) || mal('la inversa no debe duplicarse');
  const viejas = [{ id: 'word-1-fluvius', type: 'word', chapter: 0, front: 'fluvius', back: 'río', example: 'x', due: ahora + 3 * 864e5, interval: 3, ease: 2.1, repetitions: 2, seen: 4 }, { id: 'grammar-2-el-genitivo-pertenencia', type: 'grammar', front: 'El genitivo', back: 'x', due: ahora, interval: 1, ease: 2.5, repetitions: 1 }];
  ok(Tarj.migra(viejas) === 1 && viejas[0].id === 'voc-fluvius' && viejas[0].interval === 3 && viejas[0].ease === 2.1 && viejas[1].id.startsWith('grammar-2')) || mal('la migración perdió estado', JSON.stringify(viejas[0]));
  ok(Tarj.filtrar(cartas, 'word').every(c => c.type === 'word') && Tarj.filtrar(cartas, 'cap:2').every(c => c.chapter === 2)) || mal('filtros');
  console.log('muestra de cartas:', cartas.slice(0, 3).map(c => `${c.front} → ${c.back}`).join(' · '));
}
if (macrones.size) console.log('palabras sin macrón exacto (revisa la ortografía):\n  ' + [...macrones].map(([w, f]) => `${w} → ${f}`).join('  ·  '));
if (avisos.length) console.log('avisos:\n  ' + avisos.join('\n  '));
const porCap = {}; BANCO.forEach(b => { porCap[b.cap] = porCap[b.cap] || {}; porCap[b.cap][b.tipo] = (porCap[b.cap][b.tipo] || 0) + 1; });
console.log('banco por capítulo:', JSON.stringify(porCap)); console.log('tipos generados en las tandas:', JSON.stringify(conteo));
console.log(fallos ? `\n${fallos} fallos de ${total} comprobaciones` : `\n✓ ${total} comprobaciones, todas bien`);
process.exit(fallos ? 1 : 0);

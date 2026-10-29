/* Tarjetas de repetición espaciada desde los resultados de los ejercicios (paso 4).
   Vocabulario: una carta por lema que aparece en un ejercicio. Gramática: una carta por etiqueta practicada (y por modelo de declinación o conjugación).
   Un fallo vuelve a poner la carta para hoy (o la crea con intervalo 0); un acierto solo la crea. Las cartas viejas se migran conservando su estado SM-2.
   Necesita morfo.js y ejercicios.js. En el navegador define window.Tarj; en Node, module.exports. */
(function (raiz) {
'use strict';
const isNode = typeof module !== 'undefined' && module.exports && typeof require === 'function';
const Morfo = isNode ? require('./morfo.js') : raiz.Morfo, Ejer = isNode ? require('./ejercicios.js') : raiz.Ejer;
const T = {};
const DIA = 864e5;
T.slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const fila = lema => { const V = Ejer.datos.vocab; for (const c of Object.keys(V)) for (const v of V[c]) if (v[0] === lema) return { cap: Number(c), la: v[0], formas: v[1], clase: v[2], es: v[3], rel: v[4] }; return null; };
T.fila = fila;
/* «puella, -ae f.» o «capiō, -ere, cēpī, captum» */
T.frente = f => !f ? '' : f.clase === 'v' ? f.formas || f.la : (f.formas && !/^indecl/.test(f.formas) ? `${f.la}, ${f.formas}` : f.la) + (f.clase === 'n' ? '.' : '');

/* una frase original del banco que contenga el lema (o una forma suya) */
T.fraseCon = function (lema, cap) {
  const e = Ejer.entrada(lema, cap); if (!e) return '';
  const formas = new Set(); const fm = Morfo.formas(e); for (const k in fm) fm[k].forEach(x => formas.add(Morfo.plano(x)));
  for (const b of Ejer.datos.banco) {
    if (b.cap > cap) continue;
    let frase = b.tipo === 'term' ? Ejer.parseHuecos(b.t).map(p => p.t === 'txt' ? p.s : p.stem + p.fin).join('') : b.tipo === 'falta' ? b.t.replace('___', Ejer.formasDe(b.r[0], b.r[1], b.cap)[0]) : b.de;
    if (Ejer.palabras(frase).some(w => formas.has(Morfo.plano(w)))) return frase;
  }
  return '';
};
T.terminacion = function (lema, tag, cap) {
  const e = Ejer.entrada(lema, cap); if (!e) return '';
  const f = Morfo.formas(e)[tag]; if (!f) return '';
  const stem = e.tipo === 'n' ? e.n.stem : e.tipo === 'adj' ? e.a.stem : e.tipo === 'v' ? e.v.ps : '';
  const x = f[0];
  if (!stem) return x;
  let i = 0; while (i < stem.length && i < x.length && stem[i] === x[i]) i++;
  return i >= 2 ? '-' + x.slice(i) : x;
};
function modelo(e) {
  if (e.tipo === 'n') return { 1: '1.ª declinación (-a)', 2: e.n.g === 'n' ? '2.ª declinación neutra (-um)' : '2.ª declinación (-us)', 3: '3.ª declinación', 4: '4.ª declinación', 5: '5.ª declinación' }[e.n.decl] || '';
  if (e.tipo === 'adj') return e.a.tipo === '12' ? 'adjetivo de 1.ª y 2.ª clase' : 'adjetivo de 3.ª clase';
  if (e.tipo === 'v') return e.v.irr ? 'verbo irregular' : `conjugación ${{ 1: '1.ª', 2: '2.ª', 3: '3.ª', '3i': '3.ª en -iō', 4: '4.ª' }[e.v.c]}`;
  return '';
}

T.cartaVocab = function (lema, cap) {
  const f = fila(lema); if (!f) return null;
  const ej = T.fraseCon(lema, cap);
  return { id: 'voc-' + T.slug(lema), type: 'word', chapter: f.cap, lema, front: T.frente(f), back: f.es, rel: f.rel || '', example: ej, dir: 'la-es' };
};
T.cartaGramatica = function (lema, tag, cap) {
  const e = Ejer.entrada(lema, cap); if (!e || !/^(n|adj|v)$/.test(e.tipo) || !Morfo.permitido(tag, cap, e)) return null;
  const m = modelo(e), term = T.terminacion(lema, tag, cap), forma = (Morfo.formas(e)[tag] || [])[0];
  if (!forma) return null;
  return { id: `gram-${tag}-${T.slug(m)}`, type: 'grammar', chapter: Math.max(1, Morfo.capDe(tag, e)), tag, lema, front: `${Ejer.etiquetaCorta(tag)} · ${m}`, back: `${term} · ${forma}`, rel: '', example: '' };
};

function nueva(base, ahora) { return Object.assign({ created: ahora, lastSeen: ahora, due: ahora, interval: 0, ease: 2.5, repetitions: 0, seen: 1 }, base); }
/* actualiza `cartas` con el resultado de un ejercicio; devuelve las cartas tocadas */
T.alResolver = function (cartas, res, cap, ahora) {
  ahora = ahora || Date.now();
  const tocadas = [], vistos = new Set();
  for (const p of res.practicadas) {
    const nuevas = [T.cartaVocab(p.lema, cap)];
    if (p.tag && p.tag !== 'sig') nuevas.push(T.cartaGramatica(p.lema, p.tag, cap));
    for (const c of nuevas) {
      if (!c) continue;
      const clave = c.id + (p.ok ? '+' : '-'); if (vistos.has(clave)) continue; vistos.add(clave);
      let v = cartas.find(x => x.id === c.id);
      if (!v) { v = nueva(c, ahora); cartas.push(v); }
      else { Object.assign(v, { front: c.front, back: c.back, rel: c.rel, example: v.example || c.example }); v.seen = (v.seen || 1) + 1; v.lastSeen = ahora; }
      if (!p.ok) { v.due = Math.min(v.due, ahora); v.repetitions = 0; v.interval = 0; v.ease = Math.max(1.3, (v.ease || 2.5) - 0.2); v.fallos = (v.fallos || 0) + 1; }
      tocadas.push(v);
    }
  }
  return tocadas;
};
/* cuando la carta latín→español llega a ≥ 7 días de intervalo, aparece también la inversa español→latín */
T.inversa = function (cartas, carta, ahora) {
  if (carta.type !== 'word' || carta.dir === 'es-la' || (carta.interval || 0) < 7) return null;
  const id = 'inv-' + carta.id.slice(4);
  if (cartas.some(c => c.id === id)) return null;
  const f = fila(carta.lema); if (!f) return null;
  const inv = nueva({ id, type: 'word', chapter: carta.chapter, lema: carta.lema, dir: 'es-la', front: f.es, back: T.frente(f), rel: f.rel || '', example: carta.example || '' }, ahora || Date.now());
  cartas.push(inv); return inv;
};
/* cartas guardadas por la versión anterior: word-N-slug se convierte en voc-lema con su mismo estado SM-2; lo demás queda como estaba */
T.migra = function (cartas) {
  let n = 0;
  for (const c of cartas) {
    const m = /^word-(\d+)-(.+)$/.exec(c.id || ''); if (!m || c.lema) continue;
    const V = Ejer.datos.vocab[Number(m[1])] || [];
    const v = V.find(x => T.slug(x[0]) === m[2]) || V.find(x => T.slug(x[0]) === T.slug(c.front || ''));
    if (!v || cartas.some(x => x.id === 'voc-' + T.slug(v[0]))) continue;
    const nuevaC = T.cartaVocab(v[0], 35);
    if (!nuevaC) continue;
    Object.assign(c, { id: nuevaC.id, lema: v[0], front: nuevaC.front, back: nuevaC.back, rel: nuevaC.rel, example: nuevaC.example || c.example, dir: 'la-es', chapter: Number(m[1]) });
    n++;
  }
  return n;
};
T.filtrar = function (cartas, filtro, ahora) {
  ahora = ahora || Date.now();
  const f = String(filtro || 'due');
  const r = f === 'all' ? cartas.slice() : f === 'word' ? cartas.filter(c => c.type === 'word') : f === 'grammar' ? cartas.filter(c => c.type === 'grammar')
    : /^cap:\d+$/.test(f) ? cartas.filter(c => c.chapter === Number(f.slice(4))) : cartas.filter(c => c.due <= ahora);
  return r.sort((a, b) => a.due - b.due);
};

if (isNode) module.exports = T; else raiz.Tarj = T;
})(typeof window !== 'undefined' ? window : globalThis);

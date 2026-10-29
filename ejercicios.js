/* Motor de ejercicios de Lingua Latina: arma tandas por capítulo, corrige con morfo.js y dibuja cada tipo de ejercicio.
   Tipos: term (completa la terminación) · tabla (declina o conjuga) · forma (transforma una forma) · trans (transforma una frase)
          analiza (marca todas las lecturas) · falta (palabra que falta) · sig (significado, latín↔español).
   En el navegador define window.Ejer; en Node, module.exports. Necesita morfo.js (y data/*.js cargados o pasados a Ejer.carga). */
(function (raiz) {
'use strict';
const Morfo = (typeof module !== 'undefined' && module.exports && typeof require === 'function') ? require('./morfo.js') : raiz.Morfo;
const E = {};
const plano = Morfo.plano;
const azar = a => a[Math.floor(Math.random() * a.length)];
const baraja = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const uniq = a => [...new Set(a)];
const norm = s => (s || '').normalize('NFC').trim();

/* ───── datos ───── */
E.datos = { banco: [], vocab: {}, capitulos: [], nombres: [] };
E.carga = function ({ BANCO, NOMBRES, VOCAB, CAPITULOS }) {
  Morfo.cargaVocab(VOCAB);
  for (const [cap, n, f] of NOMBRES || []) Morfo.registra(Morfo.entrada(n, f, 'n'), cap);
  const n = {};
  (BANCO || []).forEach(b => { if (!b.id) { const k = b.cap + '-' + b.tipo; n[k] = (n[k] || 0) + 1; b.id = k + String(n[k]).padStart(2, '0'); } });
  E.datos = { banco: BANCO || [], vocab: VOCAB || {}, capitulos: CAPITULOS || [], nombres: NOMBRES || [] };
};
E.entrada = (lema, cap) => {
  const c = Morfo.lexico.filter(e => e.la === lema);
  return (cap ? c.find(e => e.cap <= cap) : null) || c[0] || null;
};
/* formas aceptadas de (lema, etiqueta); etiqueta vacía = palabra invariable */
E.formasDe = (lema, tag, cap) => {
  const e = E.entrada(lema, cap);
  if (!e) return [lema];
  const f = Morfo.formas(e)[tag];
  return f && f.length ? f : [lema];
};

/* ───── descripción de etiquetas en español ───── */
const CASO = { nom: 'nominativo', gen: 'genitivo', dat: 'dativo', acc: 'acusativo', abl: 'ablativo', voc: 'vocativo', loc: 'locativo' };
const FUNCION = { nom: 'sujeto (o atributo)', gen: 'dice de quién es o de quién se habla («de…»)', dat: 'a quién o para quién', acc: 'objeto directo', abl: 'circunstancia: con, de, en…', voc: 'se usa para llamar a alguien', loc: 'lugar donde' };
const NUM = { sg: 'sg.', pl: 'pl.' }, GEN = { m: 'masc.', f: 'fem.', n: 'neutro' };
const TIEMPO = { pres: 'presente', impf: 'imperfecto', fut: 'futuro', perf: 'perfecto', plpf: 'pluscuamperfecto', futperf: 'futuro perfecto' };
E.etiquetaCorta = function (tag) {
  const p = tag.split('.');
  if (CASO[p[0]]) return `${CASO[p[0]]} ${NUM[p[1]]}${p[2] ? ' ' + GEN[p[2]] : ''}`;
  if (/^[123](sg|pl)$/.test(p[0])) return `${p[0][0]}.ª persona ${NUM[p[0].slice(1)]} del ${TIEMPO[p[1]] || p[1]} ${p[2] === 'subj' ? 'de subjuntivo' : p[2] === 'imp' ? 'de imperativo' : 'de indicativo'}${p[3] === 'pass' ? ' pasivo' : ''}`;
  return Morfo.nombreEtiqueta(tag);
};
/* rótulo corto para la cabecera de una tabla */
const T_ABR = { nom: 'nom.', gen: 'gen.', dat: 'dat.', acc: 'acus.', abl: 'abl.', voc: 'voc.', sg: 'sg.', pl: 'pl.', m: 'masc.', f: 'fem.', n: 'neutro' };
E.etiquetaTabla = function (tag) {
  const p = tag.split('.');
  const caso = x => x.map(y => T_ABR[y] || y).join(' ');
  if (p[0] === 'part') return `participio ${{ pres: 'presente', perf: 'perfecto', fut: 'futuro' }[p[1]]} · ${caso(p.slice(3))}`;
  if (p[0] === 'gdv') return `gerundivo · ${caso(p.slice(1))}`;
  if (p[0] === 'ger') return `gerundio ${T_ABR[p[1]] || p[1]}`;
  if (p[0] === 'sup' && p.length === 2) return `supino ${T_ABR[p[1]] || p[1]}`;
  if (p[0] === 'inf') return `infinitivo ${{ pres: 'presente', perf: 'perfecto', fut: 'futuro' }[p[1]]}`;
  if (p[0] === 'adv') return p[1] ? `adverbio ${p[1] === 'comp' ? 'comparativo' : 'superlativo'}` : 'adverbio';
  return E.etiquetaCorta(tag);
};
E.describe = tag => { const c = tag.split('.')[0]; return E.etiquetaCorta(tag) + (FUNCION[c] ? ', ' + FUNCION[c] : ''); };

E.glosa = lema => { for (const c of Object.keys(E.datos.vocab)) for (const v of E.datos.vocab[c]) if (v[0] === lema) return v[3]; return ''; };

/* ───── texto con huecos ───── */
E.parseHuecos = function (t) {
  const re = /\{([^:{}]+):([^.{}]+)\.([^{}]*)\}/g, partes = [];
  let pos = 0, m;
  while ((m = re.exec(t))) {
    let pre = t.slice(pos, m.index);
    const stem = pre.match(/[A-Za-zāēīōūĀĒĪŌŪ]*$/)[0];
    pre = pre.slice(0, pre.length - stem.length);
    if (pre) partes.push({ t: 'txt', s: pre });
    partes.push({ t: 'h', stem, fin: m[1], lema: m[2], tag: m[3] });
    pos = m.index + m[0].length;
  }
  if (pos < t.length) partes.push({ t: 'txt', s: t.slice(pos) });
  return partes;
};
const sinPuntos = s => s.replace(/[.,;:!?¿¡“”‘’"'«»()—-]/g, ' ').replace(/\s+/g, ' ').trim();
E.palabras = s => sinPuntos(s).split(' ').filter(Boolean);

/* ───── juicio de una forma ───── */
const bajaPrimera = s => s.charAt(0).toLowerCase() + s.slice(1);
function juzga(dado, formas, estricto) {
  const d = bajaPrimera(norm(dado));
  formas = formas.map(bajaPrimera);
  if (!d) return { ok: false, vacio: true };
  if (formas.some(f => norm(f) === d)) return { ok: true, exacta: true, ver: formas[0] };
  const mismoPlano = formas.some(f => plano(f) === plano(d));
  if (mismoPlano) {
    if (d === plano(d) && !estricto) return { ok: true, exacta: false, nota: `Bien, pero con macrones: ${formas.find(f => plano(f) === plano(d))}.`, ver: formas.find(f => plano(f) === plano(d)) };
    return { ok: false, macron: true, ver: formas[0] };
  }
  return { ok: false, ver: formas[0] };
}
E.juzga = juzga;

/* ───── montaje de cada tipo desde el banco o desde el motor ───── */
function montaTerm(b) {
  const partes = E.parseHuecos(b.t);
  const huecos = partes.filter(p => p.t === 'h').map(h => { h.formas = E.formasDe(h.lema, h.tag, b.cap); return h; });
  return { id: b.id, tipo: 'term', cap: b.cap, partes, huecos };
}
function montaFalta(b) {
  const [lema, tag] = b.r, correcta = E.formasDe(lema, tag, b.cap)[0];
  /* cada distractor es «lema» (misma etiqueta) o «lema:etiqueta» (otra forma del mismo verbo, p. ej. otro tiempo) */
  const opciones = baraja(uniq([correcta, ...b.o.map(o => { const [l, tg] = o.split(':'); return E.formasDe(l, tg === undefined ? tag : tg, b.cap)[0]; })]));
  return { id: b.id, tipo: 'falta', cap: b.cap, t: b.t, lema, tag, correcta, opciones };
}
function montaTrans(b) { return { id: b.id, tipo: 'trans', cap: b.cap, orden: b.orden, de: b.de, a: b.a }; }
function montaBanco(b) { return b.tipo === 'term' ? montaTerm(b) : b.tipo === 'falta' ? montaFalta(b) : montaTrans(b); }

function lemasDelCapitulo(cap) {
  return Morfo.lexico.filter(e => e.cap === cap && (e.tipo === 'n' || e.tipo === 'adj' || e.tipo === 'v'));
}
function etiquetasPermitidas(e, cap) { return Object.keys(Morfo.formas(e)).filter(t => Morfo.permitido(t, cap, e)); }

/* clase de una etiqueta: n (nombre), adj (con género, grado, participio…), v (verbo) */
const tipoTag = t => /^(nom|gen|dat|acc|abl|voc|loc)\.(sg|pl)$/.test(t) ? 'n' : /^sup\.(acc|abl)$/.test(t) ? 'v' : /^(comp|sup|adv|part|gdv)(\.|$)|^(nom|gen|dat|acc|abl|voc)\.(sg|pl)\.[mfn]$/.test(t) ? 'adj' : 'v';
E.tipoTag = tipoTag;
const NOMBRE_TMV = { pres: 'presente', impf: 'imperfecto', fut: 'futuro', perf: 'perfecto', plpf: 'pluscuamperfecto', futperf: 'futuro perfecto', ind: 'indicativo', subj: 'subjuntivo', act: 'activa', pass: 'pasiva', dep: 'deponente' };
const tmv = suf => { const [t, m, v] = suf.split('.'); return `${NOMBRE_TMV[t]} de ${NOMBRE_TMV[m]} (${NOMBRE_TMV[v]})`; };
const CASOS_ORD = ['nom', 'voc', 'gen', 'dat', 'acc', 'abl', 'loc'];
const ordenCasos = a => a.slice().sort((x, y) => CASOS_ORD.indexOf(x) - CASOS_ORD.indexOf(y));

/* tabla de paradigma: filas, columnas y claves de casilla; celdas guarda las formas aceptadas y meta (lema, etiqueta) */
E.tabla = function (cap) {
  const cfg = (E.datos.capitulos[cap - 1] || {}).tablas || [];
  if (!cfg.length) return null;
  const t = azar(cfg), etqs = t.etiquetas, k0 = tipoTag(etqs[0]);
  const persona = etqs.length >= 3 && etqs.every(x => /^[123](sg|pl)\./.test(x) && x.split('.').slice(1).join('.') === etqs[0].split('.').slice(1).join('.'));
  const celdas = {}, meta = {}, dadas = {};
  const ok = (e, tag) => e && Morfo.formas(e)[tag] && Morfo.permitido(tag, cap, e);
  if (k0 === 'n' || (k0 === 'adj' && /^(nom|gen|dat|acc|abl|voc)./.test(etqs[0])) || persona) {
    const cand = baraja(t.lemas).map(l => E.entrada(l, cap)).filter(e => e && e.cap <= cap && etqs.some(tg => ok(e, tg)));
    if (!cand.length) return null;
    const e = cand[0], lema = e.la, tags = etqs.filter(tg => ok(e, tg));
    tags.forEach(tg => { celdas[tg] = Morfo.formas(e)[tg]; meta[tg] = { lema, tag: tg }; });
    let filas, cols, claves;
    if (k0 === 'n') {
      const cs = ordenCasos(uniq(tags.map(x => x.split('.')[0]))), ns = ['sg', 'pl'].filter(n => tags.some(x => x.split('.')[1] === n));
      filas = cs.map(c => CASO[c]); cols = ns.map(n => (n === 'sg' ? 'singular' : 'plural')); claves = cs.map(c => ns.map(n => (celdas[c + '.' + n] ? c + '.' + n : null)));
      if (tags.length > 2 && celdas['nom.sg']) dadas['nom.sg'] = celdas['nom.sg'][0];
    } else if (persona) {
      const ps = ['1', '2', '3'].filter(p => tags.some(x => x[0] === p)), ns = ['sg', 'pl'].filter(n => tags.some(x => x.slice(1, 3) === n)), suf = etqs[0].split('.').slice(1).join('.');
      filas = ps.map(p => `${p}.ª persona`); cols = ns.map(n => (n === 'sg' ? 'singular' : 'plural')); claves = ps.map(p => ns.map(n => (celdas[`${p}${n}.${suf}`] ? `${p}${n}.${suf}` : null)));
    } else {
      const cs = ordenCasos(uniq(tags.map(x => x.split('.')[0]))), gs = uniq(tags.map(x => x.split('.').slice(1).join('.')));
      filas = cs.map(c => CASO[c]); cols = gs.map(g => { const [n, ge] = g.split('.'); return ge ? `${NUM[n]} ${GEN[ge]}` : n; }); claves = cs.map(c => gs.map(g => (celdas[c + '.' + g] ? c + '.' + g : null)));
    }
    const titulo = persona ? `Conjuga «${lema}» en ${tmv(etqs[0].split('.').slice(1).join('.'))}.` : `Declina «${lema}»: rellena las casillas.`;
    return { tipo: 'tabla', cap, lema, titulo, filas, cols, claves, celdas, meta, dadas, etiquetas: tags };
  }
  /* un verbo por fila y una etiqueta por columna: «Conjuga: 3.ª persona del presente» */
  const lemas = baraja(t.lemas).filter(l => { const e = E.entrada(l, cap); return e && e.cap <= cap && etqs.every(tg => ok(e, tg)); }).slice(0, 4);
  if (!lemas.length) return null;
  const filas = lemas, cols = etqs.map(tg => E.etiquetaTabla(tg)), claves = lemas.map(l => etqs.map(tg => { const k = l + '|' + tg; celdas[k] = Morfo.formas(E.entrada(l, cap))[tg]; meta[k] = { lema: l, tag: tg }; return k; }));
  return { tipo: 'tabla', cap, titulo: etqs.length === 1 ? `Escribe: ${E.etiquetaCorta(etqs[0])}.` : 'Completa las formas de cada verbo.', filas, cols, claves, celdas, meta, dadas, etiquetas: etqs, rotuloFilas: 'verbo' };
};

E.forma = function (cap) {
  const cfg = E.datos.capitulos[cap - 1] || {}, pares = cfg.pares || [], tablas = cfg.tablas || [];
  if (!pares.length || !tablas.length) return null;
  for (let intento = 0; intento < 8; intento++) {
    const [de, a] = azar(pares), k = tipoTag(de);
    const pool = tablas.filter(t => tipoTag(t.etiquetas[0]) === k || t.etiquetas.some(x => tipoTag(x) === k)).flatMap(t => t.lemas);
    if (!pool.length) continue;
    const lema = azar(pool), e = E.entrada(lema, cap); if (!e || e.cap > cap) continue;
    const f = Morfo.formas(e);
    if (!f[de] || !f[a] || !Morfo.permitido(de, cap, e) || !Morfo.permitido(a, cap, e)) continue;
    return { tipo: 'forma', cap, lema, de, a, dada: f[de][0], formas: f[a], orden: `Escribe el ${E.etiquetaCorta(a)} de ${lema}.` };
  }
  return null;
};

E.analiza = function (cap) {
  const cands = [];
  for (const e of lemasDelCapitulo(cap)) {
    const f = Morfo.formas(e);
    for (const tag of etiquetasPermitidas(e, cap)) for (const forma of f[tag]) {
      const lecs = Morfo.analiza(forma, { hasta: cap }).filter(r => r.entrada.cap <= cap);
      if (lecs.length) cands.push({ forma, lecs });
    }
  }
  if (!cands.length) return null;
  const multi = cands.filter(c => c.lecs.length >= 2), c = azar(multi.length ? multi : cands);
  const ok = c.lecs.map(r => ({ lema: r.lema, tag: r.etiqueta, ok: true }));
  const e = c.lecs[0].entrada, tags = etiquetasPermitidas(e, cap).filter(t => !c.lecs.some(r => r.etiqueta === t && r.lema === e.la));
  const dist = baraja(tags).slice(0, Math.max(2, 5 - ok.length)).map(t => ({ lema: e.la, tag: t, ok: false }));
  const opciones = baraja(ok.concat(dist)).map(o => Object.assign(o, { texto: `${o.lema} · ${E.etiquetaCorta(o.tag)}` }));
  return { tipo: 'analiza', cap, forma: c.forma, opciones };
};

const glosaCorta = g => { let s = g.split(';')[0].trim(); const p = s.split(', '); if (p.length > 2) s = p.slice(0, 2).join(', '); return s.replace(/\s*\(.*?\)\s*$/, m => m.length < 24 ? m : ''); };
E.significado = function (cap) {
  const V = E.datos.vocab, cls = ['n', 'v', 'adj', 'adv'];
  const aqui = (V[cap] || []).filter(v => cls.includes(v[2]) && v[3]);
  if (!aqui.length) return null;
  const v = azar(aqui), dir = Math.random() < 0.55 ? 'la-es' : 'es-la';
  const mismos = [];
  for (let c = cap; c >= 1 && mismos.length < 12; c--) (V[c] || []).forEach(w => { if (w[2] === v[2] && w[0] !== v[0] && glosaCorta(w[3]) !== glosaCorta(v[3])) mismos.push(w); });
  const dist = baraja(mismos).slice(0, 3);
  if (dist.length < 2) return null;
  const todas = baraja([v].concat(dist));
  const texto = dir === 'la-es' ? w => glosaCorta(w[3]) : w => w[0];
  return { tipo: 'sig', cap, dir, lema: v[0], pregunta: dir === 'la-es' ? `¿Qué significa «${v[0]}»?` : `¿Cómo se dice «${glosaCorta(v[3])}» en latín?`,
    opciones: todas.map(texto), correcta: todas.indexOf(v) };
};

/* ───── tandas ───── */
const TANDA_BASE = { term: 4, falta: 2, trans: 2, tabla: 1, forma: 1, analiza: 1, sig: 2 };
E.tanda = function (cap, estado) {
  estado = estado || {};
  const usados = new Set((estado.usados || {})[cap] || []);
  const cfg = Object.assign({}, TANDA_BASE, (E.datos.capitulos[cap - 1] || {}).tanda || {});
  const lote = [];
  for (const tipo of ['term', 'falta', 'trans']) {
    const pool = E.datos.banco.filter(b => b.cap === cap && b.tipo === tipo);
    const nuevos = baraja(pool.filter(b => !usados.has(b.id))), viejos = baraja(pool.filter(b => usados.has(b.id)));
    nuevos.concat(viejos).slice(0, cfg[tipo]).forEach(b => lote.push(montaBanco(b)));
  }
  const gen = { tabla: E.tabla, forma: E.forma, analiza: E.analiza, sig: E.significado };
  for (const tipo of Object.keys(gen)) for (let i = 0; i < cfg[tipo]; i++) { const x = gen[tipo](cap); if (x) lote.push(x); }
  /* orden: se alternan los tipos para que no salgan seguidos los parecidos */
  const orden = ['sig', 'term', 'falta', 'forma', 'tabla', 'term', 'analiza', 'trans', 'falta', 'term', 'sig', 'trans', 'term'];
  lote.sort((a, b) => orden.indexOf(a.tipo) - orden.indexOf(b.tipo) || 0.5 - Math.random());
  const mezclado = []; const por = {}; lote.forEach(x => (por[x.tipo] = por[x.tipo] || []).push(x));
  const tipos = orden.filter((t, i) => orden.indexOf(t) === i);
  while (mezclado.length < lote.length) for (const t of tipos) if (por[t] && por[t].length) mezclado.push(por[t].shift());
  return mezclado.concat(E.repaso(cap, estado));
};
/* repaso entrelazado: 3–5 ejercicios de capítulos anteriores, de las etiquetas donde más se falla */
E.repaso = function (cap, estado) {
  estado = estado || {};
  const n = cap > 15 ? 5 : cap > 5 ? 4 : cap > 1 ? 3 : 0;
  if (!n) return [];
  const stats = estado.tags || {};
  const debil = tag => { const s = stats[tag]; return s ? s.mal / (s.ok + s.mal + 1) : 0; };
  const pool = E.datos.banco.filter(b => b.cap < cap && b.tipo !== 'trans').map(b => {
    const tags = b.tipo === 'term' ? E.parseHuecos(b.t).filter(p => p.t === 'h').map(h => h.tag) : [b.r[1]];
    return { b, w: tags.reduce((s, t) => s + debil(t), 0) + Math.random() * 0.4 };
  }).sort((a, b) => b.w - a.w);
  return pool.slice(0, n).map(x => Object.assign(montaBanco(x.b), { repaso: true }));
};

/* ───── corrección ───── */
function resultado(ok, detalle, practicadas, extra) { return Object.assign({ ok, detalle, practicadas }, extra || {}); }
E.corrige = function (ej, resp, opts) {
  opts = opts || {};
  if (ej.tipo === 'term') {
    const det = ej.huecos.map((h, i) => {
      const dado = h.stem + norm(resp[i] || ''), j = juzga(dado, h.formas, opts.estricto), mayus = /^[A-ZĀĒĪŌŪ]/.test(h.stem), pon = f => (mayus && f ? f.charAt(0).toUpperCase() + f.slice(1) : f);
      return { ok: j.ok, dado, forma: pon(j.ver || h.formas[0]), nota: j.nota && pon(j.nota.replace(/^Bien, pero con macrones: (.*)\.$/, (m, x) => 'Bien, pero con macrones: ' + x + '.')), macron: j.macron, vacio: j.vacio, lema: h.lema, tag: h.tag,
        lecturas: j.ok ? [] : Morfo.analiza(dado, { sinMacrones: true }).map(r => `${r.lema}: ${r.etiqueta}`) };
    });
    return resultado(det.every(d => d.ok), det, det.map(d => ({ lema: d.lema, tag: d.tag, ok: d.ok })));
  }
  if (ej.tipo === 'falta') {
    const j = juzga(resp || '', [ej.correcta], true);
    return resultado(j.ok, [{ ok: j.ok, dado: resp, forma: ej.correcta, lema: ej.lema, tag: ej.tag }], [{ lema: ej.lema, tag: ej.tag, ok: j.ok }]);
  }
  if (ej.tipo === 'forma') {
    const j = juzga(resp || '', ej.formas, opts.estricto);
    return resultado(j.ok, [{ ok: j.ok, dado: resp, forma: ej.formas[0], nota: j.nota, macron: j.macron, lema: ej.lema, tag: ej.a }], [{ lema: ej.lema, tag: ej.a, ok: j.ok }]);
  }
  if (ej.tipo === 'tabla') {
    const det = [];
    for (const k of Object.keys(ej.celdas)) {
      if (ej.dadas[k]) continue;
      const m = ej.meta[k], j = juzga((resp || {})[k] || '', ej.celdas[k], opts.estricto);
      det.push({ ok: j.ok, dado: (resp || {})[k], forma: ej.celdas[k][0], nota: j.nota, macron: j.macron, lema: m.lema, tag: m.tag, celda: k });
    }
    return resultado(det.every(d => d.ok), det, det.map(d => ({ lema: d.lema, tag: d.tag, ok: d.ok })));
  }
  if (ej.tipo === 'analiza') {
    const sel = new Set(resp || []), det = ej.opciones.map((o, i) => ({ ok: !!o.ok === sel.has(i), marcada: sel.has(i), debe: !!o.ok, texto: o.texto, lema: o.lema, tag: o.tag }));
    return resultado(det.every(d => d.ok), det, ej.opciones.filter(o => o.ok).map((o, i) => ({ lema: o.lema, tag: o.tag, ok: det[ej.opciones.indexOf(o)].ok })));
  }
  if (ej.tipo === 'sig') {
    const ok = resp === ej.correcta;
    return resultado(ok, [{ ok, forma: ej.opciones[ej.correcta], dado: ej.opciones[resp] }], [{ lema: ej.lema, tag: 'sig', ok }]);
  }
  if (ej.tipo === 'trans') {
    const toks = s => E.palabras(s).map(w => plano(w)).sort().join(' ');
    const exacto = E.palabras(resp || '').map(norm).sort().join(' ') === E.palabras(ej.a).map(norm).sort().join(' ');
    const ok = opts.estricto ? exacto : toks(resp || '') === toks(ej.a);
    const nota = ok && !exacto ? `Bien, pero con macrones: ${ej.a}` : null;
    return resultado(ok, [{ ok, dado: resp, forma: ej.a, nota }], []);
  }
  throw new Error('tipo desconocido ' + ej.tipo);
};
/* resumen para el estado: cuenta de aciertos por etiqueta y lema */
E.anota = function (estado, res) {
  estado.tags = estado.tags || {};
  for (const p of res.practicadas) { const s = estado.tags[p.tag] = estado.tags[p.tag] || { ok: 0, mal: 0 }; p.ok ? s.ok++ : s.mal++; }
  return estado;
};

/* ───── interfaz ───── */
const MACRONES = ['ā', 'ē', 'ī', 'ō', 'ū'];
function h(tag, attrs) {
  const el = document.createElement(tag);
  for (const k in attrs || {}) { if (k === 'class') el.className = attrs[k]; else if (k === 'text') el.textContent = attrs[k]; else if (k === 'html') el.innerHTML = attrs[k]; else if (k.startsWith('on')) el.addEventListener(k.slice(2), attrs[k]); else el.setAttribute(k, attrs[k]); }
  for (let i = 2; i < arguments.length; i++) { const c = arguments[i]; if (c) el.append(c.nodeType ? c : document.createTextNode(c)); }
  return el;
}
const TITULO = { term: 'Completa la terminación', tabla: 'Declina o conjuga', forma: 'Transforma la forma', trans: 'Transforma la frase', analiza: 'Analiza la forma', falta: 'Palabra que falta', sig: 'Significado' };
E.TITULO = TITULO;

/* dibuja un ejercicio en `el`; llama a alResolver(resultado) al corregir. Devuelve {corrige()} por si hace falta forzarlo. */
E.ui = function (el, ej, alResolver, opts) {
  opts = opts || {};
  el.textContent = '';
  const campos = []; let ultimo = null, resuelto = false, resp = null;
  const cuerpo = h('div', { class: 'ej-cuerpo' }), fb = h('div', { class: 'feedback-slot', 'aria-live': 'polite' });
  const accion = h('div', { class: 'ej-acciones' });
  const btn = h('button', { class: 'btn primary corregir', type: 'button', text: 'Corregir', onclick: () => corrige() });
  const entrada = (ancho, extra) => {
    const i = h('input', Object.assign({ type: 'text', class: 'hueco', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', lang: 'la', size: String(Math.max(2, ancho)), 'aria-label': 'Escribe la forma' }, extra || {}));
    i.addEventListener('focus', () => { ultimo = i; });
    i.addEventListener('keydown', ev => { if (ev.key === 'Enter') { ev.preventDefault(); if (!resuelto) corrige(); else if (opts.alContinuar) opts.alContinuar(); } });
    campos.push(i); return i;
  };
  const teclado = () => h('div', { class: 'macrones', role: 'group', 'aria-label': 'Macrones' }, ...MACRONES.map(m => h('button', { type: 'button', class: 'macron', text: m, 'aria-label': 'Insertar ' + m,
    onmousedown: ev => ev.preventDefault(), onclick: () => { const i = ultimo || campos[0]; if (!i || i.disabled) return; const a = i.selectionStart ?? i.value.length, b = i.selectionEnd ?? a; i.setRangeText(m, a, b, 'end'); i.focus(); i.dispatchEvent(new Event('input')); } })));
  const tit = h('div', { class: 'ex-type' }, h('span', { text: TITULO[ej.tipo] + (ej.repaso ? ' · repaso' : '') }), h('span', { text: opts.contador || '' }));
  el.append(tit, cuerpo, fb, accion);
  let leer = () => null, marca = () => {};

  if (ej.tipo === 'term') {
    cuerpo.append(h('p', { class: 'prompt', text: 'Completa cada palabra con la terminación que falta.' }));
    const frase = h('p', { class: 'frase-la' });
    ej.partes.forEach(p => { if (p.t === 'txt') frase.append(p.s); else { frase.append(p.stem); frase.append(entrada(p.fin.length + 1, { 'data-i': campos.length })); } });
    cuerpo.append(frase, teclado());
    leer = () => campos.map(c => c.value);
    marca = r => r.detalle.forEach((d, i) => { campos[i].classList.add(d.ok ? 'ok' : 'bad'); campos[i].disabled = true; });
  } else if (ej.tipo === 'forma') {
    cuerpo.append(h('p', { class: 'prompt', text: ej.orden }), h('p', { class: 'frase-la' }, h('b', { text: ej.dada }), ' → '));
    cuerpo.lastChild.append(entrada(Math.max(8, ej.formas[0].length)));
    cuerpo.append(teclado());
    leer = () => campos[0].value; marca = r => { campos[0].classList.add(r.ok ? 'ok' : 'bad'); campos[0].disabled = true; };
  } else if (ej.tipo === 'trans') {
    cuerpo.append(h('p', { class: 'prompt', text: ej.orden }), h('p', { class: 'frase-la' }, h('b', { text: ej.de })));
    const i = entrada(34); i.classList.add('ancho'); cuerpo.append(i, teclado(), h('p', { class: 'muted small', text: 'El orden de las palabras es libre: la terminación dice la función.' }));
    leer = () => campos[0].value; marca = r => { campos[0].classList.add(r.ok ? 'ok' : 'bad'); campos[0].disabled = true; };
  } else if (ej.tipo === 'tabla') {
    cuerpo.append(h('p', { class: 'prompt', text: ej.titulo }));
    const tabla = h('table', { class: 'tabla-par' }), tb = h('tbody');
    tabla.append(h('thead', {}, h('tr', {}, h('th', { text: ej.rotuloFilas || '' }), ...ej.cols.map(c => h('th', { text: c })))), tb);
    ej.filas.forEach((fila, i) => tb.append(h('tr', {}, h('th', { text: fila }), ...ej.claves[i].map(k => !k ? h('td', { class: 'vacia', text: '·' }) : ej.dadas[k] ? h('td', { class: 'dada', text: ej.dadas[k] }) : h('td', {}, entrada(8, { 'data-k': k }))))));
    cuerpo.append(h('div', { class: 'tabla-caja' }, tabla), teclado());
    leer = () => { const o = {}; campos.forEach(c => { o[c.getAttribute('data-k')] = c.value; }); return o; };
    marca = r => r.detalle.forEach(d => { const c = campos.find(x => x.getAttribute('data-k') === d.celda); if (c) { c.classList.add(d.ok ? 'ok' : 'bad'); c.disabled = true; } });
  } else if (ej.tipo === 'analiza') {
    cuerpo.append(h('p', { class: 'prompt' }, 'Marca todas las lecturas posibles de ', h('i', { text: ej.forma }), '.'));
    const lista = h('div', { class: 'opciones-analiza' });
    ej.opciones.forEach((o, i) => lista.append(h('label', { class: 'opcion-check' }, h('input', { type: 'checkbox', 'data-i': i }), h('span', { text: o.texto }))));
    cuerpo.append(lista, h('p', { class: 'muted small', text: 'Una forma puede tener varias lecturas: marca todas las que valgan.' }));
    leer = () => [...lista.querySelectorAll('input:checked')].map(x => Number(x.getAttribute('data-i')));
    marca = r => { lista.querySelectorAll('input').forEach(x => { x.disabled = true; }); r.detalle.forEach((d, i) => { const l = lista.children[i]; if (d.debe) l.classList.add('ok'); else if (d.marcada) l.classList.add('bad'); }); };
  } else if (ej.tipo === 'falta' || ej.tipo === 'sig') {
    const dosPartes = ej.tipo === 'falta' ? ej.t.split('___') : null;
    cuerpo.append(h('p', { class: 'prompt', text: ej.tipo === 'falta' ? '' : ej.pregunta }));
    if (dosPartes) { cuerpo.lastChild.append(dosPartes[0], h('span', { class: 'blanco', text: '＿＿＿' }), dosPartes[1] || ''); }
    const lista = h('div', { class: 'choices' });
    (ej.opciones).forEach((o, i) => lista.append(h('button', { type: 'button', class: 'choice', 'data-k': 'ABCD'[i], 'data-i': i, text: o, onclick: ev => { lista.querySelectorAll('.choice').forEach(c => c.classList.remove('sel')); ev.currentTarget.classList.add('sel'); resp = ej.tipo === 'falta' ? o : i; btn.disabled = false; } })));
    cuerpo.append(lista); btn.disabled = true;
    leer = () => resp;
    marca = r => { lista.querySelectorAll('.choice').forEach((c, i) => { c.disabled = true; const buena = ej.tipo === 'falta' ? ej.opciones[i] === ej.correcta : i === ej.correcta; if (buena) c.classList.add('ok'); else if (c.classList.contains('sel')) c.classList.add('bad'); }); };
  }
  accion.append(btn);

  function corrige() {
    if (resuelto) return;
    const r = E.corrige(ej, leer(), opts); resuelto = true; marca(r);
    fb.append(E.feedback(ej, r)); btn.remove();
    if (opts.alContinuar) accion.append(h('button', { class: 'btn primary', type: 'button', text: opts.continuar || 'Continuar →', onclick: opts.alContinuar }));
    if (alResolver) alResolver(r);
  }
  if (campos[0]) setTimeout(() => campos[0].focus && campos[0].focus({ preventScroll: true }), 0);
  return { corrige };
};

/* texto del cuadro de corrección: forma completa y análisis de cada respuesta */
E.feedback = function (ej, r) {
  const caja = h('div', { class: 'feedback ' + (r.ok ? 'ok' : 'bad') });
  caja.append(h('h3', { text: r.ok ? 'Bene!' : 'Non ita.' }));
  const ul = h('ul', { class: 'res-lista' });
  for (const d of r.detalle) {
    if (ej.tipo === 'analiza') { ul.append(h('li', { class: d.ok ? 'ok' : 'bad' }, (d.debe ? '✓ ' : '✗ ') + d.texto + (d.debe ? ' — es una lectura válida' : ' — no vale para esta forma'))); continue; }
    if (ej.tipo === 'trans') { ul.append(h('li', {}, r.ok ? '' : 'Una respuesta posible: ', h('b', { text: d.forma }), d.nota ? ' — ' + d.nota : '')); continue; }
    if (ej.tipo === 'sig') { ul.append(h('li', {}, 'Respuesta: ', h('b', { text: d.forma }))); continue; }
    const li = h('li', { class: d.ok ? 'ok' : 'bad' });
    li.append(d.ok ? '✓ ' : '✗ ', h('b', { text: d.forma }));
    if (ej.tipo === 'falta') li.append(' — ' + (E.glosa(d.lema) || E.describe(d.tag)));
    else if (d.tag) li.append(' — ' + E.describe(d.tag));
    if (d.nota) li.append(h('div', { class: 'nota', text: d.nota }));
    if (!d.ok && d.dado) li.append(h('div', { class: 'nota', text: `Escribiste «${d.dado}»` + (d.macron ? ': falta o sobra algún macrón' : '') + '.' }));
    ul.append(li);
  }
  caja.append(ul);
  return caja;
};

if (typeof module !== 'undefined' && module.exports) module.exports = E; else raiz.Ejer = E;
})(typeof window !== 'undefined' ? window : globalThis);

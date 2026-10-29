/* Motor morfológico del latín para Lingua Latina: una sola fuente de verdad para tablas, ejercicios y corrección.
   Sin dependencias ni módulos: en el navegador define window.Morfo; en Node, module.exports.

   Etiquetas
     nombres/pronombres  caso.número                 nom.sg  gen.pl  loc.sg
     adjetivos           [grado.]caso.número.género  acc.pl.f  comp.nom.sg.n  sup.abl.sg.m
     verbos finitos      persona+número.tiempo.modo.voz   3sg.pres.ind.act  1pl.impf.subj.pass  2sg.fut.imp.act
       tiempo: pres impf fut perf plpf futperf · modo: ind subj imp · voz: act pass dep (deponente o semideponente)
     formas nominales    inf.pres.act  inf.perf.pass  inf.fut.act  part.pres.act.nom.sg.m  part.perf.pass…  part.fut.act…
                         gdv.nom.sg.m (gerundivo)  ger.gen (gerundio)  sup.acc (supino)  adv  adv.comp  adv.sup
   Cada tabla devuelve {etiqueta: [forma, …]}; la primera forma es la preferida y las demás, variantes admitidas.

   API:  Morfo.entrada(lema, formas, clase) → entrada      Morfo.formas(entrada) → {etiqueta: [formas]}
         Morfo.registra(entrada, cap)  Morfo.cargaVocab(VOCAB)      Morfo.analiza(forma, {hasta, sinMacrones})
         Morfo.permitido(etiqueta, capitulo, entrada)       Morfo.capDe(etiqueta, entrada)       Morfo.nombreEtiqueta(etiqueta) */
(function (raiz) {
'use strict';
const M = {};
const VOC = 'aeiouāēīōū';
const sinMac = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');
const plano = s => sinMac(s).toLowerCase();
const esVocal = c => !!c && VOC.includes(c.toLowerCase());
M.plano = plano;
const uniq = a => [...new Set(a.filter(x => x !== undefined && x !== null && x !== ''))];
const sufijos = (base, fin) => Array.isArray(fin) ? fin.map(f => base + f) : [base + fin];

/* ───────── utilidades de lema y tema ───────── */
const FIN_NOM = ['ons', 'ens', 'ans', 'os', 'as', 'us', 'es', 'ox', 'ax', 'ix', 'ex', 'ur', 'or', 'is', 'um', 'en', 'er', 'ut', 'al', 'ar', 'o', 'e', 's', 'x'];
/* «pāstor -ōris» → pāstōris; «pater -tris» → patris; las formas completas («montis») se devuelven tal cual */
function genCompleto(nom, tok) {
  if (!tok || !tok.startsWith('-')) return tok;
  const X = tok.slice(1), pn = plano(nom);
  if (!esVocal(plano(X)[0])) { const i = pn.lastIndexOf(plano(X)[0]); return (i > 0 ? nom.slice(0, i) : nom) + X; }
  for (const f of FIN_NOM) if (pn.endsWith(f)) return nom.slice(0, nom.length - f.length) + X;
  return nom + X;
}
function silabas(s) { return (plano(s).replace(/ae|au|oe/g, 'a').replace(/qu/g, 'q').replace(/ngu(?=[aeiou])/g, 'ng').match(/[aeiou]/g) || []).length; }
const CONSONANTICOS = new Set(['canis', 'iuvenis', 'senex', 'pater', 'mater', 'frater', 'accipiter', 'volucris', 'iter']);
const SIEMPRE_I = new Set(['nix', 'imber', 'vis', 'urbs', 'arx']);

/* ───────── nombres ───────── */
const ESPECIALES = {
  domus: { sg: ['domus', 'domūs', ['domuī', 'domō'], 'domum', ['domō', 'domū'], 'domus'], pl: ['domūs', ['domuum', 'domōrum'], 'domibus', ['domōs', 'domūs'], 'domibus', 'domūs'], loc: 'domī' },
  deus: { sg: ['deus', 'deī', 'deō', 'deum', 'deō', 'deus'], pl: [['deī', 'diī', 'dī'], ['deōrum', 'deum'], ['deīs', 'diīs', 'dīs'], 'deōs', ['deīs', 'diīs', 'dīs'], ['deī', 'diī', 'dī']] },
  vis: { sg: ['vīs', 'vīs', 'vī', 'vim', 'vī', 'vīs'], pl: ['vīrēs', 'vīrium', 'vīribus', ['vīrēs', 'vīrīs'], 'vīribus', 'vīrēs'] },
  bos: { sg: ['bōs', 'bovis', 'bovī', 'bovem', 'bove', 'bōs'], pl: ['bovēs', 'boum', 'bōbus', 'bovēs', 'bōbus', 'bovēs'] }
};
const NOMBRE_CASOS = ['nom', 'gen', 'dat', 'acc', 'abl', 'voc'];

/* entrada de nombre desde (lema, «-ae f») */
function parseNombre(la, formas) {
  const f = (formas || '').trim(), pl = /\bpl\b/.test(f);
  const m = f.match(/\b(m\/f|m|f|n)\b(?:\s+pl)?\s*$/), g = m ? m[1][0] : 'm';
  const tok = f.replace(/\b(m\/f|m|f|n)\b(?:\s+pl)?\s*$/, '').replace(/\bpl\b/, '').trim();
  const e = { la, g, solopl: pl };
  if (ESPECIALES[plano(la)] && !pl) { e.esp = ESPECIALES[plano(la)]; e.decl = 0; return e; }
  if (/^-?ae$/.test(tok) || tok === '-ārum') { e.decl = 1; e.stem = pl ? la.replace(/ae$/, '') : la.replace(/a$/, ''); return e; }
  if (tok === '-ī' || tok === '-iī' || /^-?[a-zāēīōū]*rī$/.test(tok) && !/^-?[a-zāēīōū]*(?:ē|e)ī$/.test(tok) || tok === '-ōrum') {
    e.decl = 2;
    if (pl) { e.stem = la.replace(/(ī|a)$/, ''); e.nom = la; return e; }
    let nom = la, gen = genCompleto(la, tok === '-iī' ? '-ī' : tok);
    if (tok === '-ī') gen = /(us|um)$/.test(la) ? la.replace(/(us|um)$/, 'ī') : la + 'ī';
    e.stem = gen.replace(/ī$/, ''); e.nom = nom; e.g = /um$/.test(la) ? 'n' : e.g; return e;
  }
  if (/^-?ūs$/.test(tok) || tok === '-uum') { e.decl = 4; e.stem = pl ? la.replace(/ūs$/, '') : la.replace(/(us|ū)$/, ''); e.g = /ū$/.test(la) ? 'n' : e.g; return e; }
  if (/(ē|e)ī$/.test(tok)) { e.decl = 5; e.stem = la.replace(/ēs$/, ''); return e; }
  /* 3.ª declinación: tema desde el genitivo */
  e.decl = 3;
  if (pl) {
    const fin = tok === '-ium' ? 'ium' : 'um'; e.i = fin === 'ium';
    e.stem = la.replace(/(ēs|ia|a|ae)$/, ''); e.nom = la; return e;
  }
  const gen = genCompleto(la, tok); e.stem = gen.replace(/is$/, ''); e.nom = la;
  if (e.g === 'n') e.i = /(e|al|ar)$/.test(plano(la));
  else {
    const pn = plano(la);
    e.i = SIEMPRE_I.has(pn) || (!CONSONANTICOS.has(pn) && ((/(is|es)$/.test(pn) && silabas(la) === silabas(e.stem + 'is')) || (silabas(la) === 1 && /[^aeiou]{2}$/.test(plano(e.stem)))));
  }
  return e;
}

function declinaNombre(e) {
  const o = {}, put = (c, n, fs) => { o[c + '.' + n] = uniq([].concat(fs)); };
  const s = e.stem, nom = e.nom || e.la;
  if (e.esp) {
    NOMBRE_CASOS.forEach((c, i) => { put(c, 'sg', e.esp.sg[i]); put(c, 'pl', e.esp.pl[i]); });
    if (e.esp.loc) put('loc', 'sg', e.esp.loc); return o;
  }
  const T = {
    1: { sg: [s + 'a', s + 'ae', s + 'ae', s + 'am', s + 'ā', s + 'a'], pl: [s + 'ae', s + 'ārum', s + 'īs', s + 'ās', s + 'īs', s + 'ae'], loc: [s + 'ae', s + 'īs'] },
    4: e.g === 'n'
      ? { sg: [nom, s + 'ūs', s + 'ū', nom, s + 'ū', nom], pl: [s + 'ua', s + 'uum', s + 'ibus', s + 'ua', s + 'ibus', s + 'ua'] }
      : { sg: [nom, s + 'ūs', s + 'uī', s + 'um', s + 'ū', nom], pl: [s + 'ūs', s + 'uum', s + 'ibus', s + 'ūs', s + 'ibus', s + 'ūs'] },
    5: (() => { const ei = esVocal(plano(s).slice(-1)) ? 'ēī' : 'eī'; return { sg: [s + 'ēs', s + ei, s + ei, s + 'em', s + 'ē', s + 'ēs'], pl: [s + 'ēs', s + 'ērum', s + 'ēbus', s + 'ēs', s + 'ēbus', s + 'ēs'] }; })()
  };
  let t;
  if (e.decl === 2) {
    if (e.g === 'n') t = { sg: [nom, /i$/.test(s) ? [s.slice(0, -1) + 'ī', s + 'ī'] : s + 'ī', s + 'ō', nom, s + 'ō', nom], pl: [s + 'a', s + 'ōrum', s + 'īs', s + 'a', s + 'īs', s + 'a'], loc: [s + 'ī', s + 'īs'] };
    else {
      const voc = /us$/.test(nom) ? (/ius$/.test(nom) ? s.slice(0, -1) + 'ī' : s + 'e') : nom;
      t = { sg: [nom, /i$/.test(s) && /ius$/.test(nom) ? [s.slice(0, -1) + 'ī', s + 'ī'] : s + 'ī', s + 'ō', s + 'um', s + 'ō', voc], pl: [s + 'ī', s + 'ōrum', s + 'īs', s + 'ōs', s + 'īs', s + 'ī'], loc: [s + 'ī', s + 'īs'] };
    }
  } else if (e.decl === 3) {
    if (e.g === 'n') t = e.i
      ? { sg: [nom, s + 'is', s + 'ī', nom, s + 'ī', nom], pl: [s + 'ia', s + 'ium', s + 'ibus', s + 'ia', s + 'ibus', s + 'ia'] }
      : { sg: [nom, s + 'is', s + 'ī', nom, s + 'e', nom], pl: [s + 'a', s + 'um', s + 'ibus', s + 'a', s + 'ibus', s + 'a'] };
    else t = e.i
      ? { sg: [nom, s + 'is', s + 'ī', s + 'em', s + 'e', nom], pl: [s + 'ēs', s + 'ium', s + 'ibus', [s + 'ēs', s + 'īs'], s + 'ibus', s + 'ēs'] }
      : { sg: [nom, s + 'is', s + 'ī', s + 'em', s + 'e', nom], pl: [s + 'ēs', s + 'um', s + 'ibus', s + 'ēs', s + 'ibus', s + 'ēs'] };
    t.loc = [s + 'ī', s + 'e'];
  } else t = T[e.decl];
  if (!e.solopl) NOMBRE_CASOS.forEach((c, i) => put(c, 'sg', t.sg[i]));
  NOMBRE_CASOS.forEach((c, i) => put(c, 'pl', t.pl[i]));
  if (t.loc && !e.solopl) { put('loc', 'sg', t.loc[0]); put('loc', 'pl', t.loc[1]); }
  if (e.solopl) NOMBRE_CASOS.forEach((c, i) => { if (e.decl === 1 && c === 'voc') o[c + '.pl'] = [s + 'ae']; });
  return o;
}

/* ───────── adjetivos ───────── */
const PRONOMINALES = new Set(['ūnus', 'nūllus', 'ūllus', 'sōlus', 'tōtus', 'alius', 'alter', 'uter', 'neuter']);
const IRREG_GRADOS = { bonus: ['mel', 'opt'], malus: ['pē', 'pess'], magnus: ['māi', 'māxim'], parvus: ['min', 'minim'], multus: ['plūr', 'plūrim'] };

function parseAdj(la, formas) {
  const f = (formas || '').trim(), toks = f.split(/,\s*/).filter(Boolean), a = { la };
  if (!f || /indecl/.test(f)) { a.tipo = 'indecl'; return a; }
  a.pron = PRONOMINALES.has(la);
  if (toks[0] === '-a' && toks[1] === '-um') { a.tipo = '12'; a.stem = la.replace(/us$/, ''); return a; }
  if (toks[0] === '-a' && toks[1] === '-ud') { a.tipo = '12'; a.stem = 'ali'; a.pron = true; a.neutro = 'aliud'; return a; }
  if (toks[0] === '-ae' && toks[1] === '-a') { a.tipo = '12'; a.stem = la.replace(/(ī)$/, ''); a.solopl = true; return a; }
  if (toks[0] === 'aliqua') { a.tipo = '12'; a.stem = 'aliqu'; a.neutro = 'aliquod'; return a; }
  const m = toks[0].match(/^-?(era|[a-z]*ra)$/);
  if (m && toks[1] && /rum$/.test(toks[1])) {
    a.tipo = '12';
    if (m[1] === 'era') a.stem = la; else a.stem = genCompleto(la, '-' + m[1]).replace(/a$/, '');
    if (!/^-/.test(toks[0])) a.stem = toks[0].replace(/a$/, '');
    a.nomM = la; return a;
  }
  if (toks[0] === '-e') { a.tipo = 'is'; a.stem = la.replace(/is$/, ''); return a; }
  if (toks[0] === '-eris' && toks[1] === '-ere') { a.tipo = '3t'; a.stem = la; a.fem = la.replace(/er$/, 'eris'); a.neu = la + 'e'.replace('ee', 'e'); a.neu = la.replace(/er$/, 'ere'); a.fem = la.replace(/er$/, 'eris'); return a; }
  if (toks[0] === 'ācris') { a.tipo = '3t'; a.stem = 'ācr'; a.fem = 'ācris'; a.neu = 'ācre'; return a; }
  if (toks[0] === '-ius') { a.tipo = 'comp'; a.stem = la.replace(/ior$/, 'iōr'); a.nomN = la.replace(/ior$/, 'ius'); return a; }
  if (toks[0] === 'plūra') { a.tipo = 'plus'; return a; }
  /* una terminación: tema desde el genitivo (ingēns -entis, audāx -ācis, pār paris) */
  const gen = genCompleto(la, toks[0]);
  a.tipo = '1t'; a.stem = gen.replace(/is$/, '');
  a.cons = /^(dīves|pauper|vetus)$/.test(la) || /^(particeps|princeps)$/.test(la) || /^-?(eris|itis)$/.test(toks[0]) && !/^-?itis$/.test(toks[0]) ? true : /^(dīves|pauper|vetus)$/.test(la);
  if (la === 'pār' || la === 'impār') a.cons = false;
  return a;
}

function declinaAdj(a) {
  const o = {};
  const put = (c, n, g, fs) => { o[c + '.' + n + '.' + g] = uniq([].concat(fs)); };
  const volcar = (g, t) => NOMBRE_CASOS.forEach((c, i) => { if (t.sg) put(c, 'sg', g, t.sg[i]); put(c, 'pl', g, t.pl[i]); });
  if (a.tipo === 'indecl') return o;
  if (a.tipo === '12') {
    const s = a.stem, nomM = a.nomM || (s + 'us');
    const m = declinaNombre({ decl: 2, stem: s, nom: nomM, g: 'm', la: nomM }), f = declinaNombre({ decl: 1, stem: s, la: s + 'a' }),
      n = declinaNombre({ decl: 2, stem: s, nom: a.neutro || (s + 'um'), g: 'n', la: s + 'um' });
    if (a.neutro) { n['nom.sg'] = n['acc.sg'] = n['voc.sg'] = [a.neutro]; }
    if (a.pron) for (const x of [m, f, n]) { x['gen.sg'] = [s + 'īus']; x['dat.sg'] = [s + 'ī']; }
    if (/er$/.test(nomM) && s !== nomM) { m['voc.sg'] = [nomM]; }
    for (const [g, x] of [['m', m], ['f', f], ['n', n]]) for (const k in x) {
      if (k.startsWith('loc')) continue;
      const [c, nu] = k.split('.'); if (a.solopl && nu === 'sg') continue; o[c + '.' + nu + '.' + g] = x[k];
    }
    if (a.solopl) for (const k of Object.keys(o)) if (k.includes('.sg.')) delete o[k];
    return o;
  }
  if (a.tipo === 'comp') {
    const s = a.stem;
    const mf = { sg: [a.la, s + 'is', s + 'ī', s + 'em', [s + 'e', s + 'ī'], a.la], pl: [s + 'ēs', s + 'um', s + 'ibus', [s + 'ēs', s + 'īs'], s + 'ibus', s + 'ēs'] };
    const n = { sg: [a.nomN, s + 'is', s + 'ī', a.nomN, [s + 'e', s + 'ī'], a.nomN], pl: [s + 'a', s + 'um', s + 'ibus', s + 'a', s + 'ibus', s + 'a'] };
    volcar('m', mf); volcar('f', mf); volcar('n', n); return o;
  }
  if (a.tipo === 'plus') {
    const n = { sg: ['plūs', 'plūris', 'plūrī', 'plūs', 'plūre', 'plūs'], pl: ['plūra', 'plūrium', 'plūribus', 'plūra', 'plūribus', 'plūra'] };
    const mf = { pl: ['plūrēs', 'plūrium', 'plūribus', ['plūrēs', 'plūrīs'], 'plūribus', 'plūrēs'] };
    volcar('m', mf); volcar('f', mf); volcar('n', n); return o;
  }
  const s = a.stem, ablI = a.ablE ? [s + 'e', s + 'ī'] : (a.cons ? s + 'e' : s + 'ī');
  const gp = a.cons ? 'um' : 'ium', np = a.cons ? 'a' : 'ia';
  const nomM = a.tipo === 'is' ? a.la : a.tipo === '3t' ? a.la : a.la, nomF = a.tipo === '3t' ? a.fem : (a.tipo === 'is' ? a.la : a.la), nomN = a.tipo === 'is' ? s + 'e' : a.tipo === '3t' ? a.neu : a.la;
  const mf = (nom) => ({ sg: [nom, s + 'is', s + 'ī', s + 'em', ablI, nom], pl: [s + 'ēs', s + gp, s + 'ibus', a.cons ? s + 'ēs' : [s + 'ēs', s + 'īs'], s + 'ibus', s + 'ēs'] });
  const n = { sg: [nomN, s + 'is', s + 'ī', nomN, ablI, nomN], pl: [s + np, s + gp, s + 'ibus', s + np, s + 'ibus', s + np] };
  volcar('m', mf(nomM)); volcar('f', mf(nomF)); volcar('n', n); return o;
}

/* grados: comparativo y superlativo de un adjetivo */
function gradosAdj(a) {
  const la = a.la, out = {};
  const irr = IRREG_GRADOS[la];
  let P;
  if (irr) {
    if (la === 'multus') { out.comp = { tipo: 'plus', la: 'plūs' }; out.sup = { tipo: '12', stem: 'plūrim', la: 'plūrimus' }; return out; }
    out.comp = { tipo: 'comp', la: irr[0] + 'ior', stem: irr[0] + 'iōr', nomN: irr[0] + 'ius' };
    if (la === 'malus') out.comp = { tipo: 'comp', la: 'pēior', stem: 'pēiōr', nomN: 'pēius' };
    if (la === 'magnus') out.comp = { tipo: 'comp', la: 'māior', stem: 'māiōr', nomN: 'māius' };
    out.sup = { tipo: '12', stem: irr[1] + 'im', la: irr[1] + 'imus' };
    if (la === 'bonus') out.sup = { tipo: '12', stem: 'optim', la: 'optimus' };
    if (la === 'malus') out.sup = { tipo: '12', stem: 'pessim', la: 'pessimus' };
    if (la === 'magnus') out.sup = { tipo: '12', stem: 'māximum'.replace(/um$/, ''), la: 'māximus' };
    if (la === 'parvus') { out.comp = { tipo: 'comp', la: 'minor', stem: 'minōr', nomN: 'minus' }; out.sup = { tipo: '12', stem: 'minim', la: 'minimus' }; }
    return out;
  }
  if (a.tipo === '12') P = a.stem; else if (a.tipo === 'is' || a.tipo === '1t' || a.tipo === '3t') P = a.stem; else return out;
  if (a.tipo === '3t' && a.la === 'ācer') P = 'ācr';
  out.comp = { tipo: 'comp', la: P + 'ior', stem: P + 'iōr', nomN: P + 'ius' };
  let sup;
  if (/er$/.test(a.la) && (a.tipo === '12' || a.tipo === '3t')) sup = a.la + 'rim';
  else if (/^(facil|difficil|simil|dissimil|gracil|humil)is$/.test(a.la)) sup = P + 'lim';
  else sup = P + 'issim';
  out.sup = { tipo: '12', stem: sup, la: sup + 'us' };
  return out;
}

/* ───────── verbos ───────── */
const T_PERS = ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'];
function conj(p, finales) { return p.map((x, i) => finales[i] === undefined ? null : x + finales[i]); }
/* vocal temática y terminaciones del sistema de presente por conjugación */
const DESIN = {
  act: { pres: { 1: ['ō', 'ās', 'at', 'āmus', 'ātis', 'ant'], 2: ['eō', 'ēs', 'et', 'ēmus', 'ētis', 'ent'], 3: ['ō', 'is', 'it', 'imus', 'itis', 'unt'], '3i': ['iō', 'is', 'it', 'imus', 'itis', 'iunt'], 4: ['iō', 'īs', 'it', 'īmus', 'ītis', 'iunt'] },
         subj: { 1: ['em', 'ēs', 'et', 'ēmus', 'ētis', 'ent'], 2: ['eam', 'eās', 'eat', 'eāmus', 'eātis', 'eant'], 3: ['am', 'ās', 'at', 'āmus', 'ātis', 'ant'], '3i': ['iam', 'iās', 'iat', 'iāmus', 'iātis', 'iant'], 4: ['iam', 'iās', 'iat', 'iāmus', 'iātis', 'iant'] },
         impf: { 1: 'ābam', 2: 'ēbam', 3: 'ēbam', '3i': 'iēbam', 4: 'iēbam' },
         fut: { 1: ['ābō', 'ābis', 'ābit', 'ābimus', 'ābitis', 'ābunt'], 2: ['ēbō', 'ēbis', 'ēbit', 'ēbimus', 'ēbitis', 'ēbunt'], 3: ['am', 'ēs', 'et', 'ēmus', 'ētis', 'ent'], '3i': ['iam', 'iēs', 'iet', 'iēmus', 'iētis', 'ient'], 4: ['iam', 'iēs', 'iet', 'iēmus', 'iētis', 'ient'] } },
  pass: { pres: { 1: ['or', 'āris', 'ātur', 'āmur', 'āminī', 'antur'], 2: ['eor', 'ēris', 'ētur', 'ēmur', 'ēminī', 'entur'], 3: ['or', 'eris', 'itur', 'imur', 'iminī', 'untur'], '3i': ['ior', 'eris', 'itur', 'imur', 'iminī', 'iuntur'], 4: ['ior', 'īris', 'ītur', 'īmur', 'īminī', 'iuntur'] },
          subj: { 1: ['er', 'ēris', 'ētur', 'ēmur', 'ēminī', 'entur'], 2: ['ear', 'eāris', 'eātur', 'eāmur', 'eāminī', 'eantur'], 3: ['ar', 'āris', 'ātur', 'āmur', 'āminī', 'antur'], '3i': ['iar', 'iāris', 'iātur', 'iāmur', 'iāminī', 'iantur'], 4: ['iar', 'iāris', 'iātur', 'iāmur', 'iāminī', 'iantur'] },
          fut: { 1: ['ābor', 'āberis', 'ābitur', 'ābimur', 'ābiminī', 'ābuntur'], 2: ['ēbor', 'ēberis', 'ēbitur', 'ēbimur', 'ēbiminī', 'ēbuntur'], 3: ['ar', 'ēris', 'ētur', 'ēmur', 'ēminī', 'entur'], '3i': ['iar', 'iēris', 'iētur', 'iēmur', 'iēminī', 'ientur'], 4: ['iar', 'iēris', 'iētur', 'iēmur', 'iēminī', 'ientur'] } }
};
const DES_IMPF_A = ['m', 's', 't', 'mus', 'tis', 'nt'].map(x => x), DES_IMPF_P = ['r', 'ris', 'tur', 'mur', 'minī', 'ntur'];
const SUM_PRES = ['sum', 'es', 'est', 'sumus', 'estis', 'sunt'], SUM_IMPF = ['eram', 'erās', 'erat', 'erāmus', 'erātis', 'erant'],
  SUM_FUT = ['erō', 'eris', 'erit', 'erimus', 'eritis', 'erunt'], SUM_SUBJ = ['sim', 'sīs', 'sit', 'sīmus', 'sītis', 'sint'], SUM_SUBJI = ['essem', 'essēs', 'esset', 'essēmus', 'essētis', 'essent'];
const PERF_ACT = ['ī', 'istī', 'it', 'imus', 'istis', ['ērunt', 'ēre']], PLPF_ACT = ['eram', 'erās', 'erat', 'erāmus', 'erātis', 'erant'], FUTP_ACT = ['erō', 'eris', 'erit', 'erimus', 'eritis', 'erint'],
  SUBJP_ACT = ['erim', 'erīs', 'erit', 'erīmus', 'erītis', 'erint'], SUBJPL_ACT = ['issem', 'issēs', 'isset', 'issēmus', 'issētis', 'issent'];

function parseVerbo(la, formas) {
  const toks = (formas || '').split(/,\s*/).filter(Boolean).map(t => t.replace(/\s*\(.*?\)/g, ''));
  const v = { la, p1: toks[0] || la };
  if (!toks.length) return v;
  const t1 = (toks[1] || '').replace(/^-/, '');
  if (/(et|it)$/.test(v.p1) && /^(ē|e)re$/.test(t1) && la !== 'inquit') { v.imp = true; v.p1 = v.p1.replace(/(e|i)t$/, (m, x) => x === 'e' ? 'eō' : 'iō'); toks[0] = v.p1; if (/it$/.test(toks[2] || '')) toks[2] = toks[2].replace(/it$/, 'ī'); }
  /* defectivos y semideponentes */
  if (/ōdī|meminī|^inquit|^āiō/.test(v.p1) || (la === 'ōdisse') || la === 'meminisse') { v.defectivo = true; v.perfonly = true; v.pf = v.p1.replace(/ī$/, ''); v.g = v.p1; return v; }
  if (/sum$/.test(toks[2] || '') && !/(esse)$/.test(la) && !/ī$/.test(la)) { v.semi = true; v.partPf = toks[2].replace(/\s*sum$/, ''); }
  if (/^(sum|possum)$/.test(v.p1) || /sum$/.test(v.p1) && /esse$/.test(la)) { v.irr = 'esse'; v.pref = v.p1.replace(/sum$/, ''); if (v.p1 === 'possum') { v.irr = 'posse'; v.pref = ''; } v.perf = toks[2] && (/^-/.test(toks[2]) ? v.pref + toks[2].slice(1) : toks[2]); return v; }
  if (la === 'velle' || la === 'nōlle' || la === 'mālle') { v.irr = la; return v; }
  if (la === 'fierī') { v.irr = 'fierī'; return v; }
  if (/ferre$/.test(la)) { v.irr = 'ferre'; v.pref = v.p1.replace(/ferō$/, ''); v.perf = toks[2]; v.sup = toks[3]; if (la === 'ferre') { v.perf = 'tulī'; v.sup = 'lātum'; } return v; }
  if (la === 'īre' || (/īre$/.test(la) && /eō$/.test(v.p1))) { v.irr = 'īre'; v.pref = v.p1.replace(/eō$|^eō$/, ''); return v; }
  const dep = /(r)$/.test(v.p1) && /(ī|rī)$/.test(la);
  v.dep = dep;
  const stem0 = dep ? v.p1.replace(/or$/, '') : v.p1.replace(/ō$/, '');
  if (/ā(re|rī)$/.test(t1)) { v.c = 1; v.ps = stem0; }
  else if (/ē(re|rī)$/.test(t1)) { v.c = 2; v.ps = stem0.replace(/e$/, ''); if (!dep) v.ps = v.p1.replace(/eō$/, ''); else v.ps = v.p1.replace(/eor$/, ''); }
  else if (/īr[eī]$/.test(t1)) { v.c = 4; v.ps = dep ? v.p1.replace(/ior$/, '') : v.p1.replace(/iō$/, ''); }
  else if (/(ere|ī)$/.test(t1)) {
    if (/(iō|ior)$/.test(v.p1)) { v.c = '3i'; v.ps = dep ? v.p1.replace(/ior$/, '') : v.p1.replace(/iō$/, ''); } else { v.c = 3; v.ps = stem0; }
  } else { v.c = 1; v.ps = stem0; }
  /* perfecto y supino */
  if (dep) { v.partPf = (toks[2] || '').replace(/\s*sum$/, ''); v.partPf = /^-/.test(v.partPf) ? v.ps.replace(/[aeiī]$/, '') + v.partPf.slice(1) : v.partPf; return derivaDep(v); }
  const ps2 = v.ps;
  const resuelve = (tok, base) => !tok ? null : (/^-/.test(tok) ? base + tok.slice(1) : tok);
  const baseP = (v.c === 2 || v.c === 1 || v.c === 4) ? ps2 : ps2;
  let perf = toks[2];
  if (v.semi) perf = null;
  if (perf) {
    if (/^-(āvī|ēvī|īvī)$/.test(perf)) v.perf = ps2 + perf.slice(1);
    else if (perf === '-uī') v.perf = ps2 + 'uī';
    else if (/^-/.test(perf)) v.perf = ps2 + perf.slice(1);
    else v.perf = perf;
  }
  const sup = toks[3];
  if (sup) v.sup = /^-/.test(sup) ? ps2 + sup.slice(1) : sup;
  return v;
}
function derivaDep(v) { v.sup = v.partPf ? v.partPf.replace(/us$/, 'um') : null; return v; }

function pasiva(v) { return !v.dep && !!v.sup && !v.irr; }

/* finitos del sistema de presente (con terminaciones activas o pasivas) */
function sistemaPresente(v, o, voz) {
  const c = v.c, ps = v.ps, vz = voz === 'pass' && v.dep ? 'dep' : voz;
  const D = DESIN[voz];
  const put = (t, m, fs) => fs.forEach((f, i) => { if (f) o[`${T_PERS[i]}.${t}.${m}.${vz}`] = uniq([].concat(f)); });
  put('pres', 'ind', D.pres[c].map(e => ps + e));
  put('pres', 'subj', D.subj[c].map(e => ps + e));
  const ib = { 1: 'āb', 2: 'ēb', 3: 'ēb', '3i': 'iēb', 4: 'iēb' }[c];
  put('impf', 'ind', (voz === 'act' ? ['am', 'ās', 'at', 'āmus', 'ātis', 'ant'] : ['ar', 'āris', 'ātur', 'āmur', 'āminī', 'antur']).map(e => ps + ib + e));
  put('fut', 'ind', D.fut[c].map(e => ps + e));
  const inf = infActiva(v).replace(/e$/, '');
  put('impf', 'subj', (voz === 'act' ? ['em', 'ēs', 'et', 'ēmus', 'ētis', 'ent'] : ['er', 'ēris', 'ētur', 'ēmur', 'ēminī', 'entur']).map(e => inf + e));
  if (voz === 'pass') {
    const k = (t, m) => { const kk = `2sg.${t}.${m}.${vz}`; if (o[kk]) o[kk] = uniq([...o[kk], o[kk][0].replace(/ris$/, 're')]); };
    k('pres', 'ind'); k('impf', 'ind'); k('fut', 'ind'); k('pres', 'subj'); k('impf', 'subj');
  }
}
function infActiva(v) { const ps = v.ps; return ps + ({ 1: 'āre', 2: 'ēre', 3: 'ere', '3i': 'ere', 4: 'īre' }[v.c]); }
function infPasiva(v) { const ps = v.ps; return ps + ({ 1: 'ārī', 2: 'ērī', 3: 'ī', '3i': 'ī', 4: 'īrī' }[v.c]); }

function verboFormas(v) {
  const o = verboFormas0(v);
  if (v.imp) for (const k of Object.keys(o)) if (/^[12]/.test(k) || /^3pl/.test(k) || /imp\./.test(k) || /^(part|gdv|sup|ger)/.test(k)) delete o[k];
  if (v.c === 1 && /dare$/.test(v.la || '')) for (const k of Object.keys(o)) if (k !== '2sg.pres.ind.act' && k !== '2sg.pres.imp.act') o[k] = o[k].map(x => x.replace(/dā/g, 'da'));
  return o;
}
function verboFormas0(v) {
  const o = {};
  if (v.irr) return irregular(v, o);
  if (v.perfonly) return defectivo(v, o);
  const dep = !!v.dep, c = v.c, ps = v.ps;
  const infA = infActiva(v);
  const puesto = (clave, fs) => { o[clave] = uniq([].concat(fs)); };
  const put = (t, m, vz, fs) => fs.forEach((f, i) => { if (f) puesto(`${T_PERS[i]}.${t}.${m}.${vz}`, f); });
  /* sistema de presente */
  if (!dep) sistemaPresente(Object.assign({}, v, { la: infA }), o, 'act');
  if (dep || pasiva(v)) { const w = Object.assign({}, v, { la: null }); sistemaPresente(w, o, 'pass'); }
  /* imperativos */
  const impSg = irregImp(v) ;
  const ir = { 1: ['ā', 'āte'], 2: ['ē', 'ēte'], 3: ['e', 'ite'], '3i': ['e', 'ite'], 4: ['ī', 'īte'] }[c];
  const ftSg = { 1: 'ātō', 2: 'ētō', 3: 'itō', '3i': 'itō', 4: 'ītō' }[c], ftPl = ftSg + 'te'.replace('tōte', 'te');
  const ftSgS = ftSg, ftPlS = ftSg.replace(/ō$/, 'ōte'), ft3 = { 1: 'antō', 2: 'entō', 3: 'untō', '3i': 'iuntō', 4: 'iuntō' }[c];
  if (!dep) {
    puesto('2sg.pres.imp.act', impSg || ps + ir[0]); puesto('2pl.pres.imp.act', ps + ir[1]);
    puesto('2sg.fut.imp.act', ps + ftSg); puesto('3sg.fut.imp.act', ps + ftSg); puesto('2pl.fut.imp.act', ps + ftPlS); puesto('3pl.fut.imp.act', ps + ft3);
  }
  if (dep || pasiva(v)) {
    const vz = dep ? 'dep' : 'pass', ie = { 1: 'āre', 2: 'ēre', 3: 'ere', '3i': 'ere', 4: 'īre' }[c];
    puesto(`2sg.pres.imp.${vz}`, ps + ie);
    puesto(`2pl.pres.imp.${vz}`, ps + ({ 1: 'āminī', 2: 'ēminī', 3: 'iminī', '3i': 'iminī', 4: 'īminī' }[c]));
    puesto(`2sg.fut.imp.${vz}`, ps + ftSg.replace(/ō$/, 'or')); puesto(`3sg.fut.imp.${vz}`, ps + ftSg.replace(/ō$/, 'or'));
    puesto(`3pl.fut.imp.${vz}`, ps + ft3.replace(/ō$/, 'or'));
  }
  /* sistema de perfecto */
  if (v.perf && !dep) {
    const ps_ = v.perf.replace(/ī$/, '');
    put('perf', 'ind', 'act', PERF_ACT.map(e => ps_ + (Array.isArray(e) ? e[0] : e)));
    puesto('3pl.perf.ind.act', [ps_ + 'ērunt', ps_ + 'ēre']);
    if (c === 4 || /īvī$/.test(v.perf) || /āvī$/.test(v.perf) || /ēvī$/.test(v.perf)) {
      const base = v.perf.replace(/vī$/, '');
      puesto('2sg.perf.ind.act', [ps_ + 'istī', base + 'stī'].slice(0, /vī$/.test(v.perf) ? 2 : 1));
      puesto('2pl.perf.ind.act', [ps_ + 'istis', base + 'stis'].slice(0, /vī$/.test(v.perf) ? 2 : 1));
    }
    put('plpf', 'ind', 'act', PLPF_ACT.map(e => ps_ + e));
    put('futperf', 'ind', 'act', FUTP_ACT.map(e => ps_ + e));
    put('perf', 'subj', 'act', SUBJP_ACT.map(e => ps_ + e));
    put('plpf', 'subj', 'act', SUBJPL_ACT.map(e => ps_ + e));
    puesto('inf.perf.act', [ps_ + 'isse']);
    if (/vī$/.test(v.perf)) { const b = v.perf.replace(/vī$/, ''); o['inf.perf.act'].push(b + 'sse'); put('plpf', 'subj', 'act', SUBJPL_ACT.map((e, i) => { const x = [ps_ + e]; if (i !== 4 || true) x.push(b + e.replace(/^iss/, 'ss')); return x; })); }
  }
  /* perfecto compuesto: pasiva, deponente y semideponente */
  const partPf = dep ? v.partPf : (v.semi ? v.partPf : (v.sup ? v.sup.replace(/um$/, 'us') : null));
  if (partPf && (dep || v.semi || pasiva(v))) {
    const vz = dep || v.semi ? 'dep' : 'pass';
    const pl = partPf.replace(/us$/, 'ī'), comp = aux => aux.map((e, i) => (i < 3 ? partPf : pl) + ' ' + e);
    put('perf', 'ind', vz, comp(SUM_PRES)); put('plpf', 'ind', vz, comp(SUM_IMPF)); put('futperf', 'ind', vz, comp(SUM_FUT));
    put('perf', 'subj', vz, comp(SUM_SUBJ)); put('plpf', 'subj', vz, comp(SUM_SUBJI));
    puesto('inf.perf.' + vz, [partPf + ' esse']);
  }
  /* infinitivos */
  if (!dep) puesto('inf.pres.act', [infA]);
  if (dep || pasiva(v)) puesto('inf.pres.' + (dep ? 'dep' : 'pass'), [infPasiva(v)]);
  const supTema = v.sup ? v.sup.replace(/um$/, '') : null;
  if (supTema) {
    puesto('inf.fut.act', [supTema + 'ūrus esse']);
    if (pasiva(v)) puesto('inf.fut.pass', [v.sup + ' īrī']);
    puesto('sup.acc', [v.sup]); puesto('sup.abl', [supTema + 'ū']);
  }
  /* participios, gerundio y gerundivo */
  const stGer = ps + ({ 1: 'a', 2: 'e', 3: 'e', '3i': 'ie', 4: 'ie' }[c]);
  const ger = { 1: 'and', 2: 'end', 3: 'end', '3i': 'iend', 4: 'iend' }[c];
  const gerS = ps + ger;
  const pp = ps + ({ 1: 'ā', 2: 'ē', 3: 'ē', '3i': 'iē', 4: 'iē' }[c]) + 'ns';
  const ppStem = ps + ({ 1: 'a', 2: 'e', 3: 'e', '3i': 'ie', 4: 'ie' }[c]) + 'nt';
  const adj = (tag, a) => { const f = declinaAdj(a); for (const k in f) o[tag + '.' + k] = f[k]; };
  adj('part.pres.act', { tipo: '1t', la: pp, stem: ppStem, ablE: true });
  if (supTema && (dep || pasiva(v) || v.semi || true)) {
    if (!dep) { if (pasiva(v)) adj('part.perf.pass', { tipo: '12', stem: supTema }); }
    else adj('part.perf.dep', { tipo: '12', stem: supTema });
    adj('part.fut.act', { tipo: '12', stem: supTema + 'ūr' });
  }
  ['gen', 'dat', 'acc', 'abl'].forEach((c_, i) => puesto('ger.' + c_, [gerS + ['ī', 'ō', 'um', 'ō'][i]]));
  if (pasiva(v) || dep) adj('gdv', { tipo: '12', stem: gerS });
  return o;
}
function irregImp(v) {
  const l = v.la || '', ps = v.ps;
  if (v.c === 3 && /(dīcere|dūcere)$/.test(l)) return ps;
  if (v.c === '3i' && /facere$/.test(l)) return /^facere$/.test(l) ? 'fac' : ps.replace(/fic$/, 'fice').replace(/fac$/, 'fice');
  return null;
}
function defectivo(v, o) {
  const pf = v.pf;
  const put = (t, m, fs) => fs.forEach((f, i) => { o[`${T_PERS[i]}.${t}.${m}.act`] = [f]; });
  put('perf', 'ind', PERF_ACT.map(e => pf + (Array.isArray(e) ? e[0] : e)));
  o['3pl.perf.ind.act'] = [pf + 'ērunt', pf + 'ēre'];
  put('plpf', 'ind', PLPF_ACT.map(e => pf + e)); put('futperf', 'ind', FUTP_ACT.map(e => pf + e));
  put('perf', 'subj', SUBJP_ACT.map(e => pf + e)); put('plpf', 'subj', SUBJPL_ACT.map(e => pf + e));
  o['inf.perf.act'] = [pf + 'isse'];
  if (v.la === 'meminisse') { o['2sg.fut.imp.act'] = ['mementō']; o['2pl.fut.imp.act'] = ['mementōte']; }
  return o;
}

/* verbos irregulares */
const IRR = {
  esse: { pres: ['sum', 'es', 'est', 'sumus', 'estis', 'sunt'], impf: ['eram', 'erās', 'erat', 'erāmus', 'erātis', 'erant'], fut: ['erō', 'eris', 'erit', 'erimus', 'eritis', 'erunt'],
          spres: ['sim', 'sīs', 'sit', 'sīmus', 'sītis', 'sint'], simpf: ['essem', 'essēs', 'esset', 'essēmus', 'essētis', 'essent'], imp: ['es', 'este'], inf: 'esse' },
  posse: { pres: ['possum', 'potes', 'potest', 'possumus', 'potestis', 'possunt'], impf: ['poteram', 'poterās', 'poterat', 'poterāmus', 'poterātis', 'poterant'], fut: ['poterō', 'poteris', 'poterit', 'poterimus', 'poteritis', 'poterunt'],
          spres: ['possim', 'possīs', 'possit', 'possīmus', 'possītis', 'possint'], simpf: ['possem', 'possēs', 'posset', 'possēmus', 'possētis', 'possent'], inf: 'posse' },
  īre: { pres: ['eō', 'īs', 'it', 'īmus', 'ītis', 'eunt'], impf: ['ībam', 'ībās', 'ībat', 'ībāmus', 'ībātis', 'ībant'], fut: ['ībō', 'ībis', 'ībit', 'ībimus', 'ībitis', 'ībunt'],
         spres: ['eam', 'eās', 'eat', 'eāmus', 'eātis', 'eant'], simpf: ['īrem', 'īrēs', 'īret', 'īrēmus', 'īrētis', 'īrent'], imp: ['ī', 'īte'], inf: 'īre' },
  velle: { pres: ['volō', 'vīs', 'vult', 'volumus', 'vultis', 'volunt'], impf: ['volēbam', 'volēbās', 'volēbat', 'volēbāmus', 'volēbātis', 'volēbant'], fut: ['volam', 'volēs', 'volet', 'volēmus', 'volētis', 'volent'],
           spres: ['velim', 'velīs', 'velit', 'velīmus', 'velītis', 'velint'], simpf: ['vellem', 'vellēs', 'vellet', 'vellēmus', 'vellētis', 'vellent'], inf: 'velle', perf: 'voluī' },
  nōlle: { pres: ['nōlō', 'nōn vīs', 'nōn vult', 'nōlumus', 'nōn vultis', 'nōlunt'], impf: ['nōlēbam', 'nōlēbās', 'nōlēbat', 'nōlēbāmus', 'nōlēbātis', 'nōlēbant'], fut: ['nōlam', 'nōlēs', 'nōlet', 'nōlēmus', 'nōlētis', 'nōlent'],
           spres: ['nōlim', 'nōlīs', 'nōlit', 'nōlīmus', 'nōlītis', 'nōlint'], simpf: ['nōllem', 'nōllēs', 'nōllet', 'nōllēmus', 'nōllētis', 'nōllent'], imp: ['nōlī', 'nōlīte'], inf: 'nōlle', perf: 'nōluī' },
  mālle: { pres: ['mālō', 'māvīs', 'māvult', 'mālumus', 'māvultis', 'mālunt'], impf: ['mālēbam', 'mālēbās', 'mālēbat', 'mālēbāmus', 'mālēbātis', 'mālēbant'], fut: ['mālam', 'mālēs', 'mālet', 'mālēmus', 'mālētis', 'mālent'],
           spres: ['mālim', 'mālīs', 'mālit', 'mālīmus', 'mālītis', 'mālint'], simpf: ['mallem', 'mallēs', 'mallet', 'mallēmus', 'mallētis', 'mallent'], inf: 'mālle', perf: 'māluī' },
  ferre: { pres: ['ferō', 'fers', 'fert', 'ferimus', 'fertis', 'ferunt'], impf: ['ferēbam', 'ferēbās', 'ferēbat', 'ferēbāmus', 'ferēbātis', 'ferēbant'], fut: ['feram', 'ferēs', 'feret', 'ferēmus', 'ferētis', 'ferent'],
           spres: ['feram', 'ferās', 'ferat', 'ferāmus', 'ferātis', 'ferant'], simpf: ['ferrem', 'ferrēs', 'ferret', 'ferrēmus', 'ferrētis', 'ferrent'], imp: ['fer', 'ferte'], inf: 'ferre',
           ppres: ['feror', 'ferris', 'fertur', 'ferimur', 'feriminī', 'feruntur'], pimpf: ['ferēbar', 'ferēbāris', 'ferēbātur', 'ferēbāmur', 'ferēbāminī', 'ferēbantur'], pfut: ['ferar', 'ferēris', 'ferētur', 'ferēmur', 'ferēminī', 'ferentur'],
           pspres: ['ferar', 'ferāris', 'ferātur', 'ferāmur', 'ferāminī', 'ferantur'], pssimpf: ['ferrer', 'ferrēris', 'ferrētur', 'ferrēmur', 'ferrēminī', 'ferrentur'], pinf: 'ferrī' },
  fierī: { pres: ['fīō', 'fīs', 'fit', null, null, 'fīunt'], impf: ['fīēbam', 'fīēbās', 'fīēbat', 'fīēbāmus', 'fīēbātis', 'fīēbant'], fut: ['fīam', 'fīēs', 'fīet', 'fīēmus', 'fīētis', 'fīent'],
           spres: ['fīam', 'fīās', 'fīat', 'fīāmus', 'fīātis', 'fīant'], simpf: ['fierem', 'fierēs', 'fieret', 'fierēmus', 'fierētis', 'fierent'], imp: ['fī', 'fīte'], inf: 'fierī' }
};
function irregular(v, o) {
  const T = IRR[v.irr], pref = v.pref || '';
  const put = (t, m, vz, fs, pre) => (fs || []).forEach((f, i) => { if (f) o[`${T_PERS[i]}.${t}.${m}.${vz}`] = [(pre === undefined ? pref : pre) + f]; });
  let P = pref;
  if (v.irr === 'esse' && /^(prō)$/.test(P)) {
    const pd = ['prōsum', 'prōdes', 'prōdest', 'prōsumus', 'prōdestis', 'prōsunt'];
    put('pres', 'ind', 'act', pd, ''); put('impf', 'ind', 'act', IRR.esse.impf.map(x => 'prōd' + x), '');
    put('fut', 'ind', 'act', IRR.esse.fut.map(x => 'prōd' + x), ''); put('pres', 'subj', 'act', IRR.esse.spres.map(x => 'prō' + x), ''); put('impf', 'subj', 'act', IRR.esse.simpf.map(x => 'prōd' + x), '');
    o['inf.pres.act'] = ['prōdesse'];
  } else {
    put('pres', 'ind', 'act', T.pres); put('impf', 'ind', 'act', T.impf); put('fut', 'ind', 'act', T.fut);
    put('pres', 'subj', 'act', T.spres); put('impf', 'subj', 'act', T.simpf);
    o['inf.pres.act'] = [pref + T.inf];
    if (v.irr === 'esse') {
      if (!pref) { o['2sg.pres.imp.act'] = ['es']; o['2pl.pres.imp.act'] = ['este']; o['2sg.fut.imp.act'] = ['estō']; o['3sg.fut.imp.act'] = ['estō']; o['2pl.fut.imp.act'] = ['estōte']; o['3pl.fut.imp.act'] = ['suntō']; }
    } else if (T.imp) { o['2sg.pres.imp.act'] = [pref + T.imp[0]]; o['2pl.pres.imp.act'] = [pref + T.imp[1]]; }
  }
  /* perfecto */
  let perf = v.perf || T.perf;
  if (v.irr === 'esse' && !perf) perf = (P || '') + 'fuī';
  if (v.irr === 'esse' && !pref) perf = 'fuī';
  if (v.irr === 'posse') perf = 'potuī';
  if (v.irr === 'īre') perf = pref + 'iī';
  if (v.irr === 'ferre' && v.perf) perf = v.perf;
  if (v.irr === 'fierī') perf = null;
  if (perf) {
    const b = perf.replace(/ī$/, '');
    put('perf', 'ind', 'act', PERF_ACT.map(e => b + (Array.isArray(e) ? e[0] : e)), '');
    o['3pl.perf.ind.act'] = [b + 'ērunt', b + 'ēre'];
    put('plpf', 'ind', 'act', PLPF_ACT.map(e => b + e), ''); put('futperf', 'ind', 'act', FUTP_ACT.map(e => b + e), '');
    put('perf', 'subj', 'act', SUBJP_ACT.map(e => b + e), ''); put('plpf', 'subj', 'act', SUBJPL_ACT.map(e => b + e), '');
    o['inf.perf.act'] = [b + 'isse'];
    if (v.irr === 'īre') { o['2sg.perf.ind.act'] = [b + 'istī', pref + 'īstī']; o['2pl.perf.ind.act'] = [b + 'istis', pref + 'īstis']; o['inf.perf.act'] = [b + 'isse', pref + 'īsse']; }
  }
  if (v.irr === 'ferre') {
    put('pres', 'ind', 'pass', T.ppres, pref); put('impf', 'ind', 'pass', T.pimpf, pref); put('fut', 'ind', 'pass', T.pfut, pref);
    put('pres', 'subj', 'pass', T.pspres, pref); put('impf', 'subj', 'pass', T.pssimpf, pref); o['inf.pres.pass'] = [pref + T.pinf];
    if (v.sup) {
      const pp = v.sup.replace(/um$/, 'us');
      const pl = pp.replace(/us$/, 'ī'), comp = aux => aux.map((e, i) => (i < 3 ? pp : pl) + ' ' + e);
      put('perf', 'ind', 'pass', comp(SUM_PRES), ''); put('plpf', 'ind', 'pass', comp(SUM_IMPF), '');
      put('futperf', 'ind', 'pass', comp(SUM_FUT), ''); put('perf', 'subj', 'pass', comp(SUM_SUBJ), ''); put('plpf', 'subj', 'pass', comp(SUM_SUBJI), '');
      o['inf.perf.pass'] = [pp + ' esse']; o['inf.fut.pass'] = [v.sup + ' īrī']; o['inf.fut.act'] = [v.sup.replace(/um$/, 'ūrus') + ' esse'];
      o['sup.acc'] = [v.sup]; o['sup.abl'] = [v.sup.replace(/um$/, 'ū')];
      const f1 = declinaAdj({ tipo: '12', stem: v.sup.replace(/um$/, '') }); for (const k in f1) o['part.perf.pass.' + k] = f1[k];
      const f2 = declinaAdj({ tipo: '12', stem: v.sup.replace(/um$/, '') + 'ūr' }); for (const k in f2) o['part.fut.act.' + k] = f2[k];
    }
    const gd = declinaAdj({ tipo: '12', stem: pref + 'ferend' }); for (const k in gd) o['gdv.' + k] = gd[k];
  }
  if (v.irr === 'esse' && !pref) { o['inf.fut.act'] = ['futūrus esse', 'fore']; const f2 = declinaAdj({ tipo: '12', stem: 'futūr' }); for (const k in f2) o['part.fut.act.' + k] = f2[k]; }
  if (v.irr === 'īre') {
    const f = declinaAdj({ tipo: '1t', la: 'iēns', stem: 'eunt', ablE: true }); for (const k in f) o['part.pres.act.' + k] = f[k];
    o['inf.fut.act'] = [pref + 'itūrus esse']; o['sup.acc'] = [pref + 'itum']; o['sup.abl'] = [pref + 'itū'];
    ['gen', 'dat', 'acc', 'abl'].forEach((c, i) => { o['ger.' + c] = [pref + ['eundī', 'eundō', 'eundum', 'eundō'][i]]; });
    const f3 = declinaAdj({ tipo: '12', stem: pref + 'itūr' }); for (const k in f3) o['part.fut.act.' + k] = f3[k];
    o['3sg.pres.ind.pass'] = [pref + 'itur']; o['inf.pres.pass'] = [pref + 'īrī'];
    o['2sg.fut.imp.act'] = [pref + 'ītō']; o['3sg.fut.imp.act'] = [pref + 'ītō']; o['2pl.fut.imp.act'] = [pref + 'ītōte']; o['3pl.fut.imp.act'] = [pref + 'euntō'];
    for (const k in o) o[k] = o[k].map(x => x);
  } else if (v.irr === 'ferre') {
    const f = declinaAdj({ tipo: '1t', la: pref + 'ferēns', stem: pref + 'ferent', ablE: true }); for (const k in f) o['part.pres.act.' + k] = f[k];
    ['gen', 'dat', 'acc', 'abl'].forEach((c, i) => { o['ger.' + c] = [pref + ['ferendī', 'ferendō', 'ferendum', 'ferendō'][i]]; });
  } else if (v.irr === 'velle' || v.irr === 'nōlle' || v.irr === 'mālle') {
    if (v.irr !== 'mālle') { const st = v.irr === 'velle' ? 'volent' : 'nōlent'; const f = declinaAdj({ tipo: '1t', la: v.irr === 'velle' ? 'volēns' : 'nōlēns', stem: st, ablE: true }); for (const k in f) o['part.pres.act.' + k] = f[k]; }
  } else if (v.irr === 'posse') {
    const f = declinaAdj({ tipo: '1t', la: 'potēns', stem: 'potent', ablE: true }); for (const k in f) o['part.pres.act.' + k] = f[k];
  } else if (v.irr === 'esse' && pref) {
    const f = declinaAdj({ tipo: '1t', la: pref + 'sēns', stem: pref + 'sent', ablE: true }); for (const k in f) o['part.pres.act.' + k] = f[k];
  }
  if (v.irr === 'fierī') { o['inf.perf.pass'] = ['factus esse']; }
  if (v.irr === 'fierī') {
    const cf = aux => aux.map((e, i) => (i < 3 ? 'factus ' : 'factī ') + e);
    put('perf', 'ind', 'pass', cf(SUM_PRES), ''); put('plpf', 'ind', 'pass', cf(SUM_IMPF), ''); put('futperf', 'ind', 'pass', cf(SUM_FUT), '');
  }
  return o;
}

/* ───────── pronombres en tabla ───────── */
function tabla(sg, pl) { const o = {}; NOMBRE_CASOS.slice(0, 5).forEach((c, i) => { if (sg && sg[i]) o[c + '.sg'] = [].concat(sg[i]); if (pl && pl[i]) o[c + '.pl'] = [].concat(pl[i]); }); return o; }
function tablaG(m, f, n) {
  const o = {}; NOMBRE_CASOS.slice(0, 5).forEach((c, i) => {
    [['m', m], ['f', f], ['n', n]].forEach(([g, t]) => { if (t.sg && t.sg[i]) o[`${c}.sg.${g}`] = [].concat(t.sg[i]); if (t.pl && t.pl[i]) o[`${c}.pl.${g}`] = [].concat(t.pl[i]); });
  }); return o;
}
const PRON = {
  ego: () => tabla(['ego', 'meī', ['mihi', 'mī'], 'mē', 'mē'], ['nōs', ['nostrī', 'nostrum'], 'nōbīs', 'nōs', 'nōbīs']),
  tū: () => tabla(['tū', 'tuī', 'tibi', 'tē', 'tē'], ['vōs', ['vestrī', 'vestrum'], 'vōbīs', 'vōs', 'vōbīs']),
  sē: () => tabla([null, 'suī', 'sibi', ['sē', 'sēsē'], ['sē', 'sēsē']], [null, 'suī', 'sibi', ['sē', 'sēsē'], ['sē', 'sēsē']]),
  is: () => tablaG({ sg: ['is', 'eius', 'eī', 'eum', 'eō'], pl: [['eī', 'iī', 'ī'], 'eōrum', ['eīs', 'iīs', 'īs'], 'eōs', ['eīs', 'iīs', 'īs']] },
                   { sg: ['ea', 'eius', 'eī', 'eam', 'eā'], pl: ['eae', 'eārum', ['eīs', 'iīs', 'īs'], 'eās', ['eīs', 'iīs', 'īs']] },
                   { sg: ['id', 'eius', 'eī', 'id', 'eō'], pl: ['ea', 'eōrum', ['eīs', 'iīs', 'īs'], 'ea', ['eīs', 'iīs', 'īs']] }),
  hic: () => tablaG({ sg: ['hic', 'huius', 'huic', 'hunc', 'hōc'], pl: ['hī', 'hōrum', 'hīs', 'hōs', 'hīs'] },
                    { sg: ['haec', 'huius', 'huic', 'hanc', 'hāc'], pl: ['hae', 'hārum', 'hīs', 'hās', 'hīs'] },
                    { sg: ['hoc', 'huius', 'huic', 'hoc', 'hōc'], pl: ['haec', 'hōrum', 'hīs', 'haec', 'hīs'] }),
  quī: () => tablaG({ sg: ['quī', 'cuius', 'cui', 'quem', 'quō'], pl: ['quī', 'quōrum', ['quibus', 'quīs'], 'quōs', ['quibus', 'quīs']] },
                    { sg: ['quae', 'cuius', 'cui', 'quam', 'quā'], pl: ['quae', 'quārum', ['quibus', 'quīs'], 'quās', ['quibus', 'quīs']] },
                    { sg: ['quod', 'cuius', 'cui', 'quod', 'quō'], pl: ['quae', 'quōrum', ['quibus', 'quīs'], 'quae', ['quibus', 'quīs']] }),
  quis: () => tablaG({ sg: ['quis', 'cuius', 'cui', 'quem', 'quō'], pl: ['quī', 'quōrum', 'quibus', 'quōs', 'quibus'] },
                     { sg: ['quis', 'cuius', 'cui', 'quem', 'quā'], pl: ['quae', 'quārum', 'quibus', 'quās', 'quibus'] },
                     { sg: ['quid', 'cuius', 'cui', 'quid', 'quō'], pl: ['quae', 'quōrum', 'quibus', 'quae', 'quibus'] }),
  īdem: () => tablaG({ sg: ['īdem', 'eiusdem', 'eīdem', 'eundem', 'eōdem'], pl: [['eīdem', 'īdem'], 'eōrundem', ['eīsdem', 'īsdem'], 'eōsdem', ['eīsdem', 'īsdem']] },
                     { sg: ['eadem', 'eiusdem', 'eīdem', 'eandem', 'eādem'], pl: ['eaedem', 'eārundem', ['eīsdem', 'īsdem'], 'eāsdem', ['eīsdem', 'īsdem']] },
                     { sg: ['idem', 'eiusdem', 'eīdem', 'idem', 'eōdem'], pl: ['eadem', 'eōrundem', ['eīsdem', 'īsdem'], 'eadem', ['eīsdem', 'īsdem']] })
};
['ille', 'iste', 'ipse'].forEach(l => {
  const b = l.replace(/e$/, ''), nn = l === 'ipse' ? 'ipsum' : b + 'ud';
  PRON[l] = () => tablaG({ sg: [l, b + 'īus', b + 'ī', b + 'um', b + 'ō'], pl: [b + 'ī', b + 'ōrum', b + 'īs', b + 'ōs', b + 'īs'] },
                         { sg: [b + 'a', b + 'īus', b + 'ī', b + 'am', b + 'ā'], pl: [b + 'ae', b + 'ārum', b + 'īs', b + 'ās', b + 'īs'] },
                         { sg: [nn, b + 'īus', b + 'ī', nn, b + 'ō'], pl: [b + 'a', b + 'ōrum', b + 'īs', b + 'a', b + 'īs'] });
});
const NUM_IRREG = {
  duo: () => tablaG({ pl: ['duo', 'duōrum', 'duōbus', ['duōs', 'duo'], 'duōbus'] }, { pl: ['duae', 'duārum', 'duābus', 'duās', 'duābus'] }, { pl: ['duo', 'duōrum', 'duōbus', 'duo', 'duōbus'] }),
  trēs: () => tablaG({ pl: ['trēs', 'trium', 'tribus', 'trēs', 'tribus'] }, { pl: ['trēs', 'trium', 'tribus', 'trēs', 'tribus'] }, { pl: ['tria', 'trium', 'tribus', 'tria', 'tribus'] })
};

/* ───────── entradas ───────── */
function entrada(la, formas, clase) {
  const e = { la, formas: formas || '', clase: clase || 'n' };
  const pl = plano(la);
  if (PRON[la]) { e.tipo = 'pron'; return e; }
  if (NUM_IRREG[la]) { e.tipo = 'num'; return e; }
  if (clase === 'v') { e.tipo = 'v'; e.v = parseVerbo(la, formas); return e; }
  if (clase === 'adj' || (clase === 'num' && /^(-|duae|aliqu)/.test(formas || ''))) { e.tipo = 'adj'; e.a = parseAdj(la, formas); return e; }
  if (/indecl/.test(formas || '') && clase !== 'adj') { e.tipo = 'inv'; return e; }
  if (clase === 'n') { e.tipo = 'n'; e.n = parseNombre(la, formas); return e; }
  e.tipo = 'inv'; return e;
}
function formas(e) {
  if (e._f) return e._f;
  let f = {};
  if (e.tipo === 'pron') f = PRON[e.la]();
  else if (e.tipo === 'num') f = NUM_IRREG[e.la]();
  else if (e.tipo === 'v') f = verboFormas(e.v);
  else if (e.tipo === 'inv') f = /^-|\s|…/.test(e.la) ? {} : { '': [e.la].concat((e.formas || '').split(/,\s*/).filter(x => x && /^[a-zāēīōū]+$/i.test(x) && x !== e.la && x !== 'indecl')) };
  else if (e.tipo === 'n') f = declinaNombre(e.n);
  else if (e.tipo === 'adj') {
    f = e.a.tipo === 'indecl' ? { '': [e.la] } : declinaAdj(e.a);
    const g = gradosAdj(e.a);
    if (g.comp) { const c = declinaAdj(g.comp); for (const k in c) f['comp.' + k] = c[k]; }
    if (g.sup) { const c = declinaAdj(g.sup); for (const k in c) f['sup.' + k] = c[k]; }
    const adv = adverbioDe(e.a, g);
    for (const k in adv) f[k] = adv[k];
  }
  e._f = f; return f;
}
function adverbioDe(a, g) {
  const o = {};
  if (a.tipo === 'indecl') return o;
  if (a.la === 'bonus') { o.adv = ['bene']; o['adv.comp'] = ['melius']; o['adv.sup'] = ['optimē']; return o; }
  if (a.la === 'malus') { o.adv = ['male']; o['adv.comp'] = ['pēius']; o['adv.sup'] = ['pessimē']; return o; }
  if (a.la === 'magnus') { o.adv = ['magnopere']; o['adv.comp'] = ['magis']; o['adv.sup'] = ['māximē']; return o; }
  if (a.la === 'parvus') { o.adv = ['paulum']; o['adv.comp'] = ['minus']; o['adv.sup'] = ['minimē']; return o; }
  if (a.la === 'multus') { o.adv = ['multum']; o['adv.comp'] = ['plūs']; o['adv.sup'] = ['plūrimum']; return o; }
  if (a.tipo === '12') o.adv = [a.stem + (/er$/.test(a.la) && !a.nomM ? 'ē' : 'ē')];
  else if (a.tipo === 'is' || a.tipo === '3t') o.adv = [a.stem + 'iter'];
  else if (a.tipo === '1t') o.adv = [/nt$/.test(a.stem) ? a.stem + 'er' : a.stem + 'iter'];
  if (g.comp && g.comp.nomN) o['adv.comp'] = [g.comp.nomN];
  if (g.sup) o['adv.sup'] = [g.sup.stem + 'ē'];
  return o;
}
M.entrada = entrada; M.formas = formas;
M.declinaAdj = declinaAdj;

/* ───────── léxico, índice y análisis ───────── */
M.lexico = []; let indice = null;
M.registra = (e, cap) => { e.cap = cap || 1; M.lexico.push(e); indice = null; return e; };
M.reinicia = () => { M.lexico.length = 0; indice = null; };
M.cargaVocab = function (VOCAB) {
  M.reinicia();
  for (const cap of Object.keys(VOCAB)) for (const [la, fm, cl] of VOCAB[cap]) {
    if (cl === 'n' && !fm) continue;
    try { M.registra(entrada(la, fm, cl), Number(cap)); } catch (err) { console.warn('Morfo: no se pudo cargar', la, fm, err.message); }
  }
  for (const p of Object.keys(PRON)) if (!M.lexico.some(e => e.la === p)) M.registra(entrada(p, '', 'pron'), p === 'ego' || p === 'tū' ? 3 : p === 'is' ? 4 : p === 'hic' ? 7 : 8);
};
function construye() {
  indice = new Map();
  M.lexico.forEach((e, ei) => {
    const f = formas(e);
    for (const tag in f) for (const forma of f[tag]) {
      const k = plano(forma); let l = indice.get(k); if (!l) indice.set(k, l = []);
      l.push([ei, tag, forma]);
    }
  });
}
/* todas las lecturas posibles de una forma (con o sin macrones) */
M.analiza = function (forma, opts) {
  opts = opts || {}; if (!indice) construye();
  const f = forma.normalize('NFC').trim(), k = plano(f), res = [];
  for (const [ei, tag, fm] of indice.get(k) || []) {
    const e = M.lexico[ei];
    if (opts.hasta !== undefined && !M.permitido(tag, opts.hasta, e)) continue;
    res.push({ lema: e.la, etiqueta: tag, forma: fm, exacta: fm === f, entrada: e });
  }
  if (!res.length) return res;
  const exactas = res.filter(r => r.exacta);
  return opts.sinMacrones || !exactas.length ? res : exactas;
};

/* ───────── capítulo en que se enseña cada etiqueta ───────── */
const CAP_CASO = { nom: 1, gen: 2, acc: 3, voc: 4, abl: 5, loc: 6, dat: 7 };
const CAP_TIEMPO = { pres: 3, impf: 19, fut: 20, perf: 21, plpf: 24, futperf: 30 };
const CAP_SUBJ = { pres: 27, impf: 28, perf: 32, plpf: 33 };
function capCaso(c, n) { if (c === 'acc' && n === 'pl') return 5; return CAP_CASO[c] || 1; }
function capDecl(e) {
  if (!e) return 1;
  if (e.tipo === 'n') { const n = e.n; return n.decl === 3 ? (n.g === 'n' ? 11 : 9) : n.decl === 4 ? 12 : n.decl === 5 ? 13 : 1; }
  if (e.tipo === 'adj') return e.a.tipo === 'is' || e.a.tipo === '1t' || e.a.tipo === '3t' || e.a.tipo === 'comp' ? 12 : 1;
  return 1;
}
M.capDe = function (tag, e) {
  const p = tag.split('.');
  let cap = 1;
  if (p[0] === 'sup' && p.length === 2) return 22; /* supino */
  const nominal = /^(nom|gen|dat|acc|abl|voc|loc)$/.test(p[0]);
  if (nominal || /^(comp|sup)$/.test(p[0]) && /^(nom|gen|dat|acc|abl|voc)$/.test(p[1])) {
    const i = /^(comp|sup)$/.test(p[0]) ? 1 : 0, c = p[i], n = p[i + 1];
    cap = Math.max(capCaso(c, n), capDecl(e));
    if (p[0] === 'comp') cap = Math.max(cap, 12);
    if (p[0] === 'sup') cap = Math.max(cap, 13);
    if (e && e.tipo === 'pron') cap = Math.max(cap, e.la === 'hic' ? 7 : (e.la === 'quī' || e.la === 'quis') ? 8 : e.la === 'is' ? 8 : e.la === 'ego' || e.la === 'tū' ? 15 : 8);
    return cap;
  }
  if (p[0] === 'adv') return p[1] === 'comp' || p[1] === 'sup' ? 18 : 18;
  if (p[0] === 'part') { if (p[1] === 'pres') return 14; if (p[1] === 'perf') return 21; return 23; }
  if (p[0] === 'gdv') return 31;
  if (p[0] === 'ger') return 26;
  if (p[0] === 'sup') return 22;
  if (p[0] === 'inf') return p[1] === 'pres' ? (p[2] === 'act' ? 10 : 17) : p[1] === 'perf' ? 21 : 23;
  /* finitos */
  const [pn, t, m, vz] = p, per = pn[0], num = pn.slice(1);
  if (m === 'imp') {
    if (t === 'fut') return 26;
    if (vz !== 'act') return 25;
    return num === 'sg' ? 4 : 5;
  }
  cap = m === 'subj' ? CAP_SUBJ[t] : CAP_TIEMPO[t];
  const esEsse = e && e.tipo === 'v' && e.v.irr === 'esse' && !e.v.pref;
  if (t === 'pres' && m === 'ind') {
    if (vz === 'act') cap = per === '3' ? (num === 'sg' ? 3 : 5) : 15;
    else if (vz === 'pass') cap = per === '3' ? 6 : 17;
    else cap = per === '3' ? 16 : 17;
    if (esEsse) cap = per === '3' ? 1 : 15;
  } else if (vz !== 'act' && per !== '3') cap = Math.max(cap, 17);
  else if (vz === 'dep') cap = Math.max(cap, 16);
  if (e && e.tipo === 'v' && e.v.irr === 'posse') cap = Math.max(cap, 15);
  if (e && e.tipo === 'v' && e.v.semi) cap = Math.max(cap, 24);
  if (e && e.tipo === 'v' && e.v.dep && t === 'perf') cap = Math.max(cap, 24);
  if (e && e.tipo === 'v' && e.v.irr === 'īre' && t === 'pres' && m === 'ind') cap = Math.max(cap, 6);
  return cap;
};
M.permitido = (tag, cap, e) => M.capDe(tag, e) <= cap;

const NOMBRES = { nom: 'nominativo', gen: 'genitivo', dat: 'dativo', acc: 'acusativo', abl: 'ablativo', voc: 'vocativo', loc: 'locativo', sg: 'singular', pl: 'plural', m: 'masculino', f: 'femenino', n: 'neutro',
  pres: 'presente', impf: 'imperfecto', fut: 'futuro', perf: 'perfecto', plpf: 'pluscuamperfecto', futperf: 'futuro perfecto', ind: 'indicativo', subj: 'subjuntivo', imp: 'imperativo', act: 'activa', pass: 'pasiva', dep: 'deponente',
  comp: 'comparativo', sup: 'superlativo', inf: 'infinitivo', part: 'participio', gdv: 'gerundivo', ger: 'gerundio', adv: 'adverbio' };
M.nombreEtiqueta = tag => {
  const p = tag.split('.');
  if (/^[123](sg|pl)$/.test(p[0])) return `${p[0][0]}.ª persona ${NOMBRES[p[0].slice(1)]} · ${NOMBRES[p[1]]} ${NOMBRES[p[2]]} ${NOMBRES[p[3]]}`;
  if (p[0] === 'sup' && p.length === 2) return 'supino ' + NOMBRES[p[1]];
  return p.map(x => NOMBRES[x] || x).join(' ');
};
M.TIEMPOS = ['pres', 'impf', 'fut', 'perf', 'plpf', 'futperf']; M.PERSONAS = T_PERS; M.CASOS = NOMBRE_CASOS;

if (typeof module !== 'undefined' && module.exports) module.exports = M; else raiz.Morfo = M;
})(typeof window !== 'undefined' ? window : globalThis);

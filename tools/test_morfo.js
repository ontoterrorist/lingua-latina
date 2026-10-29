/* Pruebas de morfo.js con paradigmas modelo escritos a mano (sin dependencias).   node tools/test_morfo.js
   Cada fila: «etiqueta o grupo» + las formas esperadas; «a/b» = variantes admitidas (la primera es la preferida). */
const Morfo = require('../morfo.js');
let fallos = 0, total = 0;
const quita = s => s.normalize('NFC');

function compara(lema, tag, esperado, obtenido) {
  total++;
  const e = esperado.map(quita), o = (obtenido || []).map(quita);
  const ok = o.length === e.length && e.every((x, i) => x === o[i]) || (o.length >= e.length && e.every(x => o.includes(x)) && o[0] === e[0] && o.length === e.length);
  if (!ok) { fallos++; console.log(`✗ ${lema} ${tag}: esperaba [${e.join(', ')}] y salió [${o.join(', ')}]`); }
}
const variantes = w => w.split('/');

/* nombres: sg y pl en el orden nom gen dat acc abl voc */
function nombre(lema, formas, sg, pl, extra) {
  const f = Morfo.formas(Morfo.entrada(lema, formas, 'n'));
  const c = Morfo.CASOS;
  if (sg) sg.split(' ').forEach((w, i) => compara(lema, `${c[i]}.sg`, variantes(w), f[`${c[i]}.sg`]));
  pl.split(' ').forEach((w, i) => compara(lema, `${c[i]}.pl`, variantes(w), f[`${c[i]}.pl`]));
  for (const k in extra || {}) compara(lema, k, variantes(extra[k]), f[k]);
}
/* adjetivos: filas por género */
function adjetivo(lema, formas, filas, extra) {
  const f = Morfo.formas(Morfo.entrada(lema, formas, 'adj'));
  const c = Morfo.CASOS;
  for (const g of Object.keys(filas)) for (const n of ['sg', 'pl']) {
    const ws = filas[g][n].split(' ');
    ws.forEach((w, i) => compara(lema, `${c[i]}.${n}.${g}`, variantes(w), f[`${c[i]}.${n}.${g}`]));
  }
  for (const k in extra || {}) compara(lema, k, variantes(extra[k]), f[k]);
}
/* verbos: filas «tiempo.modo.voz»: seis personas */
function verbo(lema, formas, filas, sueltas) {
  const f = Morfo.formas(Morfo.entrada(lema, formas, 'v'));
  for (const k in filas) filas[k].split(' ').forEach((w, i) => compara(lema, `${Morfo.PERSONAS[i]}.${k}`, variantes(w.replace(/_/g, ' ')), f[`${Morfo.PERSONAS[i]}.${k}`]));
  for (const k in sueltas || {}) compara(lema, k, variantes(sueltas[k].replace(/_/g, ' ')), f[k]);
}

/* ───── nombres ───── */
nombre('puella', '-ae f', 'puella puellae puellae puellam puellā puella', 'puellae puellārum puellīs puellās puellīs puellae', { 'loc.sg': 'puellae' });
nombre('servus', '-ī m', 'servus servī servō servum servō serve', 'servī servōrum servīs servōs servīs servī', { 'loc.sg': 'servī' });
nombre('verbum', '-ī n', 'verbum verbī verbō verbum verbō verbum', 'verba verbōrum verbīs verba verbīs verba');
nombre('puer', '-ī m', 'puer puerī puerō puerum puerō puer', 'puerī puerōrum puerīs puerōs puerīs puerī');
nombre('ager', 'agrī m', 'ager agrī agrō agrum agrō ager', 'agrī agrōrum agrīs agrōs agrīs agrī');
nombre('fīlius', '-ī m', 'fīlius fīlī/fīliī fīliō fīlium fīliō fīlī', 'fīliī fīliōrum fīliīs fīliōs fīliīs fīliī');
nombre('magister', '-trī m', 'magister magistrī magistrō magistrum magistrō magister', 'magistrī magistrōrum magistrīs magistrōs magistrīs magistrī');
nombre('pāstor', '-ōris m', 'pāstor pāstōris pāstōrī pāstōrem pāstōre pāstor', 'pāstōrēs pāstōrum pāstōribus pāstōrēs pāstōribus pāstōrēs');
nombre('rēx', 'rēgis m', 'rēx rēgis rēgī rēgem rēge rēx', 'rēgēs rēgum rēgibus rēgēs rēgibus rēgēs');
nombre('mīles', '-itis m', 'mīles mīlitis mīlitī mīlitem mīlite mīles', 'mīlitēs mīlitum mīlitibus mīlitēs mīlitibus mīlitēs');
nombre('pater', '-tris m', 'pater patris patrī patrem patre pater', 'patrēs patrum patribus patrēs patribus patrēs');
nombre('hostis', '-is m', 'hostis hostis hostī hostem hoste hostis', 'hostēs hostium hostibus hostēs/hostīs hostibus hostēs');
nombre('urbs', 'urbis f', 'urbs urbis urbī urbem urbe urbs', 'urbēs urbium urbibus urbēs/urbīs urbibus urbēs');
nombre('corpus', '-oris n', 'corpus corporis corporī corpus corpore corpus', 'corpora corporum corporibus corpora corporibus corpora');
nombre('mare', '-is n', 'mare maris marī mare marī mare', 'maria marium maribus maria maribus maria');
nombre('animal', '-ālis n', 'animal animālis animālī animal animālī animal', 'animālia animālium animālibus animālia animālibus animālia');
nombre('manus', '-ūs f', 'manus manūs manuī manum manū manus', 'manūs manuum manibus manūs manibus manūs');
nombre('cornū', '-ūs n', 'cornū cornūs cornū cornū cornū cornū', 'cornua cornuum cornibus cornua cornibus cornua');
nombre('diēs', '-ēī m', 'diēs diēī diēī diem diē diēs', 'diēs diērum diēbus diēs diēbus diēs');
nombre('rēs', 'reī f', 'rēs reī reī rem rē rēs', 'rēs rērum rēbus rēs rēbus rēs');
nombre('domus', '-ūs f', 'domus domūs domuī/domō domum domō/domū domus', 'domūs domuum/domōrum domibus domōs/domūs domibus domūs', { 'loc.sg': 'domī' });
nombre('castra', '-ōrum n pl', '', 'castra castrōrum castrīs castra castrīs castra');

/* ───── adjetivos ───── */
adjetivo('bonus', '-a, -um', {
  m: { sg: 'bonus bonī bonō bonum bonō bone', pl: 'bonī bonōrum bonīs bonōs bonīs bonī' },
  f: { sg: 'bona bonae bonae bonam bonā bona', pl: 'bonae bonārum bonīs bonās bonīs bonae' },
  n: { sg: 'bonum bonī bonō bonum bonō bonum', pl: 'bona bonōrum bonīs bona bonīs bona' }
}, { 'comp.nom.sg.m': 'melior', 'comp.nom.sg.n': 'melius', 'comp.gen.sg.m': 'meliōris', 'comp.acc.pl.m': 'meliōrēs/meliōrīs', 'sup.nom.sg.m': 'optimus', 'sup.nom.sg.f': 'optima', adv: 'bene', 'adv.comp': 'melius', 'adv.sup': 'optimē' });
adjetivo('pulcher', '-chra, -chrum', {
  m: { sg: 'pulcher pulchrī pulchrō pulchrum pulchrō pulcher', pl: 'pulchrī pulchrōrum pulchrīs pulchrōs pulchrīs pulchrī' },
  f: { sg: 'pulchra pulchrae pulchrae pulchram pulchrā pulchra', pl: 'pulchrae pulchrārum pulchrīs pulchrās pulchrīs pulchrae' },
  n: { sg: 'pulchrum pulchrī pulchrō pulchrum pulchrō pulchrum', pl: 'pulchra pulchrōrum pulchrīs pulchra pulchrīs pulchra' }
}, { 'comp.nom.sg.m': 'pulchrior', 'sup.nom.sg.m': 'pulcherrimus', adv: 'pulchrē', 'adv.sup': 'pulcherrimē' });
adjetivo('miser', '-era, -erum', {
  m: { sg: 'miser miserī miserō miserum miserō miser', pl: 'miserī miserōrum miserīs miserōs miserīs miserī' },
  f: { sg: 'misera miserae miserae miseram miserā misera', pl: 'miserae miserārum miserīs miserās miserīs miserae' },
  n: { sg: 'miserum miserī miserō miserum miserō miserum', pl: 'misera miserōrum miserīs misera miserīs misera' }
});
adjetivo('fortis', '-e', {
  m: { sg: 'fortis fortis fortī fortem fortī fortis', pl: 'fortēs fortium fortibus fortēs/fortīs fortibus fortēs' },
  f: { sg: 'fortis fortis fortī fortem fortī fortis', pl: 'fortēs fortium fortibus fortēs/fortīs fortibus fortēs' },
  n: { sg: 'forte fortis fortī forte fortī forte', pl: 'fortia fortium fortibus fortia fortibus fortia' }
}, { 'comp.nom.sg.m': 'fortior', 'comp.nom.sg.n': 'fortius', 'sup.nom.sg.m': 'fortissimus', adv: 'fortiter', 'adv.comp': 'fortius' });
adjetivo('ingēns', '-entis', {
  m: { sg: 'ingēns ingentis ingentī ingentem ingentī ingēns', pl: 'ingentēs ingentium ingentibus ingentēs/ingentīs ingentibus ingentēs' },
  f: { sg: 'ingēns ingentis ingentī ingentem ingentī ingēns', pl: 'ingentēs ingentium ingentibus ingentēs/ingentīs ingentibus ingentēs' },
  n: { sg: 'ingēns ingentis ingentī ingēns ingentī ingēns', pl: 'ingentia ingentium ingentibus ingentia ingentibus ingentia' }
}, { 'comp.nom.sg.m': 'ingentior', adv: 'ingenter' });
adjetivo('ācer', 'ācris, ācre', {
  m: { sg: 'ācer ācris ācrī ācrem ācrī ācer', pl: 'ācrēs ācrium ācribus ācrēs/ācrīs ācribus ācrēs' },
  f: { sg: 'ācris ācris ācrī ācrem ācrī ācris', pl: 'ācrēs ācrium ācribus ācrēs/ācrīs ācribus ācrēs' },
  n: { sg: 'ācre ācris ācrī ācre ācrī ācre', pl: 'ācria ācrium ācribus ācria ācribus ācria' }
}, { 'sup.nom.sg.m': 'ācerrimus' });
adjetivo('facilis', '-e', { m: { sg: 'facilis facilis facilī facilem facilī facilis', pl: 'facilēs facilium facilibus facilēs/facilīs facilibus facilēs' }, f: { sg: 'facilis facilis facilī facilem facilī facilis', pl: 'facilēs facilium facilibus facilēs/facilīs facilibus facilēs' }, n: { sg: 'facile facilis facilī facile facilī facile', pl: 'facilia facilium facilibus facilia facilibus facilia' } }, { 'sup.nom.sg.m': 'facillimus' });
adjetivo('ūnus', '-a, -um', { m: { sg: 'ūnus ūnīus ūnī ūnum ūnō ūne', pl: 'ūnī ūnōrum ūnīs ūnōs ūnīs ūnī' }, f: { sg: 'ūna ūnīus ūnī ūnam ūnā ūna', pl: 'ūnae ūnārum ūnīs ūnās ūnīs ūnae' }, n: { sg: 'ūnum ūnīus ūnī ūnum ūnō ūnum', pl: 'ūna ūnōrum ūnīs ūna ūnīs ūna' } });
adjetivo('melior', '-ius', { m: { sg: 'melior meliōris meliōrī meliōrem meliōre/meliōrī melior', pl: 'meliōrēs meliōrum meliōribus meliōrēs/meliōrīs meliōribus meliōrēs' }, f: { sg: 'melior meliōris meliōrī meliōrem meliōre/meliōrī melior', pl: 'meliōrēs meliōrum meliōribus meliōrēs/meliōrīs meliōribus meliōrēs' }, n: { sg: 'melius meliōris meliōrī melius meliōre/meliōrī melius', pl: 'meliōra meliōrum meliōribus meliōra meliōribus meliōra' } });
adjetivo('pauper', '-eris', { m: { sg: 'pauper pauperis pauperī pauperem pauperE pauper'.replace('pauperE', 'paupere'), pl: 'pauperēs pauperum pauperibus pauperēs pauperibus pauperēs' }, f: { sg: 'pauper pauperis pauperī pauperem paupere pauper', pl: 'pauperēs pauperum pauperibus pauperēs pauperibus pauperēs' }, n: { sg: 'pauper pauperis pauperī pauper paupere pauper', pl: 'paupera pauperum pauperibus paupera pauperibus paupera' } });

/* ───── verbos regulares ───── */
verbo('amāre', 'amō, -āre, -āvī, -ātum', {
  'pres.ind.act': 'amō amās amat amāmus amātis amant',
  'impf.ind.act': 'amābam amābās amābat amābāmus amābātis amābant',
  'fut.ind.act': 'amābō amābis amābit amābimus amābitis amābunt',
  'perf.ind.act': 'amāvī amāvistī/amāstī amāvit amāvimus amāvistis/amāstis amāvērunt/amāvēre',
  'plpf.ind.act': 'amāveram amāverās amāverat amāverāmus amāverātis amāverant',
  'futperf.ind.act': 'amāverō amāveris amāverit amāverimus amāveritis amāverint',
  'pres.subj.act': 'amem amēs amet amēmus amētis ament',
  'impf.subj.act': 'amārem amārēs amāret amārēmus amārētis amārent',
  'perf.subj.act': 'amāverim amāverīs amāverit amāverīmus amāverītis amāverint',
  'plpf.subj.act': 'amāvissem/amāssem amāvissēs/amāssēs amāvisset/amāsset amāvissēmus/amāssēmus amāvissētis/amāssētis amāvissent/amāssent',
  'pres.ind.pass': 'amor amāris/amāre amātur amāmur amāminī amantur',
  'impf.ind.pass': 'amābar amābāris/amābāre amābātur amābāmur amābāminī amābantur',
  'fut.ind.pass': 'amābor amāberis/amābere amābitur amābimur amābiminī amābuntur',
  'perf.ind.pass': 'amātus_sum amātus_es amātus_est amātī_sumus amātī_estis amātī_sunt',
  'plpf.ind.pass': 'amātus_eram amātus_erās amātus_erat amātī_erāmus amātī_erātis amātī_erant',
  'futperf.ind.pass': 'amātus_erō amātus_eris amātus_erit amātī_erimus amātī_eritis amātī_erunt',
  'pres.subj.pass': 'amer amēris/amēre amētur amēmur amēminī amentur',
  'impf.subj.pass': 'amārer amārēris/amārēre amārētur amārēmur amārēminī amārentur',
  'perf.subj.pass': 'amātus_sim amātus_sīs amātus_sit amātī_sīmus amātī_sītis amātī_sint',
  'plpf.subj.pass': 'amātus_essem amātus_essēs amātus_esset amātī_essēmus amātī_essētis amātī_essent'
}, {
  '2sg.pres.imp.act': 'amā', '2pl.pres.imp.act': 'amāte', '2sg.fut.imp.act': 'amātō', '3sg.fut.imp.act': 'amātō', '2pl.fut.imp.act': 'amātōte', '3pl.fut.imp.act': 'amantō',
  '2sg.pres.imp.pass': 'amāre', '2pl.pres.imp.pass': 'amāminī',
  'inf.pres.act': 'amāre', 'inf.perf.act': 'amāvisse/amāsse', 'inf.fut.act': 'amātūrus_esse', 'inf.pres.pass': 'amārī', 'inf.perf.pass': 'amātus_esse', 'inf.fut.pass': 'amātum_īrī',
  'part.pres.act.nom.sg.m': 'amāns', 'part.pres.act.gen.sg.m': 'amantis', 'part.pres.act.abl.sg.m': 'amante/amantī', 'part.pres.act.nom.pl.m': 'amantēs', 'part.pres.act.gen.pl.m': 'amantium', 'part.pres.act.nom.pl.n': 'amantia',
  'part.perf.pass.nom.sg.m': 'amātus', 'part.perf.pass.nom.sg.f': 'amāta', 'part.perf.pass.acc.pl.n': 'amāta', 'part.perf.pass.abl.sg.m': 'amātō', 'part.fut.act.nom.sg.m': 'amātūrus', 'part.fut.act.acc.sg.f': 'amātūram',
  'gdv.nom.sg.m': 'amandus', 'gdv.nom.sg.f': 'amanda', 'gdv.gen.pl.n': 'amandōrum', 'ger.gen': 'amandī', 'ger.dat': 'amandō', 'ger.acc': 'amandum', 'ger.abl': 'amandō', 'sup.acc': 'amātum', 'sup.abl': 'amātū'
});
verbo('vidēre', 'videō, -ēre, vīdī, vīsum', {
  'pres.ind.act': 'videō vidēs videt vidēmus vidētis vident', 'impf.ind.act': 'vidēbam vidēbās vidēbat vidēbāmus vidēbātis vidēbant', 'fut.ind.act': 'vidēbō vidēbis vidēbit vidēbimus vidēbitis vidēbunt',
  'perf.ind.act': 'vīdī vīdistī vīdit vīdimus vīdistis vīdērunt/vīdēre', 'plpf.ind.act': 'vīderam vīderās vīderat vīderāmus vīderātis vīderant',
  'pres.subj.act': 'videam videās videat videāmus videātis videant', 'impf.subj.act': 'vidērem vidērēs vidēret vidērēmus vidērētis vidērent', 'perf.subj.act': 'vīderim vīderīs vīderit vīderīmus vīderītis vīderint', 'plpf.subj.act': 'vīdissem vīdissēs vīdisset vīdissēmus vīdissētis vīdissent',
  'pres.ind.pass': 'videor vidēris/vidēre vidētur vidēmur vidēminī videntur', 'perf.ind.pass': 'vīsus_sum vīsus_es vīsus_est vīsī_sumus vīsī_estis vīsī_sunt'
}, { '2sg.pres.imp.act': 'vidē', '2pl.pres.imp.act': 'vidēte', '2sg.fut.imp.act': 'vidētō', '3pl.fut.imp.act': 'videntō', 'inf.pres.act': 'vidēre', 'inf.pres.pass': 'vidērī', 'inf.perf.act': 'vīdisse', 'inf.fut.act': 'vīsūrus_esse',
  'part.pres.act.nom.sg.m': 'vidēns', 'part.pres.act.gen.sg.m': 'videntis', 'part.perf.pass.nom.sg.m': 'vīsus', 'part.fut.act.nom.sg.m': 'vīsūrus', 'gdv.nom.sg.m': 'videndus', 'ger.gen': 'videndī', 'sup.acc': 'vīsum', 'sup.abl': 'vīsū' });
verbo('legere', 'legō, -ere, lēgī, lēctum', {
  'pres.ind.act': 'legō legis legit legimus legitis legunt', 'impf.ind.act': 'legēbam legēbās legēbat legēbāmus legēbātis legēbant', 'fut.ind.act': 'legam legēs leget legēmus legētis legent',
  'perf.ind.act': 'lēgī lēgistī lēgit lēgimus lēgistis lēgērunt/lēgēre', 'pres.subj.act': 'legam legās legat legāmus legātis legant', 'impf.subj.act': 'legerem legerēs legeret legerēmus legerētis legerent',
  'pres.ind.pass': 'legor legeris/legere legitur legimur legiminī leguntur', 'impf.ind.pass': 'legēbar legēbāris/legēbāre legēbātur legēbāmur legēbāminī legēbantur', 'fut.ind.pass': 'legar legēris/legēre legētur legēmur legēminī legentur',
  'pres.subj.pass': 'legar legāris/legāre legātur legāmur legāminī legantur', 'impf.subj.pass': 'legerer legerēris/legerēre legerētur legerēmur legerēminī legerentur'
}, { '2sg.pres.imp.act': 'lege', '2pl.pres.imp.act': 'legite', '2sg.fut.imp.act': 'legitō', '2pl.fut.imp.act': 'legitōte', '3pl.fut.imp.act': 'leguntō', 'inf.pres.act': 'legere', 'inf.pres.pass': 'legī', 'inf.fut.act': 'lēctūrus_esse',
  'part.pres.act.nom.sg.m': 'legēns', 'part.pres.act.gen.sg.m': 'legentis', 'part.perf.pass.nom.sg.m': 'lēctus', 'gdv.nom.sg.m': 'legendus', 'ger.gen': 'legendī', 'sup.acc': 'lēctum' });
verbo('capere', 'capiō, -ere, cēpī, captum', {
  'pres.ind.act': 'capiō capis capit capimus capitis capiunt', 'impf.ind.act': 'capiēbam capiēbās capiēbat capiēbāmus capiēbātis capiēbant', 'fut.ind.act': 'capiam capiēs capiet capiēmus capiētis capient',
  'perf.ind.act': 'cēpī cēpistī cēpit cēpimus cēpistis cēpērunt/cēpēre', 'pres.subj.act': 'capiam capiās capiat capiāmus capiātis capiant', 'impf.subj.act': 'caperem caperēs caperet caperēmus caperētis caperent',
  'pres.ind.pass': 'capior caperis/capere capitur capimur capiminī capiuntur', 'fut.ind.pass': 'capiar capiēris/capiēre capiētur capiēmur capiēminī capientur'
}, { '2sg.pres.imp.act': 'cape', '2pl.pres.imp.act': 'capite', '2sg.fut.imp.act': 'capitō', '3pl.fut.imp.act': 'capiuntō', 'inf.pres.act': 'capere', 'inf.pres.pass': 'capī',
  'part.pres.act.nom.sg.m': 'capiēns', 'part.pres.act.gen.sg.m': 'capientis', 'part.perf.pass.nom.sg.m': 'captus', 'part.fut.act.nom.sg.m': 'captūrus', 'gdv.nom.sg.m': 'capiendus', 'ger.gen': 'capiendī', 'sup.acc': 'captum' });
verbo('audīre', 'audiō, -īre, -īvī, -ītum', {
  'pres.ind.act': 'audiō audīs audit audīmus audītis audiunt', 'impf.ind.act': 'audiēbam audiēbās audiēbat audiēbāmus audiēbātis audiēbant', 'fut.ind.act': 'audiam audiēs audiet audiēmus audiētis audient',
  'perf.ind.act': 'audīvī audīvistī/audīstī audīvit audīvimus audīvistis/audīstis audīvērunt/audīvēre', 'pres.subj.act': 'audiam audiās audiat audiāmus audiātis audiant', 'impf.subj.act': 'audīrem audīrēs audīret audīrēmus audīrētis audīrent',
  'pres.ind.pass': 'audior audīris/audīre audītur audīmur audīminī audiuntur', 'impf.ind.pass': 'audiēbar audiēbāris/audiēbāre audiēbātur audiēbāmur audiēbāminī audiēbantur'
}, { '2sg.pres.imp.act': 'audī', '2pl.pres.imp.act': 'audīte', '2sg.fut.imp.act': 'audītō', '3pl.fut.imp.act': 'audiuntō', 'inf.pres.act': 'audīre', 'inf.pres.pass': 'audīrī', 'inf.perf.act': 'audīvisse/audīsse',
  'part.pres.act.nom.sg.m': 'audiēns', 'part.pres.act.gen.sg.m': 'audientis', 'part.perf.pass.nom.sg.m': 'audītus', 'part.fut.act.nom.sg.m': 'audītūrus', 'gdv.nom.sg.m': 'audiendus', 'ger.gen': 'audiendī', 'sup.acc': 'audītum' });
verbo('hortārī', 'hortor, -ārī, -ātus sum', {
  'pres.ind.dep': 'hortor hortāris/hortāre hortātur hortāmur hortāminī hortantur', 'impf.ind.dep': 'hortābar hortābāris/hortābāre hortābātur hortābāmur hortābāminī hortābantur', 'fut.ind.dep': 'hortābor hortāberis/hortābere hortābitur hortābimur hortābiminī hortābuntur',
  'perf.ind.dep': 'hortātus_sum hortātus_es hortātus_est hortātī_sumus hortātī_estis hortātī_sunt', 'plpf.ind.dep': 'hortātus_eram hortātus_erās hortātus_erat hortātī_erāmus hortātī_erātis hortātī_erant',
  'pres.subj.dep': 'horter hortēris/hortēre hortētur hortēmur hortēminī hortentur', 'impf.subj.dep': 'hortārer hortārēris/hortārēre hortārētur hortārēmur hortārēminī hortārentur'
}, { '2sg.pres.imp.dep': 'hortāre', '2pl.pres.imp.dep': 'hortāminī', 'inf.pres.dep': 'hortārī', 'inf.perf.dep': 'hortātus_esse', 'inf.fut.act': 'hortātūrus_esse',
  'part.pres.act.nom.sg.m': 'hortāns', 'part.perf.dep.nom.sg.m': 'hortātus', 'part.fut.act.nom.sg.m': 'hortātūrus', 'gdv.nom.sg.m': 'hortandus', 'ger.gen': 'hortandī', 'sup.acc': 'hortātum' });

/* ───── verbos irregulares ───── */
verbo('esse', 'sum, esse, fuī', {
  'pres.ind.act': 'sum es est sumus estis sunt', 'impf.ind.act': 'eram erās erat erāmus erātis erant', 'fut.ind.act': 'erō eris erit erimus eritis erunt',
  'perf.ind.act': 'fuī fuistī fuit fuimus fuistis fuērunt/fuēre', 'plpf.ind.act': 'fueram fuerās fuerat fuerāmus fuerātis fuerant', 'futperf.ind.act': 'fuerō fueris fuerit fuerimus fueritis fuerint',
  'pres.subj.act': 'sim sīs sit sīmus sītis sint', 'impf.subj.act': 'essem essēs esset essēmus essētis essent', 'perf.subj.act': 'fuerim fuerīs fuerit fuerīmus fuerītis fuerint', 'plpf.subj.act': 'fuissem fuissēs fuisset fuissēmus fuissētis fuissent'
}, { '2sg.pres.imp.act': 'es', '2pl.pres.imp.act': 'este', '2sg.fut.imp.act': 'estō', '3pl.fut.imp.act': 'suntō', 'inf.pres.act': 'esse', 'inf.perf.act': 'fuisse', 'inf.fut.act': 'futūrus_esse/fore', 'part.fut.act.nom.sg.m': 'futūrus' });
verbo('posse', 'possum, posse, potuī', {
  'pres.ind.act': 'possum potes potest possumus potestis possunt', 'impf.ind.act': 'poteram poterās poterat poterāmus poterātis poterant', 'fut.ind.act': 'poterō poteris poterit poterimus poteritis poterunt',
  'perf.ind.act': 'potuī potuistī potuit potuimus potuistis potuērunt/potuēre', 'pres.subj.act': 'possim possīs possit possīmus possītis possint', 'impf.subj.act': 'possem possēs posset possēmus possētis possent'
}, { 'inf.pres.act': 'posse', 'inf.perf.act': 'potuisse' });
verbo('īre', 'eō, īre, iī (īvī), itum', {
  'pres.ind.act': 'eō īs it īmus ītis eunt', 'impf.ind.act': 'ībam ībās ībat ībāmus ībātis ībant', 'fut.ind.act': 'ībō ībis ībit ībimus ībitis ībunt',
  'perf.ind.act': 'iī iistī/īstī iit iimus iistis/īstis iērunt/iēre', 'plpf.ind.act': 'ieram ierās ierat ierāmus ierātis ierant', 'pres.subj.act': 'eam eās eat eāmus eātis eant', 'impf.subj.act': 'īrem īrēs īret īrēmus īrētis īrent'
}, { '2sg.pres.imp.act': 'ī', '2pl.pres.imp.act': 'īte', 'inf.pres.act': 'īre', 'inf.perf.act': 'iisse/īsse', 'inf.fut.act': 'itūrus_esse', 'part.pres.act.nom.sg.m': 'iēns', 'part.pres.act.gen.sg.m': 'euntis', 'ger.gen': 'eundī', 'sup.acc': 'itum' });
verbo('adīre', 'adeō, -īre, adiī, aditum', { 'pres.ind.act': 'adeō adīs adit adīmus adītis adeunt', 'perf.ind.act': 'adiī adiistī/adīstī adiit adiimus adiistis/adīstis adiērunt/adiēre' }, { 'inf.pres.act': 'adīre' });
verbo('ferre', 'ferō, ferre, tulī, lātum', {
  'pres.ind.act': 'ferō fers fert ferimus fertis ferunt', 'impf.ind.act': 'ferēbam ferēbās ferēbat ferēbāmus ferēbātis ferēbant', 'fut.ind.act': 'feram ferēs feret ferēmus ferētis ferent',
  'perf.ind.act': 'tulī tulistī tulit tulimus tulistis tulērunt/tulēre', 'pres.subj.act': 'feram ferās ferat ferāmus ferātis ferant', 'impf.subj.act': 'ferrem ferrēs ferret ferrēmus ferrētis ferrent',
  'pres.ind.pass': 'feror ferris fertur ferimur feriminī feruntur'
}, { '2sg.pres.imp.act': 'fer', '2pl.pres.imp.act': 'ferte', 'inf.pres.act': 'ferre', 'inf.pres.pass': 'ferrī', 'inf.perf.act': 'tulisse', 'part.perf.pass.nom.sg.m': 'lātus', 'gdv.nom.sg.m': 'ferendus', 'sup.acc': 'lātum' });
verbo('afferre', 'afferō, -ferre, attulī, allātum', { 'pres.ind.act': 'afferō affers affert afferimus affertis afferunt', 'perf.ind.act': 'attulī attulistī attulit attulimus attulistis attulērunt/attulēre' }, { 'inf.pres.act': 'afferre', 'part.perf.pass.nom.sg.m': 'allātus' });
verbo('velle', 'volō, velle, voluī', {
  'pres.ind.act': 'volō vīs vult volumus vultis volunt', 'impf.ind.act': 'volēbam volēbās volēbat volēbāmus volēbātis volēbant', 'fut.ind.act': 'volam volēs volet volēmus volētis volent',
  'perf.ind.act': 'voluī voluistī voluit voluimus voluistis voluērunt/voluēre', 'pres.subj.act': 'velim velīs velit velīmus velītis velint', 'impf.subj.act': 'vellem vellēs vellet vellēmus vellētis vellent'
}, { 'inf.pres.act': 'velle', 'inf.perf.act': 'voluisse', 'part.pres.act.nom.sg.m': 'volēns' });
verbo('nōlle', 'nōlō, nōlle, nōluī', { 'pres.ind.act': 'nōlō nōn_vīs nōn_vult nōlumus nōn_vultis nōlunt', 'pres.subj.act': 'nōlim nōlīs nōlit nōlīmus nōlītis nōlint', 'impf.subj.act': 'nōllem nōllēs nōllet nōllēmus nōllētis nōllent' }, { '2sg.pres.imp.act': 'nōlī', '2pl.pres.imp.act': 'nōlīte', 'inf.pres.act': 'nōlle' });
verbo('mālle', 'mālō, mālle, māluī', { 'pres.ind.act': 'mālō māvīs māvult mālumus māvultis mālunt', 'impf.subj.act': 'mallem mallēs mallet mallēmus mallētis mallent' }, { 'inf.pres.act': 'mālle' });
verbo('fierī', 'fīō, fierī, factus sum', {}, { '1sg.pres.ind.act': 'fīō', '2sg.pres.ind.act': 'fīs', '3sg.pres.ind.act': 'fit', '3pl.pres.ind.act': 'fīunt', '3sg.impf.subj.act': 'fieret', 'inf.pres.act': 'fierī' });

/* ───── pronombres y numerales ───── */
{
  const P = (l, tag, w) => compara(l, tag, variantes(w), Morfo.formas(Morfo.entrada(l, '', 'pron'))[tag]);
  P('ego', 'nom.sg', 'ego'); P('ego', 'gen.sg', 'meī'); P('ego', 'dat.sg', 'mihi/mī'); P('ego', 'acc.sg', 'mē'); P('ego', 'nom.pl', 'nōs'); P('ego', 'dat.pl', 'nōbīs');
  P('tū', 'nom.sg', 'tū'); P('tū', 'dat.sg', 'tibi'); P('tū', 'nom.pl', 'vōs'); P('tū', 'abl.pl', 'vōbīs');
  P('is', 'nom.sg.m', 'is'); P('is', 'acc.sg.f', 'eam'); P('is', 'gen.sg.n', 'eius'); P('is', 'nom.pl.m', 'eī/iī/ī'); P('is', 'acc.pl.n', 'ea');
  P('hic', 'nom.sg.m', 'hic'); P('hic', 'acc.sg.f', 'hanc'); P('hic', 'gen.sg.m', 'huius'); P('hic', 'nom.pl.f', 'hae'); P('hic', 'abl.sg.f', 'hāc'); P('hic', 'nom.sg.n', 'hoc');
  P('ille', 'nom.sg.n', 'illud'); P('ille', 'gen.sg.f', 'illīus'); P('ille', 'acc.pl.m', 'illōs');
  P('quī', 'nom.sg.f', 'quae'); P('quī', 'gen.sg.m', 'cuius'); P('quī', 'dat.pl.m', 'quibus/quīs'); P('quis', 'nom.sg.m', 'quis'); P('quis', 'nom.sg.n', 'quid'); P('quis', 'acc.sg.m', 'quem');
  P('īdem', 'nom.sg.n', 'idem'); P('īdem', 'acc.sg.m', 'eundem');
  const N = (l, tag, w) => compara(l, tag, variantes(w), Morfo.formas(Morfo.entrada(l, '', 'num'))[tag]);
  N('duo', 'nom.pl.m', 'duo'); N('duo', 'nom.pl.f', 'duae'); N('duo', 'gen.pl.m', 'duōrum'); N('duo', 'dat.pl.n', 'duōbus'); N('trēs', 'nom.pl.n', 'tria'); N('trēs', 'gen.pl.f', 'trium'); N('trēs', 'abl.pl.m', 'tribus');
}

/* ───── análisis ───── */
function carga() {
  Morfo.reinicia();
  const E = (l, f, c, cap) => Morfo.registra(Morfo.entrada(l, f, c), cap);
  E('puella', '-ae f', 'n', 2); E('servus', '-ī m', 'n', 2); E('verbum', '-ī n', 'n', 3); E('rosa', '-ae f', 'n', 5); E('amāre', 'amō, -āre, -āvī, -ātum', 'v', 5); E('legere', 'legō, -ere, lēgī, lēctum', 'v', 10);
  E('esse', 'sum, esse, fuī', 'v', 1); E('bonus', '-a, -um', 'adj', 4); E('hortārī', 'hortor, -ārī, -ātus sum', 'v', 16); E('vidēre', 'videō, -ēre, vīdī, vīsum', 'v', 3);
}
carga();
const lecturas = (f, o) => Morfo.analiza(f, o).map(r => `${r.lema}:${r.etiqueta}`).sort();
function lee(f, quiero, opts) {
  total++;
  const o = lecturas(f, opts), e = quiero.slice().sort();
  const ok = e.length === o.length && e.every((x, i) => x === o[i]);
  if (!ok) { fallos++; console.log(`✗ analiza(${f}): esperaba [${e.join(', ')}] y salió [${o.join(', ')}]`); }
}
lee('puellae', ['puella:gen.sg', 'puella:dat.sg', 'puella:nom.pl', 'puella:voc.pl', 'puella:loc.sg']);
lee('puellam', ['puella:acc.sg']);
lee('puellā', ['puella:abl.sg']);
lee('puella', ['puella:nom.sg', 'puella:voc.sg']);
lee('puellas', ['puella:acc.pl'], { sinMacrones: true });
lee('puellīs', ['puella:dat.pl', 'puella:abl.pl', 'puella:loc.pl']);
lee('Iūliam', []);
lee('servī', ['servus:gen.sg', 'servus:nom.pl', 'servus:voc.pl', 'servus:loc.sg']);
lee('verba', ['verbum:nom.pl', 'verbum:acc.pl', 'verbum:voc.pl']);
lee('est', ['esse:3sg.pres.ind.act']);
lee('amat', ['amāre:3sg.pres.ind.act']);
lee('amāt', ['amāre:3sg.pres.ind.act'], { sinMacrones: true });
lee('amābit', ['amāre:3sg.fut.ind.act']);
lee('amātur', ['amāre:3sg.pres.ind.pass']);
lee('amātus', ['amāre:part.perf.pass.nom.sg.m']);
lee('hortātur', ['hortārī:3sg.pres.ind.dep']);
lee('legimus', ['legere:1pl.pres.ind.act']);
lee('lēgimus', ['legere:1pl.perf.ind.act']);
lee('legimus', ['legere:1pl.pres.ind.act', 'legere:1pl.perf.ind.act'], { sinMacrones: true });
lee('legēmus', ['legere:1pl.fut.ind.act']);
lee('legit', ['legere:3sg.pres.ind.act']);
lee('legit', ['legere:3sg.pres.ind.act', 'legere:3sg.perf.ind.act'], { sinMacrones: true });
lee('vidēre', ['vidēre:inf.pres.act', 'vidēre:2sg.pres.ind.pass', 'vidēre:2sg.pres.imp.pass']);
lee('bonī', ['bonus:gen.sg.m', 'bonus:gen.sg.n', 'bonus:nom.pl.m', 'bonus:voc.pl.m']);
lee('bonae', ['bonus:gen.sg.f', 'bonus:dat.sg.f', 'bonus:nom.pl.f', 'bonus:voc.pl.f']);
lee('puellae', ['puella:nom.pl'], { hasta: 1 });
lee('puellae', ['puella:nom.pl', 'puella:gen.sg'], { hasta: 2 });

/* ───── permitido por capítulo ───── */
function perm(tag, cap, quiero, lema, formas, clase) {
  total++;
  const e = lema ? Morfo.entrada(lema, formas, clase) : undefined;
  const r = Morfo.permitido(tag, cap, e);
  if (r !== quiero) { fallos++; console.log(`✗ permitido(${tag}, cap ${cap}) = ${r}, esperaba ${quiero}`); }
}
perm('nom.pl', 1, true); perm('gen.sg', 1, false); perm('gen.sg', 2, true); perm('acc.sg', 2, false); perm('acc.sg', 3, true);
perm('dat.sg', 5, false); perm('dat.sg', 7, true); perm('abl.sg', 4, false); perm('abl.sg', 5, true); perm('acc.pl', 4, false); perm('acc.pl', 5, true);
perm('3sg.pres.ind.act', 2, false); perm('3sg.pres.ind.act', 3, true); perm('3pl.pres.ind.act', 4, false); perm('3pl.pres.ind.act', 5, true);
perm('1sg.pres.ind.act', 14, false); perm('1sg.pres.ind.act', 15, true); perm('3sg.pres.ind.pass', 5, false); perm('3sg.pres.ind.pass', 6, true); perm('1sg.pres.ind.pass', 16, false); perm('1sg.pres.ind.pass', 17, true);
perm('3sg.impf.ind.act', 18, false); perm('3sg.impf.ind.act', 19, true); perm('3sg.fut.ind.act', 19, false); perm('3sg.fut.ind.act', 20, true); perm('3sg.perf.ind.act', 20, false); perm('3sg.perf.ind.act', 21, true);
perm('3sg.pres.subj.act', 26, false); perm('3sg.pres.subj.act', 27, true); perm('3sg.impf.subj.act', 27, false); perm('3sg.impf.subj.act', 28, true); perm('3sg.plpf.subj.act', 32, false); perm('3sg.plpf.subj.act', 33, true);
perm('2sg.pres.imp.act', 3, false); perm('2sg.pres.imp.act', 4, true); perm('2pl.pres.imp.act', 4, false); perm('2pl.pres.imp.act', 5, true);
perm('inf.pres.act', 9, false); perm('inf.pres.act', 10, true); perm('inf.fut.act', 22, false); perm('inf.fut.act', 23, true); perm('3sg.plpf.ind.act', 23, false); perm('3sg.plpf.ind.act', 24, true);
perm('nom.sg', 8, false, 'pāstor', '-ōris m', 'n') ; /* 3.ª declinación: nom.sg se ve desde el cap. 9 */
perm('nom.sg', 9, true, 'pāstor', '-ōris m', 'n'); perm('nom.sg', 10, false, 'corpus', '-oris n', 'n'); perm('nom.sg', 11, true, 'corpus', '-oris n', 'n');
perm('nom.sg', 11, false, 'manus', '-ūs f', 'n'); perm('nom.sg', 12, true, 'manus', '-ūs f', 'n'); perm('nom.sg', 12, false, 'diēs', '-ēī m', 'n'); perm('nom.sg', 13, true, 'diēs', '-ēī m', 'n');
perm('nom.sg.m', 11, false, 'fortis', '-e', 'adj'); perm('nom.sg.m', 12, true, 'fortis', '-e', 'adj'); perm('comp.nom.sg.m', 11, false, 'bonus', '-a, -um', 'adj'); perm('comp.nom.sg.m', 12, true, 'bonus', '-a, -um', 'adj');
perm('sup.nom.sg.m', 12, false, 'bonus', '-a, -um', 'adj'); perm('sup.nom.sg.m', 13, true, 'bonus', '-a, -um', 'adj');
perm('part.pres.act.nom.sg.m', 13, false, 'amāre', 'amō, -āre, -āvī, -ātum', 'v'); perm('part.pres.act.nom.sg.m', 14, true, 'amāre', 'amō, -āre, -āvī, -ātum', 'v');
perm('3sg.pres.ind.dep', 15, false, 'hortārī', 'hortor, -ārī, -ātus sum', 'v'); perm('3sg.pres.ind.dep', 16, true, 'hortārī', 'hortor, -ārī, -ātus sum', 'v');
perm('3sg.pres.ind.act', 1, true, 'esse', 'sum, esse, fuī', 'v'); perm('1sg.pres.ind.act', 14, false, 'esse', 'sum, esse, fuī', 'v');
{ /* un ejercicio del cap. V nunca pide un dativo, y uno del XVIII nunca un subjuntivo: ninguna etiqueta del léxico lo cuela */
  total++;
  const f = Morfo.formas(Morfo.entrada('puella', '-ae f', 'n')), v = Morfo.formas(Morfo.entrada('amāre', 'amō, -āre, -āvī, -ātum', 'v'));
  const malos = Object.keys(f).filter(t => Morfo.permitido(t, 5) && /^dat\./.test(t)).concat(Object.keys(v).filter(t => Morfo.permitido(t, 18) && /\.subj\./.test(t)));
  if (malos.length) { fallos++; console.log('✗ permitido deja pasar:', malos.join(', ')); }
}

console.log(fallos ? `\n${fallos} fallos de ${total} comprobaciones` : `\n✓ ${total} comprobaciones, todas bien`);
process.exit(fallos ? 1 : 0);

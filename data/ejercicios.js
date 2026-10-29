/* Banco de ejercicios de Lingua Latina. Todas las frases son originales y usan solo vocabulario de capítulos ≤ al del ejercicio
   (más los nombres propios de NOMBRES). El motor (ejercicios.js) comprueba cada forma marcada contra morfo.js, así que nada queda mal corregido.

   Tipos escritos a mano (los demás los genera el motor: tabla, forma, analiza, significado):
     term   Completa la terminación (tipo Pensum A).  t: frase con huecos «raíz{fin:lema.etiqueta}»   Mārc{us:Mārcus.nom.sg}
     falta  Palabra que falta (tipo Pensum B).        t: frase con «___» · r: [lema, etiqueta] · o: [lemas distractores]
     trans  Transforma la frase.                      orden: consigna · de: frase dada · a: frase esperada (el orden de palabras es libre)
   Etiquetas: caso.número[.género] para nombres y adjetivos; persona.número.tiempo.modo.voz para verbos (ver morfo.js). */
const NOMBRES = [ /* [capítulo en que aparece, nombre, formas] */
  [1, 'Rōma', '-ae f'], [1, 'Italia', '-ae f'], [1, 'Graecia', '-ae f'], [1, 'Hispānia', '-ae f'], [1, 'Gallia', '-ae f'], [1, 'Germānia', '-ae f'], [1, 'Britannia', '-ae f'],
  [1, 'Syria', '-ae f'], [1, 'Arabia', '-ae f'], [1, 'Āfrica', '-ae f'], [1, 'Asia', '-ae f'], [1, 'Eurōpa', '-ae f'], [1, 'Corsica', '-ae f'], [1, 'Sardinia', '-ae f'], [1, 'Sicilia', '-ae f'],
  [1, 'Melita', '-ae f'], [1, 'Crēta', '-ae f'], [1, 'Sparta', '-ae f'], [1, 'Capua', '-ae f'], [1, 'Aegyptus', '-ī f'], [1, 'Cyprus', '-ī f'], [1, 'Rhodus', '-ī f'],
  [1, 'Rhēnus', '-ī m'], [1, 'Nīlus', '-ī m'], [1, 'Dānuvius', '-ī m'], [1, 'Padus', '-ī m'], [1, 'Tusculum', '-ī n'], [1, 'Brundisium', '-ī n'], [1, 'Tarentum', '-ī n'], [1, 'Delphī', '-ōrum m pl'],
  [1, 'Tiberis', '-is m'],
  [2, 'Iūlius', '-ī m'], [2, 'Aemilia', '-ae f'], [2, 'Mārcus', '-ī m'], [2, 'Quīntus', '-ī m'], [2, 'Iūlia', '-ae f'], [2, 'Dāvus', '-ī m'], [2, 'Mēdus', '-ī m'], [2, 'Lydia', '-ae f'], [2, 'Syra', '-ae f'], [2, 'Dēlia', '-ae f']
];

const BANCO = [
  /* ───── Capítulo I ───── */
  { cap: 1, tipo: 'term', t: 'Padus fluvi{us:fluvius.nom.sg} magn{us:magnus.nom.sg.m} est.' },
  { cap: 1, tipo: 'term', t: 'Padus et Tiberis fluvi{ī:fluvius.nom.pl} sunt.' },
  { cap: 1, tipo: 'term', t: 'Cyprus īnsul{a:īnsula.nom.sg} magn{a:magnus.nom.sg.f} est.' },
  { cap: 1, tipo: 'term', t: 'Cyprus et Crēta īnsul{ae:īnsula.nom.pl} magn{ae:magnus.nom.pl.f} sunt.' },
  { cap: 1, tipo: 'term', t: 'Capua oppid{um:oppidum.nom.sg} magn{um:magnus.nom.sg.n} est.' },
  { cap: 1, tipo: 'term', t: 'Capua et Tarentum oppid{a:oppidum.nom.pl} magn{a:magnus.nom.pl.n} sunt.' },
  { cap: 1, tipo: 'term', t: 'Sicilia īnsul{a:īnsula.nom.sg} Rōmān{a:Rōmānus.nom.sg.f} est.' },
  { cap: 1, tipo: 'term', t: 'In Graeciā multa oppid{a:oppidum.nom.pl} Graec{a:Graecus.nom.pl.n} sunt.' },
  { cap: 1, tipo: 'term', t: 'Rhēnus nōn fluvi{us:fluvius.nom.sg} parv{us:parvus.nom.sg.m}, sed magn{us:magnus.nom.sg.m} est.' },
  { cap: 1, tipo: 'term', t: 'Gallia et Hispānia prōvinci{ae:prōvincia.nom.pl} Rōmān{ae:Rōmānus.nom.pl.f} sunt.' },
  { cap: 1, tipo: 'falta', t: 'Padus ___ est, nōn īnsula.', r: ['fluvius', 'nom.sg'], o: ['oppidum', 'prōvincia'] },
  { cap: 1, tipo: 'falta', t: 'Cyprus ___ est, nōn oppidum.', r: ['īnsula', 'nom.sg'], o: ['fluvius', 'littera'] },
  { cap: 1, tipo: 'falta', t: 'Estne Capua īnsula? Capua nōn īnsula, sed ___ est.', r: ['oppidum', 'nom.sg'], o: ['fluvius', 'ōceanus'] },
  { cap: 1, tipo: 'falta', t: 'Gallia ___ Rōmāna est.', r: ['prōvincia', 'nom.sg'], o: ['ōceanus', 'fluvius'] },
  { cap: 1, tipo: 'falta', t: 'Ūnus, duo, ___ numerī sunt.', r: ['trēs', 'nom.pl.m'], o: ['sex', 'mīlle'] },
  { cap: 1, tipo: 'falta', t: 'Tiberis nōn magnus, sed ___ fluvius est.', r: ['parvus', 'nom.sg.m'], o: ['magnus', 'Graecus'] },
  { cap: 1, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Īnsula magna est.', a: 'Īnsulae magnae sunt.' },
  { cap: 1, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Estne fluvius magnus?', a: 'Suntne fluviī magnī?' },
  { cap: 1, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Oppidum Graecum nōn est.', a: 'Oppida Graeca nōn sunt.' },
  { cap: 1, tipo: 'trans', orden: 'Pasa la frase al singular.', de: 'Suntne prōvinciae parvae?', a: 'Estne prōvincia parva?' },

  /* ───── Capítulo II ───── */
  { cap: 2, tipo: 'term', t: 'Mārcus fīlius Iūl{ī:Iūlius.gen.sg} est.' },
  { cap: 2, tipo: 'term', t: 'Iūlia fīlia Aemili{ae:Aemilia.gen.sg} est.' },
  { cap: 2, tipo: 'term', t: 'Dāvus serv{us:servus.nom.sg} Iūl{ī:Iūlius.gen.sg} est.' },
  { cap: 2, tipo: 'term', t: 'Lydia ancill{a:ancilla.nom.sg} Aemili{ae:Aemilia.gen.sg} est.' },
  { cap: 2, tipo: 'term', t: 'Iūlius dominus serv{ōrum:servus.gen.pl} est.' },
  { cap: 2, tipo: 'term', t: 'Aemilia domina ancill{ārum:ancilla.gen.pl} est.' },
  { cap: 2, tipo: 'term', t: 'Quīntus et Mārcus līberī Iūl{ī:Iūlius.gen.sg} sunt.' },
  { cap: 2, tipo: 'term', t: 'Quīntus fīli{us:fīlius.nom.sg} me{us:meus.nom.sg.m} est.' },
  { cap: 2, tipo: 'term', t: 'Iūlia fīli{a:fīlia.nom.sg} me{a:meus.nom.sg.f} est.' },
  { cap: 2, tipo: 'term', t: 'Numerus puell{ārum:puella.gen.pl} magnus est.' },
  { cap: 2, tipo: 'term', t: 'Quis est pater puer{ī:puer.gen.sg}? Iūlius pater Mārc{ī:Mārcus.gen.sg} est.' },
  { cap: 2, tipo: 'term', t: 'Titulus lib{rī:liber.gen.sg} novus est.' },
  { cap: 2, tipo: 'falta', t: 'Iūlius ___ Mārcī est.', r: ['pater', 'nom.sg'], o: ['māter', 'fīlia'] },
  { cap: 2, tipo: 'falta', t: 'Iūlia Iūliī et Aemiliae ___ est.', r: ['fīlia', 'nom.sg'], o: ['fīlius', 'domina'] },
  { cap: 2, tipo: 'falta', t: 'Dāvus servus est; Iūlius ___ servī est.', r: ['dominus', 'nom.sg'], o: ['pater', 'puer'] },
  { cap: 2, tipo: 'falta', t: 'Iūlius vir est, Aemilia ___ est.', r: ['fēmina', 'nom.sg'], o: ['puer', 'liber'] },
  { cap: 2, tipo: 'falta', t: 'Mārcus puer est, Iūlia ___ est.', r: ['puella', 'nom.sg'], o: ['servus', 'fīlius'] },
  { cap: 2, tipo: 'falta', t: 'Numerus servōrum ___ est: centum.', r: ['magnus', 'nom.sg.m'], o: ['parvus', 'novus'] },
  { cap: 2, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Fīlius Iūliī puer est.', a: 'Fīliī Iūliī puerī sunt.' },
  { cap: 2, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Ancilla Aemiliae fēmina est.', a: 'Ancillae Aemiliae fēminae sunt.' },
  { cap: 2, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Liber meus magnus est.', a: 'Librī meī magnī sunt.' },
  { cap: 2, tipo: 'trans', orden: 'Di lo mismo con otras palabras: ahora el sujeto es el padre.', de: 'Mārcus fīlius Iūliī est.', a: 'Iūlius pater Mārcī est.' },

  /* ───── Capítulo III ───── */
  { cap: 3, tipo: 'term', t: 'Mārcus Iūli{am:Iūlia.acc.sg} vocat.' },
  { cap: 3, tipo: 'term', t: 'Iūlia Mārc{um:Mārcus.acc.sg} audit.' },
  { cap: 3, tipo: 'term', t: 'Puer ancill{am:ancilla.acc.sg} vocat.' },
  { cap: 3, tipo: 'term', t: 'Pater fīli{um:fīlius.acc.sg} audit.' },
  { cap: 3, tipo: 'term', t: 'Puella puer{um:puer.acc.sg} vid{et:vidēre.3sg.pres.ind.act}.' },
  { cap: 3, tipo: 'term', t: 'Mamma Mārcum voc{at:vocāre.3sg.pres.ind.act}.' },
  { cap: 3, tipo: 'term', t: 'Puer plōr{at:plōrāre.3sg.pres.ind.act}, sed Iūlia rīd{et:rīdēre.3sg.pres.ind.act}.' },
  { cap: 3, tipo: 'term', t: 'Quis dorm{it:dormīre.3sg.pres.ind.act}? Dāvus dorm{it:dormīre.3sg.pres.ind.act}.' },
  { cap: 3, tipo: 'term', t: 'Iūli{a:Iūlia.nom.sg} Mārcum puls{at:pulsāre.3sg.pres.ind.act}.' },
  { cap: 3, tipo: 'term', t: 'Iūli{us:Iūlius.nom.sg} serv{um:servus.acc.sg} voc{at:vocāre.3sg.pres.ind.act}.' },
  { cap: 3, tipo: 'term', t: 'Dāvus domin{um:dominus.acc.sg} aud{it:audīre.3sg.pres.ind.act}.' },
  { cap: 3, tipo: 'term', t: 'Aemili{a:Aemilia.nom.sg} Iūli{am:Iūlia.acc.sg} nōn verber{at:verberāre.3sg.pres.ind.act}.' },
  { cap: 3, tipo: 'term', t: 'Mārcus cant{at:cantāre.3sg.pres.ind.act}; Iūlia Mārc{um:Mārcus.acc.sg} aud{it:audīre.3sg.pres.ind.act}.' },
  { cap: 3, tipo: 'falta', t: 'Mārcus nōn laetus, sed ___ est.', r: ['īrātus', 'nom.sg.m'], o: ['calidus', 'Graecus'] },
  { cap: 3, tipo: 'falta', t: 'Puer ___ est: Iūliam verberat.', r: ['improbus', 'nom.sg.m'], o: ['probus', 'laetus'] },
  { cap: 3, tipo: 'falta', t: 'Mārcus, Iūlia, Aemilia ___ in scaenā sunt.', r: ['persōna', 'nom.pl'], o: ['verbum', 'numerus'] },
  { cap: 3, tipo: 'falta', t: 'Cūr Mārcus plōrat? ___ īrātus est.', r: ['quia', ''], o: ['cūr', 'ubi'] },
  { cap: 3, tipo: 'falta', t: 'Mamma Mārcum audit: ___ Mārcī est.', r: ['māter', 'nom.sg'], o: ['fīlia', 'ancilla'] },
  { cap: 3, tipo: 'falta', t: '“Iūlia Mārcum vocat”: ‘Iūlia’ est ___, ‘Mārcum’ est accūsātīvus.', r: ['nōminātīvus', 'nom.sg'], o: ['verbum', 'genetīvus'] },
  { cap: 3, tipo: 'trans', orden: 'Cambia los papeles: ahora Marco es quien llama.', de: 'Iūlia Mārcum vocat.', a: 'Mārcus Iūliam vocat.' },
  { cap: 3, tipo: 'trans', orden: 'Cambia los papeles.', de: 'Puer ancillam audit.', a: 'Ancilla puerum audit.' },
  { cap: 3, tipo: 'trans', orden: 'Conviértela en pregunta con -ne.', de: 'Mārcus dormit.', a: 'Dormitne Mārcus?' },
  { cap: 3, tipo: 'trans', orden: 'Cambia los papeles.', de: 'Iūlius servum vocat.', a: 'Servus Iūlium vocat.' }
];
BANCO.forEach((e, i) => { e.id = `${e.cap}-${e.tipo}${String(i + 1).padStart(2, '0')}`; });
if (typeof module !== 'undefined' && module.exports) module.exports = { BANCO, NOMBRES };

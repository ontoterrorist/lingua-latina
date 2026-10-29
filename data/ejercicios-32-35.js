/* Capítulos XXXII–XXXV: regla, ejemplo, consejo, tablas y banco de ejercicios (ver data/ejercicios.js para el formato).
   Usa P6, VERBOS_BASE y VERBOS_SUBJ de los archivos anteriores. */
[
  [32, {
    regla: ['El subjuntivo perfecto se forma con la raíz del perfecto + -erim, -erīs, -erit, -erīmus, -erītis, -erint: amāverim, vīderim, fēcerim; el de esse es fuerim. Aparece en preguntas indirectas cuando la acción es anterior al verbo principal: Rogō quid fēcerīs (pregunto qué has hecho).',
      'La prohibición con la 2.ª persona se expresa con nē + subjuntivo perfecto, igual que nōlī + infinitivo: Nē timuerīs! = Nōlī timēre! («¡no tengas miedo!»).'],
    ejemplo: { la: 'Classis Rōmāna ad īnsulam nāvigāvit. Dux rogat: “Quis hostēs vīderit?” Nē timuerītis, mīlitēs!', es: 'La flota romana navegó a la isla. El jefe pregunta: «¿Quién habrá visto a los enemigos?» ¡No temáis, soldados!' },
    consejo: 'Subjuntivo perfecto = raíz del perfecto + -erim, -erīs… (amāv-erim). Prohibición: nē + subjuntivo perfecto (nē timuerīs) = nōlī timēre. Se usa sobre todo con la 2.ª persona.',
    tablas: [{ lemas: VERBOS_SUBJ, etiquetas: P6('perf.subj.act') }, { lemas: VERBOS_SUBJ, etiquetas: ['1sg.perf.ind.act', '1sg.perf.subj.act'] }],
    pares: [['1sg.perf.ind.act', '1sg.perf.subj.act'], ['2sg.futperf.ind.act', '2sg.perf.subj.act'], ['3sg.perf.ind.act', '3sg.perf.subj.act']]
  }],
  [33, {
    regla: ['El subjuntivo pluscuamperfecto se forma con la raíz del perfecto + -issem, -issēs, -isset, -issēmus, -issētis, -issent: amāvissem, vīdissem, fuissem. Con sī expresa la condición irreal del pasado: Sī mīlitēs vēnissent, hostēs vīcissent (si los soldados hubieran venido, habrían vencido).',
      'La condición irreal del presente usa el imperfecto de subjuntivo: Sī adesset, laetus essem (si estuviera, estaría contento). Nisi significa «si no».'],
    ejemplo: { la: 'Sī ducem audīvissēmus, hostēs vīcissēmus. Nisi mīlitēs fortiter pugnāvissent, exercitus victus esset.', es: 'Si hubiéramos oído al jefe, habríamos vencido a los enemigos. Si los soldados no hubieran luchado con valentía, el ejército habría sido derrotado.' },
    consejo: 'Sī + subjuntivo pluscuamperfecto en las dos mitades = «si hubiera… habría…». Los dos verbos llevan -issem: sī audīvissem, vīcissem.',
    tablas: [{ lemas: VERBOS_SUBJ, etiquetas: P6('plpf.subj.act') }, { lemas: VERBOS_SUBJ, etiquetas: ['3sg.plpf.ind.act', '3sg.plpf.subj.act'] }],
    pares: [['3sg.plpf.ind.act', '3sg.plpf.subj.act'], ['3sg.impf.subj.act', '3sg.plpf.subj.act'], ['3sg.perf.ind.act', '3sg.plpf.subj.act']]
  }],
  [34, {
    estricto: true,
    regla: ['Cada sílaba latina es larga o breve. Es larga por naturaleza si su vocal es larga (lleva macrón) o es un diptongo (ae, au, oe); es larga por posición si una vocal breve va seguida de dos consonantes; en los demás casos es breve. El macrón es la pista principal: puella (nominativo) y puellā (ablativo) son palabras distintas.',
      'La poesía latina clásica no cuenta sílabas ni usa rima: mide cantidades. El hexámetro tiene seis pies, dáctilos (– ∪ ∪) o espondeos (– –); el pentámetro se une a él en el dístico elegíaco. En este capítulo se corrige también el macrón: la cantidad forma parte de la palabra.'],
    ejemplo: { la: 'Rōma. Puella. Amīcus.', es: 'Rō-ma (– ∪) · pu-el-la (∪ – ∪) · a-mī-cus (∪ – ∪): la sílaba larga puede ser larga por naturaleza (Rō-, -mī-) o por posición (-el-).' },
    consejo: 'Para saber si una sílaba es larga: ¿tiene macrón o diptongo? ¿hay dos consonantes después de su vocal? Si no, es breve. Por eso aquí el macrón cuenta: puella ≠ puellā, vēnit ≠ venit.',
    tablas: [{ lemas: ['puella', 'rosa', 'via', 'vīlla', 'porta', 'aqua', 'ancilla'], etiquetas: ['nom.sg', 'acc.sg', 'abl.sg', 'nom.pl'] }, { lemas: ['manus', 'exercitus', 'impetus'], etiquetas: ['nom.sg', 'gen.sg', 'acc.sg', 'abl.sg'] }],
    pares: [['nom.sg', 'abl.sg'], ['nom.sg', 'gen.sg'], ['nom.sg', 'acc.sg']]
  }],
  [35, {
    regla: ['Repaso. Las partes de la oración latina son el nombre, el adjetivo, el pronombre, el verbo, el adverbio, la preposición, la conjunción y la interjección. Los nombres se declinan en cinco declinaciones y seis casos (nominativo, genitivo, dativo, acusativo, ablativo y vocativo; además, el locativo); los verbos se conjugan en cuatro conjugaciones.',
      'Para analizar una frase: 1) busca el verbo y su persona; 2) busca el sujeto (nominativo); 3) busca los objetos (acusativo, dativo) y las circunstancias (ablativo); 4) comprueba que los adjetivos concuerden con sus nombres.'],
    ejemplo: { la: 'Magister puerīs librōs dat. Puerī librōs legunt. Mārcus librum bonum amat.', es: 'El maestro da libros a los niños. Los niños leen los libros. A Marco le gusta el libro bueno.' },
    consejo: 'Antes de traducir una frase latina pregúntate: ¿quién hace la acción (nominativo)? ¿a quién o qué le afecta (acusativo, dativo)? ¿con qué o dónde (ablativo)? La terminación responde; el orden no.',
    tablas: [{ lemas: ['puella', 'servus', 'verbum', 'pāstor', 'corpus', 'manus', 'diēs', 'mare'], etiquetas: ['nom.sg', 'gen.sg', 'dat.sg', 'acc.sg', 'abl.sg', 'nom.pl', 'gen.pl', 'acc.pl'] }, { lemas: ['amāre', 'vidēre', 'legere', 'audīre', 'capere'], etiquetas: P6('pres.ind.act') }, { lemas: ['amāre', 'vidēre', 'legere', 'audīre'], etiquetas: ['3sg.pres.ind.act', '3sg.impf.ind.act', '3sg.fut.ind.act', '3sg.perf.ind.act', '3sg.plpf.ind.act', '3sg.futperf.ind.act'] }],
    pares: [['nom.sg', 'gen.pl'], ['nom.sg', 'abl.pl'], ['3sg.pres.ind.act', '3sg.impf.ind.act'], ['3sg.pres.ind.act', '3sg.perf.ind.act'], ['3sg.pres.ind.act', '3sg.pres.ind.pass'], ['3sg.pres.ind.act', '3sg.pres.subj.act'], ['nom.sg.m', 'comp.nom.sg.m']]
  }]
].forEach(([n, d]) => Object.assign(CAPITULOS[n - 1], d));

BANCO.push(
  /* ───── XXXII ───── */
  { cap: 32, tipo: 'term', t: 'Rogō quis hostēs vīd{erit:vidēre.3sg.perf.subj.act}.' },
  { cap: 32, tipo: 'term', t: 'Dux rogat quid nautae fēc{erint:facere.3pl.perf.subj.act}.' },
  { cap: 32, tipo: 'term', t: 'Nē tim{uerīs:timēre.2sg.perf.subj.act}, mīles!' },
  { cap: 32, tipo: 'term', t: 'Nē fūg{erīs:fugere.2sg.perf.subj.act}, mīles!' },
  { cap: 32, tipo: 'term', t: 'Rogō utrum nāvēs vēn{erint:venīre.3pl.perf.subj.act}.' },
  { cap: 32, tipo: 'term', t: 'Nesciō quid fēc{erim:facere.1sg.perf.subj.act}.' },
  { cap: 32, tipo: 'term', t: 'Rogō quid tū dīx{erīs:dīcere.2sg.perf.subj.act}.' },
  { cap: 32, tipo: 'term', t: 'Rogāmus quid nōs aud{īverīmus:audīre.1pl.perf.subj.act}.' },
  { cap: 32, tipo: 'term', t: 'Rogātis quid vōs vīd{erītis:vidēre.2pl.perf.subj.act}.' },
  { cap: 32, tipo: 'term', t: 'Classis ad īnsulam nāvigā{vit:nāvigāre.3sg.perf.ind.act}.' },
  { cap: 32, tipo: 'falta', t: 'Dux rogat quis hostēs ___.', r: ['vidēre', '3sg.perf.subj.act'], o: ['vidēre:3sg.perf.ind.act', 'vidēre:3sg.pres.ind.act'] },
  { cap: 32, tipo: 'falta', t: '___ timueris, mīles!', r: ['nē', ''], o: ['ut', 'nōn'] },
  { cap: 32, tipo: 'falta', t: 'Rogō quid tū ___.', r: ['facere', '2sg.perf.subj.act'], o: ['facere:2sg.perf.ind.act', 'facere:2sg.pres.ind.act'] },
  { cap: 32, tipo: 'trans', orden: 'Exprésalo como prohibición con nē + subjuntivo perfecto.', de: 'Nōlī timēre, mīles!', a: 'Nē timuerīs, mīles!' },
  { cap: 32, tipo: 'trans', orden: 'Exprésalo como prohibición con nē + subjuntivo perfecto.', de: 'Nōlī fugere!', a: 'Nē fūgerīs!' },
  { cap: 32, tipo: 'trans', orden: 'Pásalo a pregunta indirecta (subjuntivo perfecto).', de: 'Dux rogat: “Quis hostēs vīdit?”', a: 'Dux rogat quis hostēs vīderit.' },

  /* ───── XXXIII ───── */
  { cap: 33, tipo: 'term', t: 'Sī ducem aud{īvissēmus:audīre.1pl.plpf.subj.act}, hostēs vīcissēmus.' },
  { cap: 33, tipo: 'term', t: 'Nisi mīlitēs fortiter pugnā{vissent:pugnāre.3pl.plpf.subj.act}, exercitus victus esset.' },
  { cap: 33, tipo: 'term', t: 'Sī mīlitēs vē{nissent:venīre.3pl.plpf.subj.act}, hostēs vīcissent.' },
  { cap: 33, tipo: 'term', t: 'Sī dux aff{uisset:adesse.3sg.plpf.subj.act}, mīlitēs nōn fūgissent.' },
  { cap: 33, tipo: 'term', t: 'Sī tū ibi fu{issēs:esse.2sg.plpf.subj.act}, hostēs vīdissēs.' },
  { cap: 33, tipo: 'term', t: 'Sī ego ibi fu{issem:esse.1sg.plpf.subj.act}, tē adiūvissem.' },
  { cap: 33, tipo: 'term', t: 'Sī vōs ducem aud{īvissētis:audīre.2pl.plpf.subj.act}, vīcissētis.' },
  { cap: 33, tipo: 'term', t: 'Sī adesset, laetus ess{em:esse.1sg.impf.subj.act}.' },
  { cap: 33, tipo: 'term', t: 'Nisi ducem vīd{issēmus:vidēre.1pl.plpf.subj.act}, nōn pugnāvissēmus.' },
  { cap: 33, tipo: 'term', t: 'Mīlitēs in castr{īs:castra.abl.pl} sunt.' },
  { cap: 33, tipo: 'falta', t: 'Sī mīlitēs fortiter pugnāvissent, hostēs ___.', r: ['vincere', '3pl.plpf.subj.act'], o: ['vincere:3pl.impf.subj.act', 'vincere:3pl.perf.ind.act'] },
  { cap: 33, tipo: 'falta', t: '___ mīlitēs fortiter pugnāvissent, exercitus victus esset.', r: ['nisi', ''], o: ['sī', 'dum'] },
  { cap: 33, tipo: 'falta', t: 'Sī adesset, laetus ___.', r: ['esse', '1sg.impf.subj.act'], o: ['esse:1sg.pres.ind.act', 'esse:1sg.plpf.subj.act'] },
  { cap: 33, tipo: 'trans', orden: 'Imagina que no ocurrió: condición irreal del pasado.', de: 'Ducem audīvimus; hostēs vīcimus.', a: 'Sī ducem audīvissēmus, hostēs vīcissēmus.' },
  { cap: 33, tipo: 'trans', orden: 'Imagina que no ocurrió: condición irreal del pasado.', de: 'Mīlitēs fortiter pugnāvērunt; hostēs fūgērunt.', a: 'Sī mīlitēs fortiter pugnāvissent, hostēs fūgissent.' },
  { cap: 33, tipo: 'trans', orden: 'Condición irreal del presente (imperfecto de subjuntivo).', de: 'Dux adest; laetī sumus.', a: 'Sī dux adesset, laetī essēmus.' },

  /* ───── XXXIV (se corrige también el macrón) ───── */
  { cap: 34, tipo: 'term', t: 'Rosa est; cum ros{ā:rosa.abl.sg} Iūlia ambulat.' },
  { cap: 34, tipo: 'term', t: 'Puell{a:puella.nom.sg} cantat; cum puell{ā:puella.abl.sg} Mārcus ambulat.' },
  { cap: 34, tipo: 'term', t: 'Dominus serv{ōs:servus.acc.pl} vocat.' },
  { cap: 34, tipo: 'term', t: 'Mārcus vēn{it:venīre.3sg.perf.ind.act}; Iūlia ven{it:venīre.3sg.pres.ind.act}.' },
  { cap: 34, tipo: 'term', t: 'Hic puer lēg{it:legere.3sg.perf.ind.act}; ille leg{it:legere.3sg.pres.ind.act}.' },
  { cap: 34, tipo: 'term', t: 'In di{ē:diēs.abl.sg} longō Mārcus ambulat.' },
  { cap: 34, tipo: 'term', t: 'Pars man{ūs:manus.gen.sg} est.' },
  { cap: 34, tipo: 'term', t: 'Man{us:manus.nom.sg} magna est.' },
  { cap: 34, tipo: 'term', t: 'Iūlia ad vīll{am:vīlla.acc.sg} it; in vīll{ā:vīlla.abl.sg} manet.' },
  { cap: 34, tipo: 'term', t: 'Puerī in hort{ō:hortus.abl.sg} sunt; hort{us:hortus.nom.sg} magnus est.' },
  { cap: 34, tipo: 'falta', t: 'Mārcus cum ___ ambulat.', r: ['puella', 'abl.sg'], o: ['puella:nom.sg', 'puella:acc.sg'] },
  { cap: 34, tipo: 'falta', t: 'Pars ___ est.', r: ['manus', 'gen.sg'], o: ['manus:nom.sg', 'manus:acc.sg'] },
  { cap: 34, tipo: 'falta', t: 'In ___ longō Mārcus venit.', r: ['diēs', 'abl.sg'], o: ['diēs:nom.sg', 'diēs:acc.sg'] },
  { cap: 34, tipo: 'trans', orden: 'Di que Marco camina con la niña (cum + ablativo).', de: 'Mārcus ambulat.', a: 'Mārcus cum puellā ambulat.' },
  { cap: 34, tipo: 'trans', orden: 'Di que Julia pasea con la esclava.', de: 'Iūlia ambulat.', a: 'Iūlia cum ancillā ambulat.' },
  { cap: 34, tipo: 'trans', orden: 'Ponlo en perfecto (¡cuidado con la cantidad!).', de: 'Mārcus venit.', a: 'Mārcus vēnit.' },

  /* ───── XXXV ───── */
  { cap: 35, tipo: 'term', t: 'Magister puer{īs:puer.dat.pl} librōs dat.' },
  { cap: 35, tipo: 'term', t: 'Puerī librōs leg{unt:legere.3pl.pres.ind.act}.' },
  { cap: 35, tipo: 'term', t: 'Mārcus librum bon{um:bonus.acc.sg.m} am{at:amāre.3sg.pres.ind.act}.' },
  { cap: 35, tipo: 'term', t: 'Iūlia in vīll{ā:vīlla.abl.sg} cum Aemili{ā:Aemilia.abl.sg} habitat.' },
  { cap: 35, tipo: 'term', t: 'Dominus serv{ōs:servus.acc.pl} in hort{ō:hortus.abl.sg} vocat.' },
  { cap: 35, tipo: 'term', t: 'Pāstōr{ēs:pāstor.nom.pl} ovēs in collibus vident.' },
  { cap: 35, tipo: 'term', t: 'Exercit{ūs:exercitus.gen.sg} dux fortis est.' },
  { cap: 35, tipo: 'term', t: 'Cum nāvis ad portum vēn{isset:venīre.3sg.plpf.subj.act}, nautae laetī erant.' },
  { cap: 35, tipo: 'term', t: 'Mīlitēs fortiter pugn{āvērunt:pugnāre.3pl.perf.ind.act}.' },
  { cap: 35, tipo: 'term', t: 'Ōrō ut tū mē aud{iās:audīre.2sg.pres.subj.act}.' },
  { cap: 35, tipo: 'term', t: 'Puella ā magistrō laud{ātur:laudāre.3sg.pres.ind.pass}.' },
  { cap: 35, tipo: 'term', t: 'Iūlius pauper er{at:esse.3sg.impf.ind.act}, nunc dīves es{t:esse.3sg.pres.ind.act}.' },
  { cap: 35, tipo: 'falta', t: 'Magister ___ librōs dat.', r: ['puer', 'dat.pl'], o: ['puer:nom.pl', 'puer:acc.pl'] },
  { cap: 35, tipo: 'falta', t: 'Servī dominum ___.', r: ['vidēre', '3pl.pres.ind.act'], o: ['vidēre:3sg.pres.ind.act', 'vidēre:1pl.pres.ind.act'] },
  { cap: 35, tipo: 'falta', t: 'Sī dux ___, mīlitēs vīcissent.', r: ['adesse', '3sg.plpf.subj.act'], o: ['adesse:3sg.impf.subj.act', 'adesse:3sg.pres.ind.act'] },
  { cap: 35, tipo: 'trans', orden: 'Cambia los papeles: ahora el señor llama.', de: 'Servus dominum vocat.', a: 'Dominus servum vocat.' },
  { cap: 35, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Puer librum legit.', a: 'Puerī librōs legunt.' },
  { cap: 35, tipo: 'trans', orden: 'Ponlo en pluscuamperfecto.', de: 'Mārcus vēnit.', a: 'Mārcus vēnerat.' }
);

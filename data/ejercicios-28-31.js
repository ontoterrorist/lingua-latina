/* Capítulos XXVIII–XXXI: regla, ejemplo, consejo, tablas y banco de ejercicios (ver data/ejercicios.js para el formato).
   Usa P6, VERBOS_BASE y VERBOS_MAS de los archivos anteriores. */
const VERBOS_SUBJ = VERBOS_BASE.concat(['capere', 'esse']);
[
  [28, {
    regla: ['El subjuntivo imperfecto se forma con el infinitivo y las terminaciones -m, -s, -t, -mus, -tis, -nt: amārem, amārēs, amāret; vidērem, legerem, caperem, audīrem; essem, essēs, esset. Aparece en subordinadas cuando el verbo principal está en pasado: Ōrāvī ut venīrēs (pedí que vinieras).',
      'El subjuntivo dubitativo es la pregunta de duda o deliberación: Quid faciam? (¿qué hago?), Quō eāmus? (¿adónde vamos?). Siempre va en subjuntivo.'],
    ejemplo: { la: 'Nauta in mare cecidit. Gubernātor clāmāvit: “Quid faciam? Nāvem servem an nautam?”', es: 'El marinero cayó al mar. El piloto gritó: «¿Qué hago? ¿Salvo la nave o al marinero?»' },
    consejo: 'Subjuntivo imperfecto = infinitivo + -m, -s, -t…: amāre → amārem; esse → essem. Y la pregunta de duda (Quid faciam?) va siempre en subjuntivo.',
    tablas: [{ lemas: VERBOS_SUBJ, etiquetas: P6('impf.subj.act') }, { lemas: VERBOS_SUBJ, etiquetas: ['3sg.impf.ind.act', '3sg.impf.subj.act'] }],
    pares: [['3sg.impf.ind.act', '3sg.impf.subj.act'], ['inf.pres.act', '3sg.impf.subj.act'], ['3sg.pres.subj.act', '3sg.impf.subj.act']]
  }],
  [29, {
    regla: ['Ut + subjuntivo expresa finalidad («para que») o petición; nē + subjuntivo, finalidad negativa o ruego negativo: Nauta ad portum it ut nāvem videat (va al puerto para ver la nave); Ōrō nē tempestās veniat (ruego que no llegue la tormenta).',
      'Cum + subjuntivo (en pasado) da la circunstancia: Cum tempestās venīret, nautae in portū manēbant (como / cuando la tormenta se acercaba, los marineros se quedaban en el puerto).'],
    ejemplo: { la: 'Nauta ad portum it ut nāvem videat. Mercātor ōrat nē tempestās veniat. Cum ventus secundus esset, nāvis proficīscēbātur.', es: 'El marinero va al puerto para ver la nave. El mercader ruega que no llegue la tormenta. Como el viento era favorable, la nave partía.' },
    consejo: 'Ut = «para que»; nē = «para que no» (más subjuntivo). Cum + subjuntivo = «cuando / como». Si ves subjuntivo en una subordinada, busca ut, nē o cum.',
    tablas: [{ lemas: VERBOS_SUBJ, etiquetas: ['3sg.pres.subj.act', '3sg.impf.subj.act'] }, { lemas: VERBOS_SUBJ, etiquetas: P6('pres.subj.act') }],
    pares: [['3sg.pres.ind.act', '3sg.pres.subj.act'], ['3sg.pres.subj.act', '3sg.impf.subj.act'], ['3pl.pres.subj.act', '3pl.impf.subj.act']]
  }],
  [30, {
    regla: ['El futuro perfecto expresa una acción futura anterior a otra futura: raíz del perfecto + -erō, -eris, -erit…: amāverō, vīderō, audīverō («habré amado»). Aparece sobre todo tras sī, ubi, cum: Sī cēnam parāverō, bene erit (si he preparado la cena, irá bien).',
      'Los adverbios en -nter salen de adjetivos en -ns (prūdēns → prūdenter). Los distributivos dicen «de tantos en tantos» o «tantos cada uno»: singulī (uno a uno), bīnī (de dos en dos), ternī (de tres en tres).'],
    ejemplo: { la: 'Hospitēs crās veniunt. Sī cēnam parāverō, bene erit. Servī bīnī vāsa portant.', es: 'Los invitados vienen mañana. Si he preparado la cena, irá bien. Los esclavos llevan las vasijas de dos en dos.' },
    consejo: 'Futuro perfecto = raíz del perfecto + -erō: amāv-erō, «habré amado». Casi siempre va tras sī, ubi o cum. Ojo: 3.ª persona amāverit es igual que el subjuntivo perfecto; decide el contexto.',
    tablas: [{ lemas: VERBOS_SUBJ, etiquetas: P6('futperf.ind.act') }, { lemas: VERBOS_SUBJ, etiquetas: ['3sg.fut.ind.act', '3sg.futperf.ind.act'] }],
    pares: [['3sg.perf.ind.act', '3sg.futperf.ind.act'], ['3sg.fut.ind.act', '3sg.futperf.ind.act'], ['1sg.perf.ind.act', '1sg.futperf.ind.act']]
  }],
  [31, {
    regla: ['El gerundivo es un adjetivo verbal en -ndus, -a, -um que expresa obligación: Vīnum emendum est (hay que comprar el vino). Concuerda con el sujeto, y la persona que debe hacerlo va en dativo (dativo de agente): Mihi cēna parāndа est… es decir, «yo tengo que preparar la cena».',
      'El subjuntivo optativo expresa un deseo con utinam: Utinam hospitēs veniant! (¡ojalá vengan!). Con el imperfecto es un deseo irreal del presente: Utinam adesset! (¡ojalá estuviera aquí!).'],
    ejemplo: { la: 'Vīnum emendum est. Servō vāsa portanda sunt. Utinam omnēs laetī sint!', es: 'Hay que comprar el vino. El esclavo tiene que llevar las vasijas. ¡Ojalá todos estén contentos!' },
    consejo: 'Gerundivo + esse = obligación: agendum est, «hay que hacerlo». El dativo dice quién debe hacerlo: mihi legendus est. Utinam + subjuntivo = ¡ojalá!',
    tablas: [{ lemas: ['amāre', 'vidēre', 'audīre', 'laudāre', 'vocāre', 'portāre', 'facere'], etiquetas: ['gdv.nom.sg.m', 'gdv.nom.sg.f', 'gdv.nom.sg.n'] }, { lemas: ['amāre', 'vidēre', 'audīre', 'laudāre', 'vocāre', 'portāre', 'facere'], etiquetas: ['inf.pres.act', 'ger.acc'] }],
    pares: [['inf.pres.act', 'gdv.nom.sg.m'], ['inf.pres.act', 'gdv.nom.sg.n'], ['ger.acc', 'gdv.nom.sg.n']]
  }]
].forEach(([n, d]) => Object.assign(CAPITULOS[n - 1], d));

BANCO.push(
  /* ───── XXVIII ───── */
  { cap: 28, tipo: 'term', t: 'Quid fac{iam:facere.1sg.pres.subj.act}?' },
  { cap: 28, tipo: 'term', t: 'Quō e{āmus:īre.1pl.pres.subj.act}?' },
  { cap: 28, tipo: 'term', t: 'Gubernātor ōrāvit ut nauta nāvem serv{āret:servāre.3sg.impf.subj.act}.' },
  { cap: 28, tipo: 'term', t: 'Ōrāvī ut tū ven{īrēs:venīre.2sg.impf.subj.act}.' },
  { cap: 28, tipo: 'term', t: 'Nauta ōrāvit ut nāvis in portum ven{īret:venīre.3sg.impf.subj.act}.' },
  { cap: 28, tipo: 'term', t: 'Ōrāvimus ut tū nōs aud{īrēs:audīre.2sg.impf.subj.act}.' },
  { cap: 28, tipo: 'term', t: 'Gubernātor ōrāvit ut nautae labōr{ārent:labōrāre.3pl.impf.subj.act}.' },
  { cap: 28, tipo: 'term', t: 'Ōrāvī ut tū laetus ess{ēs:esse.2sg.impf.subj.act}.' },
  { cap: 28, tipo: 'term', t: 'Ōrāvī ut nautae nōn tim{ērent:timēre.3pl.impf.subj.act}.' },
  { cap: 28, tipo: 'term', t: 'Nāvem serv{em:servāre.1sg.pres.subj.act}?' },
  { cap: 28, tipo: 'term', t: 'Quid dīc{am:dīcere.1sg.pres.subj.act}?' },
  { cap: 28, tipo: 'falta', t: 'Quid ___? Nāvem servem an nautam?', r: ['facere', '1sg.pres.subj.act'], o: ['facere:1sg.pres.ind.act', 'facere:inf.pres.act'] },
  { cap: 28, tipo: 'falta', t: 'Gubernātor ōrāvit ut nautae nāvem ___.', r: ['servāre', '3pl.impf.subj.act'], o: ['servāre:3pl.pres.subj.act', 'servāre:3pl.impf.ind.act'] },
  { cap: 28, tipo: 'falta', t: 'Ōrāvī ut tū ___.', r: ['venīre', '2sg.impf.subj.act'], o: ['venīre:2sg.pres.subj.act', 'venīre:2sg.pres.ind.act'] },
  { cap: 28, tipo: 'trans', orden: 'Pásalo al pasado: ōrāvī + subjuntivo imperfecto.', de: 'Ōrō ut veniās.', a: 'Ōrāvī ut venīrēs.' },
  { cap: 28, tipo: 'trans', orden: 'Pásalo al pasado: ōrāvimus + subjuntivo imperfecto.', de: 'Ōrāmus ut dominus audiat.', a: 'Ōrāvimus ut dominus audīret.' },
  { cap: 28, tipo: 'trans', orden: 'Hazlo una pregunta de duda (subjuntivo).', de: 'Quid faciō?', a: 'Quid faciam?' },

  /* ───── XXIX ───── */
  { cap: 29, tipo: 'term', t: 'Nauta ad portum it ut nāvem vid{eat:vidēre.3sg.pres.subj.act}.' },
  { cap: 29, tipo: 'term', t: 'Mercātor ōrat nē tempestās ven{iat:venīre.3sg.pres.subj.act}.' },
  { cap: 29, tipo: 'term', t: 'Ōrō nē tū ā portū discēd{ās:discēdere.2sg.pres.subj.act}.' },
  { cap: 29, tipo: 'term', t: 'Nautae nāvigant ut pecūniam hab{eant:habēre.3pl.pres.subj.act}.' },
  { cap: 29, tipo: 'term', t: 'Cum ventus secundus ess{et:esse.3sg.impf.subj.act}, nāvis proficīscēbātur.' },
  { cap: 29, tipo: 'term', t: 'Cum tempestās ven{īret:venīre.3sg.impf.subj.act}, nautae in portū manēbant.' },
  { cap: 29, tipo: 'term', t: 'Cum nautae tempestātem vid{ērent:vidēre.3pl.impf.subj.act}, timēbant.' },
  { cap: 29, tipo: 'term', t: 'Servus labōrat ut dominus laetus s{it:esse.3sg.pres.subj.act}.' },
  { cap: 29, tipo: 'term', t: 'Pāstor ovēs vocat nē lupus eās cap{iat:capere.3sg.pres.subj.act}.' },
  { cap: 29, tipo: 'term', t: 'Cum nauta dormī{ret:dormīre.3sg.impf.subj.act}, tempestās vēnit.' },
  { cap: 29, tipo: 'falta', t: 'Nauta venit ___ nāvem videat.', r: ['ut', ''], o: ['nē', 'nōn'] },
  { cap: 29, tipo: 'falta', t: 'Mercātor ōrat ___ tempestās veniat.', r: ['nē', ''], o: ['ut', 'et'] },
  { cap: 29, tipo: 'falta', t: 'Ōrō nē tū ā portū ___.', r: ['discēdere', '2sg.pres.subj.act'], o: ['discēdere:2sg.pres.ind.act', 'discēdere:inf.pres.act'] },
  { cap: 29, tipo: 'trans', orden: 'Añade la finalidad «para ver la nave» con ut.', de: 'Nauta ad portum it.', a: 'Nauta ad portum it ut nāvem videat.' },
  { cap: 29, tipo: 'trans', orden: 'Exprésalo con nē + subjuntivo.', de: 'Ōrō: “Tempestās nōn veniat.”', a: 'Ōrō nē tempestās veniat.' },
  { cap: 29, tipo: 'trans', orden: 'Usa cum + subjuntivo imperfecto.', de: 'Ventus secundus erat; nāvis proficīscēbātur.', a: 'Cum ventus secundus esset, nāvis proficīscēbātur.' },

  /* ───── XXX ───── */
  { cap: 30, tipo: 'term', t: 'Sī cēnam parā{verō:parāre.1sg.futperf.ind.act}, bene erit.' },
  { cap: 30, tipo: 'term', t: 'Sī tū cēnam parā{veris:parāre.2sg.futperf.ind.act}, bene erit.' },
  { cap: 30, tipo: 'term', t: 'Sī Mārcus hospitēs vocā{verit:vocāre.3sg.futperf.ind.act}, cēnābimus.' },
  { cap: 30, tipo: 'term', t: 'Sī vīnum ēm{erimus:emere.1pl.futperf.ind.act}, hospitēs laetī erunt.' },
  { cap: 30, tipo: 'term', t: 'Sī vōs cibum apportā{veritis:apportāre.2pl.futperf.ind.act}, cēnābimus.' },
  { cap: 30, tipo: 'term', t: 'Sī servī vāsa portā{verint:portāre.3pl.futperf.ind.act}, cēna parāta erit.' },
  { cap: 30, tipo: 'term', t: 'Ubi hospitēs vēn{erint:venīre.3pl.futperf.ind.act}, cēnābimus.' },
  { cap: 30, tipo: 'term', t: 'Sī ego vīnum bib{erō:bibere.1sg.futperf.ind.act}, laetus erō.' },
  { cap: 30, tipo: 'term', t: 'Servus hospitibus singul{ōs:singulī.acc.pl.m} cibōs dat.' },
  { cap: 30, tipo: 'term', t: 'Servī vāsa bīn{ī:bīnī.nom.pl.m} portant.' },
  { cap: 30, tipo: 'term', t: 'Hospes prūdent{er:prūdēns.adv} loquitur.' },
  { cap: 30, tipo: 'falta', t: 'Sī cēnam ___, hospitēs laetī erunt.', r: ['parāre', '1sg.futperf.ind.act'], o: ['parāre:1sg.fut.ind.act', 'parāre:1sg.perf.ind.act'] },
  { cap: 30, tipo: 'falta', t: 'Hospes ___ loquitur: nōn stultus est.', r: ['prūdēns', 'adv'], o: ['dulcis', 'laetus'] },
  { cap: 30, tipo: 'falta', t: 'Ubi hospitēs ___, cēnābimus.', r: ['venīre', '3pl.futperf.ind.act'], o: ['venīre:3pl.fut.ind.act', 'venīre:3pl.pres.ind.act'] },
  { cap: 30, tipo: 'trans', orden: 'Pon el verbo de sī en futuro perfecto.', de: 'Sī cēnam parābō, bene erit.', a: 'Sī cēnam parāverō, bene erit.' },
  { cap: 30, tipo: 'trans', orden: 'Pon el verbo de sī en futuro perfecto.', de: 'Sī hospitēs venient, cēnābimus.', a: 'Sī hospitēs vēnerint, cēnābimus.' },
  { cap: 30, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Hospes prūdenter loquitur.', a: 'Hospitēs prūdenter loquuntur.' },

  /* ───── XXXI ───── */
  { cap: 31, tipo: 'term', t: 'Vīnum em{endum:emere.gdv.nom.sg.n} est.' },
  { cap: 31, tipo: 'term', t: 'Hospes laud{andus:laudāre.gdv.nom.sg.m} est.' },
  { cap: 31, tipo: 'term', t: 'Cēna par{anda:parāre.gdv.nom.sg.f} est.' },
  { cap: 31, tipo: 'term', t: 'Servō vāsa port{anda:portāre.gdv.nom.pl.n} sunt.' },
  { cap: 31, tipo: 'term', t: 'Mihi liber leg{endus:legere.gdv.nom.sg.m} est.' },
  { cap: 31, tipo: 'term', t: 'Hospitibus vīnum d{andum:dare.gdv.nom.sg.n} est.' },
  { cap: 31, tipo: 'term', t: 'Mihi hospitēs vocand{ī:vocāre.gdv.nom.pl.m} sunt.' },
  { cap: 31, tipo: 'term', t: 'Utinam omnēs laetī s{int:esse.3pl.pres.subj.act}!' },
  { cap: 31, tipo: 'term', t: 'Utinam hospitēs ven{iant:venīre.3pl.pres.subj.act}!' },
  { cap: 31, tipo: 'term', t: 'Utinam pater ad{esset:adesse.3sg.impf.subj.act}!' },
  { cap: 31, tipo: 'falta', t: 'Vīnum ___ est.', r: ['emere', 'gdv.nom.sg.n'], o: ['emere:inf.pres.act', 'emere:part.pres.act.nom.sg.n'] },
  { cap: 31, tipo: 'falta', t: 'Servō vāsa ___ sunt.', r: ['portāre', 'gdv.nom.pl.n'], o: ['portāre:gdv.nom.sg.n', 'portāre:gdv.nom.pl.m'] },
  { cap: 31, tipo: 'falta', t: '___ omnēs laetī sint!', r: ['utinam', ''], o: ['ut', 'nē'] },
  { cap: 31, tipo: 'trans', orden: 'Exprésalo como obligación con gerundivo (hay que…).', de: 'Hospitēs laudāmus.', a: 'Hospitēs laudandī sunt.' },
  { cap: 31, tipo: 'trans', orden: 'Di quién debe hacerlo con dativo de agente.', de: 'Servus vāsa portat.', a: 'Servō vāsa portanda sunt.' },
  { cap: 31, tipo: 'trans', orden: 'Exprésalo como deseo con utinam.', de: 'Hospitēs veniunt.', a: 'Utinam hospitēs veniant!' }
);

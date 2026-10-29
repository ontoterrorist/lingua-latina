/* Capítulos XXII–XXVII: regla, ejemplo, consejo, tablas y banco de ejercicios (ver data/ejercicios.js para el formato).
   Usa P6 y VERBOS_BASE de ejercicios-16-21.js. */
NOMBRES.push([25, 'Thēseus', '-ī m'], [25, 'Ariadna', '-ae f'], [25, 'Mīnōtaurus', '-ī m'], [26, 'Daedalus', '-ī m'], [26, 'Īcarus', '-ī m']);
const VERBOS_MAS = VERBOS_BASE.concat(['volāre', 'legere', 'facere', 'pugnāre', 'capere']);
[
  [22, {
    regla: ['El supino es una forma en -um (y -ū) que indica finalidad con verbos de movimiento: Puerī canem vīsum veniunt (vienen a ver al perro). Se forma con la raíz del participio perfecto: amātum, vīsum, ductum, dormītum.',
      'Ferre («llevar, traer») es irregular: ferō, fers, fert, ferimus, fertis, ferunt; perfecto tulī; participio lātus. Sus compuestos: afferre, auferre, referre. Cavē canem! es el imperativo de cavēre: «¡cuidado con el perro!».'],
    ejemplo: { la: 'Puerī ad iānuam veniunt: canem vīsum veniunt. Faber catēnam fert. Cavē canem!', es: 'Los niños vienen a la puerta: vienen a ver al perro. El herrero lleva la cadena. ¡Cuidado con el perro!' },
    consejo: 'El supino contesta a «¿para qué?» tras un verbo de ir o venir: vīsum it = va a ver. Sale del participio: vīsus → vīsum.',
    tablas: [{ lemas: ['vidēre', 'audīre', 'dormīre', 'vocāre', 'petere', 'dūcere', 'amāre'], etiquetas: ['inf.pres.act', 'sup.acc'] }, { lemas: ['ferre'], etiquetas: P6('pres.ind.act') }, { lemas: ['ferre', 'afferre'], etiquetas: ['3sg.pres.ind.act', '3sg.perf.ind.act'] }],
    pares: [['inf.pres.act', 'sup.acc'], ['3sg.pres.ind.act', 'sup.acc'], ['3sg.pres.ind.act', '3sg.perf.ind.act']]
  }],
  [23, {
    regla: ['El participio futuro activo se forma con -ūrus, -a, -um sobre la raíz del supino: amātūrus, vīsūrus, ventūrus. Indica intención o algo inminente («el que va a…»): Mārcus ventūrus est (va a venir).',
      'El infinitivo futuro es el participio futuro más esse: ventūrum esse. Se usa en el acusativo con infinitivo para lo que ocurrirá después: Magister dīcit Mārcum ventūrum esse (el maestro dice que Marco vendrá). El participio concuerda con el sujeto del infinitivo.'],
    ejemplo: { la: 'Magister epistulam scripsit. Dīcit sē ad Iūlium ventūrum esse. Mārcus pallēbat et rubēbat.', es: 'El maestro escribió una carta. Dice que irá a ver a Julio. Marco palidecía y se ponía rojo.' },
    consejo: 'Participio futuro = -ūrus: amātūrus (el que va a amar). Infinitivo futuro = -ūrum esse: dīcit ventūrum esse = dice que vendrá.',
    tablas: [{ lemas: ['amāre', 'vidēre', 'audīre', 'dūcere', 'venīre', 'vocāre', 'scrībere'], etiquetas: ['part.fut.act.nom.sg.m', 'part.fut.act.nom.sg.f', 'part.fut.act.nom.sg.n'] }, { lemas: ['amāre', 'vidēre', 'audīre', 'dūcere', 'venīre', 'vocāre', 'scrībere'], etiquetas: ['inf.pres.act', 'inf.fut.act'] }],
    pares: [['inf.pres.act', 'inf.fut.act'], ['3sg.pres.ind.act', 'part.fut.act.nom.sg.m'], ['inf.pres.act', 'part.fut.act.nom.sg.m']]
  }],
  [24, {
    regla: ['El pluscuamperfecto expresa una acción anterior a otra pasada: raíz del perfecto + eram, erās, erat…: amāveram, vīderam, audīveram («yo había amado»). Māter medicum arcessīverat; medicus vēnit (la madre había llamado al médico; el médico vino).',
      'El perfecto de los deponentes se forma con el participio perfecto y sum: hortātus sum, secūtus est, locūtī sumus. El participio concuerda con el sujeto en género y número.'],
    ejemplo: { la: 'Mārcus aegrōtābat. Māter medicum arcessīverat. Medicus ad puerum vēnit et locūtus est.', es: 'Marco estaba enfermo. Su madre había llamado al médico. El médico fue junto al niño y habló.' },
    consejo: 'El pluscuamperfecto lleva -eram, -erās…: es el «pasado del pasado». En los deponentes el perfecto son dos palabras: secūtus est = siguió (no «fue seguido»).',
    tablas: [{ lemas: VERBOS_BASE.concat(['esse', 'venīre']), etiquetas: P6('plpf.ind.act') }, { lemas: ['sequī', 'loquī', 'verērī', 'laetārī', 'proficīscī'], etiquetas: P6('perf.ind.dep') }],
    pares: [['3sg.perf.ind.act', '3sg.plpf.ind.act'], ['3sg.plpf.ind.act', '3pl.plpf.ind.act'], ['3sg.pres.ind.dep', '3sg.perf.ind.dep'], ['3sg.perf.ind.dep', '3pl.perf.ind.dep']]
  }],
  [25, {
    regla: ['El imperativo de los deponentes: singular -re (sequere, loquere: «sigue, habla»), plural -minī (sequiminī, loquiminī). Para prohibir: nōlī sequī (no sigas). Parece una forma pasiva, pero es una orden activa.',
      'Oblīvīscī («olvidarse») lleva genitivo: Thēseus Ariadnae oblītus est (se olvidó de Ariadna). Meminisse («acordarse») también: tiene forma de perfecto pero sentido de presente.'],
    ejemplo: { la: 'Ariadna Thēseō fīlum dat: “Sequere fīlum!” Thēseus labyrinthum intrat et Mīnōtaurum necat. Posteā Thēseus Ariadnae oblītus est.', es: 'Ariadna da un hilo a Teseo: «¡Sigue el hilo!» Teseo entra en el laberinto y mata al Minotauro. Después Teseo se olvidó de Ariadna.' },
    consejo: 'Imperativo de deponente: sequere (tú), sequiminī (vosotros). Y oblīvīscī pide genitivo: «olvidarse DE alguien».',
    tablas: [{ lemas: ['sequī', 'loquī', 'verērī', 'laetārī', 'proficīscī', 'cōnārī', 'intuērī'], etiquetas: ['2sg.pres.imp.dep', '2pl.pres.imp.dep'] }, { lemas: ['sequī', 'loquī', 'verērī', 'laetārī', 'proficīscī', 'cōnārī', 'intuērī'], etiquetas: ['inf.pres.dep', '3sg.pres.ind.dep'] }],
    pares: [['inf.pres.dep', '2sg.pres.imp.dep'], ['2sg.pres.imp.dep', '2pl.pres.imp.dep'], ['3sg.pres.ind.dep', '2sg.pres.imp.dep']]
  }],
  [26, {
    regla: ['El gerundio es el nombre verbal de «hacer»: amandī (de amar), amandō (para amar, amando), amandum (tras ad), amandō. Se forma con -nd- y las terminaciones del neutro singular: legendī, audiendī. Ad volandum = para volar; ars volandī = el arte de volar.',
      'El imperativo futuro (-tō) ordena algo para más adelante o con valor general: Crās ad mē venītō! (¡ven a verme mañana!).'],
    ejemplo: { la: 'Daedalus alās facit. Īcarus ad volandum parātus est. Daedalus dīcit: “Mediō in āere volātō, Īcare!”', es: 'Dédalo hace alas. Ícaro está preparado para volar. Dédalo dice: «¡Vuela por el medio del aire, Ícaro!»' },
    consejo: 'El gerundio hace de infinitivo en los casos que el infinitivo no tiene: ad volandum (para volar), ars volandī (el arte de volar). Reconócelo por -nd-.',
    tablas: [{ lemas: VERBOS_MAS, etiquetas: ['ger.gen', 'ger.dat', 'ger.acc', 'ger.abl'] }, { lemas: VERBOS_MAS, etiquetas: ['inf.pres.act', 'ger.acc'] }, { lemas: VERBOS_MAS, etiquetas: ['2sg.fut.imp.act', '2pl.fut.imp.act'] }],
    pares: [['inf.pres.act', 'ger.acc'], ['inf.pres.act', 'ger.gen'], ['2sg.pres.imp.act', '2sg.fut.imp.act']]
  }],
  [27, {
    regla: ['El subjuntivo presente se forma con -e- en la 1.ª conjugación (amem, amēs, amet, amēmus, amētis, ament) y con -a- en las demás (videam, legam, capiam, audiam). El de esse es sim, sīs, sit, sīmus, sītis, sint.',
      'En una frase independiente expresa deseo o exhortación: Frūmentum crēscat! (¡que crezca el trigo!); Labōrēmus! (¡trabajemos!). También se usa con ut / nē tras verbos de orden y deseo: Ōrō ut veniās.'],
    ejemplo: { la: 'Agricola ōrat: “Imber veniat, frūmentum crēscat!” Servī labōrant ut dominus laetus sit.', es: 'El agricultor suplica: «¡Que venga la lluvia, que crezca el trigo!» Los esclavos trabajan para que el señor esté contento.' },
    consejo: 'Subjuntivo presente: -e- en la 1.ª conjugación (amet) y -a- en las demás (videat, legat, audiat). Es el modo del deseo, de la orden suave y de lo que «sea».',
    tablas: [{ lemas: VERBOS_BASE.concat(['capere', 'esse', 'posse']), etiquetas: P6('pres.subj.act') }, { lemas: VERBOS_BASE.concat(['capere']), etiquetas: ['3sg.pres.ind.act', '3sg.pres.subj.act'] }],
    pares: [['3sg.pres.ind.act', '3sg.pres.subj.act'], ['3pl.pres.ind.act', '3pl.pres.subj.act'], ['1pl.pres.ind.act', '1pl.pres.subj.act'], ['3sg.pres.subj.act', '3pl.pres.subj.act']]
  }]
].forEach(([n, d]) => Object.assign(CAPITULOS[n - 1], d));

BANCO.push(
  /* ───── XXII ───── */
  { cap: 22, tipo: 'term', t: 'Puerī canem vīs{um:vidēre.sup.acc} veniunt.' },
  { cap: 22, tipo: 'term', t: 'Mārcus dormīt{um:dormīre.sup.acc} it.' },
  { cap: 22, tipo: 'term', t: 'Iūlius servum voc{ātum:vocāre.sup.acc} venit.' },
  { cap: 22, tipo: 'term', t: 'Faber catēnam f{ert:ferre.3sg.pres.ind.act}.' },
  { cap: 22, tipo: 'term', t: 'Servī sacculōs f{erunt:ferre.3pl.pres.ind.act}.' },
  { cap: 22, tipo: 'term', t: 'Ego aurum f{erō:ferre.1sg.pres.ind.act}.' },
  { cap: 22, tipo: 'term', t: 'Tū lignum f{ers:ferre.2sg.pres.ind.act}.' },
  { cap: 22, tipo: 'term', t: 'Faber catēnam t{ulit:ferre.3sg.perf.ind.act}.' },
  { cap: 22, tipo: 'term', t: 'Cav{ē:cavēre.2sg.pres.imp.act} canem!' },
  { cap: 22, tipo: 'term', t: 'Cav{ēte:cavēre.2pl.pres.imp.act} canem, puerī!' },
  { cap: 22, tipo: 'term', t: 'Iānitor iānuam aper{uit:aperīre.3sg.perf.ind.act}.' },
  { cap: 22, tipo: 'falta', t: 'Puerī canem ___ veniunt.', r: ['vidēre', 'sup.acc'], o: ['vidēre:inf.pres.act', 'vidēre:3sg.pres.ind.act'] },
  { cap: 22, tipo: 'falta', t: 'Servus pecūniam ___: sacculus plēnus est.', r: ['ferre', '3sg.pres.ind.act'], o: ['tacēre', 'dormīre'] },
  { cap: 22, tipo: 'falta', t: '___ canem! Mordet.', r: ['cavēre', '2sg.pres.imp.act'], o: ['numerāre', 'vocāre'] },
  { cap: 22, tipo: 'trans', orden: 'Di que vienen a hacerlo (supino + veniunt).', de: 'Puerī canem vident.', a: 'Puerī canem vīsum veniunt.' },
  { cap: 22, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Faber catēnam fert.', a: 'Fabrī catēnās ferunt.' },
  { cap: 22, tipo: 'trans', orden: 'Dirígete a varios.', de: 'Cavē canem!', a: 'Cavēte canem!' },

  /* ───── XXIII ───── */
  { cap: 23, tipo: 'term', t: 'Mārcus ven{tūrus:venīre.part.fut.act.nom.sg.m} est.' },
  { cap: 23, tipo: 'term', t: 'Magister dīcit Mārcum ven{tūrum:venīre.part.fut.act.acc.sg.m} esse.' },
  { cap: 23, tipo: 'term', t: 'Iūlia dīcit sē ad vīllam ventūr{am:venīre.part.fut.act.acc.sg.f} esse.' },
  { cap: 23, tipo: 'term', t: 'Magister epistulam script{ūrus:scrībere.part.fut.act.nom.sg.m} est.' },
  { cap: 23, tipo: 'term', t: 'Dīcō mē epistulam script{ūrum:scrībere.part.fut.act.acc.sg.m} esse.' },
  { cap: 23, tipo: 'term', t: 'Puerī aud{ītūrī:audīre.part.fut.act.nom.pl.m} sunt.' },
  { cap: 23, tipo: 'term', t: 'Dīcit puerōs magistrum aud{ītūrōs:audīre.part.fut.act.acc.pl.m} esse.' },
  { cap: 23, tipo: 'term', t: 'Dīcam mē ven{tūrum:venīre.part.fut.act.acc.sg.m} esse.' },
  { cap: 23, tipo: 'term', t: 'Mārcus rub{ēbat:rubēre.3sg.impf.ind.act} et pallēbat.' },
  { cap: 23, tipo: 'falta', t: 'Magister dīcit Mārcum ___ esse.', r: ['venīre', 'part.fut.act.acc.sg.m'], o: ['venīre:part.fut.act.acc.sg.f', 'venīre:part.fut.act.acc.pl.m'] },
  { cap: 23, tipo: 'falta', t: 'Mox Mārcus epistulam ___ est.', r: ['scrībere', 'part.fut.act.nom.sg.m'], o: ['scrībere:part.fut.act.nom.sg.f', 'scrībere:part.fut.act.nom.pl.m'] },
  { cap: 23, tipo: 'falta', t: 'Mārcus ___ et rubet: pudet eum.', r: ['pallēre', '3sg.pres.ind.act'], o: ['rīdēre', 'cantāre'] },
  { cap: 23, tipo: 'trans', orden: 'Dilo con el participio futuro + est.', de: 'Mārcus veniet.', a: 'Mārcus ventūrus est.' },
  { cap: 23, tipo: 'trans', orden: 'Pasa lo que dice el maestro a infinitivo futuro.', de: 'Magister dīcit: “Mārcus veniet.”', a: 'Magister dīcit Mārcum ventūrum esse.' },
  { cap: 23, tipo: 'trans', orden: 'Pasa lo que dice Julia a infinitivo futuro (usa sē).', de: 'Iūlia dīcit: “Ego veniam.”', a: 'Iūlia dīcit sē ventūram esse.' },

  /* ───── XXIV ───── */
  { cap: 24, tipo: 'term', t: 'Māter medicum arcessīv{erat:arcessere.3sg.plpf.ind.act}.' },
  { cap: 24, tipo: 'term', t: 'Medicus puerum vīd{erat:vidēre.3sg.plpf.ind.act}.' },
  { cap: 24, tipo: 'term', t: 'Ego librum lēg{eram:legere.1sg.plpf.ind.act}.' },
  { cap: 24, tipo: 'term', t: 'Tū magistrum aud{īverās:audīre.2sg.plpf.ind.act}.' },
  { cap: 24, tipo: 'term', t: 'Nōs ad vīllam vēn{erāmus:venīre.1pl.plpf.ind.act}.' },
  { cap: 24, tipo: 'term', t: 'Vōs dormī{verātis:dormīre.2pl.plpf.ind.act}.' },
  { cap: 24, tipo: 'term', t: 'Servī dominum vīd{erant:vidēre.3pl.plpf.ind.act}.' },
  { cap: 24, tipo: 'term', t: 'Medicus ad puerum vēnit et loc{ūtus est:loquī.3sg.perf.ind.dep}.' },
  { cap: 24, tipo: 'term', t: 'Mārcus magistrum sec{ūtus est:sequī.3sg.perf.ind.dep}.' },
  { cap: 24, tipo: 'term', t: 'Puerī magistrum sec{ūtī sunt:sequī.3pl.perf.ind.dep}.' },
  { cap: 24, tipo: 'term', t: 'Mārcus laet{ātus est:laetārī.3sg.perf.ind.dep}.' },
  { cap: 24, tipo: 'term', t: 'Aemilia in cubiculō aegr{a:aeger.nom.sg.f} er{at:esse.3sg.impf.ind.act}.' },
  { cap: 24, tipo: 'falta', t: 'Mārcus magistrum ___ est.', r: ['sequī', 'part.perf.dep.nom.sg.m'], o: ['sequī:3sg.pres.ind.dep', 'sequī:inf.pres.dep'] },
  { cap: 24, tipo: 'falta', t: 'Puerī magistrum ___ sunt.', r: ['sequī', 'part.perf.dep.nom.pl.m'], o: ['sequī:part.perf.dep.nom.sg.m', 'sequī:part.perf.dep.nom.sg.f'] },
  { cap: 24, tipo: 'falta', t: 'Aemilia ___ est: puer aegrōtat.', r: ['trīstis', 'nom.sg.f'], o: ['īrātus', 'laetus'] },
  { cap: 24, tipo: 'trans', orden: 'Pasa del perfecto al pluscuamperfecto.', de: 'Medicus puerum vīdit.', a: 'Medicus puerum vīderat.' },
  { cap: 24, tipo: 'trans', orden: 'Pasa del perfecto al pluscuamperfecto.', de: 'Puerī magistrum audīvērunt.', a: 'Puerī magistrum audīverant.' },
  { cap: 24, tipo: 'trans', orden: 'Pasa del presente al perfecto.', de: 'Mārcus magistrum sequitur.', a: 'Mārcus magistrum secūtus est.' },

  /* ───── XXV ───── */
  { cap: 25, tipo: 'term', t: 'Ariadna Thēseō fīlum dat: “Sequ{ere:sequī.2sg.pres.imp.dep} fīlum!”' },
  { cap: 25, tipo: 'term', t: '“Loqu{ere:loquī.2sg.pres.imp.dep}, Ariadna!”' },
  { cap: 25, tipo: 'term', t: '“Sequ{iminī:sequī.2pl.pres.imp.dep} mē, amīcī!”' },
  { cap: 25, tipo: 'term', t: '“Proficīsc{ere:proficīscī.2sg.pres.imp.dep}, amīce!”' },
  { cap: 25, tipo: 'term', t: 'Thēseus labyrinthum intr{at:intrāre.3sg.pres.ind.act}.' },
  { cap: 25, tipo: 'term', t: 'Thēseus Mīnōtaurum nec{at:necāre.3sg.pres.ind.act}.' },
  { cap: 25, tipo: 'term', t: 'Thēseus Ariadn{ae:Ariadna.gen.sg} oblītus est.' },
  { cap: 25, tipo: 'term', t: 'Thēseus Ariadnae obl{ītus est:oblīvīscī.3sg.perf.ind.dep}.' },
  { cap: 25, tipo: 'term', t: 'Thēseus fīlum in man{ū:manus.abl.sg} tenet.' },
  { cap: 25, tipo: 'term', t: 'Mīnōtaurus in labyrinthō hab{itat:habitāre.3sg.pres.ind.act}.' },
  { cap: 25, tipo: 'falta', t: 'Thēseus fīlum ___: ita ex labyrinthō exit.', r: ['sequī', '3sg.pres.ind.dep'], o: ['dormīre', 'plōrāre'] },
  { cap: 25, tipo: 'falta', t: 'Ariadna dīcit: “___ fīlum, amīce!”', r: ['sequī', '2sg.pres.imp.dep'], o: ['sequī:inf.pres.dep', 'sequī:3sg.pres.ind.dep'] },
  { cap: 25, tipo: 'falta', t: 'Thēseus Ariadnae ___ est.', r: ['oblīvīscī', 'part.perf.dep.nom.sg.m'], o: ['oblīvīscī:inf.pres.dep', 'oblīvīscī:3sg.pres.ind.dep'] },
  { cap: 25, tipo: 'trans', orden: 'Dale la orden a Teseo (sin vocativo).', de: 'Thēseus fīlum sequitur.', a: 'Sequere fīlum!' },
  { cap: 25, tipo: 'trans', orden: 'Dirígete a varios.', de: 'Sequere fīlum!', a: 'Sequiminī fīlum!' },
  { cap: 25, tipo: 'trans', orden: 'Conviértelo en prohibición con nōlī.', de: 'Sequere fīlum!', a: 'Nōlī sequī fīlum!' },

  /* ───── XXVI ───── */
  { cap: 26, tipo: 'term', t: 'Īcarus ad vol{andum:volāre.ger.acc} parātus est.' },
  { cap: 26, tipo: 'term', t: 'Ars vol{andī:volāre.ger.gen} difficilis est.' },
  { cap: 26, tipo: 'term', t: 'Mārcus ad leg{endum:legere.ger.acc} librum sedet.' },
  { cap: 26, tipo: 'term', t: 'Puerī ad aud{iendum:audīre.ger.acc} magistrum veniunt.' },
  { cap: 26, tipo: 'term', t: 'Cupiditās pugn{andī:pugnāre.ger.gen} magna est.' },
  { cap: 26, tipo: 'term', t: 'Mīlitēs ad pugn{andum:pugnāre.ger.acc} parātī sunt.' },
  { cap: 26, tipo: 'term', t: 'Daedalus artem alās fac{iendī:facere.ger.gen} habet.' },
  { cap: 26, tipo: 'term', t: 'Crās ad mē ven{ītō:venīre.2sg.fut.imp.act}!' },
  { cap: 26, tipo: 'term', t: 'Vol{ātō:volāre.2sg.fut.imp.act} in mediō āere, Īcare!' },
  { cap: 26, tipo: 'term', t: 'Cav{ētō:cavēre.2sg.fut.imp.act} sōlem, Īcare!' },
  { cap: 26, tipo: 'falta', t: 'Īcarus ad ___ parātus est.', r: ['volāre', 'ger.acc'], o: ['volāre:inf.pres.act', 'volāre:part.pres.act.nom.sg.m'] },
  { cap: 26, tipo: 'falta', t: 'Ars ___ difficilis est.', r: ['volāre', 'ger.gen'], o: ['volāre:ger.acc', 'volāre:ger.abl'] },
  { cap: 26, tipo: 'falta', t: 'Daedalus: “Mediō in āere ___, Īcare!”', r: ['volāre', '2sg.fut.imp.act'], o: ['volāre:inf.pres.act', 'volāre:3sg.pres.ind.act'] },
  { cap: 26, tipo: 'trans', orden: 'Expresa la finalidad con ad + gerundio.', de: 'Puerī audīre veniunt.', a: 'Puerī ad audiendum veniunt.' },
  { cap: 26, tipo: 'trans', orden: 'Expresa la finalidad con ad + gerundio.', de: 'Mīlitēs pugnāre parātī sunt.', a: 'Mīlitēs ad pugnandum parātī sunt.' },
  { cap: 26, tipo: 'trans', orden: 'Usa el imperativo futuro.', de: 'Venī crās!', a: 'Crās venītō!' },

  /* ───── XXVII ───── */
  { cap: 27, tipo: 'term', t: 'Frūmentum crēsc{at:crēscere.3sg.pres.subj.act}!' },
  { cap: 27, tipo: 'term', t: 'Imber ven{iat:venīre.3sg.pres.subj.act}!' },
  { cap: 27, tipo: 'term', t: 'Dominus laetus s{it:esse.3sg.pres.subj.act}!' },
  { cap: 27, tipo: 'term', t: 'Servī labōr{ent:labōrāre.3pl.pres.subj.act}!' },
  { cap: 27, tipo: 'term', t: 'Labōr{ēmus:labōrāre.1pl.pres.subj.act}!' },
  { cap: 27, tipo: 'term', t: 'Ōrō ut tū ven{iās:venīre.2sg.pres.subj.act}.' },
  { cap: 27, tipo: 'term', t: 'Ōrāmus ut dominus aud{iat:audīre.3sg.pres.subj.act}.' },
  { cap: 27, tipo: 'term', t: 'Servus ōrat ut dominus pecūniam d{et:dare.3sg.pres.subj.act}.' },
  { cap: 27, tipo: 'term', t: 'Ōrō ut agricolae frūmentum ser{ant:serere.3pl.pres.subj.act}.' },
  { cap: 27, tipo: 'term', t: 'Ōrāmus ut pāstor ovēs cūstōd{iat:cūstōdīre.3sg.pres.subj.act}.' },
  { cap: 27, tipo: 'falta', t: 'Agricola ōrat: “Imber ___!”', r: ['venīre', '3sg.pres.subj.act'], o: ['venīre:3sg.pres.ind.act', 'venīre:inf.pres.act'] },
  { cap: 27, tipo: 'falta', t: 'Ōrō ut tū mē ___.', r: ['audīre', '2sg.pres.subj.act'], o: ['audīre:2sg.pres.ind.act', 'audīre:2sg.pres.imp.act'] },
  { cap: 27, tipo: 'falta', t: 'Servī labōrant ut dominus laetus ___.', r: ['esse', '3sg.pres.subj.act'], o: ['esse:3sg.pres.ind.act', 'esse:inf.pres.act'] },
  { cap: 27, tipo: 'trans', orden: 'Exprésalo como deseo (subjuntivo).', de: 'Imber venit.', a: 'Imber veniat!' },
  { cap: 27, tipo: 'trans', orden: 'Exhorta: «¡Trabajemos!»', de: 'Servī labōrant.', a: 'Labōrēmus!' },
  { cap: 27, tipo: 'trans', orden: 'Dilo como petición: ōrō ut…', de: 'Dominus audit.', a: 'Ōrō ut dominus audiat.' }
);

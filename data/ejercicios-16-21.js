/* Capítulos XVI–XXI: regla, ejemplo, consejo, tablas y banco de ejercicios (ver data/ejercicios.js para el formato).
   En «falta», un distractor puede ser «lema» (misma etiqueta) o «lema:etiqueta» (otra forma del mismo verbo). */
NOMBRES.push([21, 'Sextus', '-ī m']);
const P6 = suf => ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'].map(p => p + '.' + suf);
const VERBOS_BASE = ['amāre', 'vidēre', 'audīre', 'portāre', 'habēre', 'vocāre', 'dormīre', 'dūcere'];
[
  [16, {
    regla: ['Los verbos deponentes tienen forma pasiva y significado activo: hortor (exhorto), sequor (sigo), loquor (hablo), proficīscor (parto). En 3.ª persona: -tur, -ntur (nauta sequitur, nautae sequuntur). Su infinitivo acaba en -ārī, -ērī, -ī o -īrī: sequī, loquī, verērī.',
      'El ablativo absoluto (nombre + participio en ablativo) da el marco de la frase: Ventō flante, nāvis nāvigat (soplando el viento, la nave navega). El genitivo partitivo expresa «parte de un todo»: multum aquae, paulum pecūniae.'],
    ejemplo: { la: 'Nautae ē portū proficīscuntur. Ventō flante, nāvis nāvigat. Nauta gubernātōrem sequitur.', es: 'Los marineros zarpan del puerto. Soplando el viento, la nave navega. El marinero sigue al piloto.' },
    consejo: 'Un deponente parece pasivo pero se traduce en activa: sequitur = «sigue», no «es seguido». Si el diccionario da sequor, sequī, es deponente.',
    tablas: [{ lemas: ['sequī', 'loquī', 'proficīscī', 'verērī', 'laetārī', 'cōnārī', 'intuērī', 'complectī'], etiquetas: ['3sg.pres.ind.dep', '3pl.pres.ind.dep', 'inf.pres.dep'] }, { lemas: ['nauta', 'nāvis', 'ventus', 'portus', 'flūctus'], etiquetas: ['nom.sg', 'gen.sg', 'acc.sg', 'abl.sg', 'nom.pl', 'acc.pl'] }],
    pares: [['3sg.pres.ind.dep', '3pl.pres.ind.dep'], ['3sg.pres.ind.dep', 'inf.pres.dep'], ['3pl.pres.ind.dep', '3sg.pres.ind.dep'], ['nom.sg', 'abl.sg'], ['nom.sg', 'nom.pl']]
  }],
  [17, {
    regla: ['Los numerales: ūnus, duo y trēs se declinan, igual que los centenares (ducentī, trecentī…); los demás hasta cien no cambian: quattuor, quīnque… vīgintī, trīgintā, centum. Para contar dinero: dēnārius, as, sēstertius.',
      'La pasiva tiene todas las personas: amor, amāris, amātur, amāmur, amāminī, amantur. Los deponentes se conjugan igual en todas las personas, pero con significado activo: sequor, sequeris, sequitur, sequimur, sequiminī, sequuntur.'],
    ejemplo: { la: 'Sunt trēs puerī: ūnus ā magistrō laudātur, duo ā magistrō reprehenduntur. Ego sequor, tū sequeris, nōs sequimur.', es: 'Hay tres niños: uno es elogiado por el maestro, dos son reprendidos. Yo sigo, tú sigues, nosotros seguimos.' },
    consejo: 'La pasiva cambia -ō / -s / -t por -or / -ris / -tur. Un deponente tiene esas mismas terminaciones, pero significa activa: sequor = sigo, no «soy seguido».',
    tablas: [{ lemas: ['laudāre', 'vocāre', 'portāre', 'audīre', 'vidēre', 'docēre', 'reprehendere'], etiquetas: P6('pres.ind.pass') }, { lemas: ['sequī', 'loquī', 'verērī', 'laetārī', 'proficīscī'], etiquetas: P6('pres.ind.dep') }],
    pares: [['3sg.pres.ind.act', '3sg.pres.ind.pass'], ['3sg.pres.ind.pass', '1sg.pres.ind.pass'], ['3sg.pres.ind.pass', '2sg.pres.ind.pass'], ['3sg.pres.ind.dep', '1sg.pres.ind.dep'], ['3sg.pres.ind.dep', '2pl.pres.ind.dep']]
  }],
  [18, {
    regla: ['Los adverbios en -ē salen de adjetivos de 1.ª y 2.ª clase (altus → altē, laetus → laetē) y los de 3.ª clase terminan en -iter (fortis → fortiter). El comparativo del adverbio es el neutro del comparativo (altius) y el superlativo acaba en -issimē (altissimē).',
      'Los numerales adverbiales dicen «cuántas veces»: semel, bis, ter, quater, quīnquiēs… quotiēs? Superlativos especiales: pulcherrimus y ācerrimus (adjetivos en -er) y facillimus, difficillimus (adjetivos en -ilis).'],
    ejemplo: { la: 'Mārcus pulchrē scrībit. Iūlius fortiter pugnat. Magister bis dīcit: “Rēctē, rēctē!”', es: 'Marco escribe muy bien. Julio lucha con valentía. El maestro dice dos veces: «¡Bien, bien!»' },
    consejo: 'Adjetivo → adverbio: altus → altē (-ē); fortis → fortiter (-iter). Para el comparativo del adverbio usa el neutro: altius.',
    tablas: [{ lemas: ['altus', 'pulcher', 'fortis', 'gravis', 'levis', 'brevis', 'longus', 'laetus'], etiquetas: ['adv', 'adv.comp', 'adv.sup'] }],
    pares: [['nom.sg.m', 'adv'], ['adv', 'adv.comp'], ['adv', 'adv.sup'], ['nom.sg.m', 'comp.nom.sg.m'], ['nom.sg.m', 'sup.nom.sg.m']]
  }],
  [19, {
    regla: ['El imperfecto describe acciones pasadas que duraban o se repetían. Lleva -bā- tras la raíz en la 1.ª y 2.ª conjugación y -ēbā- (o -iēbā-) en las demás: amābam, vidēbam, legēbam, audiēbam. Terminaciones: -m, -s, -t, -mus, -tis, -nt. El imperfecto de esse es eram, erās, erat, erāmus, erātis, erant.',
      'Compara con el presente: Aemilia ōrnāmenta spectat (ahora) / Aemilia ōrnāmenta spectābat (entonces). La 1.ª y 2.ª declinación se repasan: bonus, bona, bonum; puella, puellae.'],
    ejemplo: { la: 'Iūlius uxōrem amābat. Aemilia in hortō ambulābat. Servī dominum audiēbant. Iūlius pauper erat.', es: 'Julio amaba a su esposa. Emilia paseaba por el huerto. Los esclavos escuchaban al señor. Julio era pobre.' },
    consejo: 'El imperfecto lleva la sílaba -bā- (o -ēbā-): ama-bā-mus. Si la ves, la acción es pasada y duraba o se repetía.',
    tablas: [{ lemas: VERBOS_BASE.concat(['esse']), etiquetas: P6('impf.ind.act') }, { lemas: VERBOS_BASE, etiquetas: ['3sg.pres.ind.act', '3sg.impf.ind.act'] }],
    pares: [['3sg.pres.ind.act', '3sg.impf.ind.act'], ['3pl.pres.ind.act', '3pl.impf.ind.act'], ['1sg.pres.ind.act', '1sg.impf.ind.act'], ['3sg.impf.ind.act', '3pl.impf.ind.act']]
  }],
  [20, {
    regla: ['El futuro de la 1.ª y 2.ª conjugación lleva -bi-: amābō, amābis, amābit, amābimus, amābitis, amābunt; vidēbō… En la 3.ª y 4.ª usa -a- / -ē-: legam, legēs, leget, legēmus, legētis, legent; audiam, audiēs… El futuro de esse es erō, eris, erit, erimus, eritis, erunt.',
      'Nōlī / nōlīte + infinitivo expresa la prohibición: Nōlī plōrāre! («¡No llores!»). Mox y crās («pronto», «mañana») anuncian el futuro.'],
    ejemplo: { la: 'Crās Iūlius ad vīllam veniet. Mox īnfans dormiet. Nōlī plōrāre, fīlia mea; māter tē amābit.', es: 'Mañana Julio vendrá a la villa. Pronto el bebé dormirá. No llores, hija mía; tu madre te querrá.' },
    consejo: 'Futuro de 1.ª y 2.ª: -bō, -bis, -bit… Futuro de 3.ª y 4.ª: -am, -ēs, -et… Ojo: legēs es futuro (leerás) y audīs es presente: mira la vocal larga.',
    tablas: [{ lemas: VERBOS_BASE.concat(['esse']), etiquetas: P6('fut.ind.act') }, { lemas: VERBOS_BASE, etiquetas: ['3sg.pres.ind.act', '3sg.fut.ind.act'] }],
    pares: [['3sg.pres.ind.act', '3sg.fut.ind.act'], ['3pl.pres.ind.act', '3pl.fut.ind.act'], ['3sg.impf.ind.act', '3sg.fut.ind.act'], ['1sg.pres.ind.act', '1sg.fut.ind.act']]
  }],
  [21, {
    regla: ['El perfecto presenta un hecho concluido: amāvī, amāvistī, amāvit, amāvimus, amāvistis, amāvērunt. Su raíz es irregular y se aprende de las partes principales: videō, vīdī; legō, lēgī; veniō, vēnī.',
      'El infinitivo perfecto es amāvisse. El participio perfecto pasivo (amātus, -a, -um) con sum forma el perfecto pasivo: amātus est (fue amado). Imperfecto frente a perfecto: Mārcus dormiēbat (dormía) / Mārcus dormīvit (se durmió).'],
    ejemplo: { la: 'Mārcus Sextum pulsāvit. Sextus plōrābat. Magister vēnit et puerōs vīdit. Mārcus ā magistrō reprehēnsus est.', es: 'Marco golpeó a Sexto. Sexto lloraba. El maestro vino y vio a los niños. Marco fue reprendido por el maestro.' },
    consejo: 'Imperfecto = lo que duraba o se repetía (plōrābat: lloraba); perfecto = lo que pasó y se acabó (plōrāvit: lloró). Las partes principales -vī, -sī, -uī anuncian el perfecto.',
    tablas: [{ lemas: VERBOS_BASE.concat(['esse', 'venīre', 'vincere']), etiquetas: P6('perf.ind.act') }, { lemas: VERBOS_BASE, etiquetas: ['3sg.pres.ind.act', '3sg.perf.ind.act'] }, { lemas: ['amāre', 'vocāre', 'laudāre', 'portāre', 'vidēre', 'audīre'], etiquetas: ['part.perf.pass.nom.sg.m', 'part.perf.pass.nom.sg.f', 'part.perf.pass.nom.sg.n'] }],
    pares: [['3sg.pres.ind.act', '3sg.perf.ind.act'], ['3sg.impf.ind.act', '3sg.perf.ind.act'], ['3pl.pres.ind.act', '3pl.perf.ind.act'], ['3sg.perf.ind.act', '3pl.perf.ind.act'], ['inf.pres.act', 'inf.perf.act']]
  }]
].forEach(([n, d]) => Object.assign(CAPITULOS[n - 1], d));

BANCO.push(
  /* ───── XVI ───── */
  { cap: 16, tipo: 'term', t: 'Nauta gubernātōrem sequ{itur:sequī.3sg.pres.ind.dep}.' },
  { cap: 16, tipo: 'term', t: 'Nautae gubernātōrem sequ{untur:sequī.3pl.pres.ind.dep}.' },
  { cap: 16, tipo: 'term', t: 'Gubernātor cum nautīs loqu{itur:loquī.3sg.pres.ind.dep}.' },
  { cap: 16, tipo: 'term', t: 'Nautae ē portū proficīsc{untur:proficīscī.3pl.pres.ind.dep}.' },
  { cap: 16, tipo: 'term', t: 'Nauta laet{ātur:laetārī.3sg.pres.ind.dep}, quia ventus bonus est.' },
  { cap: 16, tipo: 'term', t: 'Nautae tempestātem vere{ntur:verērī.3pl.pres.ind.dep}.' },
  { cap: 16, tipo: 'term', t: 'Ventō fl{ante:flāre.part.pres.act.abl.sg.m}, nāvis nāvigat.' },
  { cap: 16, tipo: 'term', t: 'Tempestāte ven{iente:venīre.part.pres.act.abl.sg.f}, nautae portum petunt.' },
  { cap: 16, tipo: 'term', t: 'Nauta multum aqu{ae:aqua.gen.sg} habet.' },
  { cap: 16, tipo: 'term', t: 'Paulum pecūni{ae:pecūnia.gen.sg} nautae habent.' },
  { cap: 16, tipo: 'term', t: 'Nauta in nāv{e:nāvis.abl.sg} est.' },
  { cap: 16, tipo: 'term', t: 'Nautae in nāv{ibus:nāvis.abl.pl} sunt.' },
  { cap: 16, tipo: 'falta', t: 'Nautae gubernātōrem ___.', r: ['sequī', '3pl.pres.ind.dep'], o: ['loquī', 'laetārī'] },
  { cap: 16, tipo: 'falta', t: 'Tempestās vēnit: nautae ___.', r: ['verērī', '3pl.pres.ind.dep'], o: ['laetārī', 'cōnsōlārī'] },
  { cap: 16, tipo: 'falta', t: '___ ventō, nāvis nāvigat.', r: ['flāre', 'part.pres.act.abl.sg.m'], o: ['dormīre', 'plōrāre'] },
  { cap: 16, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Nauta sequitur.', a: 'Nautae sequuntur.' },
  { cap: 16, tipo: 'trans', orden: 'Pasa la frase al singular.', de: 'Nautae gubernātōrem sequuntur.', a: 'Nauta gubernātōrem sequitur.' },
  { cap: 16, tipo: 'trans', orden: 'Usa un ablativo absoluto.', de: 'Ventus flat; nāvis nāvigat.', a: 'Ventō flante, nāvis nāvigat.' },

  /* ───── XVII ───── */
  { cap: 17, tipo: 'term', t: 'Ego ā magistrō laud{or:laudāre.1sg.pres.ind.pass}.' },
  { cap: 17, tipo: 'term', t: 'Tū ā magistrō laud{āris:laudāre.2sg.pres.ind.pass}.' },
  { cap: 17, tipo: 'term', t: 'Puer ā magistrō laud{ātur:laudāre.3sg.pres.ind.pass}.' },
  { cap: 17, tipo: 'term', t: 'Nōs ā magistrō laud{āmur:laudāre.1pl.pres.ind.pass}.' },
  { cap: 17, tipo: 'term', t: 'Vōs ā magistrō laud{āminī:laudāre.2pl.pres.ind.pass}.' },
  { cap: 17, tipo: 'term', t: 'Puerī ā magistrō reprehend{untur:reprehendere.3pl.pres.ind.pass}.' },
  { cap: 17, tipo: 'term', t: 'Ego magistrum sequ{or:sequī.1sg.pres.ind.dep}.' },
  { cap: 17, tipo: 'term', t: 'Tū magistrum sequ{eris:sequī.2sg.pres.ind.dep}.' },
  { cap: 17, tipo: 'term', t: 'Nōs magistrum sequ{imur:sequī.1pl.pres.ind.dep}.' },
  { cap: 17, tipo: 'term', t: 'Vōs cum magistrō loqu{iminī:loquī.2pl.pres.ind.dep}.' },
  { cap: 17, tipo: 'term', t: 'Ducent{ī:ducentī.nom.pl.m} servī in vīllā sunt.' },
  { cap: 17, tipo: 'falta', t: 'Trēs et duo sunt ___.', r: ['quīnque', ''], o: ['quattuor', 'sex'] },
  { cap: 17, tipo: 'falta', t: 'Ego magistrum sequor; tū magistrum ___.', r: ['sequī', '2sg.pres.ind.dep'], o: ['laudāre', 'vidēre'] },
  { cap: 17, tipo: 'falta', t: '___ et duo sunt quattuor.', r: ['duo', 'nom.pl.m'], o: ['trēs', 'sex'] },
  { cap: 17, tipo: 'trans', orden: 'Pasa de la voz activa a la pasiva.', de: 'Magister puerōs laudat.', a: 'Puerī ā magistrō laudantur.' },
  { cap: 17, tipo: 'trans', orden: 'Cámbialo a la 1.ª persona del singular, sin pronombre.', de: 'Puer ā magistrō laudātur.', a: 'Ā magistrō laudor.' },
  { cap: 17, tipo: 'trans', orden: 'Cambia de «tú» a «nosotros».', de: 'Tū magistrum sequeris.', a: 'Nōs magistrum sequimur.' },

  /* ───── XVIII ───── */
  { cap: 18, tipo: 'term', t: 'Mārcus pulchr{ē:pulcher.adv} scrībit.' },
  { cap: 18, tipo: 'term', t: 'Iūlius fort{iter:fortis.adv} pugnat.' },
  { cap: 18, tipo: 'term', t: 'Avis alt{ē:altus.adv} volat.' },
  { cap: 18, tipo: 'term', t: 'Magister bis dīcit: “Rēct{ē:rēctus.adv}!”' },
  { cap: 18, tipo: 'term', t: 'Servus laet{ē:laetus.adv} cantat.' },
  { cap: 18, tipo: 'term', t: 'Puer lev{iter:levis.adv} currit.' },
  { cap: 18, tipo: 'term', t: 'Aquila alt{ius:altus.adv.comp} volat quam avis.' },
  { cap: 18, tipo: 'term', t: 'Mārcus pulcherr{imē:pulcher.adv.sup} scrībit.' },
  { cap: 18, tipo: 'term', t: 'Iūlius fort{issimē:fortis.adv.sup} pugnat.' },
  { cap: 18, tipo: 'term', t: 'Liber pulcherr{imus:pulcher.sup.nom.sg.m} est.' },
  { cap: 18, tipo: 'term', t: 'Hoc pēnsum facill{imum:facilis.sup.nom.sg.n} est.' },
  { cap: 18, tipo: 'falta', t: 'Iūlius ___ pugnat: nōn timet.', r: ['fortis', 'adv'], o: ['laetus', 'trīstis'] },
  { cap: 18, tipo: 'falta', t: 'Mārcus ___ scrībit: littera pulchra est.', r: ['pulcher', 'adv'], o: ['foedus', 'piger'] },
  { cap: 18, tipo: 'falta', t: 'Aquila ___ volat quam avis.', r: ['altus', 'adv.comp'], o: ['hūmānus', 'laetus'] },
  { cap: 18, tipo: 'trans', orden: 'Cambia el adjetivo por el adverbio correspondiente.', de: 'Dāvus laetus cantat.', a: 'Dāvus laetē cantat.' },
  { cap: 18, tipo: 'trans', orden: 'Cambia el adjetivo por el adverbio correspondiente.', de: 'Mīles fortis pugnat.', a: 'Mīles fortiter pugnat.' },
  { cap: 18, tipo: 'trans', orden: 'Cambia el adjetivo por el adverbio correspondiente.', de: 'Iūlia pulchra scrībit.', a: 'Iūlia pulchrē scrībit.' },

  /* ───── XIX ───── */
  { cap: 19, tipo: 'term', t: 'Iūlius uxōrem am{ābat:amāre.3sg.impf.ind.act}.' },
  { cap: 19, tipo: 'term', t: 'Aemilia in hortō ambul{ābat:ambulāre.3sg.impf.ind.act}.' },
  { cap: 19, tipo: 'term', t: 'Servī dominum aud{iēbant:audīre.3pl.impf.ind.act}.' },
  { cap: 19, tipo: 'term', t: 'Iūlius pauper er{at:esse.3sg.impf.ind.act}.' },
  { cap: 19, tipo: 'term', t: 'Ego multōs librōs hab{ēbam:habēre.1sg.impf.ind.act}.' },
  { cap: 19, tipo: 'term', t: 'Tū in lūdō dorm{iēbās:dormīre.2sg.impf.ind.act}.' },
  { cap: 19, tipo: 'term', t: 'Nōs in viā ambul{ābāmus:ambulāre.1pl.impf.ind.act}.' },
  { cap: 19, tipo: 'term', t: 'Vōs ōrnāmenta spect{ābātis:spectāre.2pl.impf.ind.act}.' },
  { cap: 19, tipo: 'term', t: 'Mārcus librum leg{ēbat:legere.3sg.impf.ind.act}.' },
  { cap: 19, tipo: 'term', t: 'Aemilia gemmās em{ēbat:emere.3sg.impf.ind.act}.' },
  { cap: 19, tipo: 'term', t: 'Iūlia et Aemilia in vīllā er{ant:esse.3pl.impf.ind.act}.' },
  { cap: 19, tipo: 'falta', t: 'Iūlius pauper ___, nunc dīves est.', r: ['esse', '3sg.impf.ind.act'], o: ['posse', 'habēre'] },
  { cap: 19, tipo: 'falta', t: 'Tunc Mārcus puer erat, nunc ___ est.', r: ['adulēscēns', 'nom.sg'], o: ['piscis', 'lupus'] },
  { cap: 19, tipo: 'falta', t: 'Aemilia gemmās ___: tabernārius gemmās vendēbat.', r: ['emere', '3sg.impf.ind.act'], o: ['vēndere', 'tacēre'] },
  { cap: 19, tipo: 'trans', orden: 'Ponlo en imperfecto.', de: 'Iūlius uxōrem amat.', a: 'Iūlius uxōrem amābat.' },
  { cap: 19, tipo: 'trans', orden: 'Ponlo en imperfecto.', de: 'Servī dominum audiunt.', a: 'Servī dominum audiēbant.' },
  { cap: 19, tipo: 'trans', orden: 'Ponlo en imperfecto.', de: 'Aemilia in hortō est.', a: 'Aemilia in hortō erat.' },

  /* ───── XX ───── */
  { cap: 20, tipo: 'term', t: 'Crās Iūlius ad vīllam ven{iet:venīre.3sg.fut.ind.act}.' },
  { cap: 20, tipo: 'term', t: 'Mox īnfans dorm{iet:dormīre.3sg.fut.ind.act}.' },
  { cap: 20, tipo: 'term', t: 'Māter tē am{ābit:amāre.3sg.fut.ind.act}.' },
  { cap: 20, tipo: 'term', t: 'Crās ego librum leg{am:legere.1sg.fut.ind.act}.' },
  { cap: 20, tipo: 'term', t: 'Tū mox pugn{ābis:pugnāre.2sg.fut.ind.act}.' },
  { cap: 20, tipo: 'term', t: 'Nōs crās in hortō er{imus:esse.1pl.fut.ind.act}.' },
  { cap: 20, tipo: 'term', t: 'Vōs magistrum aud{iētis:audīre.2pl.fut.ind.act}.' },
  { cap: 20, tipo: 'term', t: 'Servī crās dominum vid{ēbunt:vidēre.3pl.fut.ind.act}.' },
  { cap: 20, tipo: 'term', t: 'Mārcus mox pauper er{it:esse.3sg.fut.ind.act}.' },
  { cap: 20, tipo: 'term', t: 'Nōl{ī:nōlle.2sg.pres.imp.act} plōrāre, fīlia mea!' },
  { cap: 20, tipo: 'term', t: 'Nōl{īte:nōlle.2pl.pres.imp.act} tacēre, puerī!' },
  { cap: 20, tipo: 'falta', t: 'Hodiē Iūlius pauper est, sed crās dīves ___.', r: ['esse', '3sg.fut.ind.act'], o: ['habēre', 'vidēre'] },
  { cap: 20, tipo: 'falta', t: 'Mox māter īnfantem ___ in cūnīs.', r: ['pōnere', '3sg.fut.ind.act'], o: ['bālāre', 'lātrāre'] },
  { cap: 20, tipo: 'falta', t: 'Fīlia plōrat; māter dīcit: “Nōlī ___!”', r: ['plōrāre', 'inf.pres.act'], o: ['cantāre', 'rīdēre'] },
  { cap: 20, tipo: 'trans', orden: 'Ponlo en futuro.', de: 'Iūlius vīllam videt.', a: 'Iūlius vīllam vidēbit.' },
  { cap: 20, tipo: 'trans', orden: 'Ponlo en futuro.', de: 'Servī dominum audiunt.', a: 'Servī dominum audient.' },
  { cap: 20, tipo: 'trans', orden: 'Conviértelo en prohibición con nōlī.', de: 'Plōrā, fīlia!', a: 'Nōlī plōrāre, fīlia!' },

  /* ───── XXI ───── */
  { cap: 21, tipo: 'term', t: 'Mārcus Sextum puls{āvit:pulsāre.3sg.perf.ind.act}.' },
  { cap: 21, tipo: 'term', t: 'Magister vēn{it:venīre.3sg.perf.ind.act} et puerōs vīd{it:vidēre.3sg.perf.ind.act}.' },
  { cap: 21, tipo: 'term', t: 'Iūlius ad vīllam vēn{it:venīre.3sg.perf.ind.act}.' },
  { cap: 21, tipo: 'term', t: 'Ego librum lēg{ī:legere.1sg.perf.ind.act}.' },
  { cap: 21, tipo: 'term', t: 'Tū Mārcum vīd{istī:vidēre.2sg.perf.ind.act}.' },
  { cap: 21, tipo: 'term', t: 'Nōs magistrum aud{īvimus:audīre.1pl.perf.ind.act}.' },
  { cap: 21, tipo: 'term', t: 'Vōs in lūdō dormī{vistis:dormīre.2pl.perf.ind.act}.' },
  { cap: 21, tipo: 'term', t: 'Puerī pugnā{vērunt:pugnāre.3pl.perf.ind.act}.' },
  { cap: 21, tipo: 'term', t: 'Mārcus ā magistrō reprehēns{us:reprehendere.part.perf.pass.nom.sg.m} est.' },
  { cap: 21, tipo: 'term', t: 'Sextus ā Mārcō puls{ātus:pulsāre.part.perf.pass.nom.sg.m} est.' },
  { cap: 21, tipo: 'term', t: 'Puella ā magistrō laud{āta:laudāre.part.perf.pass.nom.sg.f} est.' },
  { cap: 21, tipo: 'falta', t: 'Tum Mārcus clāmōrem ___.', r: ['audīre', '3sg.perf.ind.act'], o: ['audīre:3sg.impf.ind.act', 'audīre:3sg.fut.ind.act'] },
  { cap: 21, tipo: 'falta', t: 'Nunc Mārcus tacet, sed tunc ___.', r: ['plōrāre', '3sg.impf.ind.act'], o: ['plōrāre:3sg.pres.ind.act', 'plōrāre:3sg.fut.ind.act'] },
  { cap: 21, tipo: 'falta', t: 'Mārcus ā magistrō ___ est.', r: ['reprehendere', 'part.perf.pass.nom.sg.m'], o: ['reprehendere:inf.pres.act', 'reprehendere:3sg.pres.ind.act'] },
  { cap: 21, tipo: 'trans', orden: 'Ponlo en perfecto.', de: 'Mārcus Sextum pulsat.', a: 'Mārcus Sextum pulsāvit.' },
  { cap: 21, tipo: 'trans', orden: 'Ponlo en perfecto.', de: 'Puerī magistrum audiunt.', a: 'Puerī magistrum audīvērunt.' },
  { cap: 21, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Puer ā magistrō vocātus est.', a: 'Puerī ā magistrō vocātī sunt.' }
);

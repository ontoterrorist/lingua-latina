/* Capítulos IV–IX: regla, ejemplo, consejo, tablas y banco de ejercicios (ver data/ejercicios.js para el formato). */
NOMBRES.push([4, 'Ursus', '-ī m'], [4, 'Syrus', '-ī m'], [4, 'Lēander', '-drī m'], [8, 'Albīnus', '-ī m'], [8, 'Cornēlius', '-ī m']);
[
  [4, {
    regla: ['El vocativo sirve para llamar a alguien. En la 2.ª declinación -us pasa a -e (domine, serve, Mārce); en -ius pasa a -ī (fīlī, Iūlī). En los demás nombres es igual que el nominativo (puella, Iūlia).',
      'El imperativo singular da una orden y es la raíz sin terminación personal: vocā! vidē! audī! El indicativo describe un hecho: vocat, videt, audit. Suus, sua, suum se refiere al sujeto de la frase (Iūlius servum suum vocat: llama a SU esclavo), y is, ea, id sustituye a algo ya nombrado (eum, eam: «lo, la»).'],
    ejemplo: { la: 'Mēde, venī! Mēdus dominum audit. Dominus servum suum vocat.', es: '¡Medo, ven! Medo oye al señor. El señor llama a su esclavo.' },
    consejo: 'El vocativo de -us es -e: dominus → domine. Y para distinguir una orden de un hecho, mira el final: audī! es una orden; audit, con -t, dice que alguien oye.',
    tablas: [{ lemas: ['dominus', 'servus', 'fīlius', 'Mārcus', 'Dāvus', 'puer'], etiquetas: ['nom.sg', 'voc.sg'] }, { lemas: ['vocāre', 'audīre', 'tacēre', 'venīre', 'accūsāre', 'pōnere'], etiquetas: ['3sg.pres.ind.act', '2sg.pres.imp.act'] }],
    pares: [['nom.sg', 'voc.sg'], ['3sg.pres.ind.act', '2sg.pres.imp.act'], ['2sg.pres.imp.act', '3sg.pres.ind.act']]
  }],
  [5, {
    regla: ['El ablativo contesta a «con», «de», «desde», «en». Va tras in (lugar donde), ā/ab, ex, cum y sine: in vīllā (en la villa), ex hortō (del huerto), cum puellā (con la niña), sine pecūniā (sin dinero). Terminaciones: 1.ª -ā, 2.ª -ō, plural -īs.',
      'El acusativo plural acaba en -ās (rosās) y en -ōs (servōs); en los neutros, en -a. La 3.ª persona del plural del verbo acaba en -nt (vocant, vident, audiunt), y el imperativo plural en -te (vocāte, vidēte, audīte).'],
    ejemplo: { la: 'Iūlia in hortō est cum Aemiliā. Rosās carpunt. Mārce, Quīnte, venīte ex vīllā!', es: 'Julia está en el huerto con Emilia. Cortan rosas. ¡Marco, Quinto, venid de la villa!' },
    consejo: 'El ablativo es el caso de «con, de, en»: tras una preposición busca -ā, -ō (singular) o -īs (plural). Y si hay varios que hacen la acción, el verbo lleva -nt.',
    tablas: [{ lemas: ['vīlla', 'hortus', 'rosa', 'aqua', 'ancilla', 'servus', 'puella', 'līlium'], etiquetas: ['nom.sg', 'acc.sg', 'abl.sg', 'nom.pl', 'acc.pl', 'abl.pl'] }, { lemas: ['vocāre', 'habēre', 'audīre', 'tacēre', 'carpere', 'amāre'], etiquetas: ['3sg.pres.ind.act', '3pl.pres.ind.act'] }, { lemas: ['vocāre', 'audīre', 'tacēre', 'venīre'], etiquetas: ['2sg.pres.imp.act', '2pl.pres.imp.act'] }],
    pares: [['nom.sg', 'abl.sg'], ['nom.pl', 'acc.pl'], ['abl.sg', 'abl.pl'], ['3sg.pres.ind.act', '3pl.pres.ind.act'], ['2sg.pres.imp.act', '2pl.pres.imp.act']]
  }],
  [6, {
    regla: ['Algunas preposiciones piden acusativo (ad, ante, post, per, inter, circum, prope, apud): ad vīllam, hacia la villa. Otras piden ablativo (ā/ab, ex, cum, sine, dē, prō): ex vīllā, de la villa. In pide acusativo si hay movimiento (in vīllam: hacia dentro) y ablativo si no (in vīllā: dentro).',
      'En la voz pasiva el sujeto recibe la acción y el verbo lleva -tur o -ntur: Mēdus dominum vocat → dominus ā Mēdō vocātur. El locativo contesta a «¿dónde?» con nombres de ciudad y con domī: Rōmae (en Roma), Tusculī (en Túsculo), domī (en casa).'],
    ejemplo: { la: 'Iūlius ad vīllam it. Mēdus sacculum portat; sacculus ā Mēdō portātur. Mārcus Rōmae habitat.', es: 'Julio va hacia la villa. Medo lleva un saco; el saco es llevado por Medo. Marco vive en Roma.' },
    consejo: 'Pregúntate: ¿hay movimiento (adónde)? Acusativo. ¿Ya estás dentro (dónde)? Ablativo. Y en la pasiva busca -tur: portat (lleva) → portātur (es llevado).',
    tablas: [{ lemas: ['vīlla', 'via', 'porta', 'mūrus', 'equus', 'saccus', 'amīcus', 'lectīca'], etiquetas: ['nom.sg', 'acc.sg', 'abl.sg', 'nom.pl', 'acc.pl', 'abl.pl'] }, { lemas: ['portāre', 'vocāre', 'audīre', 'servāre', 'amāre', 'timēre'], etiquetas: ['3sg.pres.ind.act', '3sg.pres.ind.pass', '3pl.pres.ind.act', '3pl.pres.ind.pass'] }],
    pares: [['acc.sg', 'abl.sg'], ['3sg.pres.ind.act', '3sg.pres.ind.pass'], ['3pl.pres.ind.act', '3pl.pres.ind.pass'], ['3sg.pres.ind.pass', '3sg.pres.ind.act']]
  }],
  [7, {
    regla: ['El dativo indica a quién o para quién se hace algo: Iūlia rosam Aemiliae dat (da una rosa a Emilia). Terminaciones: 1.ª -ae, 2.ª -ō; plural -īs. Acompaña sobre todo a verbos como dare, mōnstrāre o respondēre.',
      'Hic, haec, hoc («este, esta, esto») señala lo cercano y concuerda con el nombre: hic puer, haec puella, hoc mālum. Ille, illa, illud («aquel») señala lo lejano.'],
    ejemplo: { la: 'Iūlia puellae rosam dat. Puella Iūliae ōsculum dat. Haec puella laeta est.', es: 'Julia da una rosa a la niña. La niña da un beso a Julia. Esta niña está contenta.' },
    consejo: 'El dativo contesta a «¿a quién?»: dat rosam Iūliae = da una rosa A Julia. En la 1.ª declinación coincide con el genitivo (-ae): decide el sentido.',
    tablas: [{ lemas: ['puella', 'servus', 'amīca', 'fīlia', 'amīcus', 'puer', 'ancilla'], etiquetas: ['nom.sg', 'dat.sg', 'nom.pl', 'dat.pl'] }],
    pares: [['nom.sg', 'dat.sg'], ['dat.sg', 'dat.pl'], ['acc.sg', 'dat.sg'], ['nom.pl', 'dat.pl']]
  }],
  [8, {
    regla: ['Quis? quid? pregunta por personas y cosas (¿quién?, ¿qué?). Quī, quae, quod es el relativo y concuerda con su antecedente en género y número, no en caso: puella quae rosam dat (la niña que da una rosa).',
      'El caso del relativo lo decide su función dentro de su propia oración: quae es sujeto (nominativo); quem, quam, quod son objeto (acusativo): puer quem Iūlia vocat (el niño al que Julia llama). Hic, haec, hoc se declina completo: huius, huic, hunc, hanc, hōc…'],
    ejemplo: { la: 'Albīnus tabernārius est quī ōrnāmenta vendit. Ānulus, quem Mēdus emit, pulcher est.', es: 'Albino es un tendero que vende adornos. El anillo que Medo compra es hermoso.' },
    consejo: 'Para elegir el relativo, primero busca el antecedente (su género y número) y luego pregúntate qué hace el relativo en su frase: ¿sujeto?, nominativo; ¿objeto?, acusativo.',
    tablas: [{ lemas: ['quī', 'hic'], etiquetas: ['nom.sg.m', 'nom.sg.f', 'nom.sg.n', 'acc.sg.m', 'acc.sg.f', 'acc.sg.n'] }, { lemas: ['vēndere', 'emere', 'vocāre', 'audīre', 'ostendere'], etiquetas: ['3sg.pres.ind.act', '3pl.pres.ind.act'] }],
    pares: [['nom.sg.m', 'nom.sg.f'], ['nom.sg.f', 'nom.sg.n'], ['nom.sg.m', 'acc.sg.m'], ['3sg.pres.ind.act', '3pl.pres.ind.act']]
  }],
  [9, {
    regla: ['La 3.ª declinación tiene nominativos muy variados (pāstor, canis, ovis, mōns, arbor…), así que la raíz se ve en el genitivo: pāstor, pāstōris → pāstōr-. Terminaciones: -is, -ī, -em, -e; plural -ēs, -um (o -ium), -ibus, -ēs.',
      'Los nombres con plural en -ium (ovis → ovium, mōns → montium) son temas en -i. El acusativo singular acaba siempre en -em y el plural en -ēs.'],
    ejemplo: { la: 'Pāstor ovēs vocat; ovēs pāstōrem audiunt. Canis in colle est.', es: 'El pastor llama a las ovejas; las ovejas oyen al pastor. El perro está en la colina.' },
    consejo: 'En la 3.ª declinación no adivines por el nominativo: aprende siempre el genitivo (pāstōris, ovis, montis). Acusativo singular: -em; plural: -ēs.',
    tablas: [{ lemas: ['pāstor', 'canis', 'ovis', 'mōns', 'collis', 'arbor', 'pānis', 'vallis'], etiquetas: ['nom.sg', 'gen.sg', 'acc.sg', 'abl.sg', 'nom.pl', 'gen.pl', 'acc.pl'] }],
    pares: [['nom.sg', 'gen.sg'], ['nom.sg', 'acc.sg'], ['nom.sg', 'nom.pl'], ['nom.pl', 'acc.pl']]
  }]
].forEach(([n, d]) => Object.assign(CAPITULOS[n - 1], d));

BANCO.push(
  /* ───── IV ───── */
  { cap: 4, tipo: 'term', t: 'Dāve, aud{ī:audīre.2sg.pres.imp.act}!' },
  { cap: 4, tipo: 'term', t: 'Domin{e:dominus.voc.sg}, ven{ī:venīre.2sg.pres.imp.act}!' },
  { cap: 4, tipo: 'term', t: 'Mārc{e:Mārcus.voc.sg}, tac{ē:tacēre.2sg.pres.imp.act}!' },
  { cap: 4, tipo: 'term', t: 'Iūlius servum voc{at:vocāre.3sg.pres.ind.act}: “Dāv{e:Dāvus.voc.sg}!”' },
  { cap: 4, tipo: 'term', t: 'Mēdus nummum sūm{it:sūmere.3sg.pres.ind.act}.' },
  { cap: 4, tipo: 'term', t: 'Dāvus pecūniam nōn hab{et:habēre.3sg.pres.ind.act}.' },
  { cap: 4, tipo: 'term', t: 'Iūlius fīli{um:fīlius.acc.sg} su{um:suus.acc.sg.m} vocat.' },
  { cap: 4, tipo: 'term', t: 'Dominus pecūniam in sacculō pōn{it:pōnere.3sg.pres.ind.act}.' },
  { cap: 4, tipo: 'term', t: 'Quot nummī in sacculō sunt? Numer{ā:numerāre.2sg.pres.imp.act}!' },
  { cap: 4, tipo: 'falta', t: 'Dāve, ___ pecūniam!', r: ['numerāre', '2sg.pres.imp.act'], o: ['tacēre', 'discēdere'] },
  { cap: 4, tipo: 'falta', t: 'Dāvus servus est; Iūlius ___ eius est.', r: ['dominus', 'nom.sg'], o: ['servus', 'puer'] },
  { cap: 4, tipo: 'falta', t: 'Duo et duo sunt ___.', r: ['quattuor', ''], o: ['quīnque', 'octō'] },
  { cap: 4, tipo: 'falta', t: 'Sacculus Mēdī ___ est: nummī nōn adsunt.', r: ['vacuus', 'nom.sg.m'], o: ['bonus', 'nūllus'] },
  { cap: 4, tipo: 'trans', orden: 'Convierte el hecho en una orden dirigida a Davo.', de: 'Dāvus venit.', a: 'Dāve, venī!' },
  { cap: 4, tipo: 'trans', orden: 'Convierte el hecho en una orden dirigida a Marco.', de: 'Mārcus tacet.', a: 'Mārce, tacē!' },
  { cap: 4, tipo: 'trans', orden: 'Di que el señor oye a SU esclavo (usa suus).', de: 'Dominus servum audit.', a: 'Dominus servum suum audit.' },

  /* ───── V ───── */
  { cap: 5, tipo: 'term', t: 'Iūlia in hort{ō:hortus.abl.sg} est.' },
  { cap: 5, tipo: 'term', t: 'Aemilia in vīll{ā:vīlla.abl.sg} habitat.' },
  { cap: 5, tipo: 'term', t: 'Puerī cum Iūli{ā:Iūlia.abl.sg} in hortō sunt.' },
  { cap: 5, tipo: 'term', t: 'Aemilia ros{ās:rosa.acc.pl} carpit.' },
  { cap: 5, tipo: 'term', t: 'Servī ex vīllā ven{iunt:venīre.3pl.pres.ind.act}.' },
  { cap: 5, tipo: 'term', t: 'Mārcus et Quīntus līli{a:līlium.acc.pl} carp{unt:carpere.3pl.pres.ind.act}.' },
  { cap: 5, tipo: 'term', t: 'Dāvus sine pecūniā ab hort{ō:hortus.abl.sg} discēdit.' },
  { cap: 5, tipo: 'term', t: 'Servī dominum aud{iunt:audīre.3pl.pres.ind.act}.' },
  { cap: 5, tipo: 'term', t: 'Rosae Iūliam dēlect{ant:dēlectāre.3pl.pres.ind.act}.' },
  { cap: 5, tipo: 'term', t: 'Puerī, ven{īte:venīre.2pl.pres.imp.act}! Servī, tac{ēte:tacēre.2pl.pres.imp.act}!' },
  { cap: 5, tipo: 'falta', t: 'Mārcus in ___ est, ubi rosae et līlia sunt.', r: ['hortus', 'abl.sg'], o: ['nāsus', 'fenestra'] },
  { cap: 5, tipo: 'falta', t: 'Mēdus ___ pecūniā discēdit: sacculus vacuus est.', r: ['sine', ''], o: ['cum', 'ex'] },
  { cap: 5, tipo: 'falta', t: 'Rosae pulchrae sunt, sed nāsus Mēdī ___ est.', r: ['foedus', 'nom.sg.m'], o: ['pulcher', 'laetus'] },
  { cap: 5, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Rosa in hortō est.', a: 'Rosae in hortō sunt.' },
  { cap: 5, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Servus ab hortō venit.', a: 'Servī ab hortīs veniunt.' },
  { cap: 5, tipo: 'trans', orden: 'Dirige la orden a varios.', de: 'Puer, venī!', a: 'Puerī, venīte!' },

  /* ───── VI ───── */
  { cap: 6, tipo: 'term', t: 'Iūlius ad vīll{am:vīlla.acc.sg} it.' },
  { cap: 6, tipo: 'term', t: 'Iūlius in vīll{ā:vīlla.abl.sg} est.' },
  { cap: 6, tipo: 'term', t: 'Mēdus ad port{am:porta.acc.sg} venit.' },
  { cap: 6, tipo: 'term', t: 'Sacculus ā Mēdō port{ātur:portāre.3sg.pres.ind.pass}.' },
  { cap: 6, tipo: 'term', t: 'Dominus in lectīcā port{ātur:portāre.3sg.pres.ind.pass}.' },
  { cap: 6, tipo: 'term', t: 'Servī dominum port{ant:portāre.3pl.pres.ind.act}.' },
  { cap: 6, tipo: 'term', t: 'Servī ā dominō voc{antur:vocāre.3pl.pres.ind.pass}.' },
  { cap: 6, tipo: 'term', t: 'Sacculī ā servīs port{antur:portāre.3pl.pres.ind.pass}.' },
  { cap: 6, tipo: 'term', t: 'Mūrus circum vīllam est; porta in mūr{ō:mūrus.abl.sg} est.' },
  { cap: 6, tipo: 'term', t: 'Equus prope vīll{am:vīlla.acc.sg} est.' },
  { cap: 6, tipo: 'falta', t: 'Iūlius ___ vīllam it.', r: ['ad', ''], o: ['ex', 'sine'] },
  { cap: 6, tipo: 'falta', t: 'Sacculus ā servō ___.', r: ['portāre', '3sg.pres.ind.pass'], o: ['vocāre', 'audīre'] },
  { cap: 6, tipo: 'falta', t: 'Via est ___: Iūlius fessus est.', r: ['longus', 'nom.sg.f'], o: ['laetus', 'vacuus'] },
  { cap: 6, tipo: 'trans', orden: 'Pasa de la voz activa a la pasiva.', de: 'Servus sacculum portat.', a: 'Sacculus ā servō portātur.' },
  { cap: 6, tipo: 'trans', orden: 'Pasa de la voz activa a la pasiva.', de: 'Dominus servōs vocat.', a: 'Servī ā dominō vocantur.' },
  { cap: 6, tipo: 'trans', orden: 'Pasa de la voz pasiva a la activa.', de: 'Mēdus ā dominō vocātur.', a: 'Dominus Mēdum vocat.' },

  /* ───── VII ───── */
  { cap: 7, tipo: 'term', t: 'Iūlia Aemili{ae:Aemilia.dat.sg} rosam dat.' },
  { cap: 7, tipo: 'term', t: 'Mārcus serv{ō:servus.dat.sg} pecūniam dat.' },
  { cap: 7, tipo: 'term', t: 'Puella puer{ō:puer.dat.sg} mālum dat.' },
  { cap: 7, tipo: 'term', t: 'Pater fīli{ae:fīlia.dat.sg} pirum dat.' },
  { cap: 7, tipo: 'term', t: 'Aemilia puell{īs:puella.dat.pl} rosās dat.' },
  { cap: 7, tipo: 'term', t: 'Iūlius serv{īs:servus.dat.pl} nummōs dat.' },
  { cap: 7, tipo: 'term', t: 'Hic puer ancill{ae:ancilla.dat.sg} ōsculum dat.' },
  { cap: 7, tipo: 'term', t: 'Quis amīc{ō:amīcus.dat.sg} mālum dat?' },
  { cap: 7, tipo: 'term', t: 'Mārcus Iūliae ōscul{um:ōsculum.acc.sg} dat.' },
  { cap: 7, tipo: 'term', t: 'Haec puella laet{a:laetus.nom.sg.f} est.' },
  { cap: 7, tipo: 'falta', t: 'Mārcus Iūliae rosam ___.', r: ['dare', '3sg.pres.ind.act'], o: ['numerāre', 'tacēre'] },
  { cap: 7, tipo: 'falta', t: 'Haec ___ pulchra est.', r: ['rosa', 'nom.sg'], o: ['liber', 'puer'] },
  { cap: 7, tipo: 'falta', t: 'Hic ___ fortis est.', r: ['puer', 'nom.sg'], o: ['rosa', 'puella'] },
  { cap: 7, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Pater fīliō pirum dat.', a: 'Patrēs fīliīs pira dant.' },
  { cap: 7, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Puella servō pecūniam dat.', a: 'Puellae servīs pecūniās dant.' },
  { cap: 7, tipo: 'trans', orden: 'Cambia los papeles: ahora Julia es quien da.', de: 'Mārcus Iūliae rosam dat.', a: 'Iūlia Mārcō rosam dat.' },

  /* ───── VIII ───── */
  { cap: 8, tipo: 'term', t: 'Puella, qu{ae:quī.nom.sg.f} rosam habet, laeta est.' },
  { cap: 8, tipo: 'term', t: 'Puer, qu{ī:quī.nom.sg.m} mālum habet, laetus est.' },
  { cap: 8, tipo: 'term', t: 'Mālum, qu{od:quī.acc.sg.n} Mārcus habet, magnum est.' },
  { cap: 8, tipo: 'term', t: 'Ancilla, qu{am:quī.acc.sg.f} Aemilia vocat, Syra est.' },
  { cap: 8, tipo: 'term', t: 'Servus, qu{em:quī.acc.sg.m} Iūlius vocat, Dāvus est.' },
  { cap: 8, tipo: 'term', t: 'Tabernārius est vir, qu{ī:quī.nom.sg.m} ōrnāmenta vendit.' },
  { cap: 8, tipo: 'term', t: 'H{ic:hic.nom.sg.m} puer, h{aec:hic.nom.sg.f} puella, h{oc:hic.nom.sg.n} mālum.' },
  { cap: 8, tipo: 'term', t: 'Quis est ille vir? Qu{id:quis.nom.sg.n} est hoc?' },
  { cap: 8, tipo: 'term', t: 'H{unc:hic.acc.sg.m} ānulum Mēdus emit.' },
  { cap: 8, tipo: 'term', t: 'Digitus, in qu{ō:quī.abl.sg.m} ānulus est, parvus est.' },
  { cap: 8, tipo: 'falta', t: 'Iūlia est puella, ___ rosam dat.', r: ['quī', 'nom.sg.f'], o: ['hic', 'is'] },
  { cap: 8, tipo: 'falta', t: 'Servus, ___ Iūlius vocat, Dāvus est.', r: ['quī', 'acc.sg.m'], o: ['hic', 'is'] },
  { cap: 8, tipo: 'falta', t: '___ Mārcus habet? Mālum habet.', r: ['quis', 'acc.sg.n'], o: ['hic', 'quī'] },
  { cap: 8, tipo: 'trans', orden: 'Une las dos frases con un relativo.', de: 'Puella rosam habet. Puella laeta est.', a: 'Puella, quae rosam habet, laeta est.' },
  { cap: 8, tipo: 'trans', orden: 'Une las dos frases con un relativo.', de: 'Servus venit. Iūlius servum vocat.', a: 'Servus, quem Iūlius vocat, venit.' },
  { cap: 8, tipo: 'trans', orden: 'Une las dos frases con un relativo.', de: 'Mārcus ānulum emit. Ānulus pulcher est.', a: 'Ānulus, quem Mārcus emit, pulcher est.' },

  /* ───── IX ───── */
  { cap: 9, tipo: 'term', t: 'Pāstor ov{em:ovis.acc.sg} vocat.' },
  { cap: 9, tipo: 'term', t: 'Pāstor ovēs ad mont{em:mōns.acc.sg} dūcit.' },
  { cap: 9, tipo: 'term', t: 'Canis pāstōr{em:pāstor.acc.sg} amat.' },
  { cap: 9, tipo: 'term', t: 'Ov{ēs:ovis.nom.pl} in colle sunt.' },
  { cap: 9, tipo: 'term', t: 'Pāstor ovēs in vall{e:vallis.abl.sg} videt.' },
  { cap: 9, tipo: 'term', t: 'Can{ēs:canis.nom.pl} et ovēs pāstōrem amant.' },
  { cap: 9, tipo: 'term', t: 'Pāstor arbor{ēs:arbor.acc.pl} videt.' },
  { cap: 9, tipo: 'term', t: 'Cibus pāst{ōris:pāstor.gen.sg} pān{is:pānis.nom.sg} est.' },
  { cap: 9, tipo: 'term', t: 'Pāstor ov{ibus:ovis.dat.pl} herbam dat.' },
  { cap: 9, tipo: 'term', t: 'In silvā multae arbor{ēs:arbor.nom.pl} sunt.' },
  { cap: 9, tipo: 'falta', t: 'Cibus pāstōris est ___.', r: ['pānis', 'nom.sg'], o: ['lupus', 'canis'] },
  { cap: 9, tipo: 'falta', t: 'Canis ovēs pāstōris amat, sed ___ timet.', r: ['lupus', 'acc.sg'], o: ['herba', 'pānis'] },
  { cap: 9, tipo: 'falta', t: 'Pāstor ___ ovēs vocat.', r: ['bonus', 'nom.sg.m'], o: ['pulcher', 'vacuus'] },
  { cap: 9, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Ovis in herbā est.', a: 'Ovēs in herbā sunt.' },
  { cap: 9, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Canis pāstōrem amat.', a: 'Canēs pāstōrēs amant.' },
  { cap: 9, tipo: 'trans', orden: 'Pasa la frase al plural.', de: 'Pāstor ovem vocat.', a: 'Pāstōrēs ovēs vocant.' }
);

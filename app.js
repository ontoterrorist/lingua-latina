const chapters = [
  {title:'Imperium Romanum',theme:'Roma y las provincias',grammar:'Singular y plural',rule:'Los nombres cambian su terminación para indicar número. En la primera declinación, -a suele pasar a -ae; en la segunda, -us pasa a -ī.',example:'insula → insulae · fluvius → fluviī',word:['fluvius','río'],quiz:['¿Qué forma es plural de insula?',['insulae','insulam','insulā'],0],dialog:[['CAESAR','Imperium nostrum magnum est.','Nuestro imperio es grande.'],['VIATOR','Ubi est Italia?','¿Dónde está Italia?']],land:'land-city'},
  {title:'Familia Romana',theme:'La familia de Iulius',grammar:'El genitivo: pertenencia',rule:'El genitivo indica relación o posesión. En muchos nombres de segunda declinación, -us cambia a -ī.',example:'filius Iuliī = el hijo de Iulius',word:['familia','familia'],quiz:['¿Qué expresa Iuliī en filius Iuliī?',['La pertenencia o relación','El lugar hacia donde','El plural neutro'],0],dialog:[['IULIUS','Aemilia, familia domī est.','Aemilia, la familia está en casa.'],['AEMILIA','Liberī iam adsunt.','Los niños ya están aquí.']],land:''},
  {title:'Puer Improbus',theme:'Juegos y travesuras',grammar:'Acusativo: objeto directo',rule:'El acusativo suele señalar quién o qué recibe directamente la acción del verbo.',example:'Puer pilam videt. = El niño ve la pelota.',word:['puer','niño'],quiz:['En Puer pilam videt, ¿qué función tiene pilam?',['Objeto directo','Sujeto','Posesión'],0],dialog:[['MARCUS','Ubi est pila?','¿Dónde está la pelota?'],['IULIA','Sub mensā latet!','¡Se esconde bajo la mesa!']],land:''},
  {title:'Dominus et Servi',theme:'La casa y sus habitantes',grammar:'Imperativo',rule:'El imperativo sirve para dar una orden o hacer una petición. En singular, muchos verbos usan la raíz sin terminación personal.',example:'veni! = ¡ven! · audī! = ¡escucha!',word:['domus','casa'],quiz:['¿Cuál es un mandato?',['Audī!','Audīs.','Audīre.'],0],dialog:[['DAVUS','Domine, quid faciam?','Señor, ¿qué hago?'],['IULIUS','Aquā rosas riga.','Riega las rosas con agua.']],land:''},
  {title:'Villa et Hortus',theme:'La villa y el jardín',grammar:'Adjetivos y concordancia',rule:'El adjetivo concuerda con el nombre en género, número y caso. La terminación cambia junto al sustantivo.',example:'hortus pulcher · rosae pulchrae',word:['hortus','jardín'],quiz:['Completa: rosae … (hermosas)',['pulchrae','pulcher','pulchrum'],0],dialog:[['AEMILIA','Hortus meus floribus plenus est.','Mi jardín está lleno de flores.'],['IULIA','Et rosae suaviter olent.','Y las rosas huelen muy bien.']],land:'land-garden'},
  {title:'Via Latina',theme:'Un viaje por Italia',grammar:'Preposiciones y caso',rule:'Algunas preposiciones rigen acusativo para dirección; otras usan ablativo para lugar donde. Aprende cada preposición con su caso.',example:'ad villam (hacia la villa) · in villā (en la villa)',word:['via','camino'],quiz:['¿Qué caso señala dirección con ad?',['Acusativo','Ablativo','Genitivo'],0],dialog:[['VIATOR','Ad Tusculum iter facimus.','Viajamos hacia Tusculum.'],['MERCATOR','Via longa est, sed tuta.','El camino es largo, pero seguro.']],land:'land-city'},
  {title:'Puella et Rosa',theme:'Julia y las flores',grammar:'Dativo: destinatario',rule:'El dativo suele indicar a quién o para quién se hace algo. En la primera declinación, -a pasa a -ae.',example:'Iūliae rosam dat. = Le da una rosa a Julia.',word:['rosa','rosa'],quiz:['En rosam Iūliae dat, ¿qué caso indica el destinatario?',['Dativo','Acusativo','Vocativo'],0],dialog:[['MARCUS','Sororī rosam do.','Le doy una rosa a mi hermana.'],['IULIA','Grātiās tibi agō!','¡Te doy las gracias!']],land:''},
  {title:'Taberna Romana',theme:'El mercado de Roma',grammar:'Números y precios',rule:'Los números cardinales suelen ser indeclinables; el contexto y los nombres que acompañan aclaran la cantidad.',example:'duo nummī · tres mēnsāe',word:['taberna','tienda'],quiz:['¿Cómo dices “tres tiendas”?',['trēs tabernae','tria tabernās','tres tabernārum'],0],dialog:[['MERCATOR','Panis recens! Duo nummī!','¡Pan fresco! ¡Dos monedas!'],['EMPTOR','Unum panem, quaesō.','Un pan, por favor.']],land:'land-city'},
  {title:'Pastor et Oves',theme:'Pastores y rebaños',grammar:'Tercera declinación',rule:'La tercera declinación reúne nombres con nominativos variados. Aprende el genitivo para reconocer la raíz.',example:'pāstor, pāstōris · ovis, ovis',word:['ovis','oveja'],quiz:['¿Qué forma revela la raíz de la tercera declinación?',['El genitivo','El vocativo','El imperativo'],0],dialog:[['PASTOR','Ovēs ad fontem eunt.','Las ovejas van a la fuente.'],['PUER','Canis gregem custodit.','El perro guarda el rebaño.']],land:''},
  {title:'Bestiae et Homines',theme:'Animales y personas',grammar:'Adjetivos de tercera declinación',rule:'Algunos adjetivos tienen una forma común para masculino y femenino y otra para neutro.',example:'fortis vir · fortis femina · forte animal',word:['animal','animal'],quiz:['¿Qué forma concuerda con animal?',['forte','fortis','fortes'],0],dialog:[['IULIA','Animal parvum in herbis est.','Hay un animal pequeño entre la hierba.'],['SYRA','Cave! Fortasse erināceus est.','¡Cuidado! Quizá sea un erizo.']],land:''},
  {title:'Corpus Humanum',theme:'El cuerpo y la salud',grammar:'Pronombres reflexivos',rule:'Sē remite al sujeto de la oración. Suus, sua, suum indica algo propio del sujeto.',example:'Puer sē lavat. · puella suam manum lavat.',word:['caput','cabeza'],quiz:['¿A quién se refiere sē en Aemilia sē videt?',['A Aemilia','A otra mujer','A la cabeza'],0],dialog:[['MEDICUS','Ubi tē dolet?','¿Dónde te duele?'],['PUER','Caput mihi dolet.','Me duele la cabeza.']],land:''},
  {title:'Miles Romanus',theme:'La vida de un soldado',grammar:'Verbos activos y pasivos',rule:'En voz activa, el sujeto realiza la acción; en voz pasiva, la recibe. Compara la terminación del verbo.',example:'mīles portam aperit · porta aperītur',word:['miles','soldado'],quiz:['En porta aperītur, ¿qué voz aparece?',['Pasiva','Activa','Infinitivo'],0],dialog:[['CENTURIO','Portam custodīte!','¡Proteged la puerta!'],['MILES','Porta iam clausa est.','La puerta ya está cerrada.']],land:''},
  {title:'Annus et Menses',theme:'El calendario romano',grammar:'Ordinales y fechas',rule:'Los ordinales nombran posición: prīmus, secundus, tertius. Los meses son masculinos y sus nombres se declinan.',example:'diēs prīmus · mēnsis secundus',word:['annus','año'],quiz:['¿Cuál significa “tercero”?',['tertius','trēs','ter'],0],dialog:[['AEMILIA','Kalendae Martiae appropinquant.','Se acercan las calendas de marzo.'],['IULIUS','Tempus agrum colere.','Es tiempo de cultivar el campo.']],land:''},
  {title:'Novus Dies',theme:'La rutina diaria',grammar:'Adverbios',rule:'Muchos adverbios describen cómo ocurre una acción. Los adverbios en -ē suelen derivar de adjetivos de primera y segunda declinación.',example:'laetus → laetē · celer → celeriter',word:['mane','por la mañana'],quiz:['Completa: Puer … currit (rápidamente).',['celeriter','celer','celeris'],0],dialog:[['IULIA','Surgite! Sol iam lucet.','¡Levantaos! Ya brilla el sol.'],['MARCUS','Hodie celeriter parāti sumus.','Hoy estamos listos enseguida.']],land:''},
  {title:'Magister et Discipuli',theme:'En la escuela',grammar:'Participio presente',rule:'El participio presente describe una acción en curso y concuerda como un adjetivo de tercera declinación.',example:'legere → legēns · discipulus legēns',word:['magister','maestro'],quiz:['¿Qué expresa legēns?',['Una acción en curso','Una orden','Una acción futura'],0],dialog:[['MAGISTER','Discipulī, sententiam legite.','Alumnos, leed la frase.'],['DISCIPULUS','Lentē legimus, magister.','Leemos despacio, maestro.']],land:''},
  {title:'Tempestas',theme:'Tormenta en el camino',grammar:'Ablativo absoluto',rule:'Una construcción de sustantivo y participio en ablativo puede expresar el marco temporal o causal de la oración.',example:'sole cadente, nautae discedunt = al ponerse el sol, los marineros parten',word:['tempestas','tormenta'],quiz:['¿Qué caso usa el ablativo absoluto?',['Ablativo','Acusativo','Dativo'],0],dialog:[['NAUTA','Nūbēs atrae sunt!','¡Las nubes son oscuras!'],['GUBERNATOR','Tempestate veniente, in portum redīmus.','Al acercarse la tormenta, volvemos al puerto.']],land:'land-sea'},
  {title:'Numeri Difficiles',theme:'Cuentas y cantidades',grammar:'Numerales distributivos',rule:'Los distributivos expresan grupos o reparto (“de tantos en tantos”). Aprende sus formas junto a ejemplos concretos.',example:'bīnī = de dos en dos · ternī = de tres en tres',word:['numerus','número'],quiz:['¿Qué significa bīnī?',['De dos en dos','Dos veces','Segundo'],0],dialog:[['MERCATOR','Denāriōs ternōs accipiō.','Recibo tres denarios cada uno.'],['DISCIPULUS','Rectē numerās.','Cuentas bien.']],land:'land-city'},
  {title:'Litterae Latinae',theme:'Leer y escribir',grammar:'Pronombres relativos',rule:'Quī, quae, quod enlaza una oración con un nombre anterior y concuerda con él en género y número.',example:'littera quae sonat · puer quī scrībit',word:['littera','letra'],quiz:['¿Qué forma relativa acompaña a puer?',['quī','quae','quod'],0],dialog:[['MAGISTER','Verbum quod scrībis, legō.','Leo la palabra que escribes.'],['DISCIPULUS','Haec littera longam vōcālem habet.','Esta letra lleva una vocal larga.']],land:''},
  {title:'Maritus et Uxor',theme:'La vida en pareja',grammar:'Comparativo y superlativo',rule:'El comparativo compara dos elementos; el superlativo expresa el grado más alto dentro de un grupo.',example:'clārus · clārior · clārissimus',word:['uxor','esposa'],quiz:['¿Cuál es el superlativo de clārus?',['clārissimus','clārior','clārē'],0],dialog:[['AEMILIA','Haec toga elegantior est.','Esta toga es más elegante.'],['IULIUS','Et illa pulcherrima.','Y aquella es la más hermosa.']],land:''},
  {title:'Parentes',theme:'Parientes y generaciones',grammar:'Pronombres posesivos',rule:'Meus, tuus, noster y vester concuerdan con la cosa poseída; suus suele referir al sujeto.',example:'frāter meus · soror tua · libērī suī',word:['parens','progenitor'],quiz:['¿Con qué concuerda meus en frāter meus?',['Con frāter','Con quien habla','Con el verbo'],0],dialog:[['AVIA','Nepōtēs meī hodiē adsunt.','Mis nietos están aquí hoy.'],['IULIA','Avia, fabulam nōbīs nārrā!','Abuela, ¡cuéntanos una historia!']],land:''},
  {title:'Pugna Discipulorum',theme:'Una disputa entre alumnos',grammar:'Perfecto e imperfecto',rule:'El imperfecto presenta una acción pasada en desarrollo o habitual; el perfecto presenta un hecho concluido.',example:'discebant (aprendían) · didicērunt (aprendieron)',word:['pugna','disputa'],quiz:['¿Qué tiempo sugiere una acción habitual en el pasado?',['Imperfecto','Perfecto','Futuro'],0],dialog:[['DISCIPULUS A','Dum magister abest, tacēbāmus.','Mientras el maestro no estaba, guardábamos silencio.'],['DISCIPULUS B','Sed tum clāmāvistī!','¡Pero entonces gritaste!']],land:''},
  {title:'Cave Canem',theme:'Un perro guarda la casa',grammar:'Pronombres demostrativos',rule:'Hic señala algo cercano; ille algo más lejano. Sus formas concuerdan con el nombre.',example:'hic canis · illa porta · hoc signum',word:['canis','perro'],quiz:['¿Qué demostrativo señala algo cercano?',['hic','ille','alius'],0],dialog:[['DAVUS','Cave canem!','¡Cuidado con el perro!'],['MARCUS','Hic canis nōs iam novit.','Este perro ya nos conoce.']],land:''},
  {title:'Epistula Magistri',theme:'Una carta desde Roma',grammar:'Pronombres personales',rule:'Los pronombres personales se usan para destacar quién habla o actúa; las terminaciones verbales a menudo bastan para identificar a la persona.',example:'ego scrībō · tū legis · nōs respondēmus',word:['epistula','carta'],quiz:['¿Qué pronombre significa “nosotros”?',['nōs','vōs','ego'],0],dialog:[['NUNTIUS','Magister epistulam mittit.','El maestro envía una carta.'],['DISCIPULA','Eam statim legāmus.','Leámosla enseguida.']],land:''},
  {title:'Puer Aegrotus',theme:'Cuidar a un enfermo',grammar:'Infinitivo con acusativo',rule:'Algunos verbos de percepción o declaración pueden llevar un sujeto en acusativo y un infinitivo.',example:'medicus puerum dormīre videt = el médico ve que el niño duerme',word:['aeger','enfermo'],quiz:['¿Qué caso lleva el sujeto del infinitivo en esta construcción?',['Acusativo','Nominativo','Ablativo'],0],dialog:[['MEDICUS','Puerum quiescere oportet.','El niño debe descansar.'],['AEMILIA','Aquam et quietem habēbit.','Tendrá agua y reposo.']],land:''},
  {title:'Theseus et Minotaurus',theme:'El mito del laberinto',grammar:'Infinitivo perfecto',rule:'El infinitivo perfecto presenta como anterior la acción de otro verbo.',example:'dīcit Theseum vēnisse = dice que Teseo llegó',word:['labyrinthus','laberinto'],quiz:['¿Qué forma expresa anterioridad respecto al verbo principal?',['Infinitivo perfecto','Infinitivo presente','Participio futuro'],0],dialog:[['ARIADNA','Filum tibi trādō.','Te entrego un hilo.'],['THESEUS','Hoc auxilium memoriā tenēbō.','Recordaré esta ayuda.']],land:''},
  {title:'Daedalus et Icarus',theme:'El vuelo de Ícaro',grammar:'Participios y futuro',rule:'El participio futuro expresa una acción próxima o intención y concuerda con el nombre.',example:'profectūrus = a punto de partir · puella ventūra',word:['ala','ala'],quiz:['¿Qué idea añade el participio futuro?',['Una acción próxima o intención','Una orden','Una acción habitual'],0],dialog:[['DAEDALUS','Alās firmē tene!','¡Sujeta bien las alas!'],['ICARUS','Altior volābō.','Volaré más alto.']],land:''},
  {title:'Res Rusticae',theme:'Trabajo en el campo',grammar:'Gerundio',rule:'El gerundio es un nombre verbal neutro que expresa una actividad; aparece en casos oblicuos.',example:'ad agrum colendum = para cultivar el campo',word:['ager','campo'],quiz:['¿Qué forma nominal expresa la actividad de cultivar?',['Gerundio','Vocativo','Participio perfecto'],0],dialog:[['VILICUS','Tempus est frūmentum metendī.','Es tiempo de cosechar el trigo.'],['SERVA','Operā nostrā horreum plēnum erit.','Con nuestro trabajo, el granero estará lleno.']],land:''},
  {title:'Pericula Maris',theme:'Peligros en el mar',grammar:'Subjuntivo en subordinadas',rule:'El subjuntivo aparece en varias oraciones subordinadas para expresar propósito, posibilidad o perspectiva.',example:'nautae timent nē tempestas veniat = los marineros temen que llegue la tormenta',word:['mare','mar'],quiz:['¿Qué modo aparece en veniat?',['Subjuntivo','Indicativo','Imperativo'],0],dialog:[['NAUTA','Nē vela rumpantur!','¡Que las velas no se rompan!'],['GUBERNATOR','Remōs tenēte; iam litus vidēmus.','¡Aferraos a los remos; ya vemos la costa!']],land:'land-sea'},
  {title:'Navigare Necesse Est',theme:'Preparar una travesía',grammar:'Conjunciones y propósito',rule:'Ut con subjuntivo puede introducir una oración de finalidad: “para que”.',example:'nauta venit ut nave proficīscātur = el marinero viene para partir en barco',word:['navigare','navegar'],quiz:['¿Qué puede expresar ut + subjuntivo?',['Finalidad','Posesión','Comparación'],0],dialog:[['NAUTA','Ad portum festīnō ut navem videam.','Me apresuro al puerto para ver el barco.'],['MERCATOR','Ventus secundus est; proficīscere!','El viento es favorable; ¡parte!']],land:'land-sea'},
  {title:'Convivium',theme:'Un banquete romano',grammar:'Pronombres indefinidos',rule:'Quīdam significa “cierto/alguien”; quisque señala a cada miembro de un grupo.',example:'quisque hospes = cada invitado',word:['convivium','banquete'],quiz:['¿Qué idea expresa quisque?',['Cada uno','Nadie','El mismo'],0],dialog:[['HOSPES','Cibus optimus est.','La comida es excelente.'],['IULIUS','Quisque hospes laetus sit.','Que cada invitado esté contento.']],land:''},
  {title:'Inter Pocula',theme:'Conversaciones en la cena',grammar:'Pronombres y adverbios interrogativos',rule:'Quis pregunta por personas; quid por cosas; quōmodo por la manera; quandō por el tiempo.',example:'quis venit? · quid legīs? · quandō discedis?',word:['poculum','copa'],quiz:['¿Qué palabra pregunta “cuándo”?',['quandō','quis','quid'],0],dialog:[['HOSPES','Quōmodo iter fecistī?','¿Cómo hiciste el viaje?'],['MERCATOR','Lentē, sed sine perīculō.','Despacio, pero sin peligro.']],land:''},
  {title:'Classis Romana',theme:'La flota de Roma',grammar:'Voz pasiva y agente',rule:'El complemento agente de una pasiva suele ir con ā/ab y ablativo cuando se trata de una persona.',example:'navis ā nautīs regitur = la nave es gobernada por los marineros',word:['classis','flota'],quiz:['¿Qué caso sigue normalmente a ā en el agente?',['Ablativo','Acusativo','Dativo'],0],dialog:[['LEGATUS','Classis ad insulam mittitur.','La flota es enviada a la isla.'],['NAUTA','A ducibus signum exspectāmus.','Esperamos la señal de los comandantes.']],land:'land-sea'},
  {title:'Exercitus Romanus',theme:'El ejército romano',grammar:'Gerundivo y obligación',rule:'El gerundivo con esse expresa necesidad u obligación. La persona responsable suele aparecer en dativo.',example:'mīlitibus pons faciendus est = los soldados deben construir el puente',word:['exercitus','ejército'],quiz:['¿Qué expresa faciendus est?',['Obligación','Posibilidad pasada','Deseo'],0],dialog:[['LEGATUS','Pons ante noctem faciendus est.','El puente debe estar listo antes de la noche.'],['CENTURIO','Mīlitēs iam labōrant.','Los soldados ya trabajan.']],land:'land-city'},
  {title:'De Arte Poetica',theme:'Verso y poesía',grammar:'Métrica y ritmo',rule:'El ritmo latino clásico depende de la duración de las sílabas: largas y breves. Escucha el patrón además de contar.',example:'Una sílaba puede ser larga por naturaleza o por posición.',word:['poeta','poeta'],quiz:['¿Qué organiza el ritmo de la poesía latina clásica?',['La duración silábica','El número de letras','La rima final'],0],dialog:[['POETA','Verba mea metīrī possum.','Puedo medir mis palabras.'],['AMICUS','Sed sensum quoque servā.','Pero conserva también el sentido.']],land:''},
  {title:'Ars Grammatica',theme:'Un mapa de la gramática',grammar:'Casos y funciones',rule:'Los casos señalan la función de cada nombre: sujeto, objeto, relación, destinatario o circunstancia.',example:'Nominativo · acusativo · genitivo · dativo · ablativo · vocativo',word:['grammatica','gramática'],quiz:['¿Qué caso suele marcar el objeto directo?',['Acusativo','Nominativo','Vocativo'],0],dialog:[['CAESAR','Nunc verba inter se coniunge.','Ahora relaciona las palabras.'],['DISCIPULUS','Forma mutatur; sententia clāret.','La forma cambia; el sentido se aclara.']],land:''}
];
const sceneMap=['land-city','land-atrium','land-atrium','land-atrium','land-garden','land-city','land-garden','land-city','land-field','land-field','land-sickroom','land-army','land-city','land-atrium','land-school','land-sea','land-school','land-school','land-atrium','land-atrium','land-school','land-garden','land-school','land-sickroom','land-myth','land-myth','land-field','land-sea','land-sea','land-banquet','land-banquet','land-sea','land-army','land-school','land-school'];
const caesarVoice=[
 'Observa primero los nombres de las tierras: así empieza todo viaje por Roma.',
 'Una familia se conoce por sus vínculos; escucha cómo cada palabra nombra uno.',
 'La curiosidad de los niños transforma un día ordinario en una pequeña aventura.',
 'En cada casa hay tareas, acuerdos y voces que conviene comprender.',
 'Un jardín enseña a mirar con atención y a describir lo que cambia.',
 'Cada camino une lugares y también nuevas palabras.',
 'Un regalo sencillo puede decir mucho cuando sabes a quién se ofrece.',
 'En el mercado, pregunta con claridad y cuenta con cuidado.',
 'Sigue al pastor: el paisaje también tiene su propio vocabulario.',
 'Distingue a las criaturas por sus rasgos; el adjetivo debe acompañarlas.',
 'El cuerpo nos da palabras para explicar lo que sentimos.',
 'La disciplina de una legión empieza por entender una orden.',
 'El calendario mide las labores y las fiestas de cada estación.',
 'Al amanecer, cada acción encuentra su ritmo.',
 'En la escuela, leer una palabra es el comienzo de comprenderla.',
 'Cuando cambia el cielo, el navegante debe cambiar su plan.',
 'Los números ordenan las cuentas cuando parecen difíciles.',
 'Una letra puede cambiar el sentido; lee despacio y observa.',
 'Una comparación precisa ilumina las cualidades de las personas.',
 'Los nombres de parentesco guardan memoria de varias generaciones.',
 'Un relato distingue lo que duraba de lo que ocurrió una vez.',
 'Un demostrativo señala lo que tienes cerca o aquello que ves a lo lejos.',
 'Una carta lleva la voz de quien está ausente.',
 'El cuidado comienza cuando escuchamos dónde duele.',
 'Los mitos conservan decisiones, riesgos y ayudas inesperadas.',
 'La prudencia importa tanto en el cielo como en la tierra.',
 'La cosecha depende del trabajo paciente de muchas manos.',
 'En el mar, una decisión clara puede salvar a toda la tripulación.',
 'Prepárate antes de partir y sabrás leer las señales del viento.',
 'En una mesa compartida, cada invitado forma parte de la escena.',
 'Las preguntas adecuadas abren una conversación.',
 'Una flota depende de que cada nave comprenda su cometido.',
 'La obligación se expresa con precisión cuando todos comparten una tarea.',
 'El poeta mide el ritmo; el lector descubre el sentido.',
 'Al final, los casos te permiten ver cómo se relaciona cada palabra.'
];

/* Motor de voz: cada frase latina tiene su audio (voz neuronal Piper, ver tools/voz). El archivo se
   busca por un hash de «voz|texto»; tools/spoken.js usa estas mismas funciones para listar las frases. */
function cyrb53(str,seed){seed=seed||0;let h1=0xdeadbeef^seed,h2=0x41c6ce57^seed;for(let i=0,ch;i<str.length;i++){ch=str.charCodeAt(i);h1=Math.imul(h1^ch,2654435761);h2=Math.imul(h2^ch,1597334677)}h1=Math.imul(h1^(h1>>>16),2246822507);h1^=Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507);h2^=Math.imul(h1^(h1>>>13),3266489909);return (4294967296*(2097151&h2)+(h1>>>0)).toString(16)}
const LECTOR='lector';
const voiceOf=speaker=>speaker.toLowerCase().replace(/[^a-z]+/g,'-');
/* La parte latina de un ejemplo («veni! = ¡ven! · audī! = ¡escucha!» → «veni! audī!»); vacío si el ejemplo está en español. */
const EXAMPLE_SIN_LATIN=[33,34];
function latinParts(example,chapter){
  if(EXAMPLE_SIN_LATIN.includes(chapter))return '';
  return example.split(' · ').map(p=>p.split(' = ')[0].replace(/\s*\([^)]*\)/g,'')).join(' → ').split(' → ').map(s=>s.trim()).filter(Boolean).map(s=>/[.!?]$/.test(s)?s:s+'.').join(' ')
}

const defaultState = {completed:[],cards:[]};
let state = readState();
let currentChapter = 0;
let questionIndex = 0;
let activeFilter = 'due';
let reviewQueue = [];
let reviewIndex = 0;
let cardIsFlipped = false;
let toastTimer;
const levels = [
  ['Nivel 1 · Domus et familia', 'Roma, la familia, la casa y la villa', 0, 7],
  ['Nivel 2 · Urbs et rura', 'Mercado, rebaños, cuerpo, ejército y calendario', 7, 14],
  ['Nivel 3 · Schola et mare', 'Escuela, tormenta, números, cartas y parentesco', 14, 21],
  ['Nivel 4 · Fabulae', 'Cartas, mitos, campo y peligros del mar', 21, 28],
  ['Nivel 5 · Convivium et ars', 'Banquete, flota, poesía y mapa de la gramática', 28, 35]
];
const bubbleText = {
  journey: 'Salve! Soy César y te guío por el camino de Roma. Elige un capítulo: el siguiente va en amarillo.',
  cards: 'Las cartas vuelven cuando tu memoria las necesita. Revela la respuesta, dime qué tal fue y ajusto el próximo repaso.'
};
let openLevels = new Set();

function readState(){try{return {...defaultState,...JSON.parse(localStorage.getItem('lingua-latina-v1')||'{}')}}catch{return {...defaultState}}}
function saveState(){localStorage.setItem('lingua-latina-v1',JSON.stringify(state));updateCounts()}
const player=new Audio();player.preload='auto';
player.addEventListener('playing',()=>talking(true,ENVOLVENTES&&ENVOLVENTES[player.dataset.k],()=>player.currentTime));['ended','pause','error'].forEach(e=>player.addEventListener(e,()=>{if(!fuenteCla)talking(false)}));
player.addEventListener('ended',reaccionaALinea);
function reaccionaALinea(){const s=lastLine;lastLine='';if(/!\s*$/.test(s))pose('surprised',1800);else if(/\?\s*$/.test(s))pose('think',1800)}
function esc(s){return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}
function speakBtn(text,voice){return text?`<button class="icon-btn" data-say="${esc(text)}" data-voice="${voice||LECTOR}" aria-label="Escuchar">🔊</button>`:''}
function speak(text,voice){
  if(!text)return;
  if(state.motor==='clasica'){hablaClasica(text,voice);return}
  detenClasica();
  const rate=state.slow?0.75:1;
  const k=cyrb53((voice||LECTOR)+'|'+text);player.pause();player.dataset.k=k;player.defaultPlaybackRate=rate;player.src='audio/'+k+'.mp3';player.playbackRate=rate;
  /* si falta el audio, la voz del navegador (italiana) lee el latín */
  player.play().catch(e=>{if(e.name==='AbortError'||!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='it-IT';u.rate=state.slow?0.7:0.9;u.onstart=()=>talking(true);u.onend=u.onerror=()=>talking(false);speechSynthesis.speak(u)})
}
/* Voz clásica: eSpeak NG (WebAssembly, espeak.js) con pronunciación latina reconstruida. Se carga solo al elegirla. */
const MUJERES=new Set(['aemilia','iulia','avia','syra','serva','ariadna','discipula',LECTOR]);
let ctxAudio=null,fuenteCla=null,moduloCla=null;
function envolvente(x,sr){ /* mismo cálculo que tools/voz/boca.py: nivel de apertura 0-3 cada 50 ms */
  const n=Math.round(sr*PASO_BOCA),k=Math.floor(x.length/n),rms=new Float32Array(k);
  for(let i=0;i<k;i++){let s=0;for(let j=i*n;j<i*n+n;j++)s+=x[j]*x[j];rms[i]=Math.sqrt(s/n)}
  const ref=[...rms].sort((a,b)=>a-b)[Math.floor(0.9*(k-1))]||1,niv=[];
  for(let i=0;i<k;i++){let m=0;for(let j=Math.max(0,i-6);j<=Math.min(k-1,i+6);j++)m=Math.max(m,rms[j]);const r=rms[i]/Math.max(m,1e-6);
    let v=r<.35?0:r<.65?1:r<.9?2:3;if(rms[i]<.2*ref)v=0;if(v===3&&rms[i]<.8*ref)v=2;niv.push(v)}
  return niv.map((v,i)=>i&&i<k-1?[niv[i-1],v,niv[i+1]].sort()[1]:v).join('')
}
function detenClasica(){if(fuenteCla){const s=fuenteCla;fuenteCla=null;s.onended=null;try{s.stop()}catch{}talking(false)}}
async function cargaClasica(){if(!moduloCla){moduloCla=await import('./espeak.js');await moduloCla.cargar()}}
async function hablaClasica(text,voice){
  player.pause();if(window.speechSynthesis)speechSynthesis.cancel();detenClasica();
  try{
    ctxAudio??=new (window.AudioContext||window.webkitAudioContext)(); /* dentro del clic, para que el navegador lo permita */
    const reanuda=ctxAudio.state==='suspended'?ctxAudio.resume():null;
    if(!moduloCla)showToast('Cargando la voz clásica…');
    await cargaClasica();
    const r=await moduloCla.sintetizar(text,{rate:state.slow?105:145,pitch:voice===LECTOR?55:MUJERES.has(voice)?70:40});
    if(!r)return;await reanuda;
    const buf=ctxAudio.createBuffer(1,r.muestras.length,r.frecuencia);buf.getChannelData(0).set(r.muestras);
    const src=ctxAudio.createBufferSource();src.buffer=buf;src.connect(ctxAudio.destination);
    const env=envolvente(r.muestras,r.frecuencia),t0=ctxAudio.currentTime;
    src.onended=()=>{if(fuenteCla===src){fuenteCla=null;talking(false);reaccionaALinea()}};
    fuenteCla=src;src.start();talking(true,env,()=>ctxAudio.currentTime-t0)
  }catch(e){console.error('Voz clásica:',e);moduloCla=null;state.motor='humana';saveState();applyMotor();showToast('No se pudo cargar la voz clásica; uso la voz humana.');speak(text,voice)}
}
function applyMotor(){const b=document.querySelector('#engine-toggle'),c=state.motor==='clasica';b.classList.toggle('on',c);b.setAttribute('aria-pressed',c);b.textContent=c?'🏛 Clásica':'🎙 Humana'}
function applySlow(){const b=document.querySelector('#slow-toggle');b.classList.toggle('on',!!state.slow);b.setAttribute('aria-pressed',!!state.slow)}
function nextChapter(){return chapters.findIndex((c,i)=>!state.completed.includes(i))}
function say(text){document.querySelector('#bubble-text').textContent=text}
/* César: retratos pixel art (avatar/). La cara no cambia: de cada expresión solo se trasplantan cejas, ojos y
   boca (tools/cesar_caras.py). Reacciona al tema del capítulo, a lo que se dice y a lo que haces. */
const POSES=['neutral','m1','m2','m3','happy','surprised','stern','sad','think'];
const FRAMES={};POSES.forEach(n=>{const i=new Image();i.src=`avatar/cesar-${n}.png`;FRAMES[n]=i});
/* boca al hablar: m1, m2, m3 son solo la boca sobre la cara neutral; audio/boca.json da el nivel (0-3) de cada audio cada 50 ms */
const BOCA=['neutral','m1','m2','m3'],PASO_BOCA=0.05;
let ENVOLVENTES=null;fetch('audio/boca.json').then(r=>r.json()).then(j=>{ENVOLVENTES=j}).catch(()=>{});
/* humor de cada capítulo según su tema (cinco emociones base más la neutral) */
const MOOD=['neutral','happy','surprised','stern','happy','neutral','happy','neutral','happy','surprised','sad','stern','think','happy','think','sad','think','think','happy','happy','stern','surprised','neutral','sad','surprised','sad','neutral','sad','happy','happy','happy','neutral','stern','think','happy'];
const OK_LINES=['Optime!','Bene! Así se hace.','Recte!','¡Exacto! Se nota que estudias.','Perfecte!'];
const BAD_LINES=['Non ita. No pasa nada: así se aprende.','Casi. Mira la respuesta y sigue.','Errare humanum est… sigamos.'];
const QUIPS=[['surprised','¡Eh! Cuidado con la corona de laurel.'],['happy','Ave! No cobro por saludar.'],['happy','Alea iacta est. ¿Seguimos?'],['stern','Menos cosquillas y más latín.'],['think','¿Sabías que mi nombre se pronuncia «Kaisar»?']];
let poseTimer,mouthTimer,lipRaf=0,actual='',okStreak=0,badStreak=0,lastLine='';
const pick=a=>a[Math.floor(Math.random()*a.length)];
function setPose(n){
  if(n===actual)return;actual=n;
  const c=document.querySelector('#cesar'),f=FRAMES[n],dibuja=()=>{if(actual===n){const x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);x.drawImage(f,0,0)}};
  f.complete&&f.naturalWidth?dibuja():f.addEventListener('load',dibuja,{once:true})
}
function pose(n,ms){clearTimeout(poseTimer);setPose(n);if(ms)poseTimer=setTimeout(()=>setPose('neutral'),ms)}
function react(n,text,ms){pose(n,ms===undefined?2600:ms);if(text)say(text)}
function talking(on,env,reloj){
  cancelAnimationFrame(lipRaf);clearInterval(mouthTimer);
  if(!on){setPose('neutral');return}
  clearTimeout(poseTimer);
  if(env){const paso=()=>{setPose(BOCA[env[Math.min(env.length-1,Math.floor(reloj()/PASO_BOCA))]]);lipRaf=requestAnimationFrame(paso)};paso()}
  else{const f=['m1','neutral','m2','m1','neutral'];let i=0;setPose('m1');mouthTimer=setInterval(()=>{i=(i+1)%f.length;setPose(f[i])},200)}
}
function reactAnswer(correct){
  if(correct){badStreak=0;okStreak++;
    if(okStreak%3===0)react('happy',`¡${okStreak} seguidas! Veni, vidi, vici.`,3200);
    else react('happy',pick(OK_LINES),2400)}
  else{okStreak=0;badStreak++;
    if(badStreak>=3)react('sad','Respira, repasa la regla de arriba y vuelve a intentarlo.',3200);
    else if(badStreak===2)react('sad',pick(BAD_LINES),2800);
    else react('think',pick(BAD_LINES),2600)}
}
function updateCounts(){
  const due=state.cards.filter(c=>c.due<=Date.now()).length;
  const badge=document.querySelector('#card-count');badge.textContent=state.cards.length;badge.hidden=!state.cards.length;
  document.querySelector('#progress-label').textContent=`${state.completed.length} / ${chapters.length}`;
  document.querySelector('#stat-cards').textContent=state.cards.length;
  document.querySelector('#stat-due').textContent=due;
  document.querySelector('#due-count').textContent=due;
  const go=document.querySelector('#continue-button');go.firstChild.textContent=state.completed.length?'Continuar el viaje ':'Comenzar el viaje '
}
function showToast(message){const node=document.querySelector('#toast');node.textContent=message;node.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>node.classList.remove('show'),2400)}
function navigate(view){document.querySelectorAll('.view').forEach(v=>v.classList.add('hidden'));document.querySelector(`#${view}-view`).classList.remove('hidden');document.querySelectorAll('.nav-button').forEach(b=>b.classList.toggle('on',b.dataset.view===(view==='chapter'?'journey':view)));window.scrollTo(0,0);if(bubbleText[view])say(bubbleText[view]);if(view==='cards'){renderReview();const n=state.cards.filter(c=>c.due<=Date.now()).length;if(!state.cards.length)react('neutral','Aún no hay cartas: resuelve ejercicios y se guardarán solas.',0);else if(n)react('happy',`Tienes ${n} ${n===1?'carta':'cartas'} para hoy. Empecemos, sin prisa pero sin pausa.`,2800);else react('happy','Todo al día. Volverán cuando tu memoria las necesite.',2800)}}
function renderChapters(){
  const next=nextChapter();
  if(!openLevels.size)openLevels.add(levels.findIndex(([,,from,to])=>next<0?from===0:next>=from&&next<to));
  const grid=document.querySelector('#chapter-grid');
  grid.innerHTML=levels.map(([name,desc,from,to],li)=>{
    const done=chapters.slice(from,to).filter((c,k)=>state.completed.includes(from+k)).length;
    const tiles=chapters.slice(from,to).map((c,k)=>{const i=from+k,isDone=state.completed.includes(i);return `<button class="lesson-tile ${isDone?'done':''} ${i===next?'next':''}" data-chapter="${i}"><span class="n">${String(i+1).padStart(2,'0')}</span><span class="st">${isDone?'✓ hecho':i===next?'▶ siguiente':''}</span><span class="t">${c.title}</span><span class="s">${c.theme}</span></button>`}).join('');
    return `<details class="level" data-level="${li}" ${openLevels.has(li)?'open':''}><summary class="level-head"><h2>${name}</h2><span class="muted">${desc}</span><span class="lv-prog"><i style="width:${done/(to-from)*100}%"></i></span><span class="lv-count">${done}/${to-from}</span></summary><div class="lessons">${tiles}</div></details>`
  }).join('');
  grid.querySelectorAll('.level').forEach(d=>d.addEventListener('toggle',()=>{const li=Number(d.dataset.level);d.open?openLevels.add(li):openLevels.delete(li)}));
  grid.querySelectorAll('.lesson-tile').forEach(b=>b.addEventListener('click',()=>openChapter(Number(b.dataset.chapter))))
}
function openChapter(index){currentChapter=index;questionIndex=0;renderChapter();navigate('chapter');react(MOOD[index],caesarVoice[index],3200)}
function renderChapter(){
  const c=chapters[currentChapter];const p=document.querySelector('#chapter-content');
  const speakers=[...new Set(c.dialog.map(line=>line[0]))];
  const dialogue=c.dialog.map(line=>`<div class="msg ${speakers.indexOf(line[0])%2?'me':''}"><div class="head">${line[0]}</div><div class="line"><div><div class="la">${line[1]}</div><span class="es">${line[2]}</span></div>${speakBtn(line[1],voiceOf(line[0]))}</div></div>`).join('');
  const second=c.dialog[0][1].split(' ')[0].replace(/[.,!?]/g,'').toLowerCase();
  p.innerHTML=`<div class="card chapter-head"><div class="kicker">Capitvlvm ${roman(currentChapter+1)} · ${currentChapter+1} / ${chapters.length}</div><h1>${c.title}</h1><p class="muted">${c.theme}</p></div>
<div class="card"><div class="kicker">Scena · diálogo original</div><div class="scene-art ${sceneMap[currentChapter]}" aria-hidden="true"></div><div class="chat">${dialogue}</div><p class="muted small" style="margin:12px 0 0">Adaptación original para practicar el tema del capítulo.</p></div>
<div class="pair"><div class="card"><div class="kicker">Vocabvla · palabras</div><div class="chips"><button class="word-chip" data-say="${esc(c.word[0])}" data-voice="${LECTOR}"><strong>${c.word[0]} <span aria-hidden="true">🔊</span></strong>${c.word[1]}</button><button class="word-chip" data-say="${esc(second)}" data-voice="${LECTOR}"><strong>${second} <span aria-hidden="true">🔊</span></strong>expresión del diálogo</button></div></div>
<div class="card"><div class="kicker">Grammatica · regla</div><h3>${c.grammar}</h3><p>${c.rule}</p><p class="example">${latinParts(c.example,currentChapter)?`<button class="say" data-say="${esc(latinParts(c.example,currentChapter))}" data-voice="${LECTOR}">${c.example} <span aria-hidden="true">🔊</span></button>`:`<span class="say">${c.example}</span>`}</p></div></div>
<div class="card"><div class="kicker">Exercitia · ejercicios</div><div class="steps" id="steps"><span></span><span></span></div><div id="exercise-area"></div><div id="chapter-done" class="chapter-done"><div class="feedback ok"><h3>¡Capítulo completado!</h3><p>Tus cartas quedaron guardadas y volverán a aparecer según tu memoria.</p></div><div class="next-row"><span></span><button id="back-to-map" class="btn primary">Volver al viaje →</button></div></div></div>`;
  renderQuestion();
  p.querySelector('#back-to-map').addEventListener('click',()=>{renderChapters();navigate('journey')})
}
function roman(n){const values=[[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let out='';for(const [value,symbol] of values){while(n>=value){out+=symbol;n-=value}}return out}
function renderQuestion(){
  const c=chapters[currentChapter],area=document.querySelector('#exercise-area'),done=document.querySelector('#chapter-done');
  document.querySelectorAll('#steps span').forEach((s,i)=>{s.className=i<questionIndex?'done':i===questionIndex?'on':''});
  if(questionIndex>=2){area.innerHTML='';done.classList.add('visible');if(!state.completed.includes(currentChapter)&&state.completed.length===chapters.length-1)react('happy','¡Has recorrido todo el camino! Veni, vidi, didici.',5000);else react('happy','Optime! Capítulo completo. Tus cartas te esperan en su día.',3600);if(!state.completed.includes(currentChapter)){state.completed.push(currentChapter);state.completed.sort((a,b)=>a-b);saveState();renderChapters()}return}
  done.classList.remove('visible');
  const isWord=questionIndex===0;
  const prompt=isWord?`¿Qué significa <i>${c.word[0]}</i>?`:c.quiz[0];
  const pool=chapters.filter((chapter,i)=>i!==currentChapter).map(chapter=>chapter.word[1]).filter((value,i,array)=>value!==c.word[1]&&array.indexOf(value)===i);
  let choices=isWord?[c.word[1],...pool.slice(0,2)]:c.quiz[1].slice();
  const answerValue=isWord?c.word[1]:c.quiz[1][c.quiz[2]];
  choices.sort(()=>Math.random()-.5);
  const answer=choices.indexOf(answerValue);
  area.innerHTML=`<div class="ex-type"><span>${isWord?'Vocabvla':'Grammatica'}</span><span>${questionIndex+1} / 2</span></div><p class="prompt">${prompt}</p><div class="choices">${choices.map((choice,i)=>`<button class="choice" data-index="${i}" data-k="${'ABC'[i]}">${choice}</button>`).join('')}</div><div class="feedback-slot" aria-live="polite"></div><div class="next-row"><span class="muted small">+ carta de ${isWord?'palabra':'gramática'}</span><button class="btn primary next-question" disabled>Continuar →</button></div>`;
  let answered=false;
  area.querySelectorAll('.choice').forEach(button=>button.addEventListener('click',()=>{
    if(answered)return;answered=true;
    const selected=Number(button.dataset.index);
    area.querySelectorAll('.choice').forEach((option,i)=>{option.disabled=true;if(i===answer)option.classList.add('ok');if(i===selected&&selected!==answer)option.classList.add('bad')});
    const correct=selected===answer;reactAnswer(correct);
    area.querySelector('.feedback-slot').innerHTML=`<div class="feedback ${correct?'ok':'bad'}"><h3>${correct?'Bene!':'Non ita.'}</h3><p>${correct?'Respuesta correcta. La carta se guardó.':`La respuesta correcta es: <b>${choices[answer]}</b>. La carta se guardó.`}</p></div>`;
    const front=isWord?c.word[0]:c.grammar;const back=isWord?c.word[1]:c.rule;
    upsertCard({type:isWord?'word':'grammar',chapter:currentChapter,front,back,example:isWord?c.example:c.quiz[0]});
    area.querySelector('.next-question').disabled=false
  }));
  area.querySelector('.next-question').addEventListener('click',()=>{questionIndex++;renderQuestion()})
}
function upsertCard(data){const id=`${data.type}-${data.chapter}-${slug(data.front)}`;const old=state.cards.find(c=>c.id===id);if(old){old.seen=(old.seen||1)+1;old.lastSeen=Date.now()}else state.cards.push({id,...data,created:Date.now(),lastSeen:Date.now(),due:Date.now(),interval:0,ease:2.5,repetitions:0,seen:1});saveState()}
function slug(s){return s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-')}
function renderReview(){const due=state.cards.filter(c=>c.due<=Date.now());document.querySelector('#due-count').textContent=due.length;document.querySelector('#review-area').innerHTML='';const filters=[...document.querySelectorAll('.chip')];filters.forEach(b=>{b.classList.toggle('on',b.dataset.filter===activeFilter);b.onclick=()=>{activeFilter=b.dataset.filter;reviewIndex=0;cardIsFlipped=false;renderReview()}});let cards=activeFilter==='all'?state.cards.slice():activeFilter==='word'?state.cards.filter(c=>c.type==='word'):activeFilter==='grammar'?state.cards.filter(c=>c.type==='grammar'):due.slice();cards.sort((a,b)=>a.due-b.due);reviewQueue=cards;reviewIndex=Math.min(reviewIndex,Math.max(cards.length-1,0));if(!cards.length){const hasFuture=state.cards.length>0;document.querySelector('#review-area').innerHTML=`<div class="empty-state"><strong>${hasFuture?'Todo repasado por hoy.':'Aún no tienes cartas.'}</strong><p>${hasFuture?'Las próximas cartas aparecerán en su fecha. Puedes mirar todas tus cartas mientras tanto.':'Completa ejercicios en un capítulo para guardar cartas de palabras y gramática automáticamente.'}</p></div>`;return}drawReviewCard()}
function drawReviewCard(){const area=document.querySelector('#review-area'),card=reviewQueue[reviewIndex];if(!card)return;const label=card.type==='word'?'Palabra':'Gramática';area.innerHTML=`<div class="card review-card"><div class="review-type">${label} · Cap. ${String(card.chapter+1).padStart(2,'0')} · ${reviewIndex+1}/${reviewQueue.length}</div><div class="front-row"><h2 class="review-front">${card.front}</h2>${card.type==='word'?speakBtn(card.front,LECTOR):''}</div>${cardIsFlipped?`<p class="review-back">${card.back}</p><p class="review-example">${card.example}</p><div class="grades"><button class="btn red" data-grade="hard">Difícil<small>1 día</small></button><button class="btn primary" data-grade="medium">Regular<small>≈ 3 días</small></button><button class="btn green" data-grade="easy">Fácil<small>≈ 7 días</small></button></div>`:`<button class="btn big flip-button">Mostrar respuesta ↓</button>`}</div>`;const flip=area.querySelector('.flip-button');if(flip)flip.onclick=()=>{cardIsFlipped=true;drawReviewCard()};area.querySelectorAll('[data-grade]').forEach(b=>b.onclick=()=>gradeCard(card,b.dataset.grade))}
function gradeCard(card,grade){let quality=grade==='hard'?2:grade==='medium'?3:5;card.ease=Math.max(1.3,card.ease+(0.1-(5-quality)*(0.08+(5-quality)*0.02)));if(quality<3){card.repetitions=0;card.interval=1}else{card.repetitions++;if(grade==='hard')card.interval=1;else if(card.repetitions===1)card.interval=grade==='easy'?7:3;else card.interval=Math.max(1,Math.round(card.interval*card.ease*(grade==='easy'?1.25:1)))}card.due=Date.now()+card.interval*86400000;card.lastSeen=Date.now();saveState();const prev=reviewIndex;reviewQueue=reviewQueue.filter(c=>c.id!==card.id);reviewIndex=Math.min(prev,reviewQueue.length-1);cardIsFlipped=false;renderReview();showToast(`Próximo repaso: ${card.interval} ${card.interval===1?'día':'días'}.`);if(!reviewQueue.length&&activeFilter==='due')react('happy','¡Todo repasado por hoy! Optime.',3600);else if(grade==='hard')react('sad','Difícil, ¿eh? Volverá pronto: así se fija.',2600);else if(grade==='easy')react('happy',pick(['Facile!','Te la sabes. Sigamos.']),2400);else react('happy','Bene. La veremos de nuevo en unos días.',2400)}
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.view)));
document.querySelector('.logo').addEventListener('click',e=>{e.preventDefault();navigate('journey')});
document.querySelector('#continue-button').addEventListener('click',()=>{const next=nextChapter();openChapter(next<0?0:next)});
document.addEventListener('click',e=>{const b=e.target.closest('[data-say]');if(b){lastLine=b.closest('.msg')?b.dataset.say:'';speak(b.dataset.say,b.dataset.voice)}});
document.querySelector('#engine-toggle').addEventListener('click',()=>{
  state.motor=state.motor==='clasica'?'humana':'clasica';saveState();applyMotor();detenClasica();player.pause();
  if(state.motor==='clasica'){showToast('Voz clásica (eSpeak): pronunciación latina reconstruida, más robótica.');cargaClasica().catch(e=>{console.error(e);moduloCla=null;state.motor='humana';saveState();applyMotor();showToast('No se pudo cargar la voz clásica; uso la voz humana.')})}
  else showToast('Voz humana (neuronal).')});
document.querySelector('#slow-toggle').addEventListener('click',()=>{state.slow=!state.slow;saveState();applySlow();showToast(state.slow?'Voz lenta activada.':'Voz a velocidad normal.');react('happy',state.slow?'Festina lente: apresúrate despacio.':'A buen paso entonces.',2400)});
document.querySelector('.avatar').addEventListener('click',()=>{const [p,s]=pick(QUIPS);react(p,s,2600)});
renderChapters();updateCounts();applySlow();applyMotor();setPose('neutral');
const away=state.lastVisit?(Date.now()-state.lastVisit)/864e5:0;
if(state.completed.length&&away>=3)react('surprised',`¡Han pasado ${Math.floor(away)} días! Repasemos antes de seguir.`,4000);
else if(state.completed.length)react('happy','Salve de nuevo. Sigamos donde lo dejamos.',3000);
else say(bubbleText.journey);
state.lastVisit=Date.now();saveState();

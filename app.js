/* Lingua Latina. Los datos viven en data/ (capítulos, vocabulario, banco de ejercicios) y la lógica en morfo.js, ejercicios.js y tarjetas.js.
   Aquí: navegación, voz, César y la pantalla de cada capítulo. */
const chapters = CAPITULOS;
const sceneMap=['land-city','land-atrium','land-atrium','land-atrium','land-garden','land-city','land-garden','land-city','land-field','land-field','land-sickroom','land-army','land-city','land-atrium','land-school','land-sea','land-school','land-school','land-atrium','land-atrium','land-school','land-garden','land-school','land-sickroom','land-myth','land-myth','land-field','land-sea','land-sea','land-banquet','land-banquet','land-sea','land-army','land-school','land-school'];

/* Motor de voz: cada frase latina tiene su audio (voz neuronal, ver tools/voz). El archivo se busca por un hash
   de «voz|texto»; tools/spoken.js lista las frases de data/ con las mismas funciones. */
function cyrb53(str,seed){seed=seed||0;let h1=0xdeadbeef^seed,h2=0x41c6ce57^seed;for(let i=0,ch;i<str.length;i++){ch=str.charCodeAt(i);h1=Math.imul(h1^ch,2654435761);h2=Math.imul(h2^ch,1597334677)}h1=Math.imul(h1^(h1>>>16),2246822507);h1^=Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507);h2^=Math.imul(h1^(h1>>>13),3266489909);return (4294967296*(2097151&h2)+(h1>>>0)).toString(16)}
const LECTOR='lector';
const voiceOf=speaker=>speaker.toLowerCase().replace(/[^a-z]+/g,'-');

const defaultState = {completed:[],cards:[],ej:{tags:{},usados:{},mejor:{}}};
let state = readState();
let currentChapter = 0;
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

function readState(){try{const s={...defaultState,...JSON.parse(localStorage.getItem('lingua-latina-v1')||'{}')};s.ej={...defaultState.ej,...(s.ej||{})};return s}catch{return {...defaultState}}}
function saveState(){try{localStorage.setItem('lingua-latina-v1',JSON.stringify(state))}catch{}updateCounts()}
const player=new Audio();player.preload='auto';
player.addEventListener('playing',()=>talking(true));['ended','pause','error'].forEach(e=>player.addEventListener(e,()=>{if(!fuenteCla)talking(false)}));
player.addEventListener('ended',reaccionaALinea);
function reaccionaALinea(){const s=lastLine;lastLine='';if(/!\s*$/.test(s))pose('surprised',1800);else if(/\?\s*$/.test(s))pose('think',1800)}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}
function speakBtn(text,voice){return text?`<button class="icon-btn" data-say="${esc(text)}" data-voice="${voice||LECTOR}" aria-label="Escuchar">🔊</button>`:''}
function speak(text,voice){
  if(!text)return;
  if(state.motor==='clasica'){hablaClasica(text,voice);return}
  detenClasica();
  const rate=state.slow?0.75:1;
  const k=cyrb53((voice||LECTOR)+'|'+text);player.pause();player.dataset.k=k;player.defaultPlaybackRate=rate;player.src='audio/'+k+'.mp3?v='+VER;player.playbackRate=rate;
  /* si falta el audio, la voz del navegador (italiana) lee el latín */
  player.play().catch(e=>{if(e.name==='AbortError'||!window.speechSynthesis)return;speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='it-IT';u.rate=state.slow?0.7:0.9;u.onstart=()=>talking(true);u.onend=u.onerror=()=>talking(false);speechSynthesis.speak(u)})
}
/* Voz clásica: eSpeak NG (WebAssembly, espeak.js) con pronunciación latina reconstruida. Se carga solo al elegirla. */
const MUJERES=new Set(['aemilia','iulia','avia','syra','serva','ariadna','discipula',LECTOR]);
let ctxAudio=null,fuenteCla=null,moduloCla=null;
function detenClasica(){if(fuenteCla){const s=fuenteCla;fuenteCla=null;s.onended=null;try{s.stop()}catch{}talking(false)}}
async function cargaClasica(){if(!moduloCla){moduloCla=await import('./espeak.js?v='+VER);await moduloCla.cargar()}}
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
    src.onended=()=>{if(fuenteCla===src){fuenteCla=null;talking(false);reaccionaALinea()}};
    fuenteCla=src;src.start();talking(true)
  }catch(e){console.error('Voz clásica:',e);moduloCla=null;state.motor='humana';saveState();applyMotor();showToast('No se pudo cargar la voz clásica; uso la voz humana.');speak(text,voice)}
}
function applyMotor(){const b=document.querySelector('#engine-toggle'),c=state.motor==='clasica';b.classList.toggle('on',c);b.setAttribute('aria-pressed',c);b.textContent=c?'🏛 Clásica':'🎙 Humana'}
function applySlow(){const b=document.querySelector('#slow-toggle');b.classList.toggle('on',!!state.slow);b.setAttribute('aria-pressed',!!state.slow)}
function applyEstricto(){const b=document.querySelector('#macron-toggle');b.classList.toggle('on',!!state.estricto);b.setAttribute('aria-pressed',!!state.estricto)}
function nextChapter(){return chapters.findIndex((c,i)=>!state.completed.includes(i))}
function say(text){document.querySelector('#bubble-text').textContent=text}
/* César: retratos pixel art (avatar/): la base neutral, cinco emociones y tres aperturas de boca, todas pintadas por
   inpainting sobre la misma cara (ver avatar/README.md). Reacciona al tema del capítulo, a lo que se dice y a lo que haces.
   VER sube la versión de las imágenes, del JS y del CSS para que ningún navegador mezcle archivos antiguos guardados en caché. */
const VER=7;
const POSES=['neutral','happy','surprised','stern','sad','think'];
const FRAMES={};POSES.forEach(n=>{const i=new Image();i.src=`avatar/cesar-${n}.png?v=${VER}`;FRAMES[n]=i});
/* humor de cada capítulo según su tema (cinco emociones base más la neutral) */
const MOOD=['neutral','happy','surprised','stern','happy','neutral','happy','neutral','happy','surprised','sad','stern','think','happy','think','sad','think','think','happy','happy','stern','surprised','neutral','sad','surprised','sad','neutral','sad','happy','happy','happy','neutral','stern','think','happy'];
const OK_LINES=['Optime!','Bene! Así se hace.','Recte!','¡Exacto! Se nota que estudias.','Perfecte!'];
const BAD_LINES=['Non ita. No pasa nada: así se aprende.','Casi. Mira la respuesta y sigue.','Errare humanum est… sigamos.'];
const QUIPS=[['surprised','¡Eh! Cuidado con la corona de laurel.'],['happy','Ave! No cobro por saludar.'],['happy','Alea iacta est. ¿Seguimos?'],['stern','Menos cosquillas y más latín.'],['think','¿Sabías que mi nombre se pronuncia «Kaisar»?']];
let poseTimer,mouthTimer,lipRaf=0,actual='',okStreak=0,badStreak=0,lastLine='';
const pick=a=>a[Math.floor(Math.random()*a.length)];
function setPose(n){
  if(!FRAMES[n])n='neutral'; /* solo existen estas caras: cualquier pose desconocida se ve neutral */
  if(n===actual)return;actual=n;
  const c=document.querySelector('#cesar'),f=FRAMES[n],dibuja=()=>{if(actual===n){const x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);x.drawImage(f,0,0)}};
  f.complete&&f.naturalWidth?dibuja():f.addEventListener('load',dibuja,{once:true})
}
function pose(n,ms){clearTimeout(poseTimer);setPose(n);if(ms)poseTimer=setTimeout(()=>setPose('neutral'),ms)}
function react(n,text,ms){pose(n,ms===undefined?2600:ms);if(text)say(text)}
/* César no mueve la boca al hablar (pedido del usuario): mientras suena un audio se queda con su cara base. */
function talking(on){cancelAnimationFrame(lipRaf);clearInterval(mouthTimer);if(!on)setPose('neutral');else clearTimeout(poseTimer)}
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
    const tiles=chapters.slice(from,to).map((c,k)=>{const i=from+k,isDone=state.completed.includes(i),m=(state.ej.mejor||{})[i+1];return `<button class="lesson-tile ${isDone?'done':''} ${i===next?'next':''}" data-chapter="${i}"><span class="n">${String(i+1).padStart(2,'0')}</span><span class="st">${isDone?'✓ hecho':i===next?'▶ siguiente':m?m+' %':''}</span><span class="t">${c.latin}</span><span class="s">${c.tema}</span></button>`}).join('');
    return `<details class="level" data-level="${li}" ${openLevels.has(li)?'open':''}><summary class="level-head"><h2>${name}</h2><span class="muted">${desc}</span><span class="lv-prog"><i style="width:${done/(to-from)*100}%"></i></span><span class="lv-count">${done}/${to-from}</span></summary><div class="lessons">${tiles}</div></details>`
  }).join('');
  grid.querySelectorAll('.level').forEach(d=>d.addEventListener('toggle',()=>{const li=Number(d.dataset.level);d.open?openLevels.add(li):openLevels.delete(li)}));
  grid.querySelectorAll('.lesson-tile').forEach(b=>b.addEventListener('click',()=>openChapter(Number(b.dataset.chapter))))
}
function openChapter(index){currentChapter=index;renderChapter();navigate('chapter');react(MOOD[index],'Consejo del día: '+chapters[index].consejo,5200)}
function glosaChip(v){return `<li class="vocab-row"><button class="icon-btn" data-say="${esc(v[0])}" data-voice="${LECTOR}" aria-label="Escuchar ${esc(v[0])}">🔊</button><span class="v-la"><b>${esc(v[0])}</b>${v[1]&&!/^indecl/.test(v[1])?` <span class="v-forms">${esc(v[1])}</span>`:''}</span><span class="v-es">${esc(v[3])}${v[4]?` <span class="v-rel">${esc(v[4])}</span>`:''}</span></li>`}
function renderChapter(){
  const c=chapters[currentChapter],n=currentChapter+1,p=document.querySelector('#chapter-content');
  const vocab=(VOCAB[n]||[]);
  p.innerHTML=`<div class="card chapter-head"><div class="kicker">Capitvlvm ${roman(n)} · ${n} / ${chapters.length}</div><h1>${c.latin}</h1><p class="muted">${c.tema}</p><div class="scene-art ${sceneMap[currentChapter]}" aria-hidden="true"></div></div>
<div class="card"><div class="kicker">Grammatica · ${esc(c.gramatica)}</div>${c.regla.map(t=>`<p>${t}</p>`).join('')}<p class="example"><button class="say" data-say="${esc(c.ejemplo.la)}" data-voice="${LECTOR}">${c.ejemplo.la} <span aria-hidden="true">🔊</span></button></p><p class="muted small">${c.ejemplo.es}</p><div class="consejo"><b>Consejo de César.</b> ${c.consejo}</div></div>
<div class="card"><div class="kicker">Vocabvla · ${vocab.length} palabras nuevas</div><details class="vocab-det"><summary>Ver la lista</summary><ul class="vocab-list">${vocab.map(glosaChip).join('')}</ul></details></div>
<div class="card" id="ex-card"><div class="kicker">Exercitia · ejercicios</div><div class="steps" id="steps"></div><div id="exercise-area"></div><div id="chapter-done" class="chapter-done"></div></div>`;
  startTanda()
}
function roman(n){const values=[[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let out='';for(const [value,symbol] of values){while(n>=value){out+=symbol;n-=value}}return out}

/* ───── tanda de ejercicios de un capítulo ───── */
let tanda=[],tIndex=0,tOk=0,tTotal=0,tEstricto=false;
function startTanda(){
  const n=currentChapter+1;
  tanda=Ejer.tanda(n,state.ej);tIndex=0;tOk=0;tTotal=tanda.filter(e=>!e.repaso).length;
  tEstricto=!!(state.estricto||chapters[currentChapter].estricto);
  document.querySelector('#chapter-done').classList.remove('visible');document.querySelector('#chapter-done').innerHTML='';
  renderEjercicio()
}
function pasos(){const s=document.querySelector('#steps');s.innerHTML=tanda.map((e,i)=>`<span class="${i<tIndex?'done':i===tIndex?'on':''}${e.repaso?' repaso':''}"></span>`).join('')}
function renderEjercicio(){
  const area=document.querySelector('#exercise-area');pasos();
  if(tIndex>=tanda.length){area.innerHTML='';return finTanda()}
  const ej=tanda[tIndex],ultimo=tIndex===tanda.length-1;
  Ejer.ui(area,ej,res=>{
    if(!ej.repaso&&res.ok)tOk++;
    Ejer.anota(state.ej,res);
    if(ej.id){const u=state.ej.usados[ej.cap]=state.ej.usados[ej.cap]||[];if(!u.includes(ej.id))u.push(ej.id)}
    const tocadas=Tarj.alResolver(state.cards,res,currentChapter+1);
    tocadas.forEach(t=>Tarj.inversa(state.cards,t));
    saveState();reactAnswer(res.ok)
  },{contador:`${tIndex+1} / ${tanda.length}`,estricto:tEstricto,continuar:ultimo?'Ver resultado →':'Continuar →',alContinuar:()=>{tIndex++;renderEjercicio();document.querySelector('#ex-card').scrollIntoView({block:'start'})}});
}
function finTanda(){
  const n=currentChapter+1,pct=tTotal?Math.round(100*tOk/tTotal):100,done=document.querySelector('#chapter-done'),ya=state.completed.includes(currentChapter),aprobado=pct>=80;
  state.ej.mejor[n]=Math.max(state.ej.mejor[n]||0,pct);
  let nuevo=false;
  if(aprobado&&!ya){state.completed.push(currentChapter);state.completed.sort((a,b)=>a-b);nuevo=true}
  saveState();renderChapters();
  if(aprobado)react('happy',nuevo&&state.completed.length===chapters.length?'¡Has recorrido todo el camino! Veni, vidi, didici.':`Optime! ${pct} %: capítulo superado. Tus cartas te esperan en su día.`,4200);
  else react('think',`${pct} %: casi. Con un 80 % pasas. Repasa la regla y prueba con ejercicios nuevos.`,4200);
  done.innerHTML=`<div class="feedback ${aprobado?'ok':'bad'}"><h3>${aprobado?'¡Capítulo completado!':'Todavía no'}</h3><p>Acertaste ${tOk} de ${tTotal} (${pct} %). ${aprobado?'Lo que fallaste volverá hoy en tus cartas.':'Hace falta un 80 % para completar el capítulo.'}</p></div><div class="next-row"><button id="repetir" class="btn ${aprobado?'ghost':'primary'}">${aprobado?'Practicar otra tanda':'Repetir con ejercicios nuevos'}</button><button id="back-to-map" class="btn ${aprobado?'primary':'ghost'}">Volver al viaje →</button></div>`;
  done.classList.add('visible');
  done.querySelector('#repetir').addEventListener('click',()=>{startTanda();document.querySelector('#ex-card').scrollIntoView({block:'start'})});
  done.querySelector('#back-to-map').addEventListener('click',()=>{renderChapters();navigate('journey')})
}

/* ───── cartas ───── */
function slug(s){return Tarj.slug(s)}
function renderReview(){
  const due=state.cards.filter(c=>c.due<=Date.now());
  document.querySelector('#due-count').textContent=due.length;document.querySelector('#review-area').innerHTML='';
  const filters=[...document.querySelectorAll('.chip[data-filter]')],sel=document.querySelector('#cap-filter');
  filters.forEach(b=>{b.classList.toggle('on',b.dataset.filter===activeFilter);b.onclick=()=>{activeFilter=b.dataset.filter;reviewIndex=0;cardIsFlipped=false;renderReview()}});
  const caps=[...new Set(state.cards.map(c=>c.chapter).filter(Boolean))].sort((a,b)=>a-b);
  sel.innerHTML='<option value="">Por capítulo…</option>'+caps.map(c=>`<option value="cap:${c}" ${activeFilter==='cap:'+c?'selected':''}>Cap. ${roman(c)}</option>`).join('');
  sel.classList.toggle('on',/^cap:/.test(activeFilter));
  sel.onchange=()=>{if(sel.value){activeFilter=sel.value;reviewIndex=0;cardIsFlipped=false;renderReview()}};
  const cards=Tarj.filtrar(state.cards,activeFilter);
  reviewQueue=cards;reviewIndex=Math.min(reviewIndex,Math.max(cards.length-1,0));
  if(!cards.length){const hasFuture=state.cards.length>0;document.querySelector('#review-area').innerHTML=`<div class="empty-state"><strong>${hasFuture?'Todo repasado por hoy.':'Aún no tienes cartas.'}</strong><p>${hasFuture?'Las próximas cartas aparecerán en su fecha. Puedes mirar todas tus cartas mientras tanto.':'Completa ejercicios en un capítulo para guardar cartas de palabras y gramática automáticamente.'}</p></div>`;return}
  drawReviewCard()
}
function drawReviewCard(){
  const area=document.querySelector('#review-area'),card=reviewQueue[reviewIndex];if(!card)return;
  const palabra=card.type==='word',inversa=card.dir==='es-la',label=palabra?(inversa?'Palabra · español → latín':'Palabra'):'Gramática';
  const habla=palabra&&card.lema?speakBtn(card.lema,LECTOR):'';
  area.innerHTML=`<div class="card review-card"><div class="review-type">${label} · Cap. ${String(card.chapter||0).padStart(2,'0')} · ${reviewIndex+1}/${reviewQueue.length}</div><div class="front-row"><h2 class="review-front">${esc(card.front)}</h2>${inversa?'':habla}</div>${cardIsFlipped?`<p class="review-back">${esc(card.back)}${inversa?habla:''}</p>${card.rel?`<p class="review-rel">${esc(card.rel)}</p>`:''}${card.example?`<p class="review-example">${esc(card.example)} ${speakBtn(card.example,LECTOR)}</p>`:''}<div class="grades"><button class="btn red" data-grade="hard">Difícil<small>1 día</small></button><button class="btn primary" data-grade="medium">Regular<small>≈ 3 días</small></button><button class="btn green" data-grade="easy">Fácil<small>≈ 7 días</small></button></div>`:`<button class="btn big flip-button">Mostrar respuesta ↓</button>`}</div>`;
  const flip=area.querySelector('.flip-button');if(flip)flip.onclick=()=>{cardIsFlipped=true;drawReviewCard()};
  area.querySelectorAll('[data-grade]').forEach(b=>b.onclick=()=>gradeCard(card,b.dataset.grade))
}
function gradeCard(card,grade){let quality=grade==='hard'?2:grade==='medium'?3:5;card.ease=Math.max(1.3,card.ease+(0.1-(5-quality)*(0.08+(5-quality)*0.02)));if(quality<3){card.repetitions=0;card.interval=1}else{card.repetitions++;if(grade==='hard')card.interval=1;else if(card.repetitions===1)card.interval=grade==='easy'?7:3;else card.interval=Math.max(1,Math.round(card.interval*card.ease*(grade==='easy'?1.25:1)))}card.due=Date.now()+card.interval*86400000;card.lastSeen=Date.now();const inv=Tarj.inversa(state.cards,card);saveState();const prev=reviewIndex;reviewQueue=reviewQueue.filter(c=>c.id!==card.id);reviewIndex=Math.min(prev,reviewQueue.length-1);cardIsFlipped=false;renderReview();showToast(inv?'Nueva carta: español → latín.':`Próximo repaso: ${card.interval} ${card.interval===1?'día':'días'}.`);if(!reviewQueue.length&&activeFilter==='due')react('happy','¡Todo repasado por hoy! Optime.',3600);else if(grade==='hard')react('sad','Difícil, ¿eh? Volverá pronto: así se fija.',2600);else if(grade==='easy')react('happy',pick(['Facile!','Te la sabes. Sigamos.']),2400);else react('happy','Bene. La veremos de nuevo en unos días.',2400)}

document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.view)));
document.querySelector('.logo').addEventListener('click',e=>{e.preventDefault();navigate('journey')});
document.querySelector('#continue-button').addEventListener('click',()=>{const next=nextChapter();openChapter(next<0?0:next)});
document.addEventListener('click',e=>{const b=e.target.closest('[data-say]');if(b){lastLine='';speak(b.dataset.say,b.dataset.voice)}});
document.querySelector('#engine-toggle').addEventListener('click',()=>{
  state.motor=state.motor==='clasica'?'humana':'clasica';saveState();applyMotor();detenClasica();player.pause();
  if(state.motor==='clasica'){showToast('Voz clásica (eSpeak): pronunciación latina reconstruida, más robótica.');cargaClasica().catch(e=>{console.error(e);moduloCla=null;state.motor='humana';saveState();applyMotor();showToast('No se pudo cargar la voz clásica; uso la voz humana.')})}
  else showToast('Voz humana (neuronal).')});
document.querySelector('#slow-toggle').addEventListener('click',()=>{state.slow=!state.slow;saveState();applySlow();showToast(state.slow?'Voz lenta activada.':'Voz a velocidad normal.');react('happy',state.slow?'Festina lente: apresúrate despacio.':'A buen paso entonces.',2400)});
document.querySelector('#macron-toggle').addEventListener('click',()=>{state.estricto=!state.estricto;saveState();applyEstricto();showToast(state.estricto?'Macrones estrictos: la cantidad cuenta.':'Macrones flexibles: se aceptan sin ellos.');react('stern',state.estricto?'Ahora la cantidad vocálica cuenta. Puella no es puellā.':'Sin macrones también vale… por ahora.',2800)});
document.querySelector('.avatar').addEventListener('click',()=>{const [p,s]=pick(QUIPS);react(p,s,2600)});
Ejer.carga({BANCO,NOMBRES,VOCAB,CAPITULOS});
if(Tarj.migra(state.cards))showToast('Tus cartas se actualizaron al nuevo formato.');
renderChapters();updateCounts();applySlow();applyMotor();applyEstricto();setPose('neutral');
if(window.requestIdleCallback)requestIdleCallback(()=>{try{Morfo.analiza('a')}catch{}});
const away=state.lastVisit?(Date.now()-state.lastVisit)/864e5:0;
if(state.completed.length&&away>=3)react('surprised',`¡Han pasado ${Math.floor(away)} días! Repasemos antes de seguir.`,4000);
else if(state.completed.length)react('happy','Salve de nuevo. Sigamos donde lo dejamos.',3000);
else say(bubbleText.journey);
state.lastVisit=Date.now();saveState();

import { init, playIPA } from './assets/espeak-ng/espeak-wasm-driver.js';

const engineDir = new URL('./assets/espeak-ng/', import.meta.url);
const status = document.querySelector('#voice-status');
let enginePromise;
let ready = false;
let failed = false;
let speaking = false;

function loadEngine() {
  if (!enginePromise) {
    enginePromise = init({
      wasmURL: new URL('espeak-ng.wasm', engineDir),
      dataURL: new URL('espeak-ng.data', engineDir),
      loaderURL: new URL('espeak-ng.js', engineDir),
      mappingURL: new URL('la.json', engineDir),
      voice: 'la'
    }).then(() => {
      ready = true;
      failed = false;
      status.textContent = 'Voz clásica lista';
      syncButtons();
    }).catch(error => {
      enginePromise = null;
      failed = true;
      status.textContent = 'No se pudo cargar la voz. Pulsa «Escuchar latín» para reintentar.';
      console.error('No se pudo iniciar la voz latina:', error);
      syncButtons();
      throw error;
    });
  }
  return enginePromise;
}

function syncButtons() {
  const buttons = document.querySelectorAll('[data-speak-line]');
  document.querySelectorAll('[data-speak-line]').forEach(button => {
    button.disabled = (!ready && !failed) || speaking;
  });
  if (buttons.length && !ready && !failed && !enginePromise) {
    status.textContent = 'Cargando motor de voz clásica…';
    loadEngine().catch(() => {});
  }
}

new MutationObserver(syncButtons).observe(document.body, { childList: true, subtree: true });
syncButtons();

document.addEventListener('click', async event => {
  const button = event.target.closest('[data-speak-line]');
  if (!button || button.disabled || speaking) return;
  const latin = button.closest('.msg')?.querySelector('.la')?.textContent ?? '';
  const ipa = latinToClassicalIPA(latin);
  if (!ipa) return;

  speaking = true;
  syncButtons();
  button.textContent = '◖ Reproduciendo…';
  try {
    if (!ready) await loadEngine();
    await playIPA(ipa, { rate: 145 });
    status.textContent = 'Voz clásica lista';
  } catch (error) {
    status.textContent = 'No se pudo reproducir el audio. Vuelve a pulsar el botón.';
    console.error('No se pudo reproducir la voz latina:', error);
  } finally {
    button.textContent = '▶ Escuchar latín';
    speaking = false;
    syncButtons();
  }
});

function latinToClassicalIPA(text) {
  const words = String(text).normalize('NFC').match(/[A-Za-zĀāĒēĪīŌōŪūȲȳ]+/gu) ?? [];
  return words.map(wordToIPA).join(' ');
}

function wordToIPA(source) {
  const word = source.toLowerCase();
  const units = [];
  const vowels = 'aeiouyāēīōūȳ';
  const diphthongs = {
    ae: ['aɪ̯', true], au: ['aʊ̯', true], ei: ['eɪ̯', true],
    eu: ['eʊ̯', true], oe: ['oɪ̯', true]
  };
  const longVowels = { ā: 'aː', ē: 'eː', ī: 'iː', ō: 'oː', ū: 'uː', ȳ: 'yː' };
  const shortVowels = { a: 'a', e: 'ɛ', i: 'ɪ', o: 'ɔ', u: 'ʊ', y: 'y' };
  const consonants = { b: 'b', c: 'k', d: 'd', f: 'f', g: 'ɡ', h: 'h',
    k: 'k', l: 'l', m: 'm', n: 'n', p: 'p', q: 'k', r: 'r', s: 's',
    t: 't', v: 'w', w: 'w', x: 'ks', z: 'zd' };

  for (let i = 0; i < word.length;) {
    const pair = word.slice(i, i + 2);
    if (diphthongs[pair]) {
      units.push({ ipa: diphthongs[pair][0], nucleus: true, heavy: true });
      i += 2;
      continue;
    }
    if (['ch', 'ph', 'th'].includes(pair)) {
      units.push({ ipa: `${{ ch: 'k', ph: 'p', th: 't' }[pair]}ʰ`, nucleus: false });
      i += 2;
      continue;
    }
    if (pair === 'qu') {
      units.push({ ipa: 'kʷ', nucleus: false });
      i += 2;
      continue;
    }
    if (pair === 'gu' && i + 2 < word.length && vowels.includes(word[i + 2])) {
      units.push({ ipa: 'ɡʷ', nucleus: false });
      i += 2;
      continue;
    }
    if ((word.startsWith('cui') || word.startsWith('hui')) && word[i] === 'u' && word[i + 1] === 'i') {
      units.push({ ipa: 'ʊ', nucleus: true, heavy: false }, { ipa: 'j', nucleus: false });
      i += 2;
      continue;
    }

    const char = word[i];
    if (longVowels[char] || shortVowels[char]) {
      units.push({ ipa: longVowels[char] ?? shortVowels[char], nucleus: true, heavy: Boolean(longVowels[char]) });
      i++;
      continue;
    }

    if (char === 'i' && i + 1 < word.length && vowels.includes(word[i + 1]) &&
        (i === 0 || (word.slice(i - 2, i) !== 'qu' && vowels.includes(word[i - 1])))) {
      units.push({ ipa: 'j', nucleus: false });
      i++;
      continue;
    }

    let ipa = consonants[char];
    if (char === 'n' && /[cgkq]/.test(word[i + 1] ?? '')) ipa = 'ŋ';
    if (char === 'i') ipa = 'ɪ';
    if (char === 'j') ipa = 'j';
    if (!ipa) { i++; continue; }
    if (ipa.length === 1 && word[i + 1] === char) {
      units.push({ ipa: `${ipa}ː`, nucleus: false });
      i += 2;
    } else {
      for (const part of ipa) units.push({ ipa: part, nucleus: false });
      i++;
    }
  }

  const nuclei = units.map((unit, index) => unit.nucleus ? index : -1).filter(index => index >= 0);
  if (!nuclei.length) return units.map(unit => unit.ipa).join('');
  for (let n = 1; n < nuclei.length; n++) {
    const cluster = units.slice(nuclei[n - 1] + 1, nuclei[n]).filter(unit => !unit.nucleus).length;
    if (cluster >= 2) units[nuclei[n - 1]].heavy = true;
  }
  const syllableCount = nuclei.length;
  const enclitic = /(?:que|ve|ne)$/.test(word) && syllableCount > 1;
  const penult = syllableCount - 2;
  const stress = syllableCount < 3 || enclitic || units[nuclei[penult]]?.heavy ? penult : syllableCount - 3;
  const stressAt = nuclei[Math.max(0, stress)];
  return units.map((unit, index) => `${index === stressAt ? 'ˈ' : ''}${unit.ipa}`).join('');
}

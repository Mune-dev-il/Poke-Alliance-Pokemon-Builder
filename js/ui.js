/* ============================================================
   js/ui.js
   Renderizado del DOM, builders dinámicos, i18n-apply y eventos.
   ------------------------------------------------------------
   Es el archivo más grande: concentra todo lo visual.
   ============================================================ */


/* ============================================================
   1. UTILIDADES DE UI (clipboard + lector de archivos)
   ============================================================ */

/** Copia texto al portapapeles con fallback para contextos no seguros. */
async function copyText(text){
  try {
    if (navigator.clipboard && window.isSecureContext){
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch(e){ /* continúa al fallback */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly','');
    ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return true;
  } catch(e){ return false; }
}

/** Lee un archivo de imagen como Data URL y ejecuta el callback. */
function readImageFile(file, cb){
  if (!file || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = ev => cb(ev.target.result);
  reader.readAsDataURL(file);
}


/* ============================================================
   2. i18n — aplicar traducciones al DOM
   ============================================================ */
function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  const f = document.getElementById('formulaText');
  if (f) f.textContent = t('formula');

  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === state.lang);
  });

  buildTierSelect('xHeldTier', state.xHeld.tier);
  buildTierSelect('yHeldTier', state.yHeld.tier);

  /* Refresca textos dinámicos del banner (definido en banner.js) */
  if (typeof updateBrandTexts === 'function') updateBrandTexts();
}


/* ============================================================
   3. BUILDERS — selects de tier e inputs dinámicos de holds
   ============================================================ */
function buildTierSelect(selectId, selected){
  const sel = document.getElementById(selectId);
  if (!sel) return;
  let html = `<option value="0">${t('none')}</option>`;
  for (let i = 1; i <= 7; i++){
    html += `<option value="${i}">${t('tier')} ${i}</option>`;
  }
  sel.innerHTML = html;
  sel.value = String(selected || 0);
}

function buildHeldInputs(side){
  const held = side === 'x' ? state.xHeld : state.yHeld;
  const box  = document.getElementById(side + 'HeldInputs');
  if (!box) return;

  if (held.tier === 0){
    box.innerHTML = `<p class="muted py-2">${t('heldNone')}</p>`;
    return;
  }

  let html = '';
  for (let i = 0; i < held.tier; i++){
    const v = held.costs[i] ? held.costs[i] : '';
    html += `
      <div class="held-row">
        <span class="tag">${t('tier')} ${i + 1}</span>
        <input class="inp" type="number" min="0" step="any"
               data-side="${side}" data-idx="${i}"
               value="${v}" placeholder="0">
      </div>`;
  }
  box.innerHTML = html;
}


/* ============================================================
   4. RENDER — todos los valores vivos de la calculadora
   ============================================================ */
function renderComputed(){
  const b = computeBreakdown();

  /* --- Resumen 1: Pokédollars --- */
  document.getElementById('sumPdFull').textContent = fmtInt(b.totalPd);
  document.getElementById('sumPdAbbr').textContent = '$' + abbreviate(b.totalPd);

  /* --- Resumen 2: Diamantes --- */
  document.getElementById('sumDdFull').textContent = fmt2(b.totalDd) + ' DD';
  document.getElementById('sumDdEq').textContent   = '≈ $' + abbreviate(b.totalPd);

  /* --- Resumen 3: Desglose --- */
  const breakdownRows = [
    [t('bkMarket'),   b.dittoDd],
    [t('bkDna'),      b.dnaMemDd],
    [t('bkHolds'),    b.holdsDd],
    [t('bkTraining'), b.trainDd],
    [t('bkExtras'),   b.otherDd]
  ];
  document.getElementById('sumBreakdown').innerHTML = breakdownRows.map(([label, dd]) => `
    <li class="flex items-center justify-between gap-3 py-1.5 border-b border-indigo-900/30 last:border-0">
      <span class="text-[.72rem] text-indigo-200/70">${label}</span>
      <span class="text-sm font-extrabold text-teal-300 tabular-nums">${fmt2(dd)}
        <span class="text-[.6rem] text-indigo-300/60 font-bold">DD</span>
      </span>
    </li>`).join('');

  /* --- Sección 1 --- */
  document.getElementById('dittoDd').textContent = fmt2(b.dittoDd) + ' DD';

  /* --- Sección 2 --- */
  document.getElementById('memCostDd').textContent     = fmt2(b.memDd) + ' DD';
  document.getElementById('memCostPd').textContent     = '$' + fmtInt(ddToPd(b.memDd));
  document.getElementById('dnaMemTotal').textContent   = fmt2(b.dnaMemDd) + ' DD';
  document.getElementById('dnaMemTotalPd').textContent = '$' + fmtInt(b.dnaMemPd);

  /* --- Sección 3 --- */
  document.getElementById('xHeldTotalDd').textContent = fmt2(pdToDd(b.xPd)) + ' DD';
  document.getElementById('yHeldTotalDd').textContent = fmt2(pdToDd(b.yPd)) + ' DD';

  /* --- Sección 4 --- */
  const tr = b.tr;
  document.getElementById('trCharges').textContent        = fmtInt(tr.used);
  document.getElementById('trChargers').textContent       = fmt2(tr.chargers);
  document.getElementById('trHours').textContent          = fmt2(tr.hours);
  document.getElementById('trDd').textContent             = fmt2(tr.dd) + ' DD';
  document.getElementById('trPd').textContent             = '$' + fmtInt(tr.pd);
  document.getElementById('trBar').style.width            = tr.prog + '%';
  document.getElementById('trProgressLabel').textContent  = fmt2(tr.prog) + '%';

  /* --- Sección 5 --- */
  document.getElementById('otherDd').textContent    = fmt2(b.otherDd) + ' DD';
  document.getElementById('miniPd').textContent     = fmtInt(b.totalPd);
  document.getElementById('miniPdAbbr').textContent = '$' + abbreviate(b.totalPd);

  /* --- Tabla desglose --- */
  const rows = [
    [`${t('rowDitto')} ${state.ball}`,      b.dittoPd,                        b.dittoDd],
    [t('rowDna'),                            b.dnaMemPd - ddToPd(b.memDd),    b.dnaDd],
    [`${t('rowMem')} [${state.memories}]`,   ddToPd(b.memDd),                  b.memDd],
    [t('rowX'),                              b.xPd,                            pdToDd(b.xPd)],
    [t('rowY'),                              b.yPd,                            pdToDd(b.yPd)],
    [t('rowTrain'),                          b.trainPd,                        b.trainDd],
    [t('rowOther'),                          b.otherPd,                        b.otherDd]
  ];

  document.getElementById('tblBody').innerHTML = rows.map(([label, pd, dd]) => `
    <tr>
      <td>${label}</td>
      <td class="num">$${fmtInt(pd)}</td>
      <td class="num text-teal-300">${fmt2(dd)}</td>
    </tr>`).join('');

  document.getElementById('tblTotalPd').textContent = '$' + fmtInt(b.totalPd);
  document.getElementById('tblTotalDd').textContent = fmt2(b.totalDd) + ' DD';

  /* --- Cadena para exportar al juego --- */
  document.getElementById('exportString').textContent =
    `Pokemon ${state.ball} = ${fmt2(b.dittoDd)} DD` +
  ` | DNA+Memory[${state.memories}] = ${fmt2(b.dnaMemDd)} DD` +
  ` | Holds = ${fmt2(b.holdsDd)} DD` +
  ` | Training = ${fmt2(b.trainDd)} DD` +
  ` | Extras = ${fmt2(b.otherDd)} DD` +
  ` || Total = $${abbreviate(b.totalPd)} / ${fmt2(b.totalDd)} DD`;
}


/* ============================================================
   5. UPDATE ALL — refresca estados de botones + inputs
   ============================================================ */
function updateAll(rebuildHeld = true){
  document.querySelectorAll('[data-ball]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.ball === state.ball);
  });
  document.querySelectorAll('[data-dna]').forEach(btn => {
    btn.classList.toggle('active', (btn.dataset.dna === '1') === state.dna);
  });
  document.querySelectorAll('[data-mem]').forEach(btn => {
    btn.classList.toggle('active', Number(btn.dataset.mem) === state.memories);
  });

  if (rebuildHeld){
    buildHeldInputs('x');
    buildHeldInputs('y');
  }
  renderComputed();
}


/* ============================================================
   6. INIT INPUTS — todos los campos arrancan VACÍOS
   ============================================================ */
function initInputs(){
  document.getElementById('diamondPrice').value  = '';
  document.getElementById('dittoPrice').value    = '';
  document.getElementById('otherExpenses').value = '';
  document.getElementById('trainCurrent').value  = '';
  document.getElementById('trainProgress').value = '';
  document.getElementById('trainTarget').value   = '';
  document.getElementById('trainDdRate').value   = '';
}


/* ============================================================
   7. EVENT WIRING — listeners de todos los controles
   ============================================================ */
function bindEvents(){

  /* --- Cambio de idioma --- */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.lang = btn.dataset.lang;
      document.documentElement.lang = state.lang;
      applyI18n();
      updateAll(true);
    });
  });

  /* --- 1. Market values --- */
  document.getElementById('diamondPrice').addEventListener('input', e => {
    state.diamondPrice = parseFloat(e.target.value) || 0;
    renderComputed();
  });
  document.getElementById('dittoPrice').addEventListener('input', e => {
    state.dittoPrices[state.ball] = parseFloat(e.target.value) || 0;
    renderComputed();
  });
  document.querySelectorAll('[data-ball]').forEach(btn => {
    btn.addEventListener('click', () => {
      const newBall = btn.dataset.ball;
      if (newBall === state.ball) return;
      const inp = document.getElementById('dittoPrice');
      state.dittoPrices[state.ball] = parseFloat(inp.value) || 0;
      state.ball = newBall;
      inp.value = state.dittoPrices[newBall] || '';
      updateAll(false);
    });
  });

  /* --- 2. DNA + memories --- */
  document.querySelectorAll('[data-dna]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.dna = btn.dataset.dna === '1';
      updateAll(false);
    });
  });
  document.querySelectorAll('[data-mem]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!state.dna) return;

      updateAll(false);
    });
  });

  /* --- 3. Holds (X e Y) --- */
  ['x', 'y'].forEach(side => {
    const selId      = side + 'HeldTier';
    const inputBoxId = side + 'HeldInputs';

    document.getElementById(selId).addEventListener('change', e => {
      const held = side === 'x' ? state.xHeld : state.yHeld;
      held.tier = Number(e.target.value) || 0;
      updateAll(true);
    });

    document.getElementById(inputBoxId).addEventListener('input', e => {
      const el = e.target.closest('input[data-side]');
      if (!el) return;
      const held = side === 'x' ? state.xHeld : state.yHeld;
      held.costs[Number(el.dataset.idx)] = parseFloat(el.value) || 0;
      renderComputed(); // refresco ligero: no reconstruye inputs (mantiene el foco)
    });
  });

  /* --- 4. Attack training --- */
  document.getElementById('trainCurrent').addEventListener('input', e => {
    state.train.current = parseFloat(e.target.value) || 0;
    renderComputed();
  });
  document.getElementById('trainProgress').addEventListener('input', e => {
    state.train.progress = Math.min(100, Math.max(0, parseFloat(e.target.value) || 0));
    renderComputed();
  });
  document.getElementById('trainTarget').addEventListener('input', e => {
    state.train.target = parseFloat(e.target.value) || 0;
    renderComputed();
  });
  document.getElementById('trainDdRate').addEventListener('input', e => {
    state.train.ddPerCharger = parseFloat(e.target.value) || 0;
    renderComputed();
  });

  /* --- 5. Otros gastos --- */
  document.getElementById('otherExpenses').addEventListener('input', e => {
    state.other = parseFloat(e.target.value) || 0;
    renderComputed();
  });

  /* --- Botón "Copy to clipboard" del export --- */
  const copyBtn   = document.getElementById('copyBtn');
  const copyLabel = document.getElementById('copyLabel');

  copyBtn.addEventListener('click', async () => {
    const text = document.getElementById('exportString').textContent;
    const ok = await copyText(text);

    copyBtn.classList.add('ok');
    copyLabel.textContent = ok ? t('copied') : '×';
    setTimeout(() => {
      copyBtn.classList.remove('ok');
      copyLabel.textContent = t('copy');
    }, 1800);
  });
}
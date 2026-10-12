/* ============================================================
   js/formulas.js
   Conversión de moneda, matemática de entrenamiento y
   breakdown maestro de costos.
   ============================================================ */

/* ---------- Conversión Pokédollars ⇄ Diamantes ---------- */
const ddToPd = dd => dd * (state.diamondPrice || 0);
const pdToDd = pd => (state.diamondPrice > 0 ? pd / state.diamondPrice : 0);


/* ---------- ATTACK TRAINING ---------- */

/** Cargas necesarias para llegar al nivel L desde 0: 50·L·(L+1) */
function chargesForLevel(L){
  L = Math.max(0, Math.floor(L) || 0);
  return 50 * L * (L + 1);
}

/** Devuelve todas las métricas de entrenamiento desde el estado actual. */
function computeTraining(){
  const cur  = Math.max(0, Math.floor(state.train.current) || 0);
  const tgt  = Math.max(0, Math.floor(state.train.target)  || 0);
  const prog = Math.min(100, Math.max(0, state.train.progress || 0));
  const rate = Math.max(0, state.train.ddPerCharger || 0);

  const cCur  = chargesForLevel(cur);               // cargas acumuladas a nivel actual
  const cNext = chargesForLevel(cur + 1);           // cargas al siguiente nivel
  const used  = cCur + (prog / 100) * (cNext - cCur);

  const cTarget = chargesForLevel(Math.max(tgt, cur));
  let remaining = cTarget - used;
  if (remaining < 0) remaining = 0;

  const chargers = remaining / CHARGES_20K;         // equivalentes a cargador 20K
  const hours    = chargers;                        // 1 cargador = 1 hora
  const dd       = chargers * rate;                 // costo en diamantes

  return { cur, tgt, prog, cCur, cNext, used, cTarget, remaining, chargers, hours, dd, pd: ddToPd(dd) };
}


/* ---------- BREAKDOWN MAESTRO ---------- */
function computeBreakdown(){
  /* 1. Ditto normal (mercado) */
  const dittoPd = state.dittoPrices[state.ball] || 0;
  const dittoDd = pdToDd(dittoPd);

  /* 2. Shiny DNA + recuerdos */
  const dnaDd    = state.dna ? DNA_COST_DD : 0;
  const memDd    = state.dna ? MEMORY_COST[state.memories - 1] : 0;
  const dnaMemDd = dnaDd + memDd;
  const dnaMemPd = ddToPd(dnaMemDd);

  /* 3. Holds (X + Y) */
  const sum = arr => arr.reduce((a, b) => a + (b || 0), 0);
  const xPd = sum(state.xHeld.costs.slice(0, state.xHeld.tier));
  const yPd = sum(state.yHeld.costs.slice(0, state.yHeld.tier));
  const holdsPd = xPd + yPd;
  const holdsDd = pdToDd(holdsPd);

  /* 4. Attack training */
  const tr      = computeTraining();
  const trainDd = tr.dd;
  const trainPd = ddToPd(trainDd);

  /* 5. Otros gastos */
  const otherPd = state.other || 0;
  const otherDd = pdToDd(otherPd);

  /* Totales */
  const totalPd = dittoPd + dnaMemPd + holdsPd + trainPd + otherPd;
  const totalDd = pdToDd(totalPd);

  return {
    dittoPd, dittoDd,
    dnaDd, memDd, dnaMemDd, dnaMemPd,
    xPd, yPd, holdsPd, holdsDd,
    trainDd, trainPd,
    otherPd, otherDd,
    totalPd, totalDd,
    tr
  };
}
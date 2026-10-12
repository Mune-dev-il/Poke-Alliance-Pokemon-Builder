/* ============================================================
   js/format.js
   Helpers de formato de números (Pokédollars / DD).
   ============================================================ */

/** Entero con separadores de miles → "86,650,000" */
function fmtInt(n){
  if (!isFinite(n)) n = 0;
  return Math.round(n).toLocaleString('en-US');
}

/** Número con 2 decimales y separadores → "293.73" */
function fmt2(n){
  if (!isFinite(n)) n = 0;
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Abreviatura inteligente de Pokédollars:
 *   1,000         -> "1k"
 *   10,000        -> "10k"
 *   100,000       -> "100k"
 *   1,000,000     -> "1.00 kk"
 *   1,500,000     -> "1.50 kk"
 *   1,000,000,000 -> "1.00 kkk"
 */
function abbreviate(v){
  if (!isFinite(v)) v = 0;
  const abs = Math.abs(v);
  const sign = v < 0 ? '-' : '';
  if (abs < 1000) return sign + String(Math.round(abs));
  if (abs < 1e6)  return sign + (abs / 1e3).toFixed(0) + 'k';
  if (abs < 1e9)  return sign + (abs / 1e6).toFixed(2) + ' kk';
  return sign + (abs / 1e9).toFixed(2) + ' kkk';
}
/* ============================================================
   js/state.js
   Estado global de la app + constantes del juego.
   ------------------------------------------------------------
   Todos los valores arrancan limpios (vacíos / en 0).
   ============================================================ */

const state = {
  lang: 'en',
  diamondPrice: 0,                               // Pokédollars por 1 DD
  ball: 'AB',                                    // 'UB' | 'AB' | 'PB'
  dittoPrices: { UB: 0, AB: 0, PB: 0 },          // Pokédollars por tipo de ball
  dna: true,                                     // ¿Shiny DNA activada?
  memories: 1,                                   // 1..6
  xHeld: { tier: 0, costs: [0,0,0,0,0,0,0] },    // tier 0 = ninguno, 1..7
  yHeld: { tier: 0, costs: [0,0,0,0,0,0,0] },
  train: { current: 0, progress: 0, target: 0, ddPerCharger: 0 },
  other: 0                                       // Pokédollars
};

/* ---------- Constantes del juego (ajústalas si cambia el server) ---------- */
const DNA_COST_DD = 150;                          // Costo fijo de Shiny DNA
const MEMORY_COST = [0, 30, 70, 120, 180, 250];      // NO acumulativo, index = memories-1
const CHARGES_20K = 20000;                        // Un "cargador de 20K"
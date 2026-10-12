/* ============================================================
   js/i18n.js
   Diccionario de traducciones (EN / ES / PT) + helper t()
   ------------------------------------------------------------
   Se carga PRIMERO. Todos los demás archivos usan t() desde aquí.
   ============================================================ */

const I18N = {
  /* ---------- English ---------- */
  en: {
    badge: "PokeAlliance Community Tool",
    title: "PokeAlliance Pokémon Builder",
    subtitle: "Calculate the total investment to build your Pokémon.",
    credit: "Created by",

    /* Hero banner */
    heroChange: "Change banner",

    /* Summary */
    sumPd: "Total Investment • Pokédollars",
    sumPdSub: "Total spent in Pokédollars",
    sumDd: "Total Investment • Diamonds (DD)",
    sumDdSub: "Market valuation equivalent",
    sumBreak: "Breakdown Overview",
    bkMarket: "Market purchases",
    bkDna: "DNA + memories",
    bkHolds: "Held items (X + Y)",
    bkTraining: "Attack training",
    bkExtras: "Other expenses",

    /* Creator tools */
    brandTools: "Creator Tools",
    brandHelp: "Upload an image for the header banner. It's saved locally in your browser. To make it permanent for everyone, click \"Copy as code\" and paste the result into BANNER_IMAGE_DEFAULT at the top of banner.js.",
    brandChoose: "Choose image",
    brandCopyCode: "Copy as code",
    brandReset: "Reset",
    brandEmpty: "No image",
    brandCopied: "Code copied!",

    /* Section 1 */
    s1: "Market Values",
    s1sub: "Server economy setup",
    diamondPrice: "Diamond price (Pokédollars per DD)",
    diamondPriceHelp: "Set the current Diamond price on your server",
    dittoBall: "Pokemon ball",
    dittoPrice: "Pokemon price",
    ddEquiv: "DD equivalent",

    /* Section 2 */
    s2: "Shiny DNA & Memories",
    s2sub: "Unlock the shiny form",
    shinyDna: "Shiny DNA",
    yes: "Yes",
    no: "No",
    dnaFixed: "Fixed cost",
    totalMemories: "Total memories",
    memoryHelp: "Non-cumulative cost table: 1→0 DD, 2→30 DD, 3→40 DD, 4→50 DD, 5→60 DD, 6→70 DD",
    memoryCost: "Memories cost",
    dnaTotal: "DNA + memories total",

    /* Section 3 */
    s3: "Held Investments (X-Held & Y-Held)",
    s3sub: "Optional held item upgrades",
    xHeld: "X-Held",
    yHeld: "Y-Held",
    none: "None",
    tier: "Tier",
    heldTotal: "Total",
    heldNone: "No tier selected — pick a tier to add costs.",

    /* Section 4 */
    s4: "Attack Training (Optional / Advanced)",
    s4sub: "Charge-based attack levelling",
    currentLvl: "Current attack level",
    progressPct: "% progress to next level",
    targetLvl: "Target attack level",
    progress: "Progress",
    chargesTotal: "Total charges from 0 to current",
    chargers20k: "20K charger equivalents",
    trainTime: "Training time (hours)",
    trainCostDd: "Training cost (DD)",
    ddPerCharger: "DD per 20K charger",
    formulaTitle: "Formula",
    formula: "Formula not available yet.",

    /* Section 5 */
    s5: "Other Expenses",
    s5sub: "Anything else you spend",
    otherExpenses: "Additional expenses (Pokédollars)",

    /* Table */
    tblTitle: "Detailed Breakdown",
    tblComponent: "Component",
    tblPd: "Pokédollars ($)",
    tblDd: "Diamonds (DD)",
    rowDitto: "Pokemon",
    rowDna: "Shiny DNA",
    rowMem: "Extra memories",
    rowX: "X-Held",
    rowY: "Y-Held",
    rowTrain: "Attack training",
    rowOther: "Other expenses",
    rowTotal: "TOTAL INVESTMENT",

    /* Export */
    expTitle: "In-Game Breakdown",
    expSub: "Paste this directly into the game chat",
    copy: "Copy to clipboard",
    copied: "Copied!"
  },

  /* ---------- Español ---------- */
  es: {
    badge: "Herramienta de la comunidad PokeAlliance",
    title: "Constructor Pokémon de PokeAlliance",
    subtitle: "Calcula la inversión total para construir tu Pokémon.",
    credit: "Creado por",

    heroChange: "Cambiar banner",

    sumPd: "Inversión total • Pokédollars",
    sumPdSub: "Total gastado en Pokédollars",
    sumDd: "Inversión total • Diamantes (DD)",
    sumDdSub: "Valor de mercado equivalente",
    sumBreak: "Resumen del desglose",
    bkMarket: "Compras en el mercado",
    bkDna: "ADN + recuerdos",
    bkHolds: "Objetos equipados (X + Y)",
    bkTraining: "Entrenamiento de ataque",
    bkExtras: "Otros gastos",

    brandTools: "Herramientas del creador",
    brandHelp: "Sube una imagen para el banner del header. Se guarda en tu navegador. Para hacerla permanente para todos, pulsa \"Copiar como código\" y pega el resultado en BANNER_IMAGE_DEFAULT al inicio de banner.js.",
    brandChoose: "Elegir imagen",
    brandCopyCode: "Copiar como código",
    brandReset: "Restablecer",
    brandEmpty: "Sin imagen",
    brandCopied: "¡Código copiado!",

    s1: "Valores del mercado",
    s1sub: "Configuración de la economía del servidor",
    diamondPrice: "Precio del diamante (Pokédollars por DD)",
    diamondPriceHelp: "Define el precio actual del Diamante en tu servidor",
    dittoBall: "Ball del Pokemon",
    dittoPrice: "Precio del Pokemon",
    ddEquiv: "Equivalente en DD",

    s2: "ADN Shiny y recuerdos",
    s2sub: "Desbloquea la forma shiny",
    shinyDna: "ADN Shiny",
    yes: "Sí",
    no: "No",
    dnaFixed: "Costo fijo",
    totalMemories: "Recuerdos totales",
    memoryHelp: "Tabla de costos no acumulativos: 1→0 DD, 2→30 DD, 3→40 DD, 4→50 DD, 5→60 DD, 6→70 DD",
    memoryCost: "Costo de recuerdos",
    dnaTotal: "Total ADN + recuerdos",

    s3: "Inversiones equipadas (X-Held y Y-Held)",
    s3sub: "Mejoras opcionales de objetos equipados",
    xHeld: "X-Held",
    yHeld: "Y-Held",
    none: "Ninguno",
    tier: "Tier",
    heldTotal: "Total",
    heldNone: "Ningún tier seleccionado — elige un tier para añadir costos.",

    s4: "Entrenamiento de ataque (Opcional / Avanzado)",
    s4sub: "Subida de ataque basada en cargas",
    currentLvl: "Nivel de ataque actual",
    progressPct: "% de progreso al siguiente nivel",
    targetLvl: "Nivel de ataque objetivo",
    progress: "Progreso",
    chargesTotal: "Cargas totales de 0 al actual",
    chargers20k: "Equivalentes en cargadores de 20K",
    trainTime: "Tiempo de entrenamiento (horas)",
    trainCostDd: "Costo de entrenamiento (DD)",
    ddPerCharger: "DD por cargador de 20K",
    formulaTitle: "Fórmula",
    formula: "Fórmula no disponible aún.",

    s5: "Otros gastos",
    s5sub: "Cualquier otro gasto",
    otherExpenses: "Gastos adicionales (Pokédollars)",

    tblTitle: "Desglose detallado",
    tblComponent: "Componente",
    tblPd: "Pokédollars ($)",
    tblDd: "Diamantes (DD)",
    rowDitto: "Pokemon",
    rowDna: "ADN Shiny",
    rowMem: "Recuerdos extra",
    rowX: "X-Held",
    rowY: "Y-Held",
    rowTrain: "Entrenamiento de ataque",
    rowOther: "Otros gastos",
    rowTotal: "INVERSIÓN TOTAL",

    expTitle: "Desglose para el juego",
    expSub: "Pégalo directamente en el chat del juego",
    copy: "Copiar al portapapeles",
    copied: "¡Copiado!"
  },

  /* ---------- Português ---------- */
  pt: {
    badge: "Ferramenta da comunidade PokeAlliance",
    title: "Construtor Pokémon da PokeAlliance",
    subtitle: "Calcule o investimento total para construir seu Pokémon.",
    credit: "Criado por",

    heroChange: "Alterar banner",

    sumPd: "Investimento total • Pokédollars",
    sumPdSub: "Total gasto em Pokédollars",
    sumDd: "Investimento total • Diamantes (DD)",
    sumDdSub: "Valor de mercado equivalente",
    sumBreak: "Resumo do detalhamento",
    bkMarket: "Compras no mercado",
    bkDna: "DNA + memórias",
    bkHolds: "Itens equipados (X + Y)",
    bkTraining: "Treino de ataque",
    bkExtras: "Outras despesas",

    brandTools: "Ferramentas do criador",
    brandHelp: "Envie uma imagem para o banner do cabeçalho. Ela fica salva no navegador. Para torná-la permanente para todos, clique em \"Copiar como código\" e cole o resultado em BANNER_IMAGE_DEFAULT no topo de banner.js.",
    brandChoose: "Escolher imagem",
    brandCopyCode: "Copiar como código",
    brandReset: "Redefinir",
    brandEmpty: "Sem imagem",
    brandCopied: "Código copiado!",

    s1: "Valores de mercado",
    s1sub: "Configuração da economia do servidor",
    diamondPrice: "Preço do diamante (Pokédollars por DD)",
    diamondPriceHelp: "Defina o preço atual do Diamante no seu servidor",
    dittoBall: "Ball do Pokemon",
    dittoPrice: "Preço do Pokemon",
    ddEquiv: "Equivalente em DD",

    s2: "DNA Shiny e memórias",
    s2sub: "Desbloqueie a forma shiny",
    shinyDna: "DNA Shiny",
    yes: "Sim",
    no: "Não",
    dnaFixed: "Custo fixo",
    totalMemories: "Total de memórias",
    memoryHelp: "Tabela de custos não cumulativos: 1→0 DD, 2→30 DD, 3→40 DD, 4→50 DD, 5→60 DD, 6→70 DD",
    memoryCost: "Custo das memórias",
    dnaTotal: "Total DNA + memórias",

    s3: "Investimentos equipados (X-Held e Y-Held)",
    s3sub: "Melhorias opcionais de itens equipados",
    xHeld: "X-Held",
    yHeld: "Y-Held",
    none: "Nenhum",
    tier: "Tier",
    heldTotal: "Total",
    heldNone: "Nenhum tier selecionado — escolha um tier para adicionar custos.",

    s4: "Treino de ataque (Opcional / Avançado)",
    s4sub: "Evolução de ataque baseada em cargas",
    currentLvl: "Nível de ataque atual",
    progressPct: "% de progresso para o próximo nível",
    targetLvl: "Nível de ataque desejado",
    progress: "Progresso",
    chargesTotal: "Cargas totais de 0 até o atual",
    chargers20k: "Equivalentes em carregadores de 20K",
    trainTime: "Tempo de treino (horas)",
    trainCostDd: "Custo do treino (DD)",
    ddPerCharger: "DD por carregador de 20K",
    formulaTitle: "Fórmula",
    formula: "Fórmula ainda não disponível.",

    s5: "Outras despesas",
    s5sub: "Qualquer outro gasto",
    otherExpenses: "Despesas adicionais (Pokédollars)",

    tblTitle: "Detalhamento completo",
    tblComponent: "Componente",
    tblPd: "Pokédollars ($)",
    tblDd: "Diamantes (DD)",
    rowDitto: "Pokemon",
    rowDna: "DNA Shiny",
    rowMem: "Memórias extras",
    rowX: "X-Held",
    rowY: "Y-Held",
    rowTrain: "Treino de ataque",
    rowOther: "Outras despesas",
    rowTotal: "INVESTIMENTO TOTAL",

    expTitle: "Detalhamento para o jogo",
    expSub: "Cole isto diretamente no chat do jogo",
    copy: "Copiar para a área de transferência",
    copied: "Copiado!"
  }
};

/* ---------- Helper de traducción ---------- */
function t(key){
  return (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key;
}
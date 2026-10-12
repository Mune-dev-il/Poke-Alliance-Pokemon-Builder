/* ============================================================
   js/main.js
   Punto de entrada. Se carga al final.
   ------------------------------------------------------------
   Orden de arranque:
     1. initInputs()      → deja todos los campos vacíos
     2. bindEvents()      → listeners de la calculadora
     3. bindBannerImage() → listeners del banner
     4. applyBannerImage(getBannerImage()) → pinta el banner guardado
     5. applyI18n()       → aplica traducciones
     6. updateAll(true)   → primer render completo
   ============================================================ */

(function init(){
  document.documentElement.lang = state.lang;

  initInputs();
  bindEvents();
  bindBannerImage();

  applyBannerImage(getBannerImage());

  applyI18n();
  updateAll(true);
})();
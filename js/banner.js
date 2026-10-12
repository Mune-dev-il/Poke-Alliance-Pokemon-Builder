/* ============================================================
   js/banner.js
   Lógica del banner del header (imagen del creador) + Creator Tools.
   ------------------------------------------------------------
   • Lee primero de localStorage, luego de BANNER_IMAGE_DEFAULT.
   • "Copy as code" produce la línea para pegar en la constante.
   ============================================================ */

/* 🔽 Pega aquí tu data URL permanente (o URL pública) para fijar el banner.
      Ejemplo:
        const BANNER_IMAGE_DEFAULT = "data:image/png;base64,iVBORw0...";
        const BANNER_IMAGE_DEFAULT = "https://tu-servidor.com/banner.png";
   ---------------------------------------------------------------- */
const BANNER_IMAGE_DEFAULT = "";

const BANNER_LS_KEY = "pokealliance_banner_image";


/* ---------- Lectura / escritura ---------- */
function getBannerImage(){
  try {
    const saved = localStorage.getItem(BANNER_LS_KEY);
    if (saved) return saved;
  } catch(e){ /* localStorage puede estar deshabilitado */ }
  return BANNER_IMAGE_DEFAULT || "";
}

function saveBannerImage(src){
  try {
    if (src) localStorage.setItem(BANNER_LS_KEY, src);
    else     localStorage.removeItem(BANNER_LS_KEY);
  } catch(e){ /* ignore quota / disabled */ }
}


/* ---------- Aplicar al DOM ---------- */
function applyBannerImage(src){
  const banner = document.getElementById('heroBanner');
  const img    = document.getElementById('heroBannerImg');
  const thumb  = document.getElementById('brandThumb');

  if (src){
    img.src = src;
    banner.classList.add('has-image');
    if (thumb) thumb.innerHTML = `<img src="${src}" alt="Banner thumbnail">`;
  } else {
    img.removeAttribute('src');
    banner.classList.remove('has-image');
    if (thumb) thumb.innerHTML = `<div class="empty">${t('brandEmpty')}</div>`;
  }

  updateBrandTexts();
}


/* ---------- Textos dinámicos del banner (invocado por applyI18n) ---------- */
function updateBrandTexts(){
  const overlay = document.getElementById('heroBannerEdit');
  // El texto del botón ya viene por data-i18n; no forzamos nada aquí,
  // pero dejamos el hook por si quieres añadir lógica futura.
}


/* ---------- Eventos ---------- */
function bindBannerImage(){
  const inputHeader = document.getElementById('heroBannerInput');
  const inputPanel  = document.getElementById('heroBannerInput2');
  const editBtn     = document.getElementById('heroBannerEdit');
  const copyBtn     = document.getElementById('brandCopyCode');
  const resetBtn    = document.getElementById('brandReset');

  /* Abrir el file picker desde el botón flotante */
  if (editBtn) editBtn.addEventListener('click', () => inputHeader.click());

  /* Ambos inputs suben la imagen y la persisten */
  [inputHeader, inputPanel].forEach(inp => {
    if (!inp) return;
    inp.addEventListener('change', e => {
      const file = e.target.files && e.target.files[0];
      readImageFile(file, dataUrl => {
        saveBannerImage(dataUrl);
        applyBannerImage(dataUrl);
      });
      e.target.value = ''; // permite re-seleccionar el mismo archivo
    });
  });

  /* Copiar como código — genera la línea para BANNER_IMAGE_DEFAULT */
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const src = getBannerImage();
      const line = src
        ? `const BANNER_IMAGE_DEFAULT = "${src}";`
        : `const BANNER_IMAGE_DEFAULT = "";`;

      await copyText(line);

      const label = copyBtn.querySelector('span');
      label.textContent = t('brandCopied');
      copyBtn.classList.add('ok');

      setTimeout(() => {
        label.textContent = t('brandCopyCode');
        copyBtn.classList.remove('ok');
      }, 1800);
    });
  }

  /* Reset — borra localStorage y vuelve al default */
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      saveBannerImage('');
      applyBannerImage(BANNER_IMAGE_DEFAULT || '');
    });
  }
}
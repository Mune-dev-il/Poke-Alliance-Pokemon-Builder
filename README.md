<div align="center">

# 🧬 PokeAlliance Pokémon Builder

**An interactive calculator to estimate the total investment required to build a Pokémon in PokeAlliance.**

[![License: Unlicense](https://img.shields.io/badge/License-Unlicense-5eead4.svg?style=flat-square)](https://unlicense.org)
[![Made with Vanilla JS](https://img.shields.io/badge/Made%20with-Vanilla%20JS-6366f1.svg?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![No Build Step](https://img.shields.io/badge/Build%20Step-None-2dd4bf.svg?style=flat-square)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-a855f7.svg?style=flat-square)](#-contributing)

[Live Demo](#-live-demo) · [Features](#-features) · [Getting Started](#-getting-started) · [Customization](#-customization) · [License](#-license)

</div>

---

## 📖 About

**PokeAlliance Pokémon Builder** is a **fully client-side** web calculator built to help players plan the total cost of building a Pokémon — including Shiny DNA, memories, held items, attack training, and any extra expenses — in both **Pokédollars** and **Diamonds (DD)**.

It's a single-page app with **no backend, no build step, and no tracking**. Just open it in a browser and start calculating.

Made **for the community**, **by the community**. Use it, fork it, remix it — it's public domain.

> ⚠️ **Disclaimer:** This is a community-made tool. It is **not affiliated with, endorsed by, or sponsored by PokeAlliance** or any of its developers. All game-related terms and values belong to their respective owners.

---

## ✨ Features

- 🎛️ **Live calculations** — every input updates all totals instantly.
- 💎 **Dual currency** — shows results in Pokédollars **and** Diamonds (DD).
- 🧠 **Modular cost sections**:
  - Market values (Diamond price + ball selection + Ditto price)
  - Shiny DNA & memories (non-cumulative cost table)
  - X-Held & Y-Held with dynamic Tier inputs (1–7)
  - Attack training with charge-based math and progress bar
  - Other expenses
- 📊 **Detailed breakdown table** with a prominent **TOTAL INVESTMENT** row.
- 📋 **In-game export string** — one line, copy-to-clipboard, ready to paste into the game chat.
- 🌍 **Multi-language**: English, Español, Português.
- 🖼️ **Custom banner** — upload a branded image that persists via `localStorage`.
- 📱 **Fully responsive** — mobile-first, works on any screen.
- 🎨 **Modern dark UI** — glassmorphism, gradients, and smooth interactions.

---

## 🚀 Live Demo

> _Coming soon — link will be added after deployment._

```
https://<your-domain>/
```

---

## 🖼️ Screenshots

> Add your own screenshots here after deploying.

| Desktop | Mobile |
|---|---|
| _coming soon_ | _coming soon_ |

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 + [Tailwind CDN](https://tailwindcss.com/) (utility classes only) |
| Logic | **Vanilla JavaScript (ES6+)** — no frameworks |
| Fonts | [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts |
| Build | **None** — everything runs directly from the browser |

No `npm install`. No bundler. No framework. Just files.

---

## 🏁 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Mune-dev-il/pokealliance-builder.git
cd pokealliance-builder
```

### 2. Open it

Open `index.html` in your browser — that's it.

> 💡 If you use **VS Code**, the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension gives you instant reload while editing.

---

## 📂 Project Structure

```
pokealliance-builder/
├── index.html              # Markup — no inline CSS/JS
├── LICENSE                 # The Unlicense (public domain)
├── README.md
├── assets/
│   └── images/
│       └── favicon.ico     # Add your own favicon here
├── css/
│   ├── main.css            # Reset, base, typography, background
│   ├── components.css      # Cards, buttons, inputs, tables, badges
│   ├── layout.css          # Hero banner, creator panel, footer
│   └── animations.css      # Keyframes (rise, pulse)
└── js/
    ├── i18n.js             # Translation dictionary (EN / ES / PT)
    ├── state.js            # Global state + game constants
    ├── format.js           # Number formatting helpers
    ├── formulas.js         # Core math (currency, training, breakdown)
    ├── ui.js               # DOM rendering + event wiring
    ├── banner.js           # Banner image + Creator Tools panel
    └── main.js             # Entry point (init)
```

**Load order matters** — scripts are loaded from `i18n.js` → `main.js` because each file depends on the previous ones. See `index.html` for the exact order.

---

## 🎨 Customization

### Change the game constants

Open `js/state.js` and edit:

```javascript
const DNA_COST_DD = 150;                          // Fixed Shiny DNA cost
const MEMORY_COST = [0, 40, 50, 60, 70, 80];      // Non-cumulative, index = memories-1
const CHARGES_20K = 20000;                        // One "20K charger"
```

### Add or edit a translation

Open `js/i18n.js` and add a key to `I18N.en`, `I18N.es`, or `I18N.pt`. Then use it in HTML with:

```html
<span data-i18n="yourKey">Fallback text</span>
```

### Set a permanent banner

1. Open the page in your browser.
2. Click **"Change banner"** (bottom-right of the header) or use **Creator Tools** → *Choose image*.
3. In **Creator Tools**, click **Copy as code** — you'll get a line like:
   ```javascript
   const BANNER_IMAGE_DEFAULT = "data:image/png;base64,...";
   ```
4. Paste it at the top of `js/banner.js`, replacing:
   ```javascript
   const BANNER_IMAGE_DEFAULT = "";
   ```

Now every visitor sees your banner — no upload needed.

> 💡 **Tip:** For large banners, prefer a hosted URL over base64 (keeps the repo light):
> ```javascript
> const BANNER_IMAGE_DEFAULT = "https://your-cdn.com/banner.jpg";
> ```

### Change colors

All main colors live in the CSS files. The fastest way is to search for the gradient stops:

- `#5eead4` → mint / teal accent
- `#6366f1` → indigo primary
- `#a855f7` → violet accent
- `#0d0b21` → background base

---

## 🌐 Deployment

This is a **static site** — it can be hosted anywhere. Free options:

### Cloudflare Pages

1. Push the repo to GitHub.
2. Go to [Cloudflare Pages](https://pages.cloudflare.com/) → **Create a project**.
3. Connect your GitHub account and pick the repository.
4. **Build command:** leave empty. **Output directory:** leave empty (or `/`).
5. Deploy — you'll get a URL like `https://pokealliance-builder.pages.dev`.

### GitHub Pages

1. Push the repo to GitHub.
2. Go to **Settings → Pages**.
3. Set **Source** to `Deploy from a branch` and pick `main` / `root`.
4. Save — your site goes live at `https://<username>.github.io/<repo>/`.

### Netlify Drop

Drag the project folder to [netlify.com/drop](https://app.netlify.com/drop). Instant URL.

### Vercel

Import the repo in [vercel.com](https://vercel.com) — auto-deploys on every push.

---

## 🤝 Contributing

Contributions are welcome! If you find a bug or want to add a feature:

1. **Fork** the repository.
2. Create a branch: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -m "Add my feature"`.
4. Push: `git push origin feature/my-feature`.
5. Open a **Pull Request**.

### Ideas for contributions

- 🌎 Additional languages (French, German, Italian…)
- 🎯 Support for other Pokémon calculators
- 🧮 Additional cost categories
- 🎨 UI themes (light mode, high-contrast mode)
- ♿ Accessibility improvements

Please keep the code style consistent: **vanilla JS, no frameworks, thorough comments**.

---

## 📜 License

**Public Domain — The Unlicense.**

This project is released into the **public domain**. That means **anyone can do absolutely anything** with it:

- ✅ Use it, personally or commercially
- ✅ Modify it, remix it, fork it
- ✅ Sell it, close-source it, rebrand it
- ✅ Distribute it however you want

**No permission needed. No credit required. No restrictions.**

See [`LICENSE`](./LICENSE) or [unlicense.org](https://unlicense.org) for details.

> 💜 **A friendly request** (not a legal condition): if this tool helped you, a ⭐ on the repo or a mention to [@Mune-dev-il](https://github.com/Mune-dev-il) is appreciated — but never required.

---

## 🙌 Credits

- **Created by:** [**Mune-dev-il**](https://github.com/Mune-dev-il)
- **Credits to:** **Nocta** — Discord: `strix_gg`
- **Built for:** The PokeAlliance community
- **Fonts:** [Inter](https://rsms.me/inter/) by Rasmus Andersson
- **Icons:** Inline SVG (no icon library)
- **Utilities:** [Tailwind CSS](https://tailwindcss.com/)

### 💡 Inspiration

This project was **inspired by Nocta** (`strix_gg`), who originally built a **Ditto-only** investment calculator for PokeAlliance. Seeing how useful that tool was — but how limited it was to a single Pokémon — pushed me to **optimize the idea and build a more general version** that works for **any Pokémon build**:

- Any ball type (UB / AB / PB) instead of a fixed Ditto scenario.
- Full cost coverage: Shiny DNA, memories, X-Held / Y-Held tiers, attack training and extras.
- Multi-language UI (EN / ES / PT).
- A single in-game export string you can paste straight into chat.

Thanks Nocta — this wouldn't exist without your original tool. 🙏
- original tool: https://pokealliance-strix-tools.pages.dev/
---

## ⚖️ Legal Notice

- This is an **unofficial fan-made tool**.
- It is **not affiliated with, endorsed by, or sponsored by PokeAlliance** or The Pokémon Company.
- All trademarks, game names, and related assets belong to their respective owners.
- The Unlicense applies **only to the source code in this repository**, not to any third-party assets.

---

<div align="center">

**Made with 💜 for the PokeAlliance community.**

**If this tool helped you, consider giving it a ⭐ on GitHub!**

</div>

---

---

# 🇪🇸 Versión en Español

<div align="center">

## 🧬 PokeAlliance Pokémon Builder

**Calculadora interactiva para estimar la inversión total de construir un Pokémon en PokeAlliance.**

</div>

### 📖 Acerca de

Herramienta web **100% del lado del cliente** para planificar el costo total de una build — incluyendo Shiny DNA, recuerdos, objetos equipados, entrenamiento de ataque y gastos extra — tanto en **Pokédollars** como en **Diamantes (DD)**.

Sin backend, sin build, sin tracking. Abre el navegador y empieza a calcular.

Hecha **para la comunidad**, **por la comunidad**. Úsala, forkéala, remezclála — es dominio público.

> ⚠️ **Aviso legal:** Herramienta hecha por la comunidad. **No está afiliada ni patrocinada por PokeAlliance** ni por The Pokémon Company.

### ✨ Características

- 🎛️ Cálculos **en vivo** — cada campo actualiza los totales al instante.
- 💎 Doble moneda: **Pokédollars** y **Diamantes (DD)**.
- 🧠 Secciones modulares: mercado, Shiny DNA + recuerdos, X-Held / Y-Held, entrenamiento de ataque y otros gastos.
- 📊 Tabla de desglose detallada con fila de **INVERSIÓN TOTAL**.
- 📋 Cadena exportable al chat del juego con botón **Copiar al portapapeles**.
- 🌍 Multi-idioma: **English, Español, Português**.
- 🖼️ Banner personalizable.
- 📱 Totalmente responsive.

### 🚀 Cómo usar

```bash
git clone https://github.com/Mune-dev-il/pokealliance-builder.git
cd pokealliance-builder
```

Abre `index.html` en el navegador.

### 🎨 Personalización

- Constantes del juego → `js/state.js`
- Traducciones → `js/i18n.js`
- Banner permanente → `js/banner.js` (constante `BANNER_IMAGE_DEFAULT`)
- Colores → `css/main.css` y `css/components.css`

### 📜 Licencia

**Dominio público — The Unlicense.**

Cualquiera puede hacer **absolutamente cualquier cosa** con este proyecto:

- ✅ Usarlo, personal o comercialmente
- ✅ Modificarlo, remezclarlo, forquearlo
- ✅ Venderlo, cerrarlo, cambiarle el nombre
- ✅ Distribuirlo como quiera

**Sin permisos. Sin créditos obligatorios. Sin restricciones.**

> 💜 **Petición amistosa** (no es condición legal): si esta herramienta te sirvió, una ⭐ en el repo o una mención a [@Mune-dev-il](https://github.com/Mune-dev-il) se agradece — pero nunca es obligatorio.

### 🙌 Créditos

Creado por [**Mune-dev-il**](https://github.com/Mune-dev-il) para la comunidad de **PokeAlliance**.

**Créditos a Nocta** — Discord: `strix_gg`.

### 💡 Inspiración

Este proyecto nació **inspirado por Nocta** (`strix_gg`), que originalmente hizo una calculadora enfocada **solo en Ditto**. Ver lo útil que era — pero lo limitada que quedaba a un único Pokémon — me motivó a **optimizar la idea y crear una versión más general** que sirviera para **cualquier build**:

- Cualquier ball (UB / AB / PB) en lugar de un escenario fijo de Ditto.
- Cobertura completa de costos: Shiny DNA, recuerdos, X-Held / Y-Held, entrenamiento de ataque y extras.
- Interfaz multi-idioma (EN / ES / PT).
- Una cadena de export lista para pegar en el chat del juego.

Gracias Nocta — sin tu herramienta original esto no existiría. 🙏

 - herramienta original: https://pokealliance-strix-tools.pages.dev/

### ⚖️ Aviso legal

Herramienta **no oficial**. No afiliada a PokeAlliance ni a The Pokémon Company. Todas las marcas pertenecen a sus respectivos dueños.

---

<div align="center">

**Hecho con 💜 para la comunidad de PokeAlliance.**

</div>
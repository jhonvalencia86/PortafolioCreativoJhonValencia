# JV — The Creative Deck

Portafolio de **Jhon Valencia Santana** — dirección creativa, estrategia digital e innovación.
Una baraja de cartas coleccionables en 3D: cada carta es un proyecto y se transforma en su caso de estudio.

**Behance:** https://www.behance.net/jhxnvale

---

## Publicar en GitHub Pages (5 minutos)

1. Crea un repositorio en GitHub llamado `PortafolioCreativoJhonValencia` (público).
2. Sube **todo el contenido de esta carpeta** a la rama `main` (incluida la carpeta oculta `.github`).
   - Desde la web: *Add file → Upload files* y arrastra los archivos.
   - Desde la terminal:
     ```bash
     git init
     git add .
     git commit -m "JV — The Creative Deck"
     git branch -M main
     git remote add origin https://github.com/jhonvalencia86/PortafolioCreativoJhonValencia.git
     git push -u origin main
     ```
3. En el repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Espera a que termine el workflow (pestaña *Actions*). El sitio queda en
   `https://jhonvalencia86.github.io/PortafolioCreativoJhonValencia/`

> Alternativa sin Actions: *Settings → Pages → Deploy from a branch → main / (root)*. También funciona, porque el sitio es HTML estático.

No hay que instalar nada ni compilar: es HTML + CSS + JavaScript puro. Todas las rutas son relativas, así que funciona con cualquier nombre de repositorio o con dominio propio.

## Probar en local

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Editar contenido

Todo el contenido vive en **`assets/js/data.js`**:

| Quieres…                         | Cambia                                         |
|----------------------------------|------------------------------------------------|
| Ocultar/mostrar una carta        | `published: true / false`                      |
| Cambiar textos de un caso        | `lead`, `context`, `concept`, `role`, `deliverables` |
| Cambiar el año                   | `year`                                         |
| Cambiar colores de la carta      | `color` (fondo), `ink` (texto), `accent`       |
| Agregar imágenes a la galería    | sube el `.webp` a `assets/img/projects/<id>/` y agrégalo en `gallery` |
| Agregar un enlace externo        | `links: [{ label, url }]`                      |

Tamaños de galería (`span`): `full`, `wide`, `half`, `tall`.

### Proyectos pendientes

- **AgroGestor (07)** aparece como placeholder “EN PREPARACIÓN”. Para ocultarlo: `published: false`.
- **Human Experience (09), Bolívar Contigo Hogar (10) e IMETEC (11)** están en el catálogo con `published: false` hasta tener material autorizado. Para publicarlos, completa sus datos copiando la estructura de otro proyecto.
- Las presentaciones comerciales (`.pptx`, `.pdf`) **no** se incluyeron en el sitio público.

## Interacción

- **Arrastrar / swipe** — recorre la baraja (infinita)
- **Rueda del mouse / trackpad** — carta a carta
- **← →** — anterior / siguiente · **Enter** — abrir carta central · **Esc** — volver a la baraja
- Clic en una carta lateral → la trae al centro · clic en la central → abre el proyecto
- URLs directas: `#/p/chrome-lovers`, `#/p/about`, `#/p/contact`…
- Respeta `prefers-reduced-motion` y pausa la animación cuando la pestaña no está visible.

## Estructura

```
index.html
assets/
  css/styles.css        estilos (Swiss / neo-brutal / editorial)
  js/data.js            catálogo de cartas  ← edita aquí
  js/app.js             motor de la baraja, transiciones, rutas, lightbox
  img/projects/<id>/    imágenes optimizadas en WebP
.github/workflows/deploy.yml
```

Stack: HTML, CSS 3D transforms, Web Animations API, JavaScript sin dependencias. Tipografías: Space Grotesk, Inter, IBM Plex Mono (Google Fonts).

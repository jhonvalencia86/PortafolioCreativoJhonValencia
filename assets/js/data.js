/* =========================================================================
   JV — THE CREATIVE DECK · Catálogo de cartas
   -------------------------------------------------------------------------
   Este es el único archivo que necesitas editar para cambiar contenido.
   - published: false  → la carta no aparece en la baraja.
   - card.fit: "cover" llena la carta (recorta bordes) · "contain" muestra
     la imagen completa sobre el color de fondo (nunca se deforma).
   - Las rutas son relativas: funciona en GitHub Pages con cualquier nombre
     de repositorio.
   ========================================================================= */

window.JV_SITE = {
  name: "Jhon Valencia Santana",
  studio: "JV® — CREATIVE STUDIO",
  place: "BOGOTÁ, COLOMBIA / 2026",
  email: "jhxnvale86@gmail.com",
  links: {
    behance: "https://www.behance.net/jhxnvale",
    linkedin: "https://www.linkedin.com/in/jhonvalenciasantana/",
    github: "https://github.com/jhonvalencia86"
  }
};

const IMG = "assets/img/projects/";

window.JV_DECK = [
  /* ---------------------------------------------------------------- 00 */
  {
    number: "00",
    id: "about",
    kind: "about",
    published: true,
    title: "THE CREATOR",
    category: "ABOUT ME",
    year: "2026",
    color: "#E8E8E4",
    ink: "#151515",
    accent: "#E44832",
    theme: "light",
    card: { template: "type" }
  },

  /* ---------------------------------------------------------------- 01 */
  {
    number: "01",
    id: "a36cuotas",
    kind: "project",
    published: true,
    title: "A 36 CUOTAS",
    category: "BRANDING / FINTECH",
    year: "2026",
    color: "#FFD52B",
    ink: "#151515",
    accent: "#E4322B",
    theme: "light",
    card: { template: "frame", src: IMG + "a36cuotas/card.webp", hero: IMG + "a36cuotas/cover.webp", fit: "cover", bg: "#FFFFFF", pos: "50% 40%" },
    lead: "Educación financiera que se ve, se escucha y se entiende.",
    context:
      "A 36 Cuotas es un proyecto de educación financiera con web, canal de YouTube y podcast. Lo conducen Tino y Tado, dos títeres que hablan de crédito, ahorro y deudas sin tecnicismos.",
    concept:
      "Un universo de personajes con identidad amarilla y roja, pensado para que hablar de plata se sienta cercano. Cada personaje representa un perfil distinto frente al dinero.",
    role: ["Creador del proyecto", "Concepto y dirección creativa", "Diseño del universo de personajes", "Estrategia de aliados y patrocinio"],
    deliverables: ["Identidad visual", "Personajes", "Web", "Contenido audiovisual", "Presentación para aliados"],
    gallery: [
      { src: IMG + "a36cuotas/personajes-y-recursos-de-a-36-cuotas.webp", alt: "Personajes y recursos gráficos de A 36 Cuotas", w: 1536, h: 1024, span: "wide" }
    ],
    links: [
      { label: "treintaseiscuotas.com", url: "https://treintaseiscuotas.com" },
      { label: "YouTube @a36cuotas", url: "https://www.youtube.com/@a36cuotas" }
    ]
  },

  /* ---------------------------------------------------------------- 02 */
  {
    number: "02",
    id: "chrome-lovers",
    kind: "project",
    published: true,
    title: "CHROME LOVERS",
    category: "ART / MOTION / AI",
    year: "2026",
    color: "#151515",
    ink: "#F4F1EA",
    accent: "#D6337A",
    theme: "dark",
    card: { template: "full", src: IMG + "chrome-lovers/card.webp", hero: IMG + "chrome-lovers/cover.webp", fit: "cover", bg: "#1C151C", pos: "50% 30%" },
    lead: "Bogotá en clave anime noventero.",
    context:
      "Proyecto personal de arte con IA: un universo urbano y skater ambientado en Bogotá, con estética anime de los 90 y una banda sonora entre rap, rock y electrónica.",
    concept:
      "Dos protagonistas, Su y J, construidos como si fueran personajes de una serie: actas visuales, hojas de expresiones, rotaciones, vestuario, objetos y paleta de color propia.",
    role: ["Dirección de arte", "Diseño de personajes", "Worldbuilding", "Producción con IA generativa"],
    deliverables: ["Acta visual de personajes", "Hojas de diseño", "Key visual Bogotá cyberpunk", "Portadas musicales"],
    gallery: [
      { src: IMG + "chrome-lovers/chrome-lovers-bogota-cyberpunk.webp", alt: "Chrome Lovers — key visual Bogotá cyberpunk", w: 1312, h: 1199, span: "wide" },
      { src: IMG + "chrome-lovers/hoja-de-diseno-urbana-chrome-lovers.webp", alt: "Hoja de diseño urbana", w: 1024, h: 1536, span: "tall" },
      { src: IMG + "chrome-lovers/hoja-de-personajes-chrome-lovers-retro-anime.webp", alt: "Hoja de personajes retro anime", w: 1199, h: 1312, span: "half" },
      { src: IMG + "chrome-lovers/acta-visual-chrome-lovers-anime-skater.webp", alt: "Acta visual anime skater", w: 1199, h: 1312, span: "half" }
    ],
    links: []
  },

  /* ---------------------------------------------------------------- 03 */
  {
    number: "03",
    id: "credito-inteligente",
    kind: "project",
    published: true,
    title: "MI CRÉDITO INTELIGENTE",
    category: "FINTECH / DIGITAL PRODUCT",
    year: "2026",
    color: "#1B2A7A",
    ink: "#FFFFFF",
    accent: "#3B6BFF",
    theme: "light",
    card: { template: "frame", src: IMG + "credito-inteligente/card.webp", hero: IMG + "credito-inteligente/logo-mi-credito-inteligente-refinado.webp", fit: "contain", bg: "#FBFAF8" },
    lead: "¿En qué banco te prestan mejor?",
    context:
      "Producto digital para comparar, simular y entender opciones de crédito en un solo lugar, con información clara para decidir mejor.",
    concept:
      "Una marca fintech amable: monograma M, azul de confianza y Mici, una mascota-billete que acompaña al usuario en simuladores y comparadores.",
    role: ["Estrategia de producto", "Identidad de marca", "Mascota y sistema visual", "Piezas de comunicación"],
    deliverables: ["Logo y versiones", "Mascota", "Manual de marca", "Banners digitales"],
    gallery: [
      { src: IMG + "credito-inteligente/mi-credito-inteligente-finanzas-mas-faciles.webp", alt: "Banner Mi Crédito Inteligente", w: 1677, h: 938, span: "wide" },
      { src: IMG + "credito-inteligente/identidad-fintech-de-mi-credito-inteligente.webp", alt: "Identidad fintech — versiones del logo", w: 1536, h: 1024, span: "half" },
      { src: IMG + "credito-inteligente/logo-mi-credito-inteligente-refinado.webp", alt: "Logo y mascota Mici", w: 1536, h: 1024, span: "half" }
    ],
    links: [{ label: "creditointeligente.finance", url: "https://creditointeligente.finance" }]
  },

  /* ---------------------------------------------------------------- 04 */
  {
    number: "04",
    id: "chappetag",
    kind: "project",
    published: true,
    title: "CHAPPETAG",
    category: "BRANDING / AGROTECH",
    year: "2026",
    color: "#14522F",
    ink: "#FFFFFF",
    accent: "#1E8449",
    theme: "light",
    card: { template: "frame", src: IMG + "chappetag/card.webp", hero: IMG + "chappetag/cover.webp", fit: "contain", bg: "#FFFFFF" },
    lead: "Ganado conectado. Un campo más inteligente.",
    context:
      "Plataforma de identificación y gestión digital de ganado para Colombia: una chapeta NFC + QR que se lee con el celular y una app de campo que guarda la historia de cada animal.",
    concept:
      "El nombre revela el producto: ChAppeTag esconde “App” y “Tag” dentro de “chapeta”. Funciona sin internet y el ganadero decide qué información de cada lote es pública.",
    role: ["Tesis de negocio", "Naming e identidad", "Modelo de monetización", "Definición de producto"],
    deliverables: ["Naming", "Logo y variantes", "Modelo de negocio", "Pitch deck", "Piezas de campaña"],
    gallery: [
      { src: IMG + "chappetag/del-campo-conectado-al-futuro.webp", alt: "Del campo conectado al futuro — storyboard", w: 1536, h: 1024, span: "wide" },
      { src: IMG + "chappetag/como-funciona-el-negocio-de-chappetag.webp", alt: "Cómo funciona el negocio de ChAppeTag", w: 1672, h: 941, span: "wide" },
      { src: IMG + "chappetag/presentacion-de-logo-chappetagcuntegn.webp", alt: "Presentación de logo", w: 1536, h: 1024, span: "half" },
      { src: IMG + "chappetag/chappetag-ganado-conectado.webp", alt: "Logo ChAppeTag ganado conectado", w: 1254, h: 1254, span: "half" }
    ],
    links: [{ label: "chappetag.com", url: "https://chappetag.com" }]
  },

  /* ---------------------------------------------------------------- 05 */
  {
    number: "05",
    id: "profane-noise",
    kind: "project",
    published: true,
    title: "PROFANE NOISE",
    category: "GRAPHIC DESIGN",
    year: "2026",
    color: "#E44832",
    ink: "#FFFFFF",
    accent: "#3BEA1E",
    theme: "dark",
    card: { template: "full", src: IMG + "profane-noise/card.webp", hero: IMG + "profane-noise/cover.webp", fit: "cover", bg: "#22E810", pos: "50% 20%" },
    lead: "Ruido underground, impreso y pegado en la calle.",
    context:
      "Cartel para una noche de música pesada en Jack's Hideout, en el centro de Bogotá. La pieza tenía que funcionar en redes y, sobre todo, en muro.",
    concept:
      "Bestias ilustradas, tipografía metal ilegible a propósito y dos versiones de color: verde neón para destacar y monocromo para la pegada masiva.",
    role: ["Diseño gráfico", "Ilustración", "Tipografía", "Adaptaciones para impresión"],
    deliverables: ["Cartel versión neón", "Cartel versión monocromo", "Pegada urbana"],
    gallery: [
      { src: IMG + "profane-noise/mural-urbano-y-carteles-de-ruido.webp", alt: "Pegada de carteles en muro urbano", w: 1086, h: 1448, span: "tall" },
      { src: IMG + "profane-noise/poster-monocromo-de-ruido-profano.webp", alt: "Cartel monocromo", w: 1088, h: 1446, span: "half" },
      { src: IMG + "profane-noise/cartel-punk-neon-de-profane-noise.webp", alt: "Cartel neón", w: 1087, h: 1446, span: "half" }
    ],
    links: []
  },

  /* ---------------------------------------------------------------- 06 */
  {
    number: "06",
    id: "tu-crm-seguro",
    kind: "project",
    published: true,
    title: "TU CRM SEGURO",
    category: "INSURTECH / BRANDING",
    year: "2026",
    color: "#0F7A3D",
    ink: "#FFFFFF",
    accent: "#0F7A3D",
    theme: "light",
    card: { template: "frame", src: IMG + "tu-crm-seguro/card.webp", hero: IMG + "tu-crm-seguro/propuestas-de-logo-para-tu-crm-seguro.webp", fit: "contain", bg: "#FFFFFF" },
    lead: "Relacionamiento de verdad con tu cliente, a un clic.",
    context:
      "CRM con marca propia para una intermediaria de seguros en Colombia: clientes, pólizas y seguimiento en una herramienta simple que funciona sin internet.",
    concept:
      "Una marca que habla de protección y conexión. Diez rutas de logo exploradas hasta llegar a un sistema verde, directo y con la promesa “a un clic”.",
    role: ["Product Owner", "Identidad de marca", "Diseño de producto", "Desarrollo"],
    deliverables: ["Exploración de 10 logos", "Logo final", "Banners", "Producto web"],
    gallery: [
      { src: IMG + "tu-crm-seguro/tucrm-seguro-relacionamiento-de-verdad.webp", alt: "TuCRM Seguro — relacionamiento de verdad", w: 1800, h: 600, span: "full" },
      { src: IMG + "tu-crm-seguro/banner-de-tucrm-seguro-con-boton-a-un-click.webp", alt: "Banner con botón a un clic", w: 1800, h: 600, span: "full" },
      { src: IMG + "tu-crm-seguro/logo-tucrm-seguro-proteccion-y-conexion.webp", alt: "Logo protección y conexión", w: 1800, h: 600, span: "full" }
    ],
    links: []
  },

  /* ---------------------------------------------------------------- 07 */
  {
    number: "07",
    id: "agrogestor",
    kind: "pending",
    published: true, // cambia a false para ocultarla
    title: "AGROGESTOR",
    category: "INNOVATION / UX",
    year: "2026",
    color: "#2B2B27",
    ink: "#E8E8E4",
    accent: "#E44832",
    theme: "dark",
    card: { template: "pending" },
    lead: "Caso en preparación.",
    context:
      "MVP digital para la gestión agropecuaria. Los mockups originales se están recuperando; el caso completo se publicará cuando el material esté autorizado.",
    links: []
  },

  /* ---------------------------------------------------------------- 08 */
  {
    number: "08",
    id: "creative-archive",
    kind: "archive",
    published: true,
    title: "CREATIVE ARCHIVE",
    category: "ADVERTISING / DESIGN",
    year: "2009—2026",
    color: "#0057FF",
    ink: "#FFFFFF",
    accent: "#6F9BFF",
    theme: "dark",
    card: { template: "type" },
    lead: "Más de quince años de publicidad y diseño.",
    context:
      "El archivo completo de piezas publicitarias, campañas y diseño gráfico vive en Behance. Esta carta es la puerta de entrada.",
    links: [{ label: "Ver archivo en Behance", url: "https://www.behance.net/jhxnvale" }]
  },

  /* ---------------------------------------------------------------- 09–11
     Human Experience (Colsubsidio), Bolívar Contigo Hogar e IMETEC
     no se publican hasta tener el material autorizado.               */
  { number: "09", id: "colsubsidio", title: "HUMAN EXPERIENCE", category: "ACADEMIC INNOVATION", published: false },
  { number: "10", id: "bolivar-contigo", title: "BOLÍVAR CONTIGO HOGAR", category: "CONCEPTUAL MARKETING CASE", published: false },
  { number: "11", id: "imetec", title: "IMETEC", category: "INNOVATION STRATEGY", published: false },

  /* ---------------------------------------------------------------- 12 */
  {
    number: "12",
    id: "contact",
    kind: "contact",
    published: true,
    title: "LET'S CREATE",
    category: "CONTACT",
    year: "2026",
    color: "#E44832",
    ink: "#FFFFFF",
    accent: "#151515",
    theme: "light",
    card: { template: "type" }
  }
];

window.JV_ABOUT = {
  lead: "Estratega digital y Product Owner con alma de creativo.",
  bio: [
    "Soy Jhon Valencia Santana. Llevo más de 15 años entre la publicidad, el diseño y la transformación digital del sector financiero y asegurador.",
    "Empecé en agencias, pasé por la academia y terminé construyendo canales y productos digitales en banca y seguros. Hoy trabajo como consultor independiente y creo proyectos propios donde mezclo marca, producto y tecnología."
  ],
  timeline: [
    ["2025 —", "Consultor independiente", "Producto digital, innovación y marca"],
    ["2021 — 2025", "Fondo Nacional del Ahorro", "Sector financiero"],
    ["2020 — 2021", "Credivalores / Banco Credifinanciera", "Sector financiero"],
    ["2017 — 2020", "Aseguradora Solidaria de Colombia", "Sector asegurador"],
    ["2012 — 2017", "Universidad Santo Tomás", "Academia"],
    ["2011", "Agencia PulecioDSC", "Agencia"],
    ["2009 — 2011", "CREO", ""]
  ],
  education: [
    "Maestría en Innovación — Universidad EAN (en curso)",
    "Scrum Master",
    "Google Project Management",
    "AI for Managers — Microsoft / LinkedIn"
  ],
  skills: ["Dirección creativa", "Estrategia digital", "Product Ownership", "Branding", "Innovación", "UX", "IA generativa"]
};

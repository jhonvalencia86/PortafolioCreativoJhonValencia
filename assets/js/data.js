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
    layout: "story",
    published: true,
    title: "A 36 CUOTAS",
    category: "BRANDING / EDUCACIÓN FINANCIERA",
    year: "2026",
    color: "#FFD52B",
    ink: "#151515",
    accent: "#D71920",
    paper: "#F4F0E9",
    theme: "light",
    card: { template: "full", src: IMG + "a36cuotas/card.webp", hero: IMG + "a36cuotas/audiovisual/portada-podcast.webp", fit: "cover", heroFit: "contain", bg: "#FFD52B", pos: "50% 30%" },
    lead: "Aprende de plata antes de ponerla a cuotas.",
    facts: [
      ["TIPO", "Proyecto independiente"],
      ["AÑO", "2026"],
      ["ESTADO", "En desarrollo y divulgación"],
      ["MI ROL", "Creador · Dirección creativa"]
    ],
    story: [
      { type: "text", label: "EL RETO", title: "Hablar de plata sin que suene a banco.",
        body: "La educación financiera suele presentarse en términos técnicos que dificultan conectar los conceptos con decisiones cotidianas. El reto fue convertir temas como intereses, crédito y fraude en historias comprensibles sin perder rigor." },

      { type: "duo", band: "yellow", label: "LA IDEA",
        title: "Una marca educativa gratuita y cercana, conducida por dos personajes.",
        body: "Tino y Tado son personajes ficticios que conversan sobre situaciones reales. Entre los dos convierten una duda de plata en una decisión.",
        cast: [
          { name: "TINO", role: "El impulso y la curiosidad", src: IMG + "a36cuotas/piezas/tino.webp", alt: "Tino, títere de fieltro con gafas oscuras y una taza con su nombre" },
          { name: "TADO", role: "Preguntas, contrastes y criterio para decidir", src: IMG + "a36cuotas/piezas/tado.webp", alt: "Tado, títere de fieltro con gorra gris haciendo pulgares arriba" }
        ] },

      { type: "identity", label: "SISTEMA DE IDENTIDAD",
        title: "Editorial urbano, tipografía contundente, papel y fieltro.",
        body: "El logo convierte el “36” en un micrófono de podcast: la marca se presenta primero como conversación. Amarillo para llamar la atención, rojo para alertar y negro para darle carácter de calle.",
        image: { src: IMG + "a36cuotas/identidad/logo-podcast.webp", alt: "Logo A 36 Cuotas — el podcast de Tino & Tado", w: 1672, h: 941 },
        palette: [["Amarillo", "#FFD52B"], ["Rojo", "#D71920"], ["Negro", "#151515"], ["Papel", "#F4F0E9"], ["Blanco", "#FFFFFF"]] },

      { type: "figures", label: "PERSONAJES",
        title: "Un universo que crece por perfiles.",
        body: "Además de Tino y Tado, el universo suma perfiles como el emprendedor, la mamá, el trabajador o la abuela: cada uno abre un tema distinto frente al dinero. Fichas de personalidad, escenarios y una hoja de expresiones mantienen la coherencia en cada pieza.",
        items: [
          { src: IMG + "a36cuotas/personajes/universo-personajes.webp", alt: "Universo de personajes y recursos", w: 1536, h: 1024, span: "full" },
          { src: IMG + "a36cuotas/personajes/tino-ficha-y-escena.webp", alt: "Ficha de personaje de Tino e ideas de escenas", w: 1536, h: 1024, span: "half" },
          { src: IMG + "a36cuotas/personajes/stickers-tino-tado.webp", alt: "Hoja de expresiones y stickers de Tino y Tado", w: 1536, h: 1024, span: "half" }
        ] },

      { type: "text", label: "MI ROL", title: "Del concepto al ecosistema digital.",
        body: "Como creador del proyecto, conecté mi experiencia en servicios financieros, marketing digital e innovación con la conceptualización de marca, la dirección creativa, el diseño de personajes, la narrativa, la estrategia de contenidos y el desarrollo del ecosistema digital.",
        chips: ["Dirección creativa", "Branding", "Estrategia digital", "Storytelling", "IA generativa", "Educación financiera"] },

      { type: "steps", label: "CONSTRUCCIÓN",
        title: "Cómo se arma cada pieza.",
        body: "La inteligencia artificial se usa como apoyo para la generación visual y audiovisual, la iteración de conceptos y el prototipado. Las dramatizaciones se presentan como ficción educativa.",
        steps: [
          ["Identidad", "Sistema editorial urbano: logo, color, textura y tipografía."],
          ["Personajes", "Títeres digitales de fieltro con ficha de personalidad."],
          ["Guiones", "Situaciones cotidianas convertidas en conversación."],
          ["Piezas", "Portadas, tips y promocionales para redes."],
          ["Podcast", "Episodios en estudio con Tino y Tado al aire."],
          ["Web", "Plataforma con contenidos y recursos educativos."]
        ] },

      { type: "figures", band: "black", label: "AUDIOVISUAL",
        title: "Al aire desde el estudio de Tino y Tado.",
        body: "El podcast es el formato central: un set cálido y urbano que funciona igual en video, portada y clip corto.",
        items: [
          { src: IMG + "a36cuotas/audiovisual/tino-tado-en-vivo.webp", alt: "Tino y Tado en vivo en el estudio", w: 1672, h: 941, span: "full" }
        ] },

      { type: "figures", label: "ESTRATEGIA DE CONTENIDOS",
        title: "Temas serios en formatos cortos.",
        body: "Episodios, clips breves y recursos educativos para distintas edades. Dos ejemplos públicos: el presupuesto para un concierto y una compra cotidiana con Bre-B.",
        chips: ["Crédito responsable", "Tarjetas", "Ahorro", "Inversión", "Seguros", "Prevención de fraudes", "Pagos inmediatos"],
        items: [
          { src: IMG + "a36cuotas/piezas/episodio-creditos-y-prestamos.webp", alt: "Portada de episodio: Créditos y préstamos", w: 1536, h: 864, span: "half" },
          { src: IMG + "a36cuotas/piezas/tip-verifica-la-legalidad.webp", alt: "Tip 4: Verifica la legalidad", w: 836, h: 471, span: "half" },
          { src: IMG + "a36cuotas/piezas/escena-bre-b-calle.webp", alt: "Escena en la calle: una compra cotidiana con Bre-B", w: 1536, h: 864, span: "half" },
          { src: IMG + "a36cuotas/piezas/tip-define-tu-objetivo.webp", alt: "Tip 1: Define tu objetivo", w: 1536, h: 864, span: "half" }
        ] },

      { type: "figures", label: "SISTEMA EDITORIAL",
        title: "Una misma voz en presentaciones y campañas.",
        body: "La identidad se extiende a plantillas de presentación y piezas de comunicación para aliados, manteniendo cintas, recortes y personajes como sello.",
        items: [
          { src: IMG + "a36cuotas/campanas/finanzas-sin-enredos.webp", alt: "Narrativa: Finanzas sin enredos", w: 1672, h: 941, span: "full" },
          { src: IMG + "a36cuotas/campanas/presentacion-visual.webp", alt: "Sistema editorial de presentación", w: 1672, h: 941, span: "half" },
          { src: IMG + "a36cuotas/campanas/plantilla-editorial.webp", alt: "Plantilla de presentación del podcast", w: 1672, h: 941, span: "half" }
        ] },

      { type: "text", label: "DISTRIBUCIÓN", title: "Web y YouTube primero.",
        body: "La plataforma web y YouTube son los canales principales. La propuesta es ampliar el alcance con redes sociales y alianzas con entidades financieras, fintech, aseguradoras, cooperativas y organizaciones educativas. Las alianzas son una propuesta, no acuerdos confirmados." },

      { type: "text", label: "RESULTADOS Y APRENDIZAJE", title: "Lo que existe hoy y cómo se va a medir.",
        body: "Hay identidad visual, materiales comerciales, contenidos audiovisuales y publicaciones públicas de divulgación. Todavía no hay cifras auditadas de alcance o impacto; estas son las métricas propuestas:",
        chips: ["Retención de video", "Visitas web", "Interacciones", "Aprendizaje", "Alianzas"] }
    ],
    links: [
      { label: "treintaseiscuotas.com", url: "https://treintaseiscuotas.com/", sub: "Sitio web" },
      { label: "YouTube @a36cuotas", url: "https://www.youtube.com/@a36cuotas", sub: "Canal" },
      { label: "Lanzamiento", url: "https://es.linkedin.com/posts/jhonvalenciasantana_a36cuotas-educaci%C3%B3nfinanciera-finanzaspersonales-activity-7513704790288158720-Z8vi", sub: "LinkedIn" },
      { label: "Pagos con Bre-B", url: "https://es.linkedin.com/posts/jhonvalenciasantana_breb-a36cuotas-educacionfinanciera-activity-7515534428610121728-rzEF", sub: "LinkedIn" },
      { label: "Alianzas", url: "https://es.linkedin.com/posts/jhonvalenciasantana_a36cuotas-educaci%C3%B3nfinanciera-inclusi%C3%B3nfinanciera-activity-7514097489017225218-FYwX", sub: "LinkedIn" }
      // Instagram pendiente de verificar: { label: "Instagram", url: "https://www.instagram.com/a36cuotas/" }
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
    card: { template: "frame", src: IMG + "credito-inteligente/card.webp", hero: IMG + "credito-inteligente/logo-mi-credito-inteligente-refinado.webp", fit: "contain", blend: true, bg: "#FBFAF8" },
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
    card: { template: "frame", src: IMG + "chappetag/card.webp", hero: IMG + "chappetag/cover.webp", fit: "contain", blend: true, bg: "#FFFFFF" },
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
    card: { template: "frame", src: IMG + "tu-crm-seguro/card.webp", hero: IMG + "tu-crm-seguro/propuestas-de-logo-para-tu-crm-seguro.webp", fit: "contain", blend: true, bg: "#FFFFFF" },
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

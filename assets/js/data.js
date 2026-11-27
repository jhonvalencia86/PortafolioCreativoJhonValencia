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
    category: "BRANDING / DISEÑO EDITORIAL",
    year: "2026",
    color: "#FFD52B",
    ink: "#151515",
    accent: "#D71920",
    paper: "#F4F0E9",
    theme: "light",
    card: { template: "frame", src: IMG + "a36cuotas/card.webp", hero: IMG + "a36cuotas/portadas/podcast-urbano.webp", fit: "contain", bg: "#151515", pos: "50% 50%", heroInk: "#F4F0E9" },
    lead: "Aprende de plata antes de ponerla a cuotas.",
    facts: [
      ["TIPO", "Proyecto propio"],
      ["AÑO", "2026"],
      ["AUDIENCIAS", "Niños · Jóvenes · Adultos"],
      ["MI ROL", "Creador · Dirección creativa"]
    ],
    story: [
      { type: "text", label: "EL RETO", title: "Hablar de plata sin que suene a banco.",
        body: "Democratizar la educación financiera con un lenguaje cercano y formatos que ayuden a entender decisiones cotidianas sobre el dinero: créditos, intereses, seguros y riesgos de fraude suelen explicarse con palabras que alejan a la gente." },

      { type: "duo", band: "yellow", label: "LA PROPUESTA",
        title: "Un ecosistema educativo conducido por dos títeres.",
        body: "Tino y Tado tienen personalidades complementarias. La narrativa mezcla humor, situaciones reales y explicaciones prácticas: uno se equivoca, el otro explica, y el público aprende sin sentirse en clase.",
        cast: [
          { name: "TINO", role: "Impulsivo, curioso, aprende de sus errores", src: IMG + "a36cuotas/personajes/tino.webp", alt: "Tino, títere con gafas oscuras y audífonos en el estudio" },
          { name: "TADO", role: "Analítico y equilibrado, explica alternativas y consecuencias", src: IMG + "a36cuotas/personajes/tado.webp", alt: "Tado, títere con gorra gris y buzo blanco en el estudio" }
        ] },

      { type: "identity", label: "SISTEMA DE IDENTIDAD",
        title: "Editorial urbano: papel, cinta y fieltro.",
        body: "El logo convierte el “36” en un micrófono: la marca se presenta como conversación. El amarillo llama la atención, el rojo marca alertas y temas clave, y el negro le da carácter de calle. Las texturas de papel rasgado, las cintas y los subrayados a mano hacen que todo se sienta cercano, no corporativo.",
        image: { src: IMG + "a36cuotas/identidad/logo-podcast.webp", alt: "Logo A 36 Cuotas — el podcast de Tino & Tado", w: 1672, h: 941 },
        palette: [["Amarillo", "#FFD52B"], ["Rojo", "#D71920"], ["Negro", "#151515"], ["Papel", "#F4F0E9"], ["Blanco", "#FFFFFF"]] },

      { type: "formats", label: "PORTADAS",
        title: "Una portada para cada pantalla.",
        body: "La misma escena del estudio se adapta a cada formato sin perder el logo ni a los personajes. En vertical manda el póster; en horizontal, la miniatura tiene que leerse en un segundo: título grande, una cara expresiva y un objeto que cuenta el tema.",
        groups: [
          { name: "Pósters verticales", spec: "3:4 · 9:16 — Spotify, Reels, Stories y TikTok", cols: 3, items: [
            { src: IMG + "a36cuotas/portadas/podcast-tino-y-tado.webp", alt: "Portada del podcast — 3:4", w: 1086, h: 1448 },
            { src: IMG + "a36cuotas/portadas/podcast-vertical.webp", alt: "Portada vertical del podcast — 9:16", w: 941, h: 1672 },
            { src: IMG + "a36cuotas/portadas/podcast-urbano.webp", alt: "Portada urbana Finanzas sin enredos — 9:16", w: 941, h: 1672 }
          ] },
          { name: "Miniaturas de YouTube", spec: "16:9 — episodios, tips y clips", cols: 2, items: [
            { src: IMG + "a36cuotas/miniaturas/el-podcast-de-tino-y-tado.webp", alt: "El podcast de Tino & Tado", w: 1672, h: 941 },
            { src: IMG + "a36cuotas/miniaturas/creditos-y-prestamos.webp", alt: "Episodio: Créditos y préstamos — cómo no caer en fraudes", w: 1672, h: 941 },
            { src: IMG + "a36cuotas/miniaturas/tino-y-tado-en-vivo.webp", alt: "Tino y Tado en vivo — On Air", w: 1672, h: 941 },
            { src: IMG + "a36cuotas/miniaturas/tino-y-tado-en-el-podcast.webp", alt: "Tino y Tado en el podcast", w: 1672, h: 941 },
            { src: IMG + "a36cuotas/miniaturas/tip-verifica-la-legalidad.webp", alt: "Tip 4: Verifica la legalidad", w: 836, h: 471 },
            { src: IMG + "a36cuotas/miniaturas/tip-define-tu-objetivo.webp", alt: "Tip 1: Define tu objetivo", w: 1536, h: 864 },
            { src: IMG + "a36cuotas/miniaturas/escena-bre-b.webp", alt: "Escena en la calle: una compra con Bre-B", w: 1536, h: 864 },
            { src: IMG + "a36cuotas/miniaturas/consejos-financieros.webp", alt: "Serie de tips: liquidez, riesgo y legalidad", w: 1672, h: 941 }
          ] }
        ] },

      { type: "figures", label: "PERSONAJES",
        title: "Un universo que crece por perfiles.",
        body: "Además de Tino y Tado, el universo suma perfiles como la universitaria, el emprendedor, la mamá, el trabajador o la abuela: cada uno abre un tema distinto frente al dinero. Fichas de personalidad, ideas de escena y una hoja de expresiones mantienen la coherencia en cada pieza.",
        items: [
          { src: IMG + "a36cuotas/personajes/universo-personajes.webp", alt: "Universo de personajes y recursos", w: 1536, h: 1024, span: "full" },
          { src: IMG + "a36cuotas/personajes/tino-y-tado-en-escena.webp", alt: "Ficha de personaje de Tino e ideas de escena", w: 1536, h: 1024, span: "half" },
          { src: IMG + "a36cuotas/personajes/hoja-de-pegatinas.webp", alt: "Hoja de expresiones y stickers de Tino y Tado", w: 1536, h: 1024, span: "half" }
        ] },

      { type: "deck", band: "black", label: "DISEÑO EDITORIAL · PRESENTACIÓN",
        title: "16 diapositivas, un solo sistema.",
        body: "La presentación del proyecto aplica la identidad a una retícula repetible: titular en cinta amarilla, personaje recortado a un lado, iconografía roja y fondo de papel. Cambia el contenido, nunca la gramática visual.",
        spec: "PRESENTACIÓN DEL PROYECTO · 16 DIAPOSITIVAS · 1920×1080",
        items: [
          { src: IMG + "a36cuotas/deck/01.webp", alt: "Presentación A 36 Cuotas — diapositiva 1 de 16", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/deck/02.webp", alt: "Presentación A 36 Cuotas — diapositiva 2 de 16", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/deck/03.webp", alt: "Presentación A 36 Cuotas — diapositiva 3 de 16", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/deck/04.webp", alt: "Presentación A 36 Cuotas — diapositiva 4 de 16", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/deck/05.webp", alt: "Presentación A 36 Cuotas — diapositiva 5 de 16", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/deck/06.webp", alt: "Presentación A 36 Cuotas — diapositiva 6 de 16", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/deck/07.webp", alt: "Presentación A 36 Cuotas — diapositiva 7 de 16", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/deck/08.webp", alt: "Presentación A 36 Cuotas — diapositiva 8 de 16", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/deck/09.webp", alt: "Presentación A 36 Cuotas — diapositiva 9 de 16", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/deck/10.webp", alt: "Presentación A 36 Cuotas — diapositiva 10 de 16", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/deck/11.webp", alt: "Presentación A 36 Cuotas — diapositiva 11 de 16", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/deck/12.webp", alt: "Presentación A 36 Cuotas — diapositiva 12 de 16", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/deck/13.webp", alt: "Presentación A 36 Cuotas — diapositiva 13 de 16", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/deck/14.webp", alt: "Presentación A 36 Cuotas — diapositiva 14 de 16", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/deck/15.webp", alt: "Presentación A 36 Cuotas — diapositiva 15 de 16", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/deck/16.webp", alt: "Presentación A 36 Cuotas — diapositiva 16 de 16", w: 1400, h: 788 }
        ] },

      { type: "deck", label: "DISEÑO EDITORIAL · PITCH",
        title: "La versión sobria para aliados.",
        body: "Para conversaciones con entidades, el sistema se vuelve más editorial: bloques de color plano rojo y papel, titulares en dos tonos, numeración grande y las miniaturas de los episodios como prueba de que el contenido ya existe.",
        spec: "PITCH EDITORIAL · 10 DIAPOSITIVAS · 1920×1080",
        items: [
          { src: IMG + "a36cuotas/pitch/01.webp", alt: "Pitch editorial A 36 Cuotas — diapositiva 1 de 10", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/pitch/02.webp", alt: "Pitch editorial A 36 Cuotas — diapositiva 2 de 10", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/pitch/03.webp", alt: "Pitch editorial A 36 Cuotas — diapositiva 3 de 10", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/pitch/04.webp", alt: "Pitch editorial A 36 Cuotas — diapositiva 4 de 10", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/pitch/05.webp", alt: "Pitch editorial A 36 Cuotas — diapositiva 5 de 10", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/pitch/06.webp", alt: "Pitch editorial A 36 Cuotas — diapositiva 6 de 10", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/pitch/07.webp", alt: "Pitch editorial A 36 Cuotas — diapositiva 7 de 10", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/pitch/08.webp", alt: "Pitch editorial A 36 Cuotas — diapositiva 8 de 10", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/pitch/09.webp", alt: "Pitch editorial A 36 Cuotas — diapositiva 9 de 10", w: 1400, h: 788 },
          { src: IMG + "a36cuotas/pitch/10.webp", alt: "Pitch editorial A 36 Cuotas — diapositiva 10 de 10", w: 1400, h: 788 }
        ] },

      { type: "figures", label: "PIEZAS DE COMUNICACIÓN",
        title: "Del mosaico a la plantilla.",
        body: "Mosaicos de narrativa, infografías de 16 paneles y plantillas editables para que cualquier pieza nueva salga con la misma voz.",
        items: [
          { src: IMG + "a36cuotas/editorial/finanzas-sin-enredos.webp", alt: "Mosaico narrativo: Finanzas sin enredos", w: 1672, h: 941, span: "full" },
          { src: IMG + "a36cuotas/editorial/infografia-16-paneles.webp", alt: "Infografía de A 36 Cuotas en 16 paneles", w: 1672, h: 941, span: "half" },
          { src: IMG + "a36cuotas/editorial/plantilla-del-podcast.webp", alt: "Plantilla editorial del podcast", w: 1672, h: 941, span: "half" }
        ] },

      { type: "steps", label: "PROCESO CREATIVO",
        title: "De la necesidad a la pieza publicada.",
        body: "La inteligencia artificial apoya la ideación, los recursos visuales, los guiones y los clips. Antes de publicar, todo pasa por revisión humana de exactitud financiera y coherencia editorial.",
        steps: [
          ["Necesidades", "Qué le cuesta entender a la gente sobre su plata."],
          ["Audiencias", "Niños, jóvenes y adultos, con temas por etapa."],
          ["Personajes", "Tino, Tado y el universo de perfiles."],
          ["Guion", "Situaciones reales contadas como conversación."],
          ["Prototipo visual", "Portadas, escenas y sistema editorial."],
          ["Producción", "Episodios, clips y piezas asistidas por IA."],
          ["Distribución", "Web y YouTube, con medición propuesta."]
        ] },

      { type: "cards", label: "LÍNEAS EDITORIALES",
        title: "Seis temas, explicados sin enredos.",
        body: "Formatos previstos: podcast, clips de 10 segundos, videos educativos y piezas gráficas por edades.",
        cards: [
          ["Créditos", "Comparar tasas, plazos y costos."],
          ["Tarjetas", "Intereses, cuotas y compras conscientes."],
          ["Ahorro e inversión", "Metas, riesgos y hábitos."],
          ["Seguros", "Protección y lectura de coberturas."],
          ["Fraudes", "Señales de alerta y verificación de entidades."],
          ["Pagos digitales", "Bre-B y seguridad."]
        ] },

      { type: "youtube", band: "black", label: "AUDIOVISUAL · YOUTUBE",
        title: "Al aire desde el estudio de Tino y Tado.",
        body: "El podcast es el formato central: un set cálido y urbano que funciona igual en video, portada y clip corto. Dale play para ver los episodios del canal aquí mismo.",
        list: "UU6cWds2IAS3J5lKP-8z_3qA",
        url: "https://www.youtube.com/@a36cuotas",
        handle: "@A36Cuotas",
        poster: IMG + "a36cuotas/miniaturas/tino-y-tado-en-vivo.webp" },

      { type: "web", label: "PLATAFORMA WEB",
        title: "La casa del proyecto: treintaseiscuotas.com",
        body: "La web reúne episodios, recursos educativos y la información para aliados. Ábrela aquí dentro o en una pestaña nueva.",
        url: "https://treintaseiscuotas.com/",
        domain: "treintaseiscuotas.com",
        preview: IMG + "a36cuotas/identidad/logo-podcast.webp" },

      { type: "text", label: "MI APORTE", title: "Del concepto a la producción.",
        body: "Diseñé el proyecto de punta a punta, conectando mi experiencia en servicios financieros con la dirección creativa.",
        chips: ["Conceptualización", "Estrategia de producto y contenidos", "Dirección creativa", "Identidad visual", "Diseño de personajes", "Producción audiovisual con IA", "Estrategia de alianzas y distribución"] },

      { type: "text", label: "SOSTENIBILIDAD Y RESULTADOS", title: "Lo que existe hoy y cómo se va a medir.",
        body: "El modelo propuesto es colaborar con bancos, fintech, cooperativas y aseguradoras mediante patrocinios o intercambio de contenido, conservando la independencia editorial; no hay alianzas cerradas. Hoy existen piezas gráficas, personajes, propuestas y plantillas editables, pero todavía no hay métricas verificadas. Estos son los indicadores propuestos:",
        chips: ["Alcance", "Retención de video", "Interacciones", "Tráfico web", "Aprendizaje"] }
    ],
    links: [
      { label: "treintaseiscuotas.com", url: "https://treintaseiscuotas.com/", sub: "Sitio web" },
      { label: "YouTube @a36cuotas", url: "https://www.youtube.com/@a36cuotas", sub: "Canal" },
      { label: "Lanzamiento", url: "https://es.linkedin.com/posts/jhonvalenciasantana_a36cuotas-educaci%C3%B3nfinanciera-finanzaspersonales-activity-7513704790288158720-Z8vi", sub: "LinkedIn" },
      { label: "Pagos con Bre-B", url: "https://es.linkedin.com/posts/jhonvalenciasantana_breb-a36cuotas-educacionfinanciera-activity-7515534428610121728-rzEF", sub: "LinkedIn" },
      { label: "Alianzas", url: "https://es.linkedin.com/posts/jhonvalenciasantana_a36cuotas-educaci%C3%B3nfinanciera-inclusi%C3%B3nfinanciera-activity-7514097489017225218-FYwX", sub: "LinkedIn" }
      // Instagram, TikTok y Spotify: pendientes de confirmar.
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

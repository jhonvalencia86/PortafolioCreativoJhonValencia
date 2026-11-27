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
  title: "Creative Strategy & Digital Innovation",
  headline: "Creatividad, estrategia y tecnología.",
  description: "Profesional especializado en marketing, innovación, desarrollo de productos digitales y dirección creativa. Transformo ideas en marcas, experiencias y soluciones digitales.",
  expertise: ["Creative Direction", "Brand Strategy", "Digital Marketing", "Product Design", "Digital Innovation", "Artificial Intelligence", "Storytelling", "Audiovisual Production"],
  studio: "JV® — CREATIVE STUDIO",
  place: "BOGOTÁ, COLOMBIA / 2026",
  email: "jhxnvale86@gmail.com",
  links: {
    behance: "https://www.behance.net/jhxnvale",
    linkedin: "https://co.linkedin.com/in/jhonvalenciasantana",
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
    color: "#120E3A",
    ink: "#FFFFFF",
    accent: "#8B6CFF",
    theme: "dark",
    card: { template: "type", src: "assets/img/about/card-creator.webp", hero: "assets/img/about/jhon-valencia-duotono.webp", fit: "cover", bg: "#0B0828", pos: "50% 30%" },
    photo: "assets/img/about/jhon-valencia-duotono.webp"
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
    tags: ["Branding", "Educación financiera", "Contenido", "IA"],
    short: "Podcast y plataforma de educación financiera con personajes, humor y producción asistida por IA.",
    card: { template: "full", src: IMG + "a36cuotas/card-en-vivo.webp", hero: IMG + "a36cuotas/portada-en-vivo.webp", fit: "cover", heroFit: "cover", bg: "#151515", pos: "50% 50%", heroPos: "88% 50%", ar: "16 / 9" },
    lead: "Aprende de plata antes de ponerla a cuotas.",
    facts: [
      ["TIPO", "Proyecto propio"],
      ["AÑO", "2026"],
      ["AUDIENCIAS", "Niños · Jóvenes · Adultos"],
      ["MI ROL", "Creador · Dirección creativa"]
    ],
    story: [
      { type: "youtube", band: "black", label: "YOUTUBE · @A36CUOTAS", direct: true,
        title: "Al aire desde el estudio de Tino y Tado.",
        body: "El podcast es el formato central: un set cálido y urbano que funciona igual en video, portada y clip corto. Mira los episodios del canal aquí mismo.",
        list: "UULF6cWds2IAS3J5lKP-8z_3qA",
        url: "https://www.youtube.com/@A36Cuotas",
        handle: "@A36Cuotas",
        poster: IMG + "a36cuotas/miniaturas/tino-y-tado-en-vivo.webp" },

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
      { label: "YouTube @A36Cuotas", url: "https://www.youtube.com/@A36Cuotas", sub: "Canal" },
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
    layout: "story",
    published: true,
    title: "CHROME LOVERS",
    category: "ART DIRECTION / MUSIC / AI",
    year: "2026",
    color: "#151515",
    ink: "#F4F1EA",
    accent: "#E0368A",
    theme: "dark",
    tags: ["Dirección de arte", "Música", "IA"],
    short: "Universo musical y audiovisual que cruza rap, rock y electrónica con Bogotá en clave anime.",
    card: { template: "full", src: IMG + "chrome-lovers/card.webp", hero: IMG + "chrome-lovers/chrome-lovers-bogota-cyberpunk.webp", fit: "cover", heroFit: "contain", bg: "#120E14", pos: "50% 30%", heroInk: "#F4F1EA" },
    lead: "Bogotá en clave anime noventero, al ritmo de rap, rock y electrónica.",
    facts: [
      ["AÑO", "2026"],
      ["TIPO", "Proyecto artístico independiente"],
      ["INDUSTRIA", "Música · Arte"],
      ["MI ROL", "Dirección de arte · Creación"]
    ],
    story: [
      { type: "text", label: "THE PROJECT", title: "Un universo, no solo una canción.",
        body: "Chrome Lovers es un proyecto musical y audiovisual experimental que conecta rap, rock, electrónica, narrativa visual e inteligencia artificial. La música se acompaña de un mundo propio: personajes, ciudad, objetos y una estética coherente en cada pieza." },
      { type: "figures", band: "black", label: "UNIVERSO CREATIVO",
        title: "Bogotá cyberpunk.",
        body: "La ciudad funciona como un personaje más: calles reconocibles leídas con la estética del anime de los 90, neón, grafiti y cultura skater.",
        items: [
          { src: IMG + "chrome-lovers/chrome-lovers-bogota-cyberpunk.webp", alt: "Key visual: Chrome Lovers en una Bogotá cyberpunk", w: 1312, h: 1199, span: "full" }
        ] },
      { type: "figures", label: "PERSONAJES",
        title: "Su y J.",
        body: "Los dos protagonistas se diseñaron como para una serie: acta visual, rotaciones, vestuario, expresiones, accesorios y paleta, para que se reconozcan en cualquier portada o escena.",
        items: [
          { src: IMG + "chrome-lovers/acta-visual-chrome-lovers-anime-skater.webp", alt: "Acta visual de personajes: Su y J", w: 1199, h: 1312, span: "half" },
          { src: IMG + "chrome-lovers/hoja-de-personajes-chrome-lovers-retro-anime.webp", alt: "Hoja de personajes retro anime", w: 1199, h: 1312, span: "half" }
        ] },
      { type: "figures", label: "DIRECCIÓN DE ARTE",
        title: "Vestuario, objetos y calle.",
        body: "La hoja de diseño urbana fija el sistema: prendas, accesorios, tipografía de marca y referencias de color que luego se repiten en portadas y videoclips.",
        items: [
          { src: IMG + "chrome-lovers/hoja-de-diseno-urbana-chrome-lovers.webp", alt: "Hoja de diseño urbana de Chrome Lovers", w: 1024, h: 1536, span: "tall" }
        ] },
      { type: "text", label: "CREATIVE TECHNOLOGY", title: "IA como herramienta, criterio como dirección.",
        body: "La inteligencia artificial generativa se usa para explorar personajes, escenarios y variaciones visuales. La dirección de arte define el universo, selecciona y corrige cada resultado para mantener la coherencia del proyecto.",
        chips: ["Dirección de arte", "Diseño de personajes", "Worldbuilding", "IA generativa"] }
    ],
    links: []
  },

  /* ---------------------------------------------------------------- 03 */
  {
    number: "03",
    id: "credito-inteligente",
    kind: "project",
    layout: "story",
    published: true,
    title: "MI CRÉDITO INTELIGENTE",
    category: "FINTECH / DIGITAL PRODUCT",
    year: "2026",
    color: "#08275B",
    ink: "#FFFFFF",
    accent: "#2563EB",
    theme: "light",
    tags: ["FinTech", "Producto digital", "Branding", "Educación financiera"],
    short: "Plataforma para comparar y simular créditos y seguros antes de decidir. No otorga préstamos.",
    card: { template: "frame", src: IMG + "credito-inteligente/card.webp", hero: IMG + "credito-inteligente/logo-mi-credito-inteligente-refinado.webp", fit: "contain", blend: true, bg: "#FBFAF8" },
    lead: "Compara, simula y decide.",
    facts: [
      ["AÑO", "2026"],
      ["TIPO", "Proyecto propio"],
      ["INDUSTRIA", "FinTech · Educación financiera"],
      ["MI ROL", "Creador · Estrategia de producto"]
    ],
    story: [
      { type: "text", label: "THE PROJECT", title: "¿En qué banco te prestan mejor?",
        body: "Mi Crédito Inteligente es una plataforma de educación financiera, comparación y simulación de créditos y seguros que ayuda a las personas a tomar decisiones informadas. No otorga préstamos: su papel es explicar y comparar antes de que alguien firme." },
      { type: "text", label: "PROPUESTA DE VALOR", title: "Entender primero, decidir después.",
        body: "Comparar tasas, simular cuotas y entender condiciones en un solo lugar, con un lenguaje claro y acompañamiento visual." ,
        chips: ["Comparar", "Simular", "Aprender", "Decidir"] },
      { type: "identity", label: "IDENTIDAD VISUAL",
        title: "Confianza sin frialdad bancaria.",
        body: "Un monograma M, azules de confianza, un verde que habla de dinero sano y un morado que aporta cercanía. La marca se acompaña de MICI, una mascota-billete con capa que guía al usuario.",
        image: { src: IMG + "credito-inteligente/logo-mi-credito-inteligente-refinado.webp", alt: "Logo Mi Crédito Inteligente con la mascota MICI", w: 1536, h: 1024, contain: true },
        palette: [["Verde", "#31C48D"], ["Azul", "#2563EB"], ["Morado", "#7C4DDE"], ["Navy", "#08275B"]] },
      { type: "figures", label: "VARIACIONES DE MARCA",
        title: "Un sistema que escala.",
        body: "Versiones del logo, monograma y aplicaciones para producto y comunicación.",
        items: [
          { src: IMG + "credito-inteligente/identidad-fintech-de-mi-credito-inteligente.webp", alt: "Identidad fintech: versiones del logo y monograma", w: 1536, h: 1024, span: "full" }
        ] },
      { type: "figures", label: "CAMPAÑAS",
        title: "MICI al frente.",
        body: "La mascota protagoniza la comunicación: preguntas directas, tasas a la vista y las cuatro acciones del producto.",
        items: [
          { src: IMG + "credito-inteligente/mi-credito-inteligente-finanzas-mas-faciles.webp", alt: "Banner: ¿En qué banco te prestan mejor?", w: 1677, h: 938, span: "full" }
        ] }
    ],
    links: [{ label: "creditointeligente.finance", url: "https://creditointeligente.finance", sub: "Sitio web" }]
  },

  /* ---------------------------------------------------------------- 04 */
  {
    number: "04",
    id: "chappetag",
    kind: "project",
    layout: "story",
    published: true,
    title: "CHAPPETAG",
    category: "AGROTECH / DIGITAL INNOVATION",
    year: "2026",
    color: "#023D23",
    ink: "#FFFFFF",
    accent: "#1F8A3B",
    paper: "#F4F3EC",
    theme: "light",
    tags: ["AgroTech", "Innovación", "Producto digital", "Branding"],
    short: "Chapeta con NFC y QR más una app de campo: la historia de cada animal, en el celular del ganadero.",
    card: { template: "frame", src: IMG + "chappetag/card-logo.webp", hero: IMG + "chappetag/campana/portada-web.webp", fit: "cover", heroFit: "cover", bg: "#FFFFFF", heroBg: "#023D23", heroPos: "50% 50%", ar: "16 / 9", flyFromCard: true },
    lead: "Ganado conectado. Un campo más inteligente.",
    facts: [
      ["AÑO", "2026"],
      ["TIPO", "Proyecto propio"],
      ["INDUSTRIA", "Agro · Ganadería"],
      ["MI ROL", "Creador · Producto · Marca"]
    ],
    story: [
      { type: "video", band: "black", label: "VIDEO · CHAPPETAG EN 36 SEGUNDOS",
        title: "Del potrero al celular.",
        body: "La pieza audiovisual resume la propuesta: el ganadero recorre su finca, lee la chapeta de cada animal con el celular y controla sus lotes desde la app.",
        src: "assets/video/chappetag-ganado-conectado.mp4",
        poster: "assets/video/chappetag-ganado-conectado-poster.webp",
        w: 1920, h: 1080 },

      { type: "text", label: "THE CHALLENGE", title: "La historia de cada animal vive en un cuaderno o en la memoria.",
        body: "En muchas fincas la información del ganado —peso, sanidad, reproducción, movimientos— está dispersa o no existe. Sin datos confiables es difícil demostrar trazabilidad, tomar decisiones o acceder a mejores condiciones comerciales." },

      { type: "text", band: "yellow", label: "STRATEGY & CONCEPT", title: "Una chapeta que se lee con el celular.",
        body: "ChAppeTag convierte la chapeta tradicional de identificación en una puerta de entrada digital: cada animal lleva una chapeta física con NFC y código QR que, al leerse con el celular, abre su historial en la app. El nombre lo explica solo: dentro de “chapeta” aparecen “App” y “Tag”.",
        chips: ["Chapeta NFC + QR", "App de campo", "Trazabilidad", "Funciona sin señal", "El ganadero controla sus datos"] },

      { type: "steps", label: "CÓMO FUNCIONA",
        title: "Cinco pasos, del registro al ingreso.",
        body: "El recorrido completo del ganadero, tal como lo plantea el modelo del producto.",
        steps: [
          ["Registro", "El ganadero registra su finca y sus lotes en la plataforma, gratis."],
          ["Identificación", "Cada animal recibe una chapeta física con NFC o código QR."],
          ["Trazabilidad", "Peso, salud y fotos quedan registrados, incluso sin señal."],
          ["Control", "El ganadero decide qué información de cada lote es pública."],
          ["Ingresos", "Un fee simbólico de activación por chapeta, pagado una sola vez."]
        ] },

      { type: "figures", label: "PRODUCTO · EXPERIENCIA",
        title: "Así funciona para el ganadero.",
        body: "Infografías del recorrido: registrar la finca, colocar la chapeta, guardar el historial, controlar la información y obtener beneficios.",
        items: [
          { src: IMG + "chappetag/producto/journey.webp", alt: "Así funciona ChAppeTag para el ganadero: tres pasos", w: 1672, h: 941, span: "full" },
          { src: IMG + "chappetag/producto/infografia.webp", alt: "Infografía en cinco pasos del uso de ChAppeTag", w: 1672, h: 941, span: "full" }
        ] },

      { type: "figures", label: "MODELO DE NEGOCIO",
        title: "La plataforma subsidia la chapeta.",
        body: "La chapeta física la subsidia la plataforma y el ganadero solo paga la activación. El cobro simbólico filtra el compromiso real sin convertirse en una barrera de entrada.",
        items: [
          { src: IMG + "chappetag/estrategia/modelo-negocio.webp", alt: "Cómo funciona el negocio de ChAppeTag", w: 1672, h: 941, span: "full" }
        ] },

      { type: "identity", label: "IDENTIDAD VISUAL",
        title: "Una chapeta que emite señal.",
        body: "El símbolo es la propia chapeta ganadera con ondas de conexión: el objeto que todo ganadero reconoce, convertido en tecnología. Amarillo de chapeta para el símbolo, verde noche para el campo y mayúsculas internas (Ch·App·e·Tag) que revelan el producto dentro del nombre.",
        image: { src: IMG + "chappetag/identidad/logo-color.webp", alt: "Logo ChAppeTag: Ganado conectado", w: 1672, h: 941, contain: true },
        palette: [["Amarillo chapeta", "#FCC300"], ["Verde noche", "#023D23"], ["Crema", "#F0F0E8"], ["Blanco", "#FFFFFF"]] },

      { type: "figures", label: "SISTEMA DE MARCA",
        title: "Versiones y aplicaciones.",
        body: "El sistema funciona sobre fondo claro, verde y amarillo, en horizontal y en versión compacta. La exploración inicial con la vaca y la nube de datos sirvió para fijar el concepto antes de simplificarlo en la chapeta.",
        items: [
          { src: IMG + "chappetag/identidad/sistema-visual.webp", alt: "Sistema visual: versiones sobre claro, verde y amarillo", w: 1536, h: 1024, span: "full" },
          { src: IMG + "chappetag/identidad/logo-alternativo.webp", alt: "Logo sobre fondo oscuro", w: 1800, h: 600, span: "half" },
          { src: IMG + "chappetag/identidad/logo-variante.webp", alt: "Logo horizontal sobre claro", w: 1800, h: 600, span: "half" },
          { src: IMG + "chappetag/identidad/logo-concepto.webp", alt: "Exploración inicial de concepto: vaca, chapeta NFC y datos", w: 1254, h: 1254, span: "half" }
        ] },

      { type: "figures", label: "CAMPAÑA",
        title: "Tecnología que impulsa el campo colombiano.",
        body: "Portada web, storyboard en seis momentos (origen, desafío, solución, conexión, control y resultado) y una pieza editorial tipo brochure.",
        items: [
          { src: IMG + "chappetag/campana/portada-web.webp", alt: "Portada web: trazabilidad inteligente para tu ganado", w: 1672, h: 941, span: "full" },
          { src: IMG + "chappetag/campana/storyboard.webp", alt: "Storyboard de campaña en seis momentos", w: 1536, h: 1024, span: "wide" },
          { src: IMG + "chappetag/campana/brochure.webp", alt: "Brochure: tu ganado identificado, tu finca bajo control", w: 1055, h: 1491, span: "tall" }
        ] },

      { type: "text", label: "MI APORTE", title: "De la tesis de negocio a la marca.",
        body: "Definí el problema, la solución y el modelo de negocio, y desarrollé el naming, la identidad y las piezas de comunicación.",
        chips: ["Tesis de negocio", "Estrategia de producto", "Modelo de monetización", "Naming", "Identidad visual", "Campaña"] }
    ],
    links: [{ label: "chappetag.com", url: "https://chappetag.com", sub: "Sitio web" }]
  },

  /* ---------------------------------------------------------------- 05 */
  {
    number: "05",
    id: "profane-noise",
    kind: "project",
    layout: "story",
    published: true,
    title: "PROFANE NOISE",
    category: "GRAPHIC DESIGN / ART DIRECTION",
    year: "2026",
    color: "#E44832",
    ink: "#FFFFFF",
    accent: "#3BEA1E",
    theme: "dark",
    tags: ["Diseño gráfico", "Dirección de arte", "Música"],
    short: "Concepto gráfico para un evento de música underground en Bogotá: punk, metal y serigrafía.",
    card: { template: "full", src: IMG + "profane-noise/card.webp", hero: IMG + "profane-noise/cover.webp", fit: "cover", heroFit: "contain", bg: "#0E0E0E", pos: "50% 20%", heroInk: "#FFFFFF" },
    lead: "Ruido underground, impreso y pegado en la calle.",
    facts: [
      ["AÑO", "2026"],
      ["TIPO", "Proyecto creativo"],
      ["INDUSTRIA", "Cultura musical"],
      ["MI ROL", "Diseño gráfico · Dirección de arte"]
    ],
    story: [
      { type: "text", label: "CONCEPTO", title: "Gráfica que suena.",
        body: "Concepto gráfico y dirección de arte para un evento de música underground en Bogotá, inspirado en la cultura punk, el metal, la serigrafía y la gráfica urbana." },
      { type: "formats", label: "AFICHES · EXPLORACIÓN CROMÁTICA",
        title: "Neón para destacar, monocromo para pegar.",
        body: "Bestias ilustradas, tipografía metal ilegible a propósito y dos versiones de color pensadas para usos distintos.",
        groups: [
          { name: "Afiches", spec: "3:4 · Verde neón y monocromo", cols: 3, items: [
            { src: IMG + "profane-noise/cartel-punk-neon-de-profane-noise.webp", alt: "Afiche versión verde neón", w: 1087, h: 1446 },
            { src: IMG + "profane-noise/poster-monocromo-de-ruido-profano.webp", alt: "Afiche versión monocromo", w: 1088, h: 1446 }
          ] }
        ] },
      { type: "figures", band: "black", label: "APLICACIÓN IMPRESA",
        title: "La pieza en su hábitat.",
        body: "La pegada en muro es donde el afiche cobra sentido: repetición, textura y calle.",
        items: [
          { src: IMG + "profane-noise/mural-urbano-y-carteles-de-ruido.webp", alt: "Pegada de afiches en muro urbano", w: 1086, h: 1448, span: "tall" }
        ] },
      { type: "text", label: "MI APORTE", title: "De la idea al muro.",
        body: "Concepto, ilustración, tipografía y adaptaciones para impresión y redes.",
        chips: ["Concepto", "Dirección de arte", "Ilustración", "Tipografía", "Afiches"] }
    ],
    links: []
  },

  /* ---------------------------------------------------------------- 06 */
  {
    number: "06",
    id: "tu-crm-seguro",
    kind: "project",
    layout: "story",
    published: true,
    title: "TU CRM SEGURO",
    category: "INSURTECH / SAAS",
    year: "2026",
    color: "#0F7A3D",
    ink: "#FFFFFF",
    accent: "#0F7A3D",
    theme: "light",
    tags: ["InsurTech", "Producto digital", "Branding"],
    short: "Concepto de CRM para intermediarios y agencias de seguros: gestión comercial y relación con clientes.",
    card: { template: "frame", src: IMG + "tu-crm-seguro/card.webp", hero: IMG + "tu-crm-seguro/propuestas-de-logo-para-tu-crm-seguro.webp", fit: "contain", blend: true, bg: "#FFFFFF" },
    lead: "Relacionamiento de verdad con tu cliente, a un clic.",
    facts: [
      ["AÑO", "2026"],
      ["TIPO", "Proyecto conceptual"],
      ["INDUSTRIA", "Seguros"],
      ["MI ROL", "Producto · Identidad visual"]
    ],
    story: [
      { type: "text", label: "THE CHALLENGE", title: "Vender seguros es cuidar relaciones.",
        body: "Los intermediarios y agencias de seguros gestionan clientes, pólizas y seguimientos con herramientas dispersas. El concepto plantea un CRM especializado para su gestión comercial y su relación con los clientes." },
      { type: "text", label: "PROPUESTA DE VALOR", title: "Un CRM hecho para el intermediario.",
        body: "En lugar de adaptar un CRM genérico, la propuesta parte de cómo trabaja una agencia de seguros: clientes, pólizas, renovaciones y seguimiento en un mismo lugar.",
        chips: ["Clientes", "Pólizas", "Seguimiento", "Gestión comercial"] },
      { type: "figures", label: "IDENTIDAD VISUAL",
        title: "Diez rutas para una marca.",
        body: "Exploración de diez propuestas de logo alrededor de protección y conexión, hasta llegar a un sistema verde y directo con la promesa “a un clic”.",
        items: [
          { src: IMG + "tu-crm-seguro/propuestas-de-logo-para-tu-crm-seguro.webp", alt: "Exploración de 10 propuestas de logo", w: 1199, h: 1312, span: "tall" },
          { src: IMG + "tu-crm-seguro/logo-tucrm-seguro-proteccion-y-conexion.webp", alt: "Logo final: protección y conexión", w: 1800, h: 600, span: "full" }
        ] },
      { type: "figures", label: "PIEZAS",
        title: "La promesa en banners.",
        items: [
          { src: IMG + "tu-crm-seguro/tucrm-seguro-relacionamiento-de-verdad.webp", alt: "Banner: relacionamiento de verdad", w: 1800, h: 600, span: "full" },
          { src: IMG + "tu-crm-seguro/banner-de-tucrm-seguro-con-boton-a-un-click.webp", alt: "Banner con botón a un clic", w: 1800, h: 600, span: "full" }
        ] }
    ],
    links: []
  },

  /* ---------------------------------------------------------------- 07 */
  {
    number: "07",
    id: "agrogestor",
    kind: "pending",
    published: false, // sin material verificado: oculto del sitio público
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
    tags: ["Publicidad", "Diseño gráfico"],
    short: "Más de quince años de piezas publicitarias, campañas y diseño gráfico en Behance.",
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

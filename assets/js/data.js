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

  /* ---------------------------------------------------------------- 01 · PO */
  {
    number: "01",
    id: "product-owner",
    kind: "po",
    published: true,
    title: "THE PRODUCT OWNER",
    category: "BANCA DIGITAL · PRODUCTO",
    year: "2017—2026",
    color: "#0A1433",
    ink: "#FFFFFF",
    accent: "#4C8DFF",
    paper: "#0A1433",
    theme: "dark",
    tags: ["Producto digital", "FinTech", "Innovación"],
    short: "15+ años creando productos y canales digitales en banca y seguros: discovery, roadmap, ágil y resultados medibles.",
    card: { template: "type" },
    lead: "Productos digitales financieros, de la idea a producción.",
    summary: "Product Owner con más de 15 años liderando productos y canales digitales en el sector financiero y asegurador. Especialista en discovery, roadmapping, journey mapping end-to-end y priorización basada en OKR e impacto/esfuerzo.",
    kpis: [
      { value: 15, prefix: "+", suffix: "", unit: "años", label: "liderando productos y canales digitales en banca y seguros" },
      { value: 60, prefix: "+", suffix: "%", unit: "conversión", label: "en conversión y adopción del canal digital del FNA, optimizando el funnel con datos" },
      { value: 50, prefix: "", suffix: "%", unit: "más rápido", label: "mejora en el tiempo de entrega de funcionalidades con priorización OKR (FNA)" },
      { value: 4000, prefix: "$", suffix: " M", unit: "COP / mes", label: "KPI sostenido en libranza digital en Credivalores – Banco Credifinanciera" }
    ],
    timeline: [
      { from: 2017.25, to: 2020.9, org: "Aseguradora Solidaria de Colombia", role: "Medios Digitales", text: "Productos y journeys digitales del sector asegurador, nuevos canales alternos y comité de innovación." },
      { from: 2020.85, to: 2021.25, org: "Credivalores – Banco Credifinanciera", role: "Canales Digitales", text: "Roadmap y journeys de crédito digital: $4.000 M mensuales en libranza digital." },
      { from: 2021.5, to: 2022.5, org: "Fondo Nacional del Ahorro (Serviola)", role: "Director Comercial Canales Digitales", text: "Funnel optimizado con datos: +60% en conversión. Nuevos canales: WhatsApp, SMS y mailing." },
      { from: 2022.5, to: 2025.9, org: "Fondo Nacional del Ahorro", role: "Product Owner", text: "Discovery, visión y roadmap de los productos digitales. 50% menos tiempo de entrega." },
      { from: 2025.9, to: 2026.9, org: "Consultor independiente", role: "Transformación y producto digital", text: "Diseño de productos y servicios digitales, de la necesidad al MVP y la mejora continua." }
    ],
    method: [
      ["Descubrir", "Discovery, entrevistas y journey mapping end-to-end."],
      ["Definir", "Visión, OKR y problema a resolver."],
      ["Desarrollar", "Historias de usuario, backlog y MVP con TI y proveedores."],
      ["Entregar", "Lanzamiento, analítica y mejora continua."]
    ],
    channels: ["App y web", "WhatsApp", "SMS", "Mailing", "TI y core", "Proveedores", "Analítica", "Negocio"],
    tools: ["Discovery", "Roadmapping", "Backlog", "Journey mapping", "OKR", "Impacto / esfuerzo", "Historias de usuario", "Scrum", "Kanban", "Ágil híbrido", "Design Thinking", "Jira", "Confluence", "Miro", "Analítica digital"],
    education: [
      ["Maestría en Innovación", "Universidad EAN · en curso"],
      ["Maestría en Marketing Digital y Comercio Electrónico", "UNIR, España"],
      ["Especialización en Gerencia de Mercadeo", "Politécnico Grancolombiano"],
      ["Publicista", "Universidad Central"]
    ],
    certs: ["Scrum Master · 2025", "IA para Gerentes · Microsoft y LinkedIn · 2026", "Google Project Management · 2024", "Fintech y Banca Digital · CESA · 2023", "Transformación Digital de Gobiernos · BID · 2024", "Product Owner · Platzi · 2022", "Design Thinking · Javeriana · 2017", "IA para el sector público · MinTIC · 2025"]
  },

  /* ---------------------------------------------------------------- Bolívar */
  {
    number: "02",
    id: "bolivar-contigo",
    kind: "project",
    layout: "story",
    published: true,
    title: "BOLÍVAR CONTIGO HOGAR",
    category: "MARKETING · PERFORMANCE · IA",
    year: "2026",
    color: "#0B7A3E",
    ink: "#FFFFFF",
    accent: "#F6D33C",
    paper: "#FBFAF5",
    theme: "light",
    tags: ["Marketing de ciclo de vida", "Performance", "IA", "Seguros"],
    short: "Caso de negocio: Seguros Bolívar y Servicios Bolívar acompañando la mudanza en un solo journey, activado por señales y medido contra grupo de control.",
    card: { template: "frame", src: IMG + "bolivar/card-bolivar.webp", hero: IMG + "bolivar/hero-bolivar.webp", fit: "cover", heroFit: "cover", bg: "#FDFEFC", heroBg: "#0B7A3E", pos: "50% 30%", heroPos: "100% 40%", heroInk: "#0B5D30", ar: "16 / 9", flyFromCard: true },
    lead: "Un hogar, una sola experiencia.",
    facts: [
      ["AÑO", "2026"],
      ["TIPO", "Caso de negocio · Estratega de Marketing"],
      ["INDUSTRIA", "Seguros · Vivienda"],
      ["MI ROL", "Estrategia · Performance · IA · Piezas"]
    ],
    story: [
      { type: "note", text: "Caso conceptual desarrollado para un proceso de selección. No es una campaña oficial de Seguros Bolívar. Las cifras del piloto son simuladas." },

      { type: "video", label: "EL COMERCIAL", title: "Ya tienes las llaves. Ahora, organicemos lo demás.",
        body: "La pieza de 10 segundos que resume la idea: la mudanza como momento de verdad y Bolívar como el acompañante que pone orden.",
        src: "assets/video/bolivar-comercial.mp4", poster: IMG + "bolivar/poster-comercial.webp", w: 1920, h: 1080 },

      { type: "jgap", label: "EL PROBLEMA", title: "Hoy son dos viajes en paralelo.",
        body: "Servicios Bolívar acompaña buscar y formalizar. Seguros Bolívar llega a proteger. En el medio queda la mudanza, y ahí nadie acompaña.",
        steps: ["Buscar", "Formalizar", "Mudarse", "Proteger", "Habitar", "Renovar"],
        rows: [["Servicios Bolívar", "Ciencuadras · El Libertador", 0, 1], ["Seguros Bolívar", "Hogar y asistencias", 3, 5]], gap: 2,
        cause: [["Síntoma", "Cada marca habla por su lado y la mudanza queda sin acompañar."], ["Causa raíz", "Datos y metas por marca, campañas por calendario, aliados sin incentivo cruzado."], ["Impacto", "Menos venta cruzada, menos permanencia y doble costo de adquisición."]] },

      { type: "curve", label: "LA PROTAGONISTA", title: "La mudanza es el momento de verdad.",
        body: "Laura, 33 años, arrendataria en Bogotá (persona ficticia). En la sobrecarga no quiere un seguro: quiere orden. Si la ayudamos a organizar, la protección llega como el paso lógico.",
        quote: "“Ya encontré apartamento. Ahora tengo que organizar todo lo demás.”" },

      { type: "hub", label: "LA SOLUCIÓN", title: "Mi Plan de Hogar: un solo acompañante.", band: "bol",
        body: "Un checklist personal que se activa con señales de vida y entrega el siguiente paso a la marca que sabe de eso. Sin app nueva.",
        signals: ["Contrato de arriendo firmado", "Fecha de mudanza", "Vencimiento de póliza o contrato", "Intención: compro o vendo"],
        leaders: [["Ciencuadras", "buscar, comprar, vender"], ["El Libertador", "formalizar el arriendo"], ["Seguros Bolívar", "proteger y asistir"], ["Aliado", "acompañar en persona"]] },

      { type: "moments", label: "EL VIAJE", title: "Seis momentos, una sola conversación.",
        body: "En cada momento lidera una marca, acompaña la otra y una señal activa el siguiente paso.",
        items: [["Buscar", "Ciencuadras → Seguros", "Portal, SEO, asesor", "Visita agendada + autorización"], ["Formalizar", "El Libertador → Ciencuadras", "Inmobiliaria, email", "Contrato firmado"], ["Mudarse", "Servicios → Seguros", "Email, WhatsApp autorizado", "Fecha de mudanza"], ["Proteger", "Seguros → Servicios", "Landing, agente o corredor", "Ítem “proteger” pendiente"], ["Habitar", "Seguros → Servicios", "Bolívar Conmigo, asistencia", "Uso de asistencia o día 90"], ["Renovar", "Ambas, según la necesidad", "CRM, asesor", "Vencimiento o intención"]], star: 2 },

      { type: "allies", label: "ALIADOS + IA", title: "El canal ya existe: Red Hogar Bolívar.",
        stats: [[56, "%", "de las primas pasa por agentes, agencias y corredores"], [40, "%", "de los hogares en Colombia vive en arriendo"]],
        cards: [["Radar de señales con IA", "Un copiloto en WhatsApp avisa al aliado cuando su cliente firma, se muda o vende, y le sugiere el mensaje."], ["Oferta en el estudio", "Al aprobarse el estudio de arriendo, el inquilino activa Mi Plan de Hogar en un clic."], ["Comisión por relación", "Quien refiere conserva su cliente y gana en la venta y en cada renovación."]],
        flow: ["Detecta", "El cliente autoriza", "Lead ID", "Contacto en 24 h", "Gana por cierre"],
        source: "Fuentes: Fundación Mapfre (datos 2021) · Ciencuadras y El Libertador (2025) · SFC. Piloto: 30 inmobiliarias + 20 agentes." },

      { type: "ice", label: "PERFORMANCE", title: "Probar antes de escalar.",
        body: "Cuatro hipótesis priorizadas con ICE: impacto, confianza y facilidad de 1 a 10. Todas con grupo de control; se escala solo con margen incremental y sin más quejas ni cancelaciones.",
        items: [["Mensaje en contexto", "Un mensaje tras firmar el contrato convierte más que uno genérico.", [9, 9, 9], "+30% leads calificados", "A/B · 4.000 · 30 días"], ["Orientar antes de vender", "Dar el checklist primero genera más cotizaciones que vender directo.", [9, 8, 8], "+25% cotizaciones", "A/B · 3.000 · 30 días"], ["Asesor aliado", "Un asesor aliado cierra más ventas que la ruta solo digital.", [9, 7, 7], "+20% conversión", "Piloto 20 asesores · 45 días"], ["Canal WhatsApp", "WhatsApp autorizado activa más planes que el email.", [7, 7, 7], "+20% activación", "A/B · 3.000 · 21 días"]] },

      { type: "web", direct: true, label: "LA LANDING", title: "Mi Plan de Hogar, navegable.",
        body: "El destino de toda la secuencia. Prototipo funcional: el formulario no envía datos.",
        url: "assets/web/bolivar/mi-plan-de-hogar.html", domain: "Prototipo · Mi Plan de Hogar" },

      { type: "cadence", label: "LAS PIEZAS", title: "Ofrecer orden, no un seguro.",
        body: "Brief 001: activar el plan tras el arriendo. Meta: 25% de los elegibles crea su plan en 7 días. Una promesa y un CTA por pieza; quien avanza sale de la secuencia y nadie recibe más de un contacto cada 48 h.",
        days: [["Día 0", "Contrato firmado"], ["Día 1", "Email de bienvenida"], ["Día 3", "WhatsApp si “proteger” sigue pendiente"], ["Día 7", "Banner solo a quien no actuó"], ["Día 10", "Llamada del aliado"]],
        images: [{ src: IMG + "bolivar/pieza-email.webp", alt: "Pieza email · Nuevo hogar, más tranquilidad", w: 1536, h: 1024 }, { src: IMG + "bolivar/pieza-whatsapp.webp", alt: "Pieza WhatsApp · Seguro de Hogar", w: 1122, h: 1402 }] },

      { type: "results", label: "MEDICIÓN", title: "El reporte del día 90.", band: "bol",
        body: "North Star: porcentaje de elegibles con producto activo en ambas marcas. Decisión el día 90: escalar, iterar o detener.",
        kpis: [[12, "", "%", "Relación dual", "vs. 8% del control"], [200, "", "", "Relaciones incrementales", "5.000 × 4 pp"], [20, "$", " M", "Margen neto", "200 × $250.000 − $30 M"], [67, "", "%", "ROI incremental", "$20 M / $30 M invertidos"]],
        rows: [["Leads calificados / elegibles", 5, 8, "%"], ["Cotizaciones / leads", 40, 50, "%"], ["Ventas / cotizaciones", 20, 25, "%"], ["Ventas originadas por aliados", 20, 35, "%"], ["NPS del momento mudanza", 45, 55, ""]],
        note: "Simulado: 5.000 en piloto y 5.000 en control. Cifras supuestas." },

      { type: "aiflow", label: "IA EN LA OPERACIÓN", title: "Método primero, IA después.",
        body: "Así operaría el día a día del equipo: todo entra por un solo lugar, la IA ordena y redacta, yo priorizo y decido. Revisión humana siempre y cero datos personales en IA pública.",
        steps: [["Entra", "Todo por un solo formulario"], ["Ordena", "La IA clasifica y arma el brief"], ["Prioriza", "Puntaje y matriz, no urgencia"], ["Ejecuta", "Tablero con capacidad y SLA"], ["Aprende", "Resultado medido y reportado"]],
        tools: [["Recibir solicitudes", "Copilot + Power Automate", "Clasifica y completa el brief base"], ["Briefs y copys", "Claude o ChatGPT empresarial", "Primer borrador y variantes A/B"], ["Bocetos", "Firefly o Canva IA", "Prototipos para probar antes de producir"], ["Reportes", "Power BI con Copilot", "Resumen semanal automático de KPIs"]],
        weights: [["Impacto", 35], ["Alineación", 25], ["Urgencia", 20], ["Evidencia", 10], ["Esfuerzo", 10]] },

      { type: "gantt", label: "PLAN DE TRABAJO", title: "90 días, cinco frentes.",
        phases: ["Días 1–30 · Preparar", "Días 31–60 · Probar", "Días 61–90 · Decidir"],
        rows: [["Datos y legal", [[0, 1, "Línea base, autorizaciones (Ley 1581) y reglas de señal"], [1, 3, "Control semanal de calidad de datos y consentimientos"]]], ["Producción", [[0, 1, "Brief 001: landing, email, WhatsApp y kit del aliado"], [1, 2, "Variantes A/B para H1, H2 y H4"], [2, 3, "Optimizar las piezas ganadoras"]]], ["CRM y canales", [[0, 1, "Disparador del contrato, Lead ID y secuencia"], [1, 3, "Operar la secuencia por señales y ajustar reglas"]]], ["Aliados", [[0, 1, "Elegir 30 inmobiliarias y 20 agentes"], [1, 2, "Arranca la prueba H3 con asesores"], [2, 3, "Primeros niveles Aliado Hogar"]]], ["Medición", [[0, 1, "Tablero y grupo de control"], [1, 2, "Lectura intermedia del día 45"], [2, 3, "Reporte del día 90 y decisión"]]]],
        miles: [[15, "Línea base"], [30, "Lanzamiento"], [45, "Lectura intermedia"], [90, "Escalar, iterar o detener"]] },

      { type: "cards", label: "POR QUÉ DECIDÍ ASÍ", title: "Bolívar ya tiene las soluciones. Falta conectar la relación.",
        colors: [["#0B7A3E", "#FFFFFF"], ["#F6D33C", "#0B3D22"], ["#FFFFFF", "#0B3D22"], ["#0B3D22", "#FFFFFF"]],
        cards: [["Mudanza primero", "Es el momento de mayor intención y hoy nadie lo acompaña."], ["Señales, no calendario", "Hablamos solo cuando hay una necesidad real."], ["Orientar antes de vender", "El plan da confianza y la protección llega sola."], ["Aliados como dueños", "Más de la mitad de las primas ya pasa por ellos."]] },

      { type: "deck", label: "LA PRESENTACIÓN", title: "El caso completo.", body: "Las 15 láminas que presenté. Clic para ampliar.",
        spec: "15 LÁMINAS · 16:9",
        items: Array.from({ length: 15 }, (_, k) => ({ src: IMG + `bolivar/slides/slide-${String(k + 1).padStart(2, "0")}.webp`, alt: `Bolívar Contigo Hogar · lámina ${k + 1}`, w: 1600, h: 900 })) }
    ]
  },

  /* ---------------------------------------------------------------- 01 */
  {
    number: "03",
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
    number: "04",
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
    paper: "#0E0B10",
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
      /* VIDEOS: pega aquí los enlaces de TikTok o Instagram (Reels).
         TikTok:    https://www.tiktok.com/@usuario/video/1234567890123456789
         Instagram: https://www.instagram.com/reel/ABCdef123/
         Si la lista está vacía, la sección no se muestra. */
      { type: "films", band: "black", label: "VIDEOS",
        title: "Chrome Lovers en movimiento.",
        body: "Videoclips, visualizer y piezas animadas del universo. Dale play: todo se reproduce aquí mismo, con sonido opcional.",
        items: [
          { kind: "video", span: "full", src: "assets/video/chrome-lovers/chrome-lovers-01.mp4", poster: "assets/video/chrome-lovers/chrome-lovers-01-poster.webp", w: 1280, h: 720, title: "Videoclip animado · Bogotá", dur: "2:28" },
          { kind: "video", span: "vert", src: "assets/video/chrome-lovers/chrome-lovers-02.mp4", poster: "assets/video/chrome-lovers/chrome-lovers-02-poster.webp", w: 720, h: 1280, title: "Visualizer vertical · portada del álbum", dur: "2:59" },
          { kind: "image", span: "vert", src: IMG + "chrome-lovers/hoverbikes.webp", w: 864, h: 1536, title: "Su y J · key visual hover-bikes" },
          { kind: "note", span: "vert", title: "Un universo en 9:16", text: "Cada pieza vertical está pensada para Reels: los mismos personajes, vestuario y fucsia de marca, adaptados al celular." },
          { kind: "video", span: "full", src: "assets/video/chrome-lovers/chrome-lovers-03.mp4", poster: "assets/video/chrome-lovers/chrome-lovers-03-poster.webp", w: 1280, h: 720, title: "Live session · la bodega", dur: "2:06" },
          { kind: "video", span: "half", src: "assets/video/chrome-lovers/chrome-lovers-04.mp4", poster: "assets/video/chrome-lovers/chrome-lovers-04-poster.webp", w: 1280, h: 720, title: "Pieza animada · el viaje", dur: "1:09" },
          { kind: "video", span: "half", src: "assets/video/chrome-lovers/chrome-lovers-05.mp4", poster: "assets/video/chrome-lovers/chrome-lovers-05-poster.webp", w: 1280, h: 720, title: "Pieza animada · motos", dur: "1:29" }
        ] },

      { type: "social", label: "INSTAGRAM",
        title: "Síguelo en Instagram.",
        profile: { platform: "Instagram", handle: "@chrxme_lovers", url: "https://www.instagram.com/chrxme_lovers/" },
        items: [] },

      { type: "text", label: "THE PROJECT", title: "Un universo, no solo una canción.",
        body: "Chrome Lovers es un proyecto musical y audiovisual experimental que conecta rap, rock, electrónica, narrativa visual e inteligencia artificial. La música se acompaña de un mundo propio: personajes, ciudad, objetos y una estética coherente en cada pieza." },

      { type: "duo", band: "pink", label: "PERSONAJES",
        title: "Su y J.",
        body: "Dos protagonistas con personalidades opuestas y complementarias, diseñados como para una serie: retrato, vistas, vestuario y actitud.",
        cast: [
          { name: "SU", role: "Intuición · Control · Evolución", src: IMG + "chrome-lovers/su.webp", alt: "Su: retrato y vistas del personaje" },
          { name: "J", role: "Estrategia · Velocidad · Libertad", src: IMG + "chrome-lovers/j.webp", alt: "J: retrato y vistas del personaje" }
        ] },

      { type: "manifesto", band: "black", label: "MANIFIESTO",
        words: ["PLAY", "EXPLORA", "CONECTA", "DOMINA"],
        body: "Bogotá, más que un juego: es nuestra ciudad." },

      { type: "figures", label: "UNIVERSO CREATIVO",
        title: "Bogotá cyberpunk.",
        body: "La ciudad funciona como un personaje más: calles reconocibles leídas con la estética del anime de los 90, neón, grafiti y cultura skater.",
        items: [
          { src: IMG + "chrome-lovers/chrome-lovers-bogota-cyberpunk.webp", alt: "Key visual: Chrome Lovers en una Bogotá cyberpunk", w: 1312, h: 1199, span: "full" }
        ] },

      { type: "figures", label: "HOJAS DE PERSONAJE",
        title: "Expresiones, vistas y detalles.",
        body: "Actas visuales en estilo anime retro: expresiones, rotaciones, accesorios y paleta para que los personajes se reconozcan en cualquier portada o escena.",
        items: [
          { src: IMG + "chrome-lovers/acta-visual-chrome-lovers-anime-skater.webp", alt: "Acta visual de personajes: Su y J", w: 1199, h: 1312, span: "half" },
          { src: IMG + "chrome-lovers/hoja-de-personajes-chrome-lovers-retro-anime.webp", alt: "Hoja de personajes retro anime", w: 1199, h: 1312, span: "half" }
        ] },

      { type: "split", label: "DIRECCIÓN DE ARTE",
        title: "Vestuario, objetos y calle.",
        body: "La hoja de diseño urbana fija el sistema: prendas, accesorios, tipografía de marca y referencias de color que luego se repiten en portadas y videoclips.",
        chips: ["Negro", "Fucsia neón", "Grafiti", "Streetwear", "Skate"],
        image: { src: IMG + "chrome-lovers/hoja-de-diseno-urbana-chrome-lovers.webp", alt: "Hoja de diseño urbana de Chrome Lovers", w: 1024, h: 1536 } },

      { type: "text", label: "CREATIVE TECHNOLOGY", title: "IA como herramienta, criterio como dirección.",
        body: "La inteligencia artificial generativa se usa para explorar personajes, escenarios y variaciones visuales. La dirección de arte define el universo, selecciona y corrige cada resultado para mantener la coherencia del proyecto.",
        chips: ["Dirección de arte", "Diseño de personajes", "Worldbuilding", "IA generativa"] }
    ],
    links: [{ label: "Instagram @chrxme_lovers", url: "https://www.instagram.com/chrxme_lovers/", sub: "Instagram" }]
  },

  /* ---------------------------------------------------------------- 03 */
  {
    number: "05",
    id: "credito-inteligente",
    kind: "project",
    layout: "story",
    published: true,
    title: "MI CRÉDITO INTELIGENTE",
    category: "FINTECH / PRODUCTO DIGITAL",
    year: "2026",
    color: "#08275B",
    ink: "#FFFFFF",
    accent: "#7C4DDE",
    paper: "#F7F6FB",
    theme: "light",
    tags: ["FinTech", "Producto digital", "Branding", "Educación financiera"],
    short: "Plataforma para comparar y simular créditos antes de decidir, con MICI como guía. No otorga préstamos.",
    card: { template: "frame", src: IMG + "credito-inteligente/card-mici.webp", hero: IMG + "credito-inteligente/marca/avatar-mici.webp", fit: "cover", heroFit: "contain", bg: "#F9F8F6", heroBg: "#F7F6F4", heroPos: "50% 50%", heroPad: "7% 6% 24% 46%", heroInk: "#08275B", ar: "16 / 9", flyFromCard: true },
    lead: "Crédito claro. Decisiones inteligentes.",
    facts: [
      ["AÑO", "2026"],
      ["TIPO", "Proyecto propio"],
      ["INDUSTRIA", "FinTech · Educación financiera"],
      ["MI ROL", "Creador · Producto · UX · Marca"]
    ],
    story: [
      { type: "web", direct: true, label: "PLATAFORMA EN VIVO",
        title: "Pruébala aquí mismo.",
        body: "La plataforma está publicada. Navégala dentro del portafolio o ábrela en una pestaña nueva.",
        url: "https://creditointeligente.finance/",
        domain: "creditointeligente.finance",
        preview: IMG + "credito-inteligente/campana/banner-finanzas-faciles.webp" },

      { type: "text", label: "THE CHALLENGE", title: "¿En qué banco te prestan mejor?",
        body: "Pedir un crédito en Colombia obliga a comparar tasas efectivas anuales, cuotas, plazos y requisitos que cada entidad presenta a su manera. La mayoría de las personas decide con poca información y termina pagando más de lo necesario." },

      { type: "cards", label: "ESTRATEGIA DE MARCA",
        title: "Acompañar antes de vender.",
        body: "La estrategia parte de un principio simple: primero entender, luego decidir. Mi Crédito Inteligente no presta dinero; orienta.",
        colors: [["#31C48D", "#08275B"], ["#FFFFFF", "#08275B"], ["#7C4DDE", "#FFFFFF"]],
        cards: [
          ["Propósito", "Acercar el crédito de forma comprensible, responsable y segura, para que cada decisión abra una oportunidad real."],
          ["Personalidad", "Confiable, cercana, clara, ágil y optimista. Habla con seguridad, sin tecnicismos innecesarios."],
          ["Promesa", "Orientación transparente y acompañamiento inteligente durante todo el camino financiero."]
        ] },

      { type: "steps", band: "lilac", label: "PRODUCTO",
        title: "Compara. Simula. Decide.",
        body: "El producto se organiza en cuatro acciones que el usuario reconoce desde la primera pantalla.",
        steps: [
          ["Simula", "Calcula la cuota estimada según monto, plazo y tasa."],
          ["Compara", "Ve tasas de referencia de distintas entidades en un solo lugar."],
          ["Aprende", "Entiende conceptos como tasa E.A., cuota y plazo, sin tecnicismos."],
          ["Decide", "Elige con información, antes de acercarte a una entidad."]
        ] },

      { type: "cards", label: "UX · DECISIONES DE DISEÑO",
        title: "Diseñado para generar confianza.",
        body: "Las decisiones de experiencia que se repiten en el producto y en cada pieza de comunicación.",
        colors: [["#FFFFFF", "#08275B"], ["#2563EB", "#FFFFFF"], ["#FFFFFF", "#08275B"]],
        cards: [
          ["Información primero", "“Tu mejor crédito empieza con información”: el mensaje central no es vender, es explicar."],
          ["Tres datos clave", "Tasa, cuota y plazo como tarjetas simples: lo que la persona necesita para comparar."],
          ["Tasas a la vista", "Las tasas E.A. aparecen comparadas lado a lado, no escondidas en la letra pequeña."],
          ["Un solo llamado", "Una acción principal y gratuita, “Compara gratis”, sin formularios largos de entrada."],
          ["Honestidad explícita", "“Simulación educativa. No garantiza aprobación.” El límite del producto se dice claro."],
          ["Un guía, no un banco", "MICI acompaña en onboarding, chatbot y educación: humaniza un tema que intimida."]
        ] },

      { type: "figures", label: "NAMING Y LOGOTIPO",
        title: "Diez rutas hasta MICI.",
        body: "La exploración probó escudo, crecimiento, banco, candado y monograma. El sistema final esconde un guiño: el color revela el acrónimo de la mascota dentro del nombre, MI + C + I = MICI.",
        items: [
          { src: IMG + "credito-inteligente/marca/conceptos-logo.webp", alt: "Exploración de 10 conceptos de logo", w: 1536, h: 1024, span: "half" },
          { src: IMG + "credito-inteligente/marca/avatar-mici.webp", alt: "Logo final con la mascota MICI", w: 1254, h: 1254, span: "half" },
          { src: IMG + "credito-inteligente/marca/logo-horizontal.webp", alt: "Firma horizontal: Compara. Simula. Decide.", w: 1800, h: 608, span: "full" }
        ] },

      { type: "split", label: "MASCOTA",
        title: "MICI, el crédito que te acompaña.",
        body: "Un guardián cercano que convierte el crédito en un personaje fácil de recordar: billete verde por el crecimiento, $ COP y franja por el contexto colombiano, capa protectora por el respaldo y movimiento por el progreso.",
        chips: ["Chatbot", "Educación financiera", "Redes", "Campañas", "Onboarding"],
        image: { src: IMG + "credito-inteligente/campana/carrusel-3.webp", alt: "MICI con el botón Compara gratis", w: 1254, h: 1254 } },

      { type: "identity", label: "SISTEMA VISUAL",
        title: "Color y tipografía.",
        body: "Verde para el progreso, azul para la confianza, morado para la inteligencia y azul marino para el respaldo. Tipografía sans serif humanista y redondeada, con pesos semibold para títulos y regular para explicar.",
        image: { src: IMG + "credito-inteligente/marca/firma-compara-simula-decide.webp", alt: "Firma de marca: Compara. Simula. Decide.", w: 1800, h: 600, contain: true },
        palette: [["Verde progreso", "#31C48D"], ["Azul confianza", "#2563EB"], ["Morado inteligencia", "#7C4DDE"], ["Azul marino", "#08275B"]] },

      { type: "deck", band: "black", label: "MANUAL DE IDENTIDAD",
        title: "Las reglas, en seis páginas.",
        body: "Estrategia, logotipo y acrónimo, mascota, sistema visual y reglas esenciales de uso: tamaños mínimos, zona de seguridad y lo que nunca se debe hacer.",
        spec: "MANUAL DE IDENTIDAD VISUAL · V1.0 · 6 PÁGINAS",
        items: [
          { src: IMG + "credito-inteligente/manual/01.webp", alt: "Manual de identidad Mi Crédito Inteligente — página 1 de 6", w: 1600, h: 1132 },
          { src: IMG + "credito-inteligente/manual/02.webp", alt: "Manual de identidad Mi Crédito Inteligente — página 2 de 6", w: 1600, h: 1132 },
          { src: IMG + "credito-inteligente/manual/03.webp", alt: "Manual de identidad Mi Crédito Inteligente — página 3 de 6", w: 1600, h: 1132 },
          { src: IMG + "credito-inteligente/manual/04.webp", alt: "Manual de identidad Mi Crédito Inteligente — página 4 de 6", w: 1600, h: 1132 },
          { src: IMG + "credito-inteligente/manual/05.webp", alt: "Manual de identidad Mi Crédito Inteligente — página 5 de 6", w: 1600, h: 1132 },
          { src: IMG + "credito-inteligente/manual/06.webp", alt: "Manual de identidad Mi Crédito Inteligente — página 6 de 6", w: 1600, h: 1132 }
        ] },

      { type: "formats", label: "CAMPAÑA",
        title: "Un carrusel que cuenta la promesa.",
        body: "Tres piezas para redes que llevan al usuario del problema a la acción: la pregunta, la herramienta y la invitación a comparar gratis.",
        groups: [
          { name: "Carrusel", spec: "1:1 · 3 piezas · Instagram y LinkedIn", cols: 3, items: [
            { src: IMG + "credito-inteligente/campana/carrusel-1.webp", alt: "1/3 · ¿En qué banco te prestan mejor?", w: 1254, h: 1254 },
            { src: IMG + "credito-inteligente/campana/carrusel-2.webp", alt: "2/3 · Compara. Simula. Decide.", w: 1254, h: 1254 },
            { src: IMG + "credito-inteligente/campana/carrusel-3.webp", alt: "3/3 · Tu mejor crédito empieza con información", w: 1254, h: 1254 }
          ] },
          { name: "Banner", spec: "16:9 · web y presentaciones", cols: 1, items: [
            { src: IMG + "credito-inteligente/campana/banner-finanzas-faciles.webp", alt: "Banner: finanzas más fáciles para todos", w: 1677, h: 938 }
          ] }
        ] },

      { type: "text", label: "MI APORTE", title: "De la idea al producto publicado.",
        body: "Definí el problema y la propuesta de valor, diseñé la experiencia y la arquitectura del producto, creé la marca y la mascota, y produje las piezas de campaña.",
        chips: ["Estrategia de producto", "UX / UI", "Desarrollo web", "Naming", "Identidad visual", "Mascota", "Campaña"] }
    ],
    links: [{ label: "creditointeligente.finance", url: "https://creditointeligente.finance", sub: "Sitio web" }]
  },

  /* ---------------------------------------------------------------- 04 */
  {
    number: "06",
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
    published: false, // oculto a pedido de Jhon,
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
    number: "07",
    id: "tu-crm-seguro",
    kind: "project",
    layout: "story",
    published: true,
    title: "TU CRM SEGURO",
    category: "INSURTECH / SAAS",
    year: "2026",
    color: "#002D1D",
    ink: "#FFFFFF",
    accent: "#1A8A2E",
    paper: "#F3F6F3",
    theme: "light",
    tags: ["InsurTech", "Producto digital", "Branding"],
    short: "CRM para intermediarios de seguros: clientes, pólizas, renovaciones, cartera y avisos del día listos para enviar.",
    card: { template: "frame", src: IMG + "tu-crm-seguro/card-logo.webp", hero: IMG + "tu-crm-seguro/escritorio/landing.webp", fit: "cover", heroFit: "cover", bg: "#FFFFFF", heroBg: "#002D1D", heroPos: "50% 0%", heroInk: "#002D1D", ar: "16 / 10", flyFromCard: true },
    lead: "Cada póliza a tiempo. Cada cliente atendido.",
    facts: [
      ["AÑO", "2026"],
      ["TIPO", "Prototipo funcional"],
      ["INDUSTRIA", "Seguros · Intermediación"],
      ["MI ROL", "Estrategia de producto · UX · Desarrollo"]
    ],
    story: [
      { type: "web", direct: true, label: "PLATAFORMA EN VIVO",
        title: "Pruébalo aquí mismo.",
        body: "La plataforma está publicada y funciona en el navegador. Entra, registra un asesor y usa “Herramientas → Cargar ejemplos” para ver una agencia ficticia con datos.",
        url: "https://jhonvalencia86.github.io/seguros/",
        domain: "jhonvalencia86.github.io/seguros",
        preview: IMG + "tu-crm-seguro/escritorio/landing.webp" },

      { type: "video", band: "black", label: "CÓMO FUNCIONA · 10 SEGUNDOS",
        title: "El día de un asesor, en diez segundos.",
        src: "assets/video/tucrm-como-funciona.mp4",
        poster: "assets/video/tucrm-como-funciona-poster.webp",
        w: 1280, h: 720 },

      { type: "text", label: "THE CHALLENGE", title: "Vender seguros es no dejar vencer nada.",
        body: "Un intermediario vive de renovaciones, pagos y seguimiento. Cuando la información está en hojas de cálculo y chats, se escapan vencimientos, primas en mora y siniestros sin gestión, y el cliente lo nota." },

      { type: "cards", label: "PROPUESTA DE VALOR", colors: [["#3DBB3F", "#002D1D"], ["#FFFFFF", "#002D1D"], ["#002D1D", "#FFFFFF"]],
        title: "Todo lo que el asesor necesita hoy, en una pantalla.",
        body: "Una sola página, sin instalación, que se puede instalar como app y sigue funcionando sin internet.",
        cards: [
          ["Hoy", "Pólizas vencidas, primas en mora, renovaciones a 30 días y siniestros sin gestión."],
          ["Tablero", "Prima por ramo y aseguradora, cartera, embudo y siniestralidad. Tocar una barra filtra todo."],
          ["Automatizaciones", "Avisos por fecha: renovación, pago, bienvenida, cumpleaños. Nadie recibe el mismo aviso dos veces."],
          ["Campañas", "Envíos por WhatsApp, SMS o correo, con aprobación uno a uno por defecto."],
          ["Trazabilidad", "Quién cambió qué y cuándo, con el valor anterior y el nuevo."],
          ["Datos propios", "Importa y exporta CSV y Excel, y guarda copia en Google Sheets."]
        ] },

      { type: "formats", label: "INTERFACES",
        title: "Escritorio y celular.",
        body: "Capturas tomadas de la plataforma con los datos de ejemplo de una agencia ficticia: ningún dato corresponde a clientes reales.",
        groups: [
          { name: "Escritorio", spec: "16:10 — operación diaria del asesor", cols: 2, items: [
            { src: IMG + "tu-crm-seguro/escritorio/hoy.webp", alt: "Hoy: prima vigente, salud de la cartera y pendientes del día", w: 1800, h: 1125 },
            { src: IMG + "tu-crm-seguro/escritorio/tablero.webp", alt: "Tablero: indicadores y “fábrica de seguros” interactiva", w: 1800, h: 1125 },
            { src: IMG + "tu-crm-seguro/escritorio/clientes.webp", alt: "Clientes con etapa, asesor y próxima renovación", w: 1800, h: 1125 },
            { src: IMG + "tu-crm-seguro/escritorio/polizas.webp", alt: "Pólizas con vigencia, prima y estado de cartera", w: 1800, h: 1125 },
            { src: IMG + "tu-crm-seguro/escritorio/siniestros.webp", alt: "Siniestros con estado y días sin gestión", w: 1800, h: 1125 },
            { src: IMG + "tu-crm-seguro/escritorio/pipeline.webp", alt: "Pipeline comercial por etapas", w: 1800, h: 1125 },
            { src: IMG + "tu-crm-seguro/escritorio/trazabilidad.webp", alt: "Trazabilidad: quién cambió qué y cuándo", w: 1800, h: 1125 },
            { src: IMG + "tu-crm-seguro/escritorio/campanas.webp", alt: "Campañas: automatizaciones por fecha y envíos masivos", w: 1800, h: 1125 }
          ] },
          { name: "Celular", spec: "Navegación inferior · instalable como app", cols: 3, items: [
            { src: IMG + "tu-crm-seguro/movil/hoy.webp", alt: "Hoy en el celular", w: 780, h: 1688 },
            { src: IMG + "tu-crm-seguro/movil/tablero.webp", alt: "Tablero en el celular", w: 780, h: 1688 },
            { src: IMG + "tu-crm-seguro/movil/clientes.webp", alt: "Clientes en el celular", w: 780, h: 1688 },
            { src: IMG + "tu-crm-seguro/movil/polizas.webp", alt: "Pólizas en el celular", w: 780, h: 1688 }
          ] }
        ] },

      { type: "identity", label: "IDENTIDAD VISUAL",
        title: "Protección y conexión, a un clic.",
        body: "El isotipo une un escudo de protección con dos personas conectadas dentro de la “C” de CRM. Verdes de confianza, tipografía redonda y directa, y la promesa “relacionamiento de verdad con tu cliente, a un clic”.",
        image: { src: IMG + "tu-crm-seguro/marca/logo-tucrm-full.webp", alt: "Logo TuCRM Seguro", w: 1100, h: 270, contain: true },
        palette: [["Verde noche", "#002D1D"], ["Verde", "#1A8A2E"], ["Verde claro", "#3DBB3F"], ["Blanco", "#FFFFFF"]] },

      { type: "figures", label: "EXPLORACIÓN DE MARCA",
        title: "Diez rutas para una marca.",
        body: "Exploración de diez propuestas de logo y aplicaciones en banners hasta llegar al sistema final.",
        items: [
          { src: IMG + "tu-crm-seguro/propuestas-de-logo-para-tu-crm-seguro.webp", alt: "Exploración de 10 propuestas de logo", w: 1199, h: 1312, span: "tall" },
          { src: IMG + "tu-crm-seguro/logo-tucrm-seguro-proteccion-y-conexion.webp", alt: "Logo: protección y conexión", w: 1800, h: 600, span: "full" },
          { src: IMG + "tu-crm-seguro/tucrm-seguro-relacionamiento-de-verdad.webp", alt: "Banner: relacionamiento de verdad", w: 1800, h: 600, span: "full" },
          { src: IMG + "tu-crm-seguro/banner-de-tucrm-seguro-con-boton-a-un-click.webp", alt: "Banner con botón a un clic", w: 1800, h: 600, span: "full" }
        ] },

      { type: "text", label: "CREATIVE TECHNOLOGY", title: "Diseñado y desarrollado de punta a punta.",
        body: "Estrategia de producto, UX e ingeniería full-stack con un flujo de trabajo aumentado con IA. Es una sola página sin dependencias, con datos guardados en el navegador y un puente en Google Apps Script para envíos automáticos y copias en Google Sheets.",
        chips: ["Estrategia de producto", "UX / UI", "Desarrollo web", "PWA sin conexión", "Google Apps Script", "Identidad visual"] }
    ],
    links: [
      { label: "Ver la plataforma", url: "https://jhonvalencia86.github.io/seguros/", sub: "En vivo" },
      { label: "Código en GitHub", url: "https://github.com/jhonvalencia86/seguros", sub: "Repositorio" }
    ]
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
    tags: ["Diseño gráfico", "Publicidad"],
    short: "Mi archivo de diseño gráfico y publicidad en Behance: campañas, piezas y proyectos de más de quince años.",
    title: "BEHANCE",
    category: "DISEÑO GRÁFICO",
    year: "2009—2026",
    color: "#0057FF",
    ink: "#FFFFFF",
    accent: "#9DBBFF",
    theme: "dark",
    card: { template: "type" },
    lead: "Más de quince años de diseño gráfico y publicidad.",
    context:
      "Campañas, piezas publicitarias, identidad y diseño editorial de mi trayectoria en agencias y proyectos propios. El archivo completo vive en Behance.",
    /* Proyectos de Behance incrustados con el visor oficial.
       Para agregar uno, copia el número que aparece en su enlace:
       behance.net/gallery/123456789/Nombre-del-proyecto  →  id: "123456789"
       cover: portada del proyecto (las 4 primeras se muestran dentro de la carta). */
    behance: [
      { id: "115326631", title: "Brand The Pork House", cover: "https://mir-s3-cdn-cf.behance.net/projects/404/2f3793115326631.604c0e52db4aa.jpg" },
      { id: "46415173", title: "Proyecto Paz / Los pacificultores", cover: "https://mir-s3-cdn-cf.behance.net/projects/404/ad8af646415173.Y3JvcCw5MDUsNzA4LDE2OSwxMjA.jpg" },
      { id: "46415349", title: "Posadas Navideñas", cover: "https://mir-s3-cdn-cf.behance.net/projects/404/43142f46415349.593787d401ccc.jpg" },
      { id: "38760051", title: "Proyecto Lanzamiento Web Santoto", cover: "https://mir-s3-cdn-cf.behance.net/projects/404/b3eb4b38760051.Y3JvcCw2NjcsNTIyLDEzMiww.png" },
      { id: "63506559", title: "Proyecto Vida Grupo Deudores Banco de Occidente", cover: "https://mir-s3-cdn-cf.behance.net/projects/404/4ad94363506559.Y3JvcCwxNDU3LDExNDAsNjMzLDczMw.jpg" },
      { id: "53969651", title: "Logo Robotrones (propuesta)", cover: "https://mir-s3-cdn-cf.behance.net/projects/404/f714f353969651.59494c4db0a9b.jpg" },
      { id: "53409263", title: "RA Intimate", cover: "https://mir-s3-cdn-cf.behance.net/projects/404/a08b4c53409263.5939da7a12749.jpg" },
      { id: "49263497", title: "Justicia Penal Militar", cover: "https://mir-s3-cdn-cf.behance.net/projects/404/96f0c349263497.Y3JvcCw1MjEsNDA3LDczLDIyMA.png" },
      { id: "49260579", title: "Proyecto Competencias Colegios", cover: "https://mir-s3-cdn-cf.behance.net/projects/404/a17edd49260579.Y3JvcCw1NzUsNDUwLDY5LDEwMA.png" },
      { id: "38395997", title: "Campaña Digital, Conéctate con la Santoto", cover: "https://mir-s3-cdn-cf.behance.net/projects/404/e2564c38395997.Y3JvcCw1NjAsNDM4LDEyNiwxMDY.jpg" },
      { id: "37603257", title: "Campaña Digital, Facebook Ads", cover: "https://mir-s3-cdn-cf.behance.net/projects/404/53d65437603257.Y3JvcCw5ODEsNzY3LDAsMA.jpg" },
      { id: "36090805", title: "Diseño web y social media", cover: "https://mir-s3-cdn-cf.behance.net/projects/404/6711b636090805.Y3JvcCwxMTU0LDkwMywyMDUsMA.jpg" }
    ],
    links: [{ label: "Ver archivo en Behance", url: "https://www.behance.net/jhxnvale" }]
  },

  /* ---------------------------------------------------------------- 09–11
     Human Experience (Colsubsidio), Bolívar Contigo Hogar e IMETEC
     no se publican hasta tener el material autorizado.               */
  { number: "09", id: "colsubsidio", title: "HUMAN EXPERIENCE", category: "ACADEMIC INNOVATION", published: false },
  { number: "11", id: "imetec", title: "IMETEC", category: "INNOVATION STRATEGY", published: false },

  /* ---------------------------------------------------------------- 12 */
  {
    number: "09",
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

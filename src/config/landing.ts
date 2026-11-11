/**
 * Contenido y datos configurables de la landing.
 * Todo texto, cifra o fecha visible en el Hero se edita aquí.
 */

export type AuthorityStat = {
  value: string;
  label: string;
};

export type CountryCode = {
  iso: string;
  name: string;
  dialCode: string;
};

export type LearningClass = {
  number: number;
  name: string;
  description: string;
  date: string;
  /** Portada original en /public, con sus dimensiones reales en píxeles. */
  cover: { src: string; width: number; height: number };
};

/**
 * Testimonio REAL de un alumno. Solo se publica con evidencia y autorización:
 * no se inventan nombres, frases ni resultados.
 */
export type Testimonial = {
  id: string;
  /** Texto literal del testimonio (sin alterar su significado). */
  quote: string;
  /** Nombre del alumno, solo si está autorizado. `null` = anónimo. */
  name: string | null;
  /** Dato opcional bajo el nombre (p. ej. "Alumno de Clever Chamba Academy"). */
  detail?: string;
  /** Fotografía o captura real del testimonio, en /public. */
  image?: { src: string; width: number; height: number; alt: string };
  /**
   * Estrellas mostradas (1–5). Es un recurso visual de presentación, NO una
   * calificación verificada. Por defecto 5; ajustar si se obtienen valoraciones reales.
   */
  stars?: number;
};

const MENTORING_PROGRAM = "Mentoring de la Riqueza Inmobiliaria";

export type FooterLink = {
  label: string;
  /** `null` = la página aún no existe: el enlace no se muestra (no hay enlaces rotos). */
  href: string | null;
};

export const landingConfig = {
  program: {
    name: "El Mapa de la Riqueza Inmobiliaria",
    eyebrow: "Entrenamiento gratuito en vivo",
  },

  hero: {
    headline:
      "No necesitas ser millonario para empezar en bienes raíces.",
    headlineAccent: "Necesitas una estrategia.",
    subheadline:
      "En tres clases gratuitas en vivo te voy a enseñar a preparar tu capital, detectar oportunidades y construir patrimonio en bienes raíces, incluso con poco dinero.",
  },

  expert: {
    name: "Clever Chamba",
    role: "CEO de Clever Chamba Academy y Clever Chamba Capital.",
    /** Ruta en /public. Poner en `null` para mostrar el espacio provisional. */
    photo: {
      src: "/images/clever-chamba.png",
      width: 800,
      height: 1192,
      alt: "Clever Chamba, CEO de Clever Chamba Academy y Clever Chamba Capital",
    } as { src: string; width: number; height: number; alt: string } | null,
    stats: [
      { value: "28", label: "años de experiencia" },
      { value: "+$3M", label: "en activos inmobiliarios" },
      { value: "+1.500", label: "alumnos formados" },
    ] satisfies AuthorityStat[],
  },

  form: {
    /** Identificador HTML estable del formulario (destino de los CTA de la página). */
    anchorId: "registro",
    title: "Reserva tu acceso gratuito",
    description: "Completa tus datos para participar en las tres clases en vivo.",
    submitLabel: "Quiero registrarme gratis",
    defaultCountryIso: "EC",
    countries: [
      { iso: "EC", name: "Ecuador", dialCode: "+593" },
      { iso: "CO", name: "Colombia", dialCode: "+57" },
      { iso: "PE", name: "Perú", dialCode: "+51" },
      { iso: "MX", name: "México", dialCode: "+52" },
      { iso: "US", name: "Estados Unidos", dialCode: "+1" },
      { iso: "ES", name: "España", dialCode: "+34" },
      { iso: "AR", name: "Argentina", dialCode: "+54" },
      { iso: "CL", name: "Chile", dialCode: "+56" },
      { iso: "VE", name: "Venezuela", dialCode: "+58" },
      { iso: "BO", name: "Bolivia", dialCode: "+591" },
      { iso: "GT", name: "Guatemala", dialCode: "+502" },
      { iso: "CR", name: "Costa Rica", dialCode: "+506" },
      { iso: "PA", name: "Panamá", dialCode: "+507" },
      { iso: "DO", name: "Rep. Dominicana", dialCode: "+1" },
      { iso: "IT", name: "Italia", dialCode: "+39" },
    ] satisfies CountryCode[],
  },

  /**
   * Contador regresivo de la barra superior.
   * `target` es un instante absoluto (ISO 8601 con desfase explícito), por lo
   * que el resultado no depende de la zona horaria del navegador.
   * Ecuador (America/Guayaquil) usa UTC−05:00 todo el año, sin horario de verano.
   */
  countdown: {
    title: "El entrenamiento comienza en",
    endedMessage: "El entrenamiento ha comenzado",
    target: "2026-12-14T19:00:00-05:00",
    timeZone: "America/Guayaquil",
    labels: {
      days: "Días",
      hours: "Horas",
      minutes: "Minutos",
      seconds: "Segundos",
    },
  },

  /** Sección 2: ¿Qué aprenderás en las 3 clases gratuitas? */
  learning: {
    title: "¿Qué aprenderás en las 3 clases gratuitas?",
    subtitle:
      "Descubre los fundamentos del Método TRS y aprende a identificar nuevas oportunidades para comenzar a construir tu riqueza inmobiliaria.",
    ctaLabel: "Quiero registrarme gratis",
    classes: [
      {
        number: 1,
        name: "Mentalidad",
        description:
          "Desarrolla una nueva perspectiva sobre el dinero, las oportunidades y la construcción de patrimonio.",
        date: "14 de diciembre",
        cover: { src: "/wakeup/CLASE1DICIEMBRE.png", width: 1672, height: 941 },
      },
      {
        number: 2,
        name: "Riqueza",
        description:
          "Aprende a identificar oportunidades inmobiliarias y comprende cómo se construye riqueza a través de los activos.",
        date: "15 de diciembre",
        cover: { src: "/wakeup/CLASE 2 DICIEMBRE.png", width: 1672, height: 941 },
      },
      {
        number: 3,
        name: "Bienes raíces",
        description:
          "Descubre cómo funcionan las oportunidades en bienes raíces, como los remates judiciales y el alquiler de propiedades en Airbnb.",
        date: "16 de diciembre",
        cover: { src: "/wakeup/CLASE 3 DICIEMBRE.png", width: 1672, height: 941 },
      },
    ] satisfies LearningClass[],
  },

  /** Sección 3: Conoce a tu instructor (autoridad). */
  authority: {
    /** Retrato de estudio original (PNG opaco, fondo gris claro). Ruta en /public. */
    photo: {
      src: "/cleverazul.png",
      width: 1024,
      height: 1536,
      alt: "Clever Chamba, CEO de Clever Chamba Academy y Clever Chamba Capital",
    },
    eyebrow: "Conoce a tu instructor",
    title: "Aprende de alguien que ha convertido la inversión inmobiliaria",
    titleAccent: "en su camino de construcción de patrimonio.",
    paragraphs: [
      "Clever Chamba es empresario, inversionista inmobiliario y CEO de Clever Chamba Academy y Clever Chamba Capital, empresa enfocada en inversiones inmobiliarias en Estados Unidos.",
      "A lo largo de su trayectoria ha desarrollado experiencia en el sector inmobiliario y comparte sus conocimientos con personas que desean aprender a identificar oportunidades y construir patrimonio mediante estrategias de inversión.",
    ],
    stats: [
      { value: "28 años", label: "De experiencia" },
      { value: "Más de $3 millones", label: "En activos inmobiliarios" },
      { value: "Más de 1.500", label: "Alumnos formados" },
    ] satisfies AuthorityStat[],
    closing: {
      title: "Tu próximo paso comienza con una decisión.",
      text: "Regístrate gratis y participa en las tres clases en vivo de El Mapa de la Riqueza Inmobiliaria.",
      ctaLabel: "Quiero registrarme gratis",
    },
  },

  /** Sección 4: Testimonios. */
  testimonials: {
    title: "Historias reales. Experiencias que inspiran.",
    subtitle:
      "Conoce las experiencias de personas que han decidido aprender, desarrollar nuevas habilidades y dar pasos hacia sus objetivos financieros e inmobiliarios.",
    /**
     * Primera fila: testimonios escritos reales de alumnos del Mentoring.
     * Solo se corrigieron ortografía y puntuación; no se añadieron resultados ni cifras.
     */
    items: [
      {
        id: "antonio-padilla",
        name: "Antonio Padilla",
        detail: MENTORING_PROGRAM,
        quote:
          "Es increíble todo el conocimiento que he adquirido gracias a Clever. Hoy tengo 5 Airbnbs funcionando y ya estoy en proceso de abrir más. ¡Gracias por compartir tu conocimiento y guiarnos hacia la libertad!",
      },
      {
        id: "fanny-ruiz",
        name: "Fanny Ruiz",
        detail: MENTORING_PROGRAM,
        quote:
          "Clever me salvó la vida. Estaba a punto de colapsar, pero la inversión en su mentoría fue la mejor decisión que pude tomar en mi vida. Gracias, mentor.",
      },
      {
        id: "juan-uribe",
        name: "Juan Uribe",
        detail: MENTORING_PROGRAM,
        quote:
          "La mentoría me permitió crear mi propio Airbnb y hoy genera más de $3.000 mensuales. Comprobé que el método funciona al 100%. ¡Gracias, Clever Chamba!",
      },
      {
        id: "sebastian-mendieta",
        name: "Sebastián Mendieta",
        detail: MENTORING_PROGRAM,
        quote:
          "Gracias a Clever y a sus clases pude realizar mi primera inversión en familia. Nos asociamos y compramos departamentos en la ciudad de Quito. Actualmente estamos por comprar más propiedades en Cuenca.",
      },
      {
        id: "carmen-caicedo",
        name: "Carmen Caicedo",
        detail: MENTORING_PROGRAM,
        quote:
          "Yo no tenía conocimientos de educación financiera, pero gracias a su entrenamiento ahora estoy capacitando a diferentes entidades bancarias sobre la importancia de las finanzas. ¡Gracias, Clever! Dios te bendiga.",
      },
      {
        id: "vilma-pazmino",
        name: "Vilma Pazmiño",
        detail: MENTORING_PROGRAM,
        quote:
          "Clever, cambiaste mi vida y le diste un giro total. Gracias a tus consejos realicé mi primera inversión y obtuve una rentabilidad del 35%. Tu información es muy valiosa. ¡Gracias infinitas!",
      },
    ] as Testimonial[],
    /** Tarjetas "Testimonio pendiente" que se mostrarían solo si `items` quedara vacío. */
    pendingSlots: 6,
  },

  footer: {
    brand: "Clever Chamba Academy",
    tagline: "El Mapa de la Riqueza Inmobiliaria.",
    /**
     * PENDIENTE: no existe página de política de privacidad ni contenido legal confirmado.
     * Cuando exista, asignar su ruta real (p. ej. "/politica-de-privacidad") en `href`.
     */
    links: [{ label: "Política de privacidad", href: "/politica-de-privacidad" }] as FooterLink[],
    copyright: "© 2026 Clever Chamba Academy. Todos los derechos reservados.",
  },

  /**
   * Política de privacidad (/politica-de-privacidad) y aviso bajo el botón del formulario.
   * PENDIENTE: completar los datos del responsable. Mientras un campo sea `null`,
   * la frase correspondiente no se muestra (no se publican datos inventados).
   */
  privacy: {
    href: "/politica-de-privacidad",
    lastUpdated: "11 de noviembre de 2026",
    controller: {
      /** Nombre comercial con el que se presenta el responsable. */
      brand: "Clever Chamba Academy",
      /** Razón social registrada (si difiere del nombre comercial). */
      legalName: null as string | null,
      /** RUC u otro identificador fiscal. */
      taxId: null as string | null,
      /** Domicilio legal. */
      address: null as string | null,
      /** Correo para ejercer derechos sobre los datos. MUY RECOMENDADO completarlo. */
      contactEmail: "cleverchambaolmedo5@gmail.com" as string | null,
    },
    formNotice: {
      before: "Al registrarte aceptas nuestra",
      linkLabel: "Política de privacidad",
      after: "y recibir información del entrenamiento por WhatsApp y correo electrónico.",
    },
  },

  schedule: {
    dates: "14, 15 y 16 de diciembre de 2026",
    time: "19:00 · Hora de Ecuador",
    format: "3 clases gratuitas en vivo",
  },

  /** Popup con el formulario de registro al entrar en la landing. */
  popup: {
    enabled: true,
    /** Milisegundos tras la carga antes de mostrarlo. */
    delayMs: 2000,
    eyebrow: "Gratis · 14, 15 y 16 de diciembre · En vivo",
  },

  /**
   * Captación de registros: el formulario envía a la Route Handler propia
   * (`src/app/api/leads/route.ts`), que guarda cada registro en Google Sheets.
   * Configuración: `integrations/google-sheets/README.md`.
   * `null` desactiva el envío (el formulario solo valida).
   */
  leadCapture: {
    endpoint: "/api/leads" as string | null,
    successTitle: "¡Registro completado!",
    successMessage: "Tu lugar en las tres clases gratuitas en vivo está reservado.",
    /**
     * Enlace de la comunidad (grupo/comunidad de WhatsApp, Telegram…).
     * Tras guardar el registro, se redirige ahí en la misma pestaña.
     * PENDIENTE: pegar el enlace real. `null` = sin redirección (solo mensaje de éxito).
     */
    communityUrl: "https://go.wha.link/aQgz0d" as string | null,
    redirectingMessage: "Te estamos llevando a la comunidad…",
    communityLinkLabel: "Unirme a la comunidad",
  },
} as const;

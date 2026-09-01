import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "es";

export const TEAM_EMAILS = [
  { name: "Esteban Baltodano", email: "estebanbaltodano@4ctiva.com" },
  { name: "Ignacio Cañas", email: "ignaciocanas@4ctiva.com" },
  { name: "Andrés Quirós", email: "andresquiros@4ctiva.com" },
];

export const PRIMARY_EMAIL = "estebanbaltodano@4ctiva.com";

export const LAUNCH_ZONES = ["San José", "Escazú", "Santa Ana", "Heredia", "Curridabat", "Cartago"];

type Translation = typeof translations.en;

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      memberships: "Memberships",
      contact: "Contact",
      cta: "Join the Pilot",
      menu: "Menu",
    },
    hero: {
      eyebrow: "Costa Rica · Wellness Without Borders",
      titleTop: "One membership.",
      titleEm: "Many ways to move.",
      subtitle:
        "Activa connects people and companies with gyms, studios and wellness services in Costa Rica through one flexible membership.",
      ctaCompany: "I'm a company",
      ctaGym: "I'm a gym or studio",
      ctaUser: "I want to join the pilot",
      proofText: "Companies that invest in wellness see up to +10% productivity and −69% turnover intent.",
      proofLink: "See the evidence",
    },
    what: {
      label: "What is Activa",
      titleTop: "A wellness platform",
      titleEm: "for three audiences.",
      intro:
        "Activa is a wellness platform that lets users access a curated network of gyms, studios and wellness services with a single membership.",
      cards: [
        {
          lead: "For companies,",
          body: "Activa works as a flexible corporate benefit that improves culture, wellbeing and talent retention.",
        },
        {
          lead: "For gyms and studios,",
          body: "Activa works as an additional channel to receive new, quality verified users.",
        },
        {
          lead: "For users,",
          body: "Activa removes the need to pay for multiple memberships to access a variety of spaces and disciplines.",
        },
      ],
      whyLabel: "Why Activa exists",
      whyTitleTop: "Wellness shouldn't",
      whyTitleEm: "have just one shape.",
      whyP1:
        "Many people want to move more, but don't always want to commit to a single gym. Some work in different areas, have changing schedules or look for variety: gym, yoga, pilates, boxing, functional training, recovery and wellness.",
      whyP2: "Activa exists to make wellness more flexible, accessible and easy to use.",
    },
    how: {
      label: "How It Works",
      title: "Simple for everyone.",
      tabs: { users: "Users", companies: "Companies", gyms: "Gyms / Studios" },
      steps: {
        users: [
          { step: "01", title: "Choose your Activa plan.", body: "Pick the membership that best fits your lifestyle and wellness goals." },
          { step: "02", title: "Book or visit partner spaces.", body: "Explore the network of gyms, studios and wellness centers available in your area." },
          { step: "03", title: "Check in and enjoy.", body: "Show your digital membership and access your workout or service hassle-free." },
        ],
        companies: [
          { step: "01", title: "Activa designs your benefit.", body: "We work with you to create a wellness plan tailored to your team's size and needs." },
          { step: "02", title: "Your team gets access.", body: "Your team can visit partner gyms, studios and services with a single membership." },
          { step: "03", title: "A frictionless solution.", body: "The company gets a flexible solution without managing multiple agreements or individual contracts." },
        ],
        gyms: [
          { step: "01", title: "You join as a pilot partner.", body: "You define your terms: available hours, capacity, user type and access rules." },
          { step: "02", title: "We set the rules together.", body: "We establish hours, capacity, bookings and payment structure based on what works for your space." },
          { step: "03", title: "You receive verified users.", body: "You get paid for verified visits or under the agreed structure, without losing control of your community." },
        ],
      },
    },
    evidence: {
      label: "The Evidence",
      titleTop: "Wellness isn't an expense.",
      titleEm: "It's a measurable investment.",
      intro:
        "Peer-reviewed research and Gallup data show clear returns for companies that invest in their team's wellbeing.",
      stats: [
        {
          n: "+10%",
          d: "productivity among employees who improved their health through a corporate wellness program.",
          s: "Gubler, Larkin & Pierce (2018) · Management Science",
        },
        {
          n: "$3.27",
          d: "saved in medical costs for every $1 invested in wellness — plus $2.73 more from lower absenteeism.",
          s: "Baicker, Cutler & Song (2010) · Health Affairs",
        },
        {
          n: "−69%",
          d: "likelihood of employees actively job hunting when they feel their company cares about their wellbeing.",
          s: "Harter (2022) · Gallup",
        },
      ],
      cta: "Bring Activa to your company",
      refsLabel: "Full references (APA)",
      refs: [
        "Baicker, K., Cutler, D., & Song, Z. (2010). Workplace wellness programs can generate savings. Health Affairs, 29(2), 304–311. https://doi.org/10.1377/hlthaff.2009.0626",
        "Gubler, T., Larkin, I., & Pierce, L. (2018). Doing well by making well: The impact of corporate wellness programs on employee productivity. Management Science, 64(11), 4967–4987. https://doi.org/10.1287/mnsc.2017.2883",
        "Harter, J. (2022, March 18). Percent who feel employer cares about their wellbeing plummets. Gallup. https://www.gallup.com/workplace/390776/percent-feel-employer-cares-wellbeing-plummets.aspx",
        "Parks, K. M., & Steelman, L. A. (2008). Organizational wellness programs: A meta-analysis. Journal of Occupational Health Psychology, 13(1), 58–68. https://doi.org/10.1037/1076-8998.13.1.58",
      ],
    },
    benefits: {
      label: "Benefits",
      titleTop: "Designed for everyone",
      titleEm: "in the wellness chain.",
      companies: {
        eyebrow: "For Companies",
        title: "Benefits for companies",
        desc: "Offer a modern, flexible wellness benefit that's easy to roll out.",
        bullets: [
          "A single solution for multiple wellness options.",
          "An attractive benefit for employees.",
          "Ideal for hybrid teams or those with offices in different areas.",
          "Improves culture, wellbeing and retention.",
          "No need to negotiate with each gym separately.",
        ],
        btn: "Request company information",
      },
      gyms: {
        eyebrow: "For Gyms and Studios",
        title: "Benefits for gyms and studios",
        desc: "Activa helps selected partners receive new users at no upfront cost.",
        bullets: [
          "New potential clients.",
          "Exposure to companies and verified users.",
          "Payment for verified visits.",
          "Control over schedules, capacity and access rules.",
          "The chance to convert Activa users into direct members.",
          "We're not here to replace your current memberships.",
        ],
        note: "Activa is not a discount platform. It's a controlled channel for acquisition and corporate wellness.",
        btn: "Join as a partner",
      },
      users: {
        eyebrow: "For Users",
        title: "Benefits for users",
        desc: "Move your way, in the space you want, without committing to a single option.",
        bullets: [
          "Access to different types of training.",
          "More flexibility in location and schedule.",
          "A single membership.",
          "Gym, yoga, pilates, functional, boxing, wellness and recovery options.",
          "Ideal for people who want variety without paying for multiple memberships.",
        ],
        btn: "I want to join",
      },
    },
    safety: {
      eyebrow: "Control and Safety",
      titleTop: "A curated network,",
      titleEm: "not uncontrolled access.",
      paragraph:
        "Each Activa partner can define their participation terms: available hours, capacity, bookings, visit limits and user type. Our goal is to protect each gym or studio's experience while generating new quality clients.",
      bullets: [
        "Verified users.",
        "Controlled check-in.",
        "Partner-specific rules.",
        "Advance bookings when needed.",
        "Usage limits per plan.",
        "Respect for each space's community.",
      ],
    },
    pilot: {
      label: "2026 Pilot",
      titleTop: "We're building our pilot",
      titleEm: "in Costa Rica.",
      p1: "We're currently selecting gyms, studios and companies to take part in Activa's first pilot in areas like San José, Escazú, Santa Ana, Heredia, Curridabat and Cartago.",
      p2: "If you're a company, gym, studio or interested user, you can sign up to receive more information.",
      btnCompany: "Join as a company",
      btnGym: "Join as a gym/studio",
      btnUser: "Join as a user",
      zonesLabel: "Launch zones",
      zonesNote:
        "We're in conversations with gyms, studios and wellness centers across the GAM to form the first Activa network. If your business isn't in these areas but you're interested, get in touch.",
    },
    categories: {
      label: "Partner Network",
      titleTop: "More than a gym.",
      titleEm: "An ecosystem.",
      intro: "Activa includes a variety of spaces and disciplines so everyone can find what they need.",
      items: ["Gyms", "Yoga", "Pilates", "Boxing", "Functional", "Recovery", "Massage", "Physiotherapy", "Wellness"],
    },
    faq: {
      label: "Frequently Asked Questions",
      titleTop: "Clear",
      titleEm: "answers.",
      items: [
        { q: "Is Activa available yet?", a: "We're preparing our first pilot in Costa Rica. You can sign up to receive information and take part when we open spots." },
        { q: "Is Activa only for gyms?", a: "No. Activa includes gyms, studios, classes, wellness, recovery and other wellbeing services." },
        { q: "Is it a discount platform?", a: "No. Activa doesn't aim to devalue its partners. We work with access rules, verified users and structures designed to keep the model sustainable for both sides." },
        { q: "How does it work for companies?", a: "Companies can offer Activa as a corporate benefit for their employees. Activa centralizes access to different wellness options without the company having to negotiate with each gym separately." },
        { q: "How does it work for gyms and studios?", a: "Partners can take part under agreed terms: schedules, capacity, bookings, usage limits and payment per verified visit or agreed structure." },
        { q: "Which areas will Activa start in?", a: "We're starting in areas like San José, Escazú, Santa Ana, Heredia, Curridabat and Cartago." },
      ],
    },
    contact: {
      label: "Contact",
      titleTop: "Join the",
      titleEm: "Activa pilot.",
      intro: "Fill out our quick form to sign up for the pilot, or email us directly. We'll get back to you within 48 hours.",
      ctaForm: "Open the form",
      ctaEmail: "Contact us directly",
      formTitle: "Contact Activa",
      location: "Costa Rica · GAM",
    },
    about: {
      label: "About Activa",
      titleTop: "Made in",
      titleEm: "Costa Rica.",
      p1: "Activa is being built by a Costa Rican team with the mission of making wellness more flexible, accessible and connected in Costa Rica.",
      p2: "We believe people shouldn't be limited to a single way of moving, and that local gyms and studios can grow by connecting with quality companies and users.",
      p3: "We're just getting started — and that's exactly when we want you to join.",
    },
    footer: {
      tagline: "One membership. Many ways to move. A wellness platform in Costa Rica.",
      legalLabel: "Legal",
      memberTerms: "Member Terms",
      partnerTerms: "Partner Staff Terms",
      privacyNotice: "Privacy Notice",
      photoConsent: "Photo Consent",
      navLabel: "Navigation",
      contactLabel: "Contact",
      location: "Costa Rica",
      rights: "© 2026 Activa. All rights reserved.",
    },
  },

  es: {
    nav: {
      home: "Inicio",
      about: "Nosotros",
      memberships: "Membresías",
      contact: "Contacto",
      cta: "Únete al Piloto",
      menu: "Menú",
    },
    hero: {
      eyebrow: "Costa Rica · Bienestar Sin Fronteras",
      titleTop: "Una membresía.",
      titleEm: "Muchas formas de moverse.",
      subtitle:
        "Activa conecta personas y empresas con gimnasios, studios y servicios wellness en Costa Rica a través de una membresía flexible.",
      ctaCompany: "Soy empresa",
      ctaGym: "Soy gimnasio o studio",
      ctaUser: "Quiero unirme al piloto",
      proofText: "Las empresas que invierten en bienestar ven hasta +10% de productividad y −69% en intención de rotación.",
      proofLink: "Ver la evidencia",
    },
    what: {
      label: "Qué es Activa",
      titleTop: "Una plataforma de bienestar",
      titleEm: "para tres audiencias.",
      intro:
        "Activa es una plataforma de bienestar que permite a los usuarios acceder a una red curada de gimnasios, studios y servicios wellness con una sola membresía.",
      cards: [
        {
          lead: "Para empresas,",
          body: "Activa funciona como un beneficio corporativo flexible que mejora cultura, bienestar y retención de talento.",
        },
        {
          lead: "Para gimnasios y studios,",
          body: "Activa funciona como un canal adicional para recibir nuevos usuarios verificados de calidad.",
        },
        {
          lead: "Para usuarios,",
          body: "Activa elimina la necesidad de pagar múltiples membresías para acceder a variedad de espacios y disciplinas.",
        },
      ],
      whyLabel: "Por qué existe Activa",
      whyTitleTop: "El bienestar no debería",
      whyTitleEm: "tener una sola forma.",
      whyP1:
        "Muchas personas quieren moverse más, pero no siempre quieren comprometerse con un solo gimnasio. Algunas trabajan en diferentes zonas, tienen horarios cambiantes o buscan variedad: gimnasio, yoga, pilates, boxeo, entrenamiento funcional, recuperación y wellness.",
      whyP2: "Activa nace para hacer el bienestar más flexible, accesible y fácil de usar.",
    },
    how: {
      label: "Cómo Funciona",
      title: "Simple para todos.",
      tabs: { users: "Usuarios", companies: "Empresas", gyms: "Gimnasios / Studios" },
      steps: {
        users: [
          { step: "01", title: "Elegí tu plan Activa.", body: "Seleccioná la membresía que mejor se adapta a tu estilo de vida y objetivos de bienestar." },
          { step: "02", title: "Reservá o visitá espacios aliados.", body: "Explorá la red de gimnasios, studios y centros wellness disponibles en tu zona." },
          { step: "03", title: "Hacé check-in y disfrutá.", body: "Presentá tu membresía digital y accedé a tu entrenamiento o servicio sin complicaciones." },
        ],
        companies: [
          { step: "01", title: "Activa diseña tu beneficio.", body: "Trabajamos con vos para crear un plan wellness adaptado al tamaño y necesidades de tu equipo." },
          { step: "02", title: "Tus colaboradores acceden.", body: "Tu equipo puede visitar gimnasios, studios y servicios aliados con una sola membresía." },
          { step: "03", title: "Solución sin fricción.", body: "La empresa recibe una solución flexible sin gestionar múltiples convenios ni contratos individuales." },
        ],
        gyms: [
          { step: "01", title: "Te unís como socio del piloto.", body: "Definís tus condiciones: horarios disponibles, cupos, tipo de usuario y reglas de acceso." },
          { step: "02", title: "Definimos las reglas juntos.", body: "Establecemos horarios, cupos, reservas y estructura de pagos según lo que funcione para tu espacio." },
          { step: "03", title: "Recibís usuarios verificados.", body: "Cobrás por visitas verificadas o bajo la estructura acordada, sin perder el control de tu comunidad." },
        ],
      },
    },
    evidence: {
      label: "La Evidencia",
      titleTop: "El bienestar no es un gasto.",
      titleEm: "Es una inversión medible.",
      intro:
        "Estudios revisados por pares e investigación de Gallup muestran retornos claros para las empresas que invierten en el bienestar de su equipo.",
      stats: [
        {
          n: "+10%",
          d: "de productividad entre colaboradores que mejoraron su salud con un programa de bienestar corporativo.",
          s: "Gubler, Larkin & Pierce (2018) · Management Science",
        },
        {
          n: "$3.27",
          d: "de ahorro en costos médicos por cada $1 invertido en bienestar — más $2.73 adicionales por menor ausentismo.",
          s: "Baicker, Cutler & Song (2010) · Health Affairs",
        },
        {
          n: "−69%",
          d: "de probabilidad de que un colaborador busque otro empleo cuando siente que su empresa cuida su bienestar.",
          s: "Harter (2022) · Gallup",
        },
      ],
      cta: "Llevá Activa a tu empresa",
      refsLabel: "Referencias completas (APA)",
      refs: [
        "Baicker, K., Cutler, D., & Song, Z. (2010). Workplace wellness programs can generate savings. Health Affairs, 29(2), 304–311. https://doi.org/10.1377/hlthaff.2009.0626",
        "Gubler, T., Larkin, I., & Pierce, L. (2018). Doing well by making well: The impact of corporate wellness programs on employee productivity. Management Science, 64(11), 4967–4987. https://doi.org/10.1287/mnsc.2017.2883",
        "Harter, J. (2022, March 18). Percent who feel employer cares about their wellbeing plummets. Gallup. https://www.gallup.com/workplace/390776/percent-feel-employer-cares-wellbeing-plummets.aspx",
        "Parks, K. M., & Steelman, L. A. (2008). Organizational wellness programs: A meta-analysis. Journal of Occupational Health Psychology, 13(1), 58–68. https://doi.org/10.1037/1076-8998.13.1.58",
      ],
    },
    benefits: {
      label: "Beneficios",
      titleTop: "Diseñado para todos",
      titleEm: "en la cadena del bienestar.",
      companies: {
        eyebrow: "Para Empresas",
        title: "Beneficios para empresas",
        desc: "Ofrecé un beneficio de bienestar moderno, flexible y fácil de implementar.",
        bullets: [
          "Una sola solución para múltiples opciones wellness.",
          "Beneficio atractivo para colaboradores.",
          "Ideal para equipos híbridos o con sedes en distintas zonas.",
          "Mejora cultura, bienestar y retención.",
          "Sin necesidad de negociar con cada gimnasio por separado.",
        ],
        btn: "Solicitar información para empresas",
      },
      gyms: {
        eyebrow: "Para Gimnasios y Studios",
        title: "Beneficios para gimnasios y studios",
        desc: "Activa ayuda a socios seleccionados a recibir nuevos usuarios sin costo inicial.",
        bullets: [
          "Nuevos clientes potenciales.",
          "Exposición a empresas y usuarios verificados.",
          "Pago por visitas verificadas.",
          "Control sobre horarios, cupos y reglas de acceso.",
          "Posibilidad de convertir usuarios Activa en miembros directos.",
          "No buscamos reemplazar tus membresías actuales.",
        ],
        note: "Activa no es una plataforma de descuentos. Es un canal controlado de adquisición y bienestar corporativo.",
        btn: "Unirme como socio",
      },
      users: {
        eyebrow: "Para Usuarios",
        title: "Beneficios para usuarios",
        desc: "Movete a tu manera, en el espacio que querás, sin comprometerte con una sola opción.",
        bullets: [
          "Acceso a diferentes tipos de entrenamiento.",
          "Más flexibilidad de ubicación y horario.",
          "Una sola membresía.",
          "Opciones de gimnasio, yoga, pilates, funcional, boxeo, wellness y recuperación.",
          "Ideal para personas que quieren variedad sin pagar múltiples membresías.",
        ],
        btn: "Quiero unirme",
      },
    },
    safety: {
      eyebrow: "Control y Seguridad",
      titleTop: "Una red curada,",
      titleEm: "no acceso sin control.",
      paragraph:
        "Cada socio de Activa puede definir sus condiciones de participación: horarios disponibles, cupos, reservas, límites de visitas y tipo de usuario. Nuestro objetivo es proteger la experiencia de cada gimnasio o studio mientras generamos nuevos clientes de calidad.",
      bullets: [
        "Usuarios verificados.",
        "Check-in controlado.",
        "Reglas específicas por socio.",
        "Reservas anticipadas cuando sea necesario.",
        "Límites de uso por plan.",
        "Respeto por la comunidad de cada espacio.",
      ],
    },
    pilot: {
      label: "Piloto 2026",
      titleTop: "Estamos construyendo nuestro piloto",
      titleEm: "en Costa Rica.",
      p1: "Actualmente estamos seleccionando gimnasios, studios y empresas para participar en el primer piloto de Activa en zonas como San José, Escazú, Santa Ana, Heredia, Curridabat y Cartago.",
      p2: "Si sos una empresa, gimnasio, studio o usuario interesado, podés registrarte para recibir más información.",
      btnCompany: "Participar como empresa",
      btnGym: "Participar como gimnasio/studio",
      btnUser: "Unirme como usuario",
      zonesLabel: "Zonas de lanzamiento",
      zonesNote:
        "Estamos conversando con gimnasios, studios y centros wellness en la GAM para formar la primera red Activa. Si tu negocio no está en estas zonas pero te interesa participar, contactanos.",
    },
    categories: {
      label: "Red de Socios",
      titleTop: "Más que un gimnasio.",
      titleEm: "Un ecosistema.",
      intro: "Activa incluye una variedad de espacios y disciplinas para que cada persona encuentre lo que necesita.",
      items: ["Gimnasios", "Yoga", "Pilates", "Boxeo", "Funcional", "Recovery", "Masajes", "Fisioterapia", "Wellness"],
    },
    faq: {
      label: "Preguntas Frecuentes",
      titleTop: "Respuestas",
      titleEm: "claras.",
      items: [
        { q: "¿Activa ya está disponible?", a: "Estamos preparando nuestro primer piloto en Costa Rica. Podés registrarte para recibir información y participar cuando abramos cupos." },
        { q: "¿Activa es solo para gimnasios?", a: "No. Activa incluye gimnasios, studios, clases, wellness, recovery y otros servicios de bienestar." },
        { q: "¿Es una plataforma de descuentos?", a: "No. Activa no busca devaluar a sus socios. Trabajamos con reglas de acceso, usuarios verificados y estructuras diseñadas para que el modelo sea sostenible para ambas partes." },
        { q: "¿Cómo funciona para empresas?", a: "Las empresas pueden ofrecer Activa como beneficio corporativo para sus colaboradores. Activa centraliza el acceso a diferentes opciones wellness sin que la empresa tenga que negociar con cada gimnasio por separado." },
        { q: "¿Cómo funciona para gimnasios y studios?", a: "Los socios pueden participar bajo condiciones acordadas: horarios, cupos, reservas, límites de uso y pago por visita verificada o estructura acordada." },
        { q: "¿En qué zonas empezará Activa?", a: "Estamos iniciando en zonas como San José, Escazú, Santa Ana, Heredia, Curridabat y Cartago." },
      ],
    },
    contact: {
      label: "Contacto",
      titleTop: "Sumate al",
      titleEm: "piloto de Activa.",
      intro: "Completá nuestro formulario para registrarte en el piloto, o escribinos directamente. Te responderemos en menos de 48 horas.",
      ctaForm: "Abrir el formulario",
      ctaEmail: "Contactanos directamente",
      formTitle: "Contactar a Activa",
      location: "Costa Rica · GAM",
    },
    about: {
      label: "Sobre Activa",
      titleTop: "Hechos en",
      titleEm: "Costa Rica.",
      p1: "Activa está siendo construida por un equipo costarricense con la misión de hacer el bienestar más flexible, accesible y conectado en Costa Rica.",
      p2: "Creemos que las personas no deberían estar limitadas a una sola forma de moverse, y que los gimnasios y studios locales pueden crecer conectándose con empresas y usuarios de calidad.",
      p3: "Estamos apenas empezando — y eso es exactamente el momento en que queremos que te unás.",
    },
    footer: {
      tagline: "Una membresía. Muchas formas de moverte. Plataforma de bienestar en Costa Rica.",
      legalLabel: "Legal",
      memberTerms: "Términos para miembros",
      partnerTerms: "Términos para aliados",
      privacyNotice: "Aviso de Privacidad",
      photoConsent: "Consentimiento de foto",
      navLabel: "Navegación",
      contactLabel: "Contacto",
      location: "Costa Rica",
      rights: "© 2026 Activa. Todos los derechos reservados.",
    },
  },
} satisfies Record<Lang, unknown>;

const STORAGE_KEY = "activa-lang";

/**
 * Optional full-screen language picker on first visit.
 * Off by default per the design handoff (`languagePicker` config flag).
 */
const LANGUAGE_PICKER = false;

type LangContextValue = {
  lang: Lang;
  t: Translation;
  setLang: (lang: Lang) => void;
  showPicker: boolean;
  choose: (lang: Lang) => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // ignore storage failures (e.g. blocked cookies, private mode)
    }
    if (stored === "en" || stored === "es") {
      setLangState(stored);
    } else if (LANGUAGE_PICKER) {
      setShowPicker(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const persist = (next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage failures (e.g. private mode)
    }
  };

  const setLang = (next: Lang) => persist(next);

  const choose = (next: Lang) => {
    persist(next);
    setShowPicker(false);
  };

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], setLang, showPicker, choose }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

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
      main: "Main",
      skip: "Skip to main content",
      signIn: "Already a member? Sign in",
      switchLang: "Cambiar a español",
    },
    meta: {
      title: "Activa · One membership. Many ways to move.",
      description:
        "Activa connects people and companies with gyms, studios and wellness services in Costa Rica through one flexible membership. Join our pilot.",
    },
    common: {
      close: "Close",
      newTab: "(opens in a new tab)",
    },
    hero: {
      eyebrow: "Costa Rica · Wellness Without Borders",
      titleTop: "One membership.",
      titleEm: "Many ways to move.",
      subtitle:
        "Activa connects people and companies with gyms, studios and wellness services in Costa Rica through one flexible membership.",
      ctaPrimary: "Register pilot interest",
      ctaSecondary: "How it works",
      status: "Pilot in preparation · not open yet",
      comingSoon: "Coming soon to",
      mockupCaption:
        "Preview of the Activa app. The ratings, bookings and member shown are examples, not live data.",
      ctaCompany: "I'm a company",
      ctaGym: "I'm a gym or studio",
      ctaUser: "I want to join the pilot",
      proofText: "Companies that invest in wellness see up to +10% productivity and −69% turnover intent.",
      proofLink: "See the evidence",
    },
    audiences: {
      label: "Find your path",
      titleTop: "Who is Activa for?",
      titleEm: "Choose your next step.",
      nextLabel: "What happens next",
      howLink: "How it works",
      note: "Proposed process; it may change during the pilot. Registering interest doesn't create an account, reserve a spot or commit you to anything.",
      companies: {
        name: "Companies & associations",
        short: "Company or association",
        who: "HR, benefits and solidarity-association teams.",
        offer: "A flexible wellness benefit, without negotiating with each gym separately.",
        steps: [
          "Register your interest with the form or by email.",
          "We talk about your team, locations and needs.",
          "If there's a fit, we design the pilot participation together.",
        ],
        cta: "Register as a company or association",
      },
      gyms: {
        name: "Gyms & studios",
        short: "Gym or studio",
        who: "Owners and managers of gyms, studios and wellness centers.",
        offer: "An additional channel for verified users, under rules you help define.",
        steps: [
          "Register your interest.",
          "We talk about your schedules, capacity, bookings and access rules.",
          "We agree the terms of your participation together.",
        ],
        cta: "Register as a gym or studio",
      },
      users: {
        name: "Prospective members",
        short: "Prospective member",
        who: "People who want to move in more than one place.",
        offer: "One membership for gyms, studios and wellness services, offered as a benefit through participating companies and associations.",
        steps: [
          "Register your interest.",
          "We'll contact you when the pilot has news for you.",
          "Membership comes through your employer or association. Not part of Activa yet? Share it with your HR team.",
        ],
        cta: "Register as a member",
      },
    },
    hr: {
      title: "Want Activa at work?",
      body: "Copy this message, edit it if you like and send it to your HR or benefits team yourself. Nothing is sent from this page.",
      label: "Message for your HR team",
      message:
        "Hi! I came across Activa (https://4ctiva.com), a Costa Rican platform preparing a pilot that gives teams access to gyms, studios and wellness services through one membership. They're looking for companies and associations to take part. Could we look into it? Thanks!",
      subject: "Wellness benefit idea: Activa",
      copy: "Copy message",
      copied: "Message copied.",
      copyFailed: "Couldn't copy automatically. Select the text and copy it.",
      email: "Open in my email",
    },
    what: {
      label: "What is Activa",
      titleTop: "A wellness platform",
      titleEm: "for three audiences.",
      intro:
        "Activa is a wellness platform that lets users access a curated network of gyms, studios and wellness services with a single membership.",
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
      tabs: { users: "Members", companies: "Companies", gyms: "Gyms / Studios" },
      tabsLabel: "Show steps for",
      steps: {
        users: [
          { step: "01", title: "Choose your Activa plan.", body: "Pick the membership that best fits your lifestyle and wellness goals." },
          { step: "02", title: "Book or visit partner spaces.", body: "Explore the network of gyms, studios and wellness centers available in your area." },
          { step: "03", title: "Check in and enjoy.", body: "Show your QR or temporary code and verify your identity at reception. Your profile photo is optional." },
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
      label: "External research",
      titleTop: "Wellbeing at work:",
      titleEm: "what research has found.",
      intro:
        "Published studies of other workplace wellness programs have reported findings like these. They are not Activa results, and outcomes vary by program and context.",
      stats: [
        {
          n: "+10%",
          d: "productivity among employees who improved their health in one company's wellness program.",
          s: "Gubler, Larkin & Pierce (2018) · Management Science",
        },
        {
          n: "$3.27",
          d: "lower medical costs per $1 spent, averaged across earlier studies in a 2010 review. A later randomized trial found no significant savings after 18 months.",
          s: "Baicker, Cutler & Song (2010) · Health Affairs; Song & Baicker (2019) · JAMA",
        },
        {
          n: "−69%",
          d: "less likely to be actively job hunting, among employees who feel their employer cares about their wellbeing. A survey association, not proof of cause.",
          s: "Harter (2022) · Gallup",
        },
      ],
      disclaimer: "Research findings, not Activa results. They don't prove cause, and no savings are guaranteed.",
      cta: "Bring Activa to your company",
      refsLabel: "Full references (APA)",
      refs: [
        "Baicker, K., Cutler, D., & Song, Z. (2010). Workplace wellness programs can generate savings. Health Affairs, 29(2), 304–311. https://doi.org/10.1377/hlthaff.2009.0626",
        "Gubler, T., Larkin, I., & Pierce, L. (2018). Doing well by making well: The impact of corporate wellness programs on employee productivity. Management Science, 64(11), 4967–4987. https://doi.org/10.1287/mnsc.2017.2883",
        "Harter, J. (2022, March 18). Percent who feel employer cares about their wellbeing plummets. Gallup. https://www.gallup.com/workplace/390776/percent-feel-employer-cares-wellbeing-plummets.aspx",
        "Parks, K. M., & Steelman, L. A. (2008). Organizational wellness programs: A meta-analysis. Journal of Occupational Health Psychology, 13(1), 58–68. https://doi.org/10.1037/1076-8998.13.1.58",
        "Song, Z., & Baicker, K. (2019). Effect of a workplace wellness program on employee health and economic outcomes: A randomized clinical trial. JAMA, 321(15), 1491–1501. https://doi.org/10.1001/jama.2019.3307",
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
          "Supports your culture and wellbeing goals.",
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
        note: "Activa is offered as a corporate benefit: members join through a participating company or association.",
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
    digital: {
      badge: "In development",
      titleTop: "Wellbeing",
      titleEm: "beyond the gym.",
      desc: "We're exploring partnerships with wellness apps to complement your Activa experience. We want to bring you more ways to care for your daily habits, wherever you are.",
      areasLabel: "Areas we're evaluating",
      areas: ["Meditation and mindful breaks", "Rest and sleep", "Movement at home", "Nutrition and healthy habits"],
      note: "This initiative is being explored. No premium apps are currently included through this initiative, and no launch date has been confirmed. Providers, access and terms will be announced once they are defined.",
      partnerText:
        "We're interested in products with a clear user experience, quality content and availability for people in Costa Rica.",
      partnerCta: "Have a wellness app? Let's talk.",
    },
    pilot: {
      label: "2026 Pilot",
      titleTop: "We're building our pilot",
      titleEm: "in Costa Rica.",
      p1: "We're currently selecting gyms, studios and companies to take part in Activa's first pilot, in areas being considered such as San José, Escazú, Santa Ana, Heredia, Curridabat and Cartago.",
      p2: "If you're a company, gym, studio or interested user, you can sign up to receive more information.",
      btnCompany: "Join as a company",
      btnGym: "Join as a gym/studio",
      btnUser: "Join as a user",
      statusTitle: "Where things stand",
      status:
        "Activa is preparing its first pilot in Costa Rica. It isn't open yet. We're talking with companies, associations, gyms and studios to shape it.",
      zonesLabel: "Areas being considered",
      zonesHint: "Select the areas that interest you and we'll add them to your message. This isn't confirmed coverage.",
      zoneOther: "Somewhere else",
      zonesSelected: "Selected:",
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
      filterLabel: "Show questions for",
      all: "Everyone",
      items: [
        { for: ["users", "companies", "gyms"], q: "Is Activa available yet?", a: "We're preparing our first pilot in Costa Rica. You can sign up to receive information and take part when we open spots." },
        { for: ["users", "companies", "gyms"], q: "Does registering interest sign me up?", a: "No. It only tells us you're interested so we can contact you. It doesn't create an account, reserve a spot or involve any payment." },
        { for: ["users"], q: "Do I need a profile photo?", a: "No. Your photo is optional and is only used for a visual identity check by authorized staff. Without one, present your QR or temporary code and show your ID at reception; no photo or copy of your ID is kept. Removing your photo does not affect your membership or renewal preference. Activa does not use automated facial recognition." },
        { for: ["users", "companies", "gyms"], q: "Is Activa only for gyms?", a: "No. Activa includes gyms, studios, classes, wellness, recovery and other wellbeing services." },
        { for: ["users", "companies"], q: "Does Activa include premium apps yet?", a: "This new initiative is being explored. No premium apps are currently included through this initiative, and no launch date has been confirmed. We'll announce providers and terms once they are defined." },
        { for: ["gyms", "companies"], q: "Is it a discount platform?", a: "No. Activa doesn't aim to devalue its partners. We work with access rules, verified users and structures designed to keep the model sustainable for both sides." },
        { for: ["companies"], q: "How does it work for companies?", a: "Companies can offer Activa as a corporate benefit for their employees. Activa centralizes access to different wellness options without the company having to negotiate with each gym separately." },
        { for: ["gyms"], q: "How does it work for gyms and studios?", a: "Partners can take part under agreed terms: schedules, capacity, bookings, usage limits and payment per verified visit or agreed structure." },
        { for: ["users", "companies", "gyms"], q: "Which areas will Activa start in?", a: "We're considering areas such as San José, Escazú, Santa Ana, Heredia, Curridabat and Cartago. Coverage hasn't been confirmed; telling us where you are helps us plan." },
        { for: ["users"], q: "Can I join on my own?", a: "You're welcome to explore Activa and register your interest. Membership is offered as a corporate benefit, through participating companies and associations. If yours isn't part of Activa yet, you can share it with your HR or benefits team using the ready-to-edit message in the members path." },
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
      dialogTitle: "Register your interest",
      audienceLegend: "You're registering as",
      audienceNote: "The form doesn't receive this choice automatically. Please pick the same option inside the form. Email and WhatsApp messages below include it.",
      areasLine: "Areas you selected:",
      openForm: "Open the form in a new tab",
      formHelp: "If the form below stays blank or asks you to sign in, open it in a new tab or use email or WhatsApp. Google may ask you to sign in or allow cookies.",
      loading: "Loading the form…",
      slow: "The form is taking a while. You can open it in a new tab or contact us directly.",
      altTitle: "Prefer email or WhatsApp?",
      subject: "Activa pilot interest",
      greeting: "Hi Activa team, I'm interested in the pilot.",
      asLine: "I'm writing as:",
      notChosen: "not specified",
      embedTitle: "Activa pilot interest form (Google Forms)",
    },
    alts: {
      meditation: "Woman meditating in a bright studio",
      companyWellness: "Group wellness session beside the water",
      strength: "Athlete preparing a barbell lift",
      boxing: "Woman practicing boxing",
      pool: "Swimmer recovering beside an outdoor pool",
      appStore: "App Store",
      googlePlay: "Google Play",
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
      terms: "Terms & Conditions",
      rules: "Business Rules",
      navLabel: "Navigation",
      contactLabel: "Contact",
      location: "Costa Rica",
      rights: "© 2026 Activa. All rights reserved.",
    },
    legal: {
      eyebrow: "Legal",
      docsLabel: "Legal documents",
      termsShort: "Terms",
      rulesShort: "Rules",
      skipToDoc: "Skip to document",
      versionsTitle: "Version history",
      versionCurrent: "Latest version",
      archivedTitle: "Earlier version",
      archivedBody: "You are reading an earlier version, preserved for reference.",
      archivedLink: "See the latest version",
      version: "Version",
      effective: "Effective",
      print: "Print",
      contents: "Contents",
      backToTop: "Back to top",
      spanishOnlyTitle: "Available in Spanish only",
      spanishOnlyBody: "This document is published in Spanish, which is its binding version.",
      pendingLegend: "Highlighted values are pending confirmation.",
      relatedRules: "More detail in the Business Rules",
      relatedTerms: "Related in the Terms & Conditions",
      seeAlso: "See also",
    },
  },

  es: {
    nav: {
      home: "Inicio",
      about: "Nosotros",
      memberships: "Membresías",
      contact: "Contacto",
      cta: "Sumate al piloto",
      menu: "Menú",
      main: "Principal",
      skip: "Saltar al contenido principal",
      signIn: "¿Ya sos miembro? Iniciá sesión",
      switchLang: "Switch to English",
    },
    meta: {
      title: "Activa · Una membresía. Muchas formas de moverse.",
      description:
        "Activa conecta personas y empresas con gimnasios, studios y servicios wellness en Costa Rica a través de una membresía flexible. Sumate a nuestro piloto.",
    },
    common: {
      close: "Cerrar",
      newTab: "(se abre en una pestaña nueva)",
    },
    hero: {
      eyebrow: "Costa Rica · Bienestar Sin Fronteras",
      titleTop: "Una membresía.",
      titleEm: "Muchas formas de moverse.",
      subtitle:
        "Activa conecta personas y empresas con gimnasios, studios y servicios wellness en Costa Rica a través de una membresía flexible.",
      ctaPrimary: "Registrá tu interés en el piloto",
      ctaSecondary: "Cómo funciona",
      status: "Piloto en preparación · aún no está abierto",
      comingSoon: "Próximamente en",
      mockupCaption:
        "Vista previa de la app de Activa. Las calificaciones, reservas y la persona que se muestran son ejemplos, no datos reales.",
      ctaCompany: "Soy empresa",
      ctaGym: "Soy gimnasio o studio",
      ctaUser: "Quiero unirme al piloto",
      proofText: "Las empresas que invierten en bienestar ven hasta +10% de productividad y −69% en intención de rotación.",
      proofLink: "Ver la evidencia",
    },
    audiences: {
      label: "Encontrá tu camino",
      titleTop: "¿Para quién es Activa?",
      titleEm: "Elegí tu siguiente paso.",
      nextLabel: "Qué sigue",
      howLink: "Cómo funciona",
      note: "Proceso propuesto; puede cambiar durante el piloto. Registrar tu interés no crea una cuenta, no reserva un cupo ni te compromete a nada.",
      companies: {
        name: "Empresas y asociaciones",
        short: "Empresa o asociación",
        who: "Equipos de recursos humanos, beneficios y asociaciones solidaristas.",
        offer: "Un beneficio de bienestar flexible, sin negociar con cada gimnasio por separado.",
        steps: [
          "Registrá tu interés con el formulario o por correo.",
          "Conversamos sobre tu equipo, sus ubicaciones y necesidades.",
          "Si hay afinidad, diseñamos juntos la participación en el piloto.",
        ],
        cta: "Registrarme como empresa o asociación",
      },
      gyms: {
        name: "Gimnasios y studios",
        short: "Gimnasio o studio",
        who: "Dueños y administradores de gimnasios, studios y centros wellness.",
        offer: "Un canal adicional de usuarios verificados, con reglas que vos ayudás a definir.",
        steps: [
          "Registrá tu interés.",
          "Conversamos sobre tus horarios, cupos, reservas y reglas de acceso.",
          "Acordamos juntos las condiciones de tu participación.",
        ],
        cta: "Registrarme como gimnasio o studio",
      },
      users: {
        name: "Futuros miembros",
        short: "Futuro miembro",
        who: "Personas que quieren moverse en más de un lugar.",
        offer: "Una sola membresía para gimnasios, studios y servicios wellness, ofrecida como beneficio por medio de empresas y asociaciones participantes.",
        steps: [
          "Registrá tu interés.",
          "Te contactamos cuando el piloto tenga novedades para vos.",
          "La membresía llega por medio de tu empresa o asociación. ¿Todavía no está en Activa? Compartilo con tu equipo de recursos humanos.",
        ],
        cta: "Registrarme como miembro",
      },
    },
    hr: {
      title: "¿Querés Activa en tu trabajo?",
      body: "Copiá este mensaje, editalo si querés y envialo vos mismo a tu equipo de recursos humanos o beneficios. Desde esta página no se envía nada.",
      label: "Mensaje para recursos humanos",
      message:
        "¡Hola! Encontré Activa (https://4ctiva.com), una plataforma costarricense que está preparando un piloto para que los equipos accedan a gimnasios, studios y servicios de bienestar con una sola membresía. Están buscando empresas y asociaciones para participar. ¿Podríamos valorarlo? ¡Gracias!",
      subject: "Idea de beneficio de bienestar: Activa",
      copy: "Copiar mensaje",
      copied: "Mensaje copiado.",
      copyFailed: "No se pudo copiar automáticamente. Seleccioná el texto y copialo.",
      email: "Abrir en mi correo",
    },
    what: {
      label: "Qué es Activa",
      titleTop: "Una plataforma de bienestar",
      titleEm: "para tres audiencias.",
      intro:
        "Activa es una plataforma de bienestar que permite a los usuarios acceder a una red curada de gimnasios, studios y servicios wellness con una sola membresía.",
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
      tabs: { users: "Miembros", companies: "Empresas", gyms: "Gimnasios / Studios" },
      tabsLabel: "Ver pasos para",
      steps: {
        users: [
          { step: "01", title: "Elegí tu plan Activa.", body: "Seleccioná la membresía que mejor se adapta a tu estilo de vida y objetivos de bienestar." },
          { step: "02", title: "Reservá o visitá espacios aliados.", body: "Explorá la red de gimnasios, studios y centros wellness disponibles en tu zona." },
          { step: "03", title: "Hacé check-in y disfrutá.", body: "Presentá tu QR o código temporal y verificá tu identidad en recepción. La foto de perfil es opcional." },
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
      label: "Investigación externa",
      titleTop: "Bienestar laboral:",
      titleEm: "lo que ha encontrado la investigación.",
      intro:
        "Estudios publicados sobre otros programas de bienestar laboral reportan hallazgos como estos. No son resultados de Activa, y los resultados varían según el programa y el contexto.",
      stats: [
        {
          n: "+10%",
          d: "de productividad entre colaboradores que mejoraron su salud en el programa de bienestar de una empresa.",
          s: "Gubler, Larkin & Pierce (2018) · Management Science",
        },
        {
          n: "$3.27",
          d: "menos en costos médicos por cada $1 invertido, en promedio de estudios anteriores según una revisión de 2010. Un ensayo aleatorizado posterior no encontró ahorros significativos a los 18 meses.",
          s: "Baicker, Cutler & Song (2010) · Health Affairs; Song & Baicker (2019) · JAMA",
        },
        {
          n: "−69%",
          d: "de probabilidad de buscar activamente otro empleo entre colaboradores que sienten que su empresa cuida su bienestar. Es una asociación de encuesta, no prueba de causa.",
          s: "Harter (2022) · Gallup",
        },
      ],
      disclaimer: "Hallazgos de investigación, no resultados de Activa. No prueban causa y no garantizan ahorros.",
      cta: "Llevá Activa a tu empresa",
      refsLabel: "Referencias completas (APA)",
      refs: [
        "Baicker, K., Cutler, D., & Song, Z. (2010). Workplace wellness programs can generate savings. Health Affairs, 29(2), 304–311. https://doi.org/10.1377/hlthaff.2009.0626",
        "Gubler, T., Larkin, I., & Pierce, L. (2018). Doing well by making well: The impact of corporate wellness programs on employee productivity. Management Science, 64(11), 4967–4987. https://doi.org/10.1287/mnsc.2017.2883",
        "Harter, J. (2022, March 18). Percent who feel employer cares about their wellbeing plummets. Gallup. https://www.gallup.com/workplace/390776/percent-feel-employer-cares-wellbeing-plummets.aspx",
        "Parks, K. M., & Steelman, L. A. (2008). Organizational wellness programs: A meta-analysis. Journal of Occupational Health Psychology, 13(1), 58–68. https://doi.org/10.1037/1076-8998.13.1.58",
        "Song, Z., & Baicker, K. (2019). Effect of a workplace wellness program on employee health and economic outcomes: A randomized clinical trial. JAMA, 321(15), 1491–1501. https://doi.org/10.1001/jama.2019.3307",
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
          "Apoya tus objetivos de cultura y bienestar.",
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
        note: "Activa se ofrece como beneficio corporativo: las personas se unen por medio de una empresa o asociación participante.",
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
    digital: {
      badge: "En desarrollo",
      titleTop: "Tu bienestar,",
      titleEm: "también fuera del gimnasio.",
      desc: "Estamos explorando alianzas con apps de bienestar para complementar tu experiencia con Activa. Queremos acercarte más opciones para cuidar tus hábitos, desde donde estés.",
      areasLabel: "Áreas que estamos evaluando",
      areas: ["Meditación y pausas conscientes", "Descanso y sueño", "Movimiento en casa", "Nutrición y hábitos"],
      note: "Esta iniciativa está en exploración. Todavía no hay apps premium incluidas por esta iniciativa ni una fecha de lanzamiento confirmada. Los proveedores, el acceso y las condiciones se comunicarán cuando estén definidos.",
      partnerText:
        "Buscamos conocer productos con una experiencia clara, contenido de calidad y disponibilidad para personas en Costa Rica.",
      partnerCta: "¿Tenés una app de bienestar? Conversemos.",
    },
    pilot: {
      label: "Piloto 2026",
      titleTop: "Estamos construyendo nuestro piloto",
      titleEm: "en Costa Rica.",
      p1: "Actualmente estamos seleccionando gimnasios, studios y empresas para participar en el primer piloto de Activa, en zonas que estamos valorando como San José, Escazú, Santa Ana, Heredia, Curridabat y Cartago.",
      p2: "Si sos una empresa, gimnasio, studio o usuario interesado, podés registrarte para recibir más información.",
      btnCompany: "Participar como empresa",
      btnGym: "Participar como gimnasio/studio",
      btnUser: "Unirme como usuario",
      statusTitle: "Dónde estamos",
      status:
        "Activa está preparando su primer piloto en Costa Rica. Todavía no está abierto. Estamos conversando con empresas, asociaciones, gimnasios y studios para darle forma.",
      zonesLabel: "Zonas que estamos valorando",
      zonesHint: "Elegí las zonas que te interesan y las agregamos a tu mensaje. No es cobertura confirmada.",
      zoneOther: "Otra zona",
      zonesSelected: "Elegidas:",
      zonesNote:
        "Estamos conversando con gimnasios, studios y centros wellness en la GAM para formar la primera red Activa. Si tu negocio no está en estas zonas pero te interesa participar, contactanos.",
    },
    categories: {
      label: "Red de Socios",
      titleTop: "Más que un gimnasio.",
      titleEm: "Un ecosistema.",
      intro: "Activa incluye una variedad de espacios y disciplinas para que cada persona encuentre lo que necesita.",
      items: ["Gimnasios", "Yoga", "Pilates", "Boxeo", "Funcional", "Recuperación", "Masajes", "Fisioterapia", "Wellness"],
    },
    faq: {
      label: "Preguntas Frecuentes",
      titleTop: "Respuestas",
      titleEm: "claras.",
      filterLabel: "Mostrar preguntas para",
      all: "Todos",
      items: [
        { for: ["users", "companies", "gyms"], q: "¿Activa ya está disponible?", a: "Estamos preparando nuestro primer piloto en Costa Rica. Podés registrarte para recibir información y participar cuando abramos cupos." },
        { for: ["users", "companies", "gyms"], q: "¿Registrar mi interés me inscribe?", a: "No. Solo nos indica que te interesa para poder contactarte. No crea una cuenta, no reserva un cupo ni implica ningún pago." },
        { for: ["users"], q: "¿Necesito subir una foto de perfil?", a: "No. La foto es opcional y solo se usa para que el personal autorizado verifique tu identidad de forma visual. Sin foto, presentá tu QR o código temporal y mostrá tu identificación en recepción; no se fotografía ni se guarda copia del documento. Retirar la foto no afecta tu membresía ni tu preferencia de renovación. Activa no utiliza reconocimiento facial automático." },
        { for: ["users", "companies", "gyms"], q: "¿Activa es solo para gimnasios?", a: "No. Activa incluye gimnasios, studios, clases, wellness, recovery y otros servicios de bienestar." },
        { for: ["users", "companies"], q: "¿Activa ya incluye apps premium?", a: "Esta nueva iniciativa está en exploración. Todavía no hay apps premium incluidas por esta iniciativa ni una fecha de lanzamiento confirmada. Comunicaremos los proveedores y las condiciones cuando estén definidos." },
        { for: ["gyms", "companies"], q: "¿Es una plataforma de descuentos?", a: "No. Activa no busca devaluar a sus socios. Trabajamos con reglas de acceso, usuarios verificados y estructuras diseñadas para que el modelo sea sostenible para ambas partes." },
        { for: ["companies"], q: "¿Cómo funciona para empresas?", a: "Las empresas pueden ofrecer Activa como beneficio corporativo para sus colaboradores. Activa centraliza el acceso a diferentes opciones wellness sin que la empresa tenga que negociar con cada gimnasio por separado." },
        { for: ["gyms"], q: "¿Cómo funciona para gimnasios y studios?", a: "Los socios pueden participar bajo condiciones acordadas: horarios, cupos, reservas, límites de uso y pago por visita verificada o estructura acordada." },
        { for: ["users", "companies", "gyms"], q: "¿En qué zonas empezará Activa?", a: "Estamos valorando zonas como San José, Escazú, Santa Ana, Heredia, Curridabat y Cartago. La cobertura no está confirmada; contarnos dónde estás nos ayuda a planificar." },
        { for: ["users"], q: "¿Puedo unirme por mi cuenta?", a: "Podés explorar Activa y registrar tu interés con toda libertad. La membresía se ofrece como beneficio corporativo, por medio de empresas y asociaciones participantes. Si la tuya todavía no está en Activa, podés compartir Activa con tu equipo de recursos humanos o beneficios usando el mensaje editable del camino para miembros." },
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
      dialogTitle: "Registrá tu interés",
      audienceLegend: "Te registrás como",
      audienceNote: "El formulario no recibe esta elección automáticamente. Elegí la misma opción dentro del formulario. Los mensajes por correo y WhatsApp de abajo sí la incluyen.",
      areasLine: "Zonas que elegiste:",
      openForm: "Abrir el formulario en una pestaña nueva",
      formHelp: "Si el formulario de abajo queda en blanco o te pide iniciar sesión, abrilo en una pestaña nueva o escribinos por correo o WhatsApp. Google puede pedirte iniciar sesión o permitir cookies.",
      loading: "Cargando el formulario…",
      slow: "El formulario está tardando. Podés abrirlo en una pestaña nueva o contactarnos directamente.",
      altTitle: "¿Preferís correo o WhatsApp?",
      subject: "Interés en el piloto de Activa",
      greeting: "Hola, equipo de Activa. Me interesa el piloto.",
      asLine: "Escribo como:",
      notChosen: "sin especificar",
      embedTitle: "Formulario de interés en el piloto de Activa (Google Forms)",
    },
    alts: {
      meditation: "Mujer meditando en un estudio iluminado",
      companyWellness: "Sesión grupal de bienestar junto al agua",
      strength: "Atleta preparándose para levantar una barra",
      boxing: "Mujer practicando boxeo",
      pool: "Nadador recuperándose junto a una piscina al aire libre",
      appStore: "App Store",
      googlePlay: "Google Play",
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
      terms: "Términos y Condiciones",
      rules: "Reglas de Negocio",
      navLabel: "Navegación",
      contactLabel: "Contacto",
      location: "Costa Rica",
      rights: "© 2026 Activa. Todos los derechos reservados.",
    },
    legal: {
      eyebrow: "Legal",
      docsLabel: "Documentos legales",
      termsShort: "Términos",
      rulesShort: "Reglas",
      skipToDoc: "Saltar al documento",
      versionsTitle: "Historial de versiones",
      versionCurrent: "Última versión",
      archivedTitle: "Versión anterior",
      archivedBody: "Está consultando una versión anterior, conservada para referencia.",
      archivedLink: "Ver la última versión",
      version: "Versión",
      effective: "Entrada en vigor",
      print: "Imprimir",
      contents: "Contenido",
      backToTop: "Volver arriba",
      spanishOnlyTitle: "Disponible solo en español",
      spanishOnlyBody: "Este documento se publica en español, que es su versión vinculante.",
      pendingLegend: "Los valores resaltados están pendientes de confirmación.",
      relatedRules: "Más detalle en las Reglas de Negocio",
      relatedTerms: "Relacionado en los Términos y Condiciones",
      seeAlso: "Ver también",
    },
  },
} satisfies Record<Lang, unknown>;

// compile-time check: the Spanish copy has every key the English copy has
const _esComplete: Translation = translations.es;
void _esComplete;

export const STORAGE_KEY = "activa-lang";

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

function readStoredLang(): Lang | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" || stored === "es" ? stored : null;
  } catch {
    // ignore storage failures (e.g. blocked cookies, private mode)
    return null;
  }
}

/** `defaultLang` applies until the visitor picks a language (stored choice wins). */
export function LanguageProvider({ children, defaultLang = "en" }: { children: ReactNode; defaultLang?: Lang }) {
  // read the stored choice up front so the first render is already in the right language
  const [lang, setLangState] = useState<Lang>(() => readStoredLang() ?? defaultLang);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (!readStoredLang() && LANGUAGE_PICKER) setShowPicker(true);
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

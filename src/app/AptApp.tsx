import SiteFooter from "./components/site/SiteFooter";
import logoFull from "../../assets/logo-full.png";
import aptLogo from "../../assets/apt-logo.png";
import aptHero from "../../assets/apt-hero.jpg";
import aptEquipo from "../../assets/apt-equipo.jpg";

/**
 * Activa para Todos — social-commitment page (Spanish-only by design).
 * Activa donates 3% of annual pre-tax profits to CEPIA.
 */
export default function AptApp() {
  return (
    <div className="min-h-screen overflow-x-clip bg-background font-sans text-foreground">
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 border-b border-border bg-[rgba(250,248,244,.92)] backdrop-blur-[12px]">
        <div className="mx-auto box-content flex max-w-[1280px] flex-wrap items-center justify-between gap-x-5 gap-y-3 px-[clamp(16px,4vw,48px)] py-3.5">
          <a href="/" className="flex items-center">
            <img src={logoFull} alt="Activa" className="block h-[19px] w-auto" />
          </a>
          <span className="font-mono text-[11px] uppercase tracking-[.24em] text-leaf">Activa para Todos</span>
          <a
            href="https://cepiacostarica.org/es/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-leaf px-6 py-[11px] text-[13px] font-semibold text-light"
          >
            Conocé a CEPIA
          </a>
        </div>
      </div>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative min-h-[620px] overflow-hidden">
        <img
          src={aptHero}
          alt="Ilustración en acuarela de niñas y niños jugando baloncesto en una cancha al aire libre"
          className="absolute inset-0 h-full w-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(250,248,244,.96)_0%,rgba(250,248,244,.88)_44%,rgba(250,248,244,.5)_68%,rgba(250,248,244,.12)_100%)]" />
        <div className="relative mx-auto box-content max-w-[1280px] px-[clamp(20px,4.5vw,48px)] pb-[clamp(48px,6vw,72px)] pt-[clamp(56px,7vw,88px)]">
          <div className="max-w-[540px]">
            <div className="mb-7">
              <img src={aptLogo} alt="Activa para Todos" className="block h-auto w-[min(300px,70vw)]" />
            </div>
            <h1 className="mb-[26px] mt-0 font-display text-[clamp(34px,5vw,52px)] font-light leading-[1.1] tracking-[-.01em]">
              Más oportunidades para
              <br />
              <span className="font-semibold">moverse, jugar y crecer.</span>
            </h1>
            <p className="mb-4 mt-0 text-base leading-[1.7] text-[#4a4a40] text-pretty">
              En Activa creemos que todas las niñas y todos los niños deberían tener la oportunidad de descubrir una
              actividad que les guste, hacer amistades y disfrutar del movimiento.
            </p>
            <p className="mb-[34px] mt-0 text-base leading-[1.7] text-[#4a4a40] text-pretty">
              Por eso, destinaremos el 3% de nuestras utilidades anuales antes del impuesto sobre la renta a CEPIA, para
              apoyar el acceso de niñas y niños de Guanacaste al deporte y a actividades de bienestar.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#causa" className="rounded-full bg-leaf px-7 py-3.5 text-[13.5px] font-bold text-light">
                Conocé nuestro compromiso →
              </a>
              <a
                href="https://cepiacostarica.org/es/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-[1.5px] border-ink px-[26px] py-[13px] text-[13.5px] font-semibold transition-colors duration-200 hover:text-[#3d4a61]"
              >
                Conocé a CEPIA
              </a>
            </div>
            <div className="mt-16 font-display text-[clamp(22px,3vw,30px)] font-light italic text-ink">
              “El bienestar crece cuando lo compartimos.”
            </div>
          </div>
        </div>
      </section>

      {/* ── LA CAUSA ───────────────────────────────────────────── */}
      <section id="causa">
        <div className="mx-auto box-content grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(28px,4.5vw,64px)] px-[clamp(20px,4.5vw,48px)] py-[clamp(56px,8vw,96px)]">
          <div>
            <div className="mb-[22px] font-mono text-[11px] uppercase tracking-[.24em] text-leaf">La causa</div>
            <h2 className="mb-6 mt-0 font-display text-[clamp(29px,4.2vw,44px)] font-light leading-[1.12] tracking-[-.01em]">
              Una causa <span className="font-semibold">que nos mueve.</span>
            </h2>
            <p className="mb-4 mt-0 text-[15px] leading-[1.75] text-muted-foreground text-pretty">
              Queremos contribuir a que el costo de una actividad, el equipo o el transporte dejen de ser una barrera
              para participar. Nuestro objetivo es apoyar oportunidades regulares de juego, aprendizaje y movimiento, en
              espacios seguros y con acompañamiento.
            </p>
            <p className="m-0 text-[15px] leading-[1.75] text-muted-foreground text-pretty">
              CEPIA es una organización costarricense sin fines de lucro que trabaja con comunidades de Guanacaste. Sus
              programas incluyen oportunidades educativas, deportivas y recreativas para niñas, niños y jóvenes.
            </p>
          </div>
          <div className="h-[480px]">
            <img
              src={aptEquipo}
              alt="Ilustración en acuarela de un balón, cuerda de saltar, tenis y gafas de natación sobre una cancha"
              className="apt-equipo-mask h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── DONACIONES ─────────────────────────────────────────── */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto box-content grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-[clamp(28px,4.5vw,64px)] px-[clamp(20px,4.5vw,48px)] py-[clamp(56px,8vw,96px)]">
          <div>
            <div className="mb-[22px] font-mono text-[11px] uppercase tracking-[.24em] text-leaf">Donaciones</div>
            <h2 className="m-0 font-display text-[clamp(29px,4.2vw,44px)] font-light leading-[1.12] tracking-[-.01em]">
              ¿Puedo donar <span className="font-semibold">directamente a CEPIA?</span>
            </h2>
          </div>
          <div className="pt-2.5">
            <p className="mb-8 mt-0 text-[19px] leading-[1.7] text-[#4a4a40] text-pretty">
              Sí. Podés conocer sus opciones de donación en su sitio oficial. Los aportes directos a CEPIA son
              independientes del compromiso de Activa.
            </p>
            <a
              href="https://cepiacostarica.org/donate/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-leaf px-11 py-[18px] text-[16px] font-bold text-light transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(63,77,58,.3)]"
            >
              Donar a CEPIA →
            </a>
          </div>
        </div>
      </section>

      <SiteFooter lang="es" anchorPrefix="/" />
    </div>
  );
}

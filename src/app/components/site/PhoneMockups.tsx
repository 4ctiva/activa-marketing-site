import { SearchIcon, HeartIcon } from "./icons";
import appLogo from "../../../../assets/optimized/logo-240w.webp";
import venue9Round from "../../../../assets/optimized/venue-9round-720w.webp";
import venueOtf from "../../../../assets/optimized/venue-otf-720w.webp";
import venueLumiere from "../../../../assets/optimized/venue-lumiere-720w.webp";
import partner9Round from "../../../../assets/optimized/partner-9round-120w.webp";
import partnerOrangetheory from "../../../../assets/optimized/partner-orangetheory-120w.webp";
import partnerLumiere from "../../../../assets/optimized/partner-lumiere-120w.webp";
import partnerMukti from "../../../../assets/optimized/partner-mukti-120w.webp";

/*
 * Floating iPhone mockups from the hero of the design handoff.
 * All in-app copy is Spanish by design, regardless of site language.
 * Partner brands are shown with permission; ratings, bookings and the member
 * are example data, so the phones are hidden from assistive technology and the
 * visible caption (localized) says so instead of announcing them as content.
 */

// box-content: the design prototype lays out in content-box, so the bezel is 302×582 overall
const BEZEL =
  "box-content h-[560px] w-[280px] rounded-[42px] bg-navy p-[11px] shadow-[0_24px_50px_rgba(15,22,36,.18)] transition-[translate,scale,box-shadow] duration-[400ms] ease-[ease] hover:-translate-y-3 hover:scale-[1.025] hover:shadow-[0_42px_80px_rgba(15,22,36,.3)]";
const SCREEN = "flex h-full w-full flex-col overflow-hidden rounded-[32px] bg-card";

function StatusBar() {
  return (
    <div className="flex justify-between px-[18px] pb-0.5 pt-2.5 font-display text-[10.5px]">
      <span>9:41</span>
      <span />
      <span>●●●</span>
    </div>
  );
}

function AppLogo() {
  return (
    <div className="flex justify-center px-[18px] py-0.5">
      <img src={appLogo} alt="Activa" className="h-10 object-contain" />
    </div>
  );
}

function TabRow({ active, tighterBottom }: { active: "Red" | "Mi plan"; tighterBottom?: boolean }) {
  const tabs = ["Mi panel", "Red", "Reservas", "Mi QR", "Mi plan"];
  return (
    <div
      className={`flex items-center justify-between px-5 pt-1 text-[8.5px] font-semibold text-[#70685c] ${
        tighterBottom ? "pb-0.5" : "pb-2"
      }`}
    >
      {tabs.map((tab) =>
        tab === active ? (
          <span key={tab} className="rounded-full bg-white px-[11px] py-[5px] font-bold text-ink">
            {tab}
          </span>
        ) : (
          <span key={tab}>{tab}</span>
        ),
      )}
    </div>
  );
}

function VenueCard({
  img,
  imgAlt,
  logoImg,
  logoAlt,
  logoFit = "contain",
  name,
  brand,
  location,
  rating,
  service,
  heart = true,
}: {
  img: string;
  imgAlt: string;
  logoImg: string;
  logoAlt: string;
  logoFit?: "contain" | "cover";
  name: string;
  brand: string;
  location: string;
  rating: string;
  service?: string;
  heart?: boolean;
}) {
  return (
    <div className="flex-none overflow-hidden rounded-[14px] bg-white">
      <div className="relative h-[82px]">
        <img src={img} alt={imgAlt} className="block h-full w-full object-cover" />
        <span className="absolute left-2 top-2 rounded-full bg-[rgba(255,255,255,.94)] px-[9px] py-1 text-[7.5px] font-bold">
          Disponible en plan PLUS
        </span>
        {heart && (
          <span className="absolute right-2 top-2 flex size-[22px] items-center justify-center rounded-full bg-[rgba(255,255,255,.94)] text-ink">
            <HeartIcon size={10} />
          </span>
        )}
      </div>
      <div className="px-[11px] pb-2.5 pt-[9px]">
        <div className="flex items-center gap-2">
          <span className="flex size-[26px] flex-none items-center justify-center overflow-hidden rounded-lg border border-[rgba(33,43,60,.1)] bg-white">
            <img
              src={logoImg}
              alt={logoAlt}
              className={logoFit === "cover" ? "h-full w-full object-cover" : "h-full w-full object-contain"}
            />
          </span>
          <span className="flex flex-col">
            <span className="text-[10.5px] font-bold">{name}</span>
            <span className="text-[8px] text-[#70685c]">{brand}</span>
          </span>
        </div>
        <div className="mt-[7px] flex gap-[7px] whitespace-nowrap text-[8px] text-muted-foreground">
          <span className="text-sand-deep">◉</span>
          <span>{location}</span>
          <span>·</span>
          <span>Abierto ahora</span>
          <span>·</span>
          <span>{rating}</span>
        </div>
        {service && <div className="mt-[5px] text-[8px] text-muted-foreground">{service}</div>}
        {service && <div className="mt-[7px] text-[8.5px] font-bold underline">Ver sede</div>}
      </div>
    </div>
  );
}

function NetworkPhone() {
  return (
    <div className={BEZEL}>
      <div className={SCREEN}>
        <StatusBar />
        <AppLogo />
        <TabRow active="Red" tighterBottom />
        <div className="flex items-center gap-2 px-5 pb-0.5 pt-2">
          <div className="flex flex-1 items-center gap-[7px] rounded-full bg-white px-3 py-2 text-[9px] text-[#70685c]">
            <SearchIcon size={11} />
            Buscá por aliado, sede, servicio…
          </div>
          <span className="flex size-[30px] flex-none items-center justify-center rounded-full bg-white text-ink">
            <HeartIcon size={12} />
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-5 pt-2">
          <VenueCard
            img={venue9Round}
            imgAlt="9Round Cartago"
            logoImg={partner9Round}
            logoAlt="9Round"
            name="9Round — Cartago"
            brand="9Round"
            location="Cartago"
            rating="☆ Sin reseñas todavía"
            service="Clase 9Round"
          />
          <VenueCard
            img={venueOtf}
            imgAlt="Orangetheory Fitness Escazú"
            logoImg={partnerOrangetheory}
            logoAlt="Orangetheory Fitness"
            logoFit="cover"
            name="Orangetheory — Escazú"
            brand="Orangetheory Fitness"
            location="Escazú"
            rating="★ 4.7 Reseñas"
            service="HIIT · Clase de 60 min"
          />
          <VenueCard
            img={venueLumiere}
            imgAlt="Lumière Health & Beauty Center"
            logoImg={partnerLumiere}
            logoAlt="Lumière"
            name="Lumière — Escazú"
            brand="Lumière Health & Beauty"
            location="Escazú"
            rating="★ 4.9 Reseñas"
            heart={false}
          />
        </div>
      </div>
    </div>
  );
}

function ReservationRow({ logoImg, logoAlt, title, when }: { logoImg: string; logoAlt: string; title: string; when: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-white px-2.5 py-[7px]">
      <span className="flex size-8 flex-none items-center justify-center overflow-hidden rounded-[9px] border border-[rgba(33,43,60,.08)] bg-white">
        <img src={logoImg} alt={logoAlt} className="h-full w-full object-contain" />
      </span>
      <span className="flex flex-1 flex-col">
        <span className="text-[10.5px] font-bold">{title}</span>
        <span className="text-[9px] text-muted-foreground">{when}</span>
      </span>
      <span className="text-xs text-[#70685c]">→</span>
    </div>
  );
}

function MembershipPhone() {
  return (
    <div className={BEZEL}>
      <div className={SCREEN}>
        <StatusBar />
        <AppLogo />
        <TabRow active="Mi plan" />
        <div className="mx-5 rounded-2xl bg-ink px-[18px] py-4 text-light">
          <div className="font-mono text-[9.5px] tracking-[.18em] text-sand">ACTIVA PLUS</div>
          <div className="mb-0.5 mt-[7px] text-[22px] font-semibold">Marcela V.</div>
          <div className="text-[11px] text-[#a89f8c]">Miembro desde marzo · San José</div>
          <div className="mt-3 flex justify-between font-mono text-[9.5px] text-[#a89f8c]">
            <span className="text-[#a3c29a]">● ACTIVA</span>
            <span>●●● 4412</span>
          </div>
        </div>
        <div className="px-5 pb-[5px] pt-2.5 text-[11px] font-bold text-[#70685c]">PRÓXIMAS RESERVAS</div>
        <div className="mx-5 flex flex-col gap-1.5">
          <ReservationRow
            logoImg={partner9Round}
            logoAlt="9Round"
            title="9Round · Kickboxing"
            when="Mañana · 6:30 PM · San José"
          />
          <ReservationRow
            logoImg={partnerLumiere}
            logoAlt="Lumière Health"
            title="Lumière Health · Masaje de relajación"
            when="Jue · 5:00 PM · Escazú"
          />
          <ReservationRow
            logoImg={partnerMukti}
            logoAlt="Mukti Yoga"
            title="Mukti Yoga · Yoga terapéutico"
            when="Vie · 7:00 AM · San José"
          />
        </div>
        <div className="px-5 pb-[5px] pt-2.5 text-[11px] font-bold text-[#70685c]">ESTE MES</div>
        <div className="flex gap-2 px-5">
          {[
            { n: "14", label: "clases" },
            { n: "4", label: "studios" },
            { n: "3", label: "zonas" },
          ].map((stat) => (
            <div key={stat.label} className="flex-1 rounded-xl bg-white p-[9px] text-center">
              <div className="text-[18px] font-bold">{stat.n}</div>
              <div className="text-[10px] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="flex-1" />
        <div className="mx-5 mb-4 mt-2.5 flex items-center justify-center gap-2 rounded-full bg-ink p-[11px] text-center text-xs font-bold text-light">
          <span className="text-[13px]">▦</span>
          Generar QR para check-in
        </div>
      </div>
    </div>
  );
}

export default function PhoneMockups({ caption }: { caption: string }) {
  return (
    <figure className="m-0">
      {/* phones: one below md, side by side to xl, then overlapped in quiet depth
          (a slight tilt, scaled to fit the hero's right column) */}
      <div
        aria-hidden="true"
        data-reveal-group
        data-reveal-stagger="160"
        className="flex justify-center gap-[26px] pt-12 max-md:pt-10 xl:pt-0 xl:[zoom:.82] min-[1400px]:[zoom:.88]"
      >
        <div data-reveal className="relative z-10 xl:rotate-[-2deg]">
          <div className="animate-[phoneFloat_6s_ease-in-out_infinite]">
            <NetworkPhone />
          </div>
        </div>
        <div data-reveal className="max-md:hidden xl:-ml-[150px] xl:mt-24 xl:rotate-[2deg]">
          <div className="animate-[phoneFloat_6s_ease-in-out_-3s_infinite]">
            <MembershipPhone />
          </div>
        </div>
      </div>
      <figcaption className="mx-auto mt-7 box-content max-w-[560px] px-6 text-center text-[12px] leading-[1.6] text-muted-foreground text-pretty max-md:text-[13px] xl:max-w-[420px] xl:px-0">
        <span aria-hidden="true" className="mr-1.5 rounded-full border border-[rgba(33,43,60,.2)] px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[.16em]">
          Demo
        </span>
        {caption}
      </figcaption>
    </figure>
  );
}

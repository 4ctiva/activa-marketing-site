import { LAUNCH_ZONES } from "../../i18n";

/*
 * Abstract map of the pilot areas being considered: no basemap, just a
 * hairline graticule, a scale bar and one dot per area, placed by its real
 * coordinates (equirectangular, 1 unit = 0.001°). The checkboxes beside it
 * stay the real controls; the dots mirror them and toggle them on click, so
 * the map is hidden from assistive technology. It sits under the zones hint,
 * which already says this is not confirmed coverage.
 */

const W = 400;
const H = 230;
const LON0 = -84.25; // left edge
const LAT0 = 10.05; // top edge
const at = (lat: number, lon: number) => ({ x: (lon - LON0) * 1000, y: (LAT0 - lat) * 1000 });

// town centres (cantón seats); `label` places the name around the dot
const PLACES: Record<string, { lat: number; lon: number; label: "n" | "s" | "w" | "e" }> = {
  "San José": { lat: 9.9325, lon: -84.0796, label: "n" },
  Escazú: { lat: 9.9189, lon: -84.1398, label: "s" },
  "Santa Ana": { lat: 9.9325, lon: -84.1825, label: "n" },
  Heredia: { lat: 9.9981, lon: -84.117, label: "n" },
  Curridabat: { lat: 9.9136, lon: -84.0358, label: "s" },
  Cartago: { lat: 9.8644, lon: -83.9194, label: "n" },
};

// 10 km at ~9.9°N is 0.0912° of longitude
const SCALE_10KM = 91.2;

export default function PilotMap({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (zone: string) => void;
}) {
  return (
    <div className="mb-5 max-md:hidden">
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="pilot-map block h-auto w-full">
        {/* graticule every 0.1° */}
        <g stroke="rgba(33,43,60,.09)" strokeWidth="1">
          {[50, 150, 250, 350].map((x) => (
            <line key={x} x1={x} x2={x} y1={0} y2={H} />
          ))}
          {[50, 150].map((y) => (
            <line key={y} x1={0} x2={W} y1={y} y2={y} />
          ))}
        </g>
        {/* north and scale */}
        <g className="pilot-map-meta" fill="#70685c" stroke="#70685c">
          <path d="M386 12 l4 10 l-4 -2.5 l-4 2.5 z" stroke="none" />
          <text x={386} y={34} textAnchor="middle" stroke="none">
            N
          </text>
          <path d={`M14 ${H - 14} v-4 M14 ${H - 14} h${SCALE_10KM} M${14 + SCALE_10KM} ${H - 14} v-4`} fill="none" strokeWidth="1" />
          <text x={14 + SCALE_10KM / 2} y={H - 22} textAnchor="middle" stroke="none">
            10 km
          </text>
        </g>
        {LAUNCH_ZONES.map((zone) => {
          const place = PLACES[zone];
          if (!place) return null;
          const { x, y } = at(place.lat, place.lon);
          const on = selected.includes(zone);
          const dy = place.label === "n" ? -14 : place.label === "s" ? 22 : 4;
          const dx = place.label === "w" ? -12 : place.label === "e" ? 12 : 0;
          const anchor = place.label === "w" ? "end" : place.label === "e" ? "start" : "middle";
          return (
            <g key={zone} className={`pilot-map-dot ${on ? "is-on" : ""}`} onClick={() => onToggle(zone)}>
              {/* generous invisible hit area */}
              <circle cx={x} cy={y} r={16} fill="transparent" />
              <circle className="pilot-map-pulse" cx={x} cy={y} r={7} />
              <circle className="pilot-map-ring" cx={x} cy={y} r={6.5} />
              <text x={x + dx} y={y + dy} textAnchor={anchor} className="pilot-map-label">
                {zone}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

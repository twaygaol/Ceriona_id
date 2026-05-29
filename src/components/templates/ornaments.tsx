import type { TemplateSectionProps } from "@/types/template";
import { templateThemePresets } from "@/services/templateThemeService";

// ─── Theme detection ──────────────────────────────────────────────────────────

type VisualTheme = NonNullable<TemplateSectionProps["template"]>["layout"]["visualTheme"];

function getOrnamentSvg(template: TemplateSectionProps["template"] | undefined, type: "headerSvg" | "footerSvg" | "dividerSvg" | "cornerSvg"): string | null {
  const themeKey = template?.layout?.visualTheme;
  if (!themeKey) return null;
  const preset = templateThemePresets.find((p) => p.key === themeKey);
  if (!preset?.ornaments) return null;
  return preset.ornaments[type] ?? null;
}

export function getPatternClass(template: TemplateSectionProps["template"] | undefined): string | null {
  const themeKey = template?.layout?.visualTheme;
  if (!themeKey) return null;
  const preset = templateThemePresets.find((p) => p.key === themeKey);
  if (!preset?.ornaments?.patternClass) return null;
  return preset.ornaments.patternClass;
}

function SvgInline({ svg, className = "" }: { svg: string; className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: svg }} aria-hidden="true" />;
}

function themeName(template?: TemplateSectionProps["template"]): string | undefined {
  return template?.layout?.visualTheme;
}

// ─── Sunda Priangan ───────────────────────────────────────────────────────────

export function SundaDivider() {
  const trisUp = Array.from({ length: 30 }, (_, i) => {
    const x = i * 16;
    return <polygon key={`u${i}`} points={`${x},0 ${x + 16},0 ${x + 8},12`} />;
  });
  const trisDown = Array.from({ length: 30 }, (_, i) => {
    const x = i * 16;
    return <polygon key={`d${i}`} points={`${x + 8},28 ${x + 24},28 ${x + 16},16`} />;
  });
  return (
    <div className="my-0 h-7 w-full overflow-hidden" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 28" preserveAspectRatio="none" className="h-full w-full">
        <g fill="#C9A84C" opacity="0.65">{trisUp}</g>
        <g fill="#7A9B5E" opacity="0.45">{trisDown}</g>
        <line x1="0" y1="14" x2="480" y2="14" stroke="#F5EFE0" strokeWidth="0.4" opacity="0.3" />
      </svg>
    </div>
  );
}

export function SundaHeader() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-20 overflow-hidden" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 80" preserveAspectRatio="none" className="h-full w-full">
        <rect width="800" height="80" fill="#2A3D2E" />
        {Array.from({ length: 50 }, (_, i) => {
          const x = i * 16;
          return <polygon key={i} points={`${x},0 ${x + 16},0 ${x + 8},14`} fill="#C9A84C" opacity={i % 2 === 0 ? "0.6" : "0.3"} />;
        })}
        <line x1="0" y1="14" x2="800" y2="14" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4" />
        <line x1="0" y1="74" x2="800" y2="74" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4" />
        {Array.from({ length: 25 }, (_, i) => {
          const cx = i * 32 + 16;
          return (
            <g key={`k${i}`} fill="none" stroke="#7A9B5E" strokeWidth="0.6" opacity="0.35">
              <circle cx={cx} cy={44} r="10" />
              <circle cx={cx} cy={44} r="6" />
              <circle cx={cx} cy={44} r="2" fill="#C9A84C" stroke="none" opacity="0.4" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function SundaFooterBar() {
  return (
    <div className="h-16 w-full overflow-hidden" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 64" preserveAspectRatio="none" className="h-full w-full">
        <rect width="800" height="64" fill="#2A3D2E" />
        <line x1="0" y1="6" x2="800" y2="6" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
        {Array.from({ length: 50 }, (_, i) => {
          const x = i * 16;
          return <polygon key={i} points={`${x + 8},58 ${x + 24},58 ${x + 16},40`} fill="#C9A84C" opacity={i % 2 === 0 ? "0.55" : "0.25"} />;
        })}
        {Array.from({ length: 26 }, (_, i) => {
          const x = i * 32;
          return (
            <g key={`w${i}`} stroke="#7A9B5E" strokeWidth="0.5" opacity="0.2">
              <line x1={x} y1="10" x2={x + 24} y2="38" />
              <line x1={x + 24} y1="10" x2={x} y2="38" />
            </g>
          );
        })}
        <line x1="0" y1="58" x2="800" y2="58" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  );
}

export function SundaCorner({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute h-24 w-24 ${className}`} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" className="h-full w-full">
        <path d="M0,0 L96,0 L0,96 Z" fill="#7A9B5E" opacity="0.06" />
        <path d="M0,0 L60,0 L0,60 Z" fill="#7A9B5E" opacity="0.09" />
        <path d="M0,0 L32,0 L0,32 Z" fill="#C9A84C" opacity="0.12" />
        <line x1="0" y1="0" x2="80" y2="0" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4" />
        <line x1="0" y1="0" x2="0" y2="80" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4" />
        <polygon points="4,0 20,0 12,10" fill="#C9A84C" opacity="0.35" />
        <polygon points="20,0 36,0 28,10" fill="#C9A84C" opacity="0.2" />
        <polygon points="0,4 0,20 10,12" fill="#C9A84C" opacity="0.35" />
        <circle cx="18" cy="18" r="5" fill="#C9A84C" opacity="0.45" />
        <ellipse cx="11" cy="18" rx="3.5" ry="2" fill="#C9A84C" opacity="0.3" />
        <ellipse cx="25" cy="18" rx="3.5" ry="2" fill="#C9A84C" opacity="0.3" />
        <ellipse cx="18" cy="11" rx="2" ry="3.5" fill="#C9A84C" opacity="0.3" />
        <ellipse cx="18" cy="25" rx="2" ry="3.5" fill="#C9A84C" opacity="0.3" />
        <circle cx="18" cy="18" r="2" fill="#F5EFE0" opacity="0.5" />
        <circle cx="36" cy="8" r="1.5" fill="#7A9B5E" opacity="0.3" />
        <circle cx="8" cy="36" r="1.5" fill="#7A9B5E" opacity="0.3" />
      </svg>
    </div>
  );
}

export function SundaMelati({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className={`size-10 ${className}`}>
      <circle cx="20" cy="20" r="4" fill="#C9A84C" opacity="0.8" />
      <ellipse cx="20" cy="10" rx="3" ry="7" fill="#C9A84C" opacity="0.4" />
      <ellipse cx="20" cy="30" rx="3" ry="7" fill="#C9A84C" opacity="0.4" />
      <ellipse cx="10" cy="20" rx="7" ry="3" fill="#C9A84C" opacity="0.4" />
      <ellipse cx="30" cy="20" rx="7" ry="3" fill="#C9A84C" opacity="0.4" />
      <ellipse cx="13" cy="13" rx="3" ry="6" fill="#C9A84C" opacity="0.28" transform="rotate(45 13 13)" />
      <ellipse cx="27" cy="13" rx="3" ry="6" fill="#C9A84C" opacity="0.28" transform="rotate(-45 27 13)" />
      <ellipse cx="13" cy="27" rx="3" ry="6" fill="#C9A84C" opacity="0.28" transform="rotate(-45 13 27)" />
      <ellipse cx="27" cy="27" rx="3" ry="6" fill="#C9A84C" opacity="0.28" transform="rotate(45 27 27)" />
      <circle cx="20" cy="20" r="2" fill="#F5EFE0" opacity="0.6" />
    </svg>
  );
}

// ─── Batak ────────────────────────────────────────────────────────────────────

export function BatakDivider() {
  return (
    <div className="my-0 h-10 w-full overflow-hidden" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 40" preserveAspectRatio="none" className="h-full w-full">
        <rect width="800" height="40" fill="transparent" />
        <g fill="#C9A84C" opacity="0.35">
          {Array.from({ length: 50 }, (_, i) => {
            const x = i * 16;
            return (<polygon key={i} points={`${x + 4},4 ${x + 12},4 ${x + 8},18`} opacity={i % 2 === 0 ? "0.6" : "0.25"} />);
          })}
          {Array.from({ length: 50 }, (_, i) => {
            const x = i * 16;
            return (<polygon key={`d${i}`} points={`${x + 4},36 ${x + 12},36 ${x + 8},22`} opacity={i % 2 === 0 ? "0.25" : "0.6"} />);
          })}
        </g>
        <g fill="#5C1A1B" opacity="0.45">
          {Array.from({ length: 25 }, (_, i) => {
            const x = i * 32 + 8;
            return (<rect key={i} x={x - 3} y="14" width="6" height="12" transform={`rotate(45,${x},20)`} />);
          })}
        </g>
        <line x1="0" y1="20" x2="800" y2="20" stroke="#C9A84C" strokeWidth="0.4" opacity="0.3" />
      </svg>
    </div>
  );
}

export function BatakHeader() {
  return (
    <div className="h-20 w-full overflow-hidden" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 80" preserveAspectRatio="none" className="h-full w-full">
        <rect width="800" height="80" fill="#1A0A0B" />
        <line x1="0" y1="6" x2="800" y2="6" stroke="#C9A84C" strokeWidth="1.2" />
        <line x1="0" y1="74" x2="800" y2="74" stroke="#C9A84C" strokeWidth="1.2" />
        <g fill="#C9A84C" opacity="0.3">
          {Array.from({ length: 50 }, (_, i) => {
            const x = i * 16;
            return (<polygon key={i} points={`${x + 2},14 ${x + 14},14 ${x + 8},22`} opacity={i % 3 === 0 ? "0.7" : "0.35"} />);
          })}
        </g>
        <g fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity="0.5">
          {Array.from({ length: 20 }, (_, i) => {
            const cx = i * 40 + 20;
            return (<path key={i} d={`M${cx - 8},38 L${cx},30 L${cx + 8},38 L${cx},46 Z`} />);
          })}
        </g>
        <g fill="#5C1A1B" opacity="0.55">
          {Array.from({ length: 50 }, (_, i) => {
            const x = i * 16;
            return (<circle key={i} cx={x + 8} cy={52} r="3" />);
          })}
        </g>
      </svg>
    </div>
  );
}

export function BatakFooterBar() {
  return (
    <div className="h-16 w-full overflow-hidden" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 60" preserveAspectRatio="none" className="h-full w-full">
        <rect width="800" height="60" fill="#1A0A0B" />
        <line x1="0" y1="4" x2="800" y2="4" stroke="#C9A84C" strokeWidth="1.2" />
        <g fill="#C9A84C" opacity="0.22">
          {Array.from({ length: 50 }, (_, i) => {
            const x = i * 16;
            return (<polygon key={i} points={`${x + 4},10 ${x + 12},10 ${x + 8},26`} />);
          })}
        </g>
        <g fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity="0.55">
          {Array.from({ length: 20 }, (_, i) => {
            const cx = i * 40 + 20;
            return (<path key={i} d={`M${cx - 8},38 L${cx},30 L${cx + 8},38 L${cx},46 Z`} />);
          })}
        </g>
        <g fill="#5C1A1B" opacity="0.5">
          {Array.from({ length: 26 }, (_, i) => {
            const x = i * 32 + 8;
            return (<circle key={i} cx={x} cy={48} r="2.5" />);
          })}
        </g>
        <line x1="0" y1="56" x2="800" y2="56" stroke="#C9A84C" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

export function BatakCorner({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute h-24 w-24 ${className}`} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" className="h-full w-full">
        <path d="M0,0 L72,0 L0,72 Z" fill="#5C1A1B" opacity="0.12" />
        <path d="M0,0 L48,0 L0,48 Z" fill="#5C1A1B" opacity="0.18" />
        <path d="M0,0 L28,0 L0,28 Z" fill="#C9A84C" opacity="0.12" />
        <line x1="0" y1="0" x2="72" y2="0" stroke="#C9A84C" strokeWidth="1.2" opacity="0.6" />
        <line x1="0" y1="0" x2="0" y2="72" stroke="#C9A84C" strokeWidth="1.2" opacity="0.6" />
        <path d="M8,8 L28,8 L8,28 Z" fill="none" stroke="#C9A84C" strokeWidth="0.6" opacity="0.35" />
        <circle cx="18" cy="18" r="5" fill="#C9A84C" opacity="0.5" />
        <circle cx="18" cy="18" r="2.5" fill="#5C1A1B" opacity="0.6" />
        <circle cx="34" cy="8" r="2" fill="#C9A84C" opacity="0.25" />
        <circle cx="8" cy="34" r="2" fill="#C9A84C" opacity="0.25" />
        <rect x="3" y="3" width="8" height="8" transform="rotate(45,7,7)" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.3" />
      </svg>
    </div>
  );
}

export function BatakGorgaFlower({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className={`size-10 ${className}`}>
      <circle cx="20" cy="20" r="4" fill="#C9A84C" opacity="0.7" />
      <path d="M20,4 L24,16 L36,20 L24,24 L20,36 L16,24 L4,20 L16,16 Z" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.45" />
      <path d="M20,8 L22,16 L30,20 L22,24 L20,32 L18,24 L10,20 L18,16 Z" fill="none" stroke="#5C1A1B" strokeWidth="0.6" opacity="0.4" />
      <circle cx="20" cy="20" r="2" fill="#F7EBDD" opacity="0.5" />
      <circle cx="14" cy="14" r="1.5" fill="#C9A84C" opacity="0.3" />
      <circle cx="26" cy="14" r="1.5" fill="#C9A84C" opacity="0.3" />
      <circle cx="14" cy="26" r="1.5" fill="#C9A84C" opacity="0.3" />
      <circle cx="26" cy="26" r="1.5" fill="#C9A84C" opacity="0.3" />
    </svg>
  );
}

// ─── Jawa (adat-jawa-royal) ───────────────────────────────────────────────────

export function JawaDivider() {
  return (
    <div className="my-0 h-10 w-full overflow-hidden" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 40" preserveAspectRatio="none" className="h-full w-full">
        <rect width="800" height="40" fill="transparent" />
        {Array.from({ length: 40 }, (_, i) => {
          const x = i * 20;
          return (<g key={i} opacity="0.35"><path d={`M${x},0 L${x + 20},0 L${x + 10},40 L${x - 10},40 Z`} fill={i % 2 === 0 ? "#D6A94F" : "#6B3D1F"} /></g>);
        })}
        <line x1="0" y1="4" x2="800" y2="4" stroke="#D6A94F" strokeWidth="0.8" opacity="0.5" />
        <line x1="0" y1="36" x2="800" y2="36" stroke="#D6A94F" strokeWidth="0.8" opacity="0.5" />
        <g fill="none" stroke="#D6A94F" strokeWidth="0.6" opacity="0.4">
          {Array.from({ length: 20 }, (_, i) => {
            const cx = i * 40 + 20;
            return (<g key={`k${i}`}>
              <circle cx={cx - 6} cy={16} r="3" />
              <circle cx={cx + 6} cy={16} r="3" />
              <circle cx={cx - 6} cy={24} r="3" />
              <circle cx={cx + 6} cy={24} r="3" />
            </g>);
          })}
        </g>
      </svg>
    </div>
  );
}

export function JawaHeader() {
  return (
    <div className="h-20 w-full overflow-hidden" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 80" preserveAspectRatio="none" className="h-full w-full">
        <rect width="800" height="80" fill="#140A06" />
        {Array.from({ length: 10 }, (_, i) => {
          const cx = i * 80 + 40;
          return (<g key={i} opacity="0.6">
            <path d={`M${cx - 30},78 L${cx - 15},18 L${cx},4 L${cx + 15},18 L${cx + 30},78 Z`} fill="none" stroke="#D6A94F" strokeWidth="0.8" />
            <path d={`M${cx - 20},78 L${cx - 8},22 L${cx},10 L${cx + 8},22 L${cx + 20},78 Z`} fill="none" stroke="#D6A94F" strokeWidth="0.4" opacity="0.5" />
          </g>);
        })}
        <line x1="0" y1="6" x2="800" y2="6" stroke="#D6A94F" strokeWidth="1" opacity="0.7" />
        <line x1="0" y1="74" x2="800" y2="74" stroke="#D6A94F" strokeWidth="1" opacity="0.7" />
        {Array.from({ length: 30 }, (_, i) => {
          const x = i * 28 + 14;
          return (<g key={`m${i}`} fill="#D6A94F" opacity="0.3">
            <circle cx={x} cy={38} r="1.5" />
            <circle cx={x - 3} cy={36} r="1" />
            <circle cx={x + 3} cy={36} r="1" />
            <circle cx={x} cy={34} r="1" />
          </g>);
        })}
      </svg>
    </div>
  );
}

export function JawaFooterBar() {
  return (
    <div className="h-16 w-full overflow-hidden" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 60" preserveAspectRatio="none" className="h-full w-full">
        <rect width="800" height="60" fill="#140A06" />
        <line x1="0" y1="4" x2="800" y2="4" stroke="#D6A94F" strokeWidth="1.2" opacity="0.6" />
        {Array.from({ length: 40 }, (_, i) => {
          const x = i * 20;
          return (<g key={i} opacity="0.25"><path d={`M${x},8 L${x + 12},8 L${x + 6},52 L${x - 6},52 Z`} fill={i % 2 === 0 ? "#D6A94F" : "#6B3D1F"} /></g>);
        })}
        {Array.from({ length: 16 }, (_, i) => {
          const cx = i * 50 + 25;
          return (<g key={`f${i}`} fill="#D6A94F" opacity="0.35">
            <circle cx={cx} cy={36} r="3" />
            {[30, 34, 38, 42].map((dx, j) => (<circle key={j} cx={cx + (j < 2 ? -2 : 2)} cy={j % 2 === 0 ? 34 : 38} r="1.2" />))}
          </g>);
        })}
        <line x1="0" y1="56" x2="800" y2="56" stroke="#D6A94F" strokeWidth="1.2" opacity="0.6" />
      </svg>
    </div>
  );
}

export function JawaCorner({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute h-24 w-24 ${className}`} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" className="h-full w-full">
        <path d="M0,0 L96,0 L0,96 Z" fill="transparent" />
        <path d="M0,0 L72,0 L0,72 Z" fill="#D6A94F" opacity="0.06" />
        <path d="M0,0 L48,0 L0,48 Z" fill="#D6A94F" opacity="0.1" />
        <path d="M0,0 L28,0 L0,28 Z" fill="#D6A94F" opacity="0.2" />
        <line x1="0" y1="0" x2="72" y2="0" stroke="#D6A94F" strokeWidth="0.8" opacity="0.5" />
        <line x1="0" y1="0" x2="0" y2="72" stroke="#D6A94F" strokeWidth="0.8" opacity="0.5" />
        <g fill="#D6A94F" opacity="0.6">
          <circle cx="16" cy="16" r="5" />
          <ellipse cx="10" cy="16" rx="3" ry="2" />
          <ellipse cx="22" cy="16" rx="3" ry="2" />
          <ellipse cx="16" cy="10" rx="2" ry="3" />
          <ellipse cx="16" cy="22" rx="2" ry="3" />
        </g>
        <circle cx="32" cy="6" r="1.5" fill="#D6A94F" opacity="0.3" />
        <circle cx="6" cy="32" r="1.5" fill="#D6A94F" opacity="0.3" />
      </svg>
    </div>
  );
}

export function JawaFlowerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className={`size-10 ${className}`}>
      <circle cx="20" cy="20" r="4" fill="#D6A94F" opacity="0.6" />
      <ellipse cx="12" cy="20" rx="3" ry="2" fill="#D6A94F" opacity="0.4" />
      <ellipse cx="28" cy="20" rx="3" ry="2" fill="#D6A94F" opacity="0.4" />
      <ellipse cx="20" cy="12" rx="2" ry="3" fill="#D6A94F" opacity="0.4" />
      <ellipse cx="20" cy="28" rx="2" ry="3" fill="#D6A94F" opacity="0.4" />
    </svg>
  );
}

// ─── Adat Jawa Classic Luxury ─────────────────────────────────────────────────

export function JawaClassicDivider() {
  return (
    <div className="my-0 h-6 w-full overflow-hidden" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 24" preserveAspectRatio="none" className="h-full w-full">
        <line x1="0" y1="12" x2="340" y2="12" stroke="#C9A646" strokeWidth="0.5" opacity="0.4" />
        <line x1="460" y1="12" x2="800" y2="12" stroke="#C9A646" strokeWidth="0.5" opacity="0.4" />
        <circle cx="370" cy="12" r="2.5" fill="#C9A646" opacity="0.4" />
        <circle cx="380" cy="10" r="1.5" fill="#4F845E" opacity="0.3" />
        <circle cx="390" cy="12" r="2.5" fill="#C9A646" opacity="0.4" />
        <circle cx="400" cy="8" r="3" fill="#C9A646" opacity="0.5" />
        <circle cx="410" cy="12" r="2.5" fill="#C9A646" opacity="0.4" />
        <circle cx="420" cy="10" r="1.5" fill="#4F845E" opacity="0.3" />
        <circle cx="430" cy="12" r="2.5" fill="#C9A646" opacity="0.4" />
      </svg>
    </div>
  );
}

export function JawaClassicCorner({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute h-20 w-20 ${className}`} aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" className="h-full w-full">
        <path d="M0,0 L60,0 L0,60 Z" fill="#C9A646" opacity="0.05" />
        <path d="M0,0 L40,0 L0,40 Z" fill="#C9A646" opacity="0.08" />
        <line x1="0" y1="0" x2="60" y2="0" stroke="#C9A646" strokeWidth="0.5" opacity="0.35" />
        <line x1="0" y1="0" x2="0" y2="60" stroke="#C9A646" strokeWidth="0.5" opacity="0.35" />
        <g fill="#C9A646" opacity="0.35">
          <circle cx="14" cy="14" r="3" />
          <ellipse cx="9" cy="14" rx="2" ry="1.5" />
          <ellipse cx="19" cy="14" rx="2" ry="1.5" />
          <ellipse cx="14" cy="9" rx="1.5" ry="2" />
          <ellipse cx="14" cy="19" rx="1.5" ry="2" />
        </g>
      </svg>
    </div>
  );
}

export function JawaClassicFlower({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={`size-8 ${className}`}>
      <circle cx="16" cy="16" r="3" fill="#4F845E" opacity="0.5" />
      <circle cx="10" cy="16" r="2" fill="#C9A646" opacity="0.3" />
      <circle cx="22" cy="16" r="2" fill="#C9A646" opacity="0.3" />
      <circle cx="16" cy="10" r="2" fill="#C9A646" opacity="0.3" />
      <circle cx="16" cy="22" r="2" fill="#C9A646" opacity="0.3" />
    </svg>
  );
}

export function JawaClassicHeader() {
  return (
    <div className="h-12 w-full overflow-hidden" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 48" preserveAspectRatio="none" className="h-full w-full">
        <rect width="800" height="48" fill="#4F845E" opacity="0.95" />
        <line x1="0" y1="6" x2="800" y2="6" stroke="#C9A646" strokeWidth="0.6" opacity="0.5" />
        <line x1="0" y1="42" x2="800" y2="42" stroke="#C9A646" strokeWidth="0.6" opacity="0.5" />
        {Array.from({ length: 20 }, (_, i) => {
          const cx = i * 40 + 20;
          return <circle key={i} cx={cx} cy={24} r="1.5" fill="#C9A646" opacity="0.25" />;
        })}
      </svg>
    </div>
  );
}

export function JawaClassicFooterBar() {
  return (
    <div className="h-12 w-full overflow-hidden" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 48" preserveAspectRatio="none" className="h-full w-full">
        <rect width="800" height="48" fill="#4F845E" opacity="0.95" />
        <line x1="0" y1="4" x2="800" y2="4" stroke="#C9A646" strokeWidth="0.6" opacity="0.5" />
        <line x1="0" y1="44" x2="800" y2="44" stroke="#C9A646" strokeWidth="0.6" opacity="0.5" />
        {Array.from({ length: 16 }, (_, i) => {
          const cx = i * 50 + 25;
          return (<g key={i} fill="#C9A646" opacity="0.2"><circle cx={cx} cy={24} r="2" /></g>);
        })}
      </svg>
    </div>
  );
}

// ─── Dynamic ornament renderers ───────────────────────────────────────────────

export function DynamicDivider({ template }: { template?: TemplateSectionProps["template"] }) {
  const svg = getOrnamentSvg(template, "dividerSvg");
  if (svg) return <SvgInline svg={svg} className="my-0 w-full overflow-hidden" />;
  const t = themeName(template);
  switch (t) {
    case "sunda-priangan": return <SundaDivider />;
    case "adat-batak-ulos": return <BatakDivider />;
    case "adat-jawa-royal": return <JawaDivider />;
    case "adat-jawa-classic-luxury": return <JawaClassicDivider />;
    default: return null;
  }
}

export function DynamicCorner({ className = "", template }: { className?: string; template?: TemplateSectionProps["template"] }) {
  const svg = getOrnamentSvg(template, "cornerSvg");
  if (svg) return <SvgInline svg={svg} className={`pointer-events-none absolute ${className}`} />;
  const t = themeName(template);
  switch (t) {
    case "sunda-priangan": return <SundaCorner className={className} />;
    case "adat-batak-ulos": return <BatakCorner className={className} />;
    case "adat-jawa-royal": return <JawaCorner className={className} />;
    case "adat-jawa-classic-luxury": return <JawaClassicCorner className={className} />;
    default: return null;
  }
}

export function DynamicFlower({ className = "", template }: { className?: string; template?: TemplateSectionProps["template"] }) {
  const t = themeName(template);
  switch (t) {
    case "sunda-priangan": return <SundaMelati className={className} />;
    case "adat-jawa-royal": return <JawaFlowerOrnament className={className} />;
    case "adat-jawa-classic-luxury": return <JawaClassicFlower className={className} />;
    case "adat-batak-ulos": return <BatakGorgaFlower className={className} />;
    default: return null;
  }
}

export function DynamicHeader({ template }: { template?: TemplateSectionProps["template"] }) {
  const svg = getOrnamentSvg(template, "headerSvg");
  if (svg) return <SvgInline svg={svg} className="w-full overflow-hidden" />;
  const t = themeName(template);
  switch (t) {
    case "sunda-priangan": return <SundaHeader />;
    case "adat-batak-ulos": return <BatakHeader />;
    case "adat-jawa-royal": return <JawaHeader />;
    case "adat-jawa-classic-luxury": return <JawaClassicHeader />;
    default: return null;
  }
}

export function DynamicFooterBar({ template }: { template?: TemplateSectionProps["template"] }) {
  const svg = getOrnamentSvg(template, "footerSvg");
  if (svg) return <SvgInline svg={svg} className="w-full overflow-hidden" />;
  const t = themeName(template);
  switch (t) {
    case "sunda-priangan": return <SundaFooterBar />;
    case "adat-batak-ulos": return <BatakFooterBar />;
    case "adat-jawa-royal": return <JawaFooterBar />;
    case "adat-jawa-classic-luxury": return <JawaClassicFooterBar />;
    default: return null;
  }
}

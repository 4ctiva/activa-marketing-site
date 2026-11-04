import type { CSSProperties, ImgHTMLAttributes } from "react";
import meditation480 from "../../../assets/optimized/meditation-480w.webp";
import meditation720 from "../../../assets/optimized/meditation-720w.webp";
import meditation1400 from "../../../assets/optimized/meditation-1400w.webp";
import companyWellness480 from "../../../assets/optimized/company-wellness-480w.webp";
import companyWellness720 from "../../../assets/optimized/company-wellness-720w.webp";
import companyWellness1400 from "../../../assets/optimized/company-wellness-1400w.webp";
import strengthTraining480 from "../../../assets/optimized/strength-training-480w.webp";
import strengthTraining720 from "../../../assets/optimized/strength-training-720w.webp";
import strengthTraining1400 from "../../../assets/optimized/strength-training-1400w.webp";
import boxing480 from "../../../assets/optimized/boxing-480w.webp";
import boxing720 from "../../../assets/optimized/boxing-720w.webp";
import boxing1400 from "../../../assets/optimized/boxing-1400w.webp";
import poolRecovery480 from "../../../assets/optimized/pool-recovery-480w.webp";
import poolRecovery720 from "../../../assets/optimized/pool-recovery-720w.webp";
import poolRecovery1400 from "../../../assets/optimized/pool-recovery-1400w.webp";

/*
 * Section photos: 480/720/1400w WebP variants (phones stop downloading the
 * 1400w file), plus the photo's average colour and a ~200-byte 24px preview
 * shown while it loads, so a reveal never opens onto an empty box.
 * Regenerate the variants and these values with cwebp/dwebp if a photo changes.
 */
type PhotoData = { src: string; srcSet: string; color: string; preview: string };

const photo = (w480: string, w720: string, w1400: string, color: string, preview: string): PhotoData => ({
  src: w1400,
  srcSet: `${w480} 480w, ${w720} 720w, ${w1400} 1400w`,
  color,
  preview: `data:image/webp;base64,${preview}`,
});

export const PHOTOS = {
  meditation: photo(meditation480, meditation720, meditation1400, "#afa49b", "UklGRpgAAABXRUJQVlA4IIwAAAAwBQCdASoYABQAPwFwrFErJiQiqA1RYCAJQBA0AI9H3+cI0av0LfR+uSX9xAQtbl8fAAD+Ut/qTDPkwLutISVoxRg/geZDpFnUqg2vGHWEMyW2vI8Mu0M/stxh0F3AwSi58vH56vaGhD/fWvzOyRxJageLBbGpAnO4SH0pTTCrEDp0IPyPRBgjwAAAAA=="),
  companyWellness: photo(companyWellness480, companyWellness720, companyWellness1400, "#56545c", "UklGRpgAAABXRUJQVlA4IIwAAABQBQCdASoYABEAPwForlGrJSQisBgIAWAgCWUAyrQQ9L4c5S+scMSHQ8L8bUSQsyzQRgAA/uWoIi+NCWSDbpNeSQXR8mClBEQbU4UVgYfErVzz+fJBwqIZHpzaGQWbbAR2/aymaxopCPnWlPWGg+YftDwadk+AhREXYi92SGBWAhp1QHAm7hN0doAAAA=="),
  strengthTraining: photo(strengthTraining480, strengthTraining720, strengthTraining1400, "#49524a", "UklGRpIAAABXRUJQVlA4IIYAAACwBACdASoYABEAPwFws1GrJiSiqAqpYCAJZwDNSA8qtpWZSB74tDEJosD1xeVAAP5xsLC4S2AZyjXHP1iKIy/Uoj6P1woJRq2d7swnmSqQv0N/pPHzeIOrmZNfdqF1q7TQzSEBfQ5sVBrzuzXCqbXJfopEDNsmk6WCVY+n/oCFDXuAzEAAAA=="),
  boxing: photo(boxing480, boxing720, boxing1400, "#513d33", "UklGRvwAAABXRUJQVlA4IPAAAABwBgCdASoYACQAPwFmrVCrJSQitVQIAWAgCWMAxkAIAfKJJsEvqwaWxHjA/tqIPvlWkGdtioMPUk7hjXAA/uY7k9FZBOl9S4NBxIM4/WvmYGV/VkfXbUUpW5qGSy2buqBYRZuB9UzDLktyALtXq9LlO5CHgdPXNXYrZGlPphon0Z9A2klCqmDgBXLB8bFoZyrmOoeGnj6lw0qBXENgaQeSeMsjZQGm02qr09U/1FtGoC9b42rSq5bMsE+W9RBeqIDmHpsBnvcGSqBw4AVdCV0y8h4kYdC9OmdisJkBZJr8h5g2NJT+1KlA4Ow70AAAAAA="),
  poolRecovery: photo(poolRecovery480, poolRecovery720, poolRecovery1400, "#665843", "UklGRnYAAABXRUJQVlA4IGoAAADQAwCdASoYAA4ALsGAwGAjqysrCwDASgCdADcHVlW1Q9f/bIXVXgAA/uv/P09Y4FLtSSsfi0a5v1k/6OT0LUewTYeva7zodww4KQ+E3uoNdltQyXr6eWOL6GlYZZ8eYrR6R1A0HCF/wAAA"),
};

/** Lazy section photo with responsive sources and a blurred placeholder behind it. */
export function Photo({
  photo: p,
  position = "center",
  // the two-column rows only split from ~1140px wide (body zoom 1.15); below that photos span the content width
  sizes = "(max-width: 1140px) 92vw, 46vw",
  className = "",
  ...rest
}: { photo: PhotoData; position?: string; sizes?: string } & ImgHTMLAttributes<HTMLImageElement>) {
  const style: CSSProperties = {
    objectPosition: position,
    backgroundColor: p.color,
    backgroundImage: `url("${p.preview}")`,
    backgroundSize: "cover",
    backgroundPosition: position,
  };
  return (
    <img
      src={p.src}
      srcSet={p.srcSet}
      sizes={sizes}
      loading="lazy"
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
      style={style}
      {...rest}
    />
  );
}

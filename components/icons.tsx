import type { SVGProps } from "react";

type WhatsAppIconProps = SVGProps<SVGSVGElement> & {
  variant?: "black" | "white";
};

export function WhatsAppIcon({ variant = "black", ...props }: WhatsAppIconProps) {
  return (
    <svg viewBox="0 0 720 720" aria-hidden="true" focusable="false" {...props}>
      <image
        href={`/icons/whatsapp-glyph-${variant}.svg`}
        width="720"
        height="720"
      />
    </svg>
  );
}

export function TireIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 3.75v3.1M12 17.15v3.1M3.75 12h3.1M17.15 12h3.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m6.15 6.15 2.2 2.2m7.3 7.3 2.2 2.2m0-11.7-2.2 2.2m-7.3 7.3-2.2 2.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export type AnalyticsEvent =
  | "whatsapp_click"
  | "phone_click"
  | "quote_submit"
  | "route_click"
  | "google_profile_click";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (event: AnalyticsEvent, parameters: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return;

  window.dataLayer?.push({ event, ...parameters });
  window.gtag?.("event", event, parameters);
  window.fbq?.("trackCustom", event, parameters);
};

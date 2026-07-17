export const BOOKING_EVENT = "lubri:open-booking";

export function openBookingFlow(preselect?: string) {
  window.dispatchEvent(new CustomEvent(BOOKING_EVENT, { detail: { preselect } }));
  document.getElementById("orcamento")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

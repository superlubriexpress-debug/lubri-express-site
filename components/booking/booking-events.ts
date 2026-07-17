export const BOOKING_EVENT = "lubri:open-booking";

export function openBookingFlow(preselect?: string) {
  window.dispatchEvent(new CustomEvent(BOOKING_EVENT, { detail: { preselect } }));
  const quoteSection = document.getElementById("orcamento");
  if (quoteSection) {
    quoteSection.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  window.location.href = "/#orcamento";
}

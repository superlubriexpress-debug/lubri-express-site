export const BOOKING_EVENT = "lubri:open-booking";

export function openBookingModal(preselect?: string) {
  window.dispatchEvent(new CustomEvent(BOOKING_EVENT, { detail: { preselect } }));
}

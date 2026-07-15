"use client";

import dynamic from "next/dynamic";

const BookingModal = dynamic(() => import("@/components/booking/booking-modal").then((mod) => mod.BookingModal), {
  ssr: false,
});

export function BookingModalLoader() {
  return <BookingModal />;
}

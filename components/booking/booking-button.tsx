"use client";

import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";

import { openBookingModal } from "@/components/booking/booking-events";
import { Button, type ButtonProps } from "@/components/ui/button";

type BookingButtonProps = ButtonProps & {
  serviceId?: string;
  children?: ReactNode;
};

export function BookingButton({ serviceId, children = "Agendar serviço", type = "button", ...props }: BookingButtonProps) {
  return (
    <Button type={type} onClick={() => openBookingModal(serviceId)} {...props}>
      <MessageCircle className="h-4 w-4" />
      {children}
    </Button>
  );
}

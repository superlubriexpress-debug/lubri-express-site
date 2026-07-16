"use client";

import type { ReactNode } from "react";

import { openBookingModal } from "@/components/booking/booking-events";
import { WhatsAppIcon } from "@/components/icons";
import { Button, type ButtonProps } from "@/components/ui/button";

type BookingButtonProps = ButtonProps & {
  serviceId?: string;
  children?: ReactNode;
};

export function BookingButton({ serviceId, children = "Agendar serviço", type = "button", ...props }: BookingButtonProps) {
  const { onClick, ...buttonProps } = props;

  return (
    <Button
      type={type}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          openBookingModal(serviceId);
        }
      }}
      {...buttonProps}
    >
      <WhatsAppIcon className="h-4 w-4" />
      {children}
    </Button>
  );
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

export function AnalyticsClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    window.dataLayer?.push({ event: "virtual_page_view", page_path: pathname });
    window.gtag?.("event", "page_view", { page_path: pathname });
    window.fbq?.("track", "PageView");
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const element = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-analytics-event]");
      const eventName = element?.dataset.analyticsEvent as AnalyticsEvent | undefined;
      if (!eventName || !element) return;
      trackEvent(eventName, { label: element.dataset.analyticsLabel ?? element.textContent?.trim() });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}

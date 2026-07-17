import "server-only";

import { cache } from "react";

import { company } from "@/lib/site-data";
import type { SiteSettings } from "@/lib/site-settings-types";

export type { SiteSettings } from "@/lib/site-settings-types";

export const SITE_SETTINGS_TAG = "site-settings";

export const defaultSiteSettings: SiteSettings = {
  tradeName: company.name,
  legalName: "",
  cnpj: "",
  phoneDisplay: company.phoneDisplay,
  phoneHref: company.phoneHref,
  whatsappDisplay: company.phoneDisplay,
  whatsappHref: company.phoneHref,
  email: "",
  address: company.address,
  city: company.city,
  hoursText: company.hours,
  mapsUrl: company.mapsUrl,
  instagram: company.instagram,
  facebook: company.facebook,
  maintenanceNotice: "",
};

type SiteSettingsRow = {
  trade_name?: string | null;
  legal_name?: string | null;
  cnpj?: string | null;
  phone_display?: string | null;
  phone_href?: string | null;
  whatsapp_display?: string | null;
  whatsapp_href?: string | null;
  email?: string | null;
  address?: string | null;
  city?: string | null;
  hours_text?: string | null;
  maps_url?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  maintenance_notice?: string | null;
};

export const isSupabaseConfigured = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const getSupabaseConfig = () => ({
  url: process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "") ?? "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
});

const mergeSettings = (row?: SiteSettingsRow): SiteSettings => ({
  tradeName: row?.trade_name || defaultSiteSettings.tradeName,
  legalName: row?.legal_name || "",
  cnpj: row?.cnpj || "",
  phoneDisplay: row?.phone_display || defaultSiteSettings.phoneDisplay,
  phoneHref: digitsOnly(row?.phone_href || row?.phone_display || defaultSiteSettings.phoneHref),
  whatsappDisplay: row?.whatsapp_display || row?.phone_display || defaultSiteSettings.whatsappDisplay,
  whatsappHref: digitsOnly(row?.whatsapp_href || row?.whatsapp_display || defaultSiteSettings.whatsappHref),
  email: row?.email || "",
  address: row?.address || defaultSiteSettings.address,
  city: row?.city || defaultSiteSettings.city,
  hoursText: row?.hours_text || defaultSiteSettings.hoursText,
  mapsUrl: row?.maps_url || defaultSiteSettings.mapsUrl,
  instagram: row?.instagram || defaultSiteSettings.instagram,
  facebook: row?.facebook || defaultSiteSettings.facebook,
  maintenanceNotice: row?.maintenance_notice || "",
});

export const getPublicSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!isSupabaseConfigured()) return defaultSiteSettings;

  const { url, anonKey } = getSupabaseConfig();

  try {
    const response = await fetch(`${url}/rest/v1/site_settings?id=eq.main&select=*`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
      next: { revalidate: 300, tags: [SITE_SETTINGS_TAG] },
    });

    if (!response.ok) return defaultSiteSettings;

    const rows = (await response.json()) as SiteSettingsRow[];
    return mergeSettings(rows[0]);
  } catch {
    return defaultSiteSettings;
  }
});

export const digitsOnly = (value: string) => value.replace(/\D/g, "");

export const toDatabaseSettings = (settings: SiteSettings) => ({
  trade_name: settings.tradeName,
  legal_name: settings.legalName || null,
  cnpj: settings.cnpj || null,
  phone_display: settings.phoneDisplay,
  phone_href: digitsOnly(settings.phoneHref || settings.phoneDisplay),
  whatsapp_display: settings.whatsappDisplay,
  whatsapp_href: digitsOnly(settings.whatsappHref || settings.whatsappDisplay),
  email: settings.email || null,
  address: settings.address,
  city: settings.city,
  hours_text: settings.hoursText,
  maps_url: settings.mapsUrl,
  instagram: settings.instagram,
  facebook: settings.facebook,
  maintenance_notice: settings.maintenanceNotice || null,
  updated_at: new Date().toISOString(),
});

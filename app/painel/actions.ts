"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import {
  defaultSiteSettings,
  digitsOnly,
  getSupabaseConfig,
  isSupabaseConfigured,
  SITE_SETTINGS_TAG,
  toDatabaseSettings,
} from "@/lib/site-settings";
import type { SiteSettings } from "@/lib/site-settings-types";
import { clearAdminSession, getCurrentAdmin, refreshAdminSession } from "@/lib/supabase-auth";

const value = (formData: FormData, key: string, maxLength: number) =>
  String(formData.get(key) ?? "").trim().slice(0, maxLength);

const safeUrl = (raw: string, fallback: string) => {
  if (!raw) return fallback;
  try {
    const url = new URL(raw);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : fallback;
  } catch {
    return fallback;
  }
};

export async function updateSiteSettings(formData: FormData) {
  const admin = (await getCurrentAdmin()) ?? (await refreshAdminSession());
  if (!admin) redirect("/login?next=/painel");
  if (!isSupabaseConfigured()) redirect("/painel?error=backend");

  const phoneDisplay = value(formData, "phoneDisplay", 40) || defaultSiteSettings.phoneDisplay;
  const whatsappDisplay = value(formData, "whatsappDisplay", 40) || phoneDisplay;

  const settings: SiteSettings = {
    tradeName: value(formData, "tradeName", 100) || defaultSiteSettings.tradeName,
    legalName: value(formData, "legalName", 140),
    cnpj: value(formData, "cnpj", 30),
    phoneDisplay,
    phoneHref: digitsOnly(phoneDisplay),
    whatsappDisplay,
    whatsappHref: digitsOnly(whatsappDisplay),
    email: value(formData, "email", 160),
    address: value(formData, "address", 220) || defaultSiteSettings.address,
    city: value(formData, "city", 100) || defaultSiteSettings.city,
    hoursText: value(formData, "hoursText", 140) || defaultSiteSettings.hoursText,
    mapsUrl: safeUrl(value(formData, "mapsUrl", 500), defaultSiteSettings.mapsUrl),
    instagram: safeUrl(value(formData, "instagram", 500), defaultSiteSettings.instagram),
    facebook: safeUrl(value(formData, "facebook", 500), defaultSiteSettings.facebook),
    maintenanceNotice: value(formData, "maintenanceNotice", 280),
  };

  if (settings.phoneHref.length < 10 || settings.whatsappHref.length < 10) {
    redirect("/painel?error=telefone");
  }

  const { url, anonKey } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/site_settings?on_conflict=id`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${admin.accessToken}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({ id: "main", ...toDatabaseSettings(settings) }),
    cache: "no-store",
  });

  if (!response.ok) redirect("/painel?error=salvar");

  revalidateTag(SITE_SETTINGS_TAG);
  redirect("/painel?saved=1");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/login");
}

export async function updateAdminProfile(formData: FormData) {
  const admin = (await getCurrentAdmin()) ?? (await refreshAdminSession());
  if (!admin) redirect("/login?next=/painel/administrador");

  const fullName = value(formData, "fullName", 100);
  if (fullName.length < 2) redirect("/painel/administrador?error=nome");

  const { url, anonKey } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/profiles?id=eq.${encodeURIComponent(admin.id)}`, {
    method: "PATCH",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${admin.accessToken}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ full_name: fullName }),
    cache: "no-store",
  });

  if (!response.ok) redirect("/painel/administrador?error=perfil");
  redirect("/painel/administrador?profileSaved=1");
}

export async function changeAdminPassword(formData: FormData) {
  const admin = (await getCurrentAdmin()) ?? (await refreshAdminSession());
  if (!admin) redirect("/login?next=/painel/administrador");

  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("passwordConfirmation") ?? "");

  if (password.length < 12) redirect("/painel/administrador?error=senha-curta");
  if (password !== confirmation) redirect("/painel/administrador?error=senha-diferente");

  const { url, anonKey } = getSupabaseConfig();
  const response = await fetch(`${url}/auth/v1/user`, {
    method: "PUT",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${admin.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
    cache: "no-store",
  });

  if (!response.ok) redirect("/painel/administrador?error=senha");
  redirect("/painel/administrador?passwordSaved=1");
}

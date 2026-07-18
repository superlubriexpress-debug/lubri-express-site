"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import {
  defaultSiteSettings,
  digitsOnly,
  getSupabaseConfig,
  getSupabaseServiceRoleKey,
  isSupabaseConfigured,
  SITE_SETTINGS_TAG,
  toDatabaseSettings,
} from "@/lib/site-settings";
import type { SiteSettings } from "@/lib/site-settings-types";
import { clearAdminSession, getCurrentAdmin, refreshAdminSession } from "@/lib/supabase-auth";

const value = (formData: FormData, key: string, maxLength: number) =>
  String(formData.get(key) ?? "").trim().slice(0, maxLength);

const validRoles = ["owner", "admin", "editor"] as const;
type ProfileRole = (typeof validRoles)[number];

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

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("passwordConfirmation") ?? "");

  if (!currentPassword) redirect("/painel/administrador?error=senha-atual");
  if (password.length < 12) redirect("/painel/administrador?error=senha-curta");
  if (password !== confirmation) redirect("/painel/administrador?error=senha-diferente");

  const { url, anonKey } = getSupabaseConfig();
  const currentPasswordResponse = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: anonKey, "Content-Type": "application/json" },
    body: JSON.stringify({ email: admin.email, password: currentPassword }),
    cache: "no-store",
  });

  if (!currentPasswordResponse.ok) redirect("/painel/administrador?error=senha-atual");

  const freshAuth = (await currentPasswordResponse.json()) as { access_token?: string };
  if (!freshAuth.access_token) redirect("/painel/administrador?error=senha");

  const response = await fetch(`${url}/auth/v1/user`, {
    method: "PUT",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${freshAuth.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
    cache: "no-store",
  });

  if (!response.ok) redirect("/painel/administrador?error=senha");
  await clearAdminSession();
  redirect("/login?passwordSaved=1");
}

export async function createAdminUser(formData: FormData) {
  const admin = (await getCurrentAdmin()) ?? (await refreshAdminSession());
  if (!admin) redirect("/login?next=/painel/administrador");
  if (!["owner", "admin"].includes(admin.role)) redirect("/painel/administrador?error=permissao");

  const fullName = value(formData, "newUserName", 100);
  const email = value(formData, "newUserEmail", 160).toLowerCase();
  const password = String(formData.get("newUserPassword") ?? "");
  const confirmation = String(formData.get("newUserPasswordConfirmation") ?? "");
  const roleInput = value(formData, "newUserRole", 20);
  const role: ProfileRole = validRoles.includes(roleInput as ProfileRole) ? (roleInput as ProfileRole) : "editor";

  if (fullName.length < 2) redirect("/painel/administrador?error=novo-nome");
  if (!email.includes("@") || !email.includes(".")) redirect("/painel/administrador?error=novo-email");
  if (password.length < 12) redirect("/painel/administrador?error=novo-senha-curta");
  if (password !== confirmation) redirect("/painel/administrador?error=novo-senha-diferente");
  if (role === "owner" && admin.role !== "owner") redirect("/painel/administrador?error=permissao");

  const serviceRoleKey = getSupabaseServiceRoleKey();
  if (!serviceRoleKey) redirect("/painel/administrador?error=service-role");

  const { url } = getSupabaseConfig();
  const adminHeaders = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };

  const createResponse = await fetch(`${url}/auth/v1/admin/users`, {
    method: "POST",
    headers: adminHeaders,
    body: JSON.stringify({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    }),
    cache: "no-store",
  });

  if (!createResponse.ok) redirect("/painel/administrador?error=novo-usuario");

  const user = (await createResponse.json()) as { id?: string };
  if (!user.id) redirect("/painel/administrador?error=novo-usuario");

  const profileResponse = await fetch(`${url}/rest/v1/profiles?on_conflict=id`, {
    method: "POST",
    headers: {
      ...adminHeaders,
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({ id: user.id, full_name: fullName, role }),
    cache: "no-store",
  });

  if (!profileResponse.ok) redirect("/painel/administrador?error=novo-perfil");

  redirect("/painel/administrador?userCreated=1");
}

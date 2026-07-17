import "server-only";

import { cookies } from "next/headers";

import { getSupabaseConfig, isSupabaseConfigured } from "@/lib/site-settings";

export const ACCESS_COOKIE = "lubri_admin_access";
export const REFRESH_COOKIE = "lubri_admin_refresh";

type AuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: { id: string; email?: string };
};

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: "owner" | "admin" | "editor";
  accessToken: string;
};

export async function loginWithPassword(email: string, password: string) {
  if (!isSupabaseConfigured()) throw new Error("O backend do painel ainda não está conectado.");

  const { url, anonKey } = getSupabaseConfig();
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: anonKey, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("E-mail ou senha inválidos.");

  const auth = (await response.json()) as AuthResponse;
  const admin = await getAdminProfile(auth.user.id, auth.access_token);

  if (!admin) throw new Error("Este usuário não possui acesso ao painel.");

  const cookieStore = await cookies();
  const secure = process.env.NODE_ENV === "production";
  const baseOptions = { httpOnly: true, secure, sameSite: "lax" as const, path: "/" };

  cookieStore.set(ACCESS_COOKIE, auth.access_token, { ...baseOptions, maxAge: auth.expires_in });
  cookieStore.set(REFRESH_COOKIE, auth.refresh_token, { ...baseOptions, maxAge: 60 * 60 * 24 * 30 });

  return admin;
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  if (!isSupabaseConfigured()) return null;

  const accessToken = (await cookies()).get(ACCESS_COOKIE)?.value;
  if (!accessToken) return null;

  const { url, anonKey } = getSupabaseConfig();
  const response = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!response.ok) return null;

  const user = (await response.json()) as { id: string; email?: string };
  const profile = await getAdminProfile(user.id, accessToken);

  if (!profile) return null;

  return { ...profile, email: user.email ?? "", accessToken };
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);
}

async function getAdminProfile(userId: string, accessToken: string): Promise<Omit<AdminUser, "email" | "accessToken"> | null> {
  const { url, anonKey } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=id,full_name,role`, {
    headers: { apikey: anonKey, Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!response.ok) return null;

  const rows = (await response.json()) as Array<{ id: string; full_name?: string | null; role?: string | null }>;
  const row = rows[0];

  if (!row || !["owner", "admin", "editor"].includes(row.role ?? "")) return null;

  return {
    id: row.id,
    name: row.full_name || "Administrador",
    role: row.role as AdminUser["role"],
  };
}

"use server";

import { redirect } from "next/navigation";

import { loginWithPassword } from "@/lib/supabase-auth";

const safeNextPath = (value: FormDataEntryValue | null) => {
  const next = typeof value === "string" ? value : "/painel";
  return next.startsWith("/") && !next.startsWith("//") ? next : "/painel";
};

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = safeNextPath(formData.get("next"));

  if (!email || !password) {
    redirect(`/login?error=${encodeURIComponent("Informe o e-mail e a senha.")}&next=${encodeURIComponent(next)}`);
  }

  try {
    await loginWithPassword(email, password);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Não foi possível entrar.";
    redirect(`/login?error=${encodeURIComponent(message)}&next=${encodeURIComponent(next)}`);
  }

  redirect(next);
}

import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// Client non typé : les nouvelles tables/fonctions ne sont pas dans types.ts.
const db = supabase as unknown as SupabaseClient;

export type Overview = { total: number; today: number; d7: number; d30: number; marketing: number };
export type DailyRow = { d: string; signups: number; active_users: number; visits: number };
export type PageRow = { path: string; visits: number; users: number };
export type ActivityRow = { uid: string; visits: number; last_visit: string };
export type ProfileRow = { id: string; email: string; prenom: string; marketing_consent: boolean; created_at: string; last_seen_at: string | null };

export async function fetchIsAdmin(userId: string): Promise<boolean> {
  const { data, error } = await db.rpc("has_role", { _user_id: userId, _role: "admin" });
  return !error && data === true;
}
async function rpc<T>(fn: string, args?: Record<string, unknown>): Promise<T> {
  const { data, error } = await db.rpc(fn, args);
  if (error) throw error;
  return data as T;
}
export const fetchOverview = () => rpc<Overview>("admin_overview");
export const fetchDaily = (days: number) => rpc<DailyRow[]>("admin_daily", { _days: days });
export const fetchPages = (days: number) => rpc<PageRow[]>("admin_pages", { _days: days });
export const fetchActivity = (days: number) => rpc<ActivityRow[]>("admin_activity", { _days: days });
export async function fetchProfiles(): Promise<ProfileRow[]> {
  const { data, error } = await db.from("profiles").select("id,email,prenom,marketing_consent,created_at,last_seen_at").order("created_at", { ascending: false }).limit(5000);
  if (error) throw error;
  return (data ?? []) as ProfileRow[];
}
export async function trackPageView(path: string): Promise<void> {
  try { await db.from("page_views").insert({ path: path.slice(0, 200) }); } catch { /* le suivi ne doit jamais gêner l'app */ }
}

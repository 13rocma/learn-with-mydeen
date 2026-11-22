import { supabase } from "@/integrations/supabase/client";

// Connexion Google / Apple « gérée par Lovable ».
// Le service de connexion est hébergé sur l'adresse lovable.app du projet ; il renvoie ensuite
// la personne vers l'adresse actuelle du site (qui doit figurer dans les Redirect URLs).
const BROKER_URL = "https://learn-with-mydeen.lovable.app/~oauth/initiate";
const STATE_KEY = "mydeen_oauth_state";

export type OAuthProvider = "google" | "apple";

const FAILED = "La connexion a échoué. Réessayez, ou utilisez votre email et votre mot de passe.";

export function startOAuth(provider: OAuthProvider, next: string): void {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  const state = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  try { sessionStorage.setItem(STATE_KEY, state); } catch { /* navigation privée stricte */ }
  const redirect = `${window.location.origin}/auth?next=${encodeURIComponent(next)}`;
  const params = new URLSearchParams({ provider, redirect_uri: redirect, state });
  window.location.href = `${BROKER_URL}?${params.toString()}`;
}

/** À appeler sur /auth : termine la connexion si l'on revient de Google ou d'Apple. */
export async function finishOAuthFromUrl(): Promise<{ handled: boolean; error?: string }> {
  let expected: string | null = null;
  try { expected = sessionStorage.getItem(STATE_KEY); sessionStorage.removeItem(STATE_KEY); } catch { /* ignoré */ }
  if (!expected) return { handled: false }; // pas de connexion Google/Apple en cours : on ne touche à rien

  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const query = new URLSearchParams(window.location.search);
  const get = (key: string) => hash.get(key) ?? query.get(key);
  const access = get("access_token");
  const refresh = get("refresh_token");
  const failure = get("error") ?? get("error_description");
  const returnedState = get("state");

  if (!access && !failure) return { handled: false };

  // Nettoie l'adresse (les jetons ne doivent pas rester visibles ni dans l'historique).
  const clean = new URL(window.location.href);
  ["access_token", "refresh_token", "expires_in", "token_type", "provider_token", "error", "error_description", "error_code", "state", "type"].forEach((k) => clean.searchParams.delete(k));
  window.history.replaceState(null, "", clean.pathname + clean.search);

  if (failure || !access || !refresh) return { handled: true, error: FAILED };
  if (returnedState && returnedState !== expected) return { handled: true, error: FAILED };
  const { error } = await supabase.auth.setSession({ access_token: access, refresh_token: refresh });
  return error ? { handled: true, error: FAILED } : { handled: true };
}

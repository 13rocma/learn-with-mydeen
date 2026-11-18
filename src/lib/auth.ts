import { z } from "zod";

export const emailSchema = z.string().trim().email("Saisissez une adresse email valide.").max(255, "L’email est trop long.");
export const passwordSchema = z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères.").max(128, "Le mot de passe est trop long.");
export const signupSchema = z.object({
  prenom: z.string().trim().min(1, "Saisissez votre prénom.").max(100, "Le prénom est trop long."),
  email: emailSchema,
  password: passwordSchema,
  privacy: z.literal(true, { errorMap: () => ({ message: "Vous devez accepter la politique de confidentialité." }) }),
  marketing_consent: z.boolean(),
});
export const loginSchema = z.object({ email: emailSchema, password: z.string().min(1, "Saisissez votre mot de passe.").max(128) });
export const resetSchema = z.object({ password: passwordSchema, confirmation: z.string() }).refine((v) => v.password === v.confirmation, { message: "Les mots de passe ne correspondent pas.", path: ["confirmation"] });

export function safeDestination(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || /[\\\s]/.test(value)) return "/bases";
  try {
    const url = new URL(value, "https://mydeen.local");
    if (url.origin !== "https://mydeen.local" || ["/auth", "/reset-password", "/privacy", "/"].includes(url.pathname)) return "/bases";
    return url.pathname + url.search + url.hash;
  } catch { return "/bases"; }
}

export function authError(error: { message: string; code?: string }): string {
  switch (error.code) {
    case "invalid_credentials": return "Email ou mot de passe incorrect.";
    case "email_not_confirmed": return "Confirmez votre adresse email avant de vous connecter. Consultez votre boîte de réception et vos courriers indésirables.";
    case "user_already_exists": case "email_exists": return "Un compte existe déjà avec cet email. Connectez-vous ou utilisez « Mot de passe oublié ».";
    case "over_email_send_rate_limit": case "over_request_rate_limit": return "Trop de demandes. Patientez quelques minutes avant de réessayer.";
    case "weak_password": return "Ce mot de passe est trop faible. Choisissez un mot de passe plus long et unique.";
    case "same_password": return "Choisissez un mot de passe différent du précédent.";
    case "otp_expired": return "Ce lien a expiré. Demandez un nouveau lien.";
    default: return /fetch|network/i.test(error.message) ? "Connexion impossible. Vérifiez votre connexion internet et réessayez." : "La demande n’a pas abouti. Réessayez dans quelques instants.";
  }
}
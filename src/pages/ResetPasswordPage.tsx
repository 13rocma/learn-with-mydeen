import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { LoaderCircle, KeyRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { authError, resetSchema } from "@/lib/auth";
import PageHeroBanner from "@/components/PageHeroBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const { user, loading, recovering, finishRecovery } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setError("");
    const valid = resetSchema.safeParse({ password, confirmation });
    if (!valid.success) { setError(valid.error.issues[0].message); return; }
    if (!user || !recovering) { setError("Ce lien est invalide ou expiré. Demandez un nouveau lien depuis la page Connexion."); return; }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: valid.data.password });
      if (error) setError(authError(error));
      else {
        setDone(true); setPassword(""); setConfirmation("");
        await supabase.auth.signOut(); finishRecovery();
      }
    } catch { setError("Connexion impossible. Vérifiez votre connexion internet."); }
    finally { setBusy(false); }
  }
  return <div className="min-h-screen"><PageHeroBanner title="Nouveau mot de passe" /><section className="mx-auto max-w-md px-4 py-6">
    {loading ? <LoaderCircle aria-label="Chargement" className="mx-auto animate-spin text-primary" /> : done ? <div className="space-y-5"><p role="status" className="text-primary">Votre mot de passe a été modifié. Vous pouvez maintenant vous connecter.</p><Button asChild className="w-full"><Link to="/auth">Se connecter</Link></Button></div> : !user || !recovering ? <div className="space-y-5"><p role="alert" className="text-muted-foreground">Ce lien est invalide ou expiré. Demandez un nouveau lien avec « Mot de passe oublié ».</p><Button asChild className="w-full"><Link to="/auth">Retour à la connexion</Link></Button></div> : <form onSubmit={submit} noValidate className="space-y-5">
      <div className="space-y-2"><Label htmlFor="new-password">Nouveau mot de passe (8 caractères minimum)</Label><Input id="new-password" type="password" autoComplete="new-password" required minLength={8} maxLength={128} disabled={busy} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
      <div className="space-y-2"><Label htmlFor="confirm-password">Confirmer le mot de passe</Label><Input id="confirm-password" type="password" autoComplete="new-password" required maxLength={128} disabled={busy} value={confirmation} onChange={(e) => setConfirmation(e.target.value)} /></div>
      {error && <p role="alert" className="text-sm text-foreground border-l-2 border-destructive pl-3">{error}</p>}
      <Button type="submit" className="w-full" disabled={busy}>{busy ? <LoaderCircle className="animate-spin" /> : <KeyRound />}Enregistrer le mot de passe</Button>
    </form>}
  </section></div>;
}
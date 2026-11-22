import { useEffect, useState, type FormEvent } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { LoaderCircle, LogIn, UserPlus, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { finishOAuthFromUrl, startOAuth } from "@/lib/oauth";
import { authError, emailSchema, loginSchema, safeDestination, signupSchema } from "@/lib/auth";
import PageHeroBanner from "@/components/PageHeroBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  const { user, loading, recovering } = useAuth();
  const [params] = useSearchParams();
  const [mode, setMode] = useState(params.get("mode") === "signup" ? "signup" : "login");
  const [forgot, setForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prenom, setPrenom] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const destination = safeDestination(params.get("next"));
  useEffect(() => { void finishOAuthFromUrl().then((r) => { if (r.error) setError(r.error); }); }, []);
  if (recovering) return <Navigate to="/reset-password" replace />;
  if (!loading && user) return <Navigate to={destination} replace />;
  const changeMode = (value: string) => { setMode(value); setForgot(false); setError(""); setSuccess(""); setPassword(""); };

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(""); setSuccess("");
    if (forgot) {
      const valid = emailSchema.safeParse(email);
      if (!valid.success) { setError(valid.error.issues[0].message); return; }
      setBusy(true);
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(valid.data, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) setError(authError(error));
        else setSuccess("Si un compte correspond à cet email, un lien de réinitialisation vous a été envoyé. Vérifiez aussi vos courriers indésirables.");
      } catch { setError("Connexion impossible. Vérifiez votre connexion internet."); }
      finally { setBusy(false); }
      return;
    }
    if (mode === "signup") {
      const valid = signupSchema.safeParse({ prenom, email, password, privacy, marketing_consent: marketing });
      if (!valid.success) { setError(valid.error.issues[0].message); return; }
      setBusy(true);
      try {
        const { error } = await supabase.auth.signUp({ email: valid.data.email, password: valid.data.password, options: {
          emailRedirectTo: `${window.location.origin}/auth?next=${encodeURIComponent(destination)}`,
          data: { prenom: valid.data.prenom, marketing_consent: valid.data.marketing_consent, privacy_accepted: true },
        } });
        if (error) setError(authError(error));
        else { setSuccess("Consultez votre email pour confirmer votre inscription avant de vous connecter. Vérifiez aussi vos courriers indésirables. Si vous avez déjà un compte, utilisez l’onglet Connexion."); setPassword(""); }
      } catch { setError("Connexion impossible. Vérifiez votre connexion internet."); }
      finally { setBusy(false); }
    } else {
      const valid = loginSchema.safeParse({ email, password });
      if (!valid.success) { setError(valid.error.issues[0].message); return; }
      setBusy(true);
      try {
        const { error } = await supabase.auth.signInWithPassword({ email: valid.data.email, password: valid.data.password });
        if (error) setError(authError(error));
      } catch { setError("Connexion impossible. Vérifiez votre connexion internet."); }
      finally { setBusy(false); }
    }
  }

  return <div className="min-h-screen bg-background">
    <PageHeroBanner title="My" titleHighlight="Deen" subtitle={forgot ? "Réinitialiser votre mot de passe" : "Votre espace personnel"} />
    <section className="mx-auto max-w-md px-4 py-6 pb-10">
      {!forgot && <Tabs value={mode} onValueChange={changeMode} className="mb-6"><TabsList className="grid w-full grid-cols-2"><TabsTrigger value="login" disabled={busy}>Connexion</TabsTrigger><TabsTrigger value="signup" disabled={busy}>Créer un compte</TabsTrigger></TabsList></Tabs>}
      {!forgot && <div className="mb-6 space-y-3">
        <Button type="button" variant="outline" className="w-full" disabled={busy} onClick={() => startOAuth("google", destination)}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z"/><path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.77-2.11-6.71-4.94H1.28v3.09A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.29 14.3A7.2 7.2 0 0 1 4.91 12c0-.8.14-1.57.38-2.3V6.61H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.39l4.01-3.09z"/><path fill="#EA4335" d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.95 1.19 15.23 0 12 0A12 12 0 0 0 1.28 6.61l4.01 3.09C6.23 6.86 8.88 4.75 12 4.75z"/></svg>
          Continuer avec Google
        </Button>
        <Button type="button" variant="outline" className="w-full" disabled={busy} onClick={() => startOAuth("apple", destination)}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>
          Continuer avec Apple
        </Button>
        <p className="text-center text-xs text-muted-foreground">En continuant avec Google ou Apple, vous acceptez la <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">politique de confidentialité</Link>.</p>
        <div className="relative py-1"><div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div><div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground">ou avec votre email</span></div></div>
      </div>}
      {forgot && <Button variant="link" className="px-0 mb-4" onClick={() => { setForgot(false); setError(""); setSuccess(""); }}><ArrowLeft />Retour à la connexion</Button>}
      <form onSubmit={submit} className="space-y-5" noValidate>
        <fieldset disabled={busy} className="space-y-5">
          {!forgot && mode === "signup" && <div className="space-y-2"><Label htmlFor="prenom">Prénom</Label><Input id="prenom" autoComplete="given-name" maxLength={100} required value={prenom} onChange={(e) => setPrenom(e.target.value)} /></div>}
          <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" autoComplete="email" maxLength={255} required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          {!forgot && <div className="space-y-2"><Label htmlFor="password">Mot de passe{mode === "signup" ? " (8 caractères minimum)" : ""}</Label><div className="relative"><Input id="password" type={showPassword ? "text" : "password"} autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={mode === "signup" ? 8 : undefined} maxLength={128} required value={password} onChange={(e) => setPassword(e.target.value)} className="pr-12" /><Button type="button" size="icon" variant="ghost" className="absolute right-0 top-0" aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"} title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</Button></div></div>}
          {!forgot && mode === "signup" && <div className="space-y-4">
            <div className="flex items-start gap-3"><Checkbox id="privacy" checked={privacy} onCheckedChange={(v) => setPrivacy(v === true)} className="mt-0.5" /><Label htmlFor="privacy" className="text-sm leading-relaxed font-normal">J’accepte la <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">politique de confidentialité</Link>.</Label></div>
            <div className="flex items-start gap-3"><Checkbox id="marketing" checked={marketing} onCheckedChange={(v) => setMarketing(v === true)} className="mt-0.5" /><Label htmlFor="marketing" className="text-sm leading-relaxed font-normal">J’accepte de recevoir des nouvelles de MyDeen par email.</Label></div>
          </div>}
        </fieldset>
        {error && <p role="alert" className="text-sm text-foreground border-l-2 border-destructive pl-3 leading-relaxed">{error}</p>}
        {success && <p role="status" className="text-sm text-primary leading-relaxed">{success}</p>}
        <Button type="submit" className="w-full" disabled={busy || loading}>{busy ? <LoaderCircle className="animate-spin" /> : mode === "signup" && !forgot ? <UserPlus /> : <LogIn />}{forgot ? "Envoyer le lien" : mode === "signup" ? "Créer mon compte" : "Se connecter"}</Button>
      </form>
      {!forgot && mode === "login" && <Button variant="link" className="w-full mt-2" onClick={() => { setForgot(true); setError(""); setSuccess(""); }}>Mot de passe oublié</Button>}
      <p className="text-center mt-6 text-xs text-muted-foreground"><Link to="/privacy" className="hover:text-primary underline">Politique de confidentialité</Link></p>
    </section>
  </div>;
}
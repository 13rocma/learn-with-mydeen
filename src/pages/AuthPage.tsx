import { useState, type FormEvent } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { LoaderCircle, LogIn, UserPlus, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { authError, emailSchema, loginSchema, safeDestination, signupSchema, socialRegistrationSchema } from "@/lib/auth";
import { lovable } from "@/integrations/lovable/index";
import SocialSignInButtons from "@/components/SocialSignInButtons";
import PageHeroBanner from "@/components/PageHeroBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  const { user, loading, recovering, registered, finishRegistration } = useAuth();
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
  if (recovering) return <Navigate to="/reset-password" replace />;
  if (!loading && user && registered) return <Navigate to={destination} replace />;
  const completingRegistration = !!user && !registered;
  const changeMode = (value: string) => { setMode(value); setForgot(false); setError(""); setSuccess(""); setPassword(""); };

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(""); setSuccess("");
    if (completingRegistration) {
      const valid = socialRegistrationSchema.safeParse({ prenom, privacy, marketing_consent: marketing });
      if (!valid.success) { setError(valid.error.issues[0].message); return; }
      setBusy(true);
      try {
        const { error } = await supabase.rpc("complete_mydeen_registration", { first_name: valid.data.prenom, accepts_marketing: valid.data.marketing_consent });
        if (error) setError(authError(error));
        else finishRegistration();
      } catch { setError("Connexion impossible. Vérifiez votre connexion internet."); }
      finally { setBusy(false); }
      return;
    }
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

  async function socialSignIn(provider: "google" | "apple") {
    setError(""); setSuccess(""); setBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth(provider, {
        redirect_uri: `${window.location.origin}/auth?next=${encodeURIComponent(destination)}`,
      });
      if (result.error) setError(authError(result.error));
      if (result.redirected) return;
    } catch { setError("Connexion impossible. Réessayez dans quelques instants."); }
    finally { setBusy(false); }
  }

  return <div className="min-h-screen bg-background">
    <PageHeroBanner title="My" titleHighlight="Deen" subtitle={completingRegistration ? "Finaliser votre inscription" : forgot ? "Réinitialiser votre mot de passe" : "Votre espace personnel"} />
    <section className="mx-auto max-w-md px-4 py-6 pb-10">
      {!forgot && !completingRegistration && <Tabs value={mode} onValueChange={changeMode} className="mb-6"><TabsList className="grid w-full grid-cols-2"><TabsTrigger value="login" disabled={busy}>Connexion</TabsTrigger><TabsTrigger value="signup" disabled={busy}>Créer un compte</TabsTrigger></TabsList></Tabs>}
      {!forgot && !completingRegistration && <div className="mb-6"><SocialSignInButtons disabled={busy || loading} onSignIn={socialSignIn} /><div className="flex items-center gap-3 mt-6 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />ou par email<span className="h-px flex-1 bg-border" /></div></div>}
      {forgot && <Button variant="link" className="px-0 mb-4" onClick={() => { setForgot(false); setError(""); setSuccess(""); }}><ArrowLeft />Retour à la connexion</Button>}
      <form onSubmit={submit} className="space-y-5" noValidate>
        <fieldset disabled={busy} className="space-y-5">
          {!forgot && (mode === "signup" || completingRegistration) && <div className="space-y-2"><Label htmlFor="prenom">Prénom</Label><Input id="prenom" autoComplete="given-name" maxLength={100} required value={prenom} onChange={(e) => setPrenom(e.target.value)} /></div>}
          {!completingRegistration && <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" autoComplete="email" maxLength={255} required value={email} onChange={(e) => setEmail(e.target.value)} /></div>}
          {!forgot && !completingRegistration && <div className="space-y-2"><Label htmlFor="password">Mot de passe{mode === "signup" ? " (8 caractères minimum)" : ""}</Label><div className="relative"><Input id="password" type={showPassword ? "text" : "password"} autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength={mode === "signup" ? 8 : undefined} maxLength={128} required value={password} onChange={(e) => setPassword(e.target.value)} className="pr-12" /><Button type="button" size="icon" variant="ghost" className="absolute right-0 top-0" aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"} title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</Button></div></div>}
          {!forgot && (mode === "signup" || completingRegistration) && <div className="space-y-4">
            <div className="flex items-start gap-3"><Checkbox id="privacy" checked={privacy} onCheckedChange={(v) => setPrivacy(v === true)} className="mt-0.5" /><Label htmlFor="privacy" className="text-sm leading-relaxed font-normal">J’accepte la <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline">politique de confidentialité</Link>.</Label></div>
            <div className="flex items-start gap-3"><Checkbox id="marketing" checked={marketing} onCheckedChange={(v) => setMarketing(v === true)} className="mt-0.5" /><Label htmlFor="marketing" className="text-sm leading-relaxed font-normal">J’accepte de recevoir des nouvelles de MyDeen par email.</Label></div>
          </div>}
        </fieldset>
        {error && <p role="alert" className="text-sm text-foreground border-l-2 border-destructive pl-3 leading-relaxed">{error}</p>}
        {success && <p role="status" className="text-sm text-primary leading-relaxed">{success}</p>}
        <Button type="submit" className="w-full" disabled={busy || loading}>{busy ? <LoaderCircle className="animate-spin" /> : mode === "signup" && !forgot ? <UserPlus /> : <LogIn />}{completingRegistration ? "Accéder à MyDeen" : forgot ? "Envoyer le lien" : mode === "signup" ? "Créer mon compte" : "Se connecter"}</Button>
      </form>
      {!forgot && !completingRegistration && mode === "login" && <Button variant="link" className="w-full mt-2" onClick={() => { setForgot(true); setError(""); setSuccess(""); }}>Mot de passe oublié</Button>}
      <p className="text-center mt-6 text-xs text-muted-foreground"><Link to="/privacy" className="hover:text-primary underline">Politique de confidentialité</Link></p>
    </section>
  </div>;
}
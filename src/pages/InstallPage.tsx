import { useEffect, useRef, useState, type ReactNode } from "react";
import { Download, Share, Plus, MoreVertical, Check, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type Platform = "ios" | "android" | "desktop";

const detectPlatform = (): { platform: Platform; inApp: boolean } => {
  const ua = navigator.userAgent;
  const iPadOS = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  const ios = /iPad|iPhone|iPod/.test(ua) || iPadOS;
  const android = /Android/i.test(ua);
  const social = /FBAN|FBAV|Instagram|Snapchat|TikTok|musical_ly|MicroMessenger|Line\/|WhatsApp/i.test(ua);
  // Sur iOS, un navigateur intégré à une app n'a pas le mot « Safari » dans son identifiant.
  const inApp = social || (ios && !/Safari/.test(ua)) || (android && /; wv\)/.test(ua));
  return { platform: ios ? "ios" : android ? "android" : "desktop", inApp };
};

const Step = ({ n, children }: { n: number; children: ReactNode }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
      <span className="text-sm font-bold text-primary">{n}</span>
    </div>
    <p className="text-muted-foreground text-sm">{children}</p>
  </div>
);

const InstallPage = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [{ platform, inApp }] = useState(detectPlatform);
  const [highlight, setHighlight] = useState(false);
  const guideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) setIsInstalled(true);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setIsInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setIsInstalled(true);
      setDeferredPrompt(null);
      return;
    }
    // Installation directe impossible : on montre les étapes à suivre.
    toast.info("Suis les étapes ci-dessous pour installer l’application.");
    guideRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setHighlight(true);
    window.setTimeout(() => setHighlight(false), 2500);
  };

  if (isInstalled) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">MyDeen est installée ! ✅</h1>
          <p className="text-muted-foreground">Tu peux la retrouver sur ton écran d’accueil.</p>
        </div>
      </div>
    );
  }

  const showGuide = platform === "ios" || !deferredPrompt;
  const title =
    platform === "ios" ? "Installer sur iPhone / iPad" : platform === "android" ? "Installer sur Android" : "Installer sur ordinateur";

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <div className="text-6xl">🕌</div>
          <h1 className="text-3xl font-bold text-foreground">Installer MyDeen</h1>
          <p className="text-muted-foreground">
            Ajoute l’app sur l’écran d’accueil de ton téléphone pour l’ouvrir en un geste, comme une application.
          </p>
        </div>

        {platform !== "ios" && (
          <Button onClick={handleInstall} size="lg" className="w-full text-lg gap-2">
            <Download className="w-5 h-5" />
            Installer l’application
          </Button>
        )}

        {showGuide && (
          <div
            ref={guideRef}
            className={`bg-card border rounded-xl p-6 space-y-4 text-left transition-shadow ${
              highlight ? "border-primary ring-2 ring-primary/50" : "border-border"
            }`}
          >
            <h2 className="font-semibold text-foreground text-center text-sm">{title}</h2>

            {inApp && (
              <div className="flex items-start gap-2 rounded-lg bg-primary/10 p-3 text-sm text-foreground">
                <AlertTriangle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  Tu es dans le navigateur d’une autre application. Ouvre ce lien dans{" "}
                  <strong>{platform === "ios" ? "Safari" : "Chrome"}</strong> pour pouvoir installer MyDeen.
                </span>
              </div>
            )}

            <div className="space-y-3">
              {platform === "ios" && (
                <>
                  <Step n={1}>Ouvre cette page dans <strong>Safari</strong>.</Step>
                  <Step n={2}>
                    Appuie sur <Share className="w-4 h-4 inline text-primary" /> <strong>Partager</strong>, en bas de l’écran
                    (en haut sur iPad).
                  </Step>
                  <Step n={3}>
                    Fais défiler le menu et appuie sur <Plus className="w-4 h-4 inline text-primary" />{" "}
                    <strong>Sur l’écran d’accueil</strong>.
                  </Step>
                  <Step n={4}>Appuie sur <strong>Ajouter</strong>. L’icône MyDeen apparaît sur ton écran d’accueil.</Step>
                </>
              )}
              {platform === "android" && (
                <>
                  <Step n={1}>
                    Appuie sur <MoreVertical className="w-4 h-4 inline text-primary" /> les <strong>trois points</strong> en haut
                    à droite de Chrome.
                  </Step>
                  <Step n={2}>
                    Appuie sur <strong>Installer l’application</strong> ou <strong>Ajouter à l’écran d’accueil</strong>.
                  </Step>
                  <Step n={3}>Confirme avec <strong>Installer</strong>. L’icône MyDeen apparaît sur ton écran d’accueil.</Step>
                </>
              )}
              {platform === "desktop" && (
                <>
                  <Step n={1}>
                    Dans Chrome ou Edge, clique sur l’<strong>icône d’installation</strong> à droite de la barre d’adresse.
                  </Step>
                  <Step n={2}>
                    Sinon, ouvre le menu <MoreVertical className="w-4 h-4 inline text-primary" />, puis{" "}
                    <strong>Installer MyDeen</strong>.
                  </Step>
                </>
              )}
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">Gratuit • Pas besoin de store</p>
      </div>
    </div>
  );
};

export default InstallPage;

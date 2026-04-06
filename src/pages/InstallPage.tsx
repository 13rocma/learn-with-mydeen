import { useState, useEffect } from "react";
import { Download, Share, Plus, MoreVertical, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const InstallPage = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua));

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setIsInstalled(true);
    setDeferredPrompt(null);
  };

  if (isInstalled) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            MyDeen est installée ! ✅
          </h1>
          <p className="text-muted-foreground">
            Tu peux la retrouver sur ton écran d'accueil.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <div className="text-6xl">🕌</div>
          <h1 className="text-3xl font-bold text-foreground">
            Installer MyDeen
          </h1>
          <p className="text-muted-foreground">
            Installe l'app sur ton téléphone pour y accéder rapidement, même
            hors connexion.
          </p>
        </div>

        <Button
          onClick={handleInstall}
          size="lg"
          className="w-full text-lg gap-2"
        >
          <Download className="w-5 h-5" />
          Installer l'application
        </Button>

        {!deferredPrompt && (
          <div className="bg-card border border-border rounded-xl p-6 space-y-4 text-left">
            <h2 className="font-semibold text-foreground text-center text-sm">
              {isIOS ? "Si le bouton ne fonctionne pas (iPhone / iPad) :" : "Si le bouton ne fonctionne pas (Android) :"}
            </h2>
            <div className="space-y-3">
              {isIOS ? (
                <>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Appuie sur <Share className="w-4 h-4 inline text-primary" /> <strong>Partager</strong> en bas de Safari
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Appuie sur <Plus className="w-4 h-4 inline text-primary" /> <strong>Sur l'écran d'accueil</strong>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Appuie sur <MoreVertical className="w-4 h-4 inline text-primary" /> le menu du navigateur (3 points)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Appuie sur <strong>Installer l'application</strong> ou <strong>Ajouter à l'écran d'accueil</strong>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Gratuit • Pas besoin de store • Fonctionne hors ligne
        </p>
      </div>
    </div>
  );
};

export default InstallPage;

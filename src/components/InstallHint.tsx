import { useState } from "react";
import { Link } from "react-router-dom";
import { Download, X } from "lucide-react";

const KEY = "mydeen_install_hint_dismissed";

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

// Petit rappel, fermable pour de bon, pour installer l'application depuis le Menu.
export default function InstallHint() {
  const [hidden, setHidden] = useState(() => {
    try { return localStorage.getItem(KEY) === "1"; } catch { return false; }
  });
  if (hidden || isStandalone()) return null;
  const close = () => {
    try { localStorage.setItem(KEY, "1"); } catch { /* ignoré */ }
    setHidden(true);
  };
  return (
    <div role="region" aria-label="Installer l’application" className="fixed bottom-16 inset-x-0 z-40 px-3 pb-2">
      <div className="mx-auto flex max-w-md items-start gap-3 rounded-xl border border-primary/40 bg-card p-3 shadow-lg">
        <Download className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <p className="flex-1 text-sm text-foreground">
          Installe MyDeen sur ton téléphone : ouvre le <strong>Menu</strong>, puis <strong>Installer l’application</strong>.{" "}
          <Link to="/installer" className="text-primary underline">Voir comment</Link>
        </p>
        <button type="button" onClick={close} aria-label="Fermer ce message" className="rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

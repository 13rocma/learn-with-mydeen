import { Moon, Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border py-10">
    <div className="container mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Moon className="h-5 w-5 text-primary" />
        <span className="font-heading text-lg font-bold">MyDeen</span>
      </div>
      <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
        Une plateforme d'apprentissage dédiée aux nouveaux musulmans et à tous ceux qui souhaitent approfondir leur pratique.
      </p>
      <p className="text-muted-foreground text-xs flex items-center justify-center gap-1">
        Fait avec <Heart className="h-3 w-3 text-primary" /> pour la communauté
      </p>
    </div>
  </footer>
);

export default Footer;

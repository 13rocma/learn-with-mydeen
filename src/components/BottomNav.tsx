import { Link, useLocation } from "react-router-dom";
import { Hand, BookOpen, Languages, Star, Heart, Menu, LogOut, Shield, Download, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useIsAdmin } from "@/hooks/useIsAdmin";

const navItems = [
  { icon: Star, label: "Bases", path: "/bases" },
  { icon: Hand, label: "Prière", path: "/priere" },
  { icon: BookOpen, label: "Sourates", path: "/sourates" },
  { icon: Languages, label: "Lettres", path: "/alphabet" },
  { icon: Heart, label: "Du'as", path: "/duas" },
];

const BottomNav = () => {
  const location = useLocation();
  const { isAdmin } = useIsAdmin();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className={`h-5 w-5 ${active ? "stroke-[2.5]" : ""}`} />
              <span className="text-[10px] font-medium leading-tight">{item.label}</span>
            </Link>
          );
        })}
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" className="flex-col gap-0.5 h-auto px-1 py-1.5 flex-1 text-muted-foreground" aria-label="Menu du compte" title="Menu du compte"><Menu className="!h-5 !w-5" /><span className="text-[10px] font-medium leading-tight">Menu</span></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="mb-2">
            <DropdownMenuItem asChild><Link to="/installer"><Download className="mr-2 h-4 w-4" />Installer l’application</Link></DropdownMenuItem>
            {isAdmin && <DropdownMenuItem asChild><Link to="/admin"><LayoutDashboard className="mr-2 h-4 w-4" />Tableau de bord</Link></DropdownMenuItem>}
            <DropdownMenuItem asChild><Link to="/privacy"><Shield className="mr-2 h-4 w-4" />Confidentialité</Link></DropdownMenuItem>
            <DropdownMenuItem onSelect={() => { void supabase.auth.signOut().then(({ error }) => { if (error) toast.error("Impossible de vous déconnecter. Réessayez."); }); }}><LogOut className="mr-2 h-4 w-4" />Se déconnecter</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default BottomNav;

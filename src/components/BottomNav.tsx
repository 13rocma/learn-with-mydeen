import { Link, useLocation } from "react-router-dom";
import { Home, Hand, BookOpen, Languages, Star, Heart } from "lucide-react";

const navItems = [
  { icon: Home, label: "Accueil", path: "/" },
  { icon: Star, label: "Bases", path: "/bases" },
  { icon: Hand, label: "Prière", path: "/priere" },
  { icon: BookOpen, label: "Sourates", path: "/sourates" },
  { icon: Languages, label: "Lettres", path: "/alphabet" },
  { icon: Heart, label: "Du'as", path: "/duas" },
];

const BottomNav = () => {
  const location = useLocation();

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
      </div>
    </nav>
  );
};

export default BottomNav;

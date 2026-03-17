import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon as MoonIcon } from "lucide-react";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "La Prière", path: "/priere" },
  { label: "Sourates", path: "/sourates" },
  { label: "Bases", path: "/bases" },
  { label: "Alphabet", path: "/alphabet" },
  { label: "Invocations", path: "/duas" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <MoonIcon className="h-6 w-6 text-primary" />
          <span className="font-heading text-xl font-bold text-foreground">
            My<span className="text-primary">Deen</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link text-sm font-medium ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <button
            className="text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="flex flex-col p-4 gap-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`nav-link py-2 text-base ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

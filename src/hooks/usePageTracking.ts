import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { trackPageView } from "@/lib/adminApi";

// Enregistre chaque page ouverte par une personne connectée (hors /admin).
export function usePageTracking() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const last = useRef("");
  useEffect(() => {
    if (!user || pathname.startsWith("/admin")) return;
    const key = `${user.id}:${pathname}`;
    if (last.current === key) return;
    last.current = key;
    void trackPageView(pathname);
  }, [user, pathname]);
}

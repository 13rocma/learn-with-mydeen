import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const AuthContext = createContext<{ user: User | null; loading: boolean; recovering: boolean; finishRecovery: () => void }>({ user: null, loading: true, recovering: false, finishRecovery: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [recovering, setRecovering] = useState(() => window.location.pathname === "/reset-password" && new URLSearchParams(window.location.hash.slice(1)).get("type") === "recovery");
  useEffect(() => {
    let active = true;
    let revision = 0;
    let seenUser: string | null = null;
    const validate = async (recordVisit: boolean) => {
      const current = ++revision;
      const { data, error } = await supabase.auth.getUser();
      if (!active || current !== revision) return;
      const verified = !error && data.user?.email_confirmed_at ? data.user : null;
      setUser(verified);
      setLoading(false);
      if (verified && recordVisit && seenUser !== verified.id) {
        seenUser = verified.id;
        await supabase.rpc("record_mydeen_login");
      }
    };
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setRecovering(true);
      if (event === "SIGNED_OUT") {
        revision++;
        seenUser = null;
        setUser(null);
        setRecovering(false);
        setLoading(false);
        return;
      }
      // Avoid invoking Auth methods while its event listener holds the client lock.
      setTimeout(() => { if (active) void validate(event === "SIGNED_IN" || event === "INITIAL_SESSION"); }, 0);
    });
    void validate(true);
    return () => { active = false; subscription.unsubscribe(); };
  }, []);
  return <AuthContext.Provider value={{ user, loading, recovering, finishRecovery: () => setRecovering(false) }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { fetchIsAdmin } from "@/lib/adminApi";

export function useIsAdmin() {
  const { user } = useAuth();
  const q = useQuery({ queryKey: ["is-admin", user?.id], queryFn: () => fetchIsAdmin(user!.id), enabled: !!user, staleTime: 5 * 60_000 });
  return { isAdmin: q.data === true, loading: !!user && q.isLoading };
}

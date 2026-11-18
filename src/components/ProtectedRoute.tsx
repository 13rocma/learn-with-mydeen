import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoaderCircle } from "lucide-react";

export default function ProtectedRoute() {
  const { user, loading, recovering } = useAuth();
  const location = useLocation();
  if (loading) return <div role="status" aria-label="Chargement" className="min-h-screen flex items-center justify-center"><LoaderCircle className="h-6 w-6 animate-spin text-primary" /></div>;
  if (recovering) return <Navigate to="/reset-password" replace />;
  if (!user) return <Navigate to={`/auth?next=${encodeURIComponent(location.pathname + location.search + location.hash)}`} replace />;
  return <Outlet />;
}
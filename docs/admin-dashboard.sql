-- =====================================================================
-- MyDeen : tableau de bord administrateur + suivi des pages consultées
-- À coller UNE SEULE FOIS dans l'éditeur SQL de ton backend, puis « Run ».
-- =====================================================================

-- 1) Rôles (table séparée de profiles, jamais modifiable depuis l'app)
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
CREATE POLICY "Read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING ((select auth.uid()) = user_id);

CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- 2) Ton compte devient administrateur
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users
WHERE lower(email) = lower('rayanburdloff@gmail.com') AND email_confirmed_at IS NOT NULL
ON CONFLICT DO NOTHING;

-- 3) Les admins peuvent lire tous les profils (les autres : seulement le leur)
CREATE POLICY "Admins read all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (public.has_role((select auth.uid()), 'admin'));

-- 4) Pages consultées (une ligne par page ouverte par une personne connectée)
CREATE TABLE public.page_views (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  path text NOT NULL CHECK (char_length(path) BETWEEN 1 AND 200),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX page_views_created_idx ON public.page_views (created_at);
CREATE INDEX page_views_user_idx ON public.page_views (user_id);
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
GRANT INSERT ON public.page_views TO authenticated;
GRANT ALL ON public.page_views TO service_role;
CREATE POLICY "Insert own views" ON public.page_views
  FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
-- Aucune lecture directe : seuls les admins lisent, via les fonctions ci-dessous.

-- 5) Statistiques (vérifient le rôle admin côté serveur)
CREATE FUNCTION public.admin_overview() RETURNS json
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE today date := (now() AT TIME ZONE 'Europe/Paris')::date;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Accès refusé.'; END IF;
  RETURN (SELECT json_build_object(
    'total', count(*),
    'today', count(*) FILTER (WHERE (p.created_at AT TIME ZONE 'Europe/Paris')::date = today),
    'd7',    count(*) FILTER (WHERE (p.created_at AT TIME ZONE 'Europe/Paris')::date > today - 7),
    'd30',   count(*) FILTER (WHERE (p.created_at AT TIME ZONE 'Europe/Paris')::date > today - 30),
    'marketing', count(*) FILTER (WHERE p.marketing_consent)
  ) FROM public.profiles p);
END $$;

CREATE FUNCTION public.admin_daily(_days int)
RETURNS TABLE (d date, signups bigint, active_users bigint, visits bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE today date := (now() AT TIME ZONE 'Europe/Paris')::date;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Accès refusé.'; END IF;
  _days := least(greatest(_days, 1), 365);
  RETURN QUERY
  WITH days AS (
    SELECT g::date AS dd FROM generate_series((today - (_days - 1))::timestamp, today::timestamp, interval '1 day') g
  ), s AS (
    SELECT (p.created_at AT TIME ZONE 'Europe/Paris')::date AS dd, count(*) AS n FROM public.profiles p GROUP BY 1
  ), v AS (
    SELECT (pv.created_at AT TIME ZONE 'Europe/Paris')::date AS dd, count(*) AS n, count(DISTINCT pv.user_id) AS u
    FROM public.page_views pv GROUP BY 1
  )
  SELECT days.dd, coalesce(s.n, 0), coalesce(v.u, 0), coalesce(v.n, 0)
  FROM days LEFT JOIN s ON s.dd = days.dd LEFT JOIN v ON v.dd = days.dd
  ORDER BY days.dd;
END $$;

CREATE FUNCTION public.admin_pages(_days int)
RETURNS TABLE (path text, visits bigint, users bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE since timestamptz;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Accès refusé.'; END IF;
  _days := least(greatest(_days, 1), 365);
  since := (((now() AT TIME ZONE 'Europe/Paris')::date - (_days - 1))::timestamp) AT TIME ZONE 'Europe/Paris';
  RETURN QUERY
  SELECT pv.path, count(*), count(DISTINCT pv.user_id)
  FROM public.page_views pv WHERE pv.created_at >= since
  GROUP BY pv.path ORDER BY count(*) DESC LIMIT 20;
END $$;

CREATE FUNCTION public.admin_activity(_days int)
RETURNS TABLE (uid uuid, visits bigint, last_visit timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE since timestamptz;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Accès refusé.'; END IF;
  _days := least(greatest(_days, 1), 365);
  since := (((now() AT TIME ZONE 'Europe/Paris')::date - (_days - 1))::timestamp) AT TIME ZONE 'Europe/Paris';
  RETURN QUERY
  SELECT pv.user_id, count(*), max(pv.created_at)
  FROM public.page_views pv WHERE pv.created_at >= since GROUP BY pv.user_id;
END $$;

REVOKE ALL ON FUNCTION public.admin_overview() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_daily(int) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_pages(int) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_activity(int) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_overview() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_daily(int) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_pages(int) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_activity(int) TO authenticated;

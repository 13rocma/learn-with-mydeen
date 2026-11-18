-- =====================================================================
-- MyDeen : bannir / débannir / supprimer un compte + exclure les visites des admins
-- À coller dans l'éditeur SQL, puis « Run ». Peut être relancé sans risque.
-- =====================================================================

-- 1) Statistiques : les visites des administrateurs ne sont plus comptées
CREATE OR REPLACE FUNCTION public.admin_daily(_days int)
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
    FROM public.page_views pv
    WHERE NOT EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = pv.user_id AND r.role = 'admin')
    GROUP BY 1
  )
  SELECT days.dd, coalesce(s.n, 0), coalesce(v.u, 0), coalesce(v.n, 0)
  FROM days LEFT JOIN s ON s.dd = days.dd LEFT JOIN v ON v.dd = days.dd
  ORDER BY days.dd;
END $$;

CREATE OR REPLACE FUNCTION public.admin_pages(_days int)
RETURNS TABLE (path text, visits bigint, users bigint)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE since timestamptz;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Accès refusé.'; END IF;
  _days := least(greatest(_days, 1), 365);
  since := (((now() AT TIME ZONE 'Europe/Paris')::date - (_days - 1))::timestamp) AT TIME ZONE 'Europe/Paris';
  RETURN QUERY
  SELECT pv.path, count(*), count(DISTINCT pv.user_id)
  FROM public.page_views pv
  WHERE pv.created_at >= since
    AND NOT EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = pv.user_id AND r.role = 'admin')
  GROUP BY pv.path ORDER BY count(*) DESC LIMIT 20;
END $$;

CREATE OR REPLACE FUNCTION public.admin_activity(_days int)
RETURNS TABLE (uid uuid, visits bigint, last_visit timestamptz)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE since timestamptz;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Accès refusé.'; END IF;
  _days := least(greatest(_days, 1), 365);
  since := (((now() AT TIME ZONE 'Europe/Paris')::date - (_days - 1))::timestamp) AT TIME ZONE 'Europe/Paris';
  RETURN QUERY
  SELECT pv.user_id, count(*), max(pv.created_at)
  FROM public.page_views pv
  WHERE pv.created_at >= since
    AND NOT EXISTS (SELECT 1 FROM public.user_roles r WHERE r.user_id = pv.user_id AND r.role = 'admin')
  GROUP BY pv.user_id;
END $$;

-- 2) Liste des comptes bannis
CREATE OR REPLACE FUNCTION public.admin_banned()
RETURNS TABLE (uid uuid)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Accès refusé.'; END IF;
  RETURN QUERY SELECT u.id FROM auth.users u WHERE u.banned_until IS NOT NULL AND u.banned_until > now();
END $$;

-- 3) Bannir / débannir (jamais soi-même, jamais un autre administrateur)
CREATE OR REPLACE FUNCTION public.admin_set_ban(_user uuid, _ban boolean) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Accès refusé.'; END IF;
  IF _user = auth.uid() THEN RAISE EXCEPTION 'Tu ne peux pas agir sur ton propre compte.'; END IF;
  IF public.has_role(_user, 'admin') THEN RAISE EXCEPTION 'Impossible d''agir sur un autre administrateur.'; END IF;
  UPDATE auth.users
     SET banned_until = CASE WHEN _ban THEN now() + interval '100 years' ELSE NULL END
   WHERE id = _user;
  IF NOT FOUND THEN RAISE EXCEPTION 'Compte introuvable.'; END IF;
  IF _ban THEN DELETE FROM auth.sessions WHERE user_id = _user; END IF; -- ferme ses sessions ouvertes
END $$;

-- 4) Supprimer définitivement un compte (profil, visites et rôles partent avec, par cascade)
CREATE OR REPLACE FUNCTION public.admin_delete_user(_user uuid) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Accès refusé.'; END IF;
  IF _user = auth.uid() THEN RAISE EXCEPTION 'Tu ne peux pas agir sur ton propre compte.'; END IF;
  IF public.has_role(_user, 'admin') THEN RAISE EXCEPTION 'Impossible d''agir sur un autre administrateur.'; END IF;
  DELETE FROM auth.users WHERE id = _user;
  IF NOT FOUND THEN RAISE EXCEPTION 'Compte introuvable.'; END IF;
END $$;

REVOKE ALL ON FUNCTION public.admin_banned() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_set_ban(uuid, boolean) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_delete_user(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_banned() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_set_ban(uuid, boolean) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_delete_user(uuid) TO authenticated;

CREATE FUNCTION public.record_mydeen_login() RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
 IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Connexion requise.'; END IF;
 UPDATE public.profiles SET last_seen_at = now() WHERE id = auth.uid();
END;
$$;
REVOKE ALL ON FUNCTION public.record_mydeen_login() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.record_mydeen_login() TO authenticated;
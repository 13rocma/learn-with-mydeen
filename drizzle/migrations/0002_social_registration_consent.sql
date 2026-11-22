CREATE TABLE public.consents (
 user_id uuid PRIMARY KEY,
 terms_version text NOT NULL DEFAULT '2026-11-18' CHECK (terms_version = '2026-11-18'),
 accepted_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.consents TO authenticated;
GRANT ALL ON public.consents TO service_role;
ALTER TABLE public.consents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own acceptance" ON public.consents FOR SELECT TO authenticated USING ((select auth.uid()) = user_id);
CREATE POLICY "Record own acceptance" ON public.consents FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);
INSERT INTO public.consents (user_id) SELECT id FROM auth.users WHERE raw_user_meta_data->>'privacy_accepted' = 'true';
CREATE FUNCTION public.record_signup_consent() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
 IF NEW.raw_user_meta_data->>'privacy_accepted' = 'true' THEN
 INSERT INTO public.consents(user_id) VALUES(NEW.id) ON CONFLICT DO NOTHING;
 END IF;
 RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.record_signup_consent() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER on_mydeen_signup_consent AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.record_signup_consent();
CREATE FUNCTION public.complete_mydeen_registration(first_name text, accepts_marketing boolean) RETURNS void LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
BEGIN
 IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Connexion requise.'; END IF;
 IF first_name IS NULL OR char_length(trim(first_name)) NOT BETWEEN 1 AND 100 OR accepts_marketing IS NULL THEN RAISE EXCEPTION 'Prénom ou consentement invalide.'; END IF;
 UPDATE public.profiles SET prenom = trim(first_name), marketing_consent = accepts_marketing WHERE id = auth.uid();
 IF NOT FOUND THEN RAISE EXCEPTION 'Profil introuvable.'; END IF;
 INSERT INTO public.consents(user_id) VALUES(auth.uid()) ON CONFLICT DO NOTHING;
END;
$$;
REVOKE ALL ON FUNCTION public.complete_mydeen_registration(text,boolean) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.complete_mydeen_registration(text,boolean) TO authenticated;
CREATE FUNCTION public.remove_mydeen_consent() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
 DELETE FROM public.consents WHERE user_id = OLD.id;
 RETURN OLD;
END;
$$;
REVOKE ALL ON FUNCTION public.remove_mydeen_consent() FROM PUBLIC,anon,authenticated;
CREATE TRIGGER on_mydeen_profile_deleted AFTER DELETE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.remove_mydeen_consent();
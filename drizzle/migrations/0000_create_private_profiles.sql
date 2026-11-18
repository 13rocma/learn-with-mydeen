CREATE TABLE public.profiles (
 id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
 email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
 prenom text NOT NULL DEFAULT '' CHECK (char_length(prenom) <= 100),
 marketing_consent boolean NOT NULL DEFAULT false,
 created_at timestamptz NOT NULL DEFAULT now(),
 last_seen_at timestamptz
);
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own profile" ON public.profiles FOR SELECT TO authenticated USING ((select auth.uid()) = id);
CREATE POLICY "Update own profile" ON public.profiles FOR UPDATE TO authenticated USING ((select auth.uid()) = id) WITH CHECK ((select auth.uid()) = id);
CREATE FUNCTION public.create_user_profile() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
 INSERT INTO public.profiles (id,email,prenom,marketing_consent)
 VALUES (NEW.id,NEW.email,left(trim(coalesce(NEW.raw_user_meta_data->>'prenom','')),100),coalesce(NEW.raw_user_meta_data->>'marketing_consent','false') = 'true');
 RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.create_user_profile() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER on_mydeen_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_user_profile();
INSERT INTO public.profiles (id,email,prenom,marketing_consent)
SELECT id,email,left(trim(coalesce(raw_user_meta_data->>'prenom','')),100),coalesce(raw_user_meta_data->>'marketing_consent','false') = 'true' FROM auth.users WHERE email IS NOT NULL;
CREATE FUNCTION public.validate_profile_update() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 IF NEW.id IS DISTINCT FROM OLD.id OR NEW.email IS DISTINCT FROM OLD.email OR NEW.created_at IS DISTINCT FROM OLD.created_at THEN
  RAISE EXCEPTION 'Les informations du compte ne peuvent pas être modifiées ici.';
 END IF;
 NEW.prenom := trim(NEW.prenom);
 IF char_length(NEW.prenom) > 100 THEN RAISE EXCEPTION 'Prénom trop long.'; END IF;
 RETURN NEW;
END;
$$;
CREATE TRIGGER validate_mydeen_profile BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.validate_profile_update();
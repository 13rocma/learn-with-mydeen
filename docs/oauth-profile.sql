-- =====================================================================
-- MyDeen : le prénom des comptes Google / Apple remplit aussi le tableau de bord
-- À coller dans l'éditeur SQL, puis « Run ». Peut être relancé sans risque.
-- =====================================================================
CREATE OR REPLACE FUNCTION public.create_user_profile() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _prenom text;
BEGIN
  _prenom := coalesce(
    nullif(trim(NEW.raw_user_meta_data->>'prenom'), ''),
    nullif(trim(NEW.raw_user_meta_data->>'given_name'), ''),
    nullif(split_part(trim(coalesce(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')), ' ', 1), ''),
    '');
  INSERT INTO public.profiles (id, email, prenom, marketing_consent)
  VALUES (
    NEW.id,
    coalesce(NEW.email, NEW.id::text || '@sans-email.invalid'),  -- ne bloque jamais une inscription
    left(_prenom, 100),
    coalesce(NEW.raw_user_meta_data->>'marketing_consent', 'false') = 'true');
  RETURN NEW;
END $$;

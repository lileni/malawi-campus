
-- 1. Add approval columns to profiles
CREATE TYPE public.account_status AS ENUM ('pending', 'active', 'rejected');

ALTER TABLE public.profiles
  ADD COLUMN status public.account_status NOT NULL DEFAULT 'pending',
  ADD COLUMN requested_role public.app_role NOT NULL DEFAULT 'student',
  ADD COLUMN reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN reviewed_at timestamptz;

-- 2. Mark existing users as active (so they don't get locked out)
UPDATE public.profiles SET status = 'active';

-- 3. Replace the auto-insert role trigger so new signups DO NOT receive a role
--    They get a role only after an admin approves them.
DROP TRIGGER IF EXISTS on_auth_user_created_role ON auth.users;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  req_role public.app_role;
BEGIN
  -- Parse requested role from signup metadata; fall back to student
  BEGIN
    req_role := COALESCE(
      NULLIF(NEW.raw_user_meta_data->>'requested_role', ''),
      'student'
    )::public.app_role;
  EXCEPTION WHEN others THEN
    req_role := 'student';
  END;

  INSERT INTO public.profiles (id, full_name, status, requested_role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'pending',
    req_role
  );
  RETURN NEW;
END;
$$;

-- Make sure profile trigger is in place (idempotent)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. RLS: allow approvers to update profile status
DROP POLICY IF EXISTS "Approvers can update profile status" ON public.profiles;
CREATE POLICY "Approvers can update profile status"
ON public.profiles
FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'principal'::app_role)
  OR public.has_role(auth.uid(), 'bursar'::app_role)
  OR public.has_role(auth.uid(), 'registrar'::app_role)
)
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'principal'::app_role)
  OR public.has_role(auth.uid(), 'bursar'::app_role)
  OR public.has_role(auth.uid(), 'registrar'::app_role)
);

-- 5. RLS on user_roles: allow registrar to manage roles too (admin/principal/bursar already can)
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
CREATE POLICY "Approvers can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'principal'::app_role)
  OR public.has_role(auth.uid(), 'bursar'::app_role)
  OR public.has_role(auth.uid(), 'registrar'::app_role)
)
WITH CHECK (
  public.has_role(auth.uid(), 'admin'::app_role)
  OR public.has_role(auth.uid(), 'principal'::app_role)
  OR public.has_role(auth.uid(), 'bursar'::app_role)
  OR public.has_role(auth.uid(), 'registrar'::app_role)
);

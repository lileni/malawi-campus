-- Update profiles RLS to include principal and bursar
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
CREATE POLICY "Admins can read all profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR
    has_role(auth.uid(), 'registrar'::app_role) OR
    has_role(auth.uid(), 'principal'::app_role) OR
    has_role(auth.uid(), 'bursar'::app_role)
  );

-- Update user_roles RLS to include principal and bursar
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role) OR
    has_role(auth.uid(), 'principal'::app_role) OR
    has_role(auth.uid(), 'bursar'::app_role)
  )
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role) OR
    has_role(auth.uid(), 'principal'::app_role) OR
    has_role(auth.uid(), 'bursar'::app_role)
  );
-- Allow lecturers to read all profiles (learner info, not financial)
CREATE POLICY "Lecturers can read all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'lecturer'::app_role));
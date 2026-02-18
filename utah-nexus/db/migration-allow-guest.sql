-- Migration: Allow Profile Save without Supabase Auth
-- Uses localStorage guest ID instead of auth.uid()
-- Run in Supabase SQL Editor after schema.sql

-- Drop auth-based policies
DROP POLICY IF EXISTS "Users can read own profile" ON "User";
DROP POLICY IF EXISTS "Users can insert own profile" ON "User";
DROP POLICY IF EXISTS "Users can update own profile" ON "User";

-- Allow anon (unauthenticated) to insert, select, update
-- Guest ID is stored in localStorage; no auth required
CREATE POLICY "Allow anon to insert User"
  ON "User" FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon to select User"
  ON "User" FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anon to update User"
  ON "User" FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

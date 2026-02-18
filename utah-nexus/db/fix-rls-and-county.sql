-- Fix Sign Up: RLS on User + County access
-- Run in Supabase SQL Editor

-- 1. User table: Drop ALL existing policies and create permissive ones
DROP POLICY IF EXISTS "Users can read own profile" ON "User";
DROP POLICY IF EXISTS "Users can insert own profile" ON "User";
DROP POLICY IF EXISTS "Users can update own profile" ON "User";
DROP POLICY IF EXISTS "Allow anon to insert User" ON "User";
DROP POLICY IF EXISTS "Allow anon to select User" ON "User";
DROP POLICY IF EXISTS "Allow anon to update User" ON "User";

CREATE POLICY "Allow anon to insert User"
  ON "User" FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon to select User"
  ON "User" FOR SELECT TO anon USING (true);

CREATE POLICY "Allow anon to update User"
  ON "User" FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- 2. County table: Allow anon to read
-- (Table name is lowercase "county" in PostgreSQL)
ALTER TABLE county ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow anon to select county" ON county;
CREATE POLICY "Allow anon to select county"
  ON county FOR SELECT TO anon USING (true);

-- Utah Nexus Database Schema
-- Matches ERD: County, User, Topic, User_Subscription, Article
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. County: Utah counties
CREATE TABLE County (
  County_ID SERIAL PRIMARY KEY,
  County_Name VARCHAR(100) NOT NULL,
  State CHAR(2) NOT NULL DEFAULT 'UT',
  UNIQUE(County_Name, State)
);

-- 2. User: Profile data (User_ID links to auth.uid() from Supabase Auth)
CREATE TABLE "User" (
  User_ID UUID PRIMARY KEY,
  Name VARCHAR(100),
  Email VARCHAR(255),
  Password VARCHAR(255),
  DOB DATE,
  County_ID INT REFERENCES County(County_ID),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Topic: News topics
CREATE TABLE Topic (
  Topic_ID SERIAL PRIMARY KEY,
  Title VARCHAR(255) NOT NULL
);

-- 4. User_Subscription: Many-to-many (User subscribes to Topics)
CREATE TABLE User_Subscription (
  User_ID UUID NOT NULL REFERENCES "User"(User_ID) ON DELETE CASCADE,
  Topic_ID INT NOT NULL REFERENCES Topic(Topic_ID) ON DELETE CASCADE,
  PRIMARY KEY (User_ID, Topic_ID)
);

-- 5. Article: Articles belong to Topics
CREATE TABLE Article (
  Article_ID SERIAL PRIMARY KEY,
  Topic_ID INT NOT NULL REFERENCES Topic(Topic_ID) ON DELETE CASCADE,
  Source_Name VARCHAR(100) NOT NULL,
  URL TEXT,
  Published_Date TIMESTAMPTZ,
  Bias_Score FLOAT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_article_topic ON Article(Topic_ID);
CREATE INDEX idx_user_subscription_user ON User_Subscription(User_ID);
CREATE INDEX idx_user_subscription_topic ON User_Subscription(Topic_ID);
CREATE INDEX idx_user_county ON "User"(County_ID);

-- Row Level Security (RLS) for User table
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

-- Users can only read/update their own row
CREATE POLICY "Users can read own profile"
  ON "User" FOR SELECT
  USING (auth.uid() = User_ID);

CREATE POLICY "Users can insert own profile"
  ON "User" FOR INSERT
  WITH CHECK (auth.uid() = User_ID);

CREATE POLICY "Users can update own profile"
  ON "User" FOR UPDATE
  USING (auth.uid() = User_ID)
  WITH CHECK (auth.uid() = User_ID);

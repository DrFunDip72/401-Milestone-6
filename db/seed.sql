-- Utah Nexus Seed Data
-- Run after schema.sql in Supabase SQL Editor

-- 1. County: 29 Utah counties
INSERT INTO County (County_Name, State) VALUES
  ('Beaver', 'UT'),
  ('Box Elder', 'UT'),
  ('Cache', 'UT'),
  ('Carbon', 'UT'),
  ('Daggett', 'UT'),
  ('Davis', 'UT'),
  ('Duchesne', 'UT'),
  ('Emery', 'UT'),
  ('Garfield', 'UT'),
  ('Grand', 'UT'),
  ('Iron', 'UT'),
  ('Juab', 'UT'),
  ('Kane', 'UT'),
  ('Millard', 'UT'),
  ('Morgan', 'UT'),
  ('Piute', 'UT'),
  ('Rich', 'UT'),
  ('Salt Lake', 'UT'),
  ('San Juan', 'UT'),
  ('Sanpete', 'UT'),
  ('Sevier', 'UT'),
  ('Summit', 'UT'),
  ('Tooele', 'UT'),
  ('Uintah', 'UT'),
  ('Utah', 'UT'),
  ('Wasatch', 'UT'),
  ('Washington', 'UT'),
  ('Wayne', 'UT'),
  ('Weber', 'UT');

-- 2. Topic: 6 news topics
INSERT INTO Topic (Title) VALUES
  ('Utah Housing Crisis'),
  ('Great Salt Lake Water Levels'),
  ('Utah Education Funding'),
  ('Air Quality Along the Wasatch Front'),
  ('Utah Tech Industry Growth'),
  ('Public Lands Debate');

-- 3. Article: 4 articles per topic (24 total)
-- Topic 1: Utah Housing Crisis
INSERT INTO Article (Topic_ID, Source_Name, URL, Published_Date, Bias_Score) VALUES
  (1, 'Salt Lake Tribune', 'https://example.com/slt-housing', '2024-02-08 00:00:00+00', 0.3),
  (1, 'Deseret News', 'https://example.com/deseret-zoning', '2024-02-07 00:00:00+00', -0.2),
  (1, 'KSL', 'https://example.com/ksl-buyers', '2024-02-06 00:00:00+00', 0),
  (1, 'Utah Policy', 'https://example.com/utahpolicy-forum', '2024-02-05 00:00:00+00', 0);

-- Topic 2: Great Salt Lake Water Levels
INSERT INTO Article (Topic_ID, Source_Name, URL, Published_Date, Bias_Score) VALUES
  (2, 'Salt Lake Tribune', 'https://example.com/slt-gsl', '2024-02-09 00:00:00+00', 0.2),
  (2, 'Deseret News', 'https://example.com/deseret-conservation', '2024-02-08 00:00:00+00', -0.3),
  (2, 'KSL', 'https://example.com/ksl-pipeline', '2024-02-07 00:00:00+00', 0),
  (2, 'Utah Policy', 'https://example.com/utahpolicy-balance', '2024-02-06 00:00:00+00', 0);

-- Topic 3: Utah Education Funding
INSERT INTO Article (Topic_ID, Source_Name, URL, Published_Date, Bias_Score) VALUES
  (3, 'Salt Lake Tribune', 'https://example.com/slt-teachers', '2024-02-08 00:00:00+00', 0.3),
  (3, 'Deseret News', 'https://example.com/deseret-choice', '2024-02-07 00:00:00+00', -0.2),
  (3, 'KSL', 'https://example.com/ksl-shortage', '2024-02-06 00:00:00+00', 0),
  (3, 'Utah Policy', 'https://example.com/utahpolicy-forum', '2024-02-05 00:00:00+00', 0);

-- Topic 4: Air Quality Along the Wasatch Front
INSERT INTO Article (Topic_ID, Source_Name, URL, Published_Date, Bias_Score) VALUES
  (4, 'Salt Lake Tribune', 'https://example.com/slt-inversion', '2024-02-09 00:00:00+00', 0.2),
  (4, 'Deseret News', 'https://example.com/deseret-ev', '2024-02-08 00:00:00+00', -0.2),
  (4, 'KSL', 'https://example.com/ksl-transit', '2024-02-07 00:00:00+00', 0),
  (4, 'Utah Policy', 'https://example.com/utahpolicy-report', '2024-02-06 00:00:00+00', 0);

-- Topic 5: Utah Tech Industry Growth
INSERT INTO Article (Topic_ID, Source_Name, URL, Published_Date, Bias_Score) VALUES
  (5, 'Salt Lake Tribune', 'https://example.com/slt-tech', '2024-02-08 00:00:00+00', 0.3),
  (5, 'Deseret News', 'https://example.com/deseret-tech', '2024-02-07 00:00:00+00', -0.2),
  (5, 'KSL', 'https://example.com/ksl-universities', '2024-02-06 00:00:00+00', 0),
  (5, 'Utah Policy', 'https://example.com/utahpolicy-tech', '2024-02-05 00:00:00+00', 0);

-- Topic 6: Public Lands Debate
INSERT INTO Article (Topic_ID, Source_Name, URL, Published_Date, Bias_Score) VALUES
  (6, 'Salt Lake Tribune', 'https://example.com/slt-conservation', '2024-02-09 00:00:00+00', 0.3),
  (6, 'Deseret News', 'https://example.com/deseret-lands', '2024-02-08 00:00:00+00', -0.3),
  (6, 'KSL', 'https://example.com/ksl-recreation', '2024-02-07 00:00:00+00', 0),
  (6, 'Utah Policy', 'https://example.com/utahpolicy-lands', '2024-02-06 00:00:00+00', 0);

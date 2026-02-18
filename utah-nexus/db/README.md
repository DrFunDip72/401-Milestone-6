# Database Scripts

Run these scripts in the Supabase SQL Editor to create and populate the database.

1. **schema.sql** — Creates tables: County, User, Topic, User_Subscription, Article (no auth required)
2. **seed.sql** — Inserts sample data (counties, topics, articles)
3. **migration-allow-guest.sql** — If you already ran the old schema, run this to allow Profile Save without auth

Order: Run `schema.sql` first, then `seed.sql`. If Profile Save fails, run `migration-allow-guest.sql`.

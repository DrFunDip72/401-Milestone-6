# Utah Nexus

## App Summary

Utah residents often receive fragmented, sometimes biased local news from multiple outlets. Utah Nexus solves this by aggregating Utah local news from multiple sources and presenting it in a balanced, easy-to-digest format. The primary user is a Utah resident who wants to stay informed about local issues—housing, the Great Salt Lake, education, air quality, tech growth, and public lands—without wading through conflicting narratives. Utah Nexus provides AI-generated summaries that highlight shared facts across sources, surfaces divergent narratives, and enables side-by-side comparison of coverage from Salt Lake Tribune, Deseret News, KSL, and Utah Policy. The product helps users form their own informed opinions by seeing the full picture.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite 7, TypeScript 5.9, Tailwind CSS, Radix UI, React Router |
| **Backend** | Supabase (PostgREST API) |
| **Database** | PostgreSQL (hosted on Supabase) |
| **Authentication** | Email/password stored in User table, session in localStorage |
| **External Services** | Supabase |

## Architecture Diagram

```mermaid
flowchart LR
    subgraph Client
        User[User]
        Frontend[React Frontend]
    end
    
    subgraph Supabase
        API[PostgREST API]
        DB[(PostgreSQL)]
    end
    
    User -->|HTTPS| Frontend
    Frontend -->|REST/HTTPS| API
    API -->|SQL| DB
```

## Prerequisites

- **Node.js** 18+ — [Official installation](https://nodejs.org/)
- **npm** — included with Node.js
- **Supabase account** — [Sign up](https://supabase.com/) (database is hosted; no local PostgreSQL required)

Verify installation:

```bash
node -v   # v18.x or higher
npm -v    # 9.x or higher
```

## Installation and Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/DrFunDip72/401-Milestone-6.git
   cd 401-Milestone-6
   ```

2. **Install dependencies**

   ```bash
   cd utah-nexus
   npm install
   ```

3. **Create Supabase project** (if not already done)

   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Create a new project
   - Note your project URL and anon (public) key

4. **Configure environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set:

   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

5. **Create the database**

   - In Supabase Dashboard, go to **SQL Editor**
   - Run the contents of `db/schema.sql`
   - Run the contents of `db/seed.sql`
   - Run the contents of `db/fix-rls-and-county.sql` (enables Sign Up and County lookups)

## Running the Application

Start the frontend (Supabase serves as the backend; no separate server to run):

```bash
cd utah-nexus
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Verifying the Vertical Slice

The **Sign Up** and **Profile** flow demonstrates the full backend:

1. Click **Sign Up** in the header
2. Fill in First Name, Surname, Email, Password, and County
3. Click **Sign Up** — you should be redirected to Profile
4. **Confirm the database was updated:** In Supabase Dashboard → **Table Editor** → `User`, verify your new row exists
5. Click **Logout**, then **Login** with your email and password
6. You should see your Profile with saved data
7. Edit a field (e.g., Name) and click **Save Changes**
8. **Verify persistence:** Refresh the page — your changes should still be visible

This confirms: Sign Up → DB insert → Login → Profile load → Profile save → DB update → persistence after refresh.

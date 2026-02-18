# Utah Nexus - Project Prompt

Build a mobile-first React + TypeScript + Vite + Tailwind CSS application called **"Utah Nexus"** — a local news aggregation app that provides unbiased, balanced local news summaries for Utah residents. All data is hardcoded mock data (no backend). Use shadcn/ui components, react-router-dom for routing, and lucide-react for icons.

(NOTE FOR CURSOR: YOU DON'T NEED TO FOLLOW THE EXACT RECOMMENDATIONS. IN FACT, I ENCOURAGE YOU TO DEVIATE, ESPECIALLY WITH DESIGN. YOU DON't NEED TO USE React + TypeScript + Vite + Tailwind CSS OR THE STYLES IT TELLS YOU TO USE)

---

## DESIGN SYSTEM

- **Fonts**: Space Grotesk for headings (`font-display`), Inter for body text
- **Import via Google Fonts**: `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap`
- **Theme**: Light/dark mode CSS variables. Primary color: purple (`hsl(250 85% 60%)`), Accent: teal (`hsl(170 75% 42%)`), destructive: red
- **Border radius**: 0.75rem
- **Layout**: Mobile-first, max-width containers, card-based UI

## ROUTING (react-router-dom v6)

All pages wrapped in an `AppLayout` component:
- `/` — Home (Index)
- `/search?q=...` — Search Results
- `/topic/:id` — Topic Results (news article page)
- `/topic/:id/compare` — Article Comparison
- `/trending` — Trending Topics
- `/profile` — Profile
- `/signup` — Sign Up
- `*` — Not Found

## COMPONENTS

### AppLayout
- Sticky top header bar (h-14) with blurred background (`bg-card/80 backdrop-blur-md`)
- Left: Logo (purple rounded square with "UN" initials) + "Utah Nexus" text, links to home
- Right: Hamburger menu button (Menu/X icons)
- Slide-out menu from right side (w-72) with backdrop overlay, containing nav links: Home, Trending Topics, Profile, and a Sign Up button
- Active nav item highlighted with primary color background

### TopicCard
- Links to `/topic/{id}`
- Card with image (h-40, object-cover, hover scale effect), gradient overlay, badge showing article count
- Below image: title (font-bold, line-clamp-2) and AI summary preview (line-clamp-2, muted)

## PAGES

### Home (`/`)
- Compact hero: "Utah Nexus" title (text-2xl on mobile, text-3xl on md), tagline "Unbiased and balanced local news summaries for Utah" (text-sm)
- Search bar with Search icon, Input (h-12), and Search button
- On submit, navigate to `/search?q=...`
- "Trending News Topics" section showing first 3 topics as TopicCards in a responsive grid (1 col mobile, 2 sm, 3 lg)
- "See More Trending Topics" button linking to `/trending`

### Search Results (`/search`)
- Back button, heading "Results for '{query}'"
- Shows matching topics in a grid using TopicCards
- Empty state message if no results

### Topic Results (`/topic/:id`) — THE MAIN NEWS PAGE
- Back button at top
- `useEffect` to scroll to top when `id` changes
- **AI Summary Card** at top with amber left border (`border-l-4 border-l-amber-500`):
  - Title "Unbiased AI Summary" with amber accent bar
  - Summary paragraph
  - **"Shared Facts"** section with green CheckCircle2 icon, bulleted list
  - **"Divergent Narratives"** section with amber AlertTriangle icon, bulleted list
- **Source Tabs** below: heading "Coverage from X Sources", then a Tabs component with horizontal scrollable TabsList (underline style, not pill style — transparent bg, active tab has bottom border). Each tab shows source name.
  - Each TabsContent shows a Card with: article headline, italic summary, full content paragraph, and "Read on {source}" external link
- **NO bias indicators** — no left/right/center leaning labels anywhere
- **Trending Topics carousel** at bottom: horizontal scroll container with left/right chevron buttons, showing other TopicCards (min-w-240, max-w-260, snap scroll)
- **"Trending Topics" button** below carousel linking to `/trending`

### Article Comparison (`/topic/:id/compare`)
- Back button, topic title, subtitle "Comparing coverage across X sources"
- Grid of article cards (1 col mobile, 2 col md) each with: image (h-48), source badge, date, headline, content
- No bias indicators

### Trending Topics (`/trending`)
- Title "Trending Topics", subtitle about Utah news
- Full grid of all topics using TopicCards

### Profile (`/profile`)
- Centered card (max-w-lg) with user avatar placeholder (circle with User icon)
- Form fields: Name, Email, New Password, Date of Birth (date input), Utah County (Select dropdown from UTAH_COUNTIES list)
- Save Changes button, shows toast on save

### Sign Up (`/signup`)
- Centered card with "Create Account" title, subtitle "Join Utah Nexus for balanced local news"
- Form: First Name + Surname (2-col grid), Address, ZIP, Email, Password, County dropdown
- Sign Up button, "Already have an account? Login" link
- Shows toast on submit

## MOCK DATA

Create a `mockData.ts` with:

```typescript
interface Article {
  id: string;
  source: string;
  headline: string;
  summary: string;
  imageUrl: string;
  biasScore: number; // kept in data but NOT displayed in UI
  biasLabel: string; // kept in data but NOT displayed in UI
  publishedAt: string;
  content: string;
  sourceUrl: string;
}

interface Topic {
  id: string;
  title: string;
  imageUrl: string;
  aiSummary: string;
  sharedFacts: string[];
  divergentNarratives: string[];
  articleCount: number;
  articles: Article[];
}
```

Include 6 Utah-specific trending topics: Utah Housing Crisis, Great Salt Lake Water Levels, Utah Education Funding, Air Quality Along the Wasatch Front, Utah Tech Industry Growth, Public Lands Debate. Each with 4 articles from sources: Salt Lake Tribune, Deseret News, KSL, Utah Policy. Each topic needs 4 shared facts and 4 divergent narratives. Use Unsplash placeholder images.

Include a `UTAH_COUNTIES` array with all 29 Utah counties.

Export helper functions: `getTopicById(id)` and `searchTopics(query)`.

## KEY REQUIREMENTS
- **No bias indicators in the UI** — no left/right/center leaning labels, no spectrum visualizers
- **Mobile-first** responsive design throughout
- **Scroll to top** when navigating to a new topic
- Use shadcn/ui components: Card, Button, Input, Label, Select, Tabs, Badge, Toast
- Use lucide-react icons: Search, Menu, X, Home, TrendingUp, User, ArrowLeft, CheckCircle2, AlertTriangle, ExternalLink, ChevronLeft, ChevronRight

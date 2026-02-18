import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TopicCard } from "@/components/TopicCard";
import { TOPICS } from "@/data/mockData";

export function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const trendingTopics = TOPICS.slice(0, 3);

  return (
    <div className="space-y-8">
      <section className="text-center space-y-2">
        <h1 className="font-display font-bold text-2xl md:text-3xl">
          Utah Nexus
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Unbiased and balanced local news summaries for Utah
        </p>
      </section>

      <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search Utah news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        <Button type="submit" size="lg" className="h-12 px-6">
          Search
        </Button>
      </form>

      <section>
        <h2 className="font-display font-semibold text-lg mb-4">
          Trending News Topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingTopics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline" asChild>
            <Link to="/trending">See More Trending Topics</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

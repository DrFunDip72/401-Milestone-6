import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopicCard } from "@/components/TopicCard";
import { searchTopics } from "@/data/mockData";

export function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const results = searchTopics(query);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="font-display font-semibold text-xl">
          Results for &quot;{query || "all topics"}&quot;
        </h1>
      </div>

      {results.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
          <p>No results found for your search.</p>
          <p className="mt-2 text-sm">Try a different search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      )}
    </div>
  );
}

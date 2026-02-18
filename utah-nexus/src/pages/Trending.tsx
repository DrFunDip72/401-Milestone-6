import { TopicCard } from "@/components/TopicCard";
import { TOPICS } from "@/data/mockData";

export function Trending() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-2xl md:text-3xl">
          Trending Topics
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Stay informed with the latest Utah news across multiple sources
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOPICS.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}

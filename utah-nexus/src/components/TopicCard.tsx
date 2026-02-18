import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Topic } from "@/data/mockData";

interface TopicCardProps {
  topic: Topic;
  className?: string;
}

export function TopicCard({ topic, className }: TopicCardProps) {
  return (
    <Link to={`/topic/${topic.id}`}>
      <Card
        className={cn(
          "overflow-hidden transition-transform hover:scale-[1.02] duration-200",
          className
        )}
      >
        <div className="relative h-40 overflow-hidden">
          <img
            src={topic.imageUrl}
            alt={topic.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <Badge
            variant="secondary"
            className="absolute bottom-2 right-2 bg-background/90 text-foreground"
          >
            {topic.articleCount} articles
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold line-clamp-2 text-base">{topic.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {topic.aiSummary}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

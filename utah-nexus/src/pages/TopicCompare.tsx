import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTopicById } from "@/data/mockData";

export function TopicCompare() {
  const { id } = useParams<{ id: string }>();
  const topic = id ? getTopicById(id) : undefined;

  if (!topic) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Topic not found.</p>
        <Button asChild className="mt-4">
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to={`/topic/${topic.id}`}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="font-display font-semibold text-xl">{topic.title}</h1>
          <p className="text-sm text-muted-foreground">
            Comparing coverage across {topic.articles.length} sources
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topic.articles.map((article) => (
          <Card key={article.id}>
            <div className="h-48 overflow-hidden rounded-t-lg">
              <img
                src={article.imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <Badge variant="secondary" className="mb-2">
                {article.source}
              </Badge>
              <p className="text-xs text-muted-foreground mb-2">
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
              <h3 className="font-semibold">{article.headline}</h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                {article.content}
              </p>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm text-primary hover:underline"
              >
                Read on {article.source}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

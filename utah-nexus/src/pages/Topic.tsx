import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TopicCard } from "@/components/TopicCard";
import { getTopicById, TOPICS } from "@/data/mockData";

export function Topic() {
  const { id } = useParams<{ id: string }>();
  const topic = id ? getTopicById(id) : undefined;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const otherTopics = topic
    ? TOPICS.filter((t) => t.id !== topic.id)
    : TOPICS;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
    <div className="space-y-8">
      <Button variant="ghost" size="icon" asChild>
        <Link to="/">
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </Button>

      {/* AI Summary Card */}
      <Card className="border-l-4 border-l-amber-500">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-12 bg-amber-500 rounded-full" />
            <h2 className="font-display font-semibold text-lg">
              Unbiased AI Summary
            </h2>
          </div>
          <p className="text-sm leading-relaxed">{topic.aiSummary}</p>

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="flex items-center gap-2 font-medium text-sm mb-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Shared Facts
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                {topic.sharedFacts.map((fact, i) => (
                  <li key={i}>{fact}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-2 font-medium text-sm mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                Divergent Narratives
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                {topic.divergentNarratives.map((narrative, i) => (
                  <li key={i}>{narrative}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Source Tabs */}
      <section>
        <h2 className="font-display font-semibold text-lg mb-4">
          Coverage from {topic.articles.length} Sources
        </h2>
        <Tabs defaultValue={topic.articles[0]?.id}>
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b border-border rounded-none gap-0 overflow-x-auto flex-nowrap">
            {topic.articles.map((article) => (
              <TabsTrigger
                key={article.id}
                value={article.id}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {article.source}
              </TabsTrigger>
            ))}
          </TabsList>
          {topic.articles.map((article) => (
            <TabsContent key={article.id} value={article.id} className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg">{article.headline}</h3>
                  <p className="italic text-sm text-muted-foreground mt-2">
                    {article.summary}
                  </p>
                  <p className="text-sm mt-4">{article.content}</p>
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
                  >
                    Read on {article.source}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Compare link */}
      <Button variant="outline" asChild>
        <Link to={`/topic/${topic.id}/compare`}>
          Compare Coverage Across Sources
        </Link>
      </Button>

      {/* Trending Topics carousel */}
      <section>
        <h2 className="font-display font-semibold text-lg mb-4">
          More Trending Topics
        </h2>
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory pb-2 -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {otherTopics.map((t) => (
              <div
                key={t.id}
                className="flex-shrink-0 w-[240px] sm:w-[260px] snap-start"
              >
                <TopicCard topic={t} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline" asChild>
            <Link to="/trending">Trending Topics</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

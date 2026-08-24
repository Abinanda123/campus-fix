import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Inbox } from "lucide-react";
import IssueCard from "@/components/IssueCard";

function IssueCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-5 w-16 rounded-4xl" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-3">
          <Skeleton className="h-4 w-20 rounded-4xl" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-16" />
      </div>
    </Card>
  );
}

export default function FeedPage() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    async function fetchIssues() {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("campus_issues")
        .select("*");

      if (sortBy === "newest") {
        query = query.order("created_at", { ascending: false });
      } else {
        query = query.order("vote_count", { ascending: false });
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        setError(fetchError.message);
      } else {
        setIssues(data);
      }

      setLoading(false);
    }

    fetchIssues();
  }, [sortBy]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Campus Issues</h1>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Sort:</span>
          <button
            onClick={() => setSortBy("newest")}
            className={`rounded-lg px-3 py-1 text-sm transition-colors ${
              sortBy === "newest"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy("votes")}
            className={`rounded-lg px-3 py-1 text-sm transition-colors ${
              sortBy === "votes"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Most Voted
          </button>
        </div>
      </div>

      {!loading && !error && (
        <div className="mb-4">
          <Badge variant="secondary">
            {issues.length} {issues.length === 1 ? "issue" : "issues"}
          </Badge>
        </div>
      )}

      {loading && (
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <IssueCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && error && (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12">
            <AlertCircle className="text-destructive size-10" />
            <p className="text-destructive font-medium">Failed to load issues</p>
            <p className="text-muted-foreground text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && issues.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12">
            <Inbox className="text-muted-foreground size-10" />
            <p className="font-medium">No issues reported yet</p>
            <p className="text-muted-foreground text-sm">
              Be the first to report a campus issue.
            </p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && issues.length > 0 && (
        <div className="grid gap-4">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
}

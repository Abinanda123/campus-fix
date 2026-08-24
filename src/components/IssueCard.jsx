import { useState } from "react";
import { ImageOff, MapPin, Clock, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

const STATUS_STYLES = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
  Resolved: "bg-green-100 text-green-800 border-green-200",
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now - d;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function IssueCard({ issue }) {
  const {
    id,
    title,
    description,
    category,
    location,
    image_url,
    status,
    created_at,
  } = issue;

  const [voteCount, setVoteCount] = useState(issue.vote_count);
  const [voting, setVoting] = useState(false);
  const [voteMessage, setVoteMessage] = useState(null);

  async function handleVote() {
    if (voting) return;

    setVoting(true);
    setVoteMessage(null);

    const { error } = await supabase.rpc("increment_campus_issue_vote", {
      issue_id: id,
    });

    if (error) {
      setVoteMessage({ type: "error", text: error.message });
    } else {
      setVoteCount((c) => c + 1);
      setVoteMessage({ type: "success", text: "Voted!" });
    }

    setVoting(false);
    setTimeout(() => setVoteMessage(null), 2000);
  }

  return (
    <Card className="overflow-hidden">
      {image_url ? (
        <img
          src={image_url}
          alt={title}
          className="aspect-video w-full object-cover"
        />
      ) : (
        <div className="bg-muted flex aspect-video w-full items-center justify-center">
          <ImageOff className="text-muted-foreground size-8" />
          <span className="text-muted-foreground ml-2 text-sm">No image</span>
        </div>
      )}

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-snug">{title}</CardTitle>
          <Badge
            variant="outline"
            className={STATUS_STYLES[status] || STATUS_STYLES.Pending}
          >
            {status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {description}
        </p>

        <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <span className="flex items-center gap-1">
            <MapPin className="size-3" />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {formatDate(created_at)}
          </span>
        </div>

        <div className="border-t pt-3">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleVote}
              disabled={voting}
              className={cn(
                "gap-1",
                voteMessage?.type === "success" &&
                  "border-green-300 bg-green-50 text-green-700"
              )}
            >
              <ChevronUp className="size-4" />
              {voting ? "Voting…" : "Upvote"}
            </Button>

            <span className="text-muted-foreground text-xs">
              <span className="font-semibold text-foreground">{voteCount}</span>{" "}
              {voteCount === 1 ? "vote" : "votes"}
            </span>

            {voteMessage && (
              <span
                className={cn(
                  "text-xs",
                  voteMessage.type === "error"
                    ? "text-red-600"
                    : "text-green-600"
                )}
              >
                {voteMessage.text}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

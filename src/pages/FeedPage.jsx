import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FeedPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Campus Issues</h1>
        <Badge variant="secondary">0 issues</Badge>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-muted-foreground text-sm">
            No issues reported yet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Be the first to report a campus issue.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

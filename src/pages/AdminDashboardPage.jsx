import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  LogOut,
  AlertCircle,
  CheckCircle2,
  ChevronUp,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
];

const STATUS_BADGE = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  in_progress: "bg-blue-100 text-blue-800 border-blue-200",
  resolved: "bg-green-100 text-green-800 border-green-200",
};

const STATUS_LABEL = {
  pending: "Pending",
  in_progress: "In Progress",
  resolved: "Resolved",
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [signingOut, setSigningOut] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const showFeedback = useCallback((type, text) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), 3000);
  }, []);

  useEffect(() => {
    async function fetchIssues() {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from("campus_issues")
        .select("*")
        .order("vote_count", { ascending: false });
      if (fetchError) {
        setError(fetchError.message);
      } else {
        setIssues(data);
      }
      setLoading(false);
    }
    fetchIssues();
  }, []);

  async function handleStatusChange(issueId, newStatus) {
    if (updatingId) return;
    setUpdatingId(issueId);

    const { error: updateError } = await supabase
      .from("campus_issues")
      .update({ status: newStatus })
      .eq("id", issueId);

    if (updateError) {
      showFeedback("error", updateError.message);
    } else {
      setIssues((prev) =>
        prev.map((i) => (i.id === issueId ? { ...i, status: newStatus } : i))
      );
      showFeedback("success", "Status updated");
    }

    setUpdatingId(null);
  }

  async function handleLogout() {
    setSigningOut(true);
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  const total = issues.length;
  const pending = issues.filter((i) => i.status === "pending").length;
  const inProgress = issues.filter((i) => i.status === "in_progress").length;
  const resolved = issues.filter((i) => i.status === "resolved").length;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      {feedback && (
        <div
          className={cn(
            "fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm shadow-lg",
            feedback.type === "success"
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800"
          )}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="size-4 shrink-0" />
          ) : (
            <AlertCircle className="size-4 shrink-0" />
          )}
          {feedback.text}
        </div>
      )}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground truncate text-sm">
            {session?.user?.email}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            disabled={signingOut}
            className="gap-1.5"
          >
            <LogOut className="size-4" />
            {signingOut ? "Signing out…" : "Sign Out"}
          </Button>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="mb-2 h-4 w-16" />
                <Skeleton className="h-7 w-10" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-muted-foreground text-xs font-medium">Total</p>
              <p className="text-2xl font-bold">{total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="flex items-center gap-1 text-xs font-medium text-yellow-700">
                <AlertTriangle className="size-3" /> Pending
              </p>
              <p className="text-2xl font-bold">{pending}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="flex items-center gap-1 text-xs font-medium text-blue-700">
                <Clock className="size-3" /> In Progress
              </p>
              <p className="text-2xl font-bold">{inProgress}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="flex items-center gap-1 text-xs font-medium text-green-700">
                <CheckCircle className="size-3" /> Resolved
              </p>
              <p className="text-2xl font-bold">{resolved}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {error && (
        <Card className="mb-6">
          <CardContent className="flex flex-col items-center gap-3 py-12">
            <AlertCircle className="text-destructive size-10" />
            <p className="text-destructive font-medium">
              Failed to load issues
            </p>
            <p className="text-muted-foreground text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && issues.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12">
            <AlertCircle className="text-muted-foreground size-10" />
            <p className="font-medium">No issues yet</p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && issues.length > 0 && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs font-medium text-gray-500">
                  <th className="px-4 py-3">Title</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Category</th>
                  <th className="hidden px-4 py-3 md:table-cell">Location</th>
                  <th className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1">
                      <ChevronUp className="size-3" /> Votes
                    </span>
                  </th>
                  <th className="px-4 py-3">Status</th>
                  <th className="hidden px-4 py-3 lg:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue) => (
                  <tr key={issue.id} className="border-b last:border-b-0">
                    <td className="px-4 py-3">
                      <p className="font-medium">{issue.title}</p>
                      <p className="text-muted-foreground mt-0.5 truncate text-xs sm:hidden">
                        {issue.category}
                      </p>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <Badge variant="secondary" className="text-xs">
                        {issue.category}
                      </Badge>
                    </td>
                    <td className="text-muted-foreground hidden px-4 py-3 text-xs md:table-cell">
                      {issue.location}
                    </td>
                    <td className="px-4 py-3 text-center text-xs font-semibold">
                      {issue.vote_count}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={issue.status}
                        onChange={(e) =>
                          handleStatusChange(issue.id, e.target.value)
                        }
                        disabled={updatingId === issue.id}
                        className={cn(
                          "border-input bg-background rounded-lg border px-2 py-1 text-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-wait disabled:opacity-50",
                          STATUS_BADGE[issue.status]
                        )}
                      >
                        {STATUSES.map((s) => (
                          <option key={s.value} value={s.value}>
                            {STATUS_LABEL[s.value]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-muted-foreground hidden px-4 py-3 text-xs lg:table-cell">
                      {formatDate(issue.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

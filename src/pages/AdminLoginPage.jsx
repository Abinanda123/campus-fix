import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, LogIn } from "lucide-react";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { session, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (authLoading) {
    return (
      <div className="mx-auto flex w-full max-w-sm items-center justify-center px-4 py-16">
        <div className="w-full space-y-4">
          <div className="bg-muted h-8 w-48 animate-pulse rounded-md" />
          <div className="bg-muted h-10 w-full animate-pulse rounded-md" />
          <div className="bg-muted h-10 w-full animate-pulse rounded-md" />
        </div>
      </div>
    );
  }

  if (session) {
    return <Navigate to="/admin" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    setError(null);

    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setSubmitting(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      setError(authError.message);
      setSubmitting(false);
      return;
    }

    navigate("/admin");
  }

  return (
    <div className="mx-auto flex w-full max-w-sm items-center justify-center px-4 py-16">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Admin Login</CardTitle>
          <CardDescription>
            Sign in to access the admin dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="admin-email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@campus.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting}
                autoComplete="current-password"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full gap-1.5"
              disabled={submitting}
            >
              <LogIn className="size-4" />
              {submitting ? "Signing in…" : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

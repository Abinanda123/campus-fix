import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="mx-auto flex w-full max-w-sm items-center justify-center px-4 py-16">
        <div className="w-full space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

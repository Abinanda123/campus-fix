import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/AuthContext";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Skeleton } from "@/components/ui/skeleton";

const FeedPage = lazy(() => import("@/pages/FeedPage"));
const ReportPage = lazy(() => import("@/pages/ReportPage"));
const AdminLoginPage = lazy(() => import("@/pages/AdminLoginPage"));
const AdminDashboardPage = lazy(() => import("@/pages/AdminDashboardPage"));

function PageSkeleton() {
  return (
    <div className="mx-auto max-w-5xl space-y-4 px-4 py-8">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="bg-background text-foreground min-h-screen">
          <Navbar />
          <main>
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                <Route path="/" element={<FeedPage />} />
                <Route path="/report" element={<ReportPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

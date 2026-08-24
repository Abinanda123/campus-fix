import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-muted-foreground text-sm">
            Dashboard coming soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            This page will show all reported issues with status management controls.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

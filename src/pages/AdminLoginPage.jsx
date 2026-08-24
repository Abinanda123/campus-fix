import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-sm items-center justify-center px-4 py-16">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Admin authentication coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

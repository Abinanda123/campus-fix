import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Report an Issue</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-muted-foreground text-sm">
            Report form coming soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            This page will contain the issue submission form.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

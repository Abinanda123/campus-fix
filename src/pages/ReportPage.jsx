import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const CATEGORIES = [
  "Electrical",
  "Water",
  "Furniture",
  "Cleanliness",
  "Infrastructure",
  "Other",
];

export default function ReportPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  function resetForm() {
    setTitle("");
    setDescription("");
    setCategory("");
    setLocation("");
    setImageFile(null);
    setFieldErrors({});
    const fileInput = document.getElementById("issue-image");
    if (fileInput) fileInput.value = "";
  }

  function validate() {
    const errs = {};
    if (!title.trim()) errs.title = "Title is required.";
    if (!description.trim()) errs.description = "Description is required.";
    if (!category) errs.category = "Please select a category.";
    if (!location.trim()) errs.location = "Location is required.";
    if (!imageFile) errs.image = "Please upload an image of the issue.";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    setError(null);

    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      setError("Please fix the errors below.");
      return;
    }

    setSubmitting(true);

    try {
      let imageUrl = null;

      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const filePath = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("campus-issue-images")
          .upload(filePath, imageFile);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("campus-issue-images")
          .getPublicUrl(filePath);
        imageUrl = urlData.publicUrl;
      }

      const { error: insertError } = await supabase
        .from("campus_issues")
        .insert({
          title: title.trim(),
          description: description.trim(),
          category,
          location: location.trim(),
          image_url: imageUrl,
        });
      if (insertError) throw insertError;

      setSuccess(true);
      resetForm();
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Report an Issue</h1>

      {success && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
          <CheckCircle2 className="size-5 shrink-0" />
          <span>Issue reported successfully! Redirecting…</span>
        </div>
      )}

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          <AlertCircle className="size-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Issue Details</CardTitle>
          <CardDescription>
            Fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="issue-title" className="text-sm font-medium">
                Title *
              </label>
              <Input
                id="issue-title"
                placeholder="e.g. Broken light in hallway"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (fieldErrors.title)
                    setFieldErrors((p) => ({ ...p, title: null }));
                }}
                disabled={submitting}
                aria-invalid={!!fieldErrors.title}
                className={fieldErrors.title ? "border-red-500 focus-visible:ring-red-500/30" : ""}
              />
              {fieldErrors.title && (
                <p className="text-xs text-red-600">{fieldErrors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="issue-description"
                className="text-sm font-medium"
              >
                Description *
              </label>
              <Textarea
                id="issue-description"
                placeholder="Describe the problem in detail…"
                rows={4}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (fieldErrors.description)
                    setFieldErrors((p) => ({ ...p, description: null }));
                }}
                disabled={submitting}
                aria-invalid={!!fieldErrors.description}
                className={fieldErrors.description ? "border-red-500 focus-visible:ring-red-500/30" : ""}
              />
              {fieldErrors.description && (
                <p className="text-xs text-red-600">{fieldErrors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="issue-category" className="text-sm font-medium">
                Category *
              </label>
              <select
                id="issue-category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (fieldErrors.category)
                    setFieldErrors((p) => ({ ...p, category: null }));
                }}
                disabled={submitting}
                aria-invalid={!!fieldErrors.category}
                className={`border-input bg-background text-foreground flex h-9 w-full rounded-lg border px-3 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 ${fieldErrors.category ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {fieldErrors.category && (
                <p className="text-xs text-red-600">{fieldErrors.category}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="issue-location" className="text-sm font-medium">
                Location *
              </label>
              <Input
                id="issue-location"
                placeholder="e.g. Building A, Room 201"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (fieldErrors.location)
                    setFieldErrors((p) => ({ ...p, location: null }));
                }}
                disabled={submitting}
                aria-invalid={!!fieldErrors.location}
                className={fieldErrors.location ? "border-red-500 focus-visible:ring-red-500/30" : ""}
              />
              {fieldErrors.location && (
                <p className="text-xs text-red-600">{fieldErrors.location}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="issue-image" className="text-sm font-medium">
                Image *
              </label>
              <Input
                id="issue-image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImageFile(e.target.files?.[0] ?? null);
                  if (fieldErrors.image)
                    setFieldErrors((p) => ({ ...p, image: null }));
                }}
                disabled={submitting}
                aria-invalid={!!fieldErrors.image}
                className={fieldErrors.image ? "border-red-500 focus-visible:ring-red-500/30" : ""}
              />
              {fieldErrors.image && (
                <p className="text-xs text-red-600">{fieldErrors.image}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Report Issue"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

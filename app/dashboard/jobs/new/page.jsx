"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "@/lib/api/jobs.api";

export default function NewJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await createJob({ title, description });
      router.push("/dashboard/jobs");
    } catch (err) {
      setError(err.message || "Failed to create job");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <h1 className="text-xl font-semibold mb-4">Create Job</h1>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
        <input
          className="border p-2 w-full"
          placeholder="Job title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="bg-black text-white px-4 py-2"
        >
          {saving ? "Creating..." : "Create"}
        </button>
      </form>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ScoreBadge from "@/app/components/ScoreBadge";
import UsageBar from "@/app/components/UsageBar";

import {
  getCandidatesByJob,
  createCandidate,
  deleteCandidate,
} from "@/lib/api/candidates.api";

import { getToken } from "@/lib/auth/token";

export default function CandidatesPage() {
  const { id: jobId } = useParams();
  const router = useRouter();

  const [candidates, setCandidates] = useState([]);
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

  async function loadCandidates() {
    const res = await getCandidatesByJob(jobId);
    setCandidates(res.data);
  }

  async function loadUsage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/org/usage`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setUsage(await res.json());
  }

  useEffect(() => {
    if (!jobId) return;

    Promise.all([loadCandidates(), loadUsage()]).finally(() =>
      setLoading(false)
    );
  }, [jobId]);

  // 🔥 real polling when parsing running
  const hasProcessing = candidates.some((c) => c.parseStatus === "PROCESSING");

  useEffect(() => {
    if (!hasProcessing) return;

    const id = setInterval(loadCandidates, 4000);
    return () => clearInterval(id);
  }, [hasProcessing]);

  async function handleCreate(e) {
    e.preventDefault();
    const newCandidate = await createCandidate(jobId, {
      name,
      email,
      phone,
      resumeUrl,
    });

    setCandidates((prev) => [newCandidate, ...prev]);
    setName("");
    setEmail("");
    setPhone("");
    setResumeUrl("");
  }

  async function handleDelete(candidateId) {
    if (!confirm("Delete this candidate?")) return;

    await deleteCandidate(candidateId);
    setCandidates((prev) => prev.filter((c) => c.id !== candidateId));
  }

  async function uploadResume(candidateId, file) {
    if (!file) return;

    if (usage && usage.resumesParsed >= usage.limit) {
      alert("Monthly resume limit reached.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/candidates/${candidateId}/resumes`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      }
    );

    if (!res.ok) return alert("Resume upload failed");

    loadCandidates();
    loadUsage();
  }

  if (loading) return <p>Loading candidates...</p>;

  const sorted = [...candidates].sort(
    (a, b) => (b.confidenceScore ?? -1) - (a.confidenceScore ?? -1)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Candidates</h1>
        <button onClick={() => router.back()} className="text-sm underline">
          Back
        </button>
      </div>

      {/* Usage bar */}
      {usage && <UsageBar used={usage.resumesParsed} limit={usage.limit} />}

      {/* Create form */}
      <form onSubmit={handleCreate} className="border p-4 space-y-3">
        <h2 className="font-medium">Add Candidate</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          placeholder="Resume URL"
          value={resumeUrl}
          onChange={(e) => setResumeUrl(e.target.value)}
          className="border p-2 w-full"
        />

        <button className="bg-black text-white px-4 py-2">Create</button>
      </form>

      {/* Candidates list */}
      <div className="space-y-3">
        {sorted.map((c) => (
          <div
            key={c.id}
            className="border p-4 flex justify-between items-start gap-6"
          >
            <div>
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-gray-600">{c.email}</p>
              <p className="text-sm">Status: {c.status}</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <ScoreBadge score={c.confidenceScore} status={c.parseStatus} />
              <p className="text-xs text-gray-500">📄 {c.resumeCount}</p>

              <label
                className={`text-xs cursor-pointer ${
                  usage && usage.resumesParsed >= usage.limit
                    ? "text-gray-400"
                    : "text-blue-600 hover:underline"
                }`}
              >
                Upload resume
                <input
                  type="file"
                  disabled={usage && usage.resumesParsed >= usage.limit}
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0])
                      uploadResume(c.id, e.target.files[0]);
                  }}
                />
              </label>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() =>
                  router.push(`/dashboard/jobs/${jobId}/candidates/${c.id}/edit`)
                }
                className="text-sm underline"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(c.id)}
                className="text-sm text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

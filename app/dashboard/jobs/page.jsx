"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getJobs, deleteJob } from "@/lib/api/jobs.api";

export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);


  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await getJobs();
        setJobs(res?.data || []);
      } catch (err) {
        setError(err.message );
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, [router]);

  
  async function handleDelete(jobId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
        setDeletingId(jobId)
      await deleteJob(jobId);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    } catch (err) {
      alert(err.message || "Failed to delete job");
    }finally{
        setDeletingId(null)
    }
  }

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;


  return (
    <>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Jobs</h1>
        <Link
          href="/dashboard/jobs/new"
          className="bg-black text-white px-3 py-2"
        >
          Create Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <p>No jobs yet.</p>
      ) : (
        <ul className="space-y-3">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border p-3 flex justify-between items-center"
            >
              <div>
                {/* 👇 Navigation decision lives HERE */}
                <Link href={`/dashboard/jobs/${job.id}`}>
                  <p className="font-medium cursor-pointer hover:underline">
                    {job.title}
                  </p>
                </Link>

                {job.description && (
                  <p className="text-sm text-gray-500">
                    {job.description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleDelete(job.id)}
                className="text-red-600 text-sm hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

import { fetcher } from "../fetcher";

export const applyToJob = async (jobId, formData) => {
  const res = await fetcher(`/api/public/jobs/${jobId}/apply`, {
    method: "POST",
    body: formData,
  });

  return res; // ✅ RETURN FULL RESPONSE
};

export const getPublicJob = async (jobId) => {
  const res = await fetcher(`/api/public/jobs/${jobId}`);
  return res.data;
};

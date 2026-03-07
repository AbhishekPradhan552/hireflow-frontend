import { fetcher } from "../fetcher";

export const getCandidatesByJob = (jobId) =>
  fetcher(`/jobs/${jobId}/candidates`);

export const rankedCandidates = (jobId) =>
  fetcher(`/jobs/${jobId}/candidates/ranked`);

export const createCandidate = (jobId, data) =>
  fetcher(`/jobs/${jobId}/candidates`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getCandidateById = (id) => fetcher(`/candidates/${id}`);

export const updateCandidate = (id, data) =>
  fetcher(`/candidates/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteCandidate = (id) =>
  fetcher(`/candidates/${id}`, {
    method: "DELETE",
  });

export const getJobStats = (jobId) => fetcher(`/jobs/${jobId}/stats`);

export const getCandidatePipeline = (jobId) =>
  fetcher(`/jobs/${jobId}/pipeline`);

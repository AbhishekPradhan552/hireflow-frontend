import { fetcher } from "../fetcher";

export const getJobs = () => fetcher("/jobs");

export const getJobById = (id) => fetcher(`/jobs/${id}`);

export const createJob = (data) =>
  fetcher("/jobs", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateJob = (id, data) =>
  fetcher(`/jobs/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteJob = (id) =>
  fetcher(`/jobs/${id}`, {
    method: "DELETE",
  });

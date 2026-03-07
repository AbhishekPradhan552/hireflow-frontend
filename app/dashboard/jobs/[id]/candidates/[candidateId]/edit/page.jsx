"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getCandidateById,
  updateCandidate,
} from "@/lib/api/candidates.api";
import {downloadResume, deleteResume} from "@/lib/api/resumes.api.js"
import ScoreBadge from "@/app/components/ScoreBadge";

export default function EditCandidatePage(){
    const {id:jobId, candidateId} = useParams()
    const router = useRouter()

    const [loading, setLoading]= useState(true)
    const [resumes, setResumes] = useState([]);

    const [form, setForm]= useState({
        name:"",
        email:"",
        phone:"",
        status:"",
        
    })
    async function loadCandidate(){
            try{
                const data = await getCandidateById(candidateId)
                setForm({
                    name: data.name ?? "",
                    email: data.email ?? "",
                    phone: data.phone ?? "",
                    status: data.status ?? "",
                    
                })
                setResumes(data.resumes ?? [])
            }catch(err){
                console.error("Failed to load candidate", err)                                
            }finally{
                setLoading(false)
            }
    }

    useEffect(()=>{    
        if(candidateId) loadCandidate()
    },[candidateId])


    function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            await updateCandidate(candidateId,form)
            router.push(`/dashboard/jobs/${jobId}/candidates`)
        }catch(err){
            console.error("Update failed", err)
            alert("Update failed")
        }
    }
    if(loading) return <p>Loading...</p>

    async function handleDeleteResume(resumeId) {
        if (!confirm("Delete this resume?")) return;

        try {
            await deleteResume(resumeId);
            await loadCandidate(); // ✅ refresh candidate + resume history
        } catch (err) {
            console.error(err);
            alert("Failed to delete resume");
        }
   }

  

  return (

    <>
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h1 className="text-xl font-semibold">Edit Candidate</h1>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full"
        placeholder="Name"
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full"
        placeholder="Email"
      />

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        className="border p-2 w-full"
        placeholder="Phone"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="">Select status</option>
        <option value="APPLIED">Applied</option>
        <option value="INTERVIEW">Interview</option>
        <option value="OFFER">Offer</option>
        <option value="REJECTED">Rejected</option>
      </select>

     

      <button className="bg-black text-white px-4 py-2">
        Update Candidate
      </button>
    </form>

    <hr className="my-6" />

    <h2 className="text-lg font-medium">Resume History</h2>

    {resumes.length === 0 && (
    <p className="text-sm text-gray-500">
        No resumes uploaded yet
    </p>
    )}

    <div className="space-y-3">
    {resumes.map((r) => (
        <div
        key={r.id}
        className="border p-3 rounded flex justify-between items-start"
        >
        <div>
            <p className="font-medium">{r.originalName}</p>
            <p className="text-sm text-gray-600">
            Uploaded: {new Date(r.createdAt).toLocaleString()}
            </p>
            <p className="text-sm">
            Status: {r.parseStatus}
            </p>
        </div>
        

        <div className="flex flex-column items-end gap-2">
            {r.parseStatus === "COMPLETED" ? (
                <ScoreBadge  score={r.confidenceScore}/>
            ): (
                <span className="text-sm italic text-gray-500">
                    Processing...
                </span>
            )}
            <button
                onClick={() => downloadResume(r.id)}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded transition"
            >
                ⬇️ Download
            </button>

            <button
                onClick={()=> handleDeleteResume(r.id)}
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded transition"
            >
                Delete
            </button>
        </div>
        </div>
    ))}
    </div>
    
    </>
    

  );
}
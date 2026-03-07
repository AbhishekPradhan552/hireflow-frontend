"use client"
import { useEffect, useState } from "react"
import {useRouter,useParams } from "next/navigation"
import Link from "next/link"
import { getJobById,deleteJob } from "@/lib/api/jobs.api"

export default function JobDetailPage(){
    const { id } = useParams();
    const router = useRouter()
    const [job, setJob]= useState(null)
    const [loading, setLoading]= useState(true)

    useEffect(()=>{        
        async function loadJob(){
           try{
            const data = await getJobById(id)
            setJob(data)
           }catch(error){
            router.push("/dashboard/jobs")
           }finally{
            setLoading(false)
           }
            
        }
        loadJob()
    },[id,router]) 

    if(loading) return <p> Loading...</p>
    if(!job) return null

    async function handleDelete(){
        await deleteJob(id)
        router.push("/dashboard/jobs")
    }

    return(
        <>
            <h1 className="text-xl font-semibold">{job.title}</h1>

            {job.description && (
                <p className="mt-2 text-gray-600">{job.description}</p>
            )}
            <div className="mt-4 flex gap-3">
                <Link href={`/dashboard/jobs/${id}/edit`} className="border px-3 py-1"
                >
                    Edit Job
                </Link>

                <Link
                href={`/dashboard/jobs/${job.id}/candidates`}
                className="border px-3 py-1"
                >
                    View Candidates
                </Link>
            </div>



            <button
                className="border px-3 py-1 text-red-500"
                onClick={handleDelete}
            >
                Delete
            </button>

        </>

    )
}
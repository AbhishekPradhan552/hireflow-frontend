"use client"

import { useEffect, useState } from "react"
import {useRouter,useParams } from "next/navigation"
import { getJobById, updateJob} from "@/lib/api/jobs.api"
 

export default function EditJobPage(){
    const { id } = useParams();
    const router= useRouter()
    const[title, setTitle]= useState("")
    const[description, setDescription]= useState("")
    const[loading, setLoading]= useState(true)
    const[saving, setSaving]=useState(false)

    useEffect(()=>{
        if (!id) return; 

        async function loadJob(){
            try{
                const job= await getJobById(id)
                setTitle(job.title)
                setDescription(job.description || "")
            }catch{
                router.push("/dashboard/jobs")
            }finally{
                setLoading(false)
            }
            
        }
        loadJob()

    },[id,router])

    async function handleSubmit(e){
        e.preventDefault()
        setSaving(true)
        try{
            await updateJob(id, {title, description})
            router.push(`/dashboard/jobs/${id}`)
        }finally{
            setSaving(false)
        }                      
    }
    if(loading) return <p>Loading...</p>
    return(
        <div className="max-w-md">
            <h1 className="text-xl font-semibold mb-4">Edit Job</h1>
            <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
                <input 
                className="border p-2 w-full" 
                value ={title}
                onChange={(e)=> setTitle(e.target.value)}
                placeholder="Job title"
                required/>

                <textarea 
                className="border p-2 w-full"
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
                placeholder="Job description"
                rows={4}/>

                <button 
                type="submit"
                disabled={saving}
                className="bg-black text-white border px-4 py-2">
                    {saving ? "Saving..." : "Update Job"}
                </button>
            </form>


        
        </div>
    )
}
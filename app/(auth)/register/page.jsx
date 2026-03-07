"use client"

import {useState} from "react";
import {useRouter} from "next/navigation"


export default function RegisterPage() {

  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e){
    e.preventDefault()
    setError("")
    setLoading(true)

    try{
      const res = await fetch("http://localhost:5001/register",{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
      });

      const data = await res.json()
      if(!res.ok){
        throw new Error(data.error || "Registration failed")
      }
      // success - go to login
      router.push("/login")
    }catch(err){
      setError(err.message)
    }finally{
      setLoading(false)
    }
  }
  return (
    
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
        {error && <p className="text-red-500">{error}</p>}

        <input 
         type="email"
         placeholder="Email"
         value={email}
         onChange={(e)=> setEmail(e.target.value)}
         className="border p-2 w-full"
          />

        <input  
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)} 
        className="border p-2 w-full"/>  

        <button 
        type= "submit" disabled = {loading} className="bg-black text-white px-4 py-2">
          {loading ? "Registering...": "Register"}
        </button>
      </form>
    
  );
}
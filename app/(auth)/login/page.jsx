"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
    >

      {/* 🔥 HEADER */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-zinc-900">
          Welcome back
        </h2>
        <p className="text-sm text-zinc-500">
          Sign in to continue to HireFlow
        </p>
      </div>

      {/* 🔥 ERROR */}
      {error && (
        <div className="
          text-sm text-red-600
          bg-red-50 border border-red-200
          px-3 py-2 rounded-lg
        ">
          {error}
        </div>
      )}

      {/* 🔥 EMAIL */}
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="
            h-11 rounded-xl
            bg-white/80 backdrop-blur
            border border-zinc-200
            focus-visible:ring-2 focus-visible:ring-indigo-200
            focus-visible:border-indigo-400
            transition
          "
        />
      </div>

      {/* 🔥 PASSWORD */}
      <div className="space-y-2">
        <div className="relative">
        <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
            h-11 rounded-xl pr-12
            bg-white/80 backdrop-blur
            border border-zinc-200
            focus-visible:ring-2 focus-visible:ring-indigo-200
            focus-visible:border-indigo-400
            
            transition-all duration-200
            focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]
            "
        />

        <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-xs font-medium
            text-zinc-500 hover:text-zinc-800
            "
        >
            {showPassword ? "Hide" : "Show"}
        </button>
        </div>
      </div>

      {/* 🔥 ACTIONS */}
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <span className="hover:text-zinc-700 cursor-pointer transition">
          Forgot password?
        </span>

        <span
          onClick={() => router.push("/register")}
          className="hover:text-indigo-600 cursor-pointer transition font-medium"
        >
          Create account
        </span>
      </div>

      {/* 🔥 BUTTON */}
      <Button
        type="submit"
        disabled={loading}
        className="
          w-full h-11 rounded-xl font-medium
          bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600
          bg-[length:200%_100%]

          text-white
          shadow-md hover:shadow-xl
          transition-all duration-300
          hover:scale-[1.02]
          hover:bg-right
          active:scale-[0.98]
        "
      >
        {loading ? "Signing in..." : "Sign in"}
      </Button>

    </form>
  );
}
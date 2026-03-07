import Link from "next/link"
import AuthGuard from "@/components/AuthGuard"

export default function DashboardLayout({children}){
    return(
      <AuthGuard>
        <div className="min-h-screen flex">
          <aside className="w-64 border-r">
            <div className=" text-xl p-4 font-semibold">
              HireFlow
            </div>

            <nav className="px-4 space-y-2">
              <Link href="/dashboard" className="block hover:text-blue-600">Dashboard</Link>
              <Link href="/dashboard/jobs" className="block hover:text-blue-600">Jobs</Link>
              <Link href="/dashboard/billing" className="block hover:text-blue-600">Billing</Link>
            </nav>
          </aside>

          <main className="flex-1 p-6">
            {children}
          </main>
       </div>

      </AuthGuard>
        
    )
}
export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen flex justify-center pt-24">
      <div className="w-full max-w-sm mx-auto">
        {children}
      </div>
    </main>
  )
}

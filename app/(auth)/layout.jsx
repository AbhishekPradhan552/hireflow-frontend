import { Card, CardContent } from "@/components/ui/card";

export default function AuthLayout({ children }) {
  return (
    <main className="
      relative min-h-screen flex flex-col
      bg-gradient-to-br from-indigo-50 via-white to-blue-50
      overflow-hidden
    ">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-200/40 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-blue-200/40 blur-[100px] rounded-full" />
      </div>

      {/* 🔥 TOP BRAND */}
      <div className="w-full px-6 py-6 flex justify-center">
        <h1 className="
          text-2xl font-semibold tracking-tight
          bg-gradient-to-r from-zinc-900 to-zinc-500 bg-clip-text text-transparent
        ">
          HireFlow
        </h1>
      </div>

      {/* 🔥 CONTENT */}
      <div className="flex flex-1 items-center justify-center px-6">

        <div className="
          w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center
        ">

          {/* 🔥 LEFT SIDE (INFO + ANIMATION) */}
          <div className="
            hidden md:flex flex-col justify-center space-y-6
            animate-in fade-in slide-in-from-left-10 duration-700
          ">

            <h2 className="text-4xl font-semibold leading-tight text-zinc-900">
              Build better teams with <br />
              <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">AI-powered hiring</span>
            </h2>

            <p className="text-zinc-600 max-w-md text-sm leading-relaxed">
              Automatically extract skills, analyze resumes, and surface the best candidates — 
              all in seconds.
            </p>

            {/* 🔥 FEATURE POINTS */}
            <div className="space-y-3 mt-4">

              {[
                "AI-powered skill extraction",
                "Smart candidate matching",
                "Instant resume insights",
              ].map((item, i) => (
                <div
                  key={i}
                  className="
                    flex items-center gap-3 text-sm text-zinc-700
                    animate-in fade-in slide-in-from-left-5
                  "
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <div className="h-2 w-2 rounded-full bg-indigo-500" />
                  {item}
                </div>
              ))}

            </div>

            {/* 🔥 FLOATING VISUAL CARD */}
            <div className="
              mt-8 w-[280px] rounded-2xl
              bg-white/60 backdrop-blur-xl
              border border-white/40
              shadow-[0_15px_40px_rgba(0,0,0,0.08)]
              p-4

              animate-in fade-in zoom-in-95 duration-700
              hover:scale-[1.03] transition
            ">
              <p className="text-xs text-zinc-500 mb-2">AI Insight</p>
              <p className="text-sm font-medium text-zinc-800">
                87% match found for Backend Engineer role
              </p>
            </div>

          </div>

          {/* 🔥 RIGHT SIDE (AUTH CARD) */}
          <div className="
            flex justify-center
            animate-in fade-in zoom-in-95 duration-500
          ">

            <Card
              className="
                w-full max-w-md
                relative rounded-3xl
                bg-white/70 backdrop-blur-xl
                border border-white/40
                shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                transition-all duration-300
                hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]
                
              "
            >
              <CardContent className="p-8">

                {/* subtle glow */}
                <div className="
                  absolute inset-0 rounded-3xl
                  bg-gradient-to-br from-white/40 to-transparent
                  pointer-events-none
                " />

                {children}

              </CardContent>
            </Card>

          </div>

        </div>

      </div>

      {/* 🔥 BOTTOM (instead of boring footer) */}
      <div className="
        text-center text-xs text-zinc-500 pb-6
        animate-in fade-in duration-700
      ">
        Trusted by modern teams building faster 🚀
      </div>

    </main>
  );
}
import Image from "next/image"
import { FlaskConical } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Section - Visuals */}
      <div className="relative hidden w-1/2 flex-col bg-muted lg:flex border-r border-border">
        {/* Overlays for contrast */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10" />
        
        <Image
          src="/auth-bg.png"
          alt="Laboratory and Warehouse"
          fill
          className="object-cover"
          priority
        />
        
        {/* Centered Informational Text */}
        <div className="relative z-20 flex flex-col h-full p-10 items-center justify-center text-center text-white">
          <div className="max-w-md drop-shadow-lg">
            <h1 className="text-4xl font-semibold tracking-tight mb-4 text-white">
              Intelligent Chemical Inventory Management.
            </h1>
            <p className="text-lg text-white/90 font-medium">
              Ensure safety, compliance, and precise tracking from the warehouse to the laboratory bench.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Auth Form */}
      <div className="flex w-full flex-col items-center justify-center lg:w-1/2 p-8 sm:p-12">
        <div className="w-full max-w-[420px]">
          {children}
        </div>
      </div>
    </div>
  )
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Activity, BarChart4 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 md:pt-24 lg:pt-32 pb-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Enterprise-Grade Inventory Management
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
            Chemical Inventory Management Built For <span className="text-primary">Compliance, Safety & Operational Control</span>
          </h1>
          
          <p className="mt-4 text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Track batches, monitor expiry dates, manage hazardous materials, automate stock alerts, and maintain complete audit trails from a single platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90">
              Request Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8 border-border hover:bg-muted">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Mockup */}
        <div className="mt-16 md:mt-24 relative max-w-5xl mx-auto">
          <div className="rounded-xl md:rounded-2xl border border-border bg-card shadow-2xl overflow-hidden relative">
            {/* Mockup Header */}
            <div className="bg-muted border-b border-border px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
                <div className="w-3 h-3 rounded-full bg-warning/80"></div>
                <div className="w-3 h-3 rounded-full bg-success/80"></div>
              </div>
              <div className="mx-auto bg-background border border-border rounded-md px-4 py-1.5 text-xs text-muted-foreground font-medium flex items-center gap-2">
                app.chemtrack.com <ShieldCheck className="h-3 w-3 text-success" />
              </div>
            </div>
            
            {/* Mockup Body Content - Abstract Layout */}
            <div className="p-4 md:p-6 bg-background min-h-[300px] md:min-h-[400px] flex gap-6">
              {/* Sidebar */}
              <div className="hidden md:flex flex-col gap-4 w-48 border-r border-border pr-4">
                <div className="h-8 bg-muted rounded-md mb-4"></div>
                <div className="h-4 bg-primary/20 rounded-md w-3/4"></div>
                <div className="h-4 bg-muted rounded-md w-full"></div>
                <div className="h-4 bg-muted rounded-md w-5/6"></div>
                <div className="h-4 bg-muted rounded-md w-4/5"></div>
              </div>
              
              {/* Main Content */}
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="h-6 bg-muted rounded-md w-48"></div>
                  <div className="h-8 bg-primary rounded-md w-24"></div>
                </div>
                
                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border border-border rounded-lg p-4 bg-card shadow-sm flex flex-col gap-2">
                      <div className="h-4 bg-muted rounded-md w-1/2"></div>
                      <div className="h-6 bg-foreground/80 rounded-md w-1/3 mt-2"></div>
                    </div>
                  ))}
                </div>
                
                {/* Chart & Table Area */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
                  <div className="md:col-span-2 border border-border rounded-lg p-4 bg-card shadow-sm h-48 flex items-end gap-2 justify-between">
                    {[40, 70, 45, 90, 65, 85, 55, 75].map((h, i) => (
                      <div key={i} className="w-full bg-primary/40 rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <div className="border border-border rounded-lg p-4 bg-card shadow-sm flex flex-col gap-3">
                    <div className="h-4 bg-muted rounded-md w-1/2 mb-2"></div>
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-2 bg-warning rounded-full w-2"></div>
                        <div className="h-3 bg-muted rounded-md flex-1"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating UI Elements */}
          <div className="absolute -right-6 top-1/4 md:top-1/3 bg-card border border-border rounded-lg shadow-xl p-4 hidden lg:flex items-center gap-4 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
            <div className="bg-destructive/10 p-2 rounded-full">
              <Activity className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-semibold">Hazard Alert</p>
              <p className="text-xs text-muted-foreground">Temperature threshold exceeded</p>
            </div>
          </div>
          
          <div className="absolute -left-6 bottom-1/4 md:bottom-1/3 bg-card border border-border rounded-lg shadow-xl p-4 hidden lg:flex items-center gap-4 animate-in fade-in slide-in-from-left-8 duration-1000 delay-500">
            <div className="bg-success/10 p-2 rounded-full">
              <BarChart4 className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm font-semibold">Stock Reconciled</p>
              <p className="text-xs text-muted-foreground">Warehouse A inventory updated</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 bg-primary overflow-hidden">
      {/* Background Abstract */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-transparent to-white skew-x-12"></div>
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-transparent to-white -skew-x-12"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 max-w-3xl mx-auto leading-tight">
          Ready To Modernize Your Chemical Inventory Management?
        </h2>
        <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
          Join leading enterprises that trust Chemtrack for compliance, safety, and operational excellence.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 bg-background text-primary hover:bg-muted">
            Request Demo
          </Button>
          <Link href="/login" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Sign In
            </Button>
          </Link>
          <Button size="lg" variant="ghost" className="w-full sm:w-auto text-lg h-14 px-8 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}

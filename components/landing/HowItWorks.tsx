import { ArrowRight, Box, Barcode, CalendarClock, ClipboardCheck } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Receive Inventory",
      description: "Log incoming shipments, capture safety data sheets, and assign initial locations.",
      icon: Box,
    },
    {
      number: "02",
      title: "Track Batches",
      description: "Generate unique identifiers and track movement across your entire facility.",
      icon: Barcode,
    },
    {
      number: "03",
      title: "Monitor Usage & Expiry",
      description: "Log consumption in real-time and get automated alerts for impending expirations.",
      icon: CalendarClock,
    },
    {
      number: "04",
      title: "Generate Reports",
      description: "Export compliance records and audit trails with a single click.",
      icon: ClipboardCheck,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Streamlined Operational Workflow
          </h2>
          <p className="text-lg text-muted-foreground">
            A frictionless process from receiving dock to final consumption.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-card border-4 border-background shadow-lg flex items-center justify-center mb-6 relative group-hover:border-primary/20 transition-colors duration-300">
                  <div className="absolute inset-0 rounded-full border-2 border-border group-hover:border-primary transition-colors duration-300"></div>
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="bg-muted px-3 py-1 rounded-full text-xs font-bold text-muted-foreground mb-4">
                  STEP {step.number}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  {step.description}
                </p>
                
                {/* Mobile/Tablet Connector */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden h-12 w-0.5 bg-border mt-6 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90 bg-background" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

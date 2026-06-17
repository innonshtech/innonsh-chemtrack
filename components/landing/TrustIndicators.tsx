import { CheckCircle2, Factory, LineChart, Target } from "lucide-react";

export function TrustIndicators() {
  const stats = [
    {
      title: "99.9% Inventory Accuracy",
      description: "Eliminate stockouts and overstock with precision tracking.",
      icon: Target,
      value: "99.9%",
    },
    {
      title: "100% Batch Traceability",
      description: "End-to-end visibility from receipt to consumption.",
      icon: Factory,
      value: "100%",
    },
    {
      title: "Real-Time Monitoring",
      description: "Instant updates across all your warehouse locations.",
      icon: LineChart,
      value: "24/7",
    },
    {
      title: "Compliance Ready",
      description: "Built-in regulatory reporting and audit trails.",
      icon: CheckCircle2,
      value: "ISO",
    },
  ];

  return (
    <section className="py-12 border-y border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <stat.icon className="h-6 w-6" />
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-foreground mb-2">{stat.value}</h3>
              <p className="text-sm font-semibold text-foreground mb-1">{stat.title}</p>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

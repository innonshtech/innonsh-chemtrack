import { Droplets, FlaskConical, Beaker, Factory, ShieldPlus, TestTube2 } from "lucide-react";

export function IndustrySolutions() {
  const industries = [
    {
      title: "Chemical Manufacturing",
      useCase: "Manage complex bulk formulations, monitor raw material inventory, and ensure production line compliance.",
      icon: Factory,
    },
    {
      title: "Pharmaceutical Companies",
      useCase: "Maintain strict FDA compliance, track active pharmaceutical ingredients (APIs), and ensure 100% batch traceability.",
      icon: ShieldPlus,
    },
    {
      title: "Laboratories",
      useCase: "Track small-volume reagents, manage hazardous storage compatibility, and monitor shelf life accurately.",
      icon: FlaskConical,
    },
    {
      title: "Water Treatment Plants",
      useCase: "Forecast consumption of bulk purifying agents and manage safe storage of reactive chemicals.",
      icon: Droplets,
    },
    {
      title: "Industrial Warehouses",
      useCase: "Optimize multi-site inventory, track hazardous material transport, and manage large-scale procurement.",
      icon: Beaker,
    },
    {
      title: "Research Facilities",
      useCase: "Streamline requisition workflows, manage shared inventory pools, and reduce redundant purchasing.",
      icon: TestTube2,
    },
  ];

  return (
    <section id="solutions" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Built For Specialized Industries
          </h2>
          <p className="text-lg text-muted-foreground">
            Chemtrack adapts to the unique regulatory and operational requirements of diverse industrial sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div 
              key={index} 
              className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-8 flex-1">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <industry.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{industry.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {industry.useCase}
                </p>
              </div>
              <div className="h-1.5 w-full bg-border group-hover:bg-primary transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

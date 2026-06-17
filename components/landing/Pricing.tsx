import { Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      description: "For small laboratories and clinics.",
      price: "₹14,999",
      period: "/month",
      features: [
        "Up to 5 Users",
        "1 Warehouse Location",
        "Standard Reporting",
        "Email Support",
        "Basic Inventory Tracking",
      ],
      highlight: false,
    },
    {
      name: "Professional",
      description: "For growing manufacturing facilities.",
      price: "₹49,999",
      period: "/month",
      features: [
        "Up to 25 Users",
        "5 Warehouse Locations",
        "Advanced Analytics",
        "Priority 24/7 Support",
        "Batch & Expiry Tracking",
        "Hazard Classification",
      ],
      highlight: false,
    },
    {
      name: "Enterprise",
      description: "For large-scale industrial operations.",
      price: "Custom",
      period: "",
      features: [
        "Unlimited Users",
        "Unlimited Locations",
        "Custom API Integrations",
        "Dedicated Account Manager",
        "Full Compliance Suite",
        "On-Premise Deployment Option",
        "SSO & Advanced Security",
      ],
      highlight: true,
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparent Pricing for Every Scale
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your operational needs. All plans include automated backups and continuous updates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col rounded-2xl bg-card border ${plan.highlight ? 'border-primary shadow-2xl scale-105 z-10' : 'border-border shadow-md mt-4 mb-4'}`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                  RECOMMENDED
                </div>
              )}
              
              <div className="p-8 border-b border-border">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 h-10">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground font-medium">{plan.period}</span>
                </div>
                <Button 
                  className={`w-full ${plan.highlight ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-muted text-foreground hover:bg-muted/80'}`}
                  size="lg"
                >
                  {plan.highlight ? 'Contact Sales' : 'Start Free Trial'}
                </Button>
              </div>
              
              <div className="p-8 flex-1 bg-background/50 rounded-b-2xl">
                <p className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Included Features:</p>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className={`h-5 w-5 shrink-0 ${plan.highlight ? 'text-primary' : 'text-success'}`} />
                      <span className="text-muted-foreground text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

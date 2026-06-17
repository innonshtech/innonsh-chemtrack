import { ShieldAlert, FileWarning, Fingerprint, FolderLock, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ComplianceSafety() {
  const complianceFeatures = [
    {
      title: "Hazard Classification",
      description: "Automated GHS labeling and classification tracking.",
      icon: ShieldAlert,
    },
    {
      title: "Expiry Monitoring",
      description: "Proactive alerts for soon-to-expire hazardous chemicals.",
      icon: FileWarning,
    },
    {
      title: "Audit Trails",
      description: "Immutable logging of every stock movement and user action.",
      icon: Fingerprint,
    },
    {
      title: "SDS Management",
      description: "Centralized repository for all Safety Data Sheets.",
      icon: FolderLock,
    },
    {
      title: "Storage Compliance",
      description: "Conflict resolution for incompatible chemical storage.",
      icon: Scale,
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-destructive/20 bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive mb-6">
              <ShieldAlert className="mr-2 h-4 w-4" />
              Safety First Approach
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Uncompromising Safety & Compliance
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Navigating chemical regulations is complex. Chemtrack simplifies compliance with built-in regulatory tools, automated hazard tracking, and complete audit readiness.
            </p>
            
            <div className="space-y-6">
              {complianceFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <feature.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button size="lg" variant="outline" className="border-border">
                View Compliance Standards
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-2xl -z-10"></div>
            <div className="bg-card border border-border rounded-xl shadow-2xl p-6 relative z-10">
              <div className="border-b border-border pb-4 mb-4 flex items-center justify-between">
                <h4 className="font-bold text-lg flex items-center gap-2">
                  <FolderLock className="h-5 w-5 text-primary" /> Safety Data Sheets
                </h4>
                <span className="text-xs font-semibold bg-success/20 text-success px-2 py-1 rounded">100% Compliant</span>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: "Sulfuric Acid 98%", cas: "7664-93-9", hazard: "Corrosive", hColor: "bg-destructive text-white" },
                  { name: "Sodium Hydroxide", cas: "1310-73-2", hazard: "Corrosive", hColor: "bg-destructive text-white" },
                  { name: "Acetone", cas: "67-64-1", hazard: "Flammable", hColor: "bg-warning text-warning-foreground" },
                  { name: "Methanol", cas: "67-56-1", hazard: "Toxic", hColor: "bg-destructive text-white" },
                ].map((chem, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg bg-background">
                    <div>
                      <p className="font-semibold text-sm">{chem.name}</p>
                      <p className="text-xs text-muted-foreground">CAS: {chem.cas}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${chem.hColor}`}>
                        {chem.hazard}
                      </span>
                      <Button size="sm" variant="ghost" className="h-7 text-xs">PDF</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

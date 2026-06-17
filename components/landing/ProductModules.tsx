import { LayoutDashboard, Beaker, GitMerge, Warehouse, Truck, ShoppingCart, FileText, Settings } from "lucide-react";

export function ProductModules() {
  const modules = [
    { name: "Dashboard", icon: LayoutDashboard, color: "bg-blue-500/10 text-blue-500", border: "border-blue-500/20" },
    { name: "Chemical Management", icon: Beaker, color: "bg-purple-500/10 text-purple-500", border: "border-purple-500/20" },
    { name: "Batch Tracking", icon: GitMerge, color: "bg-green-500/10 text-green-500", border: "border-green-500/20" },
    { name: "Warehouse Management", icon: Warehouse, color: "bg-amber-500/10 text-amber-500", border: "border-amber-500/20" },
    { name: "Suppliers", icon: Truck, color: "bg-rose-500/10 text-rose-500", border: "border-rose-500/20" },
    { name: "Purchase Orders", icon: ShoppingCart, color: "bg-teal-500/10 text-teal-500", border: "border-teal-500/20" },
    { name: "Reports", icon: FileText, color: "bg-indigo-500/10 text-indigo-500", border: "border-indigo-500/20" },
    { name: "Settings", icon: Settings, color: "bg-slate-500/10 text-slate-500", border: "border-slate-500/20" },
  ];

  return (
    <section className="py-20 bg-muted/50 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Product Modules
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need in a unified platform.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {modules.map((mod, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-xl bg-card border ${mod.border} flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-1`}
            >
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 ${mod.color}`}>
                <mod.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground">{mod.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

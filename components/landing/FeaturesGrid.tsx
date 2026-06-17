import { 
  PackageSearch, 
  Layers, 
  Timer, 
  AlertTriangle, 
  Warehouse, 
  Truck, 
  ShoppingCart, 
  ShieldCheck, 
  QrCode, 
  BellRing, 
  BarChart3, 
  Users
} from "lucide-react";

export function FeaturesGrid() {
  const features = [
    {
      title: "Chemical Inventory Tracking",
      description: "Comprehensive logging and monitoring of all chemical assets across multiple locations.",
      icon: PackageSearch,
    },
    {
      title: "Batch & Lot Management",
      description: "Precise tracking of individual batches from manufacturing to consumption.",
      icon: Layers,
    },
    {
      title: "Expiry Monitoring",
      description: "Automated tracking of shelf life and expiration dates to prevent wastage.",
      icon: Timer,
    },
    {
      title: "Hazard Classification",
      description: "GHS compliant hazard tracking and safety data sheet (SDS) management.",
      icon: AlertTriangle,
    },
    {
      title: "Warehouse Management",
      description: "Multi-location inventory control with bin-level tracking precision.",
      icon: Warehouse,
    },
    {
      title: "Supplier Management",
      description: "Centralized database for vendor compliance and performance metrics.",
      icon: Truck,
    },
    {
      title: "Purchase Order Management",
      description: "Streamlined procurement workflows from requisition to receiving.",
      icon: ShoppingCart,
    },
    {
      title: "Audit Logs & Compliance",
      description: "Immutable records of all transactions for regulatory inspections.",
      icon: ShieldCheck,
    },
    {
      title: "QR & Barcode Tracking",
      description: "Rapid inventory reconciliation using mobile scanning technology.",
      icon: QrCode,
    },
    {
      title: "Automated Alerts",
      description: "Proactive notifications for low stock, expiring items, and safety thresholds.",
      icon: BellRing,
    },
    {
      title: "Reports & Analytics",
      description: "Customizable dashboards and automated report generation.",
      icon: BarChart3,
    },
    {
      title: "Role-Based Access Control",
      description: "Granular security permissions to protect sensitive inventory data.",
      icon: Users,
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Enterprise Features for Total Control
          </h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive suite of tools designed specifically for the rigorous demands of chemical inventory management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <feature.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

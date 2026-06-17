import { ArrowUpRight, TrendingUp, TrendingDown, Activity } from "lucide-react";

export function ReportingAnalytics() {
  return (
    <section className="py-20 md:py-32 bg-muted/30 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full -z-10"></div>
            
            {/* Dashboard Analytics Mockup */}
            <div className="bg-card border border-border rounded-xl shadow-xl p-6 relative z-10">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold">Inventory Overview</h4>
                <select className="bg-muted text-xs px-2 py-1 border border-border rounded outline-none">
                  <option>Last 30 Days</option>
                </select>
              </div>
              
              {/* KPIs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 border border-border rounded-lg bg-background">
                  <p className="text-xs text-muted-foreground mb-1">Total Value</p>
                  <p className="text-2xl font-bold">₹1.2 Cr</p>
                  <p className="text-xs text-success flex items-center mt-1"><TrendingUp className="h-3 w-3 mr-1"/> +4.2%</p>
                </div>
                <div className="p-4 border border-border rounded-lg bg-background">
                  <p className="text-xs text-muted-foreground mb-1">Expiring Soon</p>
                  <p className="text-2xl font-bold">24 Items</p>
                  <p className="text-xs text-destructive flex items-center mt-1"><TrendingUp className="h-3 w-3 mr-1"/> +2</p>
                </div>
              </div>
              
              {/* Chart Mockup */}
              <div className="border border-border rounded-lg bg-background p-4">
                <p className="text-sm font-semibold mb-4">Consumption Trends</p>
                <div className="h-40 flex items-end justify-between gap-2">
                  {[35, 45, 30, 60, 75, 40, 85, 55, 65, 40, 90, 70].map((h, i) => (
                    <div key={i} className="w-full relative group">
                      <div 
                        className="w-full bg-primary/20 hover:bg-primary transition-colors rounded-t-sm" 
                        style={{ height: `${h}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground mt-2 px-1">
                  <span>Jan</span>
                  <span>Jun</span>
                  <span>Dec</span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary mb-6">
              <Activity className="mr-2 h-4 w-4" />
              Data-Driven Decisions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Advanced Reporting & Analytics
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Transform raw inventory data into actionable insights. Forecast consumption, track supplier performance, and optimize your procurement strategy.
            </p>

            <ul className="space-y-4">
              {[
                "Real-time Inventory Valuation",
                "Consumption Forecasting & Trends",
                "Expiry & Wastage Analytics",
                "Supplier Performance Metrics",
                "Automated Custom Report Generation"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <ArrowUpRight className="h-3 w-3 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

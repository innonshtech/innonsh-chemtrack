import { WarehouseLocationPayload } from "./types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { HazardBadge } from "@/components/ui/hazard-badge"
import { AlertTriangle, Info, MapPin, Package } from "lucide-react"

interface LocationDetailsPanelProps {
  location: WarehouseLocationPayload | null
}

export function LocationDetailsPanel({ location }: LocationDetailsPanelProps) {
  if (!location) {
    return (
      <div className="h-full flex flex-col items-center justify-center border-l bg-muted/10 p-8 text-center text-muted-foreground">
        <MapPin className="h-12 w-12 mb-4 opacity-20" />
        <p>Select a warehouse location from the grid to view its contents and compliance details.</p>
      </div>
    )
  }

  const isCritical = location.occupancyPercentage >= 90

  return (
    <div className="h-full flex flex-col border-l bg-background overflow-y-auto">
      <div className="p-6 border-b space-y-2 sticky top-0 bg-background z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-mono">{location.code}</h2>
          {location.hasConflict && (
            <span className="flex items-center text-xs font-bold text-destructive bg-destructive/10 px-2 py-1 rounded">
              <AlertTriangle className="h-3 w-3 mr-1" /> CONFLICT
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Zone {location.zone} • Rack {location.rack} • Shelf {location.shelf}
        </p>
      </div>

      <div className="p-6 space-y-8 flex-1">
        
        {/* Utilization */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase text-muted-foreground flex items-center gap-2">
            <Package className="h-4 w-4" /> Capacity Utilization
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-3xl font-bold">
                {location.currentUtilization.toLocaleString(undefined, { maximumFractionDigits: 1 })}
              </span>
              <span className="text-muted-foreground text-sm mb-1">
                / {location.maxCapacity} Units Max
              </span>
            </div>
            <Progress 
              value={location.occupancyPercentage} 
              className={`h-3 ${isCritical ? "bg-destructive/20 [&>div]:bg-destructive" : ""}`}
            />
          </div>
        </section>

        {/* Compatibility Rules */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase text-muted-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> Storage Rules
          </h3>
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground mb-3">Approved Hazard Classes for this shelf:</p>
              <div className="flex flex-wrap gap-2">
                {location.compatibleHazardClasses.map(hc => (
                  <HazardBadge key={hc} hazard={hc} />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stored Inventory */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase text-muted-foreground">Stored Inventory</h3>
          {location.chemicals.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">Shelf is currently empty.</p>
          ) : (
            <div className="space-y-3">
              {location.chemicals.map(chem => {
                const isConflict = !location.compatibleHazardClasses.includes(chem.hazardClass)
                
                return (
                  <Card key={chem.id} className={isConflict ? "border-destructive bg-destructive/5" : ""}>
                    <CardContent className="p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-sm leading-none mb-1">{chem.name}</p>
                          <p className="text-xs text-muted-foreground">{chem.batchCount} Active Batches</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">{chem.quantity} {chem.unit}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <HazardBadge hazard={chem.hazardClass} />
                        {isConflict && (
                          <span className="text-[10px] font-bold text-destructive uppercase tracking-wide flex items-center">
                            <AlertTriangle className="h-3 w-3 mr-1" /> Non-Compliant
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  )
}

function ShieldCheck(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { HazardBadge } from "@/components/ui/hazard-badge"
import { WarehouseLocationPayload } from "./types"
import { FlaskConical, AlertTriangle, ShieldCheck } from "lucide-react"

interface LocationCardProps {
  location: WarehouseLocationPayload
  isSelected: boolean
  onClick: () => void
}

export function LocationCard({ location, isSelected, onClick }: LocationCardProps) {
  const isCritical = location.occupancyPercentage >= 90
  const isWarning = location.occupancyPercentage >= 75 && location.occupancyPercentage < 90

  return (
    <Card 
      className={`cursor-pointer transition-all hover:border-primary/50 hover:shadow-md ${
        isSelected ? "ring-2 ring-primary border-primary" : ""
      } ${location.hasConflict ? "border-destructive/50 bg-destructive/5" : ""}`}
      onClick={onClick}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-mono tracking-tight">{location.code}</CardTitle>
          {location.hasConflict ? (
            <AlertTriangle className="h-5 w-5 text-destructive" />
          ) : (
            <ShieldCheck className="h-5 w-5 text-muted-foreground/50" />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        {/* Capacity Indicator */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Occupancy</span>
            <span className={isCritical ? "text-destructive font-bold" : isWarning ? "text-warning font-bold" : "font-medium"}>
              {location.occupancyPercentage.toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={location.occupancyPercentage} 
            className={`h-2 ${isCritical ? "bg-destructive/20 [&>div]:bg-destructive" : isWarning ? "bg-warning/20 [&>div]:bg-warning" : ""}`}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm pt-2 border-t">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">Stored Types</span>
            <span className="flex items-center font-medium gap-1">
              <FlaskConical className="h-3.5 w-3.5 text-muted-foreground" />
              {location.storedChemicalsCount}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">Compatible</span>
            <div className="flex flex-wrap gap-1">
              {location.compatibleHazardClasses.slice(0, 2).map(hc => (
                <div key={hc} title={hc.replace("_", " ")} className="w-5 h-5 overflow-hidden rounded-sm flex items-center justify-center">
                  <HazardBadge hazard={hc} hideLabel />
                </div>
              ))}
              {location.compatibleHazardClasses.length > 2 && (
                <span className="text-[10px] text-muted-foreground bg-muted px-1 rounded flex items-center">
                  +{location.compatibleHazardClasses.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertDataPayload } from "./types"
import { AlertTriangle, Clock, FlaskConical, AlertCircle, PackageSearch, CheckCircle2, UserPlus, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"

interface AlertCardProps {
  alert: AlertDataPayload
  isSelected: boolean
  onSelectChange: (checked: boolean) => void
}

export function AlertCard({ alert, isSelected, onSelectChange }: AlertCardProps) {

  const isCritical = alert.severity === "CRITICAL"
  const isResolved = alert.status === "RESOLVED"
  const isDismissed = alert.status === "DISMISSED"

  const borderColor = isResolved || isDismissed ? "border-muted" : isCritical ? "border-destructive" : "border-warning"
  const bgColor = isResolved || isDismissed ? "bg-muted/10 opacity-60" : isCritical ? "bg-destructive/5" : "bg-warning/5"
  const Icon = alert.type === "HAZARD_VIOLATION" ? AlertTriangle : 
               alert.type === "EXPIRED" || alert.type === "EXPIRY_WARNING" ? Clock : PackageSearch

  const iconColor = isResolved || isDismissed ? "text-muted-foreground" : isCritical ? "text-destructive" : "text-warning"

  const handleMockAction = (action: string) => {
    toast(`Mock Action: ${action}`, {
      description: `In a real app, this would mutate the DB to ${action} Alert ID: ${alert.id.slice(0,6)}`,
    })
  }

  return (
    <Card className={`relative overflow-hidden transition-all border-l-4 ${borderColor} ${bgColor}`}>
      <CardContent className="p-5">
        <div className="flex gap-4">
          <div className="pt-1">
            <Checkbox 
              checked={isSelected} 
              onCheckedChange={(checked) => onSelectChange(!!checked)} 
              className={isCritical && !isResolved && !isDismissed ? "border-destructive data-[state=checked]:bg-destructive data-[state=checked]:border-destructive" : ""}
            />
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <Icon className={`h-5 w-5 ${iconColor}`} />
                <h3 className="font-semibold text-base">{alert.type.replace("_", " ")}</h3>
                {isResolved && <Badge variant="secondary" className="ml-2">RESOLVED</Badge>}
                {isDismissed && <Badge variant="secondary" className="ml-2">DISMISSED</Badge>}
                {!isResolved && !isDismissed && (
                  <Badge variant="outline" className={`ml-2 ${isCritical ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-warning/20 text-warning-foreground border-warning/30"}`}>
                    {alert.severity}
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(alert.createdAt).toLocaleString()}
              </span>
            </div>

            <p className={`text-sm ${isResolved || isDismissed ? "text-muted-foreground" : "text-foreground"}`}>
              {alert.message}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                {alert.chemicalName && (
                  <Link href={`/chemicals/${alert.chemicalId}`} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors bg-background px-2 py-1 rounded border">
                    <FlaskConical className="h-3 w-3" />
                    {alert.chemicalName}
                  </Link>
                )}
                {alert.batchNumber && (
                  <span className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-background px-2 py-1 rounded border">
                    <PackageSearch className="h-3 w-3" />
                    Batch: {alert.batchNumber}
                  </span>
                )}
              </div>

              {!isResolved && !isDismissed && (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" onClick={() => handleMockAction("Assign")}>
                    <UserPlus className="h-3.5 w-3.5 mr-1" /> Assign
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => handleMockAction("Dismiss")}>
                    <XCircle className="h-3.5 w-3.5 mr-1" /> Dismiss
                  </Button>
                  <Button size="sm" className={`h-8 text-xs ${isCritical ? "bg-destructive hover:bg-destructive/90" : "bg-warning hover:bg-warning/90 text-warning-foreground"}`} onClick={() => handleMockAction("Resolve")}>
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Resolve
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

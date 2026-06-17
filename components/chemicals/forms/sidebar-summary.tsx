"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HazardBadge } from "@/components/ui/hazard-badge"
import { ShieldAlert, ShieldCheck } from "lucide-react"

interface SidebarSummaryProps {
  formData: any
}

export function SidebarSummary({ formData }: SidebarSummaryProps) {
  const isHighHazard = ["FLAMMABLE", "CORROSIVE", "TOXIC", "EXPLOSIVE"].includes(formData.hazardClass)
  const isNonHazardous = formData.hazardClass === "NON_HAZARDOUS"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Chemical Preview</CardTitle>
          <CardDescription>Live summary of the new catalog item.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Name</p>
            <p className="text-lg font-semibold">{formData.name || "Unnamed Chemical"}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">CAS Number</p>
              <p className="font-mono text-sm">{formData.casNumber || "---"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Category</p>
              <p className="text-sm">{formData.category || "---"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Reorder Level</p>
              <p className="text-sm">{formData.reorderLevel || "0"} {formData.unitOfMeasure}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Hazard Class</p>
              <div className="mt-1">
                {formData.hazardClass ? (
                  <HazardBadge hazard={formData.hazardClass} />
                ) : (
                  <span className="text-sm text-muted-foreground">---</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Status</CardTitle>
        </CardHeader>
        <CardContent>
          {!formData.hazardClass ? (
            <div className="flex items-start gap-3 text-muted-foreground">
              <ShieldCheck className="h-5 w-5 mt-0.5" />
              <p className="text-sm">Select a hazard class to view compliance requirements.</p>
            </div>
          ) : isHighHazard ? (
            <div className="flex items-start gap-3 text-destructive">
              <ShieldAlert className="h-5 w-5 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-semibold">Strict Protocol Required</p>
                <p className="text-xs text-destructive/80">
                  This chemical requires specialized storage, explicit secondary containment, and verified SDS uploads prior to approval.
                </p>
              </div>
            </div>
          ) : isNonHazardous ? (
            <div className="flex items-start gap-3 text-success">
              <ShieldCheck className="h-5 w-5 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-semibold">Standard Protocol</p>
                <p className="text-xs text-success/80">
                  No strict secondary containment required. Standard warehouse shelf storage is permitted.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 text-warning-foreground">
              <ShieldAlert className="h-5 w-5 mt-0.5 text-warning" />
              <div className="space-y-1">
                <p className="text-sm font-semibold">Moderate Protocol</p>
                <p className="text-xs text-muted-foreground">
                  Ensure adequate ventilation. Segregate from incompatible classes based on the provided SDS.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

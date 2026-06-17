"use client"

import { ChemicalData } from "./columns"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"

interface ExpandedRowProps {
  data: ChemicalData
}

export function ExpandedRow({ data }: ExpandedRowProps) {
  const activeBatches = data.batches.filter(b => b.quantityRemaining > 0)
  const expiringSoon = activeBatches.filter(b => {
    const daysToExpiry = (new Date(b.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
    return daysToExpiry <= 30
  })

  return (
    <div className="p-4 bg-muted/30 border-b border-border space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Batches Summary */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Active Batches ({activeBatches.length})</h4>
          {activeBatches.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active batches available.</p>
          ) : (
            <div className="space-y-2">
              {activeBatches.slice(0, 3).map((batch: any) => (
                <div key={batch.id} className="flex justify-between items-center text-sm border p-2 rounded bg-background">
                  <div>
                    <span className="font-mono font-medium">{batch.batchNumber}</span>
                    <p className="text-xs text-muted-foreground">Expires: {new Date(batch.expiryDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">{batch.quantityRemaining} {data.unitOfMeasure}</span>
                    <p className="text-xs text-muted-foreground">Loc: {batch.warehouseLocation?.code || "N/A"}</p>
                  </div>
                </div>
              ))}
              {activeBatches.length > 3 && (
                <p className="text-xs text-muted-foreground text-center">+{activeBatches.length - 3} more batches</p>
              )}
            </div>
          )}
        </div>

        {/* Expiry Overview */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Expiry Overview</h4>
          <div className="p-3 border rounded bg-background space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Expiring in {"<"} 30 days:</span>
              <Badge variant={expiringSoon.length > 0 ? "destructive" : "secondary"}>
                {expiringSoon.length} Batches
              </Badge>
            </div>
            {expiringSoon.length > 0 && (
              <div className="text-xs text-destructive bg-destructive/10 p-2 rounded">
                Action required: Use or dispose of expiring batches to prevent hazard violations.
              </div>
            )}
          </div>
        </div>

        {/* Supplier Information */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Suppliers</h4>
          {data.suppliers.length === 0 ? (
            <p className="text-sm text-muted-foreground">No suppliers associated.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {data.suppliers.map((supplier, idx) => (
                <Badge key={idx} variant="outline" className="bg-background">
                  {supplier}
                </Badge>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Star, AlertTriangle, ChevronDown, ChevronRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export type BatchData = {
  id: string
  batchNumber: string
  chemicalName: string
  supplierName: string
  quantityRemaining: number
  unitOfMeasure: string
  manufactureDate: Date
  expiryDate: Date
  warehouseLocation: string
  isFEFO: boolean
  transactions: any[]
  auditLogs: any[]
}

export const columns: ColumnDef<BatchData>[] = [
  // Expansion column for the grouped Chemical row
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
      // Only render expander on grouped rows
      if (row.getCanExpand()) {
        return (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={row.getToggleExpandedHandler()}
            className="h-6 w-6"
          >
            {row.getIsExpanded() ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        )
      }
      return null
    },
  },
  {
    accessorKey: "chemicalName",
    header: "Chemical",
    cell: ({ row }) => {
      if (row.getIsGrouped()) {
        return (
          <div className="font-semibold text-primary flex items-center gap-2">
            {row.getValue("chemicalName")}
            <Badge variant="outline" className="ml-2 bg-primary/5">{row.subRows.length} Batches</Badge>
          </div>
        )
      }
      return null // We don't render chemical name on the individual batch rows since it's grouped
    },
  },
  {
    accessorKey: "batchNumber",
    header: "Batch Number",
    cell: ({ row }) => {
      if (row.getIsGrouped()) return null
      
      const isFEFO = row.original.isFEFO
      return (
        <div className="flex items-center gap-2 font-mono text-sm">
          {row.getValue("batchNumber")}
          {isFEFO && (
             <Badge variant="default" className="bg-primary hover:bg-primary px-1.5 py-0 text-[10px] uppercase">
               <Star className="h-3 w-3 mr-1 fill-current" />
               Next To Use
             </Badge>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => {
      if (row.getIsGrouped()) return null

      const expiryDate = new Date(row.getValue("expiryDate") as Date)
      const now = new Date()
      const daysToExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 3600 * 24)

      let badgeVariant = "outline"
      let badgeClass = "bg-success/10 text-success border-success/20" // Green > 90 days
      
      if (daysToExpiry < 0) {
        badgeClass = "bg-destructive/10 text-destructive border-destructive/20"
      } else if (daysToExpiry < 30) {
        badgeClass = "bg-destructive text-destructive-foreground" // Red < 30 days
      } else if (daysToExpiry <= 90) {
        badgeClass = "bg-warning/20 text-warning-foreground border-warning/30" // Amber 30-90
      }

      return (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={badgeClass}>
            {daysToExpiry < 0 ? "Expired" : `${Math.ceil(daysToExpiry)} days`}
          </Badge>
          <span className="text-muted-foreground text-sm">{expiryDate.toLocaleDateString()}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "quantityRemaining",
    header: "Quantity",
    cell: ({ row }) => {
      if (row.getIsGrouped()) return null
      const qty = row.getValue("quantityRemaining") as number
      const uom = row.original.unitOfMeasure
      return <div className="font-medium">{qty} {uom}</div>
    },
  },
  {
    accessorKey: "supplierName",
    header: "Supplier",
    cell: ({ row }) => row.getIsGrouped() ? null : <div>{row.getValue("supplierName")}</div>,
  },
  {
    accessorKey: "warehouseLocation",
    header: "Location",
    cell: ({ row }) => {
      if (row.getIsGrouped()) return null
      return (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {row.getValue("warehouseLocation")}
        </div>
      )
    },
  },
]

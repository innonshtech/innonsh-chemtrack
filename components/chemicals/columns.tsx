"use client"

import { ColumnDef } from "@tanstack/react-table"
import { HazardClass } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { HazardBadge } from "@/components/ui/hazard-badge"
import { ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export type ChemicalData = {
  id: string
  name: string
  casNumber: string
  category: string
  hazardClass: HazardClass
  unitOfMeasure: string
  reorderLevel: number
  currentStock: number
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK"
  batches: any[] // We will type this properly later or leave as any for now
  suppliers: string[]
}

export const columns: ColumnDef<ChemicalData>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row }) => {
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
    },
  },
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => (
      <Link href={`/chemicals/${row.original.id}`} className="font-semibold text-primary hover:underline">
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "casNumber",
    header: "CAS Number",
    cell: ({ row }) => <div className="font-mono text-sm text-muted-foreground">{row.getValue("casNumber")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "hazardClass",
    header: "Hazard Class",
    cell: ({ row }) => <HazardBadge hazard={row.getValue("hazardClass")} />,
  },
  {
    accessorKey: "currentStock",
    header: "Current Stock",
    cell: ({ row }) => {
      const uom = row.original.unitOfMeasure
      return <div className="font-medium">{row.getValue("currentStock")} {uom}</div>
    },
  },
  {
    accessorKey: "reorderLevel",
    header: "Reorder Level",
    cell: ({ row }) => {
      const uom = row.original.unitOfMeasure
      return <div className="text-muted-foreground">{row.getValue("reorderLevel")} {uom}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      if (status === "OUT_OF_STOCK") return <Badge variant="destructive">Out of Stock</Badge>
      if (status === "LOW_STOCK") return <Badge variant="outline" className="bg-warning/10 text-warning-foreground border-warning/20">Low Stock</Badge>
      return <Badge variant="outline" className="bg-success/10 text-success border-success/20">In Stock</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      )
    },
  },
]

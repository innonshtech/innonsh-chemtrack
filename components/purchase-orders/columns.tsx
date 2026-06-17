"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Building2, ExternalLink } from "lucide-react"
import Link from "next/link"

export type POData = {
  id: string
  poNumber: string
  supplierName: string
  supplierId: string
  status: "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED"
  expectedDelivery: Date
  totalAmount: number
}

export const columns: ColumnDef<POData>[] = [
  {
    accessorKey: "poNumber",
    header: "PO Number",
    cell: ({ row }) => (
      <Link href={`/purchase-orders/${row.original.id}`} className="font-mono text-primary hover:underline font-medium">
        {row.getValue("poNumber")}
      </Link>
    ),
  },
  {
    accessorKey: "supplierName",
    header: "Supplier",
    cell: ({ row }) => (
      <Link href={`/suppliers/${row.original.supplierId}`} className="flex items-center gap-2 font-medium hover:text-primary transition-colors">
        <Building2 className="h-4 w-4 text-muted-foreground" />
        {row.getValue("supplierName")}
      </Link>
    ),
  },
  {
    accessorKey: "expectedDelivery",
    header: "Expected Delivery",
    cell: ({ row }) => {
      const date = new Date(row.getValue("expectedDelivery") as Date)
      const isPastDue = date < new Date() && row.original.status !== "RECEIVED" && row.original.status !== "CANCELLED"
      return (
        <span className={isPastDue ? "text-destructive font-semibold" : ""}>
          {date.toLocaleDateString()}
        </span>
      )
    },
  },
  {
    accessorKey: "totalAmount",
    header: () => <div className="text-right">Total Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"))
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      let badgeClass = "bg-muted text-muted-foreground"
      
      switch(status) {
        case "RECEIVED": badgeClass = "bg-success/10 text-success border-success/20"; break;
        case "ORDERED": badgeClass = "bg-primary/10 text-primary border-primary/20"; break;
        case "APPROVED": badgeClass = "bg-secondary/20 text-secondary-foreground"; break;
        case "PENDING_APPROVAL": badgeClass = "bg-warning/20 text-warning-foreground border-warning/30"; break;
        case "CANCELLED": badgeClass = "bg-destructive/10 text-destructive border-destructive/20"; break;
      }

      return (
        <Badge variant="outline" className={badgeClass}>
          {status.replace("_", " ")}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <Link href={`/purchase-orders/${row.original.id}`} className="text-muted-foreground hover:text-primary transition-colors">
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      )
    },
  },
]

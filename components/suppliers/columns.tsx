"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Building2, Mail, Phone, ExternalLink } from "lucide-react"
import Link from "next/link"

export type SupplierData = {
  id: string
  name: string
  contactPerson: string
  email: string
  phone: string
  status: "ACTIVE" | "INACTIVE"
  totalOrders: number
}

export const columns: ColumnDef<SupplierData>[] = [
  {
    accessorKey: "name",
    header: "Supplier Name",
    cell: ({ row }) => (
      <Link href={`/suppliers/${row.original.id}`} className="font-semibold text-primary hover:underline flex items-center gap-2">
        <Building2 className="h-4 w-4 text-muted-foreground" />
        {row.getValue("name")}
      </Link>
    ),
  },
  {
    accessorKey: "contactPerson",
    header: "Contact Person",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <a href={`mailto:${row.getValue("email")}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <Mail className="h-3 w-3" />
        {row.getValue("email")}
      </a>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <a href={`tel:${row.getValue("phone")}`} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <Phone className="h-3 w-3" />
        {row.getValue("phone")}
      </a>
    ),
  },
  {
    accessorKey: "totalOrders",
    header: () => <div className="text-right">Total Orders</div>,
    cell: ({ row }) => <div className="text-right font-medium">{row.getValue("totalOrders")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "ACTIVE" ? "outline" : "secondary"} className={status === "ACTIVE" ? "bg-success/10 text-success border-success/20" : ""}>
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <Link href={`/suppliers/${row.original.id}`} className="text-muted-foreground hover:text-primary transition-colors">
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      )
    },
  },
]

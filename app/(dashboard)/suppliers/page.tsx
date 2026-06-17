import { db } from "@/lib/db"
import { SupplierData, columns } from "@/components/suppliers/columns"
import { SupplierDataTable } from "@/components/suppliers/supplier-data-table"
import { buttonVariants } from "@/components/ui/button"
import { Plus, Users } from "lucide-react"
import Link from "next/link"

export default async function SuppliersPage() {
  const rawSuppliers = await db.supplier.findMany({
    include: {
      purchaseOrders: true,
    },
    orderBy: {
      name: "asc"
    }
  })

  const data: SupplierData[] = rawSuppliers.map((supplier: any) => {
    // If they have recent or active POs, consider them active
    const hasActivePOs = supplier.purchaseOrders.some(
      (po: any) => ["DRAFT", "PENDING_APPROVAL", "APPROVED", "ORDERED"].includes(po.status)
    )

    return {
      id: supplier.id,
      name: supplier.name,
      contactPerson: supplier.contactPerson,
      email: supplier.email,
      phone: supplier.phone,
      status: hasActivePOs || supplier.purchaseOrders.length > 0 ? "ACTIVE" : "INACTIVE",
      totalOrders: supplier.purchaseOrders.length
    }
  })

  return (
    <div className="flex-1 flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Supplier Management
          </h2>
          <p className="text-muted-foreground">Manage your chemical vendors, track orders, and monitor procurement metrics.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/suppliers/new" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Link>
        </div>
      </div>

      <SupplierDataTable columns={columns} data={data} />
    </div>
  )
}

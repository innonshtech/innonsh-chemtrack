import { db } from "@/lib/db"
import { POData, columns } from "@/components/purchase-orders/columns"
import { PODataTable } from "@/components/purchase-orders/po-data-table"
import { buttonVariants } from "@/components/ui/button"
import { Plus, ShoppingCart } from "lucide-react"
import Link from "next/link"

export default async function PurchaseOrdersPage() {
  const rawPOs = await db.purchaseOrder.findMany({
    include: {
      supplier: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const data: POData[] = rawPOs.map((po: any) => ({
    id: po.id,
    poNumber: po.id.slice(0, 8).toUpperCase(),
    supplierName: po.supplier.name,
    supplierId: po.supplier.id,
    status: po.status,
    expectedDelivery: po.expectedDelivery,
    totalAmount: po.totalAmount
  }))

  return (
    <div className="flex-1 flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
            <ShoppingCart className="h-8 w-8 text-primary" />
            Purchase Orders
          </h2>
          <p className="text-muted-foreground">Manage your procurement pipeline from draft to fulfillment.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/purchase-orders/new" className={buttonVariants()}>
            <Plus className="mr-2 h-4 w-4" />
            Create Purchase Order
          </Link>
        </div>
      </div>

      <PODataTable columns={columns} data={data} />
    </div>
  )
}

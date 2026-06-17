import { db } from "@/lib/db"
import { columns, ChemicalData } from "@/components/chemicals/columns"
import { DataTable } from "@/components/chemicals/data-table"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Plus, Download } from "lucide-react"
import Link from "next/link"

export default async function ChemicalsPage() {
  // Fetch chemicals along with their active batches and associated suppliers
  const rawChemicals = await db.chemical.findMany({
    include: {
      batches: {
        where: { quantityRemaining: { gt: 0 } },
        include: {
          supplier: true,
          warehouseLocation: true,
        }
      }
    }
  })

  // Format the data for the data table
  const data: ChemicalData[] = rawChemicals.map((chem: any) => {
    const currentStock = chem.batches.reduce((sum: number, batch: any) => sum + batch.quantityRemaining, 0)
    
    let status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" = "IN_STOCK"
    if (currentStock === 0) status = "OUT_OF_STOCK"
    else if (currentStock <= chem.reorderLevel) status = "LOW_STOCK"

    // Extract unique supplier names for this chemical's active batches
    const suppliersSet = new Set<string>()
    chem.batches.forEach((b: any) => {
      if (b.supplier?.name) suppliersSet.add(b.supplier.name)
    })

    return {
      id: chem.id,
      name: chem.name,
      casNumber: chem.casNumber,
      category: chem.category,
      hazardClass: chem.hazardClass,
      unitOfMeasure: chem.unitOfMeasure,
      reorderLevel: chem.reorderLevel,
      currentStock,
      status,
      batches: chem.batches,
      suppliers: Array.from(suppliersSet)
    }
  })

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Inventory Management</h2>
          <p className="text-muted-foreground">Manage your chemical inventory, track batches, and monitor stock levels.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden sm:flex">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/chemicals/new" className={cn(buttonVariants({ variant: "default" }))}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}

import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { ChemicalDetailHeader } from "@/components/chemicals/chemical-detail-header"
import { ChemicalDetailTabs } from "@/components/chemicals/chemical-detail-tabs"

interface ChemicalDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ChemicalDetailPage({ params }: ChemicalDetailPageProps) {
  const { id } = await params

  const chemical = await db.chemical.findUnique({
    where: { id },
    include: {
      batches: {
        include: {
          supplier: true,
          warehouseLocation: true,
          transactions: {
            include: {
              performedBy: true
            }
          }
        }
      }
    }
  })

  if (!chemical) {
    notFound()
  }

  const currentStock = chemical.batches.reduce((sum: number, batch: any) => sum + batch.quantityRemaining, 0)
  
  let status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK" = "IN_STOCK"
  if (currentStock === 0) status = "OUT_OF_STOCK"
  else if (currentStock <= chemical.reorderLevel) status = "LOW_STOCK"

  const suppliersSet = new Set<string>()
  chemical.batches.forEach((b: any) => {
    if (b.quantityRemaining > 0 && b.supplier?.name) {
      suppliersSet.add(b.supplier.name)
    }
  })

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full pb-10">
      <ChemicalDetailHeader 
        chemical={chemical} 
        currentStock={currentStock} 
        status={status} 
      />
      <ChemicalDetailTabs 
        chemical={chemical} 
        currentStock={currentStock} 
        suppliers={Array.from(suppliersSet)} 
      />
    </div>
  )
}

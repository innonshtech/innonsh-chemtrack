import { db } from "@/lib/db"
import { BatchesClient } from "@/components/batches/batches-client"
import { BatchData } from "@/components/batches/columns"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default async function BatchesPage() {
  // Fetch active batches with deep relations
  const rawBatches = await db.batch.findMany({
    where: {
      quantityRemaining: { gt: 0 }
    },
    include: {
      chemical: true,
      supplier: true,
      warehouseLocation: true,
      transactions: {
        include: { performedBy: true },
        orderBy: { timestamp: "desc" }
      }
    },
    orderBy: [
      { chemical: { name: "asc" } },
      { expiryDate: "asc" }
    ]
  })

  // Format and flag FEFO
  const data: BatchData[] = []
  const fefoTrackedChemicals = new Set<string>()

  for (const batch of rawBatches) {
    let isFEFO = false
    
    // The query is already ordered by nearest expiry date.
    // The first non-expired batch encountered for a specific chemical is marked FEFO.
    const isExpired = new Date(batch.expiryDate) < new Date()
    
    if (!isExpired && !fefoTrackedChemicals.has(batch.chemical.id)) {
      isFEFO = true
      fefoTrackedChemicals.add(batch.chemical.id)
    }

    data.push({
      id: batch.id,
      batchNumber: batch.batchNumber,
      chemicalName: batch.chemical.name,
      supplierName: batch.supplier?.name || "Internal",
      quantityRemaining: batch.quantityRemaining,
      unitOfMeasure: batch.chemical.unitOfMeasure,
      manufactureDate: batch.manufactureDate,
      expiryDate: batch.expiryDate,
      warehouseLocation: batch.warehouseLocation?.code || "Unassigned",
      isFEFO,
      transactions: batch.transactions,
      auditLogs: [] // Assuming audit logs are available elsewhere or skipped for demo
    })
  }

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Batch Management</h2>
          <p className="text-muted-foreground">Monitor chemical batches, ensure FEFO compliance, and audit deep transaction logs.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <BatchesClient data={data} />
    </div>
  )
}

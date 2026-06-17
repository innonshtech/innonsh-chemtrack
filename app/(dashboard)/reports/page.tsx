import { db } from "@/lib/db"
import { ReportsClient } from "@/components/reports/reports-client"

export default async function ReportsPage() {
  // Fetch all necessary data for the comprehensive dashboards
  
  const rawBatches = await db.batch.findMany({
    include: {
      chemical: true,
      warehouseLocation: true,
      supplier: true
    }
  })

  const rawTransactions = await db.transaction.findMany({
    include: {
      batch: {
        include: { chemical: true }
      },
      performedBy: true
    },
    orderBy: {
      timestamp: "desc"
    }
  })

  // Format data for the client orchestrator
  const batches = rawBatches.map(b => ({
    id: b.id,
    batchNumber: b.batchNumber,
    chemicalName: b.chemical.name,
    category: b.chemical.category,
    hazardClass: b.chemical.hazardClass,
    supplierName: b.supplier.name,
    supplierId: b.supplier.id,
    warehouseLocation: b.warehouseLocation.code,
    expiryDate: b.expiryDate,
    quantityRemaining: b.quantityRemaining,
    costPerUnit: b.costPerUnit,
    unitOfMeasure: b.chemical.unitOfMeasure
  }))

  const transactions = rawTransactions.map(t => ({
    id: t.id,
    type: t.type,
    quantity: t.quantity,
    timestamp: t.timestamp,
    reason: t.reason,
    chemicalName: t.batch.chemical.name,
    batchNumber: t.batch.batchNumber,
    performedBy: t.performedBy.name
  }))

  return (
    <div className="flex-1 w-full pb-10 space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Reports & Analytics</h2>
        <p className="text-muted-foreground">Executive overview of inventory valuation, consumption, and audit trails.</p>
      </div>

      <ReportsClient batches={batches} transactions={transactions} />
    </div>
  )
}

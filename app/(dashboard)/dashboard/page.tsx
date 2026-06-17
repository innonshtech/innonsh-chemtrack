import { db } from "@/lib/db"
import { AlertBanner } from "@/components/dashboard/alert-banner"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { DashboardCharts } from "@/components/dashboard/charts"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { addDays } from "date-fns"

export default async function DashboardPage() {
  const today = new Date()
  const thirtyDaysFromNow = addDays(today, 30)

  // 1. Fetch chemicals and compute low stock
  const chemicalsWithBatches = await db.chemical.findMany({
    include: { batches: { where: { quantityRemaining: { gt: 0 } } } }
  })
  
  let totalChemicals = chemicalsWithBatches.length
  let lowStockCount = 0
  
  const categoryCountMap: Record<string, number> = {}

  chemicalsWithBatches.forEach((chem: any) => {
    const totalRemaining = chem.batches.reduce((sum: number, b: any) => sum + b.quantityRemaining, 0)
    if (totalRemaining <= chem.reorderLevel) {
      lowStockCount++
    }
    
    // Aggregate category distribution (count of active chemicals per category)
    if (totalRemaining > 0) {
      categoryCountMap[chem.category] = (categoryCountMap[chem.category] || 0) + 1
    }
  })

  const categoryData = Object.keys(categoryCountMap).map((k: any) => ({ category: k, count: categoryCountMap[k] }))

  // 2. Fetch Active Batches
  const activeBatches = await db.batch.findMany({
    where: { quantityRemaining: { gt: 0 } },
    include: { chemical: true, warehouseLocation: true }
  })

  let expiringCount = 0
  let hazardViolationsCount = 0
  let inventoryValue = 0
  
  const hazardCountMap: Record<string, number> = {}

  activeBatches.forEach((batch: any) => {
    // Inventory value
    inventoryValue += (batch.quantityRemaining * batch.costPerUnit)
    
    // Expiry check
    if (batch.expiryDate <= thirtyDaysFromNow) {
      expiringCount++
    }
    
    // Hazard violations
    if (batch.warehouseLocation && !batch.warehouseLocation.compatibleHazardClasses.includes(batch.chemical.hazardClass)) {
      hazardViolationsCount++
    }
    
    // Hazard distribution
    const hClass = batch.chemical.hazardClass
    hazardCountMap[hClass] = (hazardCountMap[hClass] || 0) + 1
  })

  const hazardData = Object.keys(hazardCountMap).map((k: any) => ({ hazardClass: k, count: hazardCountMap[k] }))

  // 3. Purchase Orders
  const openPurchaseOrders = await db.purchaseOrder.count({
    where: { status: 'PENDING_APPROVAL' }
  })

  // 4. Recent Transactions
  const recentTransactions = await db.transaction.findMany({
    orderBy: { timestamp: 'desc' },
    take: 5,
    include: {
      batch: {
        include: { chemical: true }
      },
      performedBy: true
    }
  })

  // Format activity feed
  const activities = recentTransactions.map((tx: any) => ({
    id: tx.id,
    action: tx.type,
    details: `${tx.type === "STOCK_IN" ? "Added" : "Removed"} ${tx.quantity} ${tx.batch.chemical.unitOfMeasure} of ${tx.batch.chemical.name}`,
    timestamp: tx.timestamp,
    user: tx.performedBy.name
  }))

  return (
    <div className="flex-1 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h2>
        <p className="text-muted-foreground">Welcome to Innonsh Chemtrack operations overview.</p>
      </div>

      <AlertBanner 
        lowStockCount={lowStockCount} 
        expiringCount={expiringCount} 
        hazardViolationsCount={hazardViolationsCount} 
      />
      
      <KPICards 
        totalChemicals={totalChemicals}
        activeBatches={activeBatches.length}
        inventoryValue={inventoryValue}
        lowStockItems={lowStockCount}
        expiringIn30Days={expiringCount}
        openPurchaseOrders={openPurchaseOrders}
      />

      <DashboardCharts 
        categoryData={categoryData}
        hazardData={hazardData}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-lg font-medium">Recent Transactions</h3>
          <RecentTransactions transactions={recentTransactions} />
        </div>
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-md border bg-card p-6">
            <h3 className="text-lg font-medium mb-6">Activity Feed</h3>
            <RecentActivity activities={activities} />
          </div>
        </div>
      </div>
    </div>
  )
}

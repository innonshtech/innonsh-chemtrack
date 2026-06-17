import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { ArrowLeft, Building2, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { SupplierScorecard } from "@/components/suppliers/supplier-scorecard"
import { SupplierCharts } from "@/components/suppliers/supplier-charts"
import { SupplierRelationsTabs } from "@/components/suppliers/supplier-relations-tabs"

interface SupplierDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function SupplierDetailPage({ params }: SupplierDetailPageProps) {
  const { id } = await params

  const supplier = await db.supplier.findUnique({
    where: { id },
    include: {
      purchaseOrders: {
        include: {
          items: {
            include: { chemical: true }
          }
        },
        orderBy: { createdAt: "asc" }
      },
      batches: {
        include: { chemical: true },
        orderBy: { createdAt: "asc" }
      }
    }
  })

  if (!supplier) {
    notFound()
  }

  // --- SCORECARD METRICS ---
  let totalSpend = 0
  let activeOrdersCount = 0
  
  supplier.purchaseOrders.forEach((po: any) => {
    if (po.status === "RECEIVED") {
      totalSpend += po.totalAmount
    }
    if (["DRAFT", "PENDING_APPROVAL", "APPROVED", "ORDERED"].includes(po.status)) {
      activeOrdersCount++
    }
  })

  const totalBatchesCount = supplier.batches.length
  
  // Aggregate unique chemicals supplied
  const chemMap = new Map<string, any>()
  supplier.batches.forEach((b: any) => {
    const chemId = b.chemical.id
    if (!chemMap.has(chemId)) {
      chemMap.set(chemId, {
        id: chemId,
        name: b.chemical.name,
        casNumber: b.chemical.casNumber,
        category: b.chemical.category,
        hazardClass: b.chemical.hazardClass,
        batchCount: 1
      })
    } else {
      chemMap.get(chemId).batchCount++
    }
  })
  const uniqueChemicals = Array.from(chemMap.values())
  const uniqueChemicalsCount = uniqueChemicals.length


  // --- CHARTS DATA PREP ---
  
  // 1. Purchase Value Trend (Group by Month)
  // We'll aggregate POs by short month string e.g., "Jan", "Feb"
  const monthlySpendMap = new Map<string, number>()
  supplier.purchaseOrders.forEach((po: any) => {
    // Only count non-cancelled POs for spend trends
    if (po.status !== "CANCELLED") {
      const monthYear = new Date(po.createdAt).toLocaleDateString("en-US", { month: "short", year: "2-digit" })
      monthlySpendMap.set(monthYear, (monthlySpendMap.get(monthYear) || 0) + po.totalAmount)
    }
  })
  
  const purchaseValueData = Array.from(monthlySpendMap.entries()).map(([month, value]) => ({
    month,
    value: Math.round(value * 100) / 100
  }))


  // 2. Average Cost Trend (Group by Month and Chemical)
  // We track costPerUnit from Batches
  const costTrendMap = new Map<string, any>()
  
  // Find top 2 most frequently supplied chemicals to keep chart readable
  const sortedChems = [...uniqueChemicals].sort((a, b) => b.batchCount - a.batchCount)
  const topChemNames = sortedChems.slice(0, 2).map((c: any) => c.name)

  supplier.batches.forEach((b: any) => {
    if (topChemNames.includes(b.chemical.name)) {
      const monthYear = new Date(b.createdAt).toLocaleDateString("en-US", { month: "short", year: "2-digit" })
      
      if (!costTrendMap.has(monthYear)) {
        costTrendMap.set(monthYear, { month: monthYear })
      }
      
      const monthData = costTrendMap.get(monthYear)
      // If there are multiple batches in a month, just tracking the latest or average. We'll overwrite for simplicity.
      monthData[b.chemical.name] = b.costPerUnit
    }
  })

  const averageCostData = Array.from(costTrendMap.values())


  return (
    <div className="flex-1 max-w-7xl mx-auto w-full pb-10 space-y-8">
      
      {/* Header Profile */}
      <div className="space-y-6">
        <Link href="/suppliers" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Suppliers
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-card p-6 rounded-lg border shadow-sm">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              {supplier.name}
            </h2>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">Contact:</span> {supplier.contactPerson}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${supplier.email}`} className="hover:text-foreground hover:underline">{supplier.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href={`tel:${supplier.phone}`} className="hover:text-foreground hover:underline">{supplier.phone}</a>
              </div>
              <div className="flex items-center gap-2 w-full mt-1">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{supplier.address}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground block mb-1">GST / Tax ID</span>
            <span className="font-mono bg-muted px-2 py-1 rounded border">{supplier.gstNumber}</span>
          </div>
        </div>
      </div>

      {/* Procurement Scorecards */}
      <SupplierScorecard 
        totalSpend={totalSpend}
        activeOrdersCount={activeOrdersCount}
        totalBatchesCount={totalBatchesCount}
        uniqueChemicalsCount={uniqueChemicalsCount}
      />

      {/* Advanced Charts */}
      <SupplierCharts 
        purchaseValueData={purchaseValueData}
        averageCostData={averageCostData}
      />

      {/* Data Tables */}
      <SupplierRelationsTabs 
        purchaseOrders={supplier.purchaseOrders}
        chemicals={uniqueChemicals}
      />

    </div>
  )
}

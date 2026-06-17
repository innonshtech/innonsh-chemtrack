import { db } from "@/lib/db"
import { WarehouseClient } from "@/components/warehouse/warehouse-client"
import { WarehouseLocationPayload } from "@/components/warehouse/types"
import { PackageSearch } from "lucide-react"

export default async function WarehousePage() {
  const rawLocations = await db.warehouseLocation.findMany({
    include: {
      batches: {
        where: { quantityRemaining: { gt: 0 } },
        include: {
          chemical: true
        }
      }
    },
    orderBy: [
      { zone: "asc" },
      { rack: "asc" },
      { shelf: "asc" }
    ]
  })

  const payload: WarehouseLocationPayload[] = rawLocations.map(loc => {
    // 1. Calculate Total Occupancy
    const currentUtilization = loc.batches.reduce((sum, b) => sum + b.quantityRemaining, 0)
    let occupancyPercentage = (currentUtilization / loc.maxCapacity) * 100
    if (occupancyPercentage > 100) occupancyPercentage = 100

    // 2. Aggregate distinct stored chemicals
    const chemMap = new Map<string, { id: string, name: string, hazardClass: string, quantity: number, unit: string, batchCount: number }>()
    let hasConflict = false

    loc.batches.forEach(b => {
      const chemId = b.chemical.id
      
      // Conflict checking
      if (!loc.compatibleHazardClasses.includes(b.chemical.hazardClass)) {
        hasConflict = true
      }

      if (chemMap.has(chemId)) {
        const existing = chemMap.get(chemId)!
        existing.quantity += b.quantityRemaining
        existing.batchCount += 1
      } else {
        chemMap.set(chemId, {
          id: chemId,
          name: b.chemical.name,
          hazardClass: b.chemical.hazardClass,
          quantity: b.quantityRemaining,
          unit: b.chemical.unitOfMeasure,
          batchCount: 1
        })
      }
    })

    const storedChemicals = Array.from(chemMap.values())

    return {
      id: loc.id,
      code: loc.code,
      zone: loc.zone,
      rack: loc.rack,
      shelf: loc.shelf,
      maxCapacity: loc.maxCapacity,
      compatibleHazardClasses: loc.compatibleHazardClasses,
      currentUtilization,
      occupancyPercentage,
      storedChemicalsCount: storedChemicals.length,
      chemicals: storedChemicals,
      hasConflict
    }
  })

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
            <PackageSearch className="h-8 w-8 text-primary" />
            Warehouse Layout
          </h2>
          <p className="text-muted-foreground">Monitor spatial occupancy and enforce strict hazard compatibility rules.</p>
        </div>
      </div>

      {/* Renders the complex two-column layout */}
      <WarehouseClient locations={payload} />
    </div>
  )
}

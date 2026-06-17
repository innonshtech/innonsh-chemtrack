"use client"

import { useState } from "react"
import { WarehouseLocationPayload } from "./types"
import { WarehouseGrid } from "./warehouse-grid"
import { LocationDetailsPanel } from "./location-details-panel"

interface WarehouseClientProps {
  locations: WarehouseLocationPayload[]
}

export function WarehouseClient({ locations }: WarehouseClientProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedLocation = locations.find(l => l.id === selectedId) || null

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-130px)] -mx-6 -mb-6 mt-6 border-t">
      {/* Main Grid View */}
      <div className="flex-1 overflow-y-auto p-6 bg-muted/5">
        <WarehouseGrid 
          locations={locations} 
          selectedLocationId={selectedId}
          onSelectLocation={setSelectedId}
        />
      </div>

      {/* Right Side Panel */}
      <div className="w-full lg:w-[400px] xl:w-[450px] shrink-0 h-[50vh] lg:h-auto border-t lg:border-t-0">
        <LocationDetailsPanel location={selectedLocation} />
      </div>
    </div>
  )
}

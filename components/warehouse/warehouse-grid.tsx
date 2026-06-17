import { WarehouseLocationPayload } from "./types"
import { LocationCard } from "./location-card"

interface WarehouseGridProps {
  locations: WarehouseLocationPayload[]
  selectedLocationId: string | null
  onSelectLocation: (id: string) => void
}

export function WarehouseGrid({ locations, selectedLocationId, onSelectLocation }: WarehouseGridProps) {
  // Group locations by Zone
  const zonesMap = locations.reduce((acc, loc) => {
    if (!acc[loc.zone]) acc[loc.zone] = []
    acc[loc.zone].push(loc)
    return acc
  }, {} as Record<string, WarehouseLocationPayload[]>)

  // Sort zones alphabetically
  const sortedZones = Object.keys(zonesMap).sort()

  return (
    <div className="space-y-12">
      {sortedZones.map(zone => {
        const zoneLocations = zonesMap[zone]
        
        // Sort locations within a zone by rack then shelf
        zoneLocations.sort((a, b) => {
          if (a.rack === b.rack) return a.shelf.localeCompare(b.shelf)
          return a.rack.localeCompare(b.rack)
        })

        return (
          <div key={zone} className="space-y-4">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold tracking-tight bg-muted/50 px-4 py-1.5 rounded-md inline-block border">
                Zone <span className="text-primary">{zone}</span>
              </h3>
              <div className="h-px bg-border flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pl-2 border-l-2 border-muted">
              {zoneLocations.map(loc => (
                <LocationCard
                  key={loc.id}
                  location={loc}
                  isSelected={loc.id === selectedLocationId}
                  onClick={() => onSelectLocation(loc.id)}
                />
              ))}
            </div>
          </div>
        )
      })}

      {locations.length === 0 && (
        <div className="text-center py-24 text-muted-foreground border-2 border-dashed rounded-xl">
          No warehouse locations configured.
        </div>
      )}
    </div>
  )
}

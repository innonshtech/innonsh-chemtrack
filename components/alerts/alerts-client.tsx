"use client"

import { useState, useMemo } from "react"
import { AlertDataPayload } from "./types"
import { AlertCard } from "./alert-card"
import { AlertsToolbar } from "./alerts-toolbar"
import { ShieldAlert } from "lucide-react"

interface AlertsClientProps {
  alerts: AlertDataPayload[]
}

export function AlertsClient({ alerts }: AlertsClientProps) {
  const [filterType, setFilterType] = useState("ALL")
  const [filterSeverity, setFilterSeverity] = useState("ALL")
  const [filterStatus, setFilterStatus] = useState("ACTIVE")
  
  const [selectedAlertIds, setSelectedAlertIds] = useState<Set<string>>(new Set())

  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      if (filterType !== "ALL" && alert.type !== filterType) return false
      if (filterSeverity !== "ALL" && alert.severity !== filterSeverity) return false
      if (filterStatus !== "ALL" && alert.status !== filterStatus) return false
      return true
    })
  }, [alerts, filterType, filterSeverity, filterStatus])

  const handleSelectToggle = (id: string, checked: boolean) => {
    const newSet = new Set(selectedAlertIds)
    if (checked) newSet.add(id)
    else newSet.delete(id)
    setSelectedAlertIds(newSet)
  }

  return (
    <div className="space-y-6">
      <AlertsToolbar 
        selectedCount={selectedAlertIds.size}
        filterType={filterType}
        setFilterType={setFilterType}
        filterSeverity={filterSeverity}
        setFilterSeverity={setFilterSeverity}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground border-2 border-dashed rounded-xl bg-muted/5 flex flex-col items-center">
            <ShieldAlert className="h-12 w-12 mb-4 opacity-20" />
            <p className="text-lg font-medium text-foreground">No alerts match your criteria.</p>
            <p>Your inventory is looking safe and compliant.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <AlertCard 
              key={alert.id} 
              alert={alert} 
              isSelected={selectedAlertIds.has(alert.id)}
              onSelectChange={(checked) => handleSelectToggle(alert.id, checked)}
            />
          ))
        )}
      </div>
    </div>
  )
}

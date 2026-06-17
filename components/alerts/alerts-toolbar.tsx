"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, UserPlus, XCircle, FilterX } from "lucide-react"
import { toast } from "sonner"

interface AlertsToolbarProps {
  selectedCount: number
  filterType: string
  setFilterType: (val: string) => void
  filterSeverity: string
  setFilterSeverity: (val: string) => void
  filterStatus: string
  setFilterStatus: (val: string) => void
}

export function AlertsToolbar({
  selectedCount,
  filterType, setFilterType,
  filterSeverity, setFilterSeverity,
  filterStatus, setFilterStatus
}: AlertsToolbarProps) {

  const handleMockBulkAction = (action: string) => {
    toast(`Bulk Action: ${action}`, {
      description: `In a real app, this would ${action.toLowerCase()} ${selectedCount} selected alerts.`,
    })
  }

  const clearFilters = () => {
    setFilterType("ALL")
    setFilterSeverity("ALL")
    setFilterStatus("ACTIVE")
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-card p-4 rounded-lg border shadow-sm sticky top-0 z-10">
      
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select 
          className="h-9 px-3 py-1 text-sm rounded-md border bg-background text-foreground"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="ALL">All Types</option>
          <option value="LOW_STOCK">Low Stock</option>
          <option value="EXPIRY_WARNING">Expiry Warning</option>
          <option value="EXPIRED">Expired Batch</option>
          <option value="HAZARD_VIOLATION">Hazard Violation</option>
        </select>

        <select 
          className="h-9 px-3 py-1 text-sm rounded-md border bg-background text-foreground"
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
        >
          <option value="ALL">All Severities</option>
          <option value="CRITICAL">Critical Only</option>
          <option value="WARNING">Warning Only</option>
        </select>

        <select 
          className="h-9 px-3 py-1 text-sm rounded-md border bg-background text-foreground font-semibold"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="ACTIVE">Status: Active</option>
          <option value="RESOLVED">Status: Resolved</option>
          <option value="DISMISSED">Status: Dismissed</option>
          <option value="ALL">Status: All</option>
        </select>

        {(filterType !== "ALL" || filterSeverity !== "ALL" || filterStatus !== "ACTIVE") && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground h-9">
            <FilterX className="h-4 w-4 mr-1" /> Clear
          </Button>
        )}
      </div>

      {/* Bulk Actions */}
      <div className={`flex items-center gap-2 transition-opacity duration-300 ${selectedCount > 0 ? "opacity-100" : "opacity-50 pointer-events-none"}`}>
        <span className="text-sm font-medium mr-2">{selectedCount} selected</span>
        
        <Button variant="outline" size="sm" className="h-9" onClick={() => handleMockBulkAction("Assign")}>
          <UserPlus className="h-4 w-4 mr-1" /> Assign
        </Button>
        <Button variant="outline" size="sm" className="h-9" onClick={() => handleMockBulkAction("Dismiss")}>
          <XCircle className="h-4 w-4 mr-1" /> Dismiss
        </Button>
        <Button size="sm" className="h-9" onClick={() => handleMockBulkAction("Resolve")}>
          <CheckCircle2 className="h-4 w-4 mr-1" /> Resolve
        </Button>
      </div>

    </div>
  )
}
